import { deleteTodoModal, currentList } from '../store';

const ConfirmDeleteTodoModal = () => {
  const disableModal = deleteTodoModal((state) => state.disableTodoModal);
  const deleteTarget = deleteTodoModal((state) => state.deleteTarget);
  const deleteTodo = currentList((state) => state.deleteTodo);

  const removeElement = () => {
    fetch(`https://todo.api.devcode.gethired.id/todo-items/${deleteTarget}`, {
      method: 'DELETE',
    })
      .then(disableModal())
      .then(deleteTodo());
  };
  return (
    <div className="deleteModalContainer" onClick={disableModal}>
      <div className="deleteModalCard" onClick={(e) => e.stopPropagation()}>
        <img src="/delete.png" alt="delete" />

        <h2>
          Apakah anda yakin menghapus activity
          {/* <span>{`"${currentDeleteTarget.title}?"`}</span> */}
        </h2>
        <div className="buttonContainer">
          <button className="batal" onClick={disableModal}>
            Batal
          </button>
          <button className="hapus" onClick={removeElement}>
            Hapus
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteTodoModal;
