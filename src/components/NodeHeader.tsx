import DeleteNode from "./DeleteNode";
import Dropdown from "./Dropdown";

export type NodeHeaderType = {
    title: string;
    isCollapsed: boolean;
    setIsCollapsed: (isCollapsed: boolean) => void;
    imageSource: string;
    imageAlt: string;
    props: any;
}

const NodeHeader: React.FC<NodeHeaderType> = ({ title, isCollapsed, setIsCollapsed, imageSource, imageAlt, props }) => {

    return (
        <>
            <div
                className="flex items-center p-1 cursor-pointer"
                onClick={() => setIsCollapsed(!isCollapsed)}
            >
                <img
                    src={imageSource}
                    alt={imageAlt}
                    className="rounded-full h-10 w-10 mr-4"
                />
                <div className="flex-grow font-semibold text-gray-800 text-left">{title}</div>
                <DeleteNode nodeId={props.id} />
                <div className="text-gray-500 ml-2">
                    <Dropdown isCollapsed={isCollapsed} />
                </div>
            </div>
        </>
    );

};

export default NodeHeader;