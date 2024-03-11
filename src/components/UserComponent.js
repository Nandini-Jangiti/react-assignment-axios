import React, { useState } from 'react';
import userData from './Users.json';


const UserComponent = () => {
  
  const [users, setUsers] = useState(userData);
  const [newUser, setNewUser] = useState({ name: '', email: '' });
  const [editingId, setEditingId] = useState(null);

  const addUser = (e) => {
    e.preventDefault();
    if (!newUser.name || !newUser.email) return;
    const updatedUsers = [...users, { id: users.length + 1, ...newUser }];
    setUsers(updatedUsers);
    setNewUser({ name: '', email: '' });
  };

  const deleteUser = (userId) => {
    const updatedUsers = users.filter(user => user.id !== userId);
    setUsers(updatedUsers);
  };

  const updateUser = (userId, updatedUserData) => {
    const updatedUsers = users.map(user =>
      user.id === userId ? { ...user, ...updatedUserData } : user
    );
    setUsers(updatedUsers);
  };

  return (
    <div>
      <h2>User List</h2>
      <div className="user-list-container">
        {users.map(user => (
          <div className="user-item" key={user.id}>
            <form className="user-form" onSubmit={e => e.preventDefault()}>
              <div>
                <label>Name:</label>
                {editingId === user.id ? (
                  <input
                    type="text"
                    value={user.name}
                    onChange={e => updateUser(user.id, { name: e.target.value, email: user.email })}
                  />
                ) : (
                  <span>{user.name}</span>
                )}
              </div>
              <div>
                <label>Email:</label>
                {editingId === user.id ? (
                  <input
                    type="text"
                    value={user.email}
                    onChange={e => updateUser(user.id, { name: user.name, email: e.target.value })}
                  />
                ) : (
                  <span>{user.email}</span>
                )}
              </div>
              <div className="action-buttons">
                {editingId !== user.id ? (
                  <>
                    <button type="button" onClick={() => setEditingId(user.id)}>Edit</button>
                    <button type="button" onClick={() => deleteUser(user.id)}>Delete</button>
                  </>
                ) : (
                  <>
                    <button type="button" onClick={() => setEditingId(null)}>Cancel</button>
                  </>
                )}
              </div>
            </form>
          </div>
        ))}
      </div>
      <h2>Add User</h2>
      <div className="add-user-form">
        <form onSubmit={addUser}>
          <input
            type="text"
            placeholder="Name"
            value={newUser.name}
            onChange={e => setNewUser({ ...newUser, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Email"
            value={newUser.email}
            onChange={e => setNewUser({ ...newUser, email: e.target.value })}
          />
          <button type="submit">Add User</button>
        </form>
      </div>
    </div>
  );
};

export default UserComponent;
