
import axios from "axios";
import { data } from "jquery";
// import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const {token,data}=req.body;
      // const data = req.body
      // const data = req.body
      console.log(req.body,"req is here");
      var config = {
        method: "post",
        url: " http://13.126.156.148:5000/api/v1/admin/chnagepassword",
        headers: {
          Authorization: `Bearer ${token} `,
        },data:data
      };
      await axios(config).then(function (response) {
        res.status(200).json({ data: response.data.data });
      });
    } catch (err) {
      console.log(err,"oywww a ga sala");
      res.status(500).json({  Error: err });
    }
  }
}

// url: "http://13.126.156.148:5000/api/v1/adminMember/changePassword",
