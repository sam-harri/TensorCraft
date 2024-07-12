import { useSelect } from "downshift";
import { useState } from "react";

const frameworks = [
  //https://www.v7labs.com/blog/neural-networks-activation-functions
  { value: "PyTorch",
    label: "PyTorch",
    img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pytorch/pytorch-original.svg" },
  {
    value: "TensorFlow",
    label: "TensorFlow",
    img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tensorflow/tensorflow-original.svg",
  },
  { value: "Keras",
    label: "Keras",
    img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/keras/keras-original.svg" },
];


const FrameworkDropdown : React.FC = () => {

    const [activationFunction, setActivationFunction] = useState("PyTorch");

    const {
      isOpen,
      getToggleButtonProps,
      getMenuProps,
      highlightedIndex,
      getItemProps,
      selectedItem,
    } = useSelect({
      items: frameworks,
      selectedItem: frameworks.find((func) => func.value === activationFunction),
      onSelectedItemChange: ({ selectedItem }) =>
        setActivationFunction(selectedItem.value),
    });

    return (
        <div className="relative w-60">
        <div
          {...getToggleButtonProps()}
          className="mt-1 w-full rounded border border-gray-200 shadow-sm sm:text-sm cursor-pointer bg-white p-2 flex items-center justify-between"
        >
          {selectedItem ? (
            <div className="flex items-center">
              <img
                src={selectedItem.img}
                alt={selectedItem.label}
                className="mr-2 h-6 w-6"
              />
              <span>{selectedItem.label}</span>
            </div>
          ) : (
            "Select a Framework"
          )}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-400"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 9.293a1 1 0 011.414 0L10 12.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <ul
          {...getMenuProps()}
          className={`${
            isOpen ? "block" : "hidden"
          } absolute bg-white border border-gray-300 mt-1 rounded-xl shadow-lg z-10 w-full`}
        >
          {isOpen &&
            frameworks.map((item, index) => (
              <li
                key={`${item.value}`}
                {...getItemProps({ item, index })}
                className={`p-2 flex items-center cursor-pointer rounded-xl ${
                  highlightedIndex === index ? "bg-gray-200" : ""
                }`}
              >
                <img src={item.img} alt={item.label} className="mr-2 h-6 w-6" />
                {item.label}
              </li>
            ))}
        </ul>
      </div>
    );
};

export default FrameworkDropdown;