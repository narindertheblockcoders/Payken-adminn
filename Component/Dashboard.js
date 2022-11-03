import Link from "next/link";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { signOut } from "next-auth/react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/router";
import Button from "react-bootstrap/Button";
import SideBar from "./SideBar";
import Spinner from "react-bootstrap/Spinner";
import Navbar from "./ui/Navbar";

// const dashboard = () => {
//   const [usdAmt, setUsdAmt] = useState();
//   const [name, setName] = useState(null);
//   const [myBv, setMyBv] = useState(null);
//   const [myRew, setMyRew] = useState(null);
//   const [isAddressAvailable, setIsAddressAvailable] = useState(null);
//   const [income, setIncome] = useState();
//   const [userInfo, setUserInfo] = useState();
//   const router = useRouter();
//   const [amounts, setAmounts] = useState();
//   const [trueStatus, setTrueStatus] = useState();
//   const [settings, setSetting] = useState(null);
//   const [isLoadingRef, setLoadingRef] = useState(false);

//   async function getUserStatus() {
//     try {
//       const token = localStorage.getItem("token");
//       let res = await axios.post("/api/getuserid", { token: token });
//       const response = res.data;
//       console.log(res.data, "here for you");
//       setUserInfo(response.data.data);
//       setTrueStatus(response.data.data.activate);
//     } catch (err) {
//       console.log(err);
//     }
//   }

//   async function getDashboardData() {
//     try {
//       const token = localStorage.getItem("token");
//       let res = await axios.post("/api/newDashboard", { token: token });
//       const response = res.data.data;
//       setIncome(res.data.data);
//       // setAmounts(response.data.data.income)
//       setSetting(res.data.data.sum?.amount);
//       console.log(response, "new");
//     } catch (err) {
//       console.log(err);
//     }
//   }
//   useEffect(() => {
//     console.log(settings);
//   }, [settings]);
//   async function getDirectIncome() {
//     try {
//       const token = localStorage.getItem("token");
//       let res = await axios.post("/api/getDirectIncome", { token: token });
//       const response = res.data.data;
//       setIncome(res.data.data);
//       setAmounts(response.data.data.income);
//     } catch (err) {
//       console.log(err);
//     }
//   }

//   useEffect(() => {
//     getUserStatus();
//     getDashboardData();
//     // getDirectIncome()
//   }, []);

//   async function createwallet(e) {
//     e.preventDefault();
//     try {
//       setLoadingRef(true);

//       let res = await axios.post("/api/wallet");
//       router.push("/wallet");
//     } catch (err) {
//       console.log(err);

//       setLoadingRef(false);
//     }
//   }

//   function logoutHandler() {
//     window.localStorage.clear();
//     signOut();
//   }
//   const notify = (msg) =>
//     toast.success(msg, {
//       position: "top-right",
//       autoClose: 5000,
//       hideProgressBar: false,
//       closeOnClick: true,
//       pauseOnHover: true,
//       draggable: true,
//       progress: undefined,
//     });

//   const notifyError = (msg) =>
//     toast.error(msg, {
//       position: "top-right",
//       autoClose: 5000,
//       hideProgressBar: false,
//       closeOnClick: true,
//       pauseOnHover: true,
//       draggable: true,
//       progress: undefined,
//     });

//   async function popSubmit() {
//     // router.push("/activateWallet")
//   }

//   return (
//     <div className="new-dashboard">
//       <SideBar />
//       <section className="profile-sec profile-sects">
//         <div className="container">
//           <div className="row">
//             <Navbar />
//             <form className="funds-sec">
//               <h3>
//                 {" "}
//                 {/* <span
//                   style={{
//                     color: "#04031c!important",
//                     fontWeight: "600",
//                   }}
//                 >
//                   {" "}
//                   Welcome {userInfo?.firstName} !{" "}
//                 </span>{" "} */}
//               </h3>

//               <div
//                 className="left-dashboard  first-set mt-1"
//                 id="leftt-section"
//               >
//                 {" "}
//                 <h5>Global 2022-Registration</h5>
//                 {/* <div className="lr-sec">
//                         </div> */}
//               </div>

//               {/* {/ <Link href={"/withdrawInfo"}> /} */}

//               {/* {/ </Link> /} */}

//               <ToastContainer />

//               <div className="col-head mt-1 " id="col-head">
//                 <h6 className="mt-2 mb-4" style={{ fontSize: "14px" }}>
//                   {" "}
//                 </h6>

//                 <div className="col-md-12 left-headSec">
//                   <div
//                     className="link-head  "
//                     id="first-sec"
//                     style={{ justifyContent: "space-between" }}
//                   >
//                     {/* <Link href={"/activateWallet"}> */}
//                     {/* {trueStatus?( */}

//                     {/* <div className="link-dashboard  first-set" id="first-item" >
//                         {" "}
//                         <h6 className="dashboard-txt "> ACTIVATED</h6>
//                          <p className="dashboard-txts"> {amounts}</p>
//                       </div> */}

//                     {/* ):  */}

//                     <Link href={"/teamCount"}>
//                       <div
//                         className="link-dashboard  first-set"
//                         id="lr-section"
//                       >
//                         {" "}
//                         <i
//                           className="fa-sharp fa-solid fa-sack-dollar"
//                           id="dashboard-icons"
//                         ></i>
//                         <p className="dashboard-txts">
//                           {" "}
//                           ${}
//                         </p>
//                         <h6 className="dashboard-txt"> TOTAL USERS</h6>
//                       </div>
//                     </Link>

//                     {/* <Link href={"/activateWallet"} data-toggle="modal" data-target="#exampleModalCenter"> */}
//                     <div
//                       onClick={popSubmit}
//                       className="link-dashboard  first-set"
//                       id="firstet-item"
//                       data-bs-toggle="modal"
//                       href="#exampleModalToggle"
//                     >
//                       <i
//                         className="fa-solid fa-arrow-up-from-ground-water"
//                         id="dashboard-icons"
//                       ></i>
//                       <p className="dashboard-txts"> $0.00</p>
//                       <h6 className="dashboard-txt "> TOP UP</h6>
//                     </div>
//                     {/* </Link> */}

//                     <Link href={"/directIncome"}>
//                       <div
//                         className="link-dashboard first-set"
//                         id="invest-item"
//                       >
//                         <i
//                           className="fa-solid fa-hand-holding-dollar"
//                           id="dashboard-icons"
//                         ></i>
//                         <p className="dashboard-txts">
//                           ${income?.totalEarnings}
//                         </p>
//                         <h6 className="dashboard-txt"> EARNING </h6>
//                         {/* <p className="dashboard-txts"> {income?.balance.roi}%</p> */}
//                       </div>
//                     </Link>

//                     <Link href="/directIncome">
//                       <div
//                         className="link-dashboard first-set"
//                         id="faquery-item"
//                       >
//                         <i
//                           className="fa-solid fa-hand-holding-dollar"
//                           id="dashboard-icons"
//                         ></i>
//                         <p className="dashboard-txts">
//                           {" "}
//                           ${income?.directIncome}
//                         </p>
//                         <h6 className="dashboard-txt"> DIRECT INCOME </h6>
//                       </div>
//                     </Link>

//                     <Link href="/withdrawInfo">
//                       <div className="link-dashboard" id="teams-item">
//                         <i
//                           className="fa fa-filter-circle-dollar"
//                           id="dashboard-icons"
//                         ></i>
//                         <p className="dashboard-txts"> ${income?.balance}</p>
//                         <h6 className="dashboard-txt"> WALLET </h6>
//                         {/* <p className="dashboard-txts"> {income?.balance.amount}</p> */}
//                       </div>
//                     </Link>

//                     <button type="submit" style={{ backgroundColor: "#fff" }} className="link-dashboard first-set" id="teams-item" onClick={(e) => createwallet(e)} >
//                       {isLoadingRef ? (
//                         <div>
//                           <Spinner animation="border" variant="warning" />
//                         </div>
//                       ) : (
//                         <div className="funds-btnse">
//                           <i className="fa-solid fa-wallet" id="dashboard-icons"></i>
//                         <p className="dashboard-txts"> $0.00</p>
//                           <h6 className="dashboard-txt"> ADD FUNDS</h6>
//                         </div>
//                       )}
//                     </button>

//                     <Link href={"/teamCount"}>
//                       <div className="link-dashboard  first-set" id="teams-item" >
//                         {" "}
//                         <i className="fa-solid fa-users" id="dashboard-icons"></i>
//                         <p className="dashboard-txts">{income?.totalDirects}</p>
//                         <h6 className="dashboard-txt "> TEAM {myBv}</h6>
//                       </div>
//                     </Link>

//                     {userInfo?.fa ? (
//                       <Link href={"/2fa"}>
//                         <div
//                           className="link-dashboard  first-set"
//                           id="third-item"
//                         >
//                           {" "}
//                           <i className="fa-solid fa-address-card" id="dashboard-icons" ></i>
//                           <h6 className="dashboard-txt "> 2FA {myBv}</h6>
//                           <p className="dashboard-txts"> Enabled</p>
//                         </div>
//                       </Link>
//                     ) : (
//                       <Link href={"/2fa"}>
//                         <div
//                           className="link-dashboard  first-set"
//                           id="third-item"
//                         >
//                           {" "}
//                           <i
//                             className="fa-solid fa-address-card"
//                             id="dashboard-icons"
//                           ></i>
//                           <h6 className="dashboard-txt "> 2FA {myBv}</h6>
//                         </div>
//                       </Link>
//                     )}

//                     <Link href={"/leftCount"}>
//                       <div className="link-dashboard  " id="third-item">
//                         {" "}
//                         <i
//                           className="fa fa-hand-point-left"
//                           id="dashboard-icons"
//                         ></i>
//                         <p className="dashboard-txts">{income?.leftPv}</p>
//                         <h6 className="dashboard-txt"> LEFT PV</h6>
//                       </div>
//                     </Link>
//                     <Link href="/rightCount">
//                       <div className="link-dashboard" id="third-item">
//                         <i
//                           className="fa fa-hand-point-right"
//                           id="dashboard-icons"
//                         ></i>

//                         <p className="dashboard-txts">{income?.rightPv}</p>
//                         <h6 className="dashboard-txt"> RIGHT PV</h6>

//                         {/* {/ TOKEN /} */}
//                       </div>
//                     </Link>

//                     <Link href="/binaryIncome">
//                       <div className="link-dashboard" id="third-item">
//                         <i
//                           className="fa-solid fa-users-between-lines"
//                           id="dashboard-icons"
//                         ></i>
//                         <h6 className="dashboard-txt"> GENEALOGY</h6>
//                       </div>
//                     </Link>

//                     <Link href="/directIncome">
//                       <div className="link-dashboard first-set" id="third-item">
//                         <i
//                           className="fa fa-hands-holding-circle"
//                           id="dashboard-icons"
//                         ></i>
//                       <p className="dashboard-txts"> $0.00</p>
//                         <h6 className="dashboard-txt"> REWARDS</h6>
//                         {/* <p className="dashboard-txts"> $ 
//                         {income?.directIncome}
//                         </p> */}
//                       </div>
//                     </Link>
//                   </div>
//                 </div>

//                 <div className="col-md-3"></div>
//               </div>

//               <div className="left-dashboard  " id="lr-id">
//                 {" "}
//                 <h5>Reffaral Code</h5>
//                 <div className="lr-sec">
//                   <h6 className="dashboard-txt">
//                     {/* Left Link: */}
//                     <span className="left-url">
//                       http://app.stierworld.us/?leftref=$
//                       {userInfo?.leftReferralCode}
//                       <CopyToClipboard
//                         // style={{ marginLeft: "15px" }}
//                         text={`http://app.stierworld.us/?leftRef=${userInfo?.leftReferralCode}`}
//                         onCopy={() => {
//                           notify("Copied Successfully");
//                         }}
//                       >
//                         <img
//                           style={{ marginLeft: "10px", cursor: "pointer" }}
//                           src={"/others/mdi.png"}
//                         />
//                       </CopyToClipboard>
//                     </span>
//                   </h6>
//                   <p className="dashboard-txt">
//                     {/* Right Link  */}
//                     <span className="right-url">
//                       http://app.stierworld.us/?rightref=$
//                       {userInfo?.rightReferralCode}
//                       <CopyToClipboard
//                         // style={{ marginLeft: "15px" }}
//                         text={`http://app.stierworld.us/?rightRef=${userInfo?.rightReferralCode}`}
//                         onCopy={() => {
//                           notify("Copied Successfully");
//                         }}
//                       >
//                         <img
//                           style={{ marginLeft: "0px", cursor: "pointer" }}
//                           src={"/others/mdi.png"}
//                         />
//                       </CopyToClipboard>
//                     </span>
//                   </p>
//                 </div>
//               </div>
//             </form>

//             {/* <!-- ======= Skills Section ======= --> */}
//             <section id="skills" className="skills section-bg">
//               <div className="container">
//                 {/* <div className="section-title">
//           <h2>Skills</h2>
//           <p>Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex aliquid fuga eum quidem. Sit sint consectetur velit. Quisquam quos quisquam cupiditate. Et nemo qui impedit suscipit alias ea. Quia fugiat sit in iste officiis commodi quidem hic quas.</p>
//         </div> */}

//                 <div className="row skills-content">
//                   <div className="col-lg-6" id="col-left" data-aos="fade-up">
//                     <div className="progress">
//                       <span className="skill">
//                         MAX REWARDS <i className="val">$0</i>
//                       </span>
//                       <div className="progress-bar-wrap">
//                         <div
//                           className="progress-bar w-0"
//                           role="progressbar"
//                           aria-valuenow="100"
//                           aria-valuemin="0"
//                           aria-valuemax="100"
//                         ></div>
//                       </div>
//                     </div>

//                     <div className="progress">
//                       <span className="skill">
//                         RECEIVED REWARDS <i className="val">$0</i>
//                       </span>
//                       <div className="progress">
//                         <div
//                           className="progress-bar w-0"
//                           role="progressbar"
//                           aria-valuenow="75"
//                           aria-valuemin="0"
//                           aria-valuemax="100"
//                         ></div>
//                       </div>
//                     </div>

//                     <div className="progress">
//                       <span className="skill">
//                         PENDING REWARDS <i className="val">$0</i>
//                       </span>
//                       <div className="progress-bar-wrap">
//                         <div
//                           className="progress-bar w-0"
//                           role="progressbar"
//                           aria-valuenow="75"
//                           aria-valuemin="0"
//                           aria-valuemax="100"
//                         ></div>
//                       </div>
//                     </div>
//                   </div>

//                   <div
//                     className="col-lg-6"
//                     id="col-right"
//                     data-aos="fade-up"
//                     data-aos-delay="100"
//                   >
//                     <div className="progress">
//                       <span className="skill">
//                         TEAM A <i className="val">0%</i>
//                       </span>
//                       <div className="progress-bar-wrap">
//                         <div
//                           className="progress-bar w-0"
//                           role="progressbar"
//                           aria-valuenow="80"
//                           aria-valuemin="0"
//                           aria-valuemax="100"
//                         ></div>
//                       </div>
//                     </div>

//                     <div className="progress">
//                       <span className="skill">
//                         TEAM B <i className="val">0%</i>
//                       </span>
//                       <div className="progress-bar-wrap">
//                         <div
//                           className="progress-bar w-0"
//                           role="progressbar"
//                           aria-valuenow="60"
//                           aria-valuemin="0"
//                           aria-valuemax="100"
//                         ></div>
//                       </div>
//                     </div>

//                     <div className="progress">
//                       <span className="skill">
//                         TEAM C <i className="val">0%</i>
//                       </span>
//                       <div className="progress-bar-wrap">
//                         <div
//                           className="progress-bar w-0"
//                           role="progressbar"
//                           aria-valuenow="90"
//                           aria-valuemin="0"
//                           aria-valuemax="100"
//                         ></div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </section>
//             {/* <!-- End Skills Section --> */}
//           </div>
//         </div>
//       </section>

//       <div
//         className="modal fade"
//         id="exampleModalToggle"
//         aria-hidden="true"
//         aria-labelledby="exampleModalToggleLabel"
//         tabindex="-1"
//       >
//         <div className="modal-dialog modal-dialog-centered">
//           <div className="modal-content">
//             <div className="modal-header">
//               <h5 className="modal-title" id="exampleModalToggleLabel"></h5>
//               <button
//                 type="button"
//                 className="btn-close"
//                 data-bs-dismiss="modal"
//                 aria-label="Close"
//               ></button>
//             </div>
//             <div className="modal-body">
//               <h4>5% to 10% Per month</h4>
//               <p>Up to 3x with all work & non worthy incoms.</p>
//             </div>
//             <div className="modal-footer">
//               <button
//                 type="button"
//                 className="btn btn-secondary"
//                 data-dismiss="modal"
//               >
//                 Close
//               </button>
//               <a href="/activateWallet" type="button" className="btn btn-primary">
//                 Next
//               </a>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default dashboard;  

{
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
}
