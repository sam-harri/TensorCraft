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
};

const useStore = create<RFState>((set, get) => ({
  nodes: [
    {
      id: 'a',
      type: 'tabular-input',
      position: { x: 0, y: 0 },
      data: { numFeatures: null, batchSize: null }
    },
    {
      id: 'b',
      type: 'linear-layer',
      position: { x: 400, y: 0 },
      data: { numNeurons: null, inputSize: null, outputSize: null, bias: true }
    },
    {
      id: 'c',
      type: 'tanh',
      position: { x: 800, y: 0 },
      data: { inputSize: null, outputSize: null }
    }
  ],
  edges: [
    // { id: "b->c", source: "b", target: "c", animated: true},
    // { id: "c->d", source: "c", target: "d", animated: true },
    // { id: "d->e", source: "d", target: "e", animated: true },
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
    console.log(get().edges);
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
    if (!parentNode || !parentNode.data.outputSize) return;

    const childrenEdges = edges.filter((edge) => edge.source === parentId);
    childrenEdges.forEach((edge) => {
      const childNode = nodes.find((node) => node.id === edge.target);
      if (childNode) {
        updateNodeData(childNode.id, { inputSize: parentNode.data.outputSize });
      }
    });
  },
}));

export default useStore;
