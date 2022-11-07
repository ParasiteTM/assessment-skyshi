import { useState } from 'react';
import { currentDelete } from '../store';
import { activityStore } from '../store';
import CompleteDeleteCard from './CompleteDeleteCard';

const ConfirmDeleteModal = () => {
  const currentDeleteTarget = currentDelete(
    (state) => state.currentDeleteTarget
  );
  const deleteActivity = activityStore((state) => state.deleteActivity);
  const disableModal = currentDelete((state) => state.disableModal);

  const [completeDelete, setCompleteDelete] = useState(false);

  const removeElement = (e) => {
    fetch(
      `https://todo.api.devcode.gethired.id/activity-groups/${currentDeleteTarget.id}`,
      {
        method: 'DELETE',
      }
    )
      .then(deleteActivity(currentDeleteTarget.id))
      .then(setCompleteDelete(true));
  };
  return (
    <div className="deleteModalContainer" onClick={disableModal}>
      {completeDelete ? (
        <CompleteDeleteCard />
      ) : (
        <div
          className="deleteModalCard"
          onClick={(e) => e.stopPropagation()}
          data-cy="modal-delete"
        >
          <img src="delete.png" alt="" data-cy="modal-delete-icon" />

          <h2 data-cy="modal-delete-title">
            Apakah anda yakin menghapus activity
            <span>{`"${currentDeleteTarget.title}?"`}</span>
          </h2>
          <div className="buttonContainer">
            <button
              className="batal"
              onClick={disableModal}
              data-cy="modal-delete-cancel-button"
            >
              Batal
            </button>
            <button
              className="hapus"
              onClick={removeElement}
              data-cy="modal-delete-confirm-button"
            >
              Hapus
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConfirmDeleteModal;
