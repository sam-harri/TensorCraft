import React, { useState, useEffect } from 'react';
import { NodeProps, Handle, Position } from 'reactflow';
import useGraphStore from '../../state/graphStore';
import Hint from '../../components/Hint';
import Checkbox from '../../components/Checkbox';
import NodeHeader from '../../components/NodeHeader';
import ShapeLabel from '../../components/ShapeLabel';

export type ReLULayerNodeData = {
  inputShape: string | null;
  outputShape: string | null;
  inplace: boolean;
};

const ReLULayerNode: React.FC<NodeProps<ReLULayerNodeData>> = (props) => {
  const updateNodeData = useGraphStore((state) => state.updateNodeData);
  const [isCollapsed, setIsCollapsed] = useState(true);

  const { inplace } = props.data;

  useEffect(() => {
    const inputShape = props.data.inputShape;
    if (inputShape) {
      updateNodeData(props.id, { outputShape: inputShape });
    } else {
      updateNodeData(props.id, { outputShape: 'Not Connected' });
    }
  }, [props.data.inputShape, updateNodeData]);

  const handleInplaceChange = (checked: boolean) => {
    updateNodeData(props.id, { inplace: checked });
  };

  return (
    <div className="bg-white shadow-md rounded border border-gray-300 w-72 relative">
      <Handle type="target" position={Position.Left} isConnectable={true} />
      <NodeHeader title="ReLU" isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} imageSource="activationfunctions/relu.png" imageAlt="ReLU Activation" props={props} />
      {!isCollapsed && (
        <div className="p-4 border-t border-gray-200">
          <div className="mb-2 flex items-center">
            <label className="block text-gray-600 text-sm mr-2">Inplace:</label>
            <Checkbox id="inplaceCheck" checked={inplace} onChangeFunction={handleInplaceChange} />
            <Hint message="Modifies the input data directly to save memory. Only use when the input data is no longer needed after." />
          </div>
          <ShapeLabel input={true} shape={props.data.inputShape || 'Not Connected'} shapeHintMessage="The shape of the input tensor." />
          <ShapeLabel input={false} shape={props.data.outputShape || 'Not Connected'} shapeHintMessage="The shape of the output tensor. Same as input shape." />
        </div>
      )}
      <Handle type="source" position={Position.Right} isConnectable={true} />
    </div>
  );
};

export default ReLULayerNode;
