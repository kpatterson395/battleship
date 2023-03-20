import GameBoard from "./gameplay/GameBoard";
import Register from "./users/Register";
import HomeLayout from "./HomeLayout";
import Login from "./users/Login"
import React from 'react'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider, useRouteError } from 'react-router-dom'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<HomeLayout />}>
      <Route path="/register" element={<Register />} errorElement={<ErrorBoundary />}/>
      <Route path="/battleship" element={<GameBoard />} errorElement={<ErrorBoundary />}/>
      <Route path="/login" element={<Login />} errorElement={<ErrorBoundary />}/>
      <Route path="/" element={<GameBoard />} errorElement={<ErrorBoundary />}/>
      <Route path="/*" element={<GameBoard />} errorElement={<ErrorBoundary />}/>
    </Route>
  )
)

function ErrorBoundary() {
  let error = useRouteError();
  console.error(error);
  return <div>Uh oh!</div>;
}

function App() {

  return (
    <RouterProvider router={router} />
  );
}

export default App;
