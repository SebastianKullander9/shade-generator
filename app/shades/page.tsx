import { createClient } from "@/utils/supabase/server";

export default async function Shades() {
    const supabase = await createClient();
    const { data: shades } = await supabase.from("shades").select();
    return <pre>{JSON.stringify(shades, null, 2)}</pre>
}