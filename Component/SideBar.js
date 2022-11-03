import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { useRouter } from "next/router";
import { signOut, userSession, useSession } from "next-auth/react";

const SideBar = () => {

const router = useRouter()

const [tokenData, setTokenData]= useState()
const [avatar, setAvatar] = useState();
const [faStatus,setFaStatus] = useState();


async function getAvatar () {
  try {
    const token = localStorage.getItem('token')
    let res = await axios.post("/api/getAvatar",{token:token})
    const response = res.data;
    setAvatar(response.data);
  }catch(err) {
    // console.log(err)
  }
}

useEffect(()=>{
    // getUserStatus();
    getAvatar();
},[])




// const { data: session } = useSession();


//   async function createwallet(e) {
//     e.preventDefault();
//     try {
//       const token = localStorage.getItem("token");
//       let res = await axios.post("/api/wallet", { token: token });
//       const response = res.data;
//       router.push("/wallet");
//     } catch (err) {
//       console.log(err);
//       toast.error;
//     }
//   }


const [toggle,setToggle]=useState(false)

  return (<div>
    <div className={toggle?"":"toggle-sidebar"}>
      <button onClick={()=>setToggle(!toggle)} className="btn primary bi bi-list toggle-sidebar" id="toggle-setting"> 
      {/* <img id="arrow-id" src="/others/arws.webp"/> */}
      </button>
    {/* <div className="search-bar">
      <form className="search-form d-flex align-items-center" method="POST" action="#">
        <input type="text" name="query" placeholder="Search" title="Enter search keyword"/>
        <button type="submit" title="Search"><i className="bi bi-search"></i></button>
      </form>
    </div> */}
    {/* <!-- End Search Bar --> */}

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

      {/* <!-- ======= Sidebar ======= --> */}
{/* {session ? ( */}
      <aside  className=" sidebar ">
        <ul className="sidebar-nav" id="sidebar-nav">

        <a className="navbar-brand" href="/" id="href-set">
              <img id="logo-id" src="/logo.png"/>
            </a>
            <div className="profile-menu">
              <img className="profileImage" id="profilePictureMenu" src={avatar?.profile} alt=""/>
              <div className="profile-info overflowHidden" title="">{avatar?.firstName}</div></div>

          <li className="nav-item">
            <a className="collap" href="/dashboard">
            {/* <img src="/others/dashboard.png"/> */}
            <i className="fa-regular fa-grid"></i>
            

  <span className="dash-texts">Dashboard</span>
            </a>
          </li>
          {/* <!-- End Dashboard Nav --> */}

          <li className="nav-item">
            <a className="nav-link " data-bs-target="#components-nav" data-bs-toggle="collapse"  href="#"  >
              <i className="fa fa-user " id="i-class"></i>
                 <span className="spanic">ADMIN USER MANAGMENT</span>
              <i className="fa fa-chevron-down" id="icon-cd"></i>
              {/* <i className="fa fa-chevron-up"></i> */}
            </a>
            <ul id="components-nav" className="nav-content collapse show" data-bs-parent="#sidebar-nav">

              <li>
                <a href="/totalUsers">
                  <i className="fa fa-circle"></i>
                  <span>USER LIST</span>
                </a>
              </li>
             
              {/* <li>
                <a href="#">
                  <i className="fa fa-circle"></i>
                  <span>BLOCK USERS</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fa fa-circle"></i>
                  <span>UNBLOCK USERS</span>
                </a>
              </li>

             
              <li>
                <a href="/changePassword">
                  <i className="fa fa-circle"></i>
                  <span>CHANGE PASSWORD </span>
                </a>
              </li> */}
             
            </ul>
          </li>

          <li className="nav-item">
            <a className="nav-link " data-bs-target="#network-nav" data-bs-toggle="collapse" href="#"  >
              {/* <i className="fa fa-network-wired " id="i-class"></i> */}
              <i className="fa-solid fa-gear"  id="i-classes"></i>
              <span className="spanic">SETTING</span>
              <i className="fa fa-chevron-down" id="icon-cd"></i>
            </a>
            <ul  id="network-nav"  className="nav-content collapse show"  data-bs-parent="#network-nav" >
            <li>
                <a href="/changePassword">
                  <i className="fa fa-circle"></i>
                  <span>Change Password</span>
                </a>
              </li>
              <li>
                <a href="2fa">
                  <i className="fa fa-circle"></i>
                  <span>Enable 2FA</span>
                </a>
              </li>
              <li>
                <a href="/profile">
                  <i className="fa fa-circle"></i>
                  <span>Profile</span>
                </a>
              </li>
          
          
              {/* <li>
                <a href="#">
                  <i className="fa fa-circle"></i>
                  <span >RIGHT LEG</span>
                </a>
              </li> */}
            </ul>
          </li>
          <li className="nav-item">
            <a className="nav-link " data-bs-target="#network-nav" data-bs-toggle="collapse" href="#"  >
              <i className="fa fa-network-wired " id="i-class"></i>
              <span className="spanic">REPORTS</span>
              <i className="fa fa-chevron-down" id="icon-cd"></i>
            </a>
            <ul  id="network-nav"  className="nav-content collapse show"  data-bs-parent="#network-nav" >
            <li>
                <a href="/users">
                  <i className="fa fa-circle"></i>
                  <span>Users</span>
                </a>
              </li>
              <li>
                <a href="/saleAdmin">
                  <i className="fa fa-circle"></i>
                  <span>Sale</span>
                </a>
              </li>
              <li>
                <a href="/withdrawAdmin">
                  <i className="fa fa-circle"></i>
                  <span>withdraw</span>
                </a>
              </li>
              {/* <li>
                <a href="#">
                  <i className="fa fa-circle"></i>
                  <span>ROC INCOMES</span>
                </a>
              </li> */}
              </ul>
          </li>
          <li className="nav-item">
            <a className="nav-link " data-bs-target="#network-nav"  href="/withdrawInfo"  >
              {/* <i className="fa fa-network-wired " id="i-class"></i> */}
              <i className="fa-solid fa-money-bill-transfer"  ></i>
              <span className="spanic">WITHDRAW REQUEST</span>
             
            </a>
            
          </li>
          <li className="nav-item">
            <a  className="nav-link " data-bs-target="#wall-nav" data-bs-toggle="collapse" href="#">
              <i className="fa-solid fa-wallet" id="i-class"></i>
              <span className="spanic">KYC</span>
              {/* <i className="fa fa-chevron-down" id="icon-cd"></i> */}
            </a>
            {/* <ul id="wall-nav" className="nav-content collapse show" data-bs-parent="#wall-nav">
            
            <li>
                <a href="">
                  <i className="fa fa-circle"></i>
                  <span  onClick={(e)=>createwallet(e)}>CREDIT WALLET</span>
                </a>
              </li>
              <li>
                <a href="/withdrawInfo">
                  <i className="fa fa-circle"></i>
                  <span>DEBIT WALLET</span>
                </a>
              </li>
            
              <li>
                <a href="/withdraw">
                  <i className="fa fa-circle"></i>
                  <span>COLLECTION WALLET</span>
                </a>
              </li>
            
            </ul> */}
          </li>

          {/* <li className="nav-item">
            <a  className="nav-link " data-bs-target="#incentive-nav" data-bs-toggle="collapse" href="#">
            <i className="fa-solid fa-arrow-up-right-dots" id="i-class"></i>
                                      <span className="spanic">POWER</span>
              <i className="fa fa-chevron-down" id="icon-cd"></i>
            </a>
            <ul id="incentive-nav" className="nav-content collapse show" data-bs-parent="#incentive-nav">
              <li>
                <a href="/directIncome">
                  <i className="fa fa-circle"></i>
                  <span>GENERATE POWER</span>
                </a>
              </li>
            
              <li>
                <a href="#">
                  <i className="fa fa-circle"></i>
                  <span>USER LEFT PV</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fa fa-circle"></i>
                  <span>USER RIGHT PV</span>
                </a>
              </li>
             
           
              {/* <li>
                <a href="components-accordion.html">
                  <i className="fa fa-circle"></i>
                  <span>REWARD</span>
                </a>
              </li> */}
            {/* </ul>
          </li> */} 

         
          
          {/* <li className="nav-item">
            <a  className="nav-link " href="" onClick={()=>signOut('/login')}>
            {/* <i className="fa-solid fa-comments"></i> */}
                          {/* <span className="spanic">SETTINGS</span> */}
              {/* <i className="fa fa-chevron-down" id="icon-cd"></i> */}
            {/* </a>
  
          </li>
          <li className="nav-item"> */}
            {/* <a  className="nav-link " href="" onClick={()=>signOut('/login')}> */}
            {/* <i className="fa-solid fa-comments"></i> */}
                          {/* <span className="spanic">REWARDS</span> */}
              {/* <i className="fa fa-chevron-down" id="icon-cd"></i> */}
            {/* </a>
  
          </li>  */}

          <li className="nav-item">
            <a  className="nav-link " href="/login" onClick={()=>{}}>
            {/* <i className="fa-solid fa-comments"></i> */}
                          <span className="spanic">Logout</span>
              {/* <i className="fa fa-chevron-down" id="icon-cd"></i> */}
            </a>
  
          </li>




         
          {/* <!-- End Components Nav --> */}

  
          {/* <!-- End Icons Nav --> */}
        </ul>
      </aside> 
      {/* ):null} */}
      {/* <!-- End Sidebar--> */}
    </div>
    </div>
  );
};

export default SideBar;
