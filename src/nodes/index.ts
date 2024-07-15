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
import BatchNorm1dLayerNode from "./Normalization/BatchNorm1DLayerNode";
import TabularInputNode from "./Input/TabularInputNode";
import TimeseriesInputNode from "./Input/TimeseriesInputNode";
import ImageInputNode from "./Input/ImageInputNode";
import Conv2DLayerNode from "./Convolutions/Conv2DLayerNode";


export const nodeTypes = {
  "position-logger": PositionLoggerNode,
  "text-updater": TextUpdaterNode,
  "fully-connected-layer": FullyConnectedLayerNode,
  "dropout-layer": DropoutLayerNode,
  "regression-output": RegressionOutputNode,
  "batchnorm-1d": BatchNorm1dLayerNode,

  "tanh": TanhNode,
  "relu": ReLULayerNode,
  "sigmoid": SigmoidNode,
  "linear": LinearLayerNode,
  "tabular-input": TabularInputNode,
  "timeseries-input": TimeseriesInputNode,
  "image-input": ImageInputNode,
  "conv1d": Conv1DLayerNode,
  "conv2d": Conv2DLayerNode,
} satisfies NodeTypes;

export const initialData = {
  "tanh": {
    inputShape: null,
    outputShape: null
  },
  "relu": {
    inputShape: null,
    outputShape: null,
    inpalce: false
  },
  "sigmoid": {
    inputShape: null,
    outputShape: null
  },
  "linear": {
    numNeurons: null,
    inputShape: null,
    outputShape: null,
    bias: true
  },
  "tabular-input": {
    numFeatures: null,
    batchSize: null,
    outputShape: null,
  },
  "timeseries-input": {
    numFeatures: null,
    batchSize: 32,
    sequenceLength: null
  },
  "image-input": {
    numChannels: null,
    batchSize: null,
    height: null,
    width: null,
    outputShape: null
  },
  "conv1d": { 
    numFilters: null,
    kernelSize: null,
    stride: 1,
    padding: 0,
    dilation: 1,
    inputShape: null,
    outputShape: null,
  },
"conv2d": {
    numFilters: null,
    kernelSize: null,
    stride: 1,
    padding: 0,
    dilation: 1,
    inputShape: null,
    outputShape: null,
  }
  
}

export type NodeType = keyof typeof initialData;
