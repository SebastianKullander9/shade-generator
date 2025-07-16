"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

type ProjectNameContextType = {
    projectName: string;
    setProjectName: (projectName: string) => void;
};

const ProjectNameContext = createContext<ProjectNameContextType | undefined>(undefined);

export const ProjectNameProvider = ({ children }: { children: ReactNode }) => {
    const [projectName, setProjectName] = useState<string>("");

    return (
        <ProjectNameContext.Provider value={{ projectName, setProjectName }}>
            {children}
        </ProjectNameContext.Provider>
    );
};

export const useProjectNameContext = () => {
    const context = useContext(ProjectNameContext);
    if (!context) throw new Error("useProjectNameContext must be used within ProjectNameProvider");
    return context;
};