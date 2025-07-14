import { ReactNode } from "react";
import { ColorProvider } from "./ColorContext";
import { ShadesProvider } from "./ShadesContext";

export const Providers = ({ children }: { children: ReactNode }) => (
    <ColorProvider>
        <ShadesProvider>
            {children}
        </ShadesProvider>
    </ColorProvider>
);