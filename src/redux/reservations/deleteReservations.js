const deleteReservation = async (id) => {
  const response = await fetch('http://127.0.0.1:8080/booking', {
    method: 'delete',
    headers: {
      'content-type': 'application/json',
      Authorization: localStorage.getItem('token'),
    },
    body: JSON.stringify({ id }),
  });

  const data = await response.json();
  return data;
};

export default deleteReservation;
