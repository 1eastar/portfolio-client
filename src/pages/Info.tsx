import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useHistory, RouteComponentProps } from 'react-router-dom';
import Modal from 'react-modal';

import Text from '../components/basic/Text';
import Button from '../components/basic/Button';
import ButtonGrid from '../components/basic/ButtonGrid';
import { navigator } from '../common/navigator';
import { measure } from '../common/common';
import Echo from '../components/basic/Echo';
import ContactModal from '../components/info/ContactModal';
import Icon from '../components/basic/Icon';
import { openLink } from '../common/OpenLink';

import '../components/basic/modal.css';
import BG from '../asset/images/info_background.jpeg';

const Wrapper = styled.div`
    width: 100%;
    margin: 0 auto;
    position: relative;
    padding-left: 23%;
    min-height: 1000px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    &> * {
        /* margin-top: 5px;
        margin-bottom: 5px; */
    }
    @media screen and (max-width: 1200px) {
        padding: 0;
    }
`;

const BackgroundImg = styled.div`
    background-image: url(${BG});
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    position: absolute;
    opacity: 0.3;
    top: 0;
    margin: 0 auto;
    width: 70%;
    height: 50%;
    @media screen and (max-width: 1200px) {
        width: 100%;
    }
    @media screen and (max-width: 600px) {
        width: 100%;
    }
`;

const TextBox = styled.pre`
    width: 800px;
    height: auto;
    line-height: 2;
    font-size: 18px;
    font-weight: 500;
    letter-spacing: -0.4px;
    font-family: NanumSquareRoundB;
    color: #000000;
    
    white-space: pre-line;
    overflow: auto;
    @media screen and (max-width: 1200px) {
        width: 90%;
    }
    @media screen and (max-width: 600px) {
        width: 90%;
    }
`;

const Highlight = styled.span`
    color: #ec5621;
    cursor: pointer;
`;

interface IProps {

}

const Info: React.FC<RouteComponentProps<IProps>> = ({ location }) => {
    const history = useHistory();
    const [openModal, setOpenModal] = useState(false);
    // const [isInfo, setIsInfo] = useState(false);

    const OpenModal = () => {
        setOpenModal(true);
    }

    const CloseModal = () => {
        setOpenModal(false);
    }

    // useEffect(()=>{
    //     if(location.pathname === "/"){
    //         setIsInfo(true);
    //     } else {
    //         setIsInfo(false);
    //     }
    // },[location])

    return (
        <Wrapper>
            <BackgroundImg />
            <TextBox>
                안녕하세요,<br/> 누가 시켜서가 아닌 정말 하고 싶어서, 재미있어서 개발을 하는 대학생입니다.<br/><br/>
                
                Django로 개발을 시작하여 무언가를 직접 만드는 것이 재미있어 꾸준히 개발 공부를 하고 있습니다.<br/>
                호기심도 많고 욕심도 많아 이것저것 만들어보고 직접 부딪히면서 다양한 경험을 해보고 싶습니다.<br/>
                아직 안 해본 것은 많지만 '멍청하면 용감하다!'의 자세로 하루하루 나아가고 있고,
                새로운 것을 공부하고 도전하는 것을 즐길줄 아는 사람이 되고자 합니다.<br/>
                # Django / React / React-Native <br/>
                <br/><br/>
                웹사이트: <Highlight onClick={()=>openLink('https://www.1eastar.com')}>www.1eastar.com</Highlight><br/>
                Github: <Highlight onClick={()=>openLink('https://github.com/1eastar')}>github.com/1eastar</Highlight><br/>
                Email: <Highlight style={{cursor: 'default'}} onClick={()=>{}}>ehdwls6703@gmail.com</Highlight><br/>
            </TextBox>
        </Wrapper>
    )
}

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)',
      width: 600,
      height: 700,
      padding: 0,
    }
  };


export default Info