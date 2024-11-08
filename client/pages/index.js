import { motion, useScroll, useSpring } from 'framer-motion';
import { useEffect } from 'react';
import Header from '../components/home/Header';
import Footer from '../components/home/Footer';
import AboutSection from '../components/home/AboutSection';
import dynamic from 'next/dynamic'

const CoreFeaturesSection = dynamic(() => import('../components/home/CoreFeaturesSection'), { ssr: false })
const Hero = dynamic(() => import('../components/home/Hero'), { ssr: false })
const HowItWorksSection = dynamic(() => import('../components/home/HowItWorksSection'), { ssr: false }) 
const TestimonialsSection = dynamic(() => import('../components/home/TestimonialsSection'), { ssr: false })
const MentorshipProgramsSection = dynamic(() => import('../components/home/MentorshipProgramsSection'), { ssr: false })
const EventsSection = dynamic(() => import('../components/home/EventsSection'), { ssr: false })
const NewsletterSignupSection = dynamic(() => import('../components/home/NewsletterSignupSection'), { ssr: false })
const JobPlacementPartnershipsSection = dynamic(() => import('../components/home/JobPlacementPartnershipsSection'), { ssr: false })
const MotionSection = motion.section;

export default function Home() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    // This effect is added to ensure animations are triggered on scroll
    window.addEventListener('scroll', () => {});
    return () => window.removeEventListener('scroll', () => {});
  }, []);

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: false, amount: 0.3 },
    transition: { duration: 0.8 }
  };

  return (
    <main>
      <Header />
      <Hero />
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: 'linear-gradient(to right, #002952, #00b7ff)',
          transformOrigin: '0%',
          scaleX
        }}
      />
      <MotionSection {...fadeInUp}>
        <AboutSection /> 
      </MotionSection>
      <MotionSection {...fadeInUp}>
       <CoreFeaturesSection />
      </MotionSection>
      <MotionSection {...fadeInUp}>
       <HowItWorksSection />
      </MotionSection>
      <MotionSection {...fadeInUp}>
        <TestimonialsSection />
      </MotionSection>
      <MotionSection {...fadeInUp}>
        <MentorshipProgramsSection />
      </MotionSection>
      <MotionSection {...fadeInUp}>
        <EventsSection />
      </MotionSection>
      <MotionSection {...fadeInUp}>
        <JobPlacementPartnershipsSection />
      </MotionSection>
      <MotionSection {...fadeInUp}>
        <NewsletterSignupSection />
      </MotionSection>
      <Footer />
    </main>
  );
}
