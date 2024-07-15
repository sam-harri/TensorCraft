import React, { useEffect } from "react";
import Hint from "./Hint";

export type DoubleInputFieldType = {
  value1Input: string;
  setValue1: (value: any | null) => void;
  setValue1Input: (value: any) => void;
  label1: string;
  value2Input: string;
  setValue2: (value: any | null) => void;
  setValue2Input: (value: any) => void;
  label2: string;
  hintMessage: string;
  validationFunction: (value: any) => boolean;
  props: any;
  dataKey1: string;
  dataKey2: string;
  error: string | null;
  setError: (error: string | null) => void;
  errorMessage: string;
  effectDependencies?: any[]; // New prop for useEffect dependencies
};

const DoubleInputField: React.FC<DoubleInputFieldType> = ({
  value1Input,
  setValue1,
  setValue1Input,
  label1,
  value2Input,
  setValue2,
  setValue2Input,
  label2,
  hintMessage,
  validationFunction,
  props,
  dataKey1,
  dataKey2,
  error,
  setError,
  errorMessage,
  effectDependencies = [] // Default to an empty array if not provided
}) => {

  useEffect(() => {
    const timer = setTimeout(() => {
      const value1 = value1Input ? Number(value1Input) : null;
      const value2 = value2Input ? Number(value2Input) : null;

      if ((value1 !== null && !validationFunction(value1)) || (value2 !== null && !validationFunction(value2))) {
        setError(errorMessage);
      } else {
        setError(null);
        props.data[dataKey1] = value1;
        props.data[dataKey2] = value2;
        setValue1(value1);
        setValue2(value2);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [value1Input, value2Input, ...effectDependencies]); // Spread the effectDependencies array

  return (
    <>
      <div className="mb-4">
        <label className="block text-gray-600 text-sm">{label1} / {label2}</label>
        <div className="flex items-center mb-2">
          <input
            type="number"
            className="mt-1 block w-full rounded shadow-sm sm:text-sm border-gray-300 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            value={value1Input}
            onChange={(e) => setValue1Input(e.target.value)}
            style={{ padding: '10px', height: '40px', marginRight: '8px' }}
          />
          <input
            type="number"
            className="mt-1 block w-full rounded shadow-sm sm:text-sm border-gray-300 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            value={value2Input}
            onChange={(e) => setValue2Input(e.target.value)}
            style={{ padding: '10px', height: '40px' }}
          />
        </div>
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        <Hint message={hintMessage} />
      </div>
    </>
  );
};

export default DoubleInputField;
