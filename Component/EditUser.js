import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
// import Router, { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "react-bootstrap/Button";
import SideBar from "./SideBar";
import Navbar from "./ui/Navbar";
import { signOut, useSession } from "next-auth/react";
import leftCount from "../pages/api/userCounts";
//import { data, data } from "jquery";
import { Router, useRouter } from "next/router";

function  TicketAddress(props) {
  console.log(props)
  const router = useRouter();
  const firstNameInputRef = useRef();
  const lastNameInputRef = useRef();
  const userNameInputRef = useRef();
  const [firstName, setFirstName] = useState(false);
  const [lastName, setLastName] = useState(false);
  const [userName, setUserName] = useState(false);
  const [id, setId] = useState(null);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingRef, setLoadingRef] = useState(false);

  function simulateNetworkRequest() {
    //return new Promise((resolve) => setTimeout(resolve, 4000));
  }

  // useEffect(() => {
  //   setId(localStorage.getItem("id"));
  // }, []);

  async function getUserProfile() {
    try {
      const {id}= props;
      const token = localStorage.getItem('token')
      console.log(data, "id");
      let res = await axios.post("/api/editUserApi",{token:token,id:id});
      const response = res.data;
      console.log(response.data.checkSc,"to get the response from api");
      setData(response.data.checkSc, "data direct is here");
  
    
      // setIsLoading(true);
      // setLoadingRef(true);
      // setData(res.data.data[0])
    } catch (err) {
      console.log(err);
      // toast.error("can't update user")
      // setIsLoading(false);
      // setLoadingRef(false);

    }
  }

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

const notifyError = (msg) =>
  toast.error(msg, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
  useEffect(() => {
    getUserProfile();
  }, []);

  async function updateUserProfile(data) {
    try {
      const token = localStorage.getItem("token");
      console.log(token, "to get the token form localstorage");
      let res = await axios.post("/api/updateUser", { token: token, data });
      const response = res.data;
      console.log(
        response,
        "to get the response from api to update the profile"
        );
        toast.success("user updated successfully")
        router.push("/dashboard");
    } catch (err) {
      console.log(err);
      toast.error("can't update user")
    }
  }

  async function formSubmitHandler(event) {
    event.preventDefault();
    console.log(data);
    const firstName = firstNameInputRef.current.value;
    const lastName = lastNameInputRef.current.value;
    const userName = userNameInputRef.current.value;

    const data = {
      firstName,
      lastName,
      userName,
      id,
    };

    console.log(data, "data entered by the use to update the profile");

    updateUserProfile(data);
  }

  return (
    <div className="new-dashboard ">
      <SideBar />
      <section className="profile-sec profile-sects">
        <div className="container">
          <div className="row justify-content-center">
            <Navbar />
            <ToastContainer />

            <form
              className="input-sec input-top p-0"
              id="form-setup"
              onSubmit={formSubmitHandler}
            >
              <div className="input-line" id="index-line"></div>

              <div className="padding-set">
                {/* <h3 className="heading-text mt-4">
                  {" "}
                  Join the Global Community
                </h3> */}
                <img className="stier-logo" src="/logo.png"></img>
                {/* <img id="logo-id" src="/logo.png"/> */}
                <div className="input-item" style={{ marginTop: "50px" }}>
                  <h6 className="item-text"> first Name</h6>
                  <div
                    className="input-group height-set flex-nowrap mt-0 "
                    id="mb-set"
                  >
                    <input
                      ref={firstNameInputRef}
                      type="text"
                      className="form-control form-border"
                      defaultValue={data?.firstName}
                      aria-label="Username"
                      aria-describedby="addon-wrapping"
                      // onChange={(e)=>setFirstName(e.currentTarget.value)}
                      onChange={(e) =>
                        setData({ ...data, firstName: e.currentTarget.value })
                      }
                    />
                  </div>
                </div>

                <div className="input-item" style={{ marginTop: "50px" }}>
                  <h6 className="item-text"> last Name</h6>
                  <div
                    className="input-group height-set flex-nowrap mt-0 "
                    id="mb-set"
                  >
                    <input
                      ref={lastNameInputRef}
                      type="text"
                      className="form-control form-border"
                      defaultValue={data?.lastName}
                      aria-label="Username"
                      aria-describedby="addon-wrapping"
                      // onChange={(e)=>setLastName(e.currentTarget.value)}
                      onChange={(e) =>
                        setData({ ...data, lastName: e.currentTarget.value })  } />
                  </div>
                </div>

                <div className="input-item " style={{ marginTop: "50px" }}>
                  <h6 className="item-text">userName</h6>
                  <div
                    className="input-group height-set flex-nowrap mt-0"
                    id="mb-set"
                  >
                    <input
                      ref={userNameInputRef}
                      type="text"
                      className="form-control form-border"
                      defaultValue={data?.userName}
                      autoComplete="none"
                      onChange={(e) =>
                        setData({ ...data, userName: e.currentTarget.value })
                      }
                      aria-label="Username"
                      aria-describedby="addon-wrapping"
                    />
                  </div>
                </div>

                {/* <div className="input-item " style={{ marginTop: "50px" }}>
                  <h6 className="item-text">password</h6>
                  <div
                    className="input-group height-set flex-nowrap mt-0"
                    id="mb-set"
                  >
                    <input
                     ref={passwordInputRef}
                      type="text"
                      className="form-control form-border"
                      defaultValue={data?.password}
                      autoComplete="none"
                      onChange={(e)=>setData({...data, password:e.currentTarget.value})}
                      
                      aria-label="Username"
                      aria-describedby="addon-wrapping"
                    

                    />
                  </div>
                </div> */}

                <Button
                  variant="primary"
                  className="btn btn-round btn-warning w-100 "
                  style={{ marginTop: "30px", marginBottom: "30px" }}
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoadingRef ? "Loading…" : "     UPDATE"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

export default TicketAddress;
