import React, { useCallback } from "react";
import { useShallow } from "zustand/react/shallow";
import {
  Background,
  Controls,
  MiniMap,
  ReactFlow,
  useReactFlow,
} from "reactflow";
import "reactflow/dist/style.css";
import { v4 as uuidv4 } from "uuid";
import { ReactFlowProvider } from "reactflow";

import ToolBox from "../components/ToolBox";
import useGraphStore from "../state/graphStore";
import { edgeTypes } from "../edges";
import { initialData, NodeType, nodeTypes } from "../nodes";
import ModelCompilation from "../components/ModelCompilation";

const selector = (state: any) => ({
  nodes: state.nodes,
  edges: state.edges,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
  onReconnect: state.onReconnect,
  addNode: state.addNode,
});

const CraftComponent: React.FC = () => {
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    onReconnect,
    addNode,
  } = useGraphStore(useShallow(selector));
  const { screenToFlowPosition } = useReactFlow();

  const onDragOver = useCallback((event: any) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: any) => {
      event.preventDefault();

      const type = event.dataTransfer.getData(
        "application/reactflow"
      ) as NodeType;

      // check if the dropped element is valid
      if (typeof type === "undefined" || !type) {
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
    [screenToFlowPosition, addNode]
  );

  return (
    <div className="flex h-screen">
    <ToolBox />
    <div className="flex-1 relative">
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
    <ModelCompilation />
  </div>
  );
};

const Craft: React.FC = () => {
  return (
    <ReactFlowProvider>
      <CraftComponent />
    </ReactFlowProvider>
  );
};

export default Craft;
