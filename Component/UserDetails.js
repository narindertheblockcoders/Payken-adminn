import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import SideBar from "./SideBar";
import Navbar from "./ui/Navbar";
import Router from "next/router";
import { useRouter } from "next/router";

const UserDetails = ({props}) => {
  console.log(props);

  // let {data} = props.response;
  // console.log(data, "to whether data is feteched or not");



  return (
    <div id= "userDetails-inner" style={{height:"91vh"}}>
      <div className="container">
        <div className="row">
          <div className="column">
              <h3>User Details</h3>
          </div>

          <div className="getDetails" style={{marginTop:"150px", display:"flex", justifyContent:"center", flexDirection:"column"}}>
          <div>
            <h3>First Name</h3>
            <h3>{props?.firstName}</h3>
          </div>
          <div className="getDetails">
            <h3>Last Name</h3>
            <h3>{props?.lastName}</h3>
          </div>
          <div className="getDetails">
            <h3>Email</h3>
            <h3>{props?.email}</h3>
          </div>
          </div>
        </div>
      </div>

    </div>
  );
}
export default UserDetails; 
