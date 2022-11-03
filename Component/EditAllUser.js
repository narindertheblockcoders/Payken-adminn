import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "react-bootstrap/Button";
import SideBar from "./SideBar";
import Navbar from "./ui/Navbar";
import { signOut, useSession } from "next-auth/react";


function simulateNetworkRequest() {
  return new Promise((resolve) => setTimeout(resolve, 4000));
}

const EditAllUser = () => {
  

  const firstNameInputRef = useRef();
  const lastNameInputRef = useRef();
  const [email, setEmail] = useState(false);
  const [firstName, setFirstName] = useState(false);
  const [lastName, setLastName] = useState(false);

  const [error, setError] = useState(false);
  const [verify, setVerify] = useState(false);
  const [tokenData, setTokenData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingRef, setLoadingRef] = useState(false);
  const [image1, setImage1] = useState();
  const [showImage1, setShowImage1] = useState();

  const router = useRouter();


  function simulateNetworkRequest() {
    return new Promise((resolve) => setTimeout(resolve, 4000));
  }

  async function getUserStatus() {
    try {
      let res = await axios.post("/api/getuserid");
      const response = res.data;
      setTokenData(response.data.data);
      setEmail(response.data.data.email);
      setFirstName(response.data.data.firstName);
      setLastName(response.data.data.lastName);
    } catch (err) {
      console.log(err);
      setLoadingRef(false);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getUserStatus();
  }, []);

  // async function updateUserStatus (data) {
  //   try {
  //     let res = await axios.post ("/api/updateUserStatus");
  //     const response = res.data;
  //     console.log(response, "to get response from api to update user status");
  //   }catch (err) {
  //     console.log(err)
  //   }
  // }

  async function formSubmitHandler(event) {
    event.preventDefault();

    const firstName = firstNameInputRef.current.value;
    const lastName = lastNameInputRef.current.value;

    const formData = new FormData();

    formData.append("email", email);
    formData.append("firstName", firstName);
    formData.append("lastName",lastName);
    formData.append("avatar", image1);

    console.log(image1, "to check the first image");
    console.log([...formData], "to get the data of formData");

    for (const pair of formData.entries()) {
      console.log(`${pair[0]}, $pair[1]`);
    }

    console.log(formData, "to check the data entered by the user");

    try {
      var config = {
        method: "post",
        url: "http://52.45.20.15:4000/api/v1/image/avatar",
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${props.token.name}`,
        },
        data: formData,
      };
      await axios(config).then(function (response) {
        console.log(JSON.stringify(response.data.data));
        toast.success("User Profile Updated Successfully");
        setTimeout(() => {
          router.push ("/dashboard")
        }, 500);
        // res.status(200).json({ data: response.data});
      });
    } catch (err) {
      console.log(err);
      toast.error("Something Went Wrong");
      // res.status(500).json({ Error: err });
    }
  }

  function uploadImage(event) {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setImage1(event.currentTarget.files[0]);
      setShowImage1(URL.createObjectURL(img));
    }
  }

  useEffect(() => {
    if (isLoading) {
      simulateNetworkRequest().then(() => {
        setLoadingRef(true);
      });
    }
  }, [isLoading]);

  const handleClick = () => setLoadingRef(false);

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
                <img className="stier-logo" src="/navbar/white-logo.png"></img>

                <div className="input-item">
                  <h6 className="item-text"> EMAIL</h6>
                  <div
                    className="input-group height-set flex-nowrap mt-0 "
                    id="mb-set"
                  >
                    <input
                      type="email"
                      className="form-control form-border"
                      defaultValue={email}
                      disabled
                      aria-label="Username"
                      aria-describedby="addon-wrapping"
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
                      className="form-control form-border"
                      defaultValue={firstName}
                      aria-label="Username"
                      aria-describedby="addon-wrapping"
                      onChange={(e) => setFirstName(e.currentTarget.value)}
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
                      className="form-control form-border"
                      defaultValue={lastName}
                      autoComplete="none"
                      aria-label="Username"
                      aria-describedby="addon-wrapping"
                      onChange={(e) => setLastName(e.currentTarget.value)}

                    />
                  </div>
                </div>

                <div className="input-item " style={{ marginTop: "50px" }}>
                  <h6 className="item-text">Refferal Code</h6>
                  <div
                    className="input-group height-set flex-nowrap mt-0"
                    id="mb-set"
                  >
                    <input
                     ref={lastNameInputRef}
                      type="text"
                      className="form-control form-border"
                      defaultValue={lastName}
                      autoComplete="none"
                      aria-label="Username"
                      aria-describedby="addon-wrapping"
                      onChange={(e) => setLastName(e.currentTarget.value)}

                    />
                  </div>
                </div>

                <div className="input-item " style={{ marginTop: "50px",marginBottom: '50px' }}>
                  <h6 className="item-text">Position</h6>
                  <div
                    className="input-group height-set flex-nowrap mt-0"
                    id="mb-set"
                  >
                    <input
                     ref={lastNameInputRef}
                      type="text"
                      className="form-control form-border"
                      defaultValue={lastName}
                      autoComplete="none"
                      aria-label="Username"
                      aria-describedby="addon-wrapping"
                      onChange={(e) => setLastName(e.currentTarget.value)}

                    />
                  </div>
                </div>

              

                <div>               
                <Button
                  variant="primary"
                  className="btn btn-round btn-warning w-100 "
                  style={{ marginTop: "0px", marginBottom: "20px"  }}
                  type="submit"
                  disabled={isLoading}
                  onClick={!isLoading ? handleClick : null}
                >
                  {isLoadingRef ? "Loading…" : "Update"}
                </Button>

                <Button
                  variant="primary"
                  className="btn btn-round btn-warning w-100 "
                  style={{ marginTop: "0px", marginBottom: "20px" }}
                  type="submit"
                  disabled={isLoading}
                  onClick={!isLoading ? handleClick : null}
                >
                  {isLoadingRef ? "Loading…" : "     Delete"}
                </Button>
                </div> 
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EditAllUser;
