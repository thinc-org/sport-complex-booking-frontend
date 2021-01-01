import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { useLocation } from 'react-router';
import { Button, Modal } from 'react-bootstrap';
import { timeConversion } from '../Reservation/timeConversion'
import { client } from '../../../../axiosConfig';
import { UserContext } from '../../../contexts/UsersContext';
import QRCode from 'qrcode.react';
import { NavHeader } from '../../ui/navbar/navbarSideEffect';
import { useTranslation } from 'react-i18next';
import { ReservationCancellationModal } from '../../ui/Modals/ReservationCancelModal';
import { getCookie } from '../../../../core/contexts/cookieHandler';

const ReservationDetail = () => {

    const userContext = useContext(UserContext);
    const location = useLocation();
    const history = useHistory();
    const { t } = useTranslation();

    const [id, setId] = useState((location.state as any).id)

    const [sportTh, setSportTh] = useState('')
    const [sportEn, setSportEn] = useState('')
    const [courtNum, setCourtNum] = useState('')
    const [date, setDate] = useState<Date>()
    const [timeList, setTimeList] = useState<number[]>([1, 2, 3])
    const [memberNameList, setMemberNameList] = useState<String[]>([])
    const [memberIdList, setMemberIdList] = useState<any>([])
    const [isCheck, setIsCheck] = useState<Boolean>(false)
    const [counter, setCounter] = useState(10)
    const [isThaiLanguage, setIsThaiLanguage] = useState(true)

    useEffect(() => {
        fetchData()
        countDown()
        console.log('reservation detail')
        console.log(getCookie('token'))
    }, [])

    useEffect(() => {
        countDown()
        console.log(counter)
    }, [counter])

    const handleClick = () => {
        triggerModal()
    }

    const fetchData = async () => {
        await client
            .get(`'http://localhost:3000/myreservation/:${id}'`, {

            })
            .then(res => {
                const data = res.data.MyReservation
                setSportTh(data.sport_name_th)
                setSportEn(data.sport_name_en)
                setCourtNum(data.court_num)
                setDate(data.date.toLocaleDateString())
                setTimeList(data.time_slot)
                setMemberNameList(data.list_member)
                setIsCheck(data.is_check)
            })
            .catch(err => {
                console.log(err)
                history.push((location.state as any).path)
            })
    }

    let [modalOpen, setModalOpen] = useState(false);

    function triggerModal() {
        console.log('show modal')
        setModalOpen(!modalOpen)
        return (
            modalOpen
        )
    }

    const confirmCancellation = () => {
        client
            .delete(`"http://localhost:3000/myreservation/cancel/:${id}"`, {

            })
            .then(res => {
                history.push((location.state as any).path)
                //history.push('/myreservation')
            })
            .catch(err => {
                console.log(err)
                triggerModal()
            })
    }

    const countDown = () => {
        if (isCheck == false) {
            if (counter > 0) {
                var x = setTimeout(function () {
                    setCounter(counter - 1)
                }, 1000)
            } else if (counter == 0) {
                var y = setTimeout(function () {
                    history.push((location.state as any).path)
                }, 1000)
            }


        }
    }

    const qrCode = () => {
        if (isCheck == false) {
            return (
                <>
                    <div className='box-container btn w-100 mb-5' style={{ textAlign: 'center' }}>
                        <QRCode className='m-4'
                            value={{
                                'ReservationId': { id },
                            }}
                            renderAs="svg"
                            size='128'
                            fgColor="#333"
                            bgColor="#fff"
                        />
                        <div style={{ fontSize: '18px', fontWeight: 400, width: '60px', float: 'right', marginLeft: '-60px' }}> 00:{(counter == 10) ? counter : '0' + counter} </div>
                        <h5 className='mb-2' style={{ fontWeight: 400 }}> {t('show_qr_to_staff')} </h5>
                    </div>
                    <Button onClick={handleClick} variant='outline-danger cancel-btn'>
                        {t('cancel_reservation')}
                    </Button>
                </>
            )
        } else if (isCheck == true) {
            return (
                <div className='box-container btn w-100 mb-5' style={{ textAlign: 'center' }}>
                    <h4 className='m-2' style={{ color: 'lightgreen' }}> {t('you_have_checked_in')} </h4>
                </div>
            )

        }
    }


    return (
        <>
            <NavHeader header='My Reservation' />
            <div className='container'>
                <div className='row justify-content-center mt-5'>
                    <div className='col-12'>
                        <div className='box-container btn mb-4' style={{ width: '100%' }}>
                            <div>
                                <h4 className='mb-2'> {isThaiLanguage ? sportTh : sportEn} </h4>
                                <h6 className='mb-0'> {t('court')}: {courtNum} </h6>
                                <h6 className='mb-0'> {t('bookingDate')}: {date} </h6>
                                <h6 className='mb-0'> {t('bookingTime')}: {} {timeConversion(1)} </h6>
                            </div>
                            <hr />
                            <div>
                                <h6 className='mb-2'> {t('members')} </h6>
                                <h6 className='mb-0' style={{ fontWeight: 300 }}> 1. </h6>
                                <h6 className='mb-0' style={{ fontWeight: 300 }}> 2. </h6>
                                <h6 className='mb-0' style={{ fontWeight: 300 }}> 3. </h6>
                            </div>

                            {/* for linking with the backend */}
                            {/* <div>
                                <h4 className='mb-2'> Badminton </h4>
                                <h6 className='mb-0'> {t('court')}: </h6>
                                <h6 className='mb-0'> {t('bookingDate')}: </h6>
                                <h6 className='mb-0'> {t('bookingTime')}: {timeList.map(time => timeConversion(time))} </h6>
                            </div>
                            <hr />
                            <div>
                                <h6 className='mb-2'> {t('members')} </h6>
                                {memberList.map((eachMember, index) => {
                                    <h6 className='mb-0' style={{ fontWeight: 300 }}> {index}. {eachMember.member} </h6>
                                })}
                                <h6 className='mb-0' style={{ fontWeight: 300 }}> 1. </h6>
                                <h6 className='mb-0' style={{ fontWeight: 300 }}> 2. </h6>
                                <h6 className='mb-0' style={{ fontWeight: 300 }}> 3. </h6>
                            </div> */}
                        </div>
                        {qrCode()}
                    </div>
                    <ReservationCancellationModal modalOpen={modalOpen} handleClick={handleClick} confirmCancellation={confirmCancellation} />
                </div>
            </div>
        </>
    )
}

export default ReservationDetail;