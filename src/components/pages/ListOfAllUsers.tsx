import React, { Component } from 'react';

interface stateTemplate {
      firstPerson: number;
      lastPerson: number;
      searchName: string;
      status: allStatus;
      users: {name:string, surname: string, username:string; is_penalize:boolean; id:number}[];
}

enum allStatus {
      All,
      Normal,
      Banned
}

class ListOfAllUsers extends Component {
      state: stateTemplate = {
            firstPerson: 0,
            lastPerson: 9,
            searchName: "",
            status: allStatus.All,
            users: [
                  {name:"beam", surname: "eiei", username:"b1", is_penalize:false, id:1},
                  {name:"black", surname: "burst", username:"b2", is_penalize:true, id:2}
            ]
      }

      handleChangeInput = (e) => {
            this.setState({
                  [e.target.id]: e.target.value
            })
      }

      handleChangeStatus = (e) => {
            this.setState({
                  ["status"]: e.target.value
            })
      }

      handleSearch = (e) => {
            e.preventDefault();
            console.log(this.state.searchName + " " + allStatus[this.state.status]);
      }

      handleInfo = (e) => {
            console.log("go to : " + e.target.id)
      }

      handleAddMember = (e) => {
            console.log("Go to add member page")
      }

      renderUsersTable = () => {
            let usersList = this.state.users.map(user => {
                  return (
                        <tr key={user.id}>
                              <td> { user.name } </td>
                              <td> { user.surname } </td>
                              <td> { user.username } </td>
                              <td> { (user.is_penalize) ? "Banned":"Good" } </td>
                              <td><button id={String(user.id)} onClick={this.handleInfo}>ดูข้อมูล</button></td>
                        </tr>
                  )
            })
            return usersList;
      }

      render() {
            return (
                  <div className="allUsers">
                        <h1> รายชื่อผู้ใช้ </h1>
                        <form className="search" onSubmit={this.handleSearch}> 
                              <label htmlFor="findMember"> ค้นหาสมาชิก </label>
                              <input type="text" id="searchName" placeholder=" ค้นหา " onChange={this.handleChangeInput} />
                              <button>ค้นหา</button>
                              <select onChange={this.handleChangeStatus}>
                                    <option value={allStatus.All}>ทั้งหมด</option>
                                    <option value={allStatus.Normal}>ปกติ</option>
                                    <option value={allStatus.Banned}>โดนแบน</option>
                              </select>
                        </form>
                        <table id="usersTable">
                              <tbody>
                                    <tr>
                                          <th key="firstName">First Name</th>
                                          <th key="lastName">Last Name</th>
                                          <th key="userName">User Name</th>
                                          <th key="is_penalize">สถานะ</th>
                                    </tr>
                                    { this.renderUsersTable() }
                              </tbody>
                        </table>
                        <button onClick={this.handleAddMember}>เพิ่มผู้ใช้</button>
                        <ul className="pagination">
                              <li> &lt;&lt; </li>
                              <li>1</li>
                        </ul>
                  </div>
            )
      }
}

export default ListOfAllUsers;