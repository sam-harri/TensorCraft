import React, { useState, useEffect } from "react";
import { NodeProps, Handle, Position } from "reactflow";
import { v4 as uuidv4 } from 'uuid';
import useGraphStore from "../../state/graphStore";
import NodeHeader from "../../components/NodeHeader";
import ShapeLabel from "../../components/ShapeLabel";
import Hint from "../../components/Hint";

const ConcatNode: React.FC<NodeProps> = (props) => {
  const { nodes, edges, updateNodeData } = useGraphStore((state) => ({
    nodes: state.nodes,
    edges: state.edges,
    updateNodeData: state.updateNodeData,
  }));

  const [isCollapsed, setIsCollapsed] = useState(true);
  const [dim, setDim] = useState(0);
  const [error, setError] = useState("");
  const [inputNode1, setInputNode1] = useState<string | null>(null);
  const [inputNode2, setInputNode2] = useState<string | null>(null);

  // Generate UUIDs for handles when the component mounts
  const [handleIds] = useState(() => ({
    a: uuidv4(),
    b: uuidv4()
  }));

  const node1 = inputNode1 ? nodes.find((node) => node.id === inputNode1) : null;
  const node2 = inputNode2 ? nodes.find((node) => node.id === inputNode2) : null;

  const inputShape1 = node1?.data.outputShape || "Not Connected";
  const inputShape2 = node2?.data.outputShape || "Not Connected";

  useEffect(() => {
    const incomingEdges = edges.filter((edge) => edge.target === props.id);
    const newNode1 = incomingEdges.find((edge) => edge.targetHandle === handleIds.a)?.source || null;
    const newNode2 = incomingEdges.find((edge) => edge.targetHandle === handleIds.b)?.source || null;

    if (inputNode1 !== newNode1) setInputNode1(newNode1);
    if (inputNode2 !== newNode2) setInputNode2(newNode2);

    if (newNode1 === null || newNode2 === null) {
      updateNodeData(props.id, { outputShape: "Not Connected", outputShapeOrder: null });
    }
  }, [edges, props.id, inputNode1, inputNode2, handleIds, updateNodeData]);

  useEffect(() => {
    const updateOutputShape = () => {
      setError("");
      const node1 = inputNode1 ? nodes.find((node) => node.id === inputNode1) : null;
      const node2 = inputNode2 ? nodes.find((node) => node.id === inputNode2) : null;

      const shape1 = node1?.data.outputShape || null;
      const shape2 = node2?.data.outputShape || null;

      if (shape1 && shape2) {
        const parsedShape1 = shape1.replace(/[()]/g, '').split(',').map((s: string) => s.trim());
        const parsedShape2 = shape2.replace(/[()]/g, '').split(',').map((s: string) => s.trim());

        if (parsedShape1.length !== parsedShape2.length) {
          setError("The dimensions of the input tensors do not match.");
          updateNodeData(props.id, { outputShape: "Not Connected", outputShapeOrder: null });
          return;
        }

        let errorOccurred = false;
        const outputShape = parsedShape1.map((dim1: string, idx: number) => {
          const dim2 = parsedShape2[idx];
          const isDim1Numeric = !isNaN(parseInt(dim1));
          const isDim2Numeric = !isNaN(parseInt(dim2));

          if (!isDim1Numeric && !isDim2Numeric) {
            return dim1.charAt(0);
          } else if (!isDim1Numeric) {
            return dim1;
          } else if (!isDim2Numeric) {
            return dim2;
          } else if (idx === dim) {
            return `${parseInt(dim1) + parseInt(dim2)}`;
          } else if (dim1 === dim2) {
            return dim1;
          } else {
            errorOccurred = true;
            return null;
          }
        }).filter(Boolean).join(", ");

        if (errorOccurred) {
          setError("The dimensions of the input tensors do not match.");
          updateNodeData(props.id, { outputShape: "Not Connected", outputShapeOrder: null });
        } else {
          updateNodeData(props.id, { outputShape: `(${outputShape})`, outputShapeOrder: node1?.data.outputShapeOrder });
        }
      } else {
        updateNodeData(props.id, { outputShape: "Not Connected", outputShapeOrder: null });
      }
    };

    updateOutputShape();
  }, [inputNode1, inputNode2, dim, node1?.data.outputShape, node2?.data.outputShape, props.id, updateNodeData]);

  const handleDimChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setDim(parseInt(event.target.value));
  };

  const inputShape = inputShape1 !== "Not Connected" ? inputShape1.replace(/[()]/g, '').split(',').map((s: string) => s.trim()) : [];

  return (
    <div className="bg-white shadow-md rounded border border-gray-300 w-72 relative">
      <Handle
        type="target"
        position={Position.Left}
        id={handleIds.a}
        style={{ top: 'calc(50% - 16.67%)' }}
        isConnectable={true}
      />
      <Handle
        type="target"
        position={Position.Left}
        id={handleIds.b}
        style={{ top: 'calc(50% + 16.67%)' }}
        isConnectable={true}
      />
      <NodeHeader
        title="Concatenate"
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        imageSource="tensor/concat.png"
        imageAlt="concatenate"
        props={props}
      />
      {!isCollapsed && (
        <div className="p-4 border-t border-gray-200 relative">
          <div className="flex items-center">
            <label className="text-gray-600 text-sm mb-1 mr-2">
              Concatenate Dimension:
            </label>
            <Hint message="Select the dimension to concatenate over." />
          </div>
          <div className="relative mb-4">
            <select 
              value={dim} 
              onChange={handleDimChange} 
              className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
              {inputShape.map((_: any, idx: any) => (
                <option key={idx} value={idx}>
                  {idx}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
              </svg>
            </div>
          </div>
          <ShapeLabel
            input={true}
            shape={inputShape1}
            shapeHintMessage="The shape of the first input tensor."
          />
          <ShapeLabel
            input={true}
            shape={inputShape2}
            shapeHintMessage="The shape of the second input tensor."
          />
          <ShapeLabel
            input={false}
            shape={props.data.outputShape || "Not Connected"}
            shapeHintMessage="The shape of the output tensor after concatenation."
          />
          {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>
      )}
      <Handle
        type="source"
        position={Position.Right}
        id="output"
        isConnectable={true}
      />
    </div>
  );
};

export default ConcatNode;
