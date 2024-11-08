"use client"

import { CourseCard } from "@/components/course-card"
import dynamic from 'next/dynamic'
import { useState, useEffect } from 'react'

const MotionDiv = dynamic(() => import('framer-motion').then((mod) => mod.motion.div), {
  ssr: false
})

type CourseWithProgress = {
    _id: string, 
    userId: string,
    categoryId: string, 
    imageUrl: string,  
    title: string, 
    description: string, 
    price: number, 
    progress: number | null,
    chaptersLength: number
    category: string
}

interface CoursesListProps {
    items: CourseWithProgress[]
}

export const CoursesList = ({ items }: CoursesListProps) => {
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    const container = {
        hidden: { opacity: 1, scale: 0 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                delayChildren: 0.3,
                staggerChildren: 0.2
            }
        }
    }
    
    const item = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1
        }
    }

    if (!isMounted) {
        return null
    }

    return (
        <>
            <MotionDiv 
                className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-6"
                variants={container}
                initial="hidden"
                animate="visible"
            >
                {items.map((course) => (
                    <MotionDiv key={course._id} variants={item}>
                        <CourseCard
                            _id={course._id}
                            title={course.title}
                            imageUrl={course.imageUrl}
                            price={course.price}
                            progress={course.progress}
                            category={course.category}
                            chaptersLength={course.chaptersLength}
                        />
                    </MotionDiv>
                ))}
            </MotionDiv>
            {items.length === 0 && (
                <MotionDiv 
                    className="text-center text-lg text-muted-foreground mt-10 p-8 bg-gray-50 rounded-lg shadow-inner"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    No courses found. Check back later for new additions!
                </MotionDiv>
            )}
        </>
    )
}
