import { toast, ToastContainer } from "react-toastify";
import FrameworkDropdown from "./FrameworkDropdown";
import SyntaxHighlighter from "react-syntax-highlighter";
import useGraphStore from "../state/graphStore";
import { useEffect, useState } from "react";
import axiosInstance from "../axiosInstance";

// @ts-ignore
const atomOneDark = {
  hljs: {
    display: "block",
    overflowX: "auto",
    padding: "0.5em",
    color: "#abb2bf",
    background: "#282c34",
    height: "100%",
    "-ms-overflow-style": "none",
    "scrollbar-width": "none",
  },
  "hljs::-webkit-scrollbar": {
    " display": "none",
  },
  "hljs-comment": {
    color: "#5c6370",
    fontStyle: "italic",
  },
  "hljs-quote": {
    color: "#5c6370",
    fontStyle: "italic",
  },
  "hljs-doctag": {
    color: "#c678dd",
  },
  "hljs-keyword": {
    color: "#c678dd",
  },
  "hljs-formula": {
    color: "#c678dd",
  },
  "hljs-section": {
    color: "#e06c75",
  },
  "hljs-name": {
    color: "#e06c75",
  },
  "hljs-selector-tag": {
    color: "#e06c75",
  },
  "hljs-deletion": {
    color: "#e06c75",
  },
  "hljs-subst": {
    color: "#e06c75",
  },
  "hljs-literal": {
    color: "#56b6c2",
  },
  "hljs-string": {
    color: "#98c379",
  },
  "hljs-regexp": {
    color: "#98c379",
  },
  "hljs-addition": {
    color: "#98c379",
  },
  "hljs-attribute": {
    color: "#98c379",
  },
  "hljs-meta-string": {
    color: "#98c379",
  },
  "hljs-built_in": {
    color: "#e6c07b",
  },
  "hljs-class .hljs-title": {
    color: "#e6c07b",
  },
  "hljs-attr": {
    color: "#d19a66",
  },
  "hljs-variable": {
    color: "#d19a66",
  },
  "hljs-template-variable": {
    color: "#d19a66",
  },
  "hljs-type": {
    color: "#d19a66",
  },
  "hljs-selector-class": {
    color: "#d19a66",
  },
  "hljs-selector-attr": {
    color: "#d19a66",
  },
  "hljs-selector-pseudo": {
    color: "#d19a66",
  },
  "hljs-number": {
    color: "#d19a66",
  },
  "hljs-symbol": {
    color: "#61aeee",
  },
  "hljs-bullet": {
    color: "#61aeee",
  },
  "hljs-link": {
    color: "#61aeee",
    textDecoration: "underline",
  },
  "hljs-meta": {
    color: "#61aeee",
  },
  "hljs-selector-id": {
    color: "#61aeee",
  },
  "hljs-title": {
    color: "#61aeee",
  },
  "hljs-emphasis": {
    fontStyle: "italic",
  },
  "hljs-strong": {
    fontWeight: "bold",
  },
};

export type ModelCompilationType = {
  isCollapsed: boolean,
}

const ModelCompilationContent: React.FC<ModelCompilationType> = ({isCollapsed}) => {
  const [codeString, setCodeString] = useState("");
  const [previousNodes, setPreviousNodes] = useState<any>([]);

  const nodes = useGraphStore((state) => state.nodes);
  const edges = useGraphStore((state) => state.edges);

  const filterNodeProperties = (nodes: any[]) => {
    return nodes.map(node => {
      const { position, dragging, positionAbsolute, selected, ...rest } = node;
      return rest;
    });
  };

  const deepEqual = (obj1 :any, obj2: any) => {
    if (obj1 === obj2) return true;
    if (typeof obj1 !== 'object' || typeof obj2 !== 'object' || obj1 == null || obj2 == null) return false;

    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) return false;

    for (const key of keys1) {
      if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) return false;
    }

    return true;
  };

  useEffect(() => {
    if (isCollapsed) {
      return;
    }
    const filteredNodes = filterNodeProperties(nodes);
    if (!deepEqual(filteredNodes, previousNodes)) {
      axiosInstance.post("/compile/pytorch", { nodes: filteredNodes, edges })
        .then((response) => {
          if (response.status === 200) {
            const responseBody = JSON.parse(response.data.body);
            setCodeString(responseBody.model_code);
            setPreviousNodes(filteredNodes); // Update previousNodes state
          } else {
            toast.error("Failed to compile model", { autoClose: 2000, position: "top-right" });
          }
        })
        .catch((error) => {
          toast.error(`Error: ${error.message}`, { autoClose: 2000, position: "top-right" });
        });
    }
  }, [isCollapsed, nodes]);


  const copyToClipboard = (data: string) => {
    navigator.clipboard.writeText(data)
      .then(() => {
        toast.success("Code copied to clipboard!", { autoClose: 2000, position: "top-right" });
      })
      .catch((_) => {
        toast.error("Failed to copy code to clipboard!", { autoClose: 2000, position: "top-right" });
      });
  };

  // const handleCopyNodes = () => {
  //   copyToClipboard(JSON.stringify(nodes, null, 2));
  // };

  // const handleCopyEdges = () => {
  //   copyToClipboard(JSON.stringify(edges, null, 2));
  // };

  return (
    <div className="flex flex-col h-full mx-6">
      <div className="flex-none mt-6 flex flex-row items-center space-x-4 mb-4">
        <FrameworkDropdown />
        {/* <button
          type="submit"
          className="mt-1 justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 opacity-80 hover:scale-105"
        >
          Complete Model
        </button>
        <button
          type="submit"
          className="mt-1 justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 opacity-80 hover:scale-105"
        >
          Visualize Model
        </button>
        <button
          type="button"
          onClick={handleCopyNodes}
          className="mt-1 justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 opacity-80 hover:scale-105"
        >
          Copy Nodes
        </button>
        <button
          type="button"
          onClick={handleCopyEdges}
          className="mt-1 justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 opacity-80 hover:scale-105"
        >
          Copy Edges
        </button> */}
        <ToastContainer />
      </div>

      <div className="flex-none">
        <div className="w-full bg-slate-900 border-t border-x-3 rounded-t-lg h-6 opacity-85 flex flex-row items-center justify-end pr-2">
          <p className="text-gray-200 text-xs cursor-pointer" onClick={() => copyToClipboard(codeString)}>Copy Code</p>
          <img src="copy.svg" width={18} className="cursor-pointer" onClick={() => copyToClipboard(codeString)} />
        </div>
      </div>
      <div className="flex-1 overflow-y-hidden">
        <SyntaxHighlighter
          language="python"
          // @ts-ignore super weird issue with the react-highlighter package, it's not recognizing the style prop type as valid
          style={atomOneDark}
          showLineNumbers={true}
          wrapLongLines={false}
        >
          {codeString}
        </SyntaxHighlighter>
      </div>
      <div className="flex-none">
        <div className="w-full bg-slate-900 border-b border-x-3 rounded-b-lg h-6 opacity-85 mb-6"></div>
      </div>
    </div>
  );
};

export default ModelCompilationContent;
