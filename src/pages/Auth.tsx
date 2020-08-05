import React, { useState, useCallback, useContext } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

import useInput from '../hooks/useInput';
import ButtonGrid from '../components/basic/ButtonGrid';
import AuthContext from '../contexts/AuthContext';
import { navigator } from '../common/navigator';

const Wrapper = styled.div`
    min-height: 1000px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 25px;
    font-weight: 700px;
    padding-left: 23%;
    width: 100%;
    @media screen and (max-width: 1200px) {
        padding-left: 0;
    }
    @media screen and (max-width: 600px) {
        padding-top: 50px;
        min-height: 900px;
    }
`;

const Inputbox = styled.input`
    width: 200px;
    height: 40px;
    border-radius: 8px;
    border: solid 1px #bdbdbd;
    font-size: 18px;
    color: #303030;
    outline: none;
    padding-left: 10px;
    ::placeholder {
        color: #bdbdbd;
    }
`;

interface IProps {

}

const Auth: React.FC<IProps> = () => {
    const [id, setId, resetId] = useInput('');
    const [password, setPassword, resetPassword] = useInput('');
    const { auth, setAuth } = useContext(AuthContext);
    const history = useHistory();

    const Submit = useCallback(() => {
        setAuth(true);
        navigator(history, '/postcompose');
    }, [])

    return (
        <Wrapper>
            <Inputbox onChange={setId} placeholder={'Id'} value={id} />
            <Inputbox onChange={setPassword} placeholder={'Password'} value={password} />
            <ButtonGrid 
                styleParams={{
                    width: {large: '45%',},
                    height: {large: '60px', lm: '55px', mid: '50px', ms: '50px', small: '40px'},
                    borderRadius: '8px',
                    backgroundColor: null,
                    color: 'rgba(55,55,55, 1)',
                    border: 'solid 1px rgba(55,55,55, 0.8)',
                    fontWeight: '900',
                    fontSize: {large: '17px', lm: '16px', mid: '15px', ms: '13px', small: '12px'},
                    float: 'left',
                    isMenu: true,
                }}
                text={'Sign in'}
                handler={Submit}/>
        </Wrapper>
    )
}

export default Auth;