import type { EdgeTypes } from "reactflow";
import DeletableShapeTrackingEdge from "./DeletableShapeTrackingEdge";

// export default [
//   // { id: "b->c", source: "b", target: "c", animated: true},
//   // { id: "c->d", source: "c", target: "d", animated: true },
//   // { id: "d->e", source: "d", target: "e", animated: true },
// ] satisfies Edge[];

export const edgeTypes = {
  'deletable-edge': DeletableShapeTrackingEdge,
} satisfies EdgeTypes;

