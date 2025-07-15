import { createClient } from '@/utils/supabase/client'

export async function createOrUpdateProjectById(userId: string, projectData: {
    id?: string,
    name: string,
    colors: {
        name: string,
        original_hex: string | string[],
        shades: [number, number, number][]
    }[]
}) {
    const supabase = createClient()
    let projectId = projectData.id

    if (!projectId) {
        const { data: newProject, error: projectError } = await supabase
            .from("projects")
            .insert({
                name: projectData.name,
                user_id: userId
            })
            .select()
            .single()

        if (projectError) throw projectError
        projectId = newProject.id
    } else {
        const { error: updateError } = await supabase
            .from("projects")
            .update({ name: projectData.name })
            .eq("id", projectId)
            .eq("user_id", userId)

        if (updateError) throw updateError

        const { data: oldColors, error: getColorsError } = await supabase
            .from("colors")
            .select("id")
            .eq("project_id", projectId)

        if (getColorsError) throw getColorsError

        const colorIds = oldColors.map(c => c.id)

        if (colorIds.length > 0) {
            const { error: deleteShadesError } = await supabase
                .from("shades")
                .delete()
                .in("color_id", colorIds)

            if (deleteShadesError) throw deleteShadesError

            const { error: deleteColorsError } = await supabase
                .from("colors")
                .delete()
                .in("id", colorIds)

            if (deleteColorsError) throw deleteColorsError
        }
    }

    for (const color of projectData.colors) {
        const originalHex = Array.isArray(color.original_hex)
            ? color.original_hex[0]
            : color.original_hex

        const { data: insertedColor, error: colorError } = await supabase
            .from("colors")
            .insert({
                name: color.name,
                original_hex: originalHex,
                project_id: projectId,
            })
            .select()
            .single()

        if (colorError) throw colorError

        const shadesToInsert = color.shades.map(([h, s, l]) => ({
            color_id: insertedColor.id,
            hue: h,
            saturation: s,
            lightness: l
        }))

        const { error: shadesError } = await supabase
            .from("shades")
            .insert(shadesToInsert)

        if (shadesError) throw shadesError
    }

    return { id: projectId }
}