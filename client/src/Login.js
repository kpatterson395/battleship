import React from 'react'

const Login = () => {

  return (
    <div className="Register">
      <h1>Register a new user</h1>
      <form action="/login" method="POST">
       <div>
        <label htmlFor="username">Username</label>
        <input type="text" name="user[username]" id="username" />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input type="text" name="user[password]" id="password" />
      </div>
       <button className='register-btn'>Login</button>
      </form>
    </div>
  );
}

export default Login;
