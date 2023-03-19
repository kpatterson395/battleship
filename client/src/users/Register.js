import React from 'react'
import '../styles/Register.scss';

const Register = () => {

  return (
    <div className="Register">
      <h1>Register a new user</h1>
      <form action="/api/register" method="POST">
      <div>
        <label htmlFor="email">Email</label>
        <input type="text" name="email" id="email"/>
      </div>
       <div>
        <label htmlFor="username">Username</label>
        <input type="text" name="username" id="username" />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input type="text" name="password" id="password" />
      </div>
       <button className='register-btn'>Register</button>
      </form>
    </div>
  );
}

export default Register;
