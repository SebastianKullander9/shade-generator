import { useEffect, useState } from "react";
import { useShadesContext } from "../context/ShadesContext";
import CodeBlock from "./CodeBlock";

export default function GenerateCode() {
    const { shades } = useShadesContext();
    const [ code, setCode ] = useState("");
    const exampleCodeOne = `
:root {
    --color-example-900: hsl(100, 50%, 18%);
    --color-example-800: hsl(100, 50%, 26%);
    /* etc */
}
    `;
    const exampleCodeTwo = `
.element {
    background-color: var(--color-example-800);
}
    `;
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
        <div className="flex justify-center gap-8 w-full py-16">
            <div className="w-1/3">
                <p className="text-base text-text mb-8">Copy the shades below to use them in your Tailwind project.</p>
                <CodeBlock code={code} />
            </div>
            <div className="w-1/3">
                <p className="text-base text-text mb-8">
                    If you prefer to use regular CSS instead of Tailwind, simply copy the shades and replace the <code>@theme</code> tag with <code>:root</code>. You can then use the colors as CSS variables, like in the example below.
                </p>
                <CodeBlock code={exampleCodeOne} />
                <div className="mb-8"></div>
                <CodeBlock code={exampleCodeTwo} />
            </div>
        </div>
    );
}