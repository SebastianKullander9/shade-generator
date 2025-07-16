import { createOrUpdateProjectById } from "@/utils/supabase/insertProject";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import { useShadesContext } from "../context/ShadesContext";
import { useRouter } from "next/navigation";

type SaveProjectProps = {
    projectId?: string;
    projectName: string;
    disabled: boolean;
}

export default function SaveProject({ projectId, projectName, disabled }: SaveProjectProps) {
    const supabase = createClient();
    const router = useRouter();
    const [userId, setUserId] = useState<string | null>(null);
    const { shades } = useShadesContext();

    useEffect(() => {
        const getUser = async () => {
            const { data } = await supabase.auth.getUser();
            setUserId(data.user?.id ?? null);
        }

        getUser();
    }, [supabase])

    const handleClick = async () => {
        console.log("test")
        if (!userId) {
            console.log("User not signed in")
            return
        }

        const { id } = await createOrUpdateProjectById(userId, {
            id: projectId,
            name: projectName,
            colors: shades.map(c => ({
                name: c.name,
                original_hex: c.original_hex,
                shades: c.shades.map(s => s as [number, number, number])
            }))
        })

        router.push(`/home/?projectId=${id}`)
    }

    return (
        <div>
            <button disabled={disabled} onClick={handleClick}>Save Project</button>
        </div>
    );
}