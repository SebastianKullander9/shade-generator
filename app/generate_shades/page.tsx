"use client";
import ColorInput from "../components/ColorInput";
import RenderShades from "../components/RenderShades";

export default function GenerateShades() {
	return (
		<div className="w-full">
            <div>
                <p>Enter a color</p>
			    <ColorInput />
				<RenderShades />
            </div>
		</div>
	);
}