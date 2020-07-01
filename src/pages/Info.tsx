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

import '../components/basic/modal.css';

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
    background: url('images/ic_profile.jpeg') no-repeat center center;
    background-size: cover;
    position: absolute;
    opacity: 0.5;
    top: 0;
    margin: 0 auto;
    width: 70%;
    height: 30%;
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
    color: #454545;
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

    const openLink = (url: string) => {
        const win = window.open(url, '_blank');
        if(win != null){
            win.focus();
        }
    }

    return (
        <Wrapper>
            <BackgroundImg />
            <TextBox>
                안녕하세요,<br/> 코드 하나로 건물주가 되고 싶은 개발자입니다.<br/><br/>
                
                우연히 Django를 통해 개발을 접한 후 무언가를 만드는 것이 재미있어 지금까지 오게 되었습니다.<br/>
                '코딩하는 예비 건물주'에서 '코딩하는 건물주'가 되는 것이 꿈입니다!<br/>
                # Django / React / React-Native / AWS / git <br/>
                <br/><br/>
                웹사이트: <Highlight onClick={()=>navigator(history, '/')}>www.1eastar.com</Highlight><br/>
                Github: <Highlight onClick={()=>openLink('https://github.com/1eastar')}>github.com/1eastar</Highlight><br/>
                Email: <Highlight onClick={()=>{}}>ehdwls6703@gmail.com</Highlight><br/>
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