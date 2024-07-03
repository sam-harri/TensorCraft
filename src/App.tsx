import { useShallow } from "zustand/react/shallow";
import {
  Background,
  Controls,
  MiniMap,
  ReactFlow,
} from "reactflow";
import "reactflow/dist/style.css";

import { nodeTypes } from "./nodes";
import { edgeTypes } from "./edges";

import useStore from "./state/store";

const selector = (state : any) => ({
  nodes: state.nodes,
  edges: state.edges,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
  onReconnect: state.onReconnect,
});

export default function App() {

  const { nodes, edges, onNodesChange, onEdgesChange, onConnect, onReconnect } = useStore(
    useShallow(selector),
  );

  return (
    <>
    <ReactFlow
          nodes={nodes}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          edges={edges}
          edgeTypes={edgeTypes}
          onEdgesChange={onEdgesChange}
          onReconnect={onReconnect}
          onConnect={onConnect}
          fitView
        >
          <Background />
          <MiniMap />
          <Controls />
        </ReactFlow>
    </>
  );
}
