import Home from "./Home";
import axios from "axios";
import {useState} from "react";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import {Update} from "./Update";
import {Create} from "./Create";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home/>,
    },
    {
        path: "/update/:id",
        element: <Update/>,
    },
    {
        path: "/create",
        element: <Create/>
    }
]);

function App() {
    return (
        <div className="App">
            <RouterProvider router={router}/>
        </div>
    );
}

export default App;
