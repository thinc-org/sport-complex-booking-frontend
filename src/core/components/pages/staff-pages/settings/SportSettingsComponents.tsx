import React from "react"
import { Form, Row, Button, Modal } from "react-bootstrap"
import { useForm } from "react-hook-form"

export interface SportData {
  object_id?: string,
  sport_name_th: string,
  sport_name_en: string,
  required_user: number,
  quota: number,
  list_court?: number[],
}

export interface DeleteSportProps {
  show: boolean
  setShow: (value: boolean) => void
  mainFunction: (value: SportData) => void
  data: SportData
} 

export const DeleteSport:React.FC<DeleteSportProps> = ({show, setShow, mainFunction, data}) => {
  return (
    <Modal
      show={show}
      onHide={() => {setShow(false)}}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>คําเตือน</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ fontWeight: "lighter" }}>ท่านกําลังจะลบกีฬาออกจากระบบ ต้องการดําเนินต่อใช่หรือไม่</Modal.Body>
      <Modal.Footer>
        <Button variant="outline-pink" className="btn-normal"
          onClick={() => { setShow(false)}}
        >ยกเลิก</Button>
        <Button variant="pink" className="btn-normal"
          onClick={() => { mainFunction(data!)}}
        >ตกลง</Button>
      </Modal.Footer>
    </Modal>
  )
}

export interface AddSportProps {
  show: boolean
  setShow: (value: boolean) => void
  onSubmitAddSport: (sport: SportData) => void
}

export const AddSport:React.FC<AddSportProps> = ({show, setShow, onSubmitAddSport}) => {
  const { register, handleSubmit, getValues, setValue, errors } = useForm()
  return (
    <Modal
      show={show}
      onHide={() => {
        setShow(false)
      }}
      backdrop="static"
      keyboard={true}
    >
      <form onSubmit={handleSubmit(onSubmitAddSport)}>
      <Modal.Header closeButton>
        <Modal.Title>เพิ่มกีฬา</Modal.Title>
      </Modal.Header>
      <div className="m-4">
          <Form.Group>
            <Row>
              <Form.Label>ประเภทกีฬา (ภาษาไทย)</Form.Label>
              <input type="text" ref={register({
                required: "กรุณากรอกข้อมูล"
              })} name="sport_name_th" className="form-control" />
            </Row>
            {errors.sport_name_th && <p id="input-error">{errors.sport_name_th.message}</p>}
            <Row>
              <Form.Label>ประเภทกีฬา (ภาษาอังกฤษ)</Form.Label>
              <input type="text" ref={register({
                required: "กรุณากรอกข้อมูล"
              })} name="sport_name_en" className="form-control" />
            </Row>
            {errors.sport_name_en && <p id="input-error">{errors.sport_name_en.message}</p>}
          </Form.Group>
      </div>

      <div className="card">
        <h5 className="card-header">เวลาการจองมากที่สุด</h5>
          <div className="card-body">
            <span className="d-flex justify-content-around">
              <Button  variant="pink" className="button"
                onClick={() => { setValue('quota', parseInt(getValues('quota')) -60)}}>
                -60
              </Button>
              <Button variant="pink" className="button"
                onClick={() => {setValue('quota', parseInt(getValues('quota')) -30)}}>
                -30
              </Button>
              <input type="number" ref={register} name="quota" defaultValue="60" className="form-control w-25"/>
              <span className="mt-3">นาที</span>
              <Button variant="pink" className="button"
                onClick={() => { setValue('quota',parseInt(getValues('quota')) +30)}}>
                +30
              </Button>
              <Button variant="pink"  className="button"
                onClick={() => {setValue('quota', parseInt(getValues('quota')) +60)}}>
                +60
              </Button>
            </span>
          </div>
      </div>

      <div className="card">
        <h5 className="card-header">จํานวนผู้จองขั้นตั่า</h5>
          <div className="card-body">
            <span className="d-flex justify-content-around">
              <Button variant="pink" className="button"
                onClick={() => {setValue('required_user', parseInt(getValues('required_user')) -5)}}>
                -5
              </Button>
              <Button variant="pink" className="button"
                onClick={() => {setValue('required_user', parseInt(getValues('required_user')) -1)}}>
                -1
              </Button>
              <input type="number" ref={register} name="required_user" defaultValue="5" className="form-control w-25"/>
              <span className="mt-3"> คน</span>
              <Button variant="pink"className="button" 
                onClick={() => {setValue('required_user', parseInt(getValues('required_user')) + 1)}}>
                +1
              </Button>
              <Button variant="pink"className="button"
                onClick={() => {setValue('required_user', parseInt(getValues('required_user')) + 5)}}>
                +5
              </Button>
            </span>
          </div>
      </div>

      <Modal.Footer>
        <Button
          variant="outline-pink"
          className="btn-normal"
          onClick={() => {setShow(false)}}
        > ยกเลิก
      </Button>
        <Button
          type="submit"
          variant="pink"
          className="btn-normal"
        >เพิ่ม
      </Button>
      </Modal.Footer>
      </form>
    </Modal>
  )
}

export interface HandleErrorProps {
  show: boolean
  setShow: (value: boolean) => void
}

export const HandleError:React.FC<HandleErrorProps>  = ({show, setShow}) => {
  if (!show) return null
  return (
    <Modal
      show={show}
      onHide={() => {setShow(false)}}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>คําเตือน: เกิดเหตุขัดข้อง</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ fontWeight: "lighter" }}>กรุณาลองใหม่อีกครั้ง</Modal.Body>
      <Modal.Footer>
        <Button variant="pink" className="btn-normal"
          onClick={() => {setShow(false)}}
        >ตกลง</Button>
      </Modal.Footer>
    </Modal>
  )
}

export interface EditSportProps {
    show: boolean
    setShow: (value: boolean) => void
    setCurrentSport: (value: SportData)=> void
    sendEdittedSportInfo: (value: SportData) => void
    currentSport: SportData
  }

  export const EditSport:React.FC<EditSportProps> = ({show, setShow, setCurrentSport, sendEdittedSportInfo, currentSport}) => {
    return (
      <Modal
        show={show}
        onHide={() => {setShow(false)}}
        backdrop="static"
        keyboard={false}
        animation={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>ประเภทกีฬา: {currentSport!['sport_name_th']}</Modal.Title>
        </Modal.Header>
        <div className="card">
          <h5 className="card-header">เวลาการจองมากที่สุด</h5>
            <div className="card-body">
              <span className="d-flex justify-content-around">
                <Button variant="pink" className="button" disabled={currentSport['quota']<= 0}
                  onClick={() => {setCurrentSport(({...currentSport!, quota: currentSport!['quota']-2}))}}
                  >-60</Button>
                <Button variant="pink" className="button" disabled={currentSport['quota']<= 0}
                  onClick={() => {setCurrentSport(({...currentSport!, quota: currentSport!['quota']-1}))}}>-30</Button>
                <span className="mt-3">{currentSport!['quota'] * 30} นาที</span>
                <Button variant="pink" className="button"
                  onClick={() => {setCurrentSport(({...currentSport!, quota: currentSport!['quota']+1}))}}
                >+30</Button>
                <Button variant="pink" className="button"
                  onClick={() => {setCurrentSport(({...currentSport!, quota: currentSport!['quota']+2}))}}
                >+60</Button>
              </span>
            </div>
        </div>

        <div className="card">
          <h5 className="card-header">จํานวนผู้จองขั้นตั่า</h5>
            <div className="card-body">
              <span className="d-flex justify-content-around">
                <Button variant="pink" className="button" disabled={currentSport['required_user']<= 0}
                  onClick={() => { setCurrentSport(({...currentSport!, required_user: currentSport!['required_user']-2}))}}
                >-2</Button>
                <Button  variant="pink" className="button" disabled={currentSport['required_user']<= 0}
                  onClick={() => {setCurrentSport(({...currentSport!, required_user: currentSport!['required_user']-1}))}}
                >-1 </Button>
                <span className="mt-3">{currentSport!['required_user']} คน</span>
                <Button variant="pink" className="button"
                  onClick={() => { setCurrentSport(({...currentSport!, required_user: currentSport!['required_user']+1}))}}
                >+1</Button>
                <Button variant="pink" className="button"
                  onClick={() => {setCurrentSport(({...currentSport!, required_user: currentSport!['required_user']+2}))}}
                >+2</Button>
              </span>
            </div>
        </div>
        <Modal.Footer>
          <Button variant="outline-pink" className="btn-normal"
            onClick={() => {setShow(false)}}
          >ยกเลิก</Button>
          <Button variant="pink" className="btn-normal"
            onClick={() => {
              console.log(currentSport)
              sendEdittedSportInfo(currentSport)
            }}
          >ตกลง</Button>
        </Modal.Footer>
      </Modal>
    )
  }