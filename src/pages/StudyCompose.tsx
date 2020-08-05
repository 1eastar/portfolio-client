import React, { useState } from 'react';
import styled from 'styled-components';


const Wrapper = styled.div`
    min-height: 1000px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 25px;
    font-weight: 700px;
    padding-left: 23%;
    width: 100%;
    float: left;
    @media screen and (max-width: 1200px) {
        padding-left: 0;
    }
    @media screen and (max-width: 600px) {
        padding-top: 50px;
        min-height: 900px;
    }
`;

interface IProps {

}

const StudyCompose: React.FC<IProps> = () => {

    return (
        <Wrapper>
            준비 중입니다!
        </Wrapper>
    )
}

export default StudyCompose;