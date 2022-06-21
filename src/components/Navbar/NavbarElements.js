
import styled from 'styled-components'
import {NavLink as Link} from 'react-router-dom'


export const Nav = styled.nav`
    background: #fff;
    height: 60px;
    display: flex;
    justify-content: space-between;
    padding: 0.5ren calc((100vw - 1000px) / 2);
    z-index: 10;
    margin-bottom: 25px;

`


export const NavLink = styled(Link)`
    color: #000;
    display: flex;
    align-items: center;
    text-decoration: none;
    padding: 0 1rem;
    height: 100%;
    cursor: pointer;
    

`

export const NavMenu = styled.div`
    display: flex;
    align-items: center;
    margin-right: -24px;

    @media screen and (max-width: 768px){
        display: none
    }

`