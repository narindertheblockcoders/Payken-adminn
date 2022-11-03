// import axios from "axios";
// import { getSession } from "next-auth/react";

// export default async function handler(req, res) {
//   const session = await getSession({ req });
//   if (req.method === "POST") {
//     try {

//       const data = req.body;
    

      
//       console.log(data)
//       const config = {
//         headers: { Authorization: `Bearer ${session.user.name}` },
//       };

//       let response = await axios.post(
//         "http://3.220.252.242:4000/api/v1/user/checkwalletaddress",
//         data,
//         config
//       );
//       console.log("d")
//       const reference = response.data;
//       console.log(reference, "string");
//       res.status(200).json({ data: reference.data });
//     } catch (err) {
//       console.log(err);
//       res.status(500).json({ Error: err });
//     }
//   }
// }
