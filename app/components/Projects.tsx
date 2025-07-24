"use client";

import React, { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import SaveProject from "./SaveProject";
import Logout from "./Logout";
import { deleteProjectById } from "@/utils/supabase/deleteProject";

type Project = {
    id: string;
    name: string;
};

export default function Projects({ id, projectName, scrollToShades }: { id: string, projectName: string, scrollToShades: () => void }) {
    const supabase = createClient();
    const router = useRouter();
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const searchParams = useSearchParams();
    const activeProjectId = searchParams.get("projectId");
    const [projectNameState, setProjectNameState] = useState("");
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const scroll = searchParams.get("scrollTo");
        if (scroll === "shades") scrollToShades();

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
        setProjectNameState(projectName);
    }, [supabase, projectName]);

    const handleClick = (projectId: string) => {
        router.push(`/?projectId=${projectId}&scrollTo=shades`);
    }

    const handleDelete = async (projectId: string) => {
        const confirmed = window.confirm("Are you sure you want to delete this project?");
        if (confirmed) {
            try {
                await deleteProjectById(projectId);
                window.location.href = "/";
            } catch (error) {
                console.error("Failed to delete project", error);
                alert("Failed to delete the project. Please try again.");
            }
    }
    }

    const validateProjectName = (value: string) => {
        if (!value) {
            setError("Project name is required");
        } else if (value.length < 3) {
            setError("Project name must be at least 3 characters")
        } else {
            setError(null);
        }
    }

    if (loading) return <p>Loading projects...</p>

    if (projects.length === 0) return (
        <div className="flex flex-col justify-between h-full pb-8">
            <div>
                <p>No projects yet.</p>
            </div>
            <div>
                <p className="text-base text-text mb-2">Project name</p>
                <input 
                    className="bg-gray-50 border-1 border-gray-100 rounded-sm p-2 w-full text-base text-text"
                    type="text"
                    value={projectNameState}
                    onChange={(e) => {
                        setProjectNameState(e.target.value);
                        validateProjectName(e.target.value);
                    }}
                    onBlur={(e) => validateProjectName(e.target.value)}
                    placeholder="project name"
                />
                {error && (
                    <p className="text-red-600 text-sm mt-1">{error}</p>
                )}
                <SaveProject projectId={id} projectName={projectNameState} disabled={!projectNameState || !!error} />
                <Logout />
            </div>
        </div>
    )

    return (
        <div className="flex flex-col justify-between h-full pb-8">
            <div>
                <ul>
                    {projects.map((project) => (
                    <div key={project.id} className="flex flex-row justify-between items-center mb-8">
                        <li  className="flex hover:underline cursor-pointer items-center text-base text-text" onClick={() => handleClick(project.id)}>
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
            <div>
                <p className="text-base text-text mb-2">Project Name</p>
                <input 
                    className="bg-gray-50 border-1 border-gray-100 rounded-sm p-2 w-full text-base text-text"
                    type="text"
                    value={projectNameState}
                    onChange={(e) => {
                        setProjectNameState(e.target.value);
                        validateProjectName(e.target.value);
                    }}
                    onBlur={(e) => validateProjectName(e.target.value)}
                    placeholder="project name"
                />
                {error && (
                    <p className="text-red-600 text-sm mt-1">{error}</p>
                )}
                <SaveProject projectId={id} projectName={projectNameState} disabled={!projectNameState || !!error} />
                <button onClick={() => {window.location.href = "/"}} className="w-full bg-black text-lg text-background p-2 font- mt-2 rounded-md cursor-pointer hover:bg-gold-500 hover:text-black hover:shadow-md">
                    New Project
                </button>
                <button onClick={() => handleDelete(id)} className="w-full border-gray-100 border-1 text-lg text-headline p-2 font- mt-2 rounded-md cursor-pointer hover:bg-red-500 hover:text-white hover:shadow-md hover:border-red-500">
                    Delete Project
                </button>
                <Logout />
            </div>
        </div>
    );
}