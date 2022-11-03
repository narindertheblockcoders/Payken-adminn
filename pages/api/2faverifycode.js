import axios from "axios";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  const session = await getSession({ req });
  if (req.method === "POST") {
    try {
      const {token,data} = req.body;
      console.log(token,data,"to send data to api")
      var config = {
        method: "post",
        url: "http://13.126.156.148:5000/api/v1/adminMember/qrCodeVerify",
        headers: {
          Authorization: `Bearer ${token} `,
        },data
      };
      await axios(config).then(function (response) {
        res.status(200).json({ data: response.data });
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ Error: err });
    }
  }
}
