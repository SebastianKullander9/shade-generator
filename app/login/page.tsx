/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs'

export default function Login() {
const supabase = createPagesBrowserClient()

const handleOAuthLogin = async (provider: 'google' | 'github') => {
	const { data, error } = await supabase.auth.signInWithOAuth({
		provider,
		options: {
			redirectTo: `${window.location.origin}/auth/callback`,
			queryParams: provider === 'google' ? {
			access_type: 'offline',
			prompt: 'consent',
		} : undefined,
	},
});

if (error) console.error(`${provider} login error:`, error)
}

return (
	<div className="flex flex-col gap-4">
		<button onClick={() => handleOAuthLogin('google')}>
			Sign in with Google
		</button>
		<button onClick={() => handleOAuthLogin('github')}>
			Sign in with GitHub
		</button>
	</div>
)
}