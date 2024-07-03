import React, { useState, useEffect } from 'react';
import { NodeProps, Handle, Position } from 'reactflow';
import Dropdown from '../../components/Dropdown';
import Hint from '../../components/Hint';
import Checkbox from '../../components/Checkbox';
import useStore from '../../state/store';

export type FullyConnectedNodeData = {
  numNeurons: number | null;
  inputSize: string | null;
  outputSize: string | null;
  bias: boolean;
};

const FullyConnectedLayerNode: React.FC<NodeProps<FullyConnectedNodeData>> = (props) => {
  const updateNodeData = useStore((state) => state.updateNodeData);
  const { numNeurons, bias } = props.data;
  const [isCollapsed, setIsCollapsed] = useState(true);

  useEffect(() => {
    const inputSize = props.data.inputSize;
    if (inputSize) {
      const inputShape = inputSize.split(',').map((dim) => dim.trim());
      inputShape[inputShape.length - 1] = numNeurons !== null ? numNeurons.toString() : 'H';
      const newOutputSize = `${inputShape.join(', ')})`;
      updateNodeData(props.id, { outputSize: newOutputSize });
    } else {
      updateNodeData(props.id, { outputSize: 'Not Connected' });
    }
  }, [props.data.inputSize, numNeurons, updateNodeData, props.id]);

  const handleNumNeuronsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value ? Number(e.target.value) : null;
    updateNodeData(props.id, { numNeurons: value });
  };

  const handleBiasChange = (checked: boolean) => {
    updateNodeData(props.id, { bias: checked });
  };

  return (
    <div className='bg-white shadow-md rounded border border-gray-300 w-72 relative'>
      <Handle type='target' position={Position.Left} isConnectable={true} />
      <div
        className='flex items-center p-1 cursor-pointer'
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <img
          src='activationfunctions/linear.png'
          alt='Linear Activation'
          className='rounded-full h-10 w-10 mr-4'
        />
        <div className='flex-grow font-semibold text-gray-800 text-left'>Linear</div>
        <div className='text-gray-500 ml-2'>
          <Dropdown isCollapsed={isCollapsed} />
        </div>
      </div>
      {!isCollapsed && (
        <div className='p-4 border-t border-gray-200'>
          <div className='mb-4'>
            <label className='block text-gray-600 text-sm'>Number of Neurons:</label>
            <div className='flex items-center'>
              <input
                type='number'
                className='mt-1 block w-full rounded border-gray-300 shadow-sm sm:text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                value={numNeurons !== null ? numNeurons : ''}
                onChange={handleNumNeuronsChange}
                style={{ padding: '10px', height: '40px' }}
              />
              <Hint message='The number of neurons in the fully connected layer.' />
            </div>
          </div>

          <div className='mb-2 flex items-center'>
            <label className='block text-gray-600 text-sm mr-2'>Bias:</label>
            <Checkbox id='biasCheck' checked={bias} onChangeFunction={handleBiasChange} />
            <Hint message='Adds a trainable constant term to the linear output, allowing the model to fit the data better by shifting the activation function.' />
          </div>

          <div className='mb-4'>
            <label className='block text-gray-600 text-sm'>Input Size:</label>
            <div className='flex items-center'>
              <div className='mt-1 block w-full rounded border-gray-300 shadow-sm sm:text-sm bg-gray-100 p-2'>
                {props.data.inputSize ? props.data.inputSize : 'Not Connected'}
              </div>
              <Hint message='The shape of the input tensor is (BatchSize x InputSize).' />
            </div>
          </div>

          <div className='mb-4'>
            <label className='block text-gray-600 text-sm'>Output Size:</label>
            <div className='flex items-center'>
              <div className='mt-1 block w-full rounded border-gray-300 shadow-sm sm:text-sm bg-gray-100 p-2'>
                {props.data.outputSize ? props.data.outputSize : 'Not Connected'}
              </div>
              <Hint message='The shape of the output tensor is (BatchSize x NumNeurons).' />
            </div>
          </div>
        </div>
      )}
      <Handle type='source' position={Position.Right} isConnectable={true} />
    </div>
  );
};

export default FullyConnectedLayerNode;
