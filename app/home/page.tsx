"use client";
import ColorInput from "../components/ColorInput";
//import RenderShades from "../components/RenderShades";
import GenerateShades from "../components/GenerateShades";

export default function Home() {
	return (
		<div className="w-full">
            <div>
                <p>Enter a color</p>
			    <ColorInput />
				<GenerateShades />
            </div>
		</div>
	);
}