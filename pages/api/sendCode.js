// import axios from "axios";

// export default async function handler(req, res) {

//   if (req.method === "POST") {
//     try {
//         const email = req.body;
//         console.log(email, "email to send to api")
//       let response = await axios.post(
//         " http://13.126.156.148:5000/api/v1/admin/sendotp",email
//       );
//       console.log(response,"varinder")
//       const reference = response.data;
//       console.log(reference, "string");
//       res.status(200).json({ data: reference });
//     } catch (err) {
//       console.log(err);
//       res.status(500).json({ Error: err });
//     }
//   }
// }
import axios from "axios";
// import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  // const session = await getSession({req})
  console.log("USER")
  if (req.method === "POST") {
    try {
      const {data,token} = req.body;
      console.log(data, "email to send to api")

        var config = {
            method: "post",
            url:  "http://13.126.156.148:5000/api/v1/admin/sendotp",
            headers: {
              Authorization: `Bearer ${token} `,
            },data:data
          };
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
