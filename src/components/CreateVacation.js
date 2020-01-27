import React from 'react';
import { createNewVacation } from '../utils/utils';

export default function CreateVacation({
  handleDateChange,
  handleVacationSubmit
}) {
  return (
    <form className='flex-column' onSubmit={handleVacationSubmit}>
      <label>
        Start Date{' '}
        <input name='startDate' type='date' onChange={handleDateChange} />
      </label>
      <label>
        End Date{' '}
        <input name='endDate' type='date' onChange={handleDateChange} />
      </label>
      <button type='submit'>Create</button>
    </form>
  );
}
