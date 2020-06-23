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

import './modal.css';


const Wrapper = styled.div`
    position: sticky;
    top:0;
    z-index: 100;
    width: 100%;
    height: 75px;
    background-color: rgba(55, 55, 55, 0.8);
    margin-right: 50px;
    box-shadow: 0 0 50px 0 rgba(0, 0, 0, 0.26);
    &> * + * {
        /* margin-left: 30px; */
    }
    @media screen and (max-width: 1200px) {
        height: 75px;
    }
    @media screen and (max-width: 992px) {
        height: 70px;
    }
    @media screen and (max-width: 768px) {
        height: 65px;
    }
    @media screen and (max-width: 600px) {
        height: 55px;
        display: flex;
        justify-content: flex-end;
        align-items: center;
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

const MenuIcon = styled.div`
    background: url('images/ic_menu.png') no-repeat center center;
    background-size: contain;
    width: 25px;
    height: 25px;
    display: none;
    @media screen and (max-width: 600px) {
        display: block;
        margin-right: 20px;
        z-index: 100;
    }
`;


interface IProps {
    pathname: string,
}

const Header: React.FC<RouteComponentProps<IProps>> = ({ location }) => {
    const history = useHistory();
    const [isInfo, setIsInfo] = useState(false);
    const [contactModal, setContactModal] = useState(false);
    const [menuModal, setMenuModal] = useState(false);

    useEffect(()=>{
        // console.log(location)
        if(location.pathname === "/"){
            setIsInfo(true);
        } else {
            setIsInfo(false);
        }
    },[location])

    const OpenContactModal = () => {
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

    if(isInfo){
        return (
            <>
                <Modal
                    isOpen={menuModal}
                    // onAfterOpen={afterOpenModal}
                    onRequestClose={CloseMenuModal}
                    style={Styles}
                    contentLabel="Example Modal"
                    >
                        <Menu contactHandler={OpenContactModal} closeHandler={CloseMenuModal}/>
                </Modal>
                <WrapperForInfo>
                    <MenuIcon onClick={OpenMenuModal}/>
                </WrapperForInfo>
            </>
        )
    }

    return (
        <>
            <Modal
                isOpen={menuModal}
                // closeTimeoutMS={2000}
                // onAfterOpen={afterOpenModal}
                onRequestClose={CloseMenuModal}
                style={Styles}
                contentLabel="Example Modal"
                >
                    <Menu contactHandler={OpenContactModal} closeHandler={CloseMenuModal}/>
            </Modal>
            <Wrapper>
                <Modal
                    isOpen={contactModal}
                    // onAfterOpen={afterOpenModal}
                    onRequestClose={CloseContactModal}
                    contentLabel="Example Modal"
                    className="modal"
                    >
                        <ContactModal closeHandler={CloseContactModal}/>
                </Modal>
                <ButtonGrid 
                    styleParams={{
                        width: {large: '11%', lm: '14.5%', mid: '16%', ms: '18%', small: '0px'},
                        height: {large: '70px', lm: '70px', ms: '60px', small: '50px'},
                        borderRadius: '0px',
                        backgroundColor: null,
                        color: '#fcfcfc',
                        border: '0px',
                        fontWeight: '900',
                        fontSize: {large: '28px', lm: '24px', mid: '20px', ms: '17px', small: '0px'},
                        float: 'right',
                        isMenu: true,
                    }}
                    text={'contact'}
                    handler={OpenContactModal}/>
                <MenuIcon onClick={()=>{
                    CloseContactModal();
                    OpenMenuModal();}}/>
                <ButtonGrid 
                    styleParams={{
                        width: {large: '11%', lm: '14.5%', mid: '16%', ms: '18%', small: '0%'},
                        height: {large: '70px', lm: '70px', ms: '60px', small: '50px'},
                        borderRadius: '0px',
                        backgroundColor: null,
                        color: '#fcfcfc',
                        border: '0px',
                        fontWeight: '900',
                        fontSize: {large: '28px', lm: '24px', mid: '20px', ms: '17px', small: '0px'},
                        float: 'right',
                    }}
                    text={'study'}
                    handler={()=>navigator(history, '/studies')}/>
                <ButtonGrid 
                    styleParams={{
                        width: {large: '13%', lm: '16.5%', mid: '17.5%', ms: '19%', small: '0%'},
                        height: {large: '70px', lm: '70px', ms: '60px', small: '50px'},
                        borderRadius: '0px',
                        backgroundColor: null,
                        color: '#fcfcfc',
                        border: '0px',
                        fontWeight: '900',
                        fontSize: {large: '28px', lm: '24px', mid: '20px', ms: '17px', small: '0px'},
                        float: 'right',
                    }}
                    text={'Experience'}
                    handler={()=>navigator(history, '/experiences')}/>
                <ButtonGrid 
                    styleParams={{
                        width: {large: '11%', lm: '14.5%', mid: '16%', ms: '18%', small: '00%'},
                        height: {large: '70px', lm: '70px', ms: '60px', small: '50px'},
                        borderRadius: '0px',
                        backgroundColor: null,
                        color: '#fcfcfc',
                        border: '0px',
                        fontWeight: '900',
                        fontSize: {large: '28px', lm: '24px', mid: '20px', ms: '17px', small: '0px'},
                        float: 'right',
                    }}
                    text={'Home'}
                    handler={()=>navigator(history, '/')}/>
            </Wrapper>
        </>
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
    //   width: (window.innerWidth>900)?600:600,
    //   height: (window.innerWidth>900)?700:700,
      padding: 0,
    }
  };

const Styles = {
    content: {
        width: '60%',
        height: '100%',
        top: '53px',
        right: 0,
        left: 'auto',
        bottom: 'auto',
    }
}

export default withRouter(Header)