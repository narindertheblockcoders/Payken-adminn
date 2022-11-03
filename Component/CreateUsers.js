import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "react-bootstrap/Button";
import SideBar from "./SideBar";
import Navbar from "./ui/Navbar";
import { Alert } from "react-bootstrap";

import { useRouter } from "next/router";

function CreateUsers() {
  const router = useRouter();

  function simulateNetworkRequest() {
    return new Promise((resolve) => setTimeout(resolve, 4000));
  }

  const emailInputRef = useRef();
  const firstNameInputRef = useRef();
  const lastNameInputRef = useRef();
  const userNameInputsRef = useRef();
  const passwordInputRef = useRef();

  const [email, setEmail] = useState(false);
  const [id, setId] = useState(null);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingRef, setLoadingRef] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  useEffect(() => {
    setId(localStorage.getItem("id"));
    setEmail(localStorage.getItem("email"));
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

  async function passwordSubmitHandler() {
    setIsPasswordValid(false);
  }

  async function updateUserProfile(data) {
    try {
      const token = localStorage.getItem("token");
      console.log(token, "to get the token form localstorage");
      let res = await axios.post("/api/createUsers", { token: token, data });
      const response = res.data;
      console.log(
        response,
        "to get the response from api to update the profile"
      );
      toast.success("Create user successfully");
      setIsLoading(true);
      setLoadingRef(true);
      setTimeout(() => {router.push("/dashboard"); }, 2000);
    } 
    catch (err) {
      console.log(err);

      const errorMsg = err.response.data.Error.status;
      if (errorMsg == "400") {
        toast.error("User already exists");

        setIsLoading(false);
        setLoadingRef(false);
        return;
      }

      setIsLoading(false);
      setLoadingRef(false);
    }
  }

  async function formSubmitHandler(event) {
    event.preventDefault();
    var regularExpression =
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

    console.log(data);
    const email = emailInputRef.current.value;
    const firstName = firstNameInputRef.current.value;
    const lastName = lastNameInputRef.current.value;
    const userName = userNameInputsRef.current.value;
    const password = passwordInputRef.current.value;

    const data = {
      email,
      firstName,
      lastName,
      userName,
      password,
    };

    if (!regularExpression.test(password)) {
      setIsPasswordValid(true);
      setLoadingRef(false);
      setIsLoading(false);
      return false;
    }

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
                <img className="stier-logo" src="/logo.png"></img>
                <div className="input-item" style={{ marginTop: "50px" }}>
                  <h6 className="item-text"> Email</h6>
                  <div
                    className="input-group height-set flex-nowrap mt-0 "
                    id="mb-set"
                  >
                    <input
                      type="text"
                      ref={emailInputRef}
                      required
                      className="form-control form-border"
                    />
                  </div>
                </div>

                <div className="input-item" style={{ marginTop: "50px" }}>
                  <h6 className="item-text"> First Name</h6>
                  <div
                    className="input-group height-set flex-nowrap mt-0 "
                    id="mb-set"
                  >
                    <input
                      ref={firstNameInputRef}
                      type="text"
                      required
                      className="form-control form-border"
                    />
                  </div>
                </div>

                <div className="input-item " style={{ marginTop: "50px" }}>
                  <h6 className="item-text">Last Name</h6>
                  <div
                    className="input-group height-set flex-nowrap mt-0"
                    id="mb-set"
                  >
                    <input
                      ref={lastNameInputRef}
                      type="text"
                      required
                      className="form-control form-border"
                      autoComplete="none"
                    />
                  </div>
                </div>

                <div className="input-item" style={{ marginTop: "50px" }}>
                  <h6 className="item-text"> User Name</h6>
                  <div
                    className="input-group height-set flex-nowrap mt-0 "
                    id="mb-set"
                  >
                    <input
                      ref={userNameInputsRef}
                      type="text"
                      required
                      className="form-control form-border"
                    />
                  </div>
                </div>
                <div className="input-item " style={{ marginTop: "50px" }}>
                  <h6 className="item-text">Password</h6>
                  <div
                    className="input-group height-set flex-nowrap mt-0"
                    id="mb-set"
                  >
                    <input
                      ref={passwordInputRef}
                      type="password"
                      required
                      onClick={passwordSubmitHandler}
                      className="form-control form-border"
                    />
                  </div>
                  {isPasswordValid && (
                    <Alert style={{ margin: "0" }} variant={"danger"}>
                      Your password must be at least 8 characters long, should
                      contain at least one number or special character and have
                      a mixture of uppercase and lowercase letters.
                    </Alert>
                  )}
                </div>

           

                <Button
                  variant="primary"
                  className="btn btn-round btn-warning w-100 "
                  style={{ marginTop: "30px", marginBottom: "30px" }}
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoadingRef ? "Loading…" : "     CONTINUE"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

export default CreateUsers;
