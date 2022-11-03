import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import SideBar from "./SideBar";
import Navbar from "./ui/Navbar";

const RoiMatchingIncome= () => {
  const [data, setData] = useState();
  const [name,setName] = useState();

  async function directincome() {
    try {
      let res = await axios.post("/api/getUserROCMatchingIncome");
      const response = res.data.data;
      setData(res.data.data)
      setName(res.data.data.name)
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    directincome();
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
                  ALL SMART CONTRACTS IMPLEMENTED
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
                        Date
                      </th>
                      <th id="fuds" scope="col">
                        Left Count
                      </th>
                      <th id="fuds" scope="col">
                        Right Count
                      </th>
                      <th id="fuds" scope="col">
                        Matching At
                      </th>
                      <th className="right-textset" id="fuds" scope="col">
                        Amount
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {data?.map((item, id) => {
                      return (
                        <tr key={id}>
                          <td className="total-account">{id+1}</td>
                          <td className="total-account">{item.firstName}</td>
                          <td className="total-account">{item.incomeDate}</td>
                          <td className="total-account">{item.leftCount}</td>
                          <td className="total-account">{item.rightCount}</td>
                          <td className="total-account">{item.matchingAt}</td>
                          <td className="total-account right-textset">{item.amount}</td>
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

export default RoiMatchingIncome;
