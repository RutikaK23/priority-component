import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const initialPriorities = [
    'Money',
    'Career',
    'Impact',
    'Family',
    'Fame',
    'Power / Influence',
    'Respect'
];

const Priority = () => {
    const [priorities, setPriorities] = useState(initialPriorities);

    const handleOnDragEnd = (result) => {
        if (!result.destination) return;
        const items = Array.from(priorities);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        setPriorities(items);
    };

    const handleAddCard = () => {
        const newPriority = prompt("Enter new priority:");
        if (newPriority) {
            setPriorities([...priorities, newPriority]);
        }
    };

    const handleDelete = (index) => {
        const updatedPriorities = priorities.filter((_, i) => i !== index);
        setPriorities(updatedPriorities);
    };

    return (
        <div className="priority-container">
            <div className="priority-header">
                <div className="priority-title">⋮⋮</div>
                <h3 className="priority-heading">Priorities</h3>
                <div className="priority-count-options">
                    <span className="priority-count">{priorities.length}</span>
                    <span className="priority-options">⋮</span>
                </div>
            </div>
            <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable droppableId="priorities">
                    {(provided) => (
                        <ul className="priority-list" {...provided.droppableProps} ref={provided.innerRef}>
                            {priorities.map((priority, index) => (
                                <Draggable key={priority} draggableId={priority} index={index}>
                                    {(provided) => (
                                        <li
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            className="priority-item"
                                        >
                                            {priority}
                                            <div className="priority-options">
                                                <span className="priority-dots">⋮</span>
                                                <span className="priority-delete" onClick={() => handleDelete(index)}>✕</span>
                                            </div>
                                        </li>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </ul>
                    )}
                </Droppable>
            </DragDropContext>
            <div className="priority-add-card" onClick={handleAddCard}>
                + Add a card
            </div>
        </div>
    );
};

export default Priority;
