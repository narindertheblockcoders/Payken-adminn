import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import SideBar from "./SideBar";
import Navbar from "./ui/Navbar";

const TotalWithdraws = () => {
  const [data, setData] = useState();
  const [search,setSearch] = useState("");

  async function withdrawlists() {
    try {
      const token = localStorage.getItem("token");
      // const email=localStorage.getItem("email")
      let res = await axios.post("/api/totalWithdraws",{token});
      const response = res.data.data;
      console.log(res)

      setData(res.data.data)
      
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    withdrawlists();
  }, []);

  function match(e){
    setSearch(e.target.value)
    
  }
  console.log(search)

  return (
    <>
           <div className="new-dashboard">
            <SideBar/>
        <section className="profile-sec profile-sects">
          <div className="container">
            <div className="row justify-content-center">
              <Navbar/>
              <form className="input-sec" id="ref-code">
                {/* {/ <div className="line profile-line" id="ch-line"></div> /} */}
                <h3 className="heading-text pink-text mt-2 ">
                  TOTAL WITHDRAW
                  <Link href={"/dashboard"}>
                    <span
                      className="arr-icon"
                      style={{
                        position: "relative",
                        left: "-48%",
                        cursor: "pointer",
                      }}
                    >
                      <img src="" className="icon-width"/>
                    </span>
                  </Link>
                </h3>
                <div  className="me-2" style={{display:"flex",justifyContent:'left',marginTop:"2rem",marginBottom:"-2rem"}}>
                <input type="search" placeholder="search" onChange={(e)=>{match(e)}}></input>
                </div>
                

                <table className="table funds-table mt-5" id="funds-color">
                  <thead>
                    <tr className="">
                      <th id="fuds" scope="col">
                        Sr. No.
                      </th>
                      <th id="fuds" scope="col">
                        amount
                      </th>
                      <th id="fuds" scope="col">
                        admin Charges
                      </th>
                      <th id="fuds" scope="col">
                        status
                      </th>
                      <th id="fuds" scope="col">
                        transaction Hash
                      </th>
                      {/* <th id="fuds" scope="col">
                        Position
                      </th> */}

                    </tr>
                  </thead>

                  <tbody>
                    {data?.filter((item)=>{
                        return search.toLowerCase()===''? item:item.firstName.toLowerCase().includes(search)
                    }).map((item, id) => {
                      return (
                        <tr key={id}>
                          <td className="total-account">{id+1}</td>
                          <td className="total-account">{item.amount}</td>
                          <td className="total-account">{item.adminCharges}</td>
                          <td className="total-account">{item.status}</td>
                          <td className="total-account">{item.transactionHash}</td>
                          {/* <td className="total-account">{item.position}</td> */}
                        
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </form>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default TotalWithdraws;
