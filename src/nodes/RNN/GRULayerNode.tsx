import React, { useState, useEffect } from 'react';
import { NodeProps, Handle, Position } from 'reactflow';
import useGraphStore from '../../state/graphStore';
import InputField from '../../components/InputField';
import NodeHeader from '../../components/NodeHeader';
import Checkbox from '../../components/Checkbox';
import ShapeLabel from '../../components/ShapeLabel';
import Hint from '../../components/Hint';

export type GRULayerNodeData = {
    hiddenSize: number | null;
    numLayers: number | null;
    dropout: number | null;
    bidirectional: boolean;
    inputShape: string | null; // batch, seq_len, features
    outputShape: string | null;
    inputShapeOrder: string | null;
    outputShapeOrder: string | null;
};

const validatePositiveNumber = (value: number) => value > 0;
const validateNonNegativeNumber = (value: number) => value >= 0;

const GRULayerNode: React.FC<NodeProps<GRULayerNodeData>> = (props) => {
    const updateNodeData = useGraphStore((state) => state.updateNodeData);
    const [isCollapsed, setIsCollapsed] = useState(true);

    const [hiddenSize, setHiddenSize] = useState<number | null>(props.data.hiddenSize ?? null);
    const [hiddenSizeInput, setHiddenSizeInput] = useState<string>(hiddenSize !== null ? hiddenSize.toString() : '');
    const [hiddenSizeError, setHiddenSizeError] = useState<string | null>(null);

    const [numLayers, setNumLayers] = useState<number | null>(props.data.numLayers ?? null);
    const [numLayersInput, setNumLayersInput] = useState<string>(numLayers !== null ? numLayers.toString() : '');
    const [numLayersError, setNumLayersError] = useState<string | null>(null);

    const [dropout, setDropout] = useState<number | null>(props.data.dropout ?? null);
    const [dropoutInput, setDropoutInput] = useState<string>(dropout !== null ? dropout.toString() : '');
    const [dropoutError, setDropoutError] = useState<string | null>(null);

    const { bidirectional } = props.data;

    const handleBidirectionalChange = (checked: boolean) => {
        updateNodeData(props.id, { bidirectional: checked });
    };

    useEffect(() => {
        const inputShape = props.data.inputShape;
        if (inputShape) {
            const inputShapeArr = inputShape.split(',').map((dim) => dim.trim());
            const bidirectionalMultiplier = bidirectional ? 2 : 1;
            const featureSize = hiddenSize !== null ? hiddenSize * bidirectionalMultiplier : 'Hout';
    
            const outputShape = `${inputShapeArr[0]}, ${inputShapeArr[1]}, ${featureSize})`;
            updateNodeData(props.id, { outputShape });
        } else {
            updateNodeData(props.id, { outputShape: 'Not Connected' });
        }
    }, [props.data.inputShape, hiddenSize, bidirectional, updateNodeData]);

    useEffect(() => {
        updateNodeData(props.id, { outputShapeOrder: props.data.inputShapeOrder });
      }, [props.data.inputShapeOrder])

    return (
        <div className="bg-white shadow-md rounded border border-gray-300 w-72 relative">
            <Handle type="target" position={Position.Left} isConnectable={true} />
            <NodeHeader title="GRU Layer" isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} imageSource="rnn/gru.png" imageAlt="GRU" props={props} />
            {!isCollapsed && (
                <div className="p-4 border-t border-gray-200">
                    <InputField
                        label="Hidden Size"
                        valueInput={hiddenSizeInput}
                        setValueInput={setHiddenSizeInput}
                        valueError={hiddenSizeError}
                        setValueError={setHiddenSizeError}
                        setValue={setHiddenSize}
                        errorMessage="Hidden size must be a positive number."
                        hintMessage="The number of features in the hidden state."
                        validationFunction={validatePositiveNumber}
                        props={props}
                        dataKey="hiddenSize"
                        effectDependencies={[updateNodeData]}
                    />
                    <InputField
                        label="Number of Layers"
                        valueInput={numLayersInput}
                        setValueInput={setNumLayersInput}
                        valueError={numLayersError}
                        setValueError={setNumLayersError}
                        setValue={setNumLayers}
                        errorMessage="Number of layers must be a positive number."
                        hintMessage="Number of GRU Layers stacked together."
                        validationFunction={validatePositiveNumber}
                        props={props}
                        dataKey="numLayers"
                        effectDependencies={[updateNodeData]}
                    />
                    <InputField
                        label="Dropout"
                        valueInput={dropoutInput}
                        setValueInput={setDropoutInput}
                        valueError={dropoutError}
                        setValueError={setDropoutError}
                        setValue={setDropout}
                        errorMessage="Dropout must be a non-negative number."
                        hintMessage="Dropout probability for each GRU layer except the last layer."
                        validationFunction={validateNonNegativeNumber}
                        props={props}
                        dataKey="dropout"
                        effectDependencies={[updateNodeData]}
                    />
                    <div className="mb-2 flex items-center">
                        <label className="block text-gray-600 text-sm mr-2">Bidirectional:</label>
                        <Checkbox id="bidirectionalCheck" checked={bidirectional} onChangeFunction={handleBidirectionalChange} />
                        <Hint message="If True, becomes a bidirectional GRU." />
                    </div>
                    <ShapeLabel input={true} shape={props.data.inputShape || 'Not Connected'} shapeHintMessage="The shape of the input tensor is expected to be (Batch, Sequence Length, Features)." />
                    <ShapeLabel input={false} shape={props.data.outputShape || 'Not Connected'} shapeHintMessage="The shape of the output tensor is expected to be (Batch, Sequence Length, OutFeatures)." />
                </div>
            )}
            <Handle type="source" position={Position.Right} isConnectable={true} />
        </div>
    );
};

export default GRULayerNode;
