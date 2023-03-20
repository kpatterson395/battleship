import GameBoard from "./gameplay/GameBoard";
import Register from "./users/Register";
import HomeLayout from "./HomeLayout";
import Login from "./users/Login"
import React from 'react'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<HomeLayout />}>
      <Route path="/register" element={<Register />} />
      <Route path="/battleship" element={<GameBoard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<GameBoard />} />
      <Route path="/*" element={<GameBoard />} />
    </Route>
  )
)


function App() {

  return (
    <RouterProvider router={router} />
  );
}

export default App;
