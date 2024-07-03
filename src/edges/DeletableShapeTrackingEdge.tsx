import React from 'react';
import {
  BaseEdge,
  EdgeLabelRenderer,
  getSimpleBezierPath,
  Position,
  EdgeProps,
} from 'reactflow';
import useStore from '../state/store';

interface CustomEdgeProps extends EdgeProps<any> {
  id: string;
  sourceX: number;
  sourceY: number;
  targetX: number;
  targetY: number;
  source: string;
  target: string;
}

const DeletableEdge: React.FC<CustomEdgeProps> = ({
  id, sourceX, sourceY, targetX, targetY, source, target, ...rest
}) => {
  const { setEdges, updateNodeData } = useStore();

  const [path, labelX, labelY] = getSimpleBezierPath({
    sourceX,
    sourceY,
    sourcePosition: Position.Right,
    targetX,
    targetY,
    targetPosition: Position.Left,
  });

  const handleDelete = () => {
    updateNodeData(target, { inputSize: null });
    setEdges((edges) => edges.filter((e) => e.id !== id));
  };

  return (
    <>
      <BaseEdge id={id} path={path} {...rest} />
      <EdgeLabelRenderer>
        <div className='group'>
          <button
            className='absolute transform -translate-x-1/2 -translate-y-1/2 border border-2-gray-500 text-gray-500 bg-white rounded-full w-6 h-6 text-xs flex items-center justify-center pointer-events-auto opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-in-out'
            style={{ left: `${labelX}px`, top: `${labelY}px` }}
            onClick={handleDelete}
          >
            X
          </button>
        </div>
      </EdgeLabelRenderer>
    </>
  );
};

export default DeletableEdge;
