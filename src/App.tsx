import React, { useState } from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import styled from 'styled-components';

import AuthContext from './contexts/AuthContext';
import Header from './components/basic/Header';
import Footer from './components/basic/Footer';
import Main from './pages/Main';
import Info from './pages/Info';
import Experience from './pages/Experience';
import ExperienceDetial from './pages/ExperienceDetail';
import Study from './pages/Study';
import StudyDetail from './pages/StudyDetail';

const App: React.FC = () => {
  const [user, setUser] = useState({});
  const [auth, setAuth] = useState(false);

  return (
    <BrowserRouter>
      <AuthContext.Provider value={{
        user, setUser, auth, setAuth
      }}>
        <Header/>
        <Switch>
          {/* <Route exact={true} path='/' component={Main} /> */}
          <Route exact={true}  path='/' component={Info} />
          <Route path='/experiences' component={Experience} />
          <Route path='/experience/:id' component={ExperienceDetial} />
          <Route path='/studies' component={Study} />
          <Route path='/study/:id' component={StudyDetail} />
          {/* Not Found */}
          <Route component={() => <Redirect to="/" />} />
        </Switch>
        <Footer/>
      </AuthContext.Provider>
    </BrowserRouter>
  );
}

export default App;
