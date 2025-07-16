import { ReactNode } from "react";
import { ColorProvider } from "./ColorContext";
import { ShadesProvider } from "./ShadesContext";
import { ProjectNameProvider } from "./ProjectNameContext";

export const Providers = ({ children }: { children: ReactNode }) => (
    <ProjectNameProvider>
        <ColorProvider>
            <ShadesProvider>
                {children}
            </ShadesProvider>
        </ColorProvider>
    </ProjectNameProvider>
);