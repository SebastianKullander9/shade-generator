"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import ColorInput from "../components/ColorInput";
//import { useProjectNameContext } from "../context/ProjectNameContext";
import GenerateShades from "../components/GenerateShades";
import GenerateCode from "../components/GenerateCode";
import SaveProject from "../components/SaveProject";
//import ProjectLoader from "../components/ProjectLoader";
import { useLoadProject } from "../hooks/useLoadProject"; // adjust path as needed


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
            <div>
                <p>Enter a color</p>
			    <ColorInput />

				<input 
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

				<div className="mb-10"></div>
				<GenerateShades />
				<SaveProject 
					projectId={id}
					projectName={projectNameState}
					disabled={!projectNameState || !!error}
				/>
				<GenerateCode />
            </div>
		</div>
	);
}