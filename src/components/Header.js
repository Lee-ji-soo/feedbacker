import React from 'react';
import { Link } from 'react-router-dom';
import '../css/header.scss';

const Header = () => {
    return (
        <ul className='navi_ul'>
            <li>
                <Link to='/about'>About</Link>
            </li>
            <li>
                <Link to='/main'>Main</Link>
            </li>
        </ul>
    )
};

export default Header;
