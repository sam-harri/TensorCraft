import React, { useState, useEffect } from 'react';
import { NodeProps, Handle, Position } from 'reactflow';
import useGraphStore from '../../state/graphStore';
import Dropdown from '../../components/Dropdown';
import Hint from '../../components/Hint';
import DeleteNode from '../../components/DeleteNode';

export type Conv1DLayerNodeData = {
  numFilters: number | null;
  kernelSize: number | null;
  stride: number | null;
  padding: number | null;
  dilation: number | null;
  inputShape: string | null;
  outputShape: string | null;
};

const Conv1DLayerNode: React.FC<NodeProps<Conv1DLayerNodeData>> = (props) => {
  const updateNodeData = useGraphStore((state) => state.updateNodeData);
  const [isCollapsed, setIsCollapsed] = useState(true);

  const [numFilters, setNumFilters] = useState<number | null>(props.data.numFilters ?? null);
  const [numFiltersInput, setNumFiltersInput] = useState<string>(numFilters !== null ? numFilters.toString() : '');
  const [numFiltersError, setNumFiltersError] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      const value = numFiltersInput ? Number(numFiltersInput) : null;
      if (value !== null && value < 1) {
        setNumFiltersError('Number of features must be a positive number.');
      } else {
        setNumFiltersError(null);
        props.data.numFilters = value;
        setNumFilters(value);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [numFiltersInput]);

  const [kernelSize, setKernelSize] = useState<number | null>(props.data.kernelSize ?? null);
  const [kernelSizeInput, setKernelSizeInput] = useState<string>(kernelSize !== null ? kernelSize.toString() : '');
  const [kernelSizeError, setKernelSizeError] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      const value = kernelSizeInput ? Number(kernelSizeInput) : null;
      if (value !== null && value < 1) {
        setKernelSizeError('Kernel Size must be a positive number.');
      } else {
        setKernelSizeError(null);
        props.data.kernelSize = value;
        setKernelSize(value);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [kernelSizeInput]);

  const [stride, setStride] = useState<number | null>(props.data.stride ?? null);
  const [strideInput, setStrideInput] = useState<string>(stride !== null ? stride.toString() : '');
  const [strideError, setStrideError] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      const value = strideInput ? Number(strideInput) : null;
      if (value !== null && value < 1) {
        setStrideError('Kernel Size must be a positive number.');
      } else {
        setStrideError(null);
        props.data.stride = value;
        setStride(value);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [strideInput]);

  const [padding, setPadding] = useState<number | null>(props.data.padding ?? null);
  const [paddingInput, setPaddingInput] = useState<string>(padding !== null ? padding.toString() : '');
  const [paddingError, setPaddingError] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      const value = paddingInput ? Number(paddingInput) : null;
      if (value !== null && value < 1) {
        setPaddingError('Kernel Size must be a positive number.');
      } else {
        setPaddingError(null);
        props.data.padding = value;
        setPadding(value);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [paddingInput]);

  const [dilation, setDilation] = useState<number | null>(props.data.dilation ?? null);
  const [dilationInput, setDilationInput] = useState<string>(dilation !== null ? dilation.toString() : '');
  const [dilationError, setDilationError] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      const value = dilationInput ? Number(dilationInput) : null;
      if (value !== null && value < 1) {
        setDilationError('Kernel Size must be a positive number.');
      } else {
        setDilationError(null);
        props.data.dilation = value;
        setDilation(value);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [dilationInput]);


  const calculateOutputLength = (inputLength : number) => {
    if (inputLength === null || padding === null || dilation === null || kernelSize === null || stride === null) {
      return 'Lout';
    }
    return Math.floor(((inputLength + 2 * padding - dilation * (kernelSize - 1) - 1) / stride) + 1).toString();
  };

  useEffect(() => {
    const inputShape = props.data.inputShape;
    if (inputShape) {
      const inputShapeArr = inputShape.split(',').map((dim) => dim.trim());
      inputShapeArr[inputShapeArr.length - 1] = calculateOutputLength(parseInt(inputShapeArr[inputShapeArr.length - 1]));
      inputShapeArr[1] = numFilters !== null ? numFilters.toString() : 'Cout';
      const newOutputShape = `${inputShapeArr.join(', ')})`;
      updateNodeData(props.id, { outputShape: newOutputShape });
    } else {
      updateNodeData(props.id, { outputShape: 'Not Connected' });;
    }
  }, [props.data.inputShape, numFilters, kernelSize, stride, padding, dilation, props.id, updateNodeData]);

  return (
    <div className="bg-white shadow-md rounded border border-gray-300 w-72 relative">
      <Handle type="target" position={Position.Left} isConnectable={true} />
      <div
        className="flex items-center p-1 cursor-pointer"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <img
          src="convolutions/conv1d.png"
          alt="Conv1D"
          className="rounded-full h-10 w-10 mr-4"
        />
        <div className="flex-grow font-semibold text-gray-800 text-left">Conv1D Layer</div>
        <DeleteNode nodeId={props.id} />
        <div className="text-gray-500 ml-2">
          <Dropdown isCollapsed={isCollapsed} />
        </div>
      </div>
      {!isCollapsed && (
        <div className="p-4 border-t border-gray-200">
          <div className="mb-4">
            <label className="block text-gray-600 text-sm">Number of Filters:</label>
            <div className="flex items-center">
            <input
                type='number'
                className='mt-1 block w-full rounded shadow-sm sm:text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                value={numFiltersInput}
                onChange={(e) => setNumFiltersInput(e.target.value)}
                style={{ padding: '10px', height: '40px' }}
              />
              <Hint message="The number of filters in the convolution layer." />
            </div>
            {numFiltersError && <p className="text-red-500 text-xs mt-1">{numFiltersError}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 text-sm">Kernel Size:</label>
            <div className="flex items-center">
            <input
                type='number'
                className='mt-1 block w-full rounded shadow-sm sm:text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                value={kernelSizeInput}
                onChange={(e) => setKernelSizeInput(e.target.value)}
                style={{ padding: '10px', height: '40px' }}
              />
              <Hint message="The size of the kernel." />
            </div>
            {kernelSizeError && <p className="text-red-500 text-xs mt-1">{kernelSizeError}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 text-sm">Stride:</label>
            <div className="flex items-center">
              <input
                type="number"
                className="mt-1 block w-full rounded shadow-sm sm:text-sm border-gray-300"
                value={strideInput}
                onChange={(e) => setStrideInput(e.target.value)}
                style={{ padding: '10px', height: '40px' }}
              />
              <Hint message="The stride of the convolution." />
            </div>
            {kernelSizeError && <p className="text-red-500 text-xs mt-1">{kernelSizeError}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 text-sm">Padding:</label>
            <div className="flex items-center">
              <input
                type="number"
                className="mt-1 block w-full rounded shadow-sm sm:text-sm border-gray-300"
                value={paddingInput}
                onChange={(e) => setPaddingInput(e.target.value)}
                style={{ padding: '10px', height: '40px' }}
              />
              <Hint message="The amount of padding added to the input." />
            </div>
            {paddingError && <p className="text-red-500 text-xs mt-1">{paddingError}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 text-sm">Dilation:</label>
            <div className="flex items-center">
              <input
                type="number"
                className="mt-1 block w-full rounded shadow-sm sm:text-sm border-gray-300"
                value={dilationInput}
                onChange={(e) => setDilationInput(e.target.value)}
                style={{ padding: '10px', height: '40px' }}
              />
              <Hint message="The spacing between kernel elements." />
            </div>
            {dilationError && <p className="text-red-500 text-xs mt-1">{dilationError}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 text-sm">Input Shape:</label>
            <div className="flex items-center">
              <div className="mt-1 block w-full rounded border-gray-300 shadow-sm sm:text-sm bg-gray-100 p-2">
                {props.data.inputShape ? props.data.inputShape : 'Not Connected'}
              </div>
              <Hint message="The length of the input sequence." />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 text-sm">Output Shape:</label>
            <div className="flex items-center">
              <div className="mt-1 block w-full rounded border-gray-300 shadow-sm sm:text-sm bg-gray-100 p-2">
                {props.data.outputShape ? props.data.outputShape : 'Not Connected'}
              </div>
              <Hint message="The shape of the output tensor is (Number of Filters, Output Length)." />
            </div>
            {strideError && <p className="text-red-500 text-xs mt-1">{strideError}</p>}
          </div>
        </div>
      )}
      <Handle type="source" position={Position.Right} isConnectable={true} />
    </div>
  );
};

export default Conv1DLayerNode;
