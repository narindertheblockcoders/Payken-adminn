import React from 'react'
import DirectIncome from '../Component/Users'
//import {getSession} from 'next-auth/react'


const directIncome = () => {
  return (
    <div>
        <DirectIncome/>
    </div>
  )
}

export default directIncome;

// export async function getServerSideProps(context) {
//   const session = await getSession(context)
//   if (!session) {
//     return {
//       redirect: {
//         destination: "/",
//         permanent: false,
//       }
//     }
//   }
//   return {
//     props:{
//       session
//     }
//   }
// }