import React, { useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "react-bootstrap/Button";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import SideBar from "./SideBar";
import Navbar from "./ui/Navbar";

export default function Withdraw() {
  const amountRef = useRef();
  const [amounts, setAmounts] = useState()


  async function dataAmount() {
    try {
      let res = await axios.post("/api/withdrawAmount");
      const crc = res.data;
      setAmounts(crc.data.withdrawableAmount);
      // setTimeout(()=>{
      //   router.push("/dashboard")
      // },2000)
      console.log(crc, "withdraw all ddata")
     
   
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(()=>{
dataAmount()
  },[])

  async function onSubmitHandler() {
    e.preventDefault();
    try {
      const response = await axios.post("/api/withdrawApi", data);
      const data = response.data;
      toast.success("Amount ");
    } catch (err) {
      console.log(err);
    }
  }

  return (
           <div className="new-dashboard ">
            <SideBar/>
    
      <section className="profile-sec  profile-sects">
        <div className="container">
        <Link href={"/withdrawInfo"}>
                    <span  className="arr-icon" style={{  position: "relative",   left: "-25%",   top:"20px",   cursor: "pointer", }}>
                      <img src="" className="icon-width"/>
                    </span>
                  </Link>
          <div className="row justify-content-center">
            <Navbar/>
            <ToastContainer />
            <form className="input-sec input-top p-0" id="form-setik"
              // onSubmit={formSubmitHandler}
 >
              <div className="input-line iptset-line" id="index-line"></div>
              <div className="p-3">
                <h3 className="heading-text mt-3"> WALLET BALANCE =${amounts}</h3>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center",}}
                  className="input-item">
                  <h6 className="item-text" style={{ fontSize: "18px" }}>
                    WITHDRAW AMOUNT
                  </h6>
                  <input
                    className="textinput"
                    type="number"
                    name="username"
                    style={{ width: "150px" }}
                    // ref={emailInputRef}
                    autoComplete="on"
                  />
                </div>

                <Link href="/withdrawInfo">
                  <button
                    variant="primary"
                    className="btn btn-round btn-warning w-100 p-0 "
                    style={{ marginTop: "50px" }}
                    type="submit"
                  >
                    CONTINUE
                  </button>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
