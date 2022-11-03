import axios from "axios";
// import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  // const session = await getSession({req})
  
  if (req.method === "POST") {
    try {
        const {token,data} = req.body
console.log(token,data)
        var config = {
            method: "post",
            url:  " :5000/api/v1/admin/createadmin",
            headers: {
              Authorization: `Bearer ${token} `,
            },data:data          };
          await axios(config).then(function (response) {
            console.log(JSON.stringify(response.data));
            res.status(200).json({ data: response.data.data });
          });
   
    } catch (err) {
      console.log(err);
      res.status(500).json({ Error: err });
    }
  }
}
