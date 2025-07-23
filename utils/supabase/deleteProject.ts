import { createClient } from '@/utils/supabase/client'

export async function deleteProjectById(projectId: string | null) {
    const supabase = createClient();

    const { error } = await supabase
        .from("projects")
        .delete()
        .eq("id", projectId);

    if (error) {
        console.error("Error deleting project: ", error.message);
        throw error;
    }

    return { success: true };
}