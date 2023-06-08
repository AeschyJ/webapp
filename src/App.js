import {Routes, Route, Navigate} from 'react-router-dom';

import './App.css';
import './index.css'
import HomePage, {QuickGuide, ExperienceAll} from './HomePage';
import Layout from './Layout';
import QGBird from './QGBird';
import QGCat from './QGCat';
import QGDog from './QGDog';
import PostPage from './PostPage';
import RegisterForm from './RegisterForm';
import Postform from './Postform';


function App() {

  return (
     <Routes>
      <Route path='WEBAPP/React/build' element={<Layout/>}>
        <Route path="homepage" element={<HomePage/>} />
        <Route path="quickguide">
          <Route index element={<QuickGuide/>}/>
          <Route path="bird" element={<QGBird/>} />
          <Route path="cat" element={<QGCat/>} />
          <Route path="dog" element={<QGDog/>} />
        </Route>
        <Route path='posts'>
          <Route index element={<ExperienceAll/>}/>
          <Route path='full/:id' element={<QGBird/>}/>
        </Route>
        <Route path="postpage" element={<PostPage/>} />
        <Route path="register" element={<RegisterForm />} />
        <Route path="postform" element={<Postform />} />
        <Route path='' element={<Navigate to='homepage'/>}/>
      </Route>
      <Route path='/' element={<Navigate to='/WEBAPP/React/build/homepage'/>}/>
     </Routes>
  );
}

export default App;
