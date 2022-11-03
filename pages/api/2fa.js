import axios from "axios";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  const session = await getSession({ req });
  if (req.method === "POST") {
    try {
      // const {token} = req.body
      console.log(session, 'here fo you')
      var config = {
        method: "post",
        url: "http://13.126.156.148:5000/api/v1/admin//2fagenerate",
        headers: {
          Authorization: `Bearer ${session.user.name} `,
        },
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
