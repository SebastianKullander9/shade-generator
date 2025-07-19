"use client";

import React, { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

type Project = {
    id: string;
    name: string;
};

export default function Projects() {
    const supabase = createClient();
    const router = useRouter();
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const searchParams = useSearchParams();
    const activeProjectId = searchParams.get("projectId")

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
        <div>
            <ul>
                {projects.map((project) => (
                <div key={project.id} className="flex flex-row justify-between items-center mb-8">
                    <li  className="flex hover:underline cursor-pointer items-center" onClick={() => handleClick(project.id)}>
                        {project.name}
                    </li>
                    {project.id === activeProjectId ? 
                        <div className="bg-turqoise-50 p-1 max-h-7 rounded-sm">
                            <p className="text-sm text-text">Current</p>
                        </div> : <></>
                    }
                </div>
                ))}
            </ul>
        </div>
    );
}