import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import { measure } from '../../common/common';
import { navigator } from '../../common/navigator';
import Button from '../../components/basic/Button';
import Echo from '../../components/basic/Echo';


const Wrapper = styled.div`
    width: ${measure.WIDTH}px;
    height: 75px;
    background-color: #303030;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    margin-right: 50px;
    &> * + * {
        margin-left: 30px;
    }
`;

interface IProps {
    
}

const Header: React.FC<IProps> = () => {
    const history = useHistory();

    return (
        <Wrapper>
            <Button 
                styleParams={{
                    width: '120px',
                    height: '70px',
                    borderRadius: '0px',
                    backgroundColor: '#303030',
                    color: '#fcfcfc',
                    border: '0px',
                    fontWeight: '900',
                    fontSize: '28px',
                }}
                text={'Info'}
                handler={()=>navigator(history, '/info')}/>
            <Button 
                styleParams={{
                    width: '170px',
                    height: '70px',
                    borderRadius: '0px',
                    backgroundColor: '#303030',
                    color: '#fcfcfc',
                    border: '0px',
                    fontWeight: '900',
                    fontSize: '28px',
                }}
                text={'Experience'}
                handler={()=>navigator(history, '/experiences')}/>
            <Button 
                styleParams={{
                    width: '120px',
                    height: '70px',
                    borderRadius: '0px',
                    backgroundColor: '#303030',
                    color: '#fcfcfc',
                    border: '0px',
                    fontWeight: '900',
                    fontSize: '28px',
                }}
                text={'study'}
                handler={()=>navigator(history, '/studies')}/>
            <Button 
                styleParams={{
                    width: '120px',
                    height: '70px',
                    borderRadius: '0px',
                    backgroundColor: '#303030',
                    color: '#fcfcfc',
                    border: '0px',
                    fontWeight: '900',
                    fontSize: '28px',
                }}
                text={'contact'}
                handler={()=>navigator(history, '/')}/>
            <Echo width={'50px'}/>
        </Wrapper>
    )
}

export default Header