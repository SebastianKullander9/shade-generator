"use client";

import React, { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation"

type Project = {
    id: string;
    name: string;
};

export default function Projects() {
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
        <div>
            <h2>Your Projects</h2>
            <ul>
                {projects.map((project) => (
                <li key={project.id} onClick={() => handleClick(project.id)}>
                    {project.name}
                </li>
                ))}
            </ul>
        </div>
    );
}