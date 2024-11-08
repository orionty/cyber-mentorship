"use client"

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import { IconBadge } from "@/components/icon-bage";
import { BookOpen } from "lucide-react";
import { formatPrice } from "@/lib/format";
import { CourseProgress } from "@/components/course-progress";

interface courseCardProps {
  _id: string;
  title: string;
  imageUrl: string;
  price: number;
  progress: number | null;
  category: string;
  chaptersLength: number;
}

export const CourseCard = ({
  _id,
  title,
  imageUrl,
  price,
  progress,
  category,
  chaptersLength,
}: courseCardProps) => {
  return (
    <Link href={`/courses/${_id}`}>
      <motion.div 
        className="group overflow-hidden border rounded-lg p-3 h-full bg-white"
        whileHover={{ 
          scale: 1.03,
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
        }}
        transition={{ type: "spring", stiffness: 300 }}
        initial={{ boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)" }}
      >
        <motion.div 
          className="relative w-full aspect-video rounded-md overflow-hidden"
          whileHover={{ scale: 1.05 }}
        >
          <Image fill className="object-cover" alt={title} src={imageUrl} />
        </motion.div>
        <motion.div 
          className="flex flex-col pt-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="text-lg md:text-base font-medium group-hover:text-sky-700 transition line-clamp-2">
            {title}
          </div>
          <p className="text-xs text-muted-foreground">
            {category}
            <div className="my-3 flex items-center gap-x- text-sm md:text-xs">
              <div className="flex items-center gapx1 text-slate-500">
                <IconBadge icon={BookOpen} size="sm" />
                <span>
                  &nbsp;
                  { chaptersLength}
                  {chaptersLength === 1 ? " Chapter" : " Chapters"}
                </span>
              </div>
            </div>
            {progress !== null ? (
             <CourseProgress size="sm" value={progress} variant={progress == 100? "success" : "default"}/>
            ) : (
              <p className="text-md md:text-sm text-end font-medium">
                {formatPrice(price)}
              </p>
            )}
          </p>
        </motion.div>
      </motion.div>
    </Link>
  );
};
