import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { client } from '../../../axiosConfig';
import { UserContext } from '../../contexts/UsersContext';
import account from '../../assets/images/icons/account.png';
import reservation from '../../assets/images/icons/reservation.png';
import waitingroom from '../../assets/images/icons/waitingroom.png';
import reservenow from '../../assets/images/icons/reservenow.png';

const HomePage = () => {

    const [cookieConsent, setCookieConsent] = useState(false);
    const [isThaiLanguage, setIsThaiLanguage] = useState();
    const [nameTh, setNameTh] = useState('');
    const [nameEn, setNameEn] = useState('');
    const [disable, setDisable] = useState(true);
    const userContext = useContext(UserContext);
    const jwt = userContext.jwt

    //const newContext = React.createContext()
    //const name = useContext()



    useEffect(() => {
        fetchUserName()
        if (localStorage.getItem('Cookie Allowance') == 'true') {
            setCookieConsent(true)
        }

        if (nameTh) {
            setDisable(false)
        }

        console.log(disable)
    }, [])

    useEffect(() => {
        console.log('cookie allowance: ' + cookieConsent)
        console.log('local storage: ' + localStorage.getItem('Cookie Allowance'))
    }, [cookieConsent])

    const fetchUserName = async () => {
        client
            .get('https://localhost:3000/account_info/', {

            })
            .then(res => {
                setNameTh(res.data.name_th);
                setNameEn(res.data.name_en);
                setIsThaiLanguage(res.data.is_thai_language);
                console.log(res.data)

            })
    }

    const handleClick = () => {
        allowCookie()
        localStorage.setItem('Cookie Allowance', 'true')
        return (
            cookieConsent
        )
    }

    const allowCookie = () => {
        setCookieConsent(true)
        return (
            cookieConsent
        )
    }

    const warningMessage = () => {
        return (
            <>
                <div style={{ fontWeight: 400, fontSize: '16px', lineHeight: '17px', color: 'red', margin: '0px 10px 5px 10px' }} > Warning: </div>
                <div style={{ fontWeight: 400, fontSize: '14px', lineHeight: '17px', color: 'red', margin: '0px 10px 20px 10px' }} > Please fill in your information in the account to activate the other features </div>
            </>
        )
    }

    const clickableLink = () => {
        return (
            <>
                <Link to='/myreservation' className='box-container btn' style={{ width: '100%', color: 'black', borderColor: 'transparent' }}>
                    <div>
                        <img src={reservation} style={{ float: 'right', padding: '12px 0 12px 17px', borderLeft: '1px solid rgba(204, 204, 204, 1)' }} />
                        <div style={{ fontWeight: 400, fontSize: '20px', lineHeight: '19px', marginBottom: '10px', marginTop: '5px' }}> My Reservations </div>
                        <div style={{ fontWeight: 200, fontSize: '14px', lineHeight: '17px', color: 'darkgrey' }}> View my successful reservations </div>
                    </div>
                </Link>
                <Link to='/waitingroom' className='box-container btn' style={{ width: '100%', color: 'black', borderColor: 'transparent' }}>
                    <div>
                        <img src={waitingroom} style={{ float: 'right', padding: '16px 0 16px 15px', borderLeft: '1px solid rgba(204, 204, 204, 1)' }} />
                        <div style={{ fontWeight: 400, fontSize: '20px', lineHeight: '19px', marginBottom: '10px', marginTop: '5px' }}> My Waiting Room </div>
                        <div style={{ fontWeight: 200, fontSize: '14px', lineHeight: '17px', color: 'darkgrey' }}> View my current waiting room </div>
                    </div>
                </Link>
                <Link to='/reservenow' className='box-container btn btn-pink-pink' style={{ width: '100%', borderColor: 'transparent', position: 'relative', zIndex: 1 }}>
                    <div>
                        <img src={reservenow} style={{ float: 'right', padding: '13px 0 13px 23px', borderLeft: '1px solid white' }} />
                        <div style={{ fontWeight: 400, fontSize: '20px', lineHeight: '19px', marginBottom: '10px', marginTop: '5px' }}> Reserve Now </div>
                        <div style={{ fontWeight: 200, fontSize: '14px' }}> Reserve a room </div>
                    </div>
                </Link>
            </>

        )
    }

    const unclickableLink = () => {
        return (
            <>
                <Link to='/home' className='box-container btn' style={{ width: '100%', color: 'black', borderColor: 'transparent' }}>
                    <div>
                        <img src={reservation} style={{ float: 'right', padding: '12px 0 12px 17px', borderLeft: '1px solid rgba(204, 204, 204, 1)' }} />
                        <div style={{ fontWeight: 400, fontSize: '20px', lineHeight: '19px', marginBottom: '10px', marginTop: '5px' }}> My Reservations </div>
                        <div style={{ fontWeight: 200, fontSize: '14px', lineHeight: '17px', color: 'darkgrey' }}> View my successful reservations </div>
                    </div>
                </Link>
                <Link to='/home' className='box-container btn' style={{ width: '100%', color: 'black', borderColor: 'transparent' }}>
                    <div>
                        <img src={waitingroom} style={{ float: 'right', padding: '16px 0 16px 15px', borderLeft: '1px solid rgba(204, 204, 204, 1)' }} />
                        <div style={{ fontWeight: 400, fontSize: '20px', lineHeight: '19px', marginBottom: '10px', marginTop: '5px' }}> My Waiting Room </div>
                        <div style={{ fontWeight: 200, fontSize: '14px', lineHeight: '17px', color: 'darkgrey' }}> View my current waiting room </div>
                    </div>
                </Link>
                <Link to='/home' className='box-container btn btn-pink-pink' style={{ width: '100%', borderColor: 'transparent', position: 'relative', zIndex: 1 }}>
                    <div>
                        <img src={reservenow} style={{ float: 'right', padding: '13px 0 13px 23px', borderLeft: '1px solid white' }} />
                        <div style={{ fontWeight: 400, fontSize: '20px', lineHeight: '19px', marginBottom: '10px', marginTop: '5px' }}> Reserve Now </div>
                        <div style={{ fontWeight: 200, fontSize: '14px' }}> Reserve a room </div>
                    </div>
                </Link>
            </>
        )

    }

    return (
        <div className='container'>
            <div className='row justify-content-center mt-5'>
                <div className='col-12'>
                    <div style={{ fontSize: '24px', marginBottom: '30px', fontWeight: 400, lineHeight: '17px', textAlign: 'center' }}> {isThaiLanguage ? 'ยินดีต้อนรับ' + nameTh : 'Welcome, ' + nameEn} </div>
                    {nameTh ? null : warningMessage()}
                    <Link to='/account' className='box-container btn' style={{ width: '100%', color: 'black', borderColor: 'transparent' }}>
                        <div>
                            <img src={account} style={{ float: 'right', padding: '12px 0 12px 11px', borderLeft: '1px solid rgba(204, 204, 204, 1)' }} />
                            <div style={{ fontWeight: 400, fontSize: '20px', lineHeight: '19px', marginBottom: '10px', marginTop: '5px' }}> Account </div>
                            <div style={{ fontWeight: 200, fontSize: '14px', lineHeight: '17px', color: 'darkgray' }}> View and make changes to your account </div>
                        </div>
                    </Link>

                    {disable ? unclickableLink() : clickableLink()}

                    <Modal show={!cookieConsent} className="modal" id="exampleModalCenter" tabIndex={-1} role="dialog" aria-labelledby="contained-modal-title-vcenter" centered aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered" role="document">
                            <div className="modal-content">
                                <div className="modal-header pb-0">
                                    <h5 className="modal-title"> This website uses cookie. </h5>
                                </div>
                                <div className="modal-body pt-1 pb-0" style={{ fontSize: '14px', fontWeight: 300, lineHeight: '17px' }}>
                                    This website uses cookie. Please click allow to ensure the beset experience.
                                </div>
                                <div className="modal-footer pt-3 pb-0 pr-0">
                                    <Button variant='pink' onClick={handleClick} className="btn pt-1 pb-1" data-dismiss="modal" style={{ fontSize: '14px', fontWeight: 400 }}> Allow </Button>
                                </div>
                            </div>
                        </div>
                    </Modal>

                </div>
                <svg width="414" height="243" viewBox="0 0 414 243" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'fixed', bottom: 0, zIndex: 0 }}>
                    <path d="M162.327 133.898C368.868 113.557 233.541 434.578 -52.286 442C-157.614 442 -243 368.288 -243 277.36C-243 186.432 -157.614 0 -52.286 0C53.0425 0 -80.4564 157.808 162.327 133.898Z" fill="#FF92C6" fill-opacity="0.28" />
                    <path d="M634.114 160.976C840.654 140.635 705.327 461.656 419.5 469.078C314.172 469.078 170 324.506 170 233.578C170 142.65 314.172 27.0781 419.5 27.0781C524.829 27.0781 391.33 184.887 634.114 160.976Z" fill="#FF92C6" fill-opacity="0.28" />
                </svg>
            </div>
        </div>
    )
}

export default HomePage;