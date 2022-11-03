import Link from "next/link";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { signOut } from "next-auth/react";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/router";
import SideBar from "./SideBar";
import Navbar from "./ui/Navbar";


const NewDashboard = () => {
  const [totalUser, setTotalUser] = useState();
  const [totalSale, setTotalSale] = useState();
  const [scImplemented, setScImplemented] = useState(null);
  const [directIncome, setDirectIncome] = useState(null);
  const [rocMatchingIncome, setROCMatchingIncome] = useState(null);
  const [totalTickets, setTotalTickets] = useState(null);
  const [matchingIncome, setMatchingIncome] = useState();
  const [userInfo, setUserInfo] = useState();
  const router = useRouter();
  const [amounts, setAmounts] = useState();
  const [trueStatus, setTrueStatus] = useState();
  const [settings, setSetting] = useState(null);
  const [isLoadingRef, setLoadingRef] = useState(false);
  const [investmentAmt, setInvestmentAmt] =useState(null)
const [earningAmt, setEarningAmt] =useState(null)

  // async function getUserStatus() {
  //   try {
  //     const token = localStorage.getItem("token");
  //     let res = await axios.post("/api/getuserid", { token: token });
  //     const response = res.data;
   
  //     // console.log(res.data, "here for you");
  //     setUserInfo(response.data.data);
  //     setTrueStatus(response.data.data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }
  // console.log(investmentAmt,'investment')
  // console.log(earningAmt,'erningAmt')



  async function getDashboardData() {
    try {
      const email = localStorage.getItem("email");
      const token=localStorage.getItem('token')
      let res = await axios.post("/api/newDashboard", {email,token});
      const response = res.data.data;
      console.log(response,"response dashboard")
      setTotalUser(response.totalUser[0].totalUser)
      setTotalSale(response.totalSale[0].totalSale)
      setScImplemented(response.scImplemented[0].smartContract)
      setDirectIncome(response.directincome[0].directincome)
      setROCMatchingIncome(response.rocmatchingincome[0].rocmatchingincome)
      setTotalTickets(response.totaltickets[0].totaltickets)
      setMatchingIncome(response.matchingincome[0].matchingincome)
      // console.log(response, "new");
      //setIncome(res.data.data);
      //setInvestmentAmt(response.myInvestment)
      //setEarningAmt(response.totalEarnings)

      // setAmounts(response.data.data.income)
      //setSetting(res.data.data.sum?.amount);
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    console.log(settings);
  }, [settings]);



  // async function getDirectIncome() {
  //   try {
  //     const token = localStorage.getItem("token");
  //     let res = await axios.post("/api/getDirectIncome", { token: token });
  //     const response = res.data;
  //     console.log(response,"to get dat")
  //     setIncome(res.data.data);


  //     setAmounts(response.data.data.income);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }



  useEffect(() => {
    //getUserStatus();
    getDashboardData();
    // getDirectIncome()
  }, []);

  async function createwallet(e) {
    e.preventDefault();
    try {
      setLoadingRef(true);

      let res = await axios.post("/api/wallet");
      router.push("/wallet");
    } catch (err) {
      console.log(err);

      setLoadingRef(false);
    }
  }


  // useEffect(()=>{


  // },[])



  function logoutHandler() {
    window.localStorage.clear();
    signOut();
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

  async function popSubmit() {
    // router.push("/activateWallet")
  }

  return (
    <div className="new-dashboard">
      <SideBar />
      <section className="profile-sec profile-sects">
        <div className="container">
          <div className="row">
            <Navbar />
            <form className="funds-sec">
              <h3>
                {" "}
                {/* <span
                  style={{
                    color: "#04031c!important",
                    fontWeight: "600",
                  }}
                >
                  {" "}
                  Welcome {userInfo?.firstName} !{" "}
                </span>{" "} */}
              </h3>

              <div
                className="left-dashboard  first-set mt-1"
                id="leftt-section"
              >
                {" "}
                <h5>Global 2022-Registration</h5>
                {/* <div className="lr-sec">
                        </div> */}
              </div>

              {/* {/ <Link href={"/withdrawInfo"}> /} */}

              {/* {/ </Link> /} */}

              <ToastContainer />

              <div className="col-head mt-1 " id="col-head">
                <h6 className="mt-2 mb-4" style={{ fontSize: "14px" }}>
                  {" "}
                </h6>

                <div className="col-md-12 left-headSec">
                  <div
                    className="link-head  "
                    id="first-sec"
                    style={{ justifyContent: "space-between" }}
                  >
                    {/* <Link href={"/activateWallet"}> */}
                    {/* {trueStatus?( */}

                    {/* <div className="link-dashboard  first-set" id="first-item" >
                        {" "}
                        <h6 className="dashboard-txt "> ACTIVATED</h6>
                         <p className="dashboard-txts"> {amounts}</p>
                      </div> */}

                    {/* ):  */}

                    <Link href={"/totalUsers"}>
                      <div
                        className="link-dashboard  first-set"
                        id="lr-section"
                      >
                        {" "}
                        <i
                          className="fa-sharp fa-solid fa-sack-dollar"
                          id="dashboard-icons"
                        ></i>
                        <p className="dashboard-txts">
                          {" "}
                          {totalUser}
                        </p>
                        <h6 className="dashboard-txt">  COUNTER OF USERS</h6>
                      </div>
                    </Link>

                    <Link href='/saleAdmin' data-toggle="modal" data-target="#exampleModalCenter">
                    <div
                      onClick={popSubmit}
                      className="link-dashboard  first-set"
                      id="firstet-item">
                      <i
                        className="fa-solid fa-arrow-up-from-ground-water"id="dashboard-icons"></i>
                      <p className="dashboard-txts"> {totalSale}</p>
                      <h6 className="dashboard-txt "> TOTAL SALE</h6>
                    </div>
                    </Link>

                    <Link href={"/scImplemented"}>
                      <div
                        className="link-dashboard first-set"
                        id="invest-item"
                      >
                        <i
                          className="fa-solid fa-hand-holding-dollar"
                          id="dashboard-icons"
                        ></i>
                        <p className="dashboard-txts">
                          {scImplemented}
                        </p>
                        <h6 className="dashboard-txt"> ALL SC IMPLEMENTED</h6>
                        {/* <p className="dashboard-txts"> {income?.balance.roi}%</p> */}
                      </div>
                    </Link>

                    <Link href="/merchantCount">
                      <div
                        className="link-dashboard first-set"
                        id="faquery-item"
                      >
                        <i
                          className="fa-solid fa-hand-holding-dollar"
                          id="dashboard-icons"
                        ></i>
                        <p className="dashboard-txts">
                          {" "}
                          {}
                        </p>
                        <h6 className="dashboard-txt">MERCHANT COUNT </h6>
                      </div>
                    </Link>

                    {/* <Link href="/totalWithdraws">
                      <div className="link-dashboard" id="teams-item">
                        <i
                          className="fa fa-filter-circle-dollar"
                          id="dashboard-icons"
                        ></i>
                        <p className="dashboard-txts"> ${totalWithdraw}</p>
                        <h6 className="dashboard-txt">MERCHANT COUNT </h6>
                        {/* <p className="dashboard-txts"> {income?.balance.amount}</p> */}
                      {/* </div>
                    </Link>  */}
                     <Link href={"/directIncome"}>
                       <div className="link-dashboard  first-set" id="teams-item" >
                         {" "}
                      <i className="fa-solid fa-users" id="dashboard-icons"></i>
                       <p className="dashboard-txts">${directIncome}</p>
                      <h6 className="dashboard-txt "> DIRECT INCOME</h6>
                      </div>
                      </Link>

                      <Link href={"/allMatchingIncome"}>
                       <div className="link-dashboard  first-set" id="teams-item" >
                         {" "}
                      <i className="fa-solid fa-users" id="dashboard-icons"></i>
                       <p className="dashboard-txts">${matchingIncome}</p>
                      <h6 className="dashboard-txt "> MATCHING INCOME</h6>
                      </div>
                      </Link>

                    <Link href={"/totalRocMatchingIncome"}>
                      <div className="link-dashboard  first-set" id="teams-item" >
                        {" "}
                        <i className="fa-solid fa-users" id="dashboard-icons"></i>
                        <p className="dashboard-txts">${rocMatchingIncome}</p>
                        <h6 className="dashboard-txt "> ROC MATCHING INCOME</h6>
                      </div>
                    </Link>

                    <Link href="/allTickets">
                      <div className="link-dashboard" id="third-itemes">
                        <i
                          className="fa-solid fa-users-between-lines"
                          id="dashboard-icons"
                        ></i>
                         <p className="dashboard-txts">{totalTickets}</p>
                        <h6 className="dashboard-txt">  SUPPORTED TICKET</h6>
                      </div>
                      </Link>
                  </div>
                </div>

                <div className="col-md-3"></div>
              </div>
            </form>

        
      </div>
    </div>
    </section>
    </div>
  )}
export default NewDashboard;


  /* <section className="profile-sec">
        <div className="container">
          <div className="row justify-content-center">
            <form
              className="input-sec  payment-form "
              id="form-pay"
              style={{ width: "35%", padding: "30px" }}
            >
              <div className="heading-parts">
                <h3
                  className="order-text"
                  style={{ textAlign: "left !important", paddingLeft: "25px" }}
                >
                  DASHBOARD
                </h3>
              </div>

              <div className="input-line   link-line"></div>
              <div className="link-head ">
                <Link href={"/userProfile"}>
                  <div className="link-item">PROFILE</div>
                </Link>

                <div className="link-item" id="first-item">
                  ENABLE 2FA
                </div>
                <Link href={"/funds"}>
                  <div className="link-item" id="first-item">
                    FUNDS
                  </div>
                </Link>

                <div className="link-item" id="second-item">
                  CHANGE PASSWORD
                </div>
                <Link href={"/buy"}>
                  <div className="link-item" id="third-item">
                    BUY TOKEN
                  </div>
                </Link>
                <div className="link-item" id="third-item">
                  TOKEN
                </div>
              </div>
            </form>
          </div>
        </div>
      </section> */
                      
