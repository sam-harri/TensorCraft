import { useSelect } from "downshift";
import useGraphStore from "../state/graphStore";



const imageTypes = [
    { value: 'BW', label: 'Black and White', channels: 1 },
    { value: 'Color', label: 'Color', channels: 3 }
  ];

export type SelectImageTypeType = {
    numChannels: number | null;
    setNumChannels: (numChannels: number) => void;
    props: any;
};

const SelectImageType: React.FC<SelectImageTypeType> = ({setNumChannels, numChannels, props}) => {
    const { updateNodeData } = useGraphStore();

    const {
        isOpen,
        getToggleButtonProps,
        getMenuProps,
        highlightedIndex,
        getItemProps,
        selectedItem
      } = useSelect({
        items: imageTypes,
        selectedItem: imageTypes.find(type => type.channels === numChannels),
        onSelectedItemChange: ({ selectedItem }) => {
          setNumChannels(selectedItem.channels);
          updateNodeData(props.id, { numChannels: selectedItem.channels });
        },
      });


    return (
        <>
            <div className="mb-4 relative">
                <label className="block text-gray-600 text-sm">Image Type:</label>
                <div {...getToggleButtonProps()} className="mt-1 w-full rounded border-gray-300 shadow-sm sm:text-sm cursor-pointer bg-white p-2 flex items-center justify-between">
                    {selectedItem ? (
                        <div className="flex items-center">
                            <span>{selectedItem.label}</span>
                        </div>
                    ) : (
                        "Select an image type"
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
                <ul {...getMenuProps()} className={`${isOpen ? "block" : "hidden"} absolute bg-white border border-gray-300 mt-1 rounded shadow-lg z-10 w-full`}>
                    {isOpen &&
                        imageTypes.map((item, index) => (
                            <li
                                key={`${item.value}`}
                                {...getItemProps({ item, index })}
                                className={`p-2 flex items-center cursor-pointer ${highlightedIndex === index ? "bg-gray-200" : ""}`}
                            >
                                {item.label}
                            </li>
                        ))}
                </ul>
            </div></>
    );
}

export default SelectImageType;
