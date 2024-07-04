import React, { useCallback } from 'react';
import { useShallow } from 'zustand/react/shallow';
import {
  Background,
  Controls,
  MiniMap,
  ReactFlow,
  ReactFlowProvider,
  useReactFlow,
} from 'reactflow';
import 'reactflow/dist/style.css';
import {v4 as uuidv4} from 'uuid';

import Sidebar from './components/Sidebar';
import useStore from './state/store';
import { nodeTypes } from './nodes';
import { edgeTypes } from './edges';
import { initialData, NodeType } from './nodes';

const selector = (state: any) => ({
  nodes: state.nodes,
  edges: state.edges,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
  onReconnect: state.onReconnect,
  addNode: state.addNode,
});

const DNDNN: React.FC = () => {
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect, onReconnect, addNode } = useStore(useShallow(selector));
  const { screenToFlowPosition } = useReactFlow();

  const onDragOver = useCallback((event : any) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event : any) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow') as NodeType;

      // check if the dropped element is valid
      if (typeof type === 'undefined' || !type) {
        return;
      }

      // project was renamed to screenToFlowPosition
      // and you don't need to subtract the reactFlowBounds.left/top anymore
      // details: https://reactflow.dev/whats-new/2023-11-10
      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const nodeData = initialData[type] || {};

      const newNode = {
        id: uuidv4(),
        type,
        position,
        data: nodeData,
      };
      addNode(newNode);
    },
    [screenToFlowPosition, addNode],
  );

  return (
    <div className="relative h-screen"> {/* Add padding top to create overlap effect */}
      <Sidebar />
      <div className="absolute top-0 left-0 w-full h-full">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onReconnect={onReconnect}
          onDrop={onDrop}
          onDragOver={onDragOver}
          fitView
        >
          <Background />
          <MiniMap />
          <Controls />
        </ReactFlow>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ReactFlowProvider>
      <DNDNN />
    </ReactFlowProvider>
  )
}

export default App;
