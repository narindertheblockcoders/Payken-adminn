import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import SideBar from "./SideBar";
import Navbar from "./ui/Navbar";

const LeftCount = () => {
  const [data, setData] = useState();

  async function leftCount() {
    try {
      let res = await axios.post("/api/userCounts");
      const response = res.data;
      console.log(response, "to get the response from api for left Count");
      setData(response.data.leftUsers)
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    leftCount();
  }, []);

  return (
    <>
      <div className="new-dashboard">
        <SideBar />

        <section className="profile-sec profile-sects">
          <div className="container">
            <div className="row justify-content-center">
              <Navbar />
              <form className="input-sec" id="ref-code">
                {/* {/ {/ <div className="line profile-line" id="ch-line"></div> /} /} */}
                <h3 className="heading-text pink-text mt-2 ">
                  LEFT COUNT
                  <Link href={"/dashboard"}>
                    <span
                      className="arr-icon"
                      style={{
                        position: "relative",
                        left: "-48%",
                        cursor: "pointer",
                      }}
                    >
                      <img src="" className="icon-width" />
                    </span>
                  </Link>
                </h3>

                <table className="table funds-table mt-5" id="funds-color">
                  <thead>
                    <tr className="">
                      <th id="fuds" scope="col">
                        Sr.No.
                      </th>
                      <th id="fuds" scope="col">
                        Name
                      </th>
                      <th className="right-textset" id="fuds" scope="col">
                        Email
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {data?.map((item, id) => {
                      return (
                        <>
                          <tr>
                            <td className="total-account">{id + 1}</td>
                            <td className="total-account">{item.firstName}</td>
                            <td className="total-account right-textset">{item.email}</td>

                          </tr>
                        </>
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

export default LeftCount;
