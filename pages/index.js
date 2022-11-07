import { useState, useEffect } from 'react';
import { activityStore } from '../store';

import { getInitialActivity } from '../utils';
import ActivityCard from '../Components/ActivityCard';
const index = () => {
  const activity = activityStore((state) => state.activity);
  const setActivity = activityStore((state) => state.setActivity);
  const addNewActivity = activityStore((state) => state.addNewActivity);

  const [showEmpty, setShowEmpty] = useState(false);

  useEffect(() => {
    const getData = async () => {
      let data = await getInitialActivity();

      if (data.length === 0) {
        setShowEmpty(true);
      }
      setActivity(data);
    };

    getData();
  }, []);

  const handleAddActivity = async () => {
    fetch('https://todo.api.devcode.gethired.id/activity-groups', {
      method: 'POST',
      body: JSON.stringify({
        email: 'roberto30nembhwani@gmail.com',
        title: 'New Activity',
      }),
      headers: {
        'content-type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((res) =>
        addNewActivity({
          id: res.id,
          title: res.title,
          created_at: res.created_at,
        })
      )
      .then(setShowEmpty(false));
  };
  return (
    <main className="index">
      <div className="container mainHeader">
        <h2 data-cy="activity-title">Activity</h2>
        <button onClick={handleAddActivity}>+ Tambah</button>
      </div>
      <div className="container content">
        {showEmpty ? (
          <img src="activity-empty-state.png" className="empty-activity" />
        ) : (
          <div className="activityContainer">
            {activity.map((item) => (
              <ActivityCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default index;
