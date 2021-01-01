import React from 'react';
import { useState, useEffect, FunctionComponent } from 'react';
import { RouteComponentProps, Link, Redirect } from "react-router-dom"
import { BrowserQRCodeReader } from '@zxing/library';
import { client } from '../../../../axiosConfig'
import { Button } from 'react-bootstrap'
const QRScannerPage: FunctionComponent<RouteComponentProps> = (props) => {

    const codeReader = new BrowserQRCodeReader();
    const [readingResult, setReadingResult] = useState<any>([]);
    const [reservationId, setReservationId] = useState<any>();
    const [reservation, setReservation] = useState<any>('555')

    var data = ''

    codeReader
        .decodeOnceFromVideoDevice(undefined, 'video')
        .then(result => {
            setReadingResult(result)
            console.log(readingResult.text)
            data = readingResult.text
            console.log(data)
            if (data != undefined) {
                setReservationId(data)
            }
        })
        .catch(err => console.error(err));

    useEffect(() => {
        checkIn()
    }, [reservationId])

    useEffect(() => {
        console.log('ddd')
    }, [])

    const checkIn = async () => {
        await client
            .patch(`'http://localhost:3000/myreservation/check/${reservationId}'`, {

            })
            .then((res) => {
                setReservation(res)
            })
    }

    const checkInResult = () => {
        if (reservation != undefined) {
            return (
                <div style={{ textAlign: 'center' }}>
                    <h6> {reservation} is successfully checked in </h6>
                </div>
            )
        }

        return ('')
    }

    const refresh = () => {
        console.log('refresh')
        return setReservation(undefined)
    }

    return (
        <div className='container'>
            <div className='row justify-content-center'>
                <div className='col-12'>
                    <div className='box-container btn offset-3 col-6 btn-lightpink-lightpink pt-2 pb-2' style={{ marginBottom: '45px' }}>
                        <div style={{ fontSize: '24px', textAlign: 'center' }}> ประเภทกีฬา </div>
                    </div>
                    <div className='col-6 offset-3 mb-3'>
                        <div style={{ fontSize: '36px', fontWeight: 700, textAlign: 'center' }}> QR CODE SCANNER </div>
                    </div>
                    {checkInResult()}
                    <Button variant='pink' className='col-4 offset-4 p-0 pl-2 pr-2 mb-2' onClick={refresh}> Refresh </Button>
                    <div className='box-container btn offset-1 col-10 pt-3' style={{ boxShadow: 'none' }}>
                        <video
                            id="video"
                            width="100%"
                            style={{ border: '1px solid gray' }}
                        ></video>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default QRScannerPage;