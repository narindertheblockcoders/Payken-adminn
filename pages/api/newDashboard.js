import axios from "axios";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  //const session = await getSession({ req });
  
  if (req.method === "POST") {
    try {
      const {email,token} = req.body;
      
      console.log( email, "email to be send to api new dashboad")
      var config = {
        method: "post",
        url: " http://13.126.156.148:5000/api/v1/admin/dashboard",
        headers: {
          Authorization: `Bearer ${token} `,
        },
        email:email
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

