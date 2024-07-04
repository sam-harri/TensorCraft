export type InputElementType = {
    label: string;
    img: string;
    nodeClass: string;
}

const InputElement : React.FC<InputElementType>= ({label, img, nodeClass}) => {

    const onDragStart = (event: any, nodeType: any) => {
        event.dataTransfer.setData('application/reactflow', nodeType);
        event.dataTransfer.effectAllowed = 'move';
      };

    return (
        <div className="p-2 cursor-pointer rounded-lg hover:bg-gray-100 flex items-center border border-gray-200" onDragStart={(event) => onDragStart(event, nodeClass)} draggable>
        <img
          src={img}
          alt={label}
          className="rounded-full h-6 w-6 mr-4 border border-gray-300"
        />
        <div className="flex-grow font-semibold text-gray-800 text-left text-sm">{label}</div>
    </div>
    );
}

export default InputElement;