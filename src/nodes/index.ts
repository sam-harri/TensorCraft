import type { NodeTypes } from "reactflow";
import { PositionLoggerNode } from "./PositionLoggerNode";
import {TextUpdaterNode} from "./TextUpdaterNodet";
import FullyConnectedLayerNode from "./FullyConnectedLayerNode";
import DropoutLayerNode from "./DropoutLayerNode";
import RegressionOutputNode from "./RegressionOutputNode";
import LinearLayerNode from "./ActivationFunctions/LinearLayerNode";
import ReLULayerNode from "./ActivationFunctions/ReluNode";
import SigmoidNode from "./ActivationFunctions/SigmoidNode";
import TanhNode from "./ActivationFunctions/TanhNode";
import Conv1DLayerNode from "./Convolutions/Conv1DLayerNode";
import Conv2DLayerNode from "./Convolutions/Conv2DLayerNode";
import BatchNorm1dLayerNode from "./Normalization/BatchNorm1DLayerNode";
import TabularInputLayerNode from "./Input/TabularInputLayerNode";

// export default [
//   {
//     id: 'a',
//     type: 'tabular-input',
//     position: { x: 0, y: 0 },
//     data: { numFeatures: null, batchSize: null }
//   },
//   {
//     id: 'b',
//     type: 'linear-layer',
//     position: { x: 400, y: 0 },
//     data: { numNeurons: null, inputSize: null, outputSize: null, bias: true }
//   },
// ] satisfies Node[];

export const nodeTypes = {
  "position-logger": PositionLoggerNode,
  "text-updater": TextUpdaterNode,
  "fully-connected-layer": FullyConnectedLayerNode,
  "dropout-layer": DropoutLayerNode,
  "regression-output": RegressionOutputNode,

  "tanh": TanhNode,
  "relu": ReLULayerNode,
  "sigmoid": SigmoidNode,
  "linear-layer": LinearLayerNode,
  "conv-1d": Conv1DLayerNode,
  "conv-2d": Conv2DLayerNode,
  "batchnorm-1d": BatchNorm1dLayerNode,
  "tabular-input": TabularInputLayerNode,
} satisfies NodeTypes;
