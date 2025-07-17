"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import ColorInput from "../components/ColorInput";
//import { useProjectNameContext } from "../context/ProjectNameContext";
import GenerateShades from "../components/GenerateShades";
import GenerateCode from "../components/GenerateCode";
import SaveProject from "../components/SaveProject";
import ProjectSideBar from "../components/ProjectSideBar";
//import ProjectLoader from "../components/ProjectLoader";
import { useLoadProject } from "../hooks/useLoadProject"; // adjust path as needed
import Image from "next/image";



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
		<div className="">
			<ProjectSideBar />
			<div className="w-full h-20 flex justify-center items-center">
				<Image src="/images/shadegenlogo.png" alt="Logo" width={200} height={60} />
			</div>
			<div className="min-w-6/12">
				<div>
					<div className="flex justify-center gap-10">
						<ColorInput />
						<div className="flex flex-col max-w-xs">
							<input 
								className="bg-gray-50 rounded-md p-2 text-xl"
								type="text"
								value={projectNameState}
								onChange={(e) => {
									setProjectNameState(e.target.value);
									validateProjectName(e.target.value);
								}}
								onBlur={(e) => validateProjectName(e.target.value)}
								placeholder="project name"
							/>
							{error && (
								<p className="text-red-600 text-sm mt-1">{error}</p>
							)}
							<SaveProject 
								projectId={id}
								projectName={projectNameState}
								disabled={!projectNameState || !!error}
							/>
						</div>
					</div>
					<div className="mb-10"></div>
					<GenerateShades />
					<GenerateCode />
				</div>
			</div>
		</div>
	);
}