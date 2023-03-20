import React, { useEffect } from 'react'
import '../styles/Register.scss';
import { redirect } from "react-router-dom";

const Register = () => {

  useEffect(() => {
    fetch("/api/currentUser")
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        if(data.username){
          return redirect("/battleship");
        }
      });

  }, []);



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
