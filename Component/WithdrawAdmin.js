import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import SideBar from "./SideBar";
import Navbar from "./ui/Navbar";

const MatchingIncome = () => {
  const [data, setData] = useState();
  const [name,setName] = useState();

  async function matchingincome() {
    try {
      const email=localStorage.getItem('email');
      const token=localStorage.getItem('token')
      let res = await axios.post("/api/allMatchingIncome",{token});
      const response = res.data.data;
      console.log(response,"MATCHING INCOME DATA")
      setData(res.data.data)
      setName(res.data.data.name)
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    matchingincome();
  }, []);

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
                  Withdraw
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

                <table className="table funds-table mt-5" id="funds-color">
                  <thead>
                    <tr className="">
                      <th id="fuds" scope="col">
                        Sr. No.
                      </th>
                      <th id="fuds" scope="col">
                        From User
                      </th>
                      <th id="fuds" scope="col">
                       Amount
                      </th>
                      <th id="fuds" scope="col">
                       Matching At
                      </th>
                      <th id="fuds" scope="col">
                       Type
                      </th>
                      <th id="fuds" scope="col">
                     Remarks
                      </th>

                     
                    </tr>
                  </thead>

                  <tbody>
                    {data?.map((item, id) => {
                      return (
                        <tr key={id}>
                          <td className="total-account">{id+1}</td>
                          <td className="total-account">{item.incomeType}</td>
                          <td className="total-account">{item.userFrom}</td>
                          <td className="total-account">{item.amount}</td>
                          <td className="total-account">{item.matchingAt}</td>
                          <td className="total-account">{item.type}</td>
                          <td className="total-account right-textset">{item.remarks}</td>
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

export default MatchingIncome;
