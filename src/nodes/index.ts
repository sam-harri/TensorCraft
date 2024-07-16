import type { NodeTypes } from "reactflow";
import { PositionLoggerNode } from "./PositionLoggerNode";
import {TextUpdaterNode} from "./TextUpdaterNodet";
import FullyConnectedLayerNode from "./FullyConnectedLayerNode";
import DropoutLayerNode from "./Dropout/DropoutLayerNode";
import RegressionOutputNode from "./RegressionOutputNode";
import LinearLayerNode from "./ActivationFunctions/LinearLayerNode";
import ReLULayerNode from "./ActivationFunctions/ReluNode";
import SigmoidNode from "./ActivationFunctions/SigmoidNode";
import TanhNode from "./ActivationFunctions/TanhNode";
import Conv1DLayerNode from "./Convolutions/Conv1DLayerNode";
import TabularInputNode from "./Input/TabularInputNode";
import TimeseriesInputNode from "./Input/TimeseriesInputNode";
import ImageInputNode from "./Input/ImageInputNode";
import Conv2DLayerNode from "./Convolutions/Conv2DLayerNode";
import LSTMLayerNode from "./RNN/LSTMLayerNode";
import GRULayerNode from "./RNN/GRULayerNode";
import MaxPool1DLayerNode from "./Pooling/MaxPool1DLayerNode";
import MaxPool2DLayerNode from "./Pooling/MaxPool2DLayerNode";
import LayerNormLayerNode from "./Normalization/LayerNormLayerNode";
import BatchNorm1DLayerNode from "./Normalization/BatchNorm1DLayerNode";
import BatchNorm2DLayerNode from "./Normalization/BatchNorm2DLayerNode";
import Dropout1DLayerNode from "./Dropout/Dropout1DLayerNode";
import PermuteNode from "./TensorOperations/PermuteNode";
import ConcatNode from "./TensorOperations/ConcatNode";
import FlattenNode from "./TensorOperations/FlattenNode";


export const nodeTypes = {
  "position-logger": PositionLoggerNode,
  "text-updater": TextUpdaterNode,
  "fully-connected-layer": FullyConnectedLayerNode,
  "regression-output": RegressionOutputNode,

  "tanh": TanhNode,
  "relu": ReLULayerNode,
  "sigmoid": SigmoidNode,
  "linear": LinearLayerNode,
  "tabular-input": TabularInputNode,
  "timeseries-input": TimeseriesInputNode,
  "image-input": ImageInputNode,
  "conv1d": Conv1DLayerNode,
  "conv2d": Conv2DLayerNode,
  "lstm": LSTMLayerNode,
  "gru": GRULayerNode,
  "maxpool1d": MaxPool1DLayerNode,
  "maxpool2d": MaxPool2DLayerNode,
  "layernorm": LayerNormLayerNode,
  "batchnorm1d": BatchNorm1DLayerNode,
  "batchnorm2d": BatchNorm2DLayerNode,
  "dropout": DropoutLayerNode,
  "dropout1d": Dropout1DLayerNode,
  "dropout2d": DropoutLayerNode,
  "permute": PermuteNode,
  "concat": ConcatNode,
  "flatten": FlattenNode,
} satisfies NodeTypes;

export const initialData = {
  "tanh": {
    inputShape: null,
    outputShape: null,
    inputShapeOrder: null,
    outputShapeOrder: null
  },
  "relu": {
    inputShape: null,
    outputShape: null,
    inpalce: false,
    outputShapeOrder: null,
  },
  "sigmoid": {
    inputShape: null,
    outputShape: null,
    inputShapeOrder: null,
    outputShapeOrder: null,
  },
  "linear": {
    numNeurons: null,
    inputShape: null,
    outputShape: null,
    bias: true,
    inputShapeOrder: null,
    outputShapeOrder: null,
  },
  "tabular-input": {
    numFeatures: null,
    batchSize: null,
    outputShape: null,
    outputShapeOrder: "NC",
  },
  "timeseries-input": {
    numFeatures: null,
    batchSize: 32,
    sequenceLength: null,
    outputShapeOrder: "NCL",
  },
  "image-input": {
    numChannels: null,
    batchSize: null,
    height: null,
    width: null,
    outputShape: null,
    outputShapeOrder: "NCHW",
  },
  "conv1d": { 
    numFilters: null,
    kernelSize: null,
    stride: 1,
    padding: 0,
    dilation: 1,
    inputShape: null,
    outputShape: null,
    inputShapeOrder: null,
    outputShapeOrder: null,
  },
"conv2d": {
    numFilters: null,
    kernelSize: null,
    stride: 1,
    padding: 0,
    dilation: 1,
    inputShape: null,
    outputShape: null,
    inputShapeOrder: null,
    outputShapeOrder: null,
  },
  "lstm": {
    hiddenSize: null,
    numLayers: 1,
    dropout: 0,
    projSize: 0,
    bidirectional: false,
    inputShape: null,
    outputShape: null,
    inputShapeOrder: null,
    outputShapeOrder: null,
  },
  "gru": {
    hiddenSize: null,
    numLayers: 1,
    dropout: 0,
    bidirectional: false,
    inputShape: null,
    outputShape: null,
    inputShapeOrder: null,
    outputShapeOrder: null,
  },
  "maxpool1d": {
    inputShape: null,
    outputShape: null,
    kernelSize: null,
    stride: 1,
    padding: 0,
    dilation: 1,
    inputShapeOrder: null,
    outputShapeOrder: null,
  },
  "maxpool2d": {
    inputShape: null,
    outputShape: null,
    kernelSize: null,
    stride: 1,
    padding: 0,
    dilation: 1,
    inputShapeOrder: null,
    outputShapeOrder: null,
  },
  "layernorm": {
    normalizedShape: [],
    eps: 1e-5,
    elementwiseAffine: true,
    bias: true,
    inputShape: null,
    outputShape: null,
    inputShapeOrder: null,
    outputShapeOrder: null,
  },
  "batchnorm1d": {
    eps: 1e-5,
    momentum: 0.1,
    affine: true,
    trackRunningStats: true,
    inputShape: null,
    outputShape: null,
    inputShapeOrder: null,
    outputShapeOrder: null,
  },
  "batchnorm2d": {
    eps: 1e-5,
    momentum: 0.1,
    affine: true,
    trackRunningStats: true,
    inputShape: null,
    outputShape: null,
    inputShapeOrder: null,
    outputShapeOrder: null,
  },
  "dropout": {
    p: 0.5,
    inplace: false,
    inputShape: null,
    outputShape: null,
    inputShapeOrder: null,
    outputShapeOrder: null,
  },
  "dropout1d": {
    p: 0.5,
    inplace: false,
    inputShape: null,
    outputShape: null,
    inputShapeOrder: null,
    outputShapeOrder: null,
  },
  "dropout2d": {
    p: 0.5,
    inplace: false,
    inputShape: null,
    outputShape: null,
    inputShapeOrder: null,
    outputShapeOrder: null,
  },
  "permute": {
    inputShape: null,
    outputShape: null,
    inputShapeOrder: null,
    outputShapeOrder: null,
  },
  "concat": {
    outputShape: null,
    dim: null,
    outputShapeOrder: null,
  },
  "flatten": {
    inputShape: null,
    outputShape: null,
    inputShapeOrder: null,
    outputShapeOrder: null,
    flattenStart: 0,
    flattenEnd: 0,
  },
}

export type NodeType = keyof typeof initialData;
