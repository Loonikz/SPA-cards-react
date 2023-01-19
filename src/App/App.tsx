import React from 'react';
import { RouterProvider, createBrowserRouter} from "react-router-dom";
import loadable from "@loadable/component";

import { Provider } from 'react-redux';

import './App.css'

import {store} from '../store'

const Homepage = loadable(() => import('../components/Homepage/Homepage'))
const Description = loadable(() => import('../components/DescriptionCards/Description'))

const router = createBrowserRouter([
    {
        path:"/",
        element:<Homepage/>
    },
    {
        path:"/:id",
        element:<Description/>
    },
])

function App() {
  return (
      <Provider store={store}>
        <RouterProvider router={router}/>
      </Provider>
  );
}

export default App;
