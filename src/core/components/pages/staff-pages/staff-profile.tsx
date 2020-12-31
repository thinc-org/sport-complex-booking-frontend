import React from 'react';
import { useState, useEffect } from 'react';
import { client } from '../../../../axiosConfig';

function StaffProfile() {

    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [accountType, setAccountType] = useState('')

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        await client
            .get('http://localhost:3000/staffs/profile', {

            })
            .then(res => {
                setName(res.data.name)
                setSurname(res.data.surname)
                if (res.data.is_admin) {
                    setAccountType('Administration')
                } else {
                    setAccountType('Staff')
                }
            })
    }



    return (
        <div className='container pl-0'>
            <div className='box-container btn col-6 mt-4'>
                <div>
                    <div style={{ fontWeight: 300, fontSize: '16px', lineHeight: '24px', marginBottom: '10px' }}> ชื่อ-นามสกุล </div>
                    <div style={{ fontWeight: 700, fontSize: '24px', lineHeight: '24px' }}> {name} </div>

                </div>
            </div>
            <br />
            <div className='box-container btn col-6'>
                <div>
                    <div style={{ fontWeight: 300, fontSize: '16px', lineHeight: '24px', marginBottom: '10px' }}> ประเภทบัญชี </div>
                    <div style={{ fontWeight: 700, fontSize: '24px', lineHeight: '24px' }}> {accountType} </div>

                </div>
            </div>
        </div>

    )
}

export default StaffProfile;