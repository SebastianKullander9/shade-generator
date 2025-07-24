"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import ColorInput from "../components/ColorInput";
import GenerateShades from "../components/GenerateShades";
import GenerateCode from "../components/GenerateCode";
import { useLoadProject } from "../hooks/useLoadProject";
import IconDark from "../components/IconDark";
import { useColorContext } from "../context/ColorContext";
import { Element, scroller } from 'react-scroll';
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import SideBar from "../components/SideBar";

export default function Home() {
	const [id, setId] = useState("");
	const searchParams = useSearchParams();
	const { colors } = useColorContext();
	const { loadProject } = useLoadProject();
	const [projectNameState, setProjectNameState] = useState("");

	useEffect(() => {
		const projectId = searchParams.get("projectId");

		if (!projectId) return;

		setId(projectId);

		(async () => {
			const projectName = await loadProject(projectId);
			if (projectName) {
				setProjectNameState(projectName);
			}
		})();
	}, [searchParams]);

	const scrollTo = (element: string, offset?: number) => {
		scroller.scrollTo(element, {
			duration: 500,
			smooth: true,
			offset: offset,
		});
	}

	const scrollToShades = () => scrollTo("section2");

	return (
		<div className="w-full">
			<IconDark />
			<SideBar id={id} projectName={projectNameState} scrollToShades={scrollToShades} />
			
			<Element name="section1" className="relative">
				<div className="bg-turqoise-50 h-[calc(100vh-100px)] sm:h-[calc(100vh-200px)] flex justify-center items-center">
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