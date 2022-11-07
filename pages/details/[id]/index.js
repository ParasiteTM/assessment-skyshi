import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { activityStore, currentList, listModal } from '../../../store';

import SortButton from '../../../Components/SortButton';
import ListCard from '../../../Components/ListCard';
const index = () => {
  const router = useRouter();
  const { id } = router.query;

  const getSpecificActivity = activityStore(
    (state) => state.getSpecificActivity
  );

  const currentListInfo = currentList((state) => state.currentListInfo);
  const setCurrentListInfo = currentList((state) => state.setCurrentListInfo);
  const setCurrentListTitle = currentList((state) => state.setCurrentListTitle);
  const showEmpty = currentList((state) => state.showListImagePlaceholder);
  const setShowListImagePlacehodler = currentList(
    (state) => state.setShowListImagePlacehodler
  );

  const activateListModal = listModal((state) => state.activateListModal);

  const [allowEdit, setAllowEdit] = useState(false);

  const toggleAllowEdit = () => {
    setAllowEdit((prev) => !prev);
  };

  const handleEditTitle = () => {
    fetch(`https://todo.api.devcode.gethired.id/activity-groups/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        title: currentListInfo.title,
      }),
      headers: {
        'content-type': 'application/json',
      },
    }).then((res) => res.json());

    toggleAllowEdit();
  };

  useEffect(() => {
    const getPageData = async () => {
      if (id === undefined) {
        return '';
      }
      fetch(`https://todo.api.devcode.gethired.id/activity-groups/${id}`, {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
        },
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.todo_items.length > 0) {
            setShowListImagePlacehodler();
          }

          setCurrentListInfo(res);
        });
    };

    getPageData();
  }, [id]);

  return (
    <div className="listContainer">
      <div className="container header">
        <div className="left">
          <img
            src="/todo-back-button.png"
            alt="Back"
            onClick={() => router.push('/')}
            data-cy="todo-back-button"
          />
          {allowEdit ? (
            <input
              value={currentListInfo.title}
              onChange={(e) => setCurrentListTitle(e.target.value)}
              onBlur={handleEditTitle}
              autoFocus
              data-cy="todo-title"
            />
          ) : (
            <h2 onClick={toggleAllowEdit} data-cy="todo-title">
              {currentListInfo.title}
            </h2>
          )}
          <img
            src="/todo-title-edit-button.png"
            alt="Edit Title"
            onClick={toggleAllowEdit}
            data-cy="todo-title-edit-button"
          />
        </div>
        <div className="right">
          <SortButton />

          <button onClick={activateListModal} data-cy="todo-add-button">
            + Tambah
          </button>
        </div>
      </div>
      <div className="container listContent">
        {showEmpty ? (
          <div className="emptyContainer" data-cy="todo-empty-state">
            <img src="/todo-empty-state.png" className="empty-activity" />
          </div>
        ) : (
          <div className="listContentContainer">
            {currentListInfo.todo_items
              ? currentListInfo.todo_items.map((item) => (
                  <ListCard key={item.id} item={item} />
                ))
              : ''}
          </div>
        )}
      </div>
    </div>
  );
};

export default index;
