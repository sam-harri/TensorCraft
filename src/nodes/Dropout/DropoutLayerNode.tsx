import React, { useState, useEffect } from 'react';
import { NodeProps, Handle, Position } from 'reactflow';
import useGraphStore from '../../state/graphStore';
import InputField from '../../components/InputField';
import NodeHeader from '../../components/NodeHeader';
import Checkbox from '../../components/Checkbox';
import ShapeLabel from '../../components/ShapeLabel';
import Hint from '../../components/Hint';

export type DropoutLayerNodeData = {
    p: number | null;
    inplace: boolean;
    inputShape: string | null;
    outputShape: string | null;
    inputShapeOrder: string | null;
    outputShapeOrder: string | null;
};

const validateProbability = (value: number) => value >= 0 && value <= 1;

const DropoutLayerNode: React.FC<NodeProps<DropoutLayerNodeData>> = (props) => {
    const updateNodeData = useGraphStore((state) => state.updateNodeData);
    const [isCollapsed, setIsCollapsed] = useState(true);

    const [p, setP] = useState<number | null>(props.data.p ?? null);
    const [pInput, setPInput] = useState<string>(p !== null ? p.toString() : '');
    const [pError, setPError] = useState<string | null>(null);

    const { inplace } = props.data;

    const handleInplaceChange = (checked: boolean) => {
        updateNodeData(props.id, { inplace: checked });
    };

    useEffect(() => {
        const inputShape = props.data.inputShape;
        if (inputShape) {
            updateNodeData(props.id, { outputShape: inputShape });
        } else {
            updateNodeData(props.id, { outputShape: 'Not Connected' });
        }
    }, [props.data.inputShape, updateNodeData]);

    useEffect(() => {
        updateNodeData(props.id, { outputShapeOrder: props.data.inputShapeOrder });
    }, [props.data.inputShapeOrder, updateNodeData, props.id]);

    return (
        <div className="bg-white shadow-md rounded border border-gray-300 w-72 relative">
            <Handle type="target" position={Position.Left} isConnectable={true} />
            <NodeHeader
                title="Dropout Layer"
                isCollapsed={isCollapsed}
                setIsCollapsed={setIsCollapsed}
                imageSource="dropout/dropout.png"
                imageAlt="Dropout"
                props={props} />
            {!isCollapsed && (
                <div className="p-4 border-t border-gray-200">
                    <InputField
                        label="Dropout Probability (p)"
                        valueInput={pInput}
                        setValueInput={setPInput}
                        valueError={pError}
                        setValueError={setPError}
                        setValue={setP}
                        errorMessage="Probability must be between 0 and 1."
                        hintMessage="The probability of an element being zeroed out. Default: 0.5."
                        validationFunction={validateProbability}
                        props={props}
                        dataKey="p"
                        effectDependencies={[updateNodeData]}
                    />
                    <div className="mb-2 flex items-center">
                        <label className="block text-gray-600 text-sm mr-2">Inplace:</label>
                        <Checkbox id="inplaceCheck" checked={inplace} onChangeFunction={handleInplaceChange} />
                        <Hint message="If True, performs the operation in-place. Default: False." />
                    </div>
                    <ShapeLabel input={true} shape={props.data.inputShape || 'Not Connected'} shapeHintMessage="The shape of the input tensor." />
                    <ShapeLabel input={false} shape={props.data.outputShape || 'Not Connected'} shapeHintMessage="The shape of the output tensor is the same as the input shape." />
                </div>
            )}
            <Handle type="source" position={Position.Right} isConnectable={true} />
        </div>
    );
};

export default DropoutLayerNode;
