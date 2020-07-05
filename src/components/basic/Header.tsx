import React, { useState, useEffect } from 'react';
import { useHistory, RouteComponentProps, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import Modal from 'react-modal';

import { measure } from '../../common/common';
import { navigator } from '../../common/navigator';
import Button from '../../components/basic/Button';
import ButtonGrid from '../../components/basic/ButtonGrid';
import Echo from '../../components/basic/Echo';
import ContactModal from '../../components/info/ContactModal';
import Menu from '../basic/Menu';
import Icon from './Icon';
import IconGrid from './IconGrid';

import './modal.css';
import HeaderMainImg from '../../asset/images/main_image.jpeg';
import HeaderProfileImg from '../../asset/images/profile_image.jpeg';
import HeaderMenuIcon from '../../asset/images/ic_menu_black.png';
import Close from '../../asset/images/ic_close.png';


const Wrapper = styled.div<{isOpen: boolean}>`
    position: fixed;
    left: 0;
    /* z-index: 100; */
    /* float: left; */
    z-index: 10;
    min-width: 320px;
    width: 23%;
    height: 100%;
    min-height: 100%;
    /* height: ${window.innerHeight}px; */
    box-shadow: 0 0 30px 0 rgba(0, 0, 0, 0.02);
    &> * + * {
        /* margin-left: 30px; */
    }
    @media screen and (max-width: 1200px) {
        position: static;
        height: 450px;
        min-height: 20%;
        width: 100%;
        /* height: 25%; */
    }
    @media screen and (max-width: 992px) {
        /* height: 25%; */
    }
    @media screen and (max-width: 768px) {
        position: static;
        height: 450px;
        min-height: 20%;
        width: 100%;
    }
    @media screen and (max-width: 600px) {
        background-color: #ffffff;
        min-width: 270px;
        position: fixed;
        left: 0;
        width: 65%;
        height: 100%;
        display: ${p => p.isOpen? 'block': 'none'};
        /* height: 25%; */
        /* display: flex;
        justify-content: flex-end;
        align-items: center; */
    }
`;

const HeaderImgWrapper = styled.div`
    float: left;
    width: 100%;
    height: 25%;
    /* background: url('images/main_image.jpeg') no-repeat center center; */
    background-image: url(${HeaderMainImg});
    background-repeat: no-repeat;
    background-position: center;
    background-color: rgba(55, 55, 55, 0.1);
    background-size: cover;
    /* filter: brightness(70%); */
    opacity: 0.8;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    @media screen and (max-width: 1200px) {
        height: 80%;
    }
    @media screen and (max-width: 600px) {
        height: 25%;
    }
`;

const WrapperForInfo = styled.div`
    position: sticky;
    top:0;
    z-index: 100;
    width: 100%;
    height: 40px;
    background-color: rgba(55, 55, 55, 0.8);
    box-shadow: 0 0 50px 0 rgba(0, 0, 0, 0.26);
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-right: 20px;
    @media screen and (max-width: 600px) {
        height: 55px;
    }
`;

const MobileHeader = styled.div<{isMenuModalOpen: boolean}>`
    display: none;
    z-index: 100;
    @media screen and (max-width: 600px) {
        display: ${p => p.isMenuModalOpen? 'none': 'block'};
        position: fixed;
        top: 0;
        padding: 15px 0 0 15px;
        width: 100%;
        height: 55px;
        background-color: rgba(255,255,255,0.85);
    }
`;

const MenuIcon = styled.div`
    /* background: url('images/ic_menu_black.png') no-repeat center center; */
    background-image: url(${HeaderMenuIcon});
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    width: 35px;
    height: 35px;
    /* display: none; */
    @media screen and (max-width: 600px) {
        /* display: block; */
        /* position: sticky;
        top: 15px;
        left: 15px; */
        margin-right: 20px;
    }
`;

const NaviWrapper = styled.div`
    float: left;
    width: 100%;
    height: 75%;
    margin-top: 50px;
    padding-right: 30px;
    padding-left: 25%;
    &::after {
        content: '';
        opacity: none;
        display: block;
        position: absolute;
        width: 96px;
        height: 96px;
        border-radius: 50%;
        border: solid 4px #ffffff;
        /* background: url('images/profile_image.jpeg') no-repeat center center; */
        background-image: url(${HeaderProfileImg});
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
        top: calc(25% - 50px);
        left: calc(50% - 50px);
        /* left: 50%; */
    }
    @media screen and (max-height: 700px) {
        margin-top: 30px;
    }
    @media screen and (max-width: 1200px) {
        padding-left: 0;
        margin-top: 0px;
        height: 20%;
        display: flex;
        justify-content: center;
        &::after {
            top: 310px;
            /* left: 50%; */
        }
    }
    @media screen and (max-width: 600px) {
        display: block;
        margin-top: 50px;
        padding-right: 30px;
        padding-left: 25%;
        &::after {
            top: calc(25% - 50px);
            /* left: 50%; */
        }
    }
`;

const MainText = styled.div`
    float: left;
    font-size: 23px;
    font-weight: 600;
    font-family: NanumSquareRoundB;
    color: white;
    @media screen and (max-width: 1200px) {
        font-size: 28px;
    }
    @media screen and (max-width: 600px) {
        font-size: 20px;
    }
`;

const CategoryText = styled.div<{isFocus: boolean, isTag?: boolean, position?: string}>`
    float: left;
    font-size: 20px;
    font-weight: 500;
    color: white;
    letter-spacing: -0.3px;
    width: 100%;
    color: ${p=>p.isFocus?'#303030':'#cccccc'};
    text-align: end;
    margin-top: 10px;
    margin-bottom: 10px;
    border-bottom: solid 1px #dbdbdb;
    cursor: pointer;
    @media screen and (max-width: 1200px) {
        ${p=>p.isTag?'display: none':null};
        width: 20%;
        border-bottom: none;
        text-align: ${p => p.position==='right'? 'right':p.position==='left'?'left':'center'};
        margin: 35px 15px 0 15px;
    }
    @media screen and (max-width: 600px) {
        display: block;
        width: 100%;
        border-bottom: solid 1px #dbdbdb;
        text-align: end;
        margin: 10px 0 10px;
    }
`;

const IconWrapper = styled.div`
    float: left;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center!important;
    position: absolute;
    left: 0;
    bottom: 50px;
    &> * + * {
        margin-left: 30px;
    }
    @media screen and (max-height: 600px) {
        display: none;
    }
    @media screen and (max-width: 1200px) {
        top: 0;
        align-items: center;
        width: 150px;
        height: 70px;
    }
    @media screen and (max-width: 600px) {
        bottom: 50px;
        top: auto;
        width: 100%;
    }
`;

const Overlay = styled.div<{isOpen: boolean}>`
    display: none;
    @media screen and (max-width: 600px) {
        display: ${p => p.isOpen? 'block':'none'};
        position: fixed;
        z-index: 10;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        background-color: rgba(0, 0, 0, 0.25);
    }
`;

const CloseIcon = styled.div`
    display: none;
    @media screen and (max-width: 600px) {
        display: block;
        width: 30px;
        height: 30px;
        background-image: url(${Close});
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
        cursor: pointer;
        position: absolute;
        top: 15px;
        right: 15px;
        z-index: 11;
    }
`;

const Orange = styled.span`
    color: #ec5621;
`;

interface IProps {
    pathname: string,
}

const Header: React.FC<RouteComponentProps<IProps>> = ({ location }) => {
    const history = useHistory();
    // const [isInfo, setIsInfo] = useState(false);
    const [contactModal, setContactModal] = useState(false);
    const [menuModal, setMenuModal] = useState(false);
    const [focus, setFocus] = useState(1);

    useEffect(()=>{
        // console.log(location)
        if(location.pathname === "/"){
            setFocus(0)
        } else if(location.pathname === "/portfolio"){
            setFocus(1)
        } else if(location.pathname === "/posts"){
            setFocus(2)
        } else if(location.pathname === "/tags"){
            setFocus(4)
        }
    },[location])

    const OpenContactModal = () => {
        console.log('contact open');
        setContactModal(true);
    }

    const CloseContactModal = () => {
        setContactModal(false);
    }

    const OpenMenuModal = () => {
        setMenuModal(true);
    }

    const CloseMenuModal = () => {
        setMenuModal(false);
    }


    const openLink = (url: string) => {
        const win = window.open(url, '_blank');
        if(win != null){
            win.focus();
        }
    }

    return (
        <>
            {/* <Modal
                isOpen={menuModal}
                // closeTimeoutMS={2000}
                // onAfterOpen={afterOpenModal}
                onRequestClose={CloseMenuModal}
                style={Styles}
                contentLabel="Example Modal"
                ariaHideApp={false}
                // className="menu"
                >
                    <Menu contactHandler={OpenContactModal} closeHandler={CloseMenuModal}/>
            </Modal> */}
            <Overlay isOpen={menuModal} onClick={CloseMenuModal}/>
            <Wrapper isOpen={menuModal}>
                <Modal
                    isOpen={contactModal}
                    // onAfterOpen={afterOpenModal}
                    onRequestClose={CloseContactModal}
                    style={customStyles}
                    shouldFocusAfterRender={false}
                    shouldCloseOnOverlayClick={false}
                    contentLabel="Example Modal"
                    className="modal"
                    ariaHideApp={false}
                    >
                        <ContactModal closeHandler={CloseContactModal}/>
                </Modal>
                <CloseIcon onClick={CloseMenuModal} />
                <HeaderImgWrapper>
                    <MainText>
                        Web/APP <Orange>Developer</Orange>
                    </MainText>
                </HeaderImgWrapper>

                <NaviWrapper>
                    <CategoryText isFocus={focus===1} onClick={() => {
                        navigator(history, '/portfolio');
                        setFocus(1);
                        CloseContactModal();
                        CloseMenuModal();
                    }}>
                        Portfolio
                    </CategoryText>
                    <CategoryText position={'left'} isFocus={focus===2} onClick={() => {
                        navigator(history, '/posts');
                        setFocus(2);
                        CloseContactModal();
                        CloseMenuModal();
                    }}>
                        Post
                    </CategoryText>
                    <CategoryText isTag={true} isFocus={focus===-1} onClick={() => {
                        window.alert('준비 중입니다!');
                        // navigator(history, '/');
                        // setFocus(0);
                        // CloseContactModal();
                    }}>
                        Tags
                    </CategoryText>
                    <CategoryText position={'right'} isFocus={focus===0} onClick={() => {
                        navigator(history, '/');
                        setFocus(0);
                        CloseContactModal();
                        CloseMenuModal();
                    }}>
                        About
                    </CategoryText>
                    <CategoryText isFocus={focus===4} onClick={() => {
                        // navigator(history, '/');
                        // setFocus(4);
                        OpenContactModal();
                        CloseMenuModal();
                    }}>
                        Contact
                    </CategoryText>
                    <IconWrapper>
                        <IconGrid url={'ic_github_grey'} width={{l:'40px', lm: '40px', m: '40px', ms: '35px', s: '30px'}} height={{l:'40px', lm: '40px', m: '40px', ms: '35px', s: '30px'}} handler={()=>openLink('https://github.com/1eastar')} ishandler={true} float='left' />
                        <IconGrid url={'ic_facebook_grey'} width={{l:'40px', lm: '40px', m: '40px', ms: '35px', s: '30px'}} height={{l:'40px', lm: '40px', m: '40px', ms: '35px', s: '30px'}} handler={()=>openLink('https://www.facebook.com/profile.php?id=100006896258332')} ishandler={true} />
                    </IconWrapper>
                </NaviWrapper>
            </Wrapper>

            <MobileHeader isMenuModalOpen={menuModal}>
                <MenuIcon onClick={()=>{
                    CloseContactModal();
                    OpenMenuModal();}}/> 
            </MobileHeader>
        </>
    )
}

const customStyles = {
    // content : {
    //   top                   : '50%',
    //   left                  : '50%',
    //   right                 : 'auto',
    //   bottom                : 'auto',
    //   marginRight           : '-50%',
    //   transform             : 'translate(-50%, -50%)',
    // //   width: (window.innerWidth>900)?600:600,
    // //   height: (window.innerWidth>900)?700:700,
    //   padding: 0,
    // },
    content: {
        border: 0,
    }
  };

const Styles = {
    content: {
        width: '60%',
        height: '100%',
        top: 0,
        left: 0,
        right: 'auto',
        bottom: 'auto',
    }
}

export default withRouter(Header)