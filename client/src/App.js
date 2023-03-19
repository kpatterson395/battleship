import GameBoard from "./gameplay/GameBoard";
import Register from "./users/Register";
import HomeLayout from "./HomeLayout";
import Login from "./users/Login"

import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<HomeLayout />}>
      <Route path="/register" element={<Register />} />
      <Route path="/battleship" element={<GameBoard />} />
      <Route path="/login" element={<Login />} />
    </Route>
  )
)





function App() {

  // useEffect(() => {
  //   fetch("/api")
  //     .then((res) => res.json())
  //     .then((data) => setData(data.message));

  // }, []);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
