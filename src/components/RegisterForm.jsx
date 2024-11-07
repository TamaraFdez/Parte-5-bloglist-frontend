import React, { useState } from 'react';

const RegisterForm = ({ handleRegister, newUsername, setNewUsername, newPassword, setNewPassword, newName, setNewName }) => (
  <form onSubmit={handleRegister}>
    <h2>Registrarse</h2>
    <div>
      Username:
      <input
        type="text"
        value={newUsername}
        onChange={({ target }) => setNewUsername(target.value)}
      />
    </div>
    <div>
      Password:
      <input
        type="password"
        value={newPassword}
        onChange={({ target }) => setNewPassword(target.value)}
      />
    </div>
    <div>
      Name:
      <input
        type="text"
        value={newName}
        onChange={({ target }) => setNewName(target.value)}
      />
    </div>
    <button type="submit">Registrar</button>
  </form>
);

export default RegisterForm;
