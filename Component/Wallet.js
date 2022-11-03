import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "react-bootstrap/Button";
import { Alert } from "react-bootstrap";
import Link from "next/link";
import { Tab, Tabs, Sonnet } from "react-bootstrap";
import { CopyToClipboard } from "react-copy-to-clipboard";
import MDI from "../public/mdi.png";
import { setTokenSourceMapRange } from "typescript";
import SideBar from "./SideBar";
import Spinner from "react-bootstrap/Spinner";
import Navbar from "./ui/Navbar";

const Wallet = () => {
  const router = useRouter();
  const [scanner, setScanner] = useState();
  const [token, setToken] = useState();
  const [data, setData] = useState();
  
  async function walletscanner() {
    try {   
      const token = localStorage.getItem("token") 
      let res = await axios.post("/api/walletscanner", { token: token });
      const response = res.data;
 
        setScanner(response.data);
        setData(response.data)
      } catch (err) {
        console.log(err);
      }
    }
    
    useEffect(() => {
      walletscanner();
    }, []);

    const notify = (msg) =>
    toast.success(msg, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  return (
    <div className="new-dashboard">
      <SideBar/>
     
      <section className="profile-sec profile-sects">
        <div className="container" style={{marginTop:"30px"}}>
          <div className="row justify-content-center">
            <Navbar/>
            <form className="input-sec input-top" style={{ width: "40%" }}>
              <div className="input-line pay-line"></div>

              <span
                className="arrows-icon"
                onClick={() => router.back()}
                style={{
                  position: "relative",
                  left: "-45%",
                  cursor: "pointer",
                }}
              >
                <img
                  id="arrow-icon"
                  style={{ width: "3.5%" }}
                  src=""
                />
              </span>
              {data ?
              <div className="mt-1 input-item ">
                <div className="qr-sec">
                 
                    <img src={scanner?.data} className="qr" />
                
                </div>
                <div className="qr-sec">
                  <p className="qr-text">OR</p>
                </div>
                <div
                  className="para-set"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "24px",
                    border: "none",
                    overflow: "hidden",
                    width: "111%",
                  }}
                >
                  <p
                    className="iptpara-text"
                    style={{
                      fontSize: "14px",
                      display: "flex",
                      flexWrap: "wrap",
                      justifyContent: "center",
                    }}
                  >
                    
                    {scanner?.checkAddress}
                    <CopyToClipboard
                      text={scanner?.checkAddress}
                      onCopy={() => notify("Copied Successfully")}
                    >
                      <img style={{ marginLeft: "10px" }}
                       src={MDI.src}
                        />
                    </CopyToClipboard>
                  </p>
                </div>
              </div>
              : <Spinner animation="border" variant="warning" />
                  }
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Wallet;

