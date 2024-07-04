import useStore from "../state/store";

type DeleteNodeProps = {
  nodeId: string;
};

const DeleteNode: React.FC<DeleteNodeProps> = ({ nodeId }) => {
  const deleteNode = useStore((state) => state.deleteNode);

  const handleDelete = () => {
    deleteNode(nodeId);
  };

  return (
    <button
      className='opacity-0 hover:opacity-100 rounded-full w-6 h-6 text-xs text-white flex items-center justify-center pointer-events-auto transition-colors duration-200 ease-in-out hover:bg-red-400 mt-1'
      onClick={handleDelete}
    >
      X
    </button>
  );
};

export default DeleteNode;
