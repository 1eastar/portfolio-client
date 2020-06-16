import React, { useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import Modal from 'react-modal';

import Text from '../components/basic/Text';
import Button from '../components/basic/Button';
import { navigator } from '../common/navigator';
import { measure } from '../common/common';
import Echo from '../components/basic/Echo';

const Wrapper = styled.div`
    min-height: ${window.innerHeight-120}px;
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
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 20px;
    width: 400px;
    justify-content: space-evenly;
`;

interface IProps {

}

const Info: React.FC<IProps> = () => {
    const history = useHistory();
    const [openModal, setOpenModal] = useState(false);

    const OpenModal = () => {
        setOpenModal(true);
    }

    const CloseModal = () => {
        setOpenModal(false);
    }

    return (
        <Wrapper>
            <Modal
                isOpen={openModal}
                // onAfterOpen={afterOpenModal}
                onRequestClose={CloseModal}
                style={customStyles}
                contentLabel="Example Modal"
                >
                    in modal
                    contact : writer, title, content
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
                FRONTEND, WEB & DRF SERVER
            </Text>
            <MakeRow>
                <Button 
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
                    handler={OpenModal}/>
            </MakeRow>
            <MakeRow>
                깃헙, 이메일?
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
      width: 400,
      height: 400,
    }
  };


export default Info