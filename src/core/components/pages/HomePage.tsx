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
import { useTranslation } from 'react-i18next'
import { CookieModal } from '../ui/Modals/CookieModal'

const HomePage = () => {

    const [cookieConsent, setCookieConsent] = useState(false);
    const [isThaiLanguage, setIsThaiLanguage] = useState(true);
    const [nameTh, setNameTh] = useState('');
    const [nameEn, setNameEn] = useState('');
    const [disable, setDisable] = useState(true);
    const userContext = useContext(UserContext);
    const { t } = useTranslation();


    useEffect(() => {
        fetchUserName()
        console.log('local storage: ' + localStorage.getItem('Cookie Allowance'))
        console.log('cookieConsent: ' + cookieConsent)
        if (localStorage.getItem('Cookie Allowance') == 'true') {
            setCookieConsent(true)
        }

        // to check if the user has fill out the form
        if (nameTh) {
            setDisable(false)
        }
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
                <div className='homepage-warning-head'> {t('warning')}: </div>
                <div className='homepage-warning-body' > {t('fill_account')} </div>
            </>
        )
    }

    return (
        <div className='container'>
            <div className='row justify-content-center mt-5'>
                <div className='col-12'>
                    <div style={{ fontSize: '24px', marginBottom: '30px', fontWeight: 400, lineHeight: '17px', textAlign: 'center' }}> {t('welcome')}, {isThaiLanguage ? nameTh : nameEn} </div>
                    {nameTh ? null : warningMessage()}
                    <Link to='/account' className='box-container btn link'>
                        <div>
                            <img src={account} className='homepage-icon darkgrey' style={{ padding: '12px 0 12px 11px' }} />
                            <div className='linkhead'> {t('account')} </div>
                            <div className='linkbody darkgrey' > {t('account_description')} </div>
                        </div>
                    </Link>

                    <Link to={disable ? '/home' : '/myreservation'} className='box-container btn link'>
                        <div>
                            <img src={reservation} className='homepage-icon darkgrey' style={{ padding: '12px 0 12px 17px' }} />
                            <div className='linkhead'> {t('my_reservation')} </div>
                            <div className='linkbody darkgrey'> {t('my_reservation_description')} </div>
                        </div>
                    </Link>
                    <Link to={disable ? '/home' : '/waitingroom'} className='box-container btn link'>
                        <div>
                            <img src={waitingroom} className='homepage-icon darkgrey' style={{ padding: '16px 0 16px 15px' }} />
                            <div className='linkhead'> {t('my_waiting_room')} </div>
                            <div className='linkbody darkgrey'> {t('my_waiting_room_description')} </div>
                        </div>
                    </Link>
                    <Link to={disable ? '/home' : '/reservenow'} className='box-container btn btn-pink-pink link'>
                        <div>
                            <img src={reservenow} className='homepage-icon' style={{ padding: '13px 4px 13px 19px' }} />
                            <div className='linkhead'> {t('reserve_now')} </div>
                            <div className='linkbody'> {t('reserve_now_description')} </div>
                        </div>
                    </Link>

                    <CookieModal show={!cookieConsent} handleClick={handleClick} />


                </div>
                <svg width="100%" height="48%" viewBox="0 0 400 60" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'fixed', bottom: 0, zIndex: 0 }}>
                    <path d="M162.327 133.898C368.868 113.557 233.541 434.578 -52.286 442C-157.614 442 -243 368.288 -243 277.36C-243 186.432 -157.614 0 -52.286 0C53.0425 0 -80.4564 157.808 162.327 133.898Z" fill="#FF92C6" fill-opacity="0.28" />
                    <path d="M634.114 160.976C840.654 140.635 705.327 461.656 419.5 469.078C314.172 469.078 170 324.506 170 233.578C170 142.65 314.172 27.0781 419.5 27.0781C524.829 27.0781 391.33 184.887 634.114 160.976Z" fill="#FF92C6" fill-opacity="0.28" />
                </svg>
            </div>
        </div >
    )
}

export default HomePage;