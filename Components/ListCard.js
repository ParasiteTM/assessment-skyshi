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
    <div className="listCard">
      <input
        type="checkbox"
        className="checkbox"
        value={isCompleted}
        defaultChecked={isCompleted}
        onChange={handleCheckboxChange}
      />
      <div className="priorityContainer">
        <div className={`priority ${item.priority}`}></div>
        <h3 className={`${isCompleted ? 'completed' : ''}`}>{item.title}</h3>
        <img src="/todo-title-edit-button.png" alt="" />
      </div>
      <img
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
