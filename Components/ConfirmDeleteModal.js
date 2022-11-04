import { currentDelete } from '../store';
import { activityStore } from '../store';
const ConfirmDeleteModal = () => {
  const currentDeleteTarget = currentDelete(
    (state) => state.currentDeleteTarget
  );
  const deleteActivity = activityStore((state) => state.deleteActivity);
  const disableModal = currentDelete((state) => state.disableModal);

  const removeElement = (e) => {
    fetch(
      `https://todo.api.devcode.gethired.id/activity-groups/${currentDeleteTarget.id}`,
      {
        method: 'DELETE',
      }
    )
      .then(deleteActivity(currentDeleteTarget.id))
      .then(disableModal());
  };
  return (
    <div className="deleteModalContainer" onClick={disableModal}>
      <div className="deleteModalCard" onClick={(e) => e.stopPropagation()}>
        <img src="delete.png" alt="" />

        <h2>
          Apakah anda yakin menghapus activity
          <span>{`"${currentDeleteTarget.title}?"`}</span>
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

export default ConfirmDeleteModal;
