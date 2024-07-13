import React, { useState, useEffect } from 'react';
import { NodeProps, Handle, Position } from 'reactflow';
import InputField from '../../components/InputField';
import useGraphStore from '../../state/graphStore';
import ShapeLabel from '../../components/ShapeLabel';
import NodeHeader from '../../components/NodeHeader';
import Checkbox from '../../components/Checkbox';
import Hint from '../../components/Hint';

export type FullyConnectedNodeData = {
  numNeurons: number | null;
  inputShape: string | null;
  outputShape: string | null;
  bias: boolean;
};

const validatePositiveNumber = (value: number) => value >= 1;

const FullyConnectedLayerNode: React.FC<NodeProps<FullyConnectedNodeData>> = (props) => {
  const updateNodeData = useGraphStore((state) => state.updateNodeData);
  const [isCollapsed, setIsCollapsed] = useState(true);

  const { bias } = props.data;
  
  const [numNeurons, setNumNeurons] = useState<number | null>(props.data.numNeurons ?? null);
  const [numNeuronsInput, setNumNeuronsInput] = useState<string>(numNeurons !== null ? numNeurons.toString() : '');
  const [numNeuronsError, setNumNeuronsError] = useState<string | null>(null);

  useEffect(() => {
    const inputShape = props.data.inputShape;
    if (inputShape) {
      const inputShapeArr = inputShape.split(',').map((dim) => dim.trim());
      inputShapeArr[inputShapeArr.length - 1] = numNeurons !== null ? numNeurons.toString() : 'H';
      const newOutputShape = `(${inputShapeArr.join(', ')})`;
      updateNodeData(props.id, { outputShape: newOutputShape });
    } else {
      updateNodeData(props.id, { outputShape: 'Not Connected' });
    }
  }, [props.data.inputShape, numNeurons, updateNodeData]);

  const handleBiasChange = (checked: boolean) => {
    updateNodeData(props.id, { bias: checked });
  };

  return (
    <div className='bg-white shadow-md rounded border border-gray-300 w-72 relative'>
      <Handle type='target' position={Position.Left} isConnectable={true} />
      <NodeHeader title="Linear" isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} imageSource='activationfunctions/linear.png' imageAlt='Linear Activation' props={props} />
      {!isCollapsed && (
        <div className='p-4 border-t border-gray-200'>
          <InputField
            label="Number of Neurons"
            valueInput={numNeuronsInput}
            setValueInput={setNumNeuronsInput}
            valueError={numNeuronsError}
            setValueError={setNumNeuronsError}
            setValue={setNumNeurons}
            errorMessage="Number of neurons must be at least 1."
            hintMessage="The number of neurons in the fully connected layer."
            validationFunction={validatePositiveNumber}
            props={props}
            dataKey="numNeurons"
            effectDependencies={[updateNodeData]}
          />
          <div className='mb-2 flex items-center'>
            <label className='block text-gray-600 text-sm mr-2'>Bias:</label>
            <Checkbox id='biasCheck' checked={bias} onChangeFunction={handleBiasChange} />
            <Hint message='Adds a trainable constant term to the linear output, allowing the model to fit the data better by shifting the activation function.' />
          </div>
          <ShapeLabel input={true} shape={props.data.inputShape || 'Not Connected'} shapeHintMessage="The shape of the input tensor is (BatchSize x InputSize)." />
          <ShapeLabel input={false} shape={props.data.outputShape || 'Not Connected'} shapeHintMessage="The shape of the output tensor is (BatchSize x NumNeurons)." />
        </div>
      )}
      <Handle type='source' position={Position.Right} isConnectable={true} />
    </div>
  );
};

export default FullyConnectedLayerNode;
