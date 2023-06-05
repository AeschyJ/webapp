import {Routes, Route, Link, Navigate} from 'react-router-dom';

import './App.css';
import './index.css'
import HomePage from './HomePage';
import Layout from './Layout';
import QGBird from './QGBird';
import RegisterForm from './RegisterForm';
import Postform from './Postform';


function App() {

  return (
     <Routes>
      <Route path='WEBAPP/React/build' element={<Layout/>}>
        <Route path="homepage" element={<HomePage/>} />
        <Route path="quickguide" element={<QGBird/>} />
        <Route path='' element={<Navigate to='homepage'/>}/>
        <Route path="register" element={<RegisterForm />} />
        <Route path="postform" element={<Postform />} />
      </Route>
      <Route path='/' element={<Navigate to='/WEBAPP/React/build/homepage'/>}/>
      <Route path="/WEBAPP/React/build/postfrom" element={<Postform />} />
     </Routes>
  );
}

export default App;


