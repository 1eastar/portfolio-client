import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

import Icon from '../basic/Icon';
import { navigator } from '../../common/navigator';

const Wrapper = styled.div`
    float: left;
    width: 100%;
    height: 100%;
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    align-items: center;
    /* justify-content: center; */
    &> * {
        align-self: flex-start;
        margin-bottom: 30px;
    }
    &> * + * {
        margin-top: 15px;
        margin-bottom: 0px;
    }
`;

const Text = styled.div<{fontSize: string, fontWeight: string, letterSpacing: string, color: string}>`
    font-size: ${p => p.fontSize};
    font-weight: ${p => p.fontWeight};
    letter-spacing: ${p => p.letterSpacing};
    color: ${p => p.color};
    border-bottom: solid 1px rgba(55,55,55,0.8);
    padding-bottom: 15px;
    width: 100%;
    text-align: end;
    float: left;
    &~:last-of-type {
        border-bottom: 0px;
    }
`;


interface IProps {
    closeHandler: () => void,
    contactHandler: () => void,
}

const Menu: React.FC<IProps> = ({
    closeHandler, contactHandler
}) => {
    const history = useHistory();

    return (
        <Wrapper>
            <Icon float="left" ishandler={true} handler={closeHandler} width='30px' height='30px' url='ic_close' />
            <Text onClick={()=>{
                closeHandler();
                navigator(history, '/');
                }} fontSize={'22px'} fontWeight={'600'} letterSpacing={'-0.40px'} color={'#404040'}>Home</Text>
            <Text onClick={()=>{
                closeHandler();
                navigator(history, '/experiences');
                }} fontSize={'22px'} fontWeight={'600'} letterSpacing={'-0.40px'} color={'#404040'}>Experience</Text>
            <Text onClick={()=>{
                closeHandler();
                navigator(history, '/studies');
                }} fontSize={'22px'} fontWeight={'600'} letterSpacing={'-0.40px'} color={'#404040'}>Study</Text>
            <Text onClick={() => {
                closeHandler();
                contactHandler();
                }} fontSize={'22px'} fontWeight={'600'} letterSpacing={'-0.40px'} color={'#404040'}>Contact</Text>
        </Wrapper>
    )
}
export default Menu