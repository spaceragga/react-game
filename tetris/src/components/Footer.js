import React from 'react';
import { FooterWrapp, FooterIn } from './styles/StyledFooter';

import img from "../img/rs_school_js.jpg";

const Footer = () => (
    <FooterWrapp id="footer">
        <FooterIn>
        <a style={{ color: "white", textDecoration: "none" }} target="_blank" rel="noreferrer" href="https://github.com/spaceragga">&copy; Ivan Mikhalchanka</a>
        <div>2021</div>
        <a target="_blank" rel="noreferrer" href="https://rs.school/js/">
            <img style={{ height: "1rem"}} src={img} alt="Logo" />
        </a>
        </FooterIn>
    </FooterWrapp>
)

export default Footer;