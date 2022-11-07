import { useState } from 'react';
// import {}

import { listModal, currentList } from '../store';

const DropDown = ({
  currentDropDown,
  setCurrentDropDown,
  showDropDown,
  setShowDropDown,
}) => {
  const handleDropDownChange = (priority) => {
    if (currentDropDown !== priority) {
      setCurrentDropDown(priority);
      setShowDropDown(false);
    }
  };
  return (
    <div className="dropDownContainer">
      <div
        className="current"
        onClick={() => setShowDropDown((prev) => !prev)}
        data-cy="modal-add-priority-dropdown"
      >
        <div className={`priorityContainer`}>
          <div className={`priority ${currentDropDown}`}></div>
        </div>
        <h3>{currentDropDown.replace('-', ' ')}</h3>
        <img src="/tabler_chevron-down.png" alt="Chevron Down" />
      </div>
      {showDropDown ? (
        <div className="dropDownOptionsContainer">
          <div
            data-cy="modal-add-priority-item"
            onClick={() => handleDropDownChange('very-high')}
            className={`dropDownOption ${
              currentDropDown === 'very-high' ? 'active' : ''
            }`}
          >
            <div className={`priorityContainer`}>
              <div className={`priority very-high`}></div>
            </div>
            <h3>Very High</h3>
          </div>
          <div
            data-cy="modal-add-priority-item"
            onClick={() => handleDropDownChange('high')}
            className={`dropDownOption ${
              currentDropDown === 'high' ? 'active' : ''
            }`}
          >
            <div className={`priorityContainer`}>
              <div className={`priority high`}></div>
            </div>
            <h3>High</h3>
          </div>
          <div
            data-cy="modal-add-priority-item"
            onClick={() => handleDropDownChange('medium')}
            className={`dropDownOption ${
              currentDropDown === 'medium' ? 'active' : ''
            }`}
          >
            <div className={`priorityContainer`}>
              <div className={`priority medium`}></div>
            </div>
            <h3>medium</h3>
          </div>
          <div
            data-cy="modal-add-priority-item"
            onClick={() => handleDropDownChange('low')}
            className={`dropDownOption ${
              currentDropDown === 'low' ? 'active' : ''
            }`}
          >
            <div className={`priorityContainer `}>
              <div className={`priority low`}></div>
            </div>
            <h3>low</h3>
          </div>
          <div
            data-cy="modal-add-priority-item"
            onClick={() => handleDropDownChange('very-low')}
            className={`dropDownOption ${
              currentDropDown === 'very-low' ? 'active' : ''
            }`}
          >
            <div className={`priorityContainer`}>
              <div className={`priority very-low`}></div>
            </div>
            <h3>Very low</h3>
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};
const ListModal = () => {
  const disableListModal = listModal((state) => state.disableListModal);
  const currentListInfo = currentList((state) => state.currentListInfo);
  const addNewTodo = currentList((state) => state.addNewTodo);

  const setShowListImagePlacehodler = currentList(
    (state) => state.setShowListImagePlacehodler
  );

  const [currentDropDown, setCurrentDropDown] = useState('high');
  const [showDropDown, setShowDropDown] = useState(false);

  const [inputValue, setInputValue] = useState('');

  const handleListSubmit = () => {
    fetch('https://todo.api.devcode.gethired.id/todo-items', {
      method: 'POST',
      body: JSON.stringify({
        activity_group_id: currentListInfo.id,
        priority: currentDropDown,
        title: inputValue,
      }),
      headers: {
        'content-type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log('meow', res);
        addNewTodo({
          id: res.id,
          title: res.title,
          activity_group_id: res.activity_group_id,
          is_active: res.is_active,
          priority: res.priority,
        });
      })
      .then(setShowListImagePlacehodler())
      .then(disableListModal());
  };
  return (
    <div
      className="listModalContainer"
      onClick={disableListModal}
      data-cy="modal-add"
    >
      <div className="listModalCard" onClick={(e) => e.stopPropagation()}>
        <div className="listHeader">
          <h2 data-cy="modal-add-title">Tambah list item</h2>
          <img
            src="/modal-add-close-button.png"
            alt="Close Modal"
            onClick={disableListModal}
          />
        </div>
        <div className="inputsContainer">
          <div className="listName">
            <span data-cy="modal-add-name-title">nama list item</span>
            <input
              type="text"
              placeholder="Tambahkan nama Activity"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              data-cy="modal-add-name-input"
            />
          </div>
          <div className="priority">
            <span data-cy="modal-add-priority-title">priority</span>
            <DropDown
              currentDropDown={currentDropDown}
              setCurrentDropDown={setCurrentDropDown}
              showDropDown={showDropDown}
              setShowDropDown={setShowDropDown}
            />
          </div>
          <div className="buttonContainer">
            <button
              data-cy="modal-add-save-button"
              onClick={handleListSubmit}
              disabled={inputValue.length <= 0}
              className={`${inputValue.length > 0 ? 'allowed' : ''}`}
            >
              simpan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListModal;
