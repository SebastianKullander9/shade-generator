import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'
export async function GET(request: Request) {
    const { searchParams, origin } = new URL(request.url)
    const code = searchParams.get('code')
    let next = searchParams.get('next') ?? '/'

    if (!next.startsWith('/')) {
        next = '/'
    }
    if (code) {
        const supabase = await createClient()
        const { error } = await supabase.auth.exchangeCodeForSession(code)
        if (!error) {
            const { data: { user } } = await supabase.auth.getUser();

            if (user) {
                const { full_name, avatar_url, picture, name, email } = user.user_metadata;

                const avatar = avatar_url || picture || null;
                
                await supabase.from("profiles").upsert({
                    user_id: user.id,
                    full_name: full_name || name || null,
                    avatar_url: avatar,
                    email: email
                });
            }

            const forwardedHost = request.headers.get('x-forwarded-host')
            const isLocalEnv = process.env.NODE_ENV === 'development'

            if (isLocalEnv) {
                return NextResponse.redirect(`${origin}${next}`)
            } else if (forwardedHost) {
                return NextResponse.redirect(`https://${forwardedHost}${next}`)
            } else {
                return NextResponse.redirect(`${origin}${next}`)
            }
        }
    }

    return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}