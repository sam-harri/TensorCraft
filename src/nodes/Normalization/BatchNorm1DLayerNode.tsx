import React, { useState, useEffect } from 'react';
import { NodeProps, Handle, Position } from 'reactflow';
import useGraphStore from '../../state/graphStore';
import InputField from '../../components/InputField';
import NodeHeader from '../../components/NodeHeader';
import Checkbox from '../../components/Checkbox';
import ShapeLabel from '../../components/ShapeLabel';
import Hint from '../../components/Hint';

export type BatchNorm1dLayerNodeType = {
  eps: number | null;
  momentum: number | null;
  affine: boolean;
  trackRunningStats: boolean;
  inputShape: string | null;
  outputShape: string | null;
  inputShapeOrder: string | null;
  outputShapeOrder: string | null;
};

const validatePositiveNumber = (value: number) => value > 0;
const validateNonNegativeNumber = (value: number) => value >= 0;

const BatchNorm1DLayerNode: React.FC<NodeProps<BatchNorm1dLayerNodeType>> = (props) => {
  const updateNodeData = useGraphStore((state) => state.updateNodeData);
  const [isCollapsed, setIsCollapsed] = useState(true);

  const [eps, setEps] = useState<number | null>(props.data.eps ?? null);
  const [epsInput, setEpsInput] = useState<string>(eps !== null ? eps.toString() : '');
  const [epsError, setEpsError] = useState<string | null>(null);

  const [momentum, setMomentum] = useState<number | null>(props.data.momentum ?? null);
  const [momentumInput, setMomentumInput] = useState<string>(momentum !== null ? momentum.toString() : '');
  const [momentumError, setMomentumError] = useState<string | null>(null);

  const { affine, trackRunningStats } = props.data;

  const handleAffineChange = (checked: boolean) => {
    updateNodeData(props.id, { affine: checked });
  };

  const handleTrackRunningStatsChange = (checked: boolean) => {
    updateNodeData(props.id, { trackRunningStats: checked });
  };

  useEffect(() => {
    const inputShape = props.data.inputShape;
    if (inputShape) {
      updateNodeData(props.id, { outputShape: inputShape });
    } else {
      updateNodeData(props.id, { outputShape: 'Not Connected' });
    }
  }, [props.data.inputShape, updateNodeData]);


  useEffect(() => {
    updateNodeData(props.id, { outputShapeOrder: props.data.inputShapeOrder });
  }, [props.data.inputShapeOrder]);

  return (
    <div className="bg-white shadow-md rounded border border-gray-300 w-72 relative">
      <Handle type="target" position={Position.Left} isConnectable={true} />
      <NodeHeader title="BatchNorm1d" isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} imageSource="normalization/batchnorm.png" imageAlt="BatchNorm1d" props={props} />
      {!isCollapsed && (
        <div className="p-4 border-t border-gray-200">
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
          <InputField
            label="Momentum"
            valueInput={momentumInput}
            setValueInput={setMomentumInput}
            valueError={momentumError}
            setValueError={setMomentumError}
            setValue={setMomentum}
            errorMessage="Momentum must be a non-negative number."
            hintMessage="The value used for the running mean and variance computation. Default: 0.1."
            validationFunction={validateNonNegativeNumber}
            props={props}
            dataKey="momentum"
            effectDependencies={[updateNodeData]}
          />
          <div className="mb-2 flex items-center">
            <label className="block text-gray-600 text-sm mr-2">Affine:</label>
            <Checkbox id="affineCheck" checked={affine} onChangeFunction={handleAffineChange} />
            <Hint message="If True, this module has learnable affine parameters." />
          </div>
          <div className="mb-2 flex items-center">
            <label className="block text-gray-600 text-sm mr-2">Track Running Stats:</label>
            <Checkbox id="trackRunningStatsCheck" checked={trackRunningStats} onChangeFunction={handleTrackRunningStatsChange} />
            <Hint message="If True, this module tracks the running mean and variance, otherwise, it uses batch statistics during evaluation." />
          </div>
          <ShapeLabel input={true} shape={props.data.inputShape || 'Not Connected'} shapeHintMessage="The shape of the input tensor is expected to be (Batch, Channels, Length) or (Batch, Channels)" />
          <ShapeLabel input={false} shape={props.data.outputShape || 'Not Connected'} shapeHintMessage="The shape of the output tensor is the same as the input shape." />
        </div>
      )}
      <Handle type="source" position={Position.Right} isConnectable={true} />
    </div>
  );
};

export default BatchNorm1DLayerNode;
