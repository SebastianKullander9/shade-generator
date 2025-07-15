import { createOrUpdateProjectById } from "@/utils/supabase/insertProject";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import { useShadesContext } from "../context/ShadesContext";

export default function SaveProject() {
    const supabase = createClient();
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
        if (!userId) {
            console.log("User not signed in")
            return
        }

        await createOrUpdateProjectById(userId, {
            //id: "8b60f217-f375-4038-bf88-66f4db19599a",
            name: "shadeProject",
            colors: shades.map(c => ({
                name: c.name,
                original_hex: c.original_hex,
                shades: c.shades.map(s => s as [number, number, number])
            }))
        })
    }

    return (
        <div>
            <button onClick={handleClick}>Save Project</button>
        </div>
    );
}