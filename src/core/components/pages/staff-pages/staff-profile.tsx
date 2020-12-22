import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

function StaffProfile() {

    const [name, setName] = useState('ชื่อจริง-นามสกุล')
    const [accountType, setAccountType] = useState('Adminsister')

    axios
        .get('http://localhost:3000/staffs/', {
            headers: {
                Authorization: 'bearer',
            },
        })
        .then(res => {
            setName(res.data.name)
            setAccountType(res.data.account_type)
        })

    return (
        <div className='container' style={{ paddingLeft: '0' }}>
            <div className='box-container btn' style={{ width: '60%', marginTop: '25px' }}>
                <div>
                    <div style={{ fontWeight: 300, fontSize: '16px', lineHeight: '24px', marginBottom: '10px' }}> ชื่อ-นามสกุล </div>
                    <div style={{ fontWeight: 700, fontSize: '24px', lineHeight: '24px' }}> {name} </div>

                </div>
            </div>
            <div className='box-container btn' style={{ width: '60%', marginTop: '' }}>
                <div>
                    <div style={{ fontWeight: 300, fontSize: '16px', lineHeight: '24px', marginBottom: '10px' }}> ประเภทบัญชี </div>
                    <div style={{ fontWeight: 700, fontSize: '24px', lineHeight: '24px' }}> {accountType} </div>

                </div>
            </div>
        </div>

    )
}

export default StaffProfile;