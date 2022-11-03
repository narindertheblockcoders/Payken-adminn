import axios from "axios";
// import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const {token,id}=req.body;
      console.log(token,"is here for you");
      console.log(id,"id is here")
      var config = {
        method: "post",
        url: " http://13.126.156.148:5000/api/v1/admin/updateuser",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data:{id}
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

// import axios from "axios";

// export default async function handler(req, res) {
//   if (req.method === "POST") {
//     try {
//         const id = req.body;
//         console.log(id, "email to send to api")
//       let response = await axios.post("http://13.126.156.148:5000/api/v1/admin/usergetbyid",id)
//       console.log(response,"varinder")
//       const reference = response.data;
//       console.log(reference, "string");
//       res.status(200).json({ data: reference });
//     } catch (err) {
//       console.log(err.response.data);
//       res.status(500).json({ Error: err });
//     }
//   }
// }
