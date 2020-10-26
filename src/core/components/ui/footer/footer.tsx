import * as React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
const Footer = (props: any) => {
    return (
        <div className="custom-footer d-flex flex-row justify-content-center">
            <Link to="/" style={{
                color: 'var(--text-color)'
            }}>
                Forget password?
            </Link>
        </div>
    )
}
export default Footer;