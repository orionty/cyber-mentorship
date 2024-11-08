"use client"
import axios from "axios";
import { Categories } from "../../components/search/categories";
import { redirect } from "next/navigation";
import { getCourses } from "@/actions/get-courses";
import { CoursesList } from "@/components/courses-list";
import { SearchInput } from "@/components/search-input";

interface searchPageProps{
  searchParams: { 
    title?: string,
    categoryId: string
  }
}

const SearchPage = async ({ searchParams } : searchPageProps) => {


  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : null;
  const userId = user?._id;
  
  if(!userId){
    return redirect("/login")
  }

  const categories = await (
    await axios.get(`${process.env.BACK_END_URL}/api/category`)
  ).data;


  const courses = await getCourses({userId, ...searchParams})

  return (
    <>
      <div className="px-6 pt-6 md:hidden md:mb-0 block">
        <SearchInput /> 
      </div>
      <div className="p-6">
        <Categories items={categories} />
        <CoursesList items={courses} />
      </div>
    </>
  );
};

export default SearchPage;
