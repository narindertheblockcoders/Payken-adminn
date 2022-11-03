import axios from "axios";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const data = req.body;
      console.log(data);

      let response = await axios.post(
        "http://52.45.20.50:4000/api/v1/auth/register",
        data
      );
      const request = response.data;
      console.log(request);
      res.status(200).json({ data: request });
    } catch (err) {
      console.log(err);
      res.status(403).json({ error: err });
    }
  }
}


// import React from "react";
// import UserDetails from "../../Component/UserDetails";
// import { getSession } from "next-auth/react";
// import axios from "axios";

// const index = (props) => {
//   return <UserDetails props={props} />;
// };

// export default index;

// export async function getServerSideProps(context) {
//   const session = await getSession(context);
//   const { params } = await context;
//   console.log(context);
//   console.log(params);
//   const id = await params.uid;

//   let data = {
//     userId: id,
//   };

//   if (!session) {
//     return {
//       redirect: {
//         destination: "/",
//         permanent: false,
//       },
//     };
//   }

//   var config = {
//     method: "post",
//     url: "http://13.215.196.173:3000/api/v1/admin/getuserdetail",
//     headers: {
//       Authorization: `Bearer ${session?.user.name} `,
//     },
//     data: data,
//   };
//   let response = await axios(config).then(function (response) {
//     console.log(JSON.stringify(response.data));
//     return { data: response.data.data };
//   });

//   return {
//     props: {
//       response,
//     },
//   };
// }



