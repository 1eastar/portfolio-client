import React, { useState } from 'react';
import styled from 'styled-components';

import Text from '../components/basic/Text';


const Wrapper = styled.div`

`;

interface IProps {

}

const Info: React.FC<IProps> = () => {

    return (
        <Wrapper>
            <Text fontWeight={'700'} fontSize={'25px'} letterSpacing={'-0.45px'}>
                hihiihiiihih
            </Text>
        </Wrapper>
    )
}

export default Info