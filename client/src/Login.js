import React from 'react'

const Login = () => {

  return (
    <div className="Register">
      <h1>Login</h1>
      <form action="/api/login" method="POST">
       <div>
        <label htmlFor="username">Username</label>
        <input type="text" name="username" id="username" />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" />
      </div>
       <button className='register-btn'>Login</button>
      </form>
    </div>
  );
}

export default Login;
