import React, { useState } from 'react';
import styled from 'styled-components';


const Wrapper = styled.div`
    min-height: ${window.innerHeight-100}px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 25px;
    font-weight: 700px;
`;

interface IProps {

}

const StudyDetail: React.FC<IProps> = () => {

    return (
        <Wrapper>
            준비 중입니다!
        </Wrapper>
    )
}

export default StudyDetail