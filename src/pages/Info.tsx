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
    min-height: ${window.innerHeight-85}px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    &> * {
        margin-top: 5px;
        margin-bottom: 5px;
    }
`;

const MakeRow = styled.div`
    margin-top: 20px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    @media screen and (max-width: 600px) {
        
    }
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
            <Modal
                isOpen={openModal}
                // onAfterOpen={afterOpenModal}
                onRequestClose={CloseModal}
                contentLabel="Example Modal"
                className="modal"
                >
                    <ContactModal closeHandler={CloseModal}/>
            </Modal>
            <Text fontWeight={'700'} fontSize={'20px'} letterSpacing={'-0.45px'}>
                Dongjin Kang
            </Text>
            <Echo width="70px" height="1px" backgrountColor="rgba(55,55,55,0.5)" />
            <Text fontWeight={'800'} fontSize={'45px'} letterSpacing={'-0.70px'}>
                Web Developer
            </Text>
            <Echo width="70px" height="1px" backgrountColor="rgba(55,55,55,0.5)" />
            <Text fontWeight={'700'} fontSize={'15px'} letterSpacing={'-0.45px'}>
                FRONTEND, WEB with DRF & React
            </Text>
            <MakeRow>
                {/* <Button 
                    styleParams={{
                        width: '182px',
                        height: '62px',
                        borderRadius: '0px',
                        backgroundColor: 'rgba(55,55,55, 0.8)',
                        color: '#fcfcfc',
                        border: '0px',
                        fontWeight: '900',
                        fontSize: '16px',
                    }}
                    text={'View Experiences'}
                    handler={()=>navigator(history, '/experiences')}/>
                <Button 
                    styleParams={{
                        width: '180px',
                        height: '60px',
                        borderRadius: '0px',
                        backgroundColor: null,
                        color: 'rgba(55,55,55, 1)',
                        border: 'solid 1px rgba(55,55,55, 0.8)',
                        fontWeight: '900',
                        fontSize: '17px',
                    }}
                    text={'Contact'}
                    handler={OpenModal}/> */}
                <ButtonGrid 
                    styleParams={{
                        width: {large: '182px', small: '132px'},
                        height: {large: '70px', small: '50px'},
                        borderRadius: '0px',
                        backgroundColor: 'rgba(55,55,55, 0.8)',
                        color: '#fcfcfc',
                        border: '0px',
                        fontWeight: '900',
                        fontSize: {large: '16px', small: '12px'},
                        margin: {large: 'margin-right: 10px;',small: 'margin-right: 3px;'}
                    }}
                    text={'View More'}
                    handler={()=>navigator(history, '/experiences')}/>
                <ButtonGrid 
                    styleParams={{
                        width: {large: '180px', small: '130px'},
                        height: {large: '70px', small: '50px'},
                        borderRadius: '0px',
                        backgroundColor: null,
                        color: 'rgba(55,55,55, 1)',
                        border: 'solid 1px rgba(55,55,55, 0.8)',
                        fontWeight: '900',
                        fontSize: {large: '17px', small: '13px'},
                    }}
                    text={'Contact'}
                    handler={OpenModal}/>
            </MakeRow>
            <MakeRow>
                <Icon handler={()=>openLink('https://github.com/1eastar')} url='ic_github' width='32px' height='32px' float='left' isCircle={true} ishandler={true} />
                <Icon handler={()=>openLink('https://www.facebook.com/profile.php?id=100006896258332')} url='ic_facebook' width='30px' height='30px' float='left' isCircle={true} ishandler={true} />
            </MakeRow>
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