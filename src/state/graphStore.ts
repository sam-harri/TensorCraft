import { create } from 'zustand';
import {
  Connection,
  Edge,
  EdgeChange,
  Node,
  NodeChange,
  addEdge,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
  applyNodeChanges,
  applyEdgeChanges,
  reconnectEdge,
} from 'reactflow';

type RFState = {
  nodes: Node[];
  edges: Edge[];
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  onReconnect: (oldEdge: Edge, newConnection: Connection) => void;
  setNodes: (nodes: Node[]) => void;
  setEdges: (edges: Edge[] | ((edges: Edge[]) => Edge[])) => void;
  updateNodeData: (nodeId: string, data: any) => void;
  updateChildren: (parentId: string) => void;
  addNode: (node: Node) => void;
  deleteNode: (nodeId: string) => void;
};

const useGraphStore = create<RFState>((set, get) => ({
  nodes: [
  ],
  edges: [
  ],

  onNodesChange: (changes: NodeChange[]) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },
  onEdgesChange: (changes: EdgeChange[]) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },
  onConnect: (connection: Connection) => {
    const { source, target } = connection;
    const sourceNode = get().nodes.find((node) => node.id === source);
    const targetNode = get().nodes.find((node) => node.id === target);

    if (sourceNode && targetNode && source) {
      const edge = {
        ...connection,
        animated: true,
        type: 'deletable-edge',
        reconnectable: 'target',
      };
      set({
        edges: addEdge(edge, get().edges),
      });
      get().updateChildren(source);
    }
  },
  onReconnect: (oldEdge: Edge, newConnection: Connection) => {
    set({
      edges: reconnectEdge(oldEdge, newConnection, get().edges),
    });
  },
  setNodes: (nodes: Node[]) => set({ nodes }),
  setEdges: (edges) => set((state) => ({
    edges: typeof edges === 'function' ? edges(state.edges) : edges,
  })),
  updateNodeData: (nodeId: string, data: any) => {
    set({
      nodes: get().nodes.map((node) => {
        if (node.id === nodeId) {
          return { ...node, data: { ...node.data, ...data } };
        }
        return node;
      }),
    });
    get().updateChildren(nodeId); // Update the children of the updated node
  },
  updateChildren: (parentId: string) => {
    const { nodes, edges, updateNodeData } = get();
    const parentNode = nodes.find((node) => node.id === parentId);
    if (!parentNode || !parentNode.data.outputShape) return;

    const childrenEdges = edges.filter((edge) => edge.source === parentId);
    childrenEdges.forEach((edge) => {
      const childNode = nodes.find((node) => node.id === edge.target);
      if (childNode) {
        updateNodeData(childNode.id, { inputShape: parentNode.data.outputShape, inputShapeOrder: parentNode.data.outputShapeOrder});
      }
    });
  },
  addNode: (node: Node) => {
    set({
      nodes: [...get().nodes, node],
    });
  },
  deleteNode: (nodeId: string) => {
    const { edges, updateNodeData } = get();
    
    // Find children of the node to be deleted
    const childrenEdges = edges.filter((edge) => edge.source === nodeId);
    const childrenIds = childrenEdges.map(edge => edge.target);

    // Remove the node and its edges
    set((state) => ({
      nodes: state.nodes.filter((node) => node.id !== nodeId),
      edges: state.edges.filter((edge) => edge.source !== nodeId && edge.target !== nodeId),
    }));

    // Update children nodes
    childrenIds.forEach((childId) => {
      updateNodeData(childId, { inputShape: null });
    });
  },
}));

export default useGraphStore;
