import { stripe } from "@/lib/stripe";
import axios from "axios";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const userStr = localStorage.getItem('user');
    const user = userStr ? JSON.parse(userStr) : null;
    const userId = user?._id;
    const email = user?.email;

    if (!userId || !email) {
      return new NextResponse("Unauthorized access denied at checkout", {
        status: 401,
      });
    }

    const course = (
      await axios.get(`${process.env.BACK_END_URL}/api/courses/${params.courseId}`)
    ).data;
    if (!course) {
      return new NextResponse("No Course Found!", { status: 404 });
    }

    const purchased = !!course.purchased[userId];
    if (purchased) {
      return new NextResponse("Already purchased", { status: 400 });
    }

    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [
      {
        quantity: 1,
        price_data: {
          currency: "USD",
          product_data: {
            name: course.title,
            description: course.description!,
          },
          unit_amount: Math.round(course.price! * 100),
        },
      },
    ];

    let stripeCustomer: { stripeCustomerId: string } = (
      await axios.get(`${process.env.BACK_END_URL}/api/stripeCustomers/${userId}`)
    ).data;

    if (!stripeCustomer) {
      const customer = await stripe.customers.create({
        email: email,
      });

      stripeCustomer = (
        await axios.post(`${process.env.BACK_END_URL}/api/stripeCustomers`, {
          email: email,
          userId: userId,
          stripeCustomerId: customer.id,
        })
      ).data;
    }

    const session = await stripe.checkout.sessions.create({
      customer: stripeCustomer.stripeCustomerId,
      line_items,
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/courses/${params.courseId}?success=1`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/courses/${course._id}?canceled=1`,
      metadata: {
        courseId: course._id,
        userId: userId,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.log("api courses courseId checkout", error);
    return new NextResponse("internal server error courseId checkout", {
      status: 500,
    });
  }
}
