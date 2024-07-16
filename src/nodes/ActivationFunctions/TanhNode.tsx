import React, { useState, useEffect } from 'react';
import { NodeProps, Handle, Position } from 'reactflow';
import useGraphStore from '../../state/graphStore';
import NodeHeader from '../../components/NodeHeader';
import ShapeLabel from '../../components/ShapeLabel';

export type TanhLayerNodeData = {
  inputShape: string | null;
  outputShape: string | null;
  inputShapeOrder: string | null;
  outputShapeOrder: string | null;
};

const TanhNode: React.FC<NodeProps<TanhLayerNodeData>> = (props) => {
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

  useEffect(() => {
    updateNodeData(props.id, { outputShapeOrder: props.data.inputShapeOrder });
  }, [props.data.inputShapeOrder])

  return (
    <div className="bg-white shadow-md rounded border border-gray-300 w-72 relative">
      <Handle type="target" position={Position.Left} isConnectable={true} />
      <NodeHeader title="Tanh" isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} imageSource="activationfunctions/tanh.png" imageAlt="Tanh Activation" props={props} />
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

export default TanhNode;
