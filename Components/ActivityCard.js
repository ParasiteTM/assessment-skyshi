import { useEffect } from 'react';
import { currentDelete } from '../store';
import Link from 'next/link';
const ActivityCard = ({ item }) => {
  const activateModal = currentDelete((state) => state.activateModal);
  const setCurrentDeleteTarget = currentDelete(
    (state) => state.setCurrentDeleteTarget
  );

  const handleDelete = () => {
    activateModal();

    setCurrentDeleteTarget(item);
  };
  let basic = new Date(item.created_at);
  let formatedDate = basic.toLocaleDateString('id', {
    day: 'numeric',
    year: 'numeric',
    month: 'long',
  });

  return (
    <div className="activityCard">
      <Link href={`/details/${item.id}`}>
        <h2>{item.title}</h2>
      </Link>
      <div className="cardFooter">
        <span>{formatedDate}</span>
        <img src="trash.png" alt="" onClick={handleDelete} />
      </div>
    </div>
  );
};

export default ActivityCard;
