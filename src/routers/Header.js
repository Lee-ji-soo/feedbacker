import React from 'react';
import { Link } from 'react-router-dom';
import '../css/header.scss';

const Header = () => {
    return (
        <header>
            <h1>FEED BACK,</h1>
            <ul className='navi_ul'>
                <li>
                    <Link to='/feed'>Feeds</Link>
                </li>
                <li>
                    <Link to='/about'>About</Link>
                </li>
                <li>
                    <Link to='/login'>Login</Link>
                </li>
            </ul>
        </header>
    )
};
export default Header;
