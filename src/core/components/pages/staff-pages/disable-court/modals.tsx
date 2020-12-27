import * as React from 'react';
import { Modal, Button, Form } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
interface Props {
    inProp: boolean,
    header: string,
    message: string,
    handleClose: any,
    canCancel?: boolean
    onCancel?: any
}
export const ErrorAlert = ({ inProp, header, message, handleClose, canCancel = false, onCancel }: Props) => {
    return (
        <>
            <Modal show={inProp} onHide={onCancel}>
                <Modal.Header closeButton>
                    <Modal.Title>{header}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{message}</Modal.Body>
                <Modal.Footer>
                    <Button variant="mediumPink" onClick={handleClose}>
                        ตกลง
                    </Button>
                    {canCancel ?
                        <Button onClick={onCancel} variant='mediumPink'>
                            ยกเลิก
                </Button> : ''}
                </Modal.Footer>
            </Modal>
        </>
    );
}

export const FormAlert = ({ inProp, handleClose, onSubmit }) => {
    const { register, handleSubmit } = useForm()
    return (
        <Modal show={inProp} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>เลือกช่วงเวลา</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Modal.Body>

                </Modal.Body>
                <Modal.Footer>
                    <Button type='submit' variant="mediumPink" >
                        เพิ่มการปิดคอร์ดใหม่
                </Button>
                    <Button onClick={handleClose} variant='mediumPink'>
                        ยกเลิก
                </Button>
                </Modal.Footer>
            </Form>

        </Modal>
    )
}