import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

import Icon from '../basic/Icon';
import Text from '../basic/Text';
import Button from '../basic/Button';
import ButtonGrid from '../basic/ButtonGrid';

import { postContact } from '../../api/common/contact';

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    background-color: #fafafa;
    display: flex;
    flex-direction: column;
    align-items: center;
    /* justify-content: center; */
    &> * {
        align-self: flex-end;
    }
    &> * + * {
        align-self: center;
        margin-top: 10px;
    }
`;

const FormWrapper = styled.div`
    width: 95%;
    background-color: #fafafa;
    display: flex;
    flex-direction: column;
    margin-left: 5%;
    margin-bottom: 20px;
    /* align-items: center; */
`;

const MakeRow = styled.div`
    width: 95%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
`;

const Input = styled.input`
    border: solid 1px #777777;
    border-radius: 10px;
    font-size: 15px;
    font-weight: 400;
    outline: none;
    padding-left: 10px;
    vertical-align: top;
    ::placeholder{
        font-size: 15px;
        color: #aaaaaa;
    }
    @media screen and (max-width: 600px) {
        ::placeholder{
            font-size: 12px;
            color: #aaaaaa;
        }
    }
`;

const TitleInput = styled(Input)`
    width: 90%;
    height: 45px;
    margin-top: 5px;
    @media screen and (max-width: 600px) {
        height: 35px;
    }
`;

const WriterInput = styled(Input)`
    width: 35%;
    height: 40px;
    @media screen and (max-width: 600px) {
        height: 30px;
    }
`;

const ContentInput = styled.textarea`
    float: left;
    border: solid 1px #777777;
    border-radius: 10px;
    font-size: 15px;
    font-weight: 400;
    outline: none;
    vertical-align: top;
    width: 90%;
    height: 300px;
    overflow-y: scroll;
    white-space: pre-wrap;
    margin-top: 5px;
    padding-top: 10px;
    padding-right: 10px;
    padding-left: 10px;
    line-height: 1.5;
    ::placeholder{
        font-size: 15px;
        color: #aaaaaa;
    }
    @media screen and (max-width: 1200px) {
        height: 300px;
        ::placeholder{
            font-size: 15px;
            color: #aaaaaa;
        }
    }
    @media screen and (max-width: 992px) {
        height: 280px;
        ::placeholder{
            font-size: 15px;
            color: #aaaaaa;
        }
    }
    @media screen and (max-width: 768px) {
        height: 250px;
        ::placeholder{
            font-size: 15px;
            color: #aaaaaa;
        }
    }
    @media screen and (max-width: 600px) {
        height: 200px;
        ::placeholder{
            font-size: 15px;
            color: #aaaaaa;
        }
    }
`;


interface IProps {
    closeHandler: () => void,
}

const ContactModal: React.FC<IProps> = ({
    closeHandler,
}) => {
    const history = useHistory();
    const [title, setTitle] = useState('');
    const [writer, setWriter] = useState('');
    const [content, setContent] = useState('');

    const typing = (e: any, type: number) => {
        // 0: title, 1: writer, 2: content
        if(type == 0){
            setTitle(e.target.value);
        } else if(type == 1){
            setWriter(e.target.value);
        } else {
            setContent(e.target.value);
        }
    }

    const sendContact = () => {
        if(title.trim().length == 0){
            window.alert('제목을 입력해주세요');
            return;
        }
        if(title.trim().length > 50) {
            window.alert('제목이 너무 깁니다');
            return;
        }
        if(writer.trim().length == 0){
            window.alert('작성자가 누구인지 알려주세요');
            return;
        }
        if(writer.trim().length > 20){
            window.alert('작성자 명이 너무 깁니다');
            return;
        }
        if(content.trim().length == 0){
            window.alert('내용을 입력해주세요');
            return;
        }
        const data = {
            title,
            writer,
            content,
        }
        postContact(data).then(res => {
            console.log(res)
            if(res.data.success){
                window.alert(res.data.msg);
            }
            else {
                window.alert('알 수 없는 에러가 발생했습니다. 다시 시도해주세요.')
            }
        })
        .catch(err => {
            console.log(err);
        })
    }

    return (
        <Wrapper>
            <Icon float="left" ishandler={true} handler={closeHandler} width='30px' height='30px' url='ic_close' />
            <Text fontWeight={'800'} fontSize={'35px'} letterSpacing={'-0.70px'} color={'#777777'}>Contact</Text>
            <FormWrapper>
                <Text fontWeight={'800'} fontSize={'17px'} letterSpacing={'-0.30px'} color={'#777777'}>title</Text>
                <TitleInput name='title' onChange={(e: any)=>typing(e, 0)} placeholder='제목' value={title}/>
                <MakeRow style={{marginTop: 10, marginBottom: 20}}>
                    <Text fontWeight={'700'} fontSize={'15px'} letterSpacing={'-0.30px'} color={'#777777'}>From.</Text>
                    <WriterInput name='writer' onChange={(e: any)=>typing(e, 1)} placeholder='작성자' value={writer}/>
                    <Text fontWeight={'700'} fontSize={'15px'} letterSpacing={'-0.30px'} color={'#777777'}>To.</Text>
                    <WriterInput name='me' onChange={()=>{}} placeholder='Dongjin Kang' disabled={true}/>
                </MakeRow>
                <Text fontWeight={'800'} fontSize={'17px'} letterSpacing={'-0.30px'} color={'#777777'}>Content</Text>
                <ContentInput name='content' onChange={(e: any)=>typing(e, 2)} placeholder='회신이 필요한 경우 연락처를 남겨주세요.' value={content} />
            </FormWrapper>
            <MakeRow>
                <ButtonGrid 
                    styleParams={{
                        width: {large: '45%',},
                        height: {large: '60px', lm: '55px', mid: '50px', ms: '50px', small: '40px'},
                        borderRadius: '8px',
                        backgroundColor: null,
                        color: 'rgba(55,55,55, 1)',
                        border: 'solid 1px rgba(55,55,55, 0.8)',
                        fontWeight: '900',
                        fontSize: {large: '17px', lm: '16px', mid: '15px', ms: '13px', small: '12px'},
                        float: 'left',
                        isMenu: true,
                    }}
                    text={'Cancel'}
                    handler={closeHandler}/>
                <ButtonGrid 
                    styleParams={{
                        width: {large: '45%',},
                        height: {large: '60px', lm: '55px', mid: '50px', ms: '50px', small: '40px'},
                        borderRadius: '8px',
                        backgroundColor: 'rgba(55,55,55, 0.8)',
                        color: '#fcfcfc',
                        border: '0px',
                        fontWeight: '900',
                        fontSize: {large: '17px', lm: '16px', mid: '15px', ms: '13px', small: '12px'},
                        float: 'left',
                        isMenu: true,
                    }}
                    text={'Send'}
                    handler={sendContact}/>
            </MakeRow>
        </Wrapper>
    )
}
export default ContactModal