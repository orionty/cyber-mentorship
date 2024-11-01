"use client";

import { cn } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import { IconType } from "react-icons";

interface categoryItemProps {
  label: string;
  icon?: IconType;
  value?: string;
}

export const CategoryItem = ({
  label,
  icon: Icon,
  value,
}: categoryItemProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentCategoryId = searchParams.get("categoryId");
  const currentTitle = searchParams.get("title");

  const isSelected = currentCategoryId === value;

  const onClick = () => {
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          title: currentTitle,
          categoryId: isSelected ? null : value,
        },
      },
      { skipNull: true, skipEmptyString: true }
    );
    router.push(url);
  };

  return (
    <button
      onClick={onClick}
      type="button"
      className={cn(
        "relative py-3 px-5 text-sm font-semibold rounded-full flex items-center gap-x-3 transition-all duration-300 ease-in-out",
        "shadow-md hover:shadow-lg",
        "bg-gradient-to-r from-teal-400 to-teal-600",
        "text-white hover:from-teal-500 hover:to-teal-700",
        "border-2 border-transparent hover:border-teal-300",
        "overflow-hidden",
        isSelected && "ring-4 ring-offset-2 ring-teal-200"
      )}
    >
      <div className="absolute inset-0 bg-white opacity-0 hover:opacity-10 transition-opacity duration-300"></div>
      {Icon && (
        <Icon
          size={24}
          className={cn(
            "transition-transform duration-300",
            isSelected ? "scale-110" : "scale-100"
          )}
        />
      )}
      <div className="truncate relative z-10">{label}</div>
      {isSelected && (
        <span className="absolute inset-0 z-0 bg-teal-200 opacity-20 animate-pulse"></span>
      )}
    </button>
  );
};
