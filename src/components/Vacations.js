import React from 'react';
import moment from 'moment';

export default function Vacations({ vacations, handleDeleteClick }) {
  return (
    <u>
      {vacations && vacations.length > 0 ? (
        vacations.map((vacation, i) => {
          console.log(vacation.id);
          return (
            <li key={i}>
              {moment(vacation.startDate).format(
                'dddd, MMMM Do YYYY, h:mm:ss a'
              )}{' '}
              to{' '}
              {moment(vacation.endDate).format('dddd, MMMM Do YYYY, h:mm:ss a')}
              <button onClick={() => handleDeleteClick(vacation.id)}>X</button>
            </li>
          );
        })
      ) : (
        <p>No vacations listed, enter a vacation</p>
      )}
    </u>
  );
}
