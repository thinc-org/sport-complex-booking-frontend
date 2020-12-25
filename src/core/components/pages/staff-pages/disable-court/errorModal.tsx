import * as React from 'react';
import { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap'
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
            <Modal show={inProp} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{header}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{message}</Modal.Body>
                <Modal.Footer>
                    <Button variant="mediumPink" onClick={handleClose}>
                        ตกลง
                    </Button>
                    {canCancel ?
                        <Button onClick={onCancel}>
                            ยกเลิก
                </Button> : ''}
                </Modal.Footer>
            </Modal>
        </>
    );
}
