import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

import Text from '../components/basic/Text';
import { navigator } from '../common/navigator';
import { measure } from '../common/common';
import Button from '../components/basic/Button';
import ButtonGrid from '../components/basic/ButtonGrid';
import Icon from '../components/basic/Icon';
import Pagination from '../components/study/Pagination';

import { getStudyList } from '../api/study/studyModule';


const Wrapper = styled.div`
    min-height: ${window.innerHeight-120}px;
    display: flex;
    flex-direction: column;
    align-items: center;
    &>:first-of-type {
        margin-top: 100px;
    }
    @media screen and (max-width: 600px) {
        &>:first-of-type {
            margin-top: 50px;
        }
    }
`;

const MakeRow = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const ButtonWrapper = styled.div`
    width: 100%;
    margin-top: 100px;
    display: flex;
    justify-content: center;
    @media screen and (max-width: 768px) {
        display: block;
        width: 80%;
        margin-left: 3%;
        margin-top: 50px;
    }
    @media screen and (max-width: 600px) {
        margin-left: 3%;
    }
`;

const ListWrapper = styled.div`
    float: left;
    width: 1200px;
    margin-top: 10px;
    @media screen and (max-width: 1200px) {
        width: 90%;
    }
    @media screen and (max-width: 600px) {
        width: 100%;
    }
`;

const ListAttrWrapper = styled.div`
    width: 100%;
    height: ${window.innerHeight/20}px;
    min-height: 40px;
    display: flex;
    flex-direction: row;
    align-items: center;
    border-bottom: solid 1px rgba(55,55,55,0.8);
    padding-bottom: 0px;
`;

const ListAttrs = styled.div<{type: number, forMobile?: boolean}>`
    font-size: 18px;
    font-weight: 700;
    letter-spacing: -0.4px;
    color: #373737;
    overflow: hidden;
    text-overflow: ellipsis;
    padding-left: 5px;
    ${p=>{
        if(p.type==0) return `width: ${100/12}%;`;
        if(p.type==1) return `width: ${100/12*2}%;`;
        if(p.type==2) return `width: ${100/12*7}%;`;
        if(p.type==3) return `width: ${100/12*2}%;`;
    }}
    display: ${p => p.forMobile? 'none': 'block'};
    @media screen and (max-width: 1200px) {
        font-size: 14px;
    }
    @media screen and (max-width: 600px) {
        font-size: 10px;
        ${p=>{
            if(p.type==0) return `width: ${100/12*2}%;margin-left: 10px;`;
            if(p.type==1) return `width: ${0}%;`;
            if(p.type==2) return `width: ${100/12*9}%;`;
            if(p.type==3) return `width: ${0}%;`;
        }}
        display: ${p => p.forMobile? 'block': 'none'};
    }
`;

const ListContentWrapper = styled.div`

`;

const ListContent = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    height: 50px;
    min-height: 40px;
    cursor: pointer;
    border-bottom: solid 0.5px #eeeeee;
    &:hover{
        background-color: #dddddd;
    }
    @media screen and (max-width: 600px) {
        display: block;
        height: 40px;
    }
`;

const ListContentItem = styled.div<{type: number, forMobile?: boolean}>`
    float: left;
    font-size: 15px;
    font-weight: 600;
    letter-spacing: -0.3px;
    color: rgba(55,55,55,0.8);
    overflow: hidden;
    text-overflow: ellipsis;
    padding-left: 5px;
    ${p=>{
        if(p.type==0) return `width: ${100/12}%;height: 100%;line-height: 50px;`;
        if(p.type==1) return `width: ${100/12*2}%;`;
        if(p.type==2) return `width: ${100/12*7}%;`;
        if(p.type==3) return `width: ${100/12*2}%;`;
    }}
    display: ${p => p.forMobile? 'none': 'block'};
    @media screen and (max-width: 600px) {
        font-size: 10px;
        ${p=>{
            if(p.type==0) return `width: ${100/12*2}%;line-height: 40px;margin-left: 10px;font-weight: 400;`;
            if(p.type==1) return `width: ${100/12*2}%;`;
            if(p.type==2) return `width: ${100/12*9}%;font-weight: 900;line-height: 25px;`;
            if(p.type==3) return `width: ${100/12*2}%;`;
        }}
        display: ${p => p.forMobile? 'block': 'none'};
    }
`;

const SearchWrapper = styled.div`
    width: 1200px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    padding-right: 50px;
    margin-top: 50px;
    @media screen and (max-width: 1200px) {
        width: 100%;
    }
    @media screen and (max-width: 600px) {
        justify-content: center;
        padding-right: 0px;
    }
`;

const SearchInput = styled.input`
    float: left;
    width: 200px;
    height: 30px;
    background-color: #fafafa;
    border: solid 1px #777777;
    border-radius: 10px;
    font-size: 15px;
    font-weight: 400;
    outline: none;
    padding-left: 10px;
    margin-left: 5px;
    ::placeholder{
        font-size: 15px;
        color: #aaaaaa;
    }
    @media screen and (max-width: 1200px) {
        width: 15%;
    }
    @media screen and (max-width: 992px) {
        width: 18%;
    }
    @media screen and (max-width: 768px) {
        width: 20%;
    }
    @media screen and (max-width: 600px) {
        width: 90%;
    }
`;

interface IProps {

}

const Study: React.FC<IProps> = () => {
    const history = useHistory();
    const [type, setType] = useState(0); // 0: all, 1: dev, 2: univ, 3: others
    const [studyList, setStudyList] = useState<any[]>([]);
    const [studyListLength, setStudyListLength] = useState(0);
    const [order, setOrder] = useState(0);  // 0: new, 1: !new, 2: recent update
    const [pagination, setPagination] = useState(10);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');

    useEffect(()=>{
        // get study list api
        const tmp = [
            {
                id: 3,
                title: 'asdfdasf',
                category: 1,
                create_at: '20.02.02',
            },
            {
                id: 2,
                title: 'asdfdasf',
                category: 2,
                create_at: '20.02.02',
            },
            {
                id: 1,
                title: 'asdfdasf',
                category: 3,
                create_at: '20.02.02',
            }
        ]

        getStudyList(search, page, type, order, pagination).then(res => {
            // console.log(res)
            if(res.status === 200){
                setStudyList(res.data.results);
                setStudyListLength(res.data.count);
            }
        })
        .catch(err => {
            console.log(err);
        })
    },[search, page, type, order, pagination])

    const categoryIdToText = (id: number) => {
        if(id == 1) {
            return 'DEV';
        } else if(id == 2){
            return 'Univ';
        } else if(id == 3){
            return 'Others';
        }
    }

    const typing = (e: any) => {
        setSearch(e.target.value);
    }

    const changePage = (page: number) => {
        setPage(page);
    }

    return (
        <Wrapper>
            <Text fontSize={window.innerWidth>600?'45px':'35px'} fontWeight={'800'} letterSpacing={'-0.50px'} color={'#464646'} >
                Study
            </Text>
            <ButtonWrapper>
                <ButtonGrid 
                    styleParams={{
                        width: {large: '170px', lm: '', mid: '', ms: '45%', small: '45%'},
                        height: {large: '60px', lm: '', mid: '', ms: '45px', small: '40px'},
                        borderRadius: '8px',
                        backgroundColor: type==0? '#373737':null,
                        color: type==0?'#ffffff':'rgba(55,55,55, 1)',
                        border: 'solid 1px rgba(55,55,55, 0.8)',
                        fontWeight: '900',
                        fontSize: {large: '17px', lm: '', mid: '', ms: '', small: '13px'},
                        margin: {large: 'margin: 7px;'},
                    }}
                    text={'All'}
                    handler={()=>{
                        setPage(1);
                        setType(0);
                    }}/>
                <ButtonGrid 
                    styleParams={{
                        width: {large: '170px', lm: '', mid: '', ms: '45%', small: '45%'},
                        height: {large: '60px', lm: '', mid: '', ms: '45px', small: '40px'},
                        borderRadius: '8px',
                        backgroundColor: type==1? '#373737':null,
                        color: type==1?'#ffffff':'rgba(55,55,55, 1)',
                        border: 'solid 1px rgba(55,55,55, 0.8)',
                        fontWeight: '900',
                        fontSize: {large: '17px', lm: '', mid: '', ms: '', small: '13px'},
                        margin: {large: 'margin: 7px;'},
                        // margin: {large: 'margin-right: 10px;',small: 'margin-right: 3px;'}
                    }}
                    text={'Dev'}
                    handler={()=>{
                        setPage(1);
                        setType(1);
                    }}/>
                <ButtonGrid 
                    styleParams={{
                        width: {large: '170px', lm: '', mid: '', ms: '45%', small: '45%'},
                        height: {large: '60px', lm: '', mid: '', ms: '45px', small: '40px'},
                        borderRadius: '8px',
                        backgroundColor: type==2? '#373737':null,
                        color: type==2?'#ffffff':'rgba(55,55,55, 1)',
                        border: 'solid 1px rgba(55,55,55, 0.8)',
                        fontWeight: '900',
                        fontSize: {large: '17px', lm: '', mid: '', ms: '', small: '13px'},
                        margin: {large: 'margin: 7px;'},
                        // margin: {large: 'margin-right: 10px;',small: 'margin-right: 3px;'}
                    }}
                    text={'Univ'}
                    handler={()=>{
                        setPage(1);
                        setType(2);
                    }}/>
                <ButtonGrid 
                    styleParams={{
                        width: {large: '170px', lm: '', mid: '', ms: '45%', small: '45%'},
                        height: {large: '60px', lm: '', mid: '', ms: '45px', small: '40px'},
                        borderRadius: '8px',
                        backgroundColor: type==3? '#373737':null,
                        color: type==3?'#ffffff':'rgba(55,55,55, 1)',
                        border: 'solid 1px rgba(55,55,55, 0.8)',
                        fontWeight: '900',
                        fontSize: {large: '17px', lm: '', mid: '', ms: '', small: '13px'},
                        margin: {large: 'margin: 7px;'},
                        // margin: {large: 'margin-right: 10px;',small: 'margin-right: 3px;'}
                    }}
                    text={'Others'}
                    handler={()=>{
                        setPage(1);
                        setType(3);
                    }}/>
            </ButtonWrapper>
            <SearchWrapper>
                <Icon url={'ic_search'} width='15px' height='15px' />
                <SearchInput name='search' placeholder='search' value={search} onChange={(e)=>typing(e)} />
            </SearchWrapper>
            <ListWrapper>
                <ListAttrWrapper>
                    <ListAttrs type={0}>No.</ListAttrs>
                    <ListAttrs type={1}>Category</ListAttrs>
                    <ListAttrs type={2}>Title</ListAttrs>
                    <ListAttrs type={3}>Update</ListAttrs>
                    <ListAttrs forMobile={true} type={0}>No.</ListAttrs>
                    <ListAttrs forMobile={true} type={1}>Category</ListAttrs>
                    <ListAttrs forMobile={true} type={2}>Title</ListAttrs>
                    <ListAttrs forMobile={true} type={3}>Update</ListAttrs>
                </ListAttrWrapper>
                <ListContentWrapper>
                    {studyList.map((data, index) => {
                        return (
                            <ListContent onClick={()=>navigator(history, `/study/${data.id}`)}>
                                <ListContentItem type={0}>{index+1}</ListContentItem>
                                <ListContentItem type={1}>{categoryIdToText(data.category)}</ListContentItem>
                                <ListContentItem type={2}>{data.title}</ListContentItem>
                                <ListContentItem type={3}>{data.create_at.slice(2,10).replace(/-/g, '.')}</ListContentItem>
                                <ListContentItem forMobile={true} type={0}>{index+1}</ListContentItem>
                                <ListContentItem forMobile={true} type={2}>{data.title}</ListContentItem>
                                <ListContentItem forMobile={true} type={1}>{categoryIdToText(data.category)}</ListContentItem>
                                <ListContentItem forMobile={true} type={3}>{data.create_at.slice(2,10).replace(/-/g, '.')}</ListContentItem>
                            </ListContent>
                        )
                    })}
                </ListContentWrapper>
            </ListWrapper>
            <Pagination 
                wholeCount={studyListLength}
                count={5}
                callback={changePage}
                nowpage={page}/>
        </Wrapper>
    )
}

export default Study