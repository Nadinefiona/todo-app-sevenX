import { signIn } from "@/auth";
import React from 'react';

export function SignIn() {
    return (
        <div className="relative min-h-screen flex items-center justify-center">
            <div className="absolute top-0 left-0 w-full h-1/2 bg-white"></div>
            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-black"></div>
            <div className="relative bg-black p-8 rounded-lg shadow-lg max-w-md w-full border">
                <h1 className="text-white mb-6 text-5xl font-semibold text-center pb-8 pt-8 font-mono">Welcome to  App</h1>
                <form
                action={async () => {
                    "use server"
                    await signIn("github")
                }}
                className="flex justify-center mb-7"
                >
                <button type="submit" className="bg-white text-black px-4 py-2 rounded hover:bg-gray-500">Sign in with GitHub</button>
                </form> 
            </div>
        </div>
    );
}
