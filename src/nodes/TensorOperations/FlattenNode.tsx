import React, { useState, useEffect } from "react";
import { NodeProps, Handle, Position } from "reactflow";
import useGraphStore from "../../state/graphStore";
import NodeHeader from "../../components/NodeHeader";
import ShapeLabel from "../../components/ShapeLabel";
import Hint from "../../components/Hint";

export type FlattenLayerNodeData = {
  inputShape: string | null;
  outputShape: string | null;
  inputShapeOrder: string | null;
  outputShapeOrder: string | null;
  flattenStart: number;
  flattenEnd: number;
};

const FlattenNode: React.FC<NodeProps<FlattenLayerNodeData>> = (props) => {
  const updateNodeData = useGraphStore((state) => state.updateNodeData);
  const [isCollapsed, setIsCollapsed] = useState(true);

  const updateOutputShape = (flattenStart: number, flattenEnd: number) => {
    const inputShape = props.data.inputShape?.replace(/[()]/g, '');
    if (inputShape && props.data.inputShapeOrder) {
      const shapeParts = inputShape.split(",").map(dim => parseInt(dim.trim()));
      const flattenedDim = shapeParts.slice(flattenStart, flattenEnd + 1).reduce((a, b) => a * b, 1);
      const outputShape = [
        ...shapeParts.slice(0, flattenStart),
        flattenedDim,
        ...shapeParts.slice(flattenEnd + 1)
      ].join(", ");
      const outputShapeOrder = [
        ...props.data.inputShapeOrder.slice(0, flattenStart),
        props.data.inputShapeOrder[flattenStart],  // Keep the letter of the starting dim
        ...props.data.inputShapeOrder.slice(flattenEnd + 1)
      ].join("");
      updateNodeData(props.id, {
        outputShape: `(${outputShape})`,
        outputShapeOrder,
        flattenStart,
        flattenEnd
      });
    } else {
      updateNodeData(props.id, { outputShape: null, outputShapeOrder: null, flattenStart: null, flattenEnd: null });
    }
  };

  useEffect(() => {
    if (props.data.inputShape && props.data.inputShapeOrder) {
      updateOutputShape(props.data.flattenStart, props.data.flattenEnd);
    }
  }, [
    props.data.inputShape,
    props.data.inputShapeOrder,
    props.data.flattenStart,
    props.data.flattenEnd,
    updateNodeData,
    props.id,
  ]);

  const handleStartDimChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const start = parseInt(e.target.value, 10);
    updateNodeData(props.id, { flattenStart: start, flattenEnd: Math.max(start, props.data.flattenEnd || start) });
  };

  const handleEndDimChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const end = parseInt(e.target.value, 10);
    updateNodeData(props.id, { flattenEnd: end });
  };

  const renderOptions = (start: number = 0) => {
    if (props.data.inputShapeOrder) {
      return props.data.inputShapeOrder
        .split("")
        .slice(start)
        .map((char, idx) => (
          <option key={start + idx} value={start + idx}>
            {char}
          </option>
        ));
    }
    return null;
  };

  return (
    <div className="bg-white shadow-md rounded border border-gray-300 w-72 relative">
      <Handle type="target" position={Position.Left} isConnectable={true} />
      <NodeHeader
        title="Flatten"
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        imageSource="tensor/flatten.png"
        imageAlt="Flatten"
        props={props}
      />
      {!isCollapsed && (
        <div className="p-4 border-t border-gray-200 relative">
          <div className="flex items-center">
            <label className="text-gray-600 text-sm mb-1 mr-2">
              Flatten Dimensions:
            </label>
            <Hint message="Select the range of dimensions to flatten." />
          </div>
          {props.data.inputShapeOrder && props.data.inputShapeOrder.length > 0 ? (
            <div className="flex space-x-2">
              <select
                value={props.data.flattenStart ?? 0}
                onChange={handleStartDimChange}
                className="block appearance-none w-1/2 bg-white border border-gray-300 hover:border-gray-400 px-2 py-1 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
              >
                {renderOptions()}
              </select>
              <select
                value={props.data.flattenEnd ?? 0}
                onChange={handleEndDimChange}
                className="block appearance-none w-1/2 bg-white border border-gray-300 hover:border-gray-400 px-2 py-1 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
              >
                {renderOptions(props.data.flattenStart ?? 0)}
              </select>
            </div>
          ) : (
            <div className="text-xs text-gray-500">Connect a node to see dimensions</div>
          )}
          <ShapeLabel
            input={true}
            shape={props.data.inputShape || "Not Connected"}
            shapeHintMessage="The shape of the input tensor."
          />
          <ShapeLabel
            input={false}
            shape={props.data.outputShape || "Not Connected"}
            shapeHintMessage="The shape of the output tensor after flattening."
          />
        </div>
      )}
      <Handle type="source" position={Position.Right} isConnectable={true} />
    </div>
  );
};

export default FlattenNode;
