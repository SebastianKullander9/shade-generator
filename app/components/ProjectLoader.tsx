import { useEffect } from "react";
import { useShadesContext } from "../context/ShadesContext"
import { useRouter } from "next/navigation"
import { createClient } from "@/utils/supabase/client"

type Shade = {
    hue: number;
    saturation: number;
    lightness: number;
};

type Color = {
    name: string;
    original_hex: string;
    shades: Shade[];
}

type ProjectData = {
    colors: Color[];
};

export default function ProjectLoader({ projectId }: { projectId: string }) {
    const supabase = createClient();
    const { setShades } = useShadesContext();
    const router = useRouter();

    useEffect(() => {
        async function loadProject() {
            const { data, error } = await supabase
                .from("projects")
                .select(`
                    colors (
                        name,
                        original_hex,
                        shades (
                            hue,
                            saturation,
                            lightness
                        )
                    )    
                `)
                .eq("id", projectId)
                .single<ProjectData>();

            if (error) {
                console.error(error)
                return
            }

            const shadesData = data.colors.map((color) => ({
                name: color.name,
                original_hex: color.original_hex,
                shades: color.shades.map((s) => [s.hue, s.saturation, s.lightness] as [number, number, number])
            }));

            setShades(shadesData);
        }

        if (projectId) loadProject();
    }, [projectId, setShades, router])

    return <p>Loading project...</p>
}