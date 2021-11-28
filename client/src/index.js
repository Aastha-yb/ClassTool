import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import App from './App';
import {BrowserRouter,Routes,Route ,Link} from 'react-router-dom'
import Home from './components/Home';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  // <BrowserRouter>
  //         <Routes>
  //           <Route  path="/" element = {<App />} />
  //           <Route exact path='/login' element={<PublicRoute/>}>
  //             <Route exact path='/login' element={<Login/>}/>
  //           </Route>
  //           <Route exact path='/dashboard' element={<PrivateRoute/>}>
  //             <Route exact path='/dashboard' element={<Dashboard/>}/>
  //           </Route>
  //         </Routes>
  //   </BrowserRouter>,
    
    <App />,
    
  
  document.getElementById('root')
);
