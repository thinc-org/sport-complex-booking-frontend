import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { client } from '../../../../axiosConfig';
import { UserContext } from '../../../contexts/UsersContext';
import { NavHeader } from '../../ui/navbar/navbarSideEffect'
import { timeConversion } from '../Reservation/timeConversion';
import { ConfirmModal } from '../../ui/Modals/CurrentWaitingRoomModal';
import { TimeOutModal } from '../../ui/Modals/CurrentWaitingRoomModal';
import { useTranslation } from 'react-i18next'
import withUserGuard from '../../../guards/user.guard';

const WaitingRoomPage = () => {

    const [remainingTime, setRemainingTime] = useState<any>()
    const [objectID, setObjectID] = useState<any>()
    const [sport, setSport] = useState('Badminton')
    const [courtNum, setCourtNum] = useState(Number)
    const [date, setDate] = useState(new Date().toLocaleDateString())
    const [timeList, setTimeList] = useState<any>([])
    const [listMember, setListMember] = useState([])
    const [accessCode, setAccessCode] = useState('')
    const [endTime, setEndTime] = useState<any>()
    const userContext = useContext(UserContext)
    // const isThaiLanguage = userContext.is_thai_language
    const [isThaiLanguage, setIsThaiLanguage] = useState(true)
    const [modalConfirmOpen, setModalConfirmOpen] = useState(false);
    const [modalTimeOutOpen, setModalTimeOutOpen] = useState(false);
    const [waitingRoomExist, setWaitingRoomExist] = useState<boolean>();
    const [requiredUserNumber, setRequiredUserNumber] = useState<Number>();
    const [currentUserNumber, setCurrentUserNumber] = useState<Number>();
    const { t } = useTranslation()

    const history = useHistory()


    useEffect(() => {
        fetchWaitingRoom()
        setEndTime(timeShift(new Date("Jan 01, 2021 08:47:40").getTime(), 7))
        console.log(timeConversion(48))
        let list = [1, 2, 48]
        setTimeList(list)
    }, [])

    useEffect(() => {
        if (endTime != undefined) {
            countDown(endTime)
        }


    }, [endTime])

    useEffect(() => {
        if (currentUserNumber != null && requiredUserNumber != null) {
            if (currentUserNumber == requiredUserNumber) {
                // successful reservation and redirect to hooray page

                history.push('/hooray')
            }
        }

    }, [currentUserNumber])

    function triggerModal(modal) {
        if (modal == 'confirmModal') {
            setModalConfirmOpen(!modalConfirmOpen)
            return (
                modalConfirmOpen
            )
        } else if (modal == 'timeOutModal') {
            setModalTimeOutOpen(!modalTimeOutOpen)
            return (
                modalTimeOutOpen
            )
        }

    }

    const confirmCancellation = () => {
        closeWaitingRoom()
        history.push('/home')
    }

    const timeOut = async () => {
        setModalTimeOutOpen(true)
        await setTimeout(() => {
            setModalTimeOutOpen(false)
            history.push('/home')
        }, 3000)


    }

    const handleClick = () => {
        triggerModal('confirmModal')
    }

    const fetchWaitingRoom = async () => {
        await client
            .get('http://localhost:3000/mywaitingroom', {

            })
            .then(res => {
                setWaitingRoomExist(true)
                setListMember(res.data.list_member)
                setEndTime(timeShift(new Date(res.data.date).getTime(), 7))
                setSport(res.data.sport)
                setCourtNum(res.data.court_num)
                setDate(res.data.date.toLocaleString)
                setTimeList(res.data.time_slot)
                setRequiredUserNumber(res.data.required_user)
                setCurrentUserNumber(res.data.listmember.length)
            })
            .catch(err => {
                console.log(err)
                setWaitingRoomExist(false)
            })
    }

    // const kickMember = () => {
    //     console.log('kick member')
    // }

    const closeWaitingRoom = () => {

    }

    const userNumber = (currentUserNumber, requiredUserNumber) => {
        return (
            <span className='ml-3 grey' style={{ fontSize: '18px', fontWeight: 400 }}>
                {currentUserNumber + '/' + requiredUserNumber}
            </span>
        )
    }

    const countDown = (end) => {
        var x = setInterval(function () {
            var current = new Date().getTime()
            var diff = Math.floor((endTime - current) / 1000)
            let min = Math.floor(diff / 60)
            let sec = diff % 60
            let formated_min = ''
            let formated_sec = ''

            if (sec > -2) {
                if (sec < 0 && min < 0) {
                    console.log('timeout')
                    return (
                        timeOut()
                    )

                }

                if (~~(sec / 10) == 0) {
                    formated_sec = '0' + sec.toString()
                } else {
                    formated_sec = sec.toString()
                }

                if (~~(min / 10) == 0) {
                    formated_min = '0' + min.toString()
                } else {
                    formated_min = min.toString()
                }
                return (
                    setRemainingTime(formated_min + ':' + formated_sec + ' ')

                )
            }

        }, 1000)

        return (x)
    }

    const timeShift = (time, shiftedHours) => {
        shiftedHours = (shiftedHours * 60 * 60 * 1000)
        return time + shiftedHours
    }

    if (waitingRoomExist) {
        return (

            <>
                <NavHeader header='Waiting Room' />
                <div className='container'>
                    <div className='row justify-content-center mt-4'>
                        <div className='col-12'>
                            <div className='col-12 mb-4'>
                                <h6 style={{ fontSize: '16px', fontWeight: 400, lineHeight: '24px' }}> {t('how_waiting_room_work?')} </h6>
                                <h6 style={{ fontSize: '12px', fontWeight: 300, lineHeight: '14px' }}> {t('how_waiting_room_work')} </h6>
                            </div>
                            <div className='box-container btn w-100 mb-4'>
                                <h6 style={{ fontWeight: 700, fontSize: '14px', marginBottom: '5px' }}> {t('summary')} </h6>
                                <h6 style={{ fontWeight: 300, fontSize: '14px', margin: '0' }}> {sport} </h6>
                                <h6 style={{ fontWeight: 300, fontSize: '14px', margin: '0' }}> {t('date')}: {date} </h6>
                                <h6 style={{ fontWeight: 300, fontSize: '14px', margin: '0' }}> {t('time')}: {timeList.map(eachTime => { return timeConversion(eachTime) })} </h6>
                            </div>
                            <div className='box-container btn w-100 mb-3'>
                                <h6 style={{ fontWeight: 300, fontSize: '12px', lineHeight: '17px', marginBottom: '20px' }}> {t('remaining_time')}: </h6>
                                <h6 style={{ fontWeight: 700, fontSize: '36px', lineHeight: '17px', textAlign: 'center', marginBottom: '10px' }}> {remainingTime} </h6>
                            </div>
                            <div className='box-container btn w-100 mb-5'>
                                <h6 style={{ fontWeight: 300, fontSize: '12px', lineHeight: '17px', marginBottom: '20px' }}> {t('waiting_room_access_code')}: </h6>
                                <h6 style={{ fontWeight: 700, fontSize: '36px', lineHeight: '17px', textAlign: 'center', marginBottom: '10px' }}> {accessCode} </h6>
                            </div>
                            <div className='col-12 mb-2'>
                                <Button variant='pink' className='btn' onClick={fetchWaitingRoom} style={{ fontSize: '15px', fontWeight: 400, float: 'right', borderRadius: '15px', padding: '2px 10px' }}> {t('refresh')} </Button>
                                <div style={{ fontSize: '18px', fontWeight: 400, lineHeight: '26px' }}> {t('users')} {userNumber(2, 5)} </div>
                            </div>
                            <div className='box-container btn' style={{ width: '100%', marginBottom: '45px' }}>
                                <table>
                                    <tr style={{ fontSize: '16px', fontWeight: 700, lineHeight: '24px', borderBottom: '1px solid #ddd' }}>
                                        <th style={{ width: '26%', paddingBottom: '12px' }}> # </th>
                                        <th style={{ width: '74%', paddingBottom: '12px' }}> {t('username')} </th>
                                        <th>  </th>
                                    </tr>
                                    <tr>
                                        <td> </td>
                                        <td> name </td>
                                        {/* <td> <img src={cross} onClick={kickMember} /> </td> */}
                                    </tr>
                                    <tr >
                                        <td> </td>
                                        <td> name </td>
                                        {/* <td> <img src={cross} onClick={kickMember} /> </td> */}
                                    </tr>
                                    {listMember.map((eachMember, index) => {
                                        return (
                                            <tr >
                                                <td> {index} </td>
                                                <td> {eachMember} </td>
                                                {/* <td> <img src={cross} onClick={kickMember} /> </td> */}
                                            </tr>
                                        )

                                    })}
                                </table>

                            </div>
                            <Button onClick={handleClick} style={{ width: '100%', textAlign: 'center', backgroundColor: 'transparent', color: 'red', borderColor: 'red', borderRadius: '15px', marginBottom: '50px' }}>
                                {t('close_waiting_room')}
                            </Button>

                            <ConfirmModal modalConfirmOpen={modalConfirmOpen} handleClick={handleClick} confirmCancellation={confirmCancellation} />
                            <TimeOutModal modalTimeOutOpen={modalTimeOutOpen} />
                        </div>
                    </div>
                </div>
            </>
        )
    } else {
        return (
            <div className='container'>
                <div className='row justify-content-center mt-5 grey' style={{ fontWeight: 400 }}>
                    You have no waiting room, currently.
                </div>
            </div>
        )
    }

}

export default withUserGuard(WaitingRoomPage);