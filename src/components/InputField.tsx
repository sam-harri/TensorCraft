import { useEffect } from "react";
import Hint from "./Hint";

export type InputFieldType = {
    valueError: string | null;
    valueInput: string;
    setValue: (value: any | null) => void;
    setValueError: (error: string | null) => void;
    setValueInput: (value: any) => void;
    errorMessage: string;
    hintMessage: string;
    label: string
    validationFunction: (value: any) => boolean;
    props: any
    dataKey: string;
}

const InputField: React.FC<InputFieldType> = ({ valueError, valueInput, setValue, setValueError, setValueInput, errorMessage, hintMessage, label, validationFunction, props, dataKey }) => {

    useEffect(() => {
        const timer = setTimeout(() => {
            const value = valueInput ? Number(valueInput) : null;
            if (value !== null && !validationFunction(value)) {
                setValueError(errorMessage);
            } else {
                setValueError(null);
                props.data[dataKey] = value;
                setValue(value);
            }
        }, 200);

        return () => clearTimeout(timer);
    }, [valueInput]);

    return (
        <>
            <div className="mb-4">
                <label className="block text-gray-600 text-sm">{label}</label>
                <div className="flex items-center">
                    <input
                        type="number"
                        className="mt-1 block w-full rounded shadow-sm sm:text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none border-gray-300"
                        value={valueInput}
                        onChange={(e) => setValueInput(e.target.value)}
                        style={{ padding: '10px', height: '40px' }}
                    />
                    <Hint message={hintMessage} />
                </div>
                {valueError && <p className="text-red-500 text-xs mt-1">{valueError}</p>}
            </div>
        </>
    );
};

export default InputField;
