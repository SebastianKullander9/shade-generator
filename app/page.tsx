"use client";
import { useRouter } from "next/navigation";

export default function Home() {
	const router = useRouter();
	
	return (
		<div className="flex justify-center">
			<div className="text-center w-1/3">
				<h1 className="text-2xl font-bold mb-6">Welcome to Shade Generator</h1>
				<p>This page helps you generate color shades for your design projects based on your existing color palette</p>
				<button onClick={() => router.push("/generate_shades")} className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 cursor-pointer">
					Generate Shades
				</button>
			</div>
		</div>
  	);
}