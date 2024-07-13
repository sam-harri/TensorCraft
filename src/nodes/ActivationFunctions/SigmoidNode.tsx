import React, { useState, useEffect } from 'react';
import { NodeProps, Handle, Position } from 'reactflow';
import useGraphStore from '../../state/graphStore';
import NodeHeader from '../../components/NodeHeader';
import ShapeLabel from '../../components/ShapeLabel';

export type SigmoidLayerNodeData = {
  inputShape: string | null;
  outputShape: string | null;
};

const SigmoidNode: React.FC<NodeProps<SigmoidLayerNodeData>> = (props) => {
  const updateNodeData = useGraphStore((state) => state.updateNodeData);
  const [isCollapsed, setIsCollapsed] = useState(true);

  useEffect(() => {
    const inputShape = props.data.inputShape;
    if (inputShape) {
      updateNodeData(props.id, { outputShape: inputShape });
    } else {
      updateNodeData(props.id, { outputShape: 'Not Connected' });
    }
  }, [props.data.inputShape, updateNodeData]);

  return (
    <div className="bg-white shadow-md rounded border border-gray-300 w-72 relative">
      <Handle type="target" position={Position.Left} isConnectable={true} />
      <NodeHeader title="Sigmoid" isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} imageSource="activationfunctions/sigmoid.png" imageAlt="Sigmoid Activation" props={props} />
      {!isCollapsed && (
        <div className="p-4 border-t border-gray-200">
          <ShapeLabel input={true} shape={props.data.inputShape || 'Not Connected'} shapeHintMessage="The shape of the input tensor." />
          <ShapeLabel input={false} shape={props.data.outputShape || 'Not Connected'} shapeHintMessage="The shape of the output tensor. Same as input shape." />
        </div>
      )}
      <Handle type="source" position={Position.Right} isConnectable={true} />
    </div>
  );
};

export default SigmoidNode;
