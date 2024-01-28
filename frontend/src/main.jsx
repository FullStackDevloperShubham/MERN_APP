import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import store from './store.js';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomeScreen from './screens/HomeScreen';
import LogInScreen from './screens/LogInScreen';
import RegisterScreen from './screens/RegisterScreen.jsx';
import { Provider } from 'react-redux'
import PrivateRoute from './components/PrivateRoute.jsx';
import profileScreen from './screens/profileScreen.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<HomeScreen />} />
      <Route path='/login' element={<LogInScreen />} />
      <Route path='/register' element={<RegisterScreen />} />
      {/* private route */}
      <Route path='/profile' element={<PrivateRoute />} >
        <Route path='/profile' element={<profileScreen />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>

    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);