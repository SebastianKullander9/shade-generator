"use client";
import ColorInput from "../components/ColorInput";
//import RenderShades from "../components/RenderShades";
import GenerateShades from "../components/GenerateShades";
import GenerateCode from "../components/GenerateCode";

export default function Home() {
	return (
		<div className="w-full">
            <div>
                <p>Enter a color</p>
			    <ColorInput />
				<div className="mb-10"></div>
				<GenerateShades />
				<GenerateCode />
            </div>
		</div>
	);
}