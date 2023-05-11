import React from "react";
import { Card, Button } from "antd";
import { Draggable, type DraggableProvided, type DraggableStateSnapshot, Droppable } from "react-beautiful-dnd";
import { MdDragIndicator } from "react-icons/md";
import { usePreferencesStore } from "../store/preferences";
import { type Option } from "../models/Option";
import { FaCross, FaTrash } from "react-icons/fa";
import { ImCross } from "react-icons/im";

interface DraggableOptionProps {
    option: Option;
    index: number;
    optionChange: (option: Option, event: React.ChangeEvent<HTMLInputElement>) => void;
    removeOption: (option: Option) => void;
}

const DraggableOption: React.FC<DraggableOptionProps> = ({ option, index, optionChange, removeOption }) => {
    const { theme } = usePreferencesStore();

    return (
        <Draggable draggableId={option.id} index={index}>
            {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
                <Card
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    bodyStyle={{ backgroundColor: theme.background, borderRadius: "0.4rem" }}
                    className="select-none"
                    size="small"
                    style={{
                        ...provided.draggableProps.style,
                        opacity: snapshot.isDragging ? 0.5 : 1,
                    }}
                >
                    <div className="flex items-center justify-between gap-1">
                        <input
                            type="text"
                            className="w-full"
                            value={option.text}
                            onChange={e => optionChange(option, e)}
                        />
                        <Button
                            type="text"
                            danger
                            onClick={() => {
                                removeOption(option);
                            }}
                            icon={<ImCross />}
                        />
                        <div {...provided.dragHandleProps} className="cursor-grab">
                            <MdDragIndicator className="text-xl" />
                        </div>
                    </div>
                </Card>
            )}
        </Draggable>
    );
};

export default DraggableOption;
