import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import CreateVacation from './components/CreateVacation';
import Vacations from './components/Vacations';
import {
  API,
  fetchUser,
  createNewVacation,
  deleteVacation
} from './utils/utils';

function App() {
  const [user, setUser] = useState({});
  const [vacations, setVacations] = useState([]);
  const [dates, setDates] = useState({ startDate: '', endDate: '' });

  const getAndSetUser = async () => {
    const user = await fetchUser();
    console.log('the user = ', user);
    setUser(user);
    return user;
  };

  const getVacationsForUser = async userId => {
    const response = await axios.get(`${API}/users/${userId}/vacations`);
    const { data } = response;
    console.log(data);
    setVacations(data);
  };

  const handleDateChange = ({ target }) => {
    const inputName = target.name;
    const value = target.value;
    const newDates = { ...dates, [inputName]: value };
    setDates(newDates);
  };

  const handleVacationSubmit = e => {
    e.preventDefault();
    createNewVacation(user.id, dates).then(({ data }) =>
      setVacations([...vacations, data])
    );
  };

  const handleDeleteClick = async vacationId => {
    let response;
    try {
      response = await deleteVacation(user.id, vacationId);
      const updatedVacationList = vacations.filter(
        vaca => vaca.id !== vacationId
      );
      setVacations(updatedVacationList);
    } catch (err) {
      alert('vacation delete failed!', err);
    }
  };
  useEffect(() => {
    getAndSetUser().then(user => getVacationsForUser(user.id));
  }, []);

  return (
    <div className='container'>
      <h1>Acme Vacation Planner for {user.fullName}</h1>
      <CreateVacation
        handleDateChange={handleDateChange}
        handleVacationSubmit={handleVacationSubmit}
      />
      <Vacations vacations={vacations} handleDeleteClick={handleDeleteClick} />
    </div>
  );
}

export default App;
// curl https://acme-users-api-rev.herokuapp.com/api/users/044a7e6b-677e-4528-8eae-cb69b7d05186/vacations/5d302e5e-d361-4fd7-b52a-8144c3c69eac -X DELETE
