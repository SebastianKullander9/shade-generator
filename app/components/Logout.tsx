/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs'

export default function Logout() {
    const supabase = createPagesBrowserClient();

    const handleOAuthLogout = async () => {
        const { error } = await supabase.auth.signOut();

        if (error) {
            console.error("Logout error:", error.message);
            return;
        }
        
        window.location.href = "/";
    }

    return (
        <div>
            <button onClick={handleOAuthLogout} className="w-full border-gray-100 border-1 bg-white text-lg text-headline p-2 font- mt-2 rounded-md cursor-pointer hover:bg-gold-500 hover:border-gold-500 hover:text-black hover:shadow-md">
                Logout
            </button>
        </div>
    );
}