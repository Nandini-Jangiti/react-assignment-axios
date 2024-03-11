import React, { useState, useEffect } from 'react';
import axios from 'axios';
import usersData from '../components/Users.json';
import '../components/Users.css'

const client = axios.create({
   baseURL: 'https://jsonplaceholder.org/users' 
//  baseURL:'./Users.json'
});

const UserComponent = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [users, setUsers] = useState(usersData.users);
  const [editUserId, setEditUserId] = useState(null);

  useEffect(() => {
   
    const fetchData = async () => {
      try {
        const response = await client.get('/');
        setUsers(response.data);
      } catch (error) {
        console.error('', error);
      }
    };

    fetchData();
  }, []);

  const deleteUser = async (id) => {
    try {
      await client.delete(`/${id}`);
      const updatedUsers = users.filter(user => user.id !== id);
      setUsers(updatedUsers);
    } catch (error) {
      console.error('', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editUserId !== null) {
      await updateUser(editUserId, { username, email });
    } else {
      await addUser({ username, email });
    }
    setUsername('');
    setEmail('');
    setEditUserId(null);
  };

  const addUser = async (userData) => {
    try {
      const response = await client.post('/', userData);
      setUsers([...users, response.data]);
    } catch (error) {
      console.error('', error);
    }
  };

  const updateUser = async (id, userData) => {
    try {
      await client.put(`/${id}`, userData);
      const updatedUsers = users.map(user =>
        user.id === id ? { ...user, ...userData } : user
      );
      setUsers(updatedUsers);
    } catch (error) {
      console.error('', error);
    }
  };

  const editUser = (user) => {
    setUsername(user.username);
    setEmail(user.email);
    setEditUserId(user.id);
  };

  return (
    <div className="app">
      <nav>
        <h1>USERS APP</h1>
      </nav>
      <div className="add-user-container">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit">{editUserId !== null ? 'Update User' : 'Add User'}</button>
        </form>
      </div>
      <div className="users-container">
        <h2>All Users</h2>
        {users.map((user) => (
          <div className="user-card" key={user.id}>
            <h2 className="user-username">{user.username}</h2>
            <p className="user-email">{user.email}</p>
            <div className="button">
              <div className="edit-btn" onClick={() => editUser(user)}>
                Edit
              </div>
              <div className="delete-btn" onClick={() => deleteUser(user.id)}>
                Delete
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserComponent;
