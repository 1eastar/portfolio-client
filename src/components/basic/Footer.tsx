import React, { useState } from 'react';
import styled from 'styled-components';
import { measure } from '../../common/common';

const Wrapper = styled.div`
    width: ${measure.WIDTH}px;
    height: 25px;
    background-color: #353535;
    font-size: 14px;
    font-weight: 400;
    color: #ffffff;
    text-align: center;
    line-height: 2;
    position: absolute;
    bottom: 0;
`;

const Purple = styled.span`
    color: #6946f3;
    margin-left: 6px;
`;

interface IProps {

}

const Footer: React.FC<IProps> = () => {

    return (
        <Wrapper>
            © Copyright <Purple>Dongjin Kang</Purple>, All rights reserved.
        </Wrapper>
    )
}

export default Footer