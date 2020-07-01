import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useHistory, RouteComponentProps } from 'react-router-dom';

import { navigator } from '../../common/navigator';


const Wrapper = styled.div`
    width: 100%;
    min-height: 100px;
    float: left;
    align-self: flex-start;
    /* height:  */
    border-top: solid 1px #ecf0f5;
    padding: 20px 0 20px;
    cursor: pointer;
    :hover {
        text-decoration: underline;
    }
    &:first-of-type {
        border-top: 0 none;
    }
`;

const Text = styled.div<{fontSize?: string, fontWeight?: string, letterSpacing?: string, color?: string}>`
    font-size: ${p=>p.fontSize};
    font-weight: ${p=>p.fontWeight};
    letter-spacing: ${p=>p.letterSpacing};
    color: ${p=>p.color};
    line-height: 1.5;
`;

const Title = styled(Text)`
    overflow: hidden;
    -webkit-box-orient: vertical;
    white-space: normal;
    -webkit-line-clamp: 2;
    font-weight: normal;
    font-size: 18px;
    line-height: 21px;
    word-break: break-word;
    max-height: 42px;
    float: left;
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 100%;
`;

const Content = styled(Text)`
    overflow: hidden;
    -webkit-box-orient: vertical;
    padding-top: 7px;
    font-size: 15px;
    line-height: 19px;
    color: #606060;
    word-break: break-word;
    max-height: 57px;
    float: left;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    word-wrap:break-word;
    width: 100%;
`;

const InfoWrapper = styled.div`
    float: left;
    width: 100%;
`;

const Date = styled(Text)`
    overflow: hidden;
    float: left;
    max-width: 40%;
    font-size: 13px;
    line-height: 21px;
    color: #9199a4;
    white-space: nowrap;
    &::before {
        float: left;
        width: 2px;
        height: 2px;
        border-radius: 2px;
        margin: 9px 6px 0 6px;
        background-color: #9199a4;
        vertical-align: top;
        content: '';
    }
`;

const Category = styled(Text)`
    overflow: hidden;
    float: left;
    max-width: 40%;
    font-size: 13px;
    line-height: 21px;
    color: #ec5621;
    white-space: nowrap;
`;

interface IProps {
    post: any
}

const ListBlock: React.FC<IProps> = ({
    post
}) => {
    const history = useHistory();

    const categoryIdToText = (id: number) => {
        if(id == 1) {
            return 'DEV';
        } else if(id == 2){
            return 'Univ';
        } else if(id == 3){
            return 'Others';
        }
    }
    
    return (
        <Wrapper onClick={() => navigator(history, `/post/${post.id}`)}>
            <Title>{post.title}</Title>
            <Content>{post.content}</Content>
            <InfoWrapper>
                <Category>{categoryIdToText(post.category)}</Category>
                <Date>{post.create_at.slice(2,10).replace(/-/g, '.')}</Date>
            </InfoWrapper>
        </Wrapper>
    )
}

export default ListBlock;