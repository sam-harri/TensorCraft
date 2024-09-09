import React, { useState, useEffect } from "react";
import { NodeProps, Handle, Position } from "reactflow";
import useGraphStore from "../../state/graphStore";
import InputField from "../../components/InputField";
import NodeHeader from "../../components/NodeHeader";
import Checkbox from "../../components/Checkbox";
import ShapeLabel from "../../components/ShapeLabel";
import Hint from "../../components/Hint";

export type LayerNormLayerNodeType = {
  normalizedShape: number | null;
  eps: number | null;
  elementwiseAffine: boolean;
  bias: boolean;
  inputShape: string | null;
  outputShape: string | null;
  inputShapeOrder: string | null;
  outputShapeOrder: string | null;
};

const validatePositiveNumber = (value: number) => value > 0;

const LayerNormLayerNode: React.FC<NodeProps<LayerNormLayerNodeType>> = (props) => {
  const updateNodeData = useGraphStore((state) => state.updateNodeData);
  const [isCollapsed, setIsCollapsed] = useState(true);

  const [normalizedShape, setNormalizedShape] = useState<number | null>(
    props.data.normalizedShape ?? null
  );
  const [eps, setEps] = useState<number | null>(props.data.eps ?? null);
  const [epsInput, setEpsInput] = useState<string>(
    eps !== null ? eps.toString() : ""
  );
  const [epsError, setEpsError] = useState<string | null>(null);

  const { elementwiseAffine, bias, inputShapeOrder } = props.data;

  const handleElementwiseAffineChange = (checked: boolean) => {
    updateNodeData(props.id, { elementwiseAffine: checked });
  };

  const handleBiasChange = (checked: boolean) => {
    updateNodeData(props.id, { bias: checked });
  };

  const handleNormalizeShapeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = parseInt(event.target.value, 10);
    setNormalizedShape(value);
    updateNodeData(props.id, { normalizedShape: value });
  };

  useEffect(() => {
    const inputShape = props.data.inputShape;
    if (inputShape) {
      updateNodeData(props.id, { outputShape: inputShape });
    } else {
      updateNodeData(props.id, { outputShape: "Not Connected" });
    }
  }, [props.data.inputShape, updateNodeData]);

  useEffect(() => {
    updateNodeData(props.id, { outputShapeOrder: props.data.inputShapeOrder });
  }, [props.data.inputShapeOrder]);

  return (
    <div className="bg-white shadow-md rounded border border-gray-300 w-72 relative">
      <Handle type="target" position={Position.Left} isConnectable={true} />
      <NodeHeader
        title="LayerNorm"
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        imageSource="normalization/layernorm.png"
        imageAlt="LayerNorm"
        props={props}
      />
      {!isCollapsed && (
        <div className="p-4 border-t border-gray-200">
          <div className="mb-2">
            <div className="flex items-center">
              <label className="text-gray-600 text-sm mb-1 mr-2">
                Normalize starting at:
              </label>
              <Hint message="Select the starting dimension to normalize from. Normalization will include this dimension and all dimensions after it." />
            </div>
            {inputShapeOrder && (
              <select
                className="form-select block w-full mt-1"
                value={normalizedShape ?? ""}
                onChange={handleNormalizeShapeChange}
              >
                <option value="" disabled>Select dimension</option>
                {inputShapeOrder.split("").map((dim, index) => (
                  <option key={index} value={index}>
                    {dim}
                  </option>
                ))}
              </select>
            )}
            {(!inputShapeOrder || inputShapeOrder.length === 0) && (
              <div className="text-xs text-gray-500">Connect a node to see dimensions</div>
            )}
          </div>
          <InputField
            label="Epsilon"
            valueInput={epsInput}
            setValueInput={setEpsInput}
            valueError={epsError}
            setValueError={setEpsError}
            setValue={setEps}
            errorMessage="Epsilon must be a positive number."
            hintMessage="A small value added to the denominator for numerical stability. Default: 1e-5."
            validationFunction={validatePositiveNumber}
            props={props}
            dataKey="eps"
            effectDependencies={[updateNodeData]}
          />
          <div className="mb-2 flex items-center">
            <label className="block text-gray-600 text-sm mr-2">
              Elementwise Affine:
            </label>
            <Checkbox
              id="elementwiseAffineCheck"
              checked={elementwiseAffine}
              onChangeFunction={handleElementwiseAffineChange}
            />
            <Hint message="If True, this module has learnable per-element affine parameters initialized to ones (for weights) and zeros (for biases). Default: True." />
          </div>
          <div className="mb-2 flex items-center">
            <label className="block text-gray-600 text-sm mr-2">Bias:</label>
            <Checkbox
              id="biasCheckLayerNorm"
              checked={bias}
              onChangeFunction={handleBiasChange}
            />
            <Hint message="If True, the layer will learn an additive bias (only relevant if elementwise_affine is True). Default: True." />
          </div>
          <ShapeLabel
            input={true}
            shape={props.data.inputShape || "Not Connected"}
            shapeHintMessage="The shape of the input tensor can be anything"
          />
          <ShapeLabel
            input={false}
            shape={props.data.outputShape || "Not Connected"}
            shapeHintMessage="The shape of the output tensor is the same as the input shape."
          />
        </div>
      )}
      <Handle type="source" position={Position.Right} isConnectable={true} />
    </div>
  );
};

export default LayerNormLayerNode;
