"use client";

import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LogOut, User } from "lucide-react";
import Link from "next/link";
import { SearchInput } from "./search-input";
import { isTeacher } from "@/lib/teacher";
import { useState, useEffect } from "react";

interface User {
  _id: string;
  email: string;
  name: string;
}

const NavbarRoutes = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      setUser(JSON.parse(userStr));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    router.push('/');
  };

  const isTeacherPage = pathname?.startsWith("/teacher");
  const isCoursePage = pathname?.includes("/courses");
  const isSearchPage = pathname === "/search";

  return (
    <>
      {isSearchPage && (
        <div className="hidden md:block">
          <SearchInput />
        </div>
      )}
      <div className="flex gap-x-2 ml-auto">
        {isTeacherPage || isCoursePage ? (
          <Link href="/dashboard">
            <Button size="sm" variant={"ghost"}>
              <LogOut className="h-4 w-4 mr-2" />
              Exit
            </Button>
          </Link>
        ) : isTeacher(user?._id) ? (
          <Link href="/teacher/courses">
            <Button size="sm" variant={"ghost"}>
              Teacher Mode
            </Button>
          </Link>
        ) : null}
        {user ? (
          <Button onClick={handleLogout} size="sm" variant="ghost">
            <User className="h-4 w-4 mr-2" />
            Logout
          </Button>
        ) : (
          <Link href="/login">
            <Button size="sm" variant="ghost">
              <User className="h-4 w-4 mr-2" />
              Login
            </Button>
          </Link>
        )}
      </div>
    </>
  );
};

export default NavbarRoutes;
