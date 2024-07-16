import React, { useState, useEffect } from "react";
import { NodeProps, Handle, Position } from "reactflow";
import useGraphStore from "../../state/graphStore";
import NodeHeader from "../../components/NodeHeader";
import ShapeLabel from "../../components/ShapeLabel";
import Hint from "../../components/Hint";

export type PermuteLayerNodeData = {
  inputShape: string | null;
  outputShape: string | null;
  inputShapeOrder: string | null;
  outputShapeOrder: string | null;
};

const PermuteNode: React.FC<NodeProps<PermuteLayerNodeData>> = (props) => {
  const updateNodeData = useGraphStore((state) => state.updateNodeData);
  const [isCollapsed, setIsCollapsed] = useState(true);

  const updateOutputShape = (outputShapeOrder: string) => {
    const inputShape = props.data.inputShape?.replace(/[()]/g, '');
    if (inputShape && props.data.inputShapeOrder) {
      const outputShape = `(${outputShapeOrder
        .split("")
        .map((dim) => props.data.inputShapeOrder!.indexOf(dim))
        .map((index) => inputShape.split(",")[index].trim())
        .join(", ")})`;
      updateNodeData(props.id, {
        outputShape,
        outputShapeOrder
      });
    } else {
      updateNodeData(props.id, { outputShape: "Not Connected", outputShapeOrder: null });
    }
  };

  useEffect(() => {
    if (props.data.inputShapeOrder) {
      updateOutputShape(props.data.outputShapeOrder || props.data.inputShapeOrder);
    }
  }, [
    props.data.inputShapeOrder,
    updateNodeData,
    props.id,
  ]);

  useEffect(() => {
    if (props.data.outputShapeOrder) {
      updateOutputShape(props.data.outputShapeOrder);
    }
  }, [
    props.data.inputShape,
    updateNodeData,
    props.id,
  ]);

  const moveItem = (index: number, direction: "up" | "down") => {
    const items = Array.from(props.data.outputShapeOrder!);
    const [item] = items.splice(index, 1);
    const newIndex = direction === "up" ? index - 1 : index + 1;
    items.splice(newIndex, 0, item);
    const newOrder = items.join("");
    updateOutputShape(newOrder);
  };

  return (
    <div className="bg-white shadow-md rounded border border-gray-300 w-72 relative">
      <Handle type="target" position={Position.Left} isConnectable={true} />
      <NodeHeader
        title="Permute"
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        imageSource="tensor/tensor.png"
        imageAlt="Permute"
        props={props}
      />
      {!isCollapsed && (
        <div className="p-4 border-t border-gray-200 relative">
          <div className="flex items-center">
            <label className="text-gray-600 text-sm mb-1 mr-2">
              Dimension Order:
            </label>
            <Hint message="Reorder the dimensions of the input tensor." />
          </div>
          <div
            style={{
              height: props.data.outputShapeOrder ? `${props.data.outputShapeOrder.length * 2.5}rem` : 'auto'
            }}
            className={`min-h-6 ${!props.data.outputShapeOrder ? 'h-auto' : ''}`}
          >
            {props.data.outputShapeOrder?.split("").map((dim, index) => (
              <div
                key={dim}
                className="absolute left-4 right-10 flex items-center mb-2 rounded px-2 bg-gray-100 transition-transform duration-300 h-[2rem]"
                style={{ transform: `translateY(${2.5 * index}rem)` }}
              >
                <div className="flex-grow">{dim}</div>
                <div className="flex flex-col items-center ml-2">
                  {index > 0 ? (
                    <button
                      onClick={() => moveItem(index, "up")}
                      className="text-xs"
                    >
                      ↑
                    </button>
                  ) : (
                    <div className="text-xs opacity-0">↑</div>
                  )}
                  {index < props.data.outputShapeOrder!.length - 1 ? (
                    <button
                      onClick={() => moveItem(index, "down")}
                      className="text-xs"
                    >
                      ↓
                    </button>
                  ) : (
                    <div className="text-xs opacity-0">↓</div>
                  )}
                </div>
              </div>
            ))}
            {(!props.data.inputShapeOrder || props.data.inputShapeOrder.length === 0) && (
              <div className="text-xs text-gray-500">Connect a node to see dimensions</div>
            )}
          </div>
          <ShapeLabel
            input={true}
            shape={props.data.inputShape || "Not Connected"}
            shapeHintMessage="The shape of the input tensor."
          />
          <ShapeLabel
            input={false}
            shape={props.data.outputShape || "Not Connected"}
            shapeHintMessage="The shape of the output tensor after permutation."
          />
        </div>
      )}
      <Handle type="source" position={Position.Right} isConnectable={true} />
    </div>
  );
};

export default PermuteNode;
