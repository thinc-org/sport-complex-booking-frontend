import * as React from 'react';
import { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap'
interface Props {
    inProp: boolean,
    header: string,
    message: string,
    handleClose: any
}
export const ErrorAlert = ({ inProp, header, message, handleClose }: Props) => {
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
                </Modal.Footer>
            </Modal>
        </>
    );
}
