"use client";

import React, { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation"

type Project = {
    id: string;
    name: string;
};

export default function ProjectSideBar() {
    const supabase = createClient();
    const router = useRouter();
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getProjects = async () => {
            setLoading(true);
            const { data: userData } = await supabase.auth.getUser();

            const { data, error } = await supabase
                .from("projects")
                .select("id, name")
                .eq("user_id", userData.user?.id)
                .order("created_at", { ascending: false });

            if (error) {
                console.error("Error fetching projects: ", error);
            } else {
                setProjects(data || []);
            }
            setLoading(false);
        }
        
        getProjects();
    }, [supabase]);

    const handleClick = (projectId: string) => {
        router.push(`/home?projectId=${projectId}`);
    }

    if (loading) return <p>Loading projects...</p>

    if (projects.length === 0) return <p>No projects yet.</p>

    return (
        <div className="fixed left-0 bg-turqoise-400 h-full p-4 pr-12 pt-12">
            <h1 className="font-bold text-3xl text-background mb-4">Your Projects</h1>
            <ul>
                {projects.map((project) => (
                <div className="cursor-pointer text-lg hover:font-bold" key={project.id}>
                    <li className="py-2 text-background"  onClick={() => handleClick(project.id)}>
                        {project.name}
                    </li>
                    <hr className="text-background"></hr>
                </div>
                ))}
            </ul>
        </div>
    );
}