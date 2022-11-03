import React, { useRef, useState, useEffect } from "react";
import Spinner from "react-bootstrap/Spinner";

import axios from "axios";
import Link from "next/link";
import {useRouter} from "next/router";
import SideBar from "./SideBar";
import Navbar from "./ui/Navbar";

const TotalUsers = (props) => {
  const [usersData, setUsersData] = useState(null);
  const router = useRouter();

  async function totalUsers() {
    try {
      const token = localStorage.getItem("token");
      console.log(token, "for api");
      let res = await axios.post("/api/totalUsers", { token: token });
      const response = res.data;
      console.log(response.data, "for fetching details");
      setUsersData(response.data);
    } catch (err) {
      console.log(err, err);
    } 
  }
  useEffect(() => {
    totalUsers();
  }, []);
 



  return (
    <>
           <div className="new-dashboard">
            <SideBar/>
        <section className="profile-sec profile-sects">
          <div className="container">
            <div className="row justify-content-center">
              <Navbar/>
              <form className="input-sec" id="ref-code">
                {/* {/ <div className="line profile-line" id="ch-line"></div> /} */}
                <h3 className="heading-text pink-text mt-2 ">
                  USERS LIST
                  <Link href={"/dashboard"}>
                    <span
                      className="arr-icon"
                      style={{
                        position: "relative",
                        left: "-48%",
                        cursor: "pointer",
                      }}
                    >
                      <img src="" className="icon-width"/>
                    </span>
                  </Link>
                </h3>
                {/* <a href={"/addUsers"} id="add-withdraw" className="btn btn-round btn-warning w-25 Link-btn">
                    Add New Users
                  </a> */}

                <div  className="me-2" style={{display:"flex",justifyContent:'left',marginTop:"2rem",marginBottom:"-2rem"}}>
                <input type="search" placeholder="search" onChange={(e)=>{match(e)}}></input>
                </div>
                

                <table className="table funds-table mt-5" id="funds-color">
                  <thead>
                    <tr className="">
                      <th id="fuds" scope="col">
                        Sr. No.
                      </th>
                      <th id="fuds" scope="col">
                        First Name
                      </th>
                      <th id="fuds" scope="col">
                        Last Name
                      </th>
                      <th id="fuds" scope="col">
                        Email
                      </th>
                   
                      {/* <th id="fuds" scope="col">
                        Referal code
                      </th>
                      <th id="fuds" scope="col">
                        Position
                      </th> */}

                    </tr>
                  </thead>

                  <tbody>
                    {usersData?.map((item, id) => {
                      // console.log(item,"fghjkjhgfdfghj");
                      return (
                        <tr key={id}>
                            
                          <td className="total-account">{id+1}</td>
                          <td className="total-account">{item.firstName}</td>
                          <td className="total-account">{item.lastName}</td>
                          <td className="total-account">{item.email}</td>
                          {/* <td className="total-account">{item.referralCode}</td>
                          <td className="total-account">{item.position}</td> */}
                         
                        
                        </tr>
                      );
                    })}


                  </tbody>

                  
                </table>
              </form>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default TotalUsers;
