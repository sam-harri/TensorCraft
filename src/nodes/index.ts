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
import TabularInputNode from "./Input/TabularInputNode";
import TimeseriesInputNode from "./Input/TimeseriesInputNode";
import ImageInputNode from "./Input/ImageInputNode";

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

  "conv1d": Conv1DLayerNode,
  "conv2d": Conv2DLayerNode,
  "batchnorm-1d": BatchNorm1dLayerNode,

  "tanh": TanhNode,
  "relu": ReLULayerNode,
  "sigmoid": SigmoidNode,
  "linear": LinearLayerNode,
  "tabular-input": TabularInputNode,
  "timeseries-input": TimeseriesInputNode,
  "image-input": ImageInputNode,
} satisfies NodeTypes;

//TODO timeseries-input

export const initialData = {
  "tanh": {
    inputSize: null,
    outputSize: null
  },
  "relu": {
    inputSize: null,
    outputSize: null, inpalce:
    false
  },
  "sigmoid": {
    inputSize: null,
    outputSize: null
  },
  "linear": {
    numNeurons: null,
    inputSize: null,
    outputSize: null,
    bias: true
  },
  "tabular-input": {
    numFeatures: null,
    batchSize: null
  },
  "timeseries-input": {
    numFeatures: null,
    batchSize: null,
    sequenceLength: null
  },
  "image-input": {
    numChannels: null,
    batchSize: null,
    height: null,
    width: null
  },
}

export type NodeType = keyof typeof initialData;
