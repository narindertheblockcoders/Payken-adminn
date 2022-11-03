import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import changePassword from "../pages/changePassword";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import Link from "next/link";
import Button from "react-bootstrap/Button";
import { Alert } from "react-bootstrap";
import SideBar from "./SideBar";
import Navbar from "./ui/Navbar";
import { data } from "jquery";

const ChangePassword = () => {
  const emailRef = useRef();
  const oldPasswordRef = useRef();
  const newPasswordRef = useRef();
  const sendCodeRef = useRef();
  const confirmPasswordRef = useRef();
  const [error, setError] = useState(false);
  const [errorValid, setErrorValid] = useState(false);
  const [verify, setVerify] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [newPasswordValid, setNewPasswordValid] = useState(false);
  const [emailData, setEmailData] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingRef, setLoadingRef] = useState(false);
  const [showPassword, setShowPassword]  = useState()

  function simulateNetworkRequest() {
    return new Promise((resolve) => setTimeout(resolve, 4000));
  }

  const router = useRouter();

  async function changePass(data) {
    try {
      const token = localStorage.getItem("token");
      console.log(token, "token is here");
      let res = await axios.post("/api/changePassword", { token: token, data });
      const resend = res.data;
      console.log(resend, "error");
      setLoadingRef(true);
      setIsLoading(true);
      notify(" Successfully changed password");
      setVerify(true);
      setErrorValid(false);

      setTimeout(() => {
        router.push("/dashboard");
      }, 3000);
    } catch (err) {
      console.log(err, "SomeThing Went Wrong");
      console.log(
        err.response.data.Error.status,
        "to check the status of the error"
      );
      const errorResponse = err.response.data.Error.status;
      console.log(errorResponse);
      if (errorResponse == 400) {
        notifyError("Invalid Otp");
      } else {
        if (errorResponse == 401) notifyError("Old password doesn't match");
      }
      setErrorValid(true);
    }
  }

  function onSubmitHandler(e) {
    e.preventDefault();
    var regularExpression =
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    const oldPassword = oldPasswordRef.current.value;
    const newPassword = newPasswordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;
    const otp = sendCodeRef.current.value;

    if (!oldPassword || !newPassword || !confirmPassword || !otp) {
      notifyError("Please fill the details.");
      setError("");
      return;
    }
    if (!(newPassword == confirmPassword)) {
      notifyError("Password doesn't match");
      setErrorValid(false);
      return;
    }

    if (oldPassword == newPassword) {
      notifyError("old password and new password cannot be same");
      return;
    }
    var regularExpression =
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

    if (!regularExpression.test(newPassword)) {
      setIsPasswordValid(true);
      setLoadingRef(false);
      setIsLoading(false);
      return false;
    }

    setIsPasswordValid(false);
    const data = {
      oldPassword,
      newPassword,
      confirmPassword,
      otp,
    };

    console.log(data, "form dt");
    setError(false);
    setErrorValid(false);

    if (!regularExpression.test(newPassword)) {
      setIsPasswordValid(true);
      setLoadingRef(false);
      setIsLoading(false);
      return false;
    }

    setIsPasswordValid(false);
    changePass(data);
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
    if (isLoading) {
      simulateNetworkRequest().then(() => {
        setLoadingRef(true);
      });
    }
  }, [isLoading]);

  const handleClick = () => setLoadingRef(false);

  async function passwordFill(data) {
    try {
      const token = localStorage.getItem("token");
      let res = await axios.post("/api/sendCode", { token:token,data });
      const record = res.data;
      console.log(record, "hii man");
      setEnterField(true);
      setIsLoading(true);
      notifyError("Please Check your credentials");
    } catch (err) {
      console.log(err, "hello");
      notify("Verification Code Sent");
    }
  }
  useEffect(() => {
    setEmailData(localStorage.getItem("email"));
  }, []);
  console.log(emailData, "email data");

  function onClickHandler() {
    const email = emailRef.current.value;

    if (!(email === emailData)) {
      notifyError("Please enter valid email");
      setErrorValid(false);

      return;
    }

    const data = {
      email,
    };

    setIsLoading(false);
    passwordFill(data);
  }

  return (
    <div className="new-dashboard">
      <SideBar />
      <section className="profile-sec profile-sects">
        <div className="container">
          <div className="row justify-content-center">
            <Navbar />
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
            <form
              className="input-sec"
              id="form-setting"
              onSubmit={onSubmitHandler}
            >
              <div className="line profile-line" id="ch-line"></div>
              <h3 className="heading-text pink-text mt-2 ">
                {/* <Link href={'/dashboard'}>
              <span  className="arrows-icon" style={{ position: "relative", left: "-21%", cursor:"pointer" }}  >
                    <img src={Arrow.src} />
                  </span>
                  </Link> */}
                Change Password
              </h3>

              <div className="input-item item-set mt-5">
                <h6 className="item-text">Email</h6>
                <input
                  autocomplete="false"
                  ref={emailRef}
                  required
                  className="textinput"
                  type="email"
                  defaultValue={emailData}
                  name="email"/>
              </div>

              <div className="input-item item-set">
                <h6 className="item-text">OLD PASSWORD</h6>
                <input
                  ref={oldPasswordRef}
                  required
                  className="textinput"
                  type= {showPassword?'text':"password"} 
                  name="password"
                />
                             <div className="show-part">
                <input onClick={()=>setShowPassword(!showPassword)}
 class="form-check-input mt-0" type="checkbox" value="" id="flexCheckChecked" for="toggle" />

                  <label
class="bg-gray-300 hover:bg-gray-400 rounded px-2 text-sm text-gray-600 font-mono cursor-pointer mb-0 pb-0"> {showPassword?'Hide':"Show Password"} </label>
</div>
              </div>

              <div className="input-item item-set mb-0">
                <h6 className="item-text">NEW PASSWORD</h6>
                <input
                  ref={newPasswordRef}
                  required
                  className="textinput"
                  type="password"
                  name="confirmpassword"
                />
                {isPasswordValid && (
                  <Alert style={{ margin: "0" }} variant={"danger"}>
                    Your password must be at least 8 characters long, should
                    contain at least one number or special character and have a
                    mixture of uppercase and lowercase letters.
                  </Alert>
                )}

                {/* {isValid && (<p style={{ color: "red" }}> Password doesn't match </p>)} */}
              </div>
              <div className="input-item item-set mb-0">
                <h6 className="item-text">CONFIRM PASSWORD</h6>
                <input
                  ref={confirmPasswordRef}
                  required
                  className="textinput"
                  type="password"
                  name="confirmpassword"
                />
                {/* {isValid && (<p style={{ color: "red" }}> Password doesn't match </p>)} */}
              </div>
              <div style={{ float: "left", width: "100%", marginTop: "10px" }}>
                <p
                  style={{
                    margin: "0",
                    fontSize: "15px",
                    marginTop: "15px",
                    color: "white",
                  }}
                >
                  Click SEND CODE, check your inbox, enter the verification code
                  below and click continue.
                </p>
              </div>
              <div
                className="name-sec mb-5 mt-0"
                style={{ marginTop: "10px !important" }}
              >
                <div
                  className="input-item item-set mt-0"
                  id="item-value"
                  style={{
                    marginRight: "10px",
                    display: "flex",
                    marginTop: "0px !important",
                  }}
                >
                  <input
                    className="textinput w-50"
                    autoComplete="off"
                    type="number"
                    name="otp"
                    style={{ borderRadius: " 10px 0 0 10px !important" }}
                    ref={sendCodeRef}
                  />
                  <button
                    type="button"
                    disabled={isLoading}
                    onClick={onClickHandler}
                    className="btn btn-roundes  btn- w-50   "
                    style={{}}
                  >
                    Send Code
                  </button>
                </div>
              </div>

              {error && (
                <p style={{ color: "red" }}> Password doesn't match </p>
              )}
              {errorValid && <p style={{ color: "red" }}>Invalod OTP</p>}
              {verify && (
                <p style={{ color: "green" }}>
                  {" "}
                  Successfully changed password{" "}
                </p>
              )}

              <Button
                variant="primary"
                className="btn btn-round btn-warning w-100 "
                style={{ marginTop: "0px", marginBottom: "0px" }}
                type="submit"
                disabled={isLoading}
                onClick={!isLoading ? handleClick : null}
              >
                {isLoadingRef ? "Loading…" : "     UPDATE"}
              </Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ChangePassword;
