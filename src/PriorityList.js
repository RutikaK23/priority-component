import React, { useState } from "react";
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const initialPriorities = [
  "Money",
  "Career",
  "Impact",
  "Family",
  "Fame",
  "Power / Influence",
  "Respect",
];

const SortableItem = ({ id, index, handleDelete }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="priority-item"
    >
      {id}
      <div className="priority-options">
        <span className="priority-dots">⋮</span>
        <span className="priority-delete" onClick={() => handleDelete(index)}>
          ✕
        </span>
      </div>
    </li>
  );
};

const Priority = () => {
  const [priorities, setPriorities] = useState(initialPriorities);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setPriorities((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
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
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={priorities}
          strategy={verticalListSortingStrategy}
        >
          <ul className="priority-list">
            {priorities.map((priority, index) => (
              <SortableItem
                key={priority}
                id={priority}
                index={index}
                handleDelete={handleDelete}
              />
            ))}
          </ul>
        </SortableContext>
      </DndContext>
      <div className="priority-add-card" onClick={handleAddCard}>
        + Add a card
      </div>
    </div>
  );
};

export default Priority;
