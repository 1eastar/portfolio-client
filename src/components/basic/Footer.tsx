import React, { useState } from 'react';
import styled from 'styled-components';
import { measure } from '../../common/common';

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

interface IProps {

}

const Footer: React.FC<IProps> = () => {

    return (
        <Wrapper>
            © Copyright <Highlight>Dongjin Kang</Highlight>, All rights reserved.
        </Wrapper>
    )
}

export default Footer