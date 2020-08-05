import React, { useState, useCallback, memo, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { measure } from '../../common/common';

import { navigator } from '../../common/navigator';
import AuthContext from '../../contexts/AuthContext';

const Wrapper = styled.div`
    /* position: relative;
    bottom: 0; */
    float: left;
    width: 100%;
    height: 25px;
    background-color: rgba(55,55,55,0.8);
    font-size: 14px;
    font-weight: 400;
    color: #ffffff;
    text-align: center;
    line-height: 25px;
    margin-top: 20px;
    @media screen and (max-width: 600px) {
        font-size: 9px;
    }
`;

const Highlight = styled.span`
    color: rgb(33,33,33);
    margin-left: 6px;
`;

const ForClick = memo(styled.span``);

interface IProps {

}

const Footer: React.FC<IProps> = () => {
    const history = useHistory();
    const { auth } = useContext(AuthContext);

    const writeStudy = useCallback(() => {
        if(auth) navigator(history, '/postcompose');
        else navigator(history, '/auth');
    }, [auth])

    return (
        <Wrapper>
            <ForClick onClick={writeStudy}>©</ForClick> Copyright <Highlight>Dongjin Kang</Highlight>, All rights reserved.
        </Wrapper>
    )
}

export default Footer