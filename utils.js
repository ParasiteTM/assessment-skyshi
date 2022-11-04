export const getInitialActivity = async () => {
  let data = await fetch(
    'https://todo.api.devcode.gethired.id/activity-groups?email=roberto30nembhwani@gmail.com'
  )
    .then((res) => res.json())
    .then((res) => res.data);

  return data;
};
