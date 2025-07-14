import { useEffect, useState } from "react";
import { useShadesContext } from "../context/ShadesContext";
import CodeBlock from "./CodeBlock";

export default function GenerateCode() {
    const { shades } = useShadesContext();
    const [ code, setCode ] = useState("");
    const steps = [900, 800, 700, 600, 500, 400, 300, 200, 100, 50];

    useEffect(() => {
        let cssString = "@theme {\n";
        
        shades.map((shade) => {
            shade.shades.map((color, index) => {
                cssString += `    --color-${shade.name}-${steps[index]}: hsl(${color[0]}, ${color[1]}%, ${color[2]}%,)\n`
            })
        });

        cssString += "}";

        setCode(cssString);
    }, [shades])

    return (
        <div>
            <CodeBlock code={code} />
        </div>
    );
}