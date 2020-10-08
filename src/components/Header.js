import React from 'react';
import { Link } from 'react-router-dom';
import '../css/header.scss';

const Header = () => {
    return (
        <header>
            <h1>LIKE</h1>
            <ul className='navi_ul'>
                <li>
                    <Link to='/diary'>Diary</Link>
                </li>
                <li>
                    <Link to='/about'>About</Link>
                </li>
            </ul>
        </header>
    )
};
export default Header;
