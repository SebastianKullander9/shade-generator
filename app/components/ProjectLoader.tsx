import { useEffect } from "react";
import { useShadesContext } from "../context/ShadesContext";
import { useColorContext } from "../context/ColorContext";
import { useProjectNameContext } from "../context/ProjectNameContext";
import { createClient } from "@/utils/supabase/client";
import isEqual from 'lodash.isequal';

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
    name: string;
    colors: Color[];
};

export default function ProjectLoader({ projectId }: { projectId: string }) {
    const supabase = createClient();
    const { shades, setShades } = useShadesContext();
    const { setColor } = useColorContext();
    const { setProjectName } = useProjectNameContext(); 

    useEffect(() => {
        async function loadProject() {
            const { data, error } = await supabase
                .from("projects")
                .select(`
                    name,
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

            if (!isEqual(shades, shadesData)) {
                setShades(shadesData);
            }
            setProjectName(data.name)
            setColor(data.colors.map(c => c.original_hex));
        }

        if (projectId) loadProject();
    }, [])

    return <p>Loading project...</p>
}