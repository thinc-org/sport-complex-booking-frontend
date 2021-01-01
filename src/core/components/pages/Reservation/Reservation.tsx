import React from 'react';
import { Button } from 'react-bootstrap';
import { useRouteMatch, useHistory } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { client } from '../../../../axiosConfig';
import { getCookie } from '../../../contexts/cookieHandler';
import { timeConversion } from '../Reservation/timeConversion';
import { AxiosResponse } from 'axios';
import { NavHeader } from '../../ui/navbar/navbarSideEffect'
import { useTranslation } from 'react-i18next';
import { get } from 'http';

interface ReservationResponse {
    _id: number | string
    is_check: boolean,
    sport_name_th: string,
    sport_name_en: string,
    court_num: number,
    date: Date,
    time_slot: number[]
}

const ReservationPage = (props: any) => {

    const history = useHistory();

    const [lists, setLists] = useState<Array<ReservationResponse>>([]);
    const [isThaiLanguage, setIsThaiLanguage] = useState(true)

    var { url, path } = useRouteMatch();
    const { t } = useTranslation()


    useEffect(() => {
        setLanguage()
        fetchData()
        console.log('fetch data')
    }, [])

    const fetchData = async () => {
        await client
            .get('http://localhost:3000/myreservation', {

            })
            .then((res: AxiosResponse) => {
                const data = res.data;
                setLists(data.MyReservation);
                setIsThaiLanguage(data.is_thai_language)
            })
            .catch((err) => {

            })
    }

    const setLanguage = () => {
        if (getCookie('is_thai_langugae') == 'true') {
            setIsThaiLanguage(true)
        } else if (getCookie('is_thai_language') == 'false') {
            setIsThaiLanguage(false)
        }
    }

    const handleClick = (id: string | number) => {
        console.log('button clicked')
        return (

            history.push({
                pathname: `${path}/reservationdetail`,
                state: {
                    id: id,
                    path: path
                }
            })
        )
    }

    // display only when there is any reservation
    if (true) {
        return (
            <>
                <NavHeader header='My Reservation' />
                <div className='container'>
                    <div className='row justify-content-center mt-5'>
                        <div className='col-12'>
                            <Button variant='pink' onClick={() => handleClick('list._id')} className='box-container btn' style={{ width: '100%', color: 'black', borderColor: 'transparent' }}>
                                <div>
                                    <h5 style={{ color: 'lightgreen', float: 'right' }}> {true ? t('checked_in') : ''} </h5>
                                    <h5 className='mb-2'> Badminton </h5>
                                    <h6 className='mb-0'> {t('court')}: </h6>
                                    <h6 className='mb-0'> {t('bookingDate')}: </h6>
                                    <h6 className='mb-0'> {t('bookingTime')}: </h6>
                                </div>
                            </Button>

                            {lists.map(list => {
                                return (
                                    <Button variant='pink' onClick={() => handleClick(list._id)} className='box-container btn' style={{ width: '100%', color: 'black', borderColor: 'transparent' }}>
                                        <div>
                                            <h5 style={{ color: 'lightgreen', float: 'right' }}> {list.is_check ? t('checked_in') : ''} </h5>
                                            <h5 className='mb-2'> {isThaiLanguage ? list.sport_name_th : list.sport_name_en} </h5>
                                            <h6 className='mb-0'> {t('court')}: {list.court_num} </h6>
                                            <h6 className='mb-0'> {t('bookingDate')}: {list.date} </h6>
                                            <h6 className='mb-0'> {t('bookingTime')}: {list.time_slot.map(eachTimeSlot => timeConversion(eachTimeSlot))} </h6>
                                        </div>
                                    </Button>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </>
        )
    } else {
        return (
            <>
                <NavHeader header='My Reservation' />
                <div className='container'>
                    <div className='row justify-content-center mt-5 grey' style={{ fontWeight: 400 }}>
                        You have no any reservations.
                </div>
                </div>
            </>
        )
    }

}

export default ReservationPage;