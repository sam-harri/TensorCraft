import Hint from "./Hint";

export type shapeLabelType = {
    input: boolean;
    shape: string;
    shapeHintMessage: string;
}

const ShapeLabel : React.FC<shapeLabelType> = ({input, shape, shapeHintMessage}) => {
    return (
        <>
        <div className="mb-4">
            <label className="block text-gray-600 text-sm">{input ? "Input Shape :" : "Output Shape :"}</label>
            <div className="flex items-center">
              <div className="mt-1 block w-full rounded border-gray-300 shadow-sm sm:text-sm bg-gray-100 p-2">
                {shape}
              </div>
              <Hint message={shapeHintMessage} />
            </div>
          </div>
        </>
    );
};

export default ShapeLabel;