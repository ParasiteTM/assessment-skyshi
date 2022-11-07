import { useState, useEffect } from 'react';
import { currentList, deleteTodoModal } from '../store';
const ListCard = ({ item }) => {
  const [isCompleted, setIsCompleted] = useState(item.is_active);

  const enableTodoModal = deleteTodoModal((state) => state.enableTodoModal);
  const setDeleteTarget = deleteTodoModal((state) => state.setDeleteTarget);
  const setFilterToDoId = currentList((state) => state.setFilterToDoId);

  const handleCheckboxChange = () => {
    setIsCompleted((prev) => !prev);

    fetch(`https://todo.api.devcode.gethired.id/todo-items/${item.id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        is_active: !isCompleted,
        priority: item.priority,
      }),
      headers: {
        'content-type': 'application/json',
      },
    });
  };

  return (
    <div className="listCard" data-cy="todo-item">
      <input
        type="checkbox"
        className="checkbox"
        value={isCompleted}
        defaultChecked={isCompleted}
        onChange={handleCheckboxChange}
        data-cy="todo-item-checkbox"
      />
      <div className="priorityContainer">
        <div
          className={`priority ${item.priority}`}
          data-cy="todo-item-priority-indicator"
        ></div>
        <h3
          className={`${isCompleted ? 'completed' : ''}`}
          data-cy="todo-item-title"
        >
          {item.title}
        </h3>
        <img
          src="/todo-title-edit-button.png"
          alt=""
          data-cy="todo-item-delete-button"
        />
      </div>
      <img
        data-cy="todo-item-delete-button"
        src="/trash.png"
        alt="delete"
        onClick={() => {
          setFilterToDoId(item.id);
          setDeleteTarget(item.id);
          enableTodoModal();
        }}
      />
    </div>
  );
};

export default ListCard;
