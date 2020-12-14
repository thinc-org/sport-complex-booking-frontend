import React, { Component, createContext } from 'react';

let defaultValue;
export const UserContext = createContext(defaultValue);

class UserContextProvider extends Component {
  accountSchemaType = {type: String, enum:['CuStudent','SatitAndCuPersonel','Other']};
  verificationSchemaType = {type: String, enum: ['NotSubmitted','Submitted','Verified','Rejected']};

  state = {
    account_type: this.accountSchemaType,
    CuStudent: {
      account_type: this.accountSchemaType,
      is_thai_language: Boolean,
      name_en: String,
      surname_en: String,
      name_th: String,
      surname_th: String,
      username: String, //username=student id
      personal_email: String,
      phone: String,
      is_penalize: Boolean,
      expired_penalize_date: Date,
      is_first_login: Boolean,
    },
    SatitCuPersonel: {
      account_type: this.accountSchemaType,
      is_thai_language: Boolean,
      name_en: String,
      surname_en: String,
      name_th: String,
      surname_th: String,
      personal_email: String,
      phone: String,
      username: String,
      password: String,
      is_penalize: Boolean,
      expired_penalize_date: Date,
    },
    Other: {
    account_type: this.accountSchemaType,
      is_thai_language: Boolean,
      prefix: String, //(เพื่อแสดง นาย/นาง/นางสาว)
      name_en: String,
      surname_en: String,
      name_th: String,
      surname_th: String,
      birthday: Date, //(use this for cal age)
      national_id: String, //(also pasport no in foreign) 
      gender: String,
      marital_status: String,
      address: String,
      phone: String,
      home_phone: String,
      personal_email: String,
      contact_person: {
          contact_person_prefix: String,
          contact_person_name: String,
          contact_person_surname: String,
          contact_person_home_phone: String,
          contact_person_phone: String,
      },
      medical_condition: String,
      membership_type: String,
      username: String, //username=email (cannot change)
      password: String, //pass=phone(editable)
      is_penalize: Boolean,
      expired_penalize_date: Date,
      verification_status: this.verificationSchemaType,
      rejected_info: [String],
      account_expiration_date :Date,
      user_photo: Object, //(ของcollectionที่เก็บรูป)
      medical_ceritficate: Object,
      national_id_photo: Object, //also passport photo
      house_registration_number: Object,//with reference person
      relationship_verification_document: Object,
    }
    
  }
  setCuStudent = (value) => {
    this.setState({ CuStudent: value});
    console.log("SET VALUE IS CALLED", this.state.CuStudent)
  }
  setSatit = (value) => {
    this.setState({ SatitCuPersonel: value});
    console.log("SET VALUE IS CALLED", this.state.SatitCuPersonel)
  }
  setOther = (value) => {
    this.setState({ Other: value});
    console.log("SET VALUE IS CALLED", this.state.Other)
  }
  render() { 
    return (
      <UserContext.Provider value={{...this.state, setCuStudent: this.setCuStudent, setSatit: this.setSatit, setOther: this.setOther}}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}
 
export default UserContextProvider;