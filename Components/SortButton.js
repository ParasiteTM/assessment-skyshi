import { useEffect, useState } from 'react';
import { currentList } from '../store';
const SortButton = () => {
  const [showDropDown, setShowDropDown] = useState(false);
  const [currentSortMode, setCurrentSortMode] = useState('terbaru');

  const handleSort = currentList((state) => state.handleSort);
  const currentListInfo = currentList((state) => state.currentListInfo);
  useEffect(() => {
    if (Object.keys(currentListInfo).length !== 0) {
      handleSort(currentSortMode);
      setShowDropDown(false);
    }
  }, [currentSortMode]);

  return (
    <div className="sortButtonContainer">
      <img
        src="/todo-sort-button.png"
        alt=""
        onClick={() => setShowDropDown((prev) => !prev)}
        data-cy="todo-sort-button"
      />

      <div
        className={`actionButtonsContainer ${
          showDropDown ? 'showDropDown' : ''
        }`}
      >
        <div
          onClick={() => setCurrentSortMode('terbaru')}
          className={`actionButtons ${
            currentSortMode === 'terbaru' ? 'active' : ''
          }`}
          data-cy={`sort-selection`}
        >
          <img data-cy="sort-selection-icon" src="/sort/terbaru.png" alt="" />
          <h3 data-cy="sort-selection-title">Terbaru</h3>
        </div>
        <div
          onClick={() => setCurrentSortMode('terlama')}
          className={`actionButtons ${
            currentSortMode === 'terlama' ? 'active' : ''
          }`}
          data-cy={`sort-selection`}
        >
          <img data-cy="sort-selection-icon" src="/sort/terlama.png" alt="" />
          <h3 data-cy="sort-selection-title">Terlama</h3>
        </div>
        <div
          onClick={() => setCurrentSortMode('a-z')}
          className={`actionButtons ${
            currentSortMode === 'a-z' ? 'active' : ''
          }`}
          data-cy={`sort-selection`}
        >
          <img data-cy="sort-selection-icon" src="/sort/az.png" alt="" />
          <h3 data-cy="sort-selection-title">A-Z</h3>
        </div>
        <div
          onClick={() => setCurrentSortMode('z-a')}
          className={`actionButtons ${
            currentSortMode === 'z-a' ? 'active' : ''
          }`}
          data-cy={`sort-selection`}
        >
          <img data-cy="sort-selection-icon" src="/sort/za.png" alt="" />
          <h3 data-cy="sort-selection-title">Z-A</h3>
        </div>
        <div
          onClick={() => setCurrentSortMode('belum')}
          className={`actionButtons ${
            currentSortMode === 'belum' ? 'active' : ''
          }`}
          data-cy={`sort-selection`}
        >
          <img data-cy="sort-selection-icon" src="/sort/blum.png" alt="" />
          <h3 data-cy="sort-selection-title">Belum Selesai</h3>
        </div>
      </div>
    </div>
  );
};

export default SortButton;
