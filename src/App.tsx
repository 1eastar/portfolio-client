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

const AppWrapper = styled.div`
  &,
  & * {
    box-sizing: border-box;
    /* overflow: hidden; */
    /* background-color: #202020; */
    /* justify-content: center; */
    /* float: left; */
    /* min-height: 100%; */
    /* height: 100%; */
  }
`;

const MakeRow = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

const App: React.FC = () => {
  const [user, setUser] = useState({});
  const [auth, setAuth] = useState(false);

  return (
    <AppWrapper>
      <BrowserRouter>
        <AuthContext.Provider value={{
          user, setUser, auth, setAuth
        }}>
          <Header/>
          <Switch>
            {/* <Route exact={true} path='/' component={Main} /> */}
            <Route exact={true} path='/' component={Info} />
            <Route path='/portfolio' component={Experience} />
            <Route path='/experience/:id' component={ExperienceDetial} />
            <Route path='/posts' component={Study} />
            <Route path='/post/:id' component={StudyDetail} />
            {/* Not Found */}
            <Route component={() => <Redirect to="/" />} />
          </Switch>
          <Footer/>
        </AuthContext.Provider>
      </BrowserRouter>
    </AppWrapper>
  );
}

export default App;
