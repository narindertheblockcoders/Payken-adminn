import React from "react";
// import Heart from "../public/Heart.svg";
import { useRef, useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { signIn } from "next-auth/react";
import { Router, useRouter } from "next/router";
import { Button } from "react-bootstrap";
import Link from "next/link";

  function simulateNetworkRequest() {
    return new Promise((resolve) => setTimeout(resolve, 4000));
  }


const Login = () => {

const router = useRouter();
const emailInputRef = useRef();
const passwordInputRef = useRef();
const [isLoading, setIsLoading]= useState(false)
const [isLoadingRef, setLoadingRef]= useState(false)
const [showPassword, setShowPassword] = useState(false)




async function loginPage(data) {
  try {
    let res = await axios.post("/api/login", data);
    const response = res.data;
    console.log(response, "to check the data from api");
    localStorage.setItem("token", response.data)
    toast.success("Admin Registered Successfully");
      setIsLoading(true);
      setLoadingRef(true);
    // setTimeout(() => { 
      router.push("/dashboard");
    // }, 1000);
  } catch (err) {
    console.log(err, err);
            
    const errorMsg = err.response.data.Error.status;
    if(errorMsg == '400'){
      toast.error('Please check email')
  
      setIsLoading(false);
      setLoadingRef(false);
      return;
    }

    if(errorMsg == '401') {
      notifyError('Please check password')

      setIsLoading(false);
      setLoadingRef(false);
 
      return;
    }
    // toast.error("User Not Found");
    setIsLoading(false);
    setLoadingRef(false);
  
  }
}

async function formSubmitHandler(event){
  event.preventDefault();

  const email = emailInputRef.current.value;
  const password = passwordInputRef.current.value;

  localStorage.setItem("email", email)

  const data = {
    email, 
    password
   
  };

  console.log(data,"data entered by the use");
  loginPage(data);
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
          setLoadingRef(false);
        });
      }
    }, [isLoading]);
  
    const handleClick = () => setLoadingRef(false);
  
  return (
    <div>
      <section className="profile-sec ">
        <div className="container">
          <div className="row justify-content-center">
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
              className="input-sec input-top p-0"
              id="bar-top"
              onSubmit={formSubmitHandler}
            >
              <div className="input-line iptset-line" id="index-line"></div>
              <div className="p-3">
                <h3 className="heading-text mt-3">  LOGIN</h3>
                <p style={{ fontSize: "13px", paddingTop: "7px", margin: "0", color: "white" }}>
                  {" "}
                  Buy and Join our global Community.
                </p>

                <div className="input-item">              

                  <h6 className="item-text">EMAIL</h6>
                  <input
                    className="textinput"
                    type="email"
                    name="username"
                    ref={emailInputRef}
                    autoComplete="on"
                  />
                </div>

                <div
                  className="input-item"
                  style={{ marginTop: "25px", marginBottom: "10px" }}
                >
                  <h6 className="item-text">PASSWORD</h6>
                  <input
                    className="textinput"
                    type={showPassword?'text':'password'} 
                    name="last-name"
                    ref={passwordInputRef}
                    autoComplete="on"
                    
                  /> 
                
                <div className="show-part">
                <input onClick={()=>setShowPassword(!showPassword)}
 class="form-check-input mt-0" type="checkbox" value="" id="flexCheckChecked" for="toggle" />

                  <label
class="bg-gray-300 hover:bg-gray-400 rounded px-2 text-sm text-gray-600 font-mono cursor-pointer mb-0 pb-0" >{showPassword?'hide':' Show Password'}</label>
</div>
                </div>
                <div style={{color:'white',marginBottom:'35px',textAlign:'left',fontSize:'14px'}}>
                    Your password must be at least 8 characters long, should
                    contain at least one number and special character have a
                    mixture of uppercase and lowercase letters.
                </div>
                {/* {error && (
                  <p style={{ color: "red", margin: "0", fontSize: "15px" }}>
                    {" "}
                    User doesn't Exist. Please try again or signup below.{" "}
                  </p>
                )}
                {verify && (
                  <p style={{ color: "green", margin: "0", fontSize: "15px" }}>
                    {" "}
                    LoggedIn Successfully.{" "}
                  </p>
                )} */}


                <Button
                  variant="primary"
                  className="btn btn-round btn-warning w-100 p-0 "
                  style={{ marginTop: "5px" }}
                  type="submit"
                  disabled={isLoading}
                  
                >
                  {isLoadingRef ? "Loading…" : "   LOGIN"}
                </Button>

                <p className="by-text mb-0">
                  {" "}
                  By continuing you agree to our cookie policy.
                </p>
                <Link href={"/emailVerify"}>
                  <p
                    className="by-text"
                    style={{
                      cursor: "pointer",
                      marginTop: "5px",
                      fontSize: "13px",
                      color: "#2990DF",
                    }}
                  >
                    {" "}
                  </p>
                </Link>
              </div>
              <div className="para-set ">
                <Link href={"/"}>
                  <p className="iptpara-text">
                    Are you new here?{" "}
                    <a
                      href="home-page.html"
                      style={{
                        fontWeight: "bold",
                        fontSize: "13px",
                        color: "#fff",
                      }}
                    >
                      Sign Up
                    </a>
                  </p>
                </Link>
              </div>
            </form>
          </div>
        </div>
       
      </section>
    </div>
  );
};

export default Login;
