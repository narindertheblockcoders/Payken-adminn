import axios from "axios";
// import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const {token}=req.body;
      console.log(token);
      var config = {
        method: "post",
        url: "http://13.126.156.148:5000/api/v1/adminMember/getAllDirectIncome",
        headers: {
          Authorization: `Bearer ${token} `,
        }
      };
      await axios(config).then(function (response) {
        res.status(200).json({ data: response.data.data });
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ Error: err });
    }
  }
}
