import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

import Header from '../components/basic/Header';
import Text from '../components/basic/Text';
import { navigator } from '../common/navigator';
import { measure } from '../common/common';
import Button from '../components/basic/Button';
import ButtonGrid from '../components/basic/ButtonGrid';
import Icon from '../components/basic/Icon';
import Pagination from '../components/study/Pagination';
import ListBlock from '../components/study/ListBlock';

import { getStudyList, getAllStudyList } from '../api/study/studyModule';


const Wrapper = styled.div`
    position: relative;
    min-height: 1000px;
    /* padding: 0; */
    padding-left: 23%;
    width: 100%;
    @media screen and (max-width: 1200px) {
        padding: 0;
    }
`;

const SubWrapper = styled.div`
    /* float: left; */
    width: 800px;
    margin: 0 auto;
    min-height: 880px;
    /* height: 100%; */
    /* position: relative; */
    display: flex;
    flex-direction: column;
    align-items: center;
    &>:first-of-type {
        margin-top: 100px;
    }
    @media screen and (max-width: 1200px) {
        
    }
    @media screen and (max-width: 800px) {
        width: 90%;
    }
    @media screen and (max-width: 600px) {
        &>:first-of-type {
            margin-top: 50px;
        }
        padding-top: 50px;
    }
`;

const MakeRow = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
`;

const ButtonWrapper = styled.div`
    width: 100%;
    margin-top: 50px;
    display: flex;
    justify-content: flex-end !important;
    -webkit-justify-content: flex-end !important;
    @media screen and (max-width: 768px) {
        display: block;
        width: 80%;
        margin-left: 3%;
        margin-top: 30px;
    }
    @media screen and (max-width: 600px) {
        margin-left: 3%;
    }
`;

const ListWrapper = styled.div`
    float: left;
    width: 100%;
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
        height: 60px;
    }
`;

const ListContentItem = styled.div<{type: number, forMobile?: boolean}>`
    float: left;
    font-size: 16px;
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
        font-size: 13px;
        ${p=>{
            if(p.type==0) return `width: ${100/12*1.5}%;line-height: 60px;margin-left: 10px;font-weight: 400;`;
            if(p.type==1) return `width: ${100/12*2}%;`;
            if(p.type==2) return `width: ${100/12*9}%;font-weight: 900;line-height: 40px;font-size: 15px;`;
            if(p.type==3) return `width: ${100/12*2}%;`;
        }}
        display: ${p => p.forMobile? 'block': 'none'};
    }
`;

const SearchWrapper = styled.div`
    width: 100%;
    float: right;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    padding-right: 50px;
    /* margin-top: 50px; */
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
        width: 75%;
    }
    @media screen and (max-width: 992px) {
        width: 78%;
    }
    @media screen and (max-width: 768px) {
        width: 80%;
    }
    @media screen and (max-width: 600px) {
        width: 90%;
    }
`;

const TypeWrapper = styled.div`
    width: 100%;
    float: left;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin: 50px 0 50px 0;
    @media screen and (max-width: 1200px) {
        display: flex;
        align-items: center;
    padding: 0 0 0 30px;
        /* justify-content: center; */
    }
`;

const TypeClicker = styled.div<{focus: boolean}>`
    font-size: 20px;
    font-weight: 600;
    letter-spacing: -0.3px;
    cursor: pointer;
    color: ${p => p.focus? 'rgba(55,55,55,1)':'rgba(55,55,55,0.5)'};
    &:last-child {
        &::after {
            float: left;
            width: 2px;
            height: 2px;
            border-radius: 2px;
            margin: 9px 6px 0 6px;
            background-color: #9199a4;
            vertical-align: top;
            content: '';
        }
    }
    @media screen and (max-width: 600px) {
        font-size: 17px;
    }
`;

const MainText = styled.div`
    font-size: 45px;
    font-weight: 800;
    letter-spacing: -0.5px;
    color: #464646;
    display: block;
    float: left;
    @media screen and (max-width: 1200px) {
        display: none;
    }
`;

const ListBlockWrapper = styled.div`
    float: left;
    width: 100%;
    margin: 50px 0 50px;
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
    const [listType, setListType] = useState(0);

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
        if(listType === 0){
            getAllStudyList(search, type, order, pagination).then(res => {
                // console.log(res)
                if(res.status === 200){
                    setStudyList(res.data);
                }
            })
            .catch(err => {
                console.log(err);
            })
        } else {
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
        }
    },[listType, search, page, type, order, pagination])

    const _infiniteList = () => {
        if(listType === 0){
            getStudyList(search, page+1, type, order, pagination).then(res => {
                console.log(res)
                if(res.status === 200){
                    setStudyList([...studyList, ...res.data.results]);
                    setStudyListLength(res.data.count);
                    setPage(page+1);
                }
            })
            .catch(err => {
                console.log(err);
            })
        }
    }

    const _infiniteScroll = () => {
        console.log(listType)
        if(listType === 0){
            let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
            let scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
            let clientHeight = document.documentElement.clientHeight;
            console.log(scrollTop, clientHeight, scrollHeight)
            if(scrollTop + clientHeight === scrollHeight){
                _infiniteList();
            }
        }
    }

    // useEffect(()=>{
    //     window.addEventListener('scroll', _infiniteScroll);

    //     return () => {
    //         window.removeEventListener('scroll', _infiniteScroll);
    //     }
    // },[])

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

    const CategoryReset = () => {
        //
    }

    return (
        <Wrapper>
            {/* <Header /> */}
            <SubWrapper>
                {/* <MainText>
                    Posts
                </MainText> */}
                <MakeRow>
                    <TypeWrapper>
                        <TypeClicker focus={listType === 0} onClick={() => {
                                setListType(0);
                            }}>
                            리스트
                        </TypeClicker>
                        <TypeClicker focus={listType === 1} onClick={() => {
                                setListType(1);
                                setPage(1);
                            }}>
                            카테고리
                        </TypeClicker>
                    </TypeWrapper>
                    <SearchWrapper>
                        <Icon url={'ic_search'} width='15px' height='15px' />
                        <SearchInput name='search' placeholder='search' value={search} onChange={(e)=>typing(e)} />
                    </SearchWrapper>
                </MakeRow>
                {listType===0 && 
                    <ListBlockWrapper>
                        {studyList.map((data, index) => {
                                return (
                                    <ListBlock key={index} post={data} />
                                )
                        })}  
                    </ListBlockWrapper>}
                {listType===1 && 
                <>
                    <ButtonWrapper>
                        <ButtonGrid 
                            styleParams={{
                                width: {large: '170px', lm: '', mid: '', ms: '45%', small: '45%'},
                                height: {large: '60px', lm: '', mid: '', ms: '45px', small: '40px'},
                                borderRadius: '8px',
                                backgroundColor: null,
                                color: type==0?'#373737':'rgba(55,55,55, 0.5)',
                                border: '',
                                fontWeight: '900',
                                fontSize: {large: '17px', lm: '', mid: '', ms: '', small: '13px'},
                                margin: {large: 'margin: 7px;'},
                                additionalStyle: type==0?'border-bottom: solid 1px rgba(55,55,55, 0.8);border-top: solid 1px rgba(55,55,55, 0.8);':'',
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
                                backgroundColor: null,
                                color: type==1?'#373737':'rgba(55,55,55, 0.5)',
                                border: '',
                                fontWeight: '900',
                                fontSize: {large: '17px', lm: '', mid: '', ms: '', small: '13px'},
                                margin: {large: 'margin: 7px;'},
                                additionalStyle: type==1?'border-bottom: solid 1px rgba(55,55,55, 0.8);border-top: solid 1px rgba(55,55,55, 0.8);':'',
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
                                backgroundColor: null,
                                color: type==2?'#373737':'rgba(55,55,55, 0.5)',
                                border: '',
                                fontWeight: '900',
                                fontSize: {large: '17px', lm: '', mid: '', ms: '', small: '13px'},
                                margin: {large: 'margin: 7px;'},
                                additionalStyle: type==2?'border-bottom: solid 1px rgba(55,55,55, 0.8);border-top: solid 1px rgba(55,55,55, 0.8);':'',
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
                                backgroundColor: null,
                                color: type==3?'#373737':'rgba(55,55,55, 0.5)',
                                border: '',
                                fontWeight: '900',
                                fontSize: {large: '17px', lm: '', mid: '', ms: '', small: '13px'},
                                margin: {large: 'margin: 7px;'},
                                additionalStyle: type==3?'border-bottom: solid 1px rgba(55,55,55, 0.8);border-top: solid 1px rgba(55,55,55, 0.8);':'',
                            }}
                            text={'Others'}
                            handler={()=>{
                                setPage(1);
                                setType(3);
                            }}/>
                    </ButtonWrapper>
                    <ListWrapper>
                        <ListAttrWrapper>
                            <ListAttrs type={0}>No.</ListAttrs>
                            <ListAttrs type={1}>Category</ListAttrs>
                            <ListAttrs type={2}>Title</ListAttrs>
                            <ListAttrs type={3}>Update</ListAttrs>
                            {/* <ListAttrs forMobile={true} type={0}>No.</ListAttrs>
                            <ListAttrs forMobile={true} type={1}>Category</ListAttrs>
                            <ListAttrs forMobile={true} type={2}>Title</ListAttrs>
                            <ListAttrs forMobile={true} type={3}>Update</ListAttrs> */}
                        </ListAttrWrapper>
                        <ListContentWrapper>
                            {studyList.map((data, index) => {
                                return (
                                    <ListContent key={index} onClick={()=>navigator(history, `/post/${data.id}`)}>
                                        <ListContentItem type={0}>{data.id}</ListContentItem>
                                        <ListContentItem type={1}>{categoryIdToText(data.category)}</ListContentItem>
                                        <ListContentItem type={2}>{data.title}</ListContentItem>
                                        <ListContentItem type={3}>{data.create_at.slice(2,10).replace(/-/g, '.')}</ListContentItem>
                                        <ListContentItem forMobile={true} type={0}>{data.id}</ListContentItem>
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
                        count={pagination}
                        callback={changePage}
                        nowpage={page}/>
                </>}
            </SubWrapper>
        </Wrapper>
    )
}

export default Study