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
      />

      {showDropDown ? (
        <div className="actionButtonsContainer">
          <div
            onClick={() => setCurrentSortMode('terbaru')}
            className={`actionButtons ${
              currentSortMode === 'terbaru' ? 'active' : ''
            }`}
          >
            <img src="/sort/terbaru.png" alt="" />
            <h3>Terbaru</h3>
          </div>
          <div
            onClick={() => setCurrentSortMode('terlama')}
            className={`actionButtons ${
              currentSortMode === 'terlama' ? 'active' : ''
            }`}
          >
            <img src="/sort/terbaru.png" alt="" />
            <h3>Terlama</h3>
          </div>
          <div
            onClick={() => setCurrentSortMode('a-z')}
            className={`actionButtons ${
              currentSortMode === 'a-z' ? 'active' : ''
            }`}
          >
            <img src="/sort/terbaru.png" alt="" />
            <h3>A-Z</h3>
          </div>
          <div
            onClick={() => setCurrentSortMode('z-a')}
            className={`actionButtons ${
              currentSortMode === 'z-a' ? 'active' : ''
            }`}
          >
            <img src="/sort/terbaru.png" alt="" />
            <h3>Z-A</h3>
          </div>
          <div
            onClick={() => setCurrentSortMode('belum')}
            className={`actionButtons ${
              currentSortMode === 'belum' ? 'active' : ''
            }`}
          >
            <img src="/sort/terbaru.png" alt="" />
            <h3>Belum Selesai</h3>
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default SortButton;
