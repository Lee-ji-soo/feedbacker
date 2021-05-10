import React from 'react';
import { Link } from 'react-router-dom';
import styled from "@emotion/styled"

const Header= () => {
    return (
        <div>
            <header>
                <h1>FEED BACK,</h1>
                <NaviUL>
                    <li>
                        <Link to='/feed'>Feeds</Link>
                    </li>
                    <li>
                        <Link to='/about'>About</Link>
                    </li>
                    <li>
                        <Link to='/login'>Login</Link>
                    </li>
                </NaviUL>
            </header>
        </div>
    )
};

export default Header;

const NaviUL = styled.ul`
    display:flex;
    justify-content: center;
    margin:1rem;
    height:3.8rem;
    li{
        font-size:1.3rem;
        padding:0;
        margin:1rem;
            &:hover{
                border-bottom:3px solid black;
            }
    }
`
