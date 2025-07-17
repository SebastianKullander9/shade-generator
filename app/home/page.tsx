"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import ColorInput from "../components/ColorInput";
//import { useProjectNameContext } from "../context/ProjectNameContext";
import GenerateShades from "../components/GenerateShades";
import GenerateCode from "../components/GenerateCode";
import SaveProject from "../components/SaveProject";
//import ProjectSideBar from "../components/ProjectSideBar";
//import ProjectLoader from "../components/ProjectLoader";
import { useLoadProject } from "../hooks/useLoadProject"; // adjust path as needed
//import Image from "next/image";
import IconDark from "../components/IconDark";



export default function Home() {
	const [id, setId] = useState("");
	const searchParams = useSearchParams();
	const [projectNameState, setProjectNameState] = useState("");
	const [error, setError] = useState<string | null>(null);
	////const { projectName } = useProjectNameContext();
	const { loadProject } = useLoadProject();



	useEffect(() => {
		const projectId = searchParams.get("projectId");

		if (!projectId) return;

		setId(projectId);

		(async () => {
			const projectName = await loadProject(projectId); // ✅ Await here
			if (projectName) {
				setProjectNameState(projectName); // ✅ Safe to set state now
			}
		})();
	}, [searchParams]);

	const validateProjectName = (value: string) => {
		if (!value) {
			setError("Project name is required");
		} else if (value.length < 3) {
			setError("Project name must be at least 3 characters")
		} else {
			setError(null);
		}
	}

	return (
		<div className="w-full">
			<IconDark />
			<div className="bg-turqoise-50 h-[calc(100vh-200px)] flex justify-center items-center">
				<ColorInput />
			</div>
			<div className="h-[100vh] bg-background">
				<GenerateShades />
			</div>
		</div>
	);
}