"use client"
import { DataTable } from "../../../components/teacher/courses/data-table";
import { columns } from "../../../components/teacher/courses/columns";
import { useRouter } from "next/router"; // Changed from next/navigation
import axios from "axios";
import { useEffect, useState } from "react";

const CoursesPage = () => {
    const [courses, setCourses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                // Get user and token from localStorage
                const userStr = localStorage.getItem('user');
                const token = localStorage.getItem('token');

                if (!userStr || !token) {
                    router.push('/login');
                    return;
                }

                const user = JSON.parse(userStr);

                // Make API request with token
                const response = await axios.get('/api/courses', {
                    headers: {
                        'Authorization': token,
                        'Content-Type': 'application/json'
                    }
                });

                setCourses(response.data);
            } catch (error) {
                console.error('Error fetching courses:', error);
                if ((error as any).response?.status === 401) {
                    router.push('/login');
                }
            } finally {
                setIsLoading(false);
            }
        };

        fetchCourses();
    }, [router]);

    if (isLoading) {
        return (
            <div className="h-full flex items-center justify-center">
                Loading courses...
            </div>
        );
    }

    return ( 
        <div className="p-6">
            <DataTable columns={columns} data={courses} />
        </div>
    );
}

export default CoursesPage;