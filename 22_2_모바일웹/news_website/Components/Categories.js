import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const categories = [
    {
        name: 'all',
        text: '전체 보기'
    },
    {
        name: 'business',
        text: '비지니스'
    },
    {
        name: 'entertainment',
        text: '엔터테인먼트'
    },
    {
        name: 'health',
        text: '건강'
    },
    {
        name: 'science',
        text: '과학'
    },
    {
        name: 'sports',
        text: '스포츠'
    },
    {
        name: 'technology',
        text: '기술'
    }
];

const Nav = styled.div` background-color: #292929;`

const CategoriesBlock = styled.div`
    background-color: #292929;
    color: lightgrey;
    display: flex;
    padding: 1rem;
    width: 500px;
    margin: 0 auto;
    align-items: center;
    @media screen and (max-width: 768px){
        width: 100%;
        overflow-x: auto;
    }    
`;

const Category = styled(NavLink)`
    font-size: 1.125rem;
    cursor: pointer;
    white-space: pre;
    text-decoration: none;
    color: inherit;
    padding-bottom: 0.25rem;
    border-bottom: 1px solid lightgrey;

    &:hover{
        color: #495057;
    }

    &.active{
        font-weight: 600;
        border-bottom: 2px solid #22b8cf;
        color: #22b8cf;
        &:hover{
            color: #3bc9db;
        }
    }

    &+&{
        margin-left: 1rem;
    }
`;
const Categories =()=>{
    return(
        <Nav>
            <CategoriesBlock>
                {categories.map((c)=>(
                    <Category
                        key={c.name}
                        className={({isActive}) => (isActive ? 'active' : undefined)}
                        to = {c.name === 'all' ? '/' : `/${c.name}`}
                    >
                        {c.text}
                    </Category>
                ))}
            </CategoriesBlock>
        </Nav>
    );
};

export default Categories;
