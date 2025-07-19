import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
//import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { prism } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function CodeBlock({ code }: { code: string }) {
    const [copied, setCopied] = useState(false);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    if (!code) return null;

    return (
        <div className="relative bg-gray-50 text-white overflow-hidden">
            <button
                onClick={copyToClipboard}
                className="absolute right-2 top-2 bg-gray-100 text-sm text-text px-3 py-1 rounded hover:bg-gray-200 cursor-pointer"
            >
                {copied ? "Copied!" : "Copy"}
            </button>

            <SyntaxHighlighter
                language="css"
                style={prism}
                customStyle={{ margin: 0, padding: "1rem", fontSize: "0.9rem", backgroundColor: "#fffffe"}}
            >
                {code}
            </SyntaxHighlighter>
        </div>
    );
}