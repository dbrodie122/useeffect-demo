import axios from 'axios';
export const API = 'https://acme-users-api-rev.herokuapp.com/api';

export const fetchUser = async () => {
  const storage = window.localStorage;
  const userId = storage.getItem('userId');
  if (userId) {
    try {
      return (await axios.get(`${API}/users/detail/${userId}`)).data;
    } catch (ex) {
      storage.removeItem('userId');
      return fetchUser();
    }
  }

  const user = (await axios.get(`${API}/users/random`)).data;
  storage.setItem('userId', user.id);
  return user;
};

export const createNewVacation = async (userId, dates) => {
  const url = `${API}/users/${userId}/vacations`;

  const response = await axios.post(url, dates);
  return response;
};

export const deleteVacation = async (userId, vacationId) => {
  const url = `${API}/users/${userId}/vacations/${vacationId}`;
  console.log(url, vacationId);
  const response = await axios.delete(url);
  return response;
};
