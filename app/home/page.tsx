"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import ColorInput from "../components/ColorInput";
//import RenderShades from "../components/RenderShades";
import GenerateShades from "../components/GenerateShades";
import GenerateCode from "../components/GenerateCode";
import SaveProject from "../components/SaveProject";
import ProjectLoader from "../components/ProjectLoader";

export default function Home() {
	const [id, setId] = useState("");
	const searchParams = useSearchParams();


	useEffect(() => {
		const projectId = searchParams.get("projectId")

		if (projectId) setId(projectId);
	}, [id, searchParams])

	return (
		<div className="w-full">
            <div>
				{id ? <ProjectLoader projectId={id} /> : ""}
                <p>Enter a color</p>
			    <ColorInput />
				<div className="mb-10"></div>
				<GenerateShades />
				<SaveProject />
				<GenerateCode />
            </div>
		</div>
	);
}