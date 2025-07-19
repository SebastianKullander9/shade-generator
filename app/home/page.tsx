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
import { useColorContext } from "../context/ColorContext";
import { Link, Element, animateScroll as scroll, scroller } from 'react-scroll';
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import SideBar from "../components/SideBar";

export default function Home() {
	const [id, setId] = useState("");
	const searchParams = useSearchParams();
	const [projectNameState, setProjectNameState] = useState("");
	const [error, setError] = useState<string | null>(null);
	const { colors } = useColorContext();
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

	const scrollTo = (element: string, offset?: number) => {
		scroller.scrollTo(element, {
			duration: 500,
			smooth: true,
			offset: offset,
		});
	}

	return (
		<div className="w-full">
			<IconDark />
			<SideBar />
			
			<Element name="section1" className="relative">
				<div className="bg-turqoise-50 h-[calc(100vh-200px)] flex justify-center items-center">
					<ColorInput scrollToElement={() => scrollTo("section2")} />
					<button onClick={() => scrollTo("section2")} className={`absolute bottom-4 right-4 cursor-pointer ${colors.length === 0 ? "hidden" : ""}`} >
						<IoIosArrowDown size={40} />
					</button>
				</div>
			</Element>
			
			<Element name="section2" className="relative">
				<div className={`min-h-[100vh] bg-background ${colors.length === 0 ? "hidden" : ""}`}>
					<GenerateShades />
					<div className="flex justify-center">	
						<button onClick={() => scrollTo("section1", -200)} className={`absolute top-4 right-4 cursor-pointer ${colors.length === 0 ? "hidden" : ""}`} >
							<IoIosArrowUp size={40} />
						</button>
						<button onClick={() => scrollTo("section3")} className={`absolute bottom-4 right-4 cursor-pointer ${colors.length === 0 ? "hidden" : ""}`} >
							<IoIosArrowDown size={40} />
						</button>
					</div>
				</div>
			</Element>
			
			<Element name="section3" className="relative">
				<div className={`min-h-[100vh] bg-gold-50 ${colors.length === 0 ? "hidden" : ""}`}>
					<GenerateCode />
					<div className="flex justify-center">
						<button onClick={() => scrollTo("section2")} className={`absolute top-4 right-4 cursor-pointer ${colors.length === 0 ? "hidden" : ""}`} >
							<IoIosArrowUp size={40} />
						</button>
					</div>
				</div>
			</Element>
			
		</div>
	);
}