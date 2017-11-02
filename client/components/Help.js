import React from 'react';

export const Help = () => {
  return (
    <div>
      <form id="help">
        <label>Full Name:</label>
        <input type="text" />
        <label>E-mail:</label>
        <input type="text" placeholder="E-mail here" />
        <label>Phone Number:</label>
        <input type="text" placeholder="Phone number here" />
        <label>Issue/Concern:</label>
        <textarea placeholder="Issue/Concern here"></textarea>
        <input type="submit" />
      </form>
    </div>
  )
}
