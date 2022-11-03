import React from 'react'
import Withdraw from '../Component/Withdraw'
// import {getSession} from 'next-auth/react'


const withdraw = () => {
  return (
    <div>
        <Withdraw/>
    </div>
  )
}

export default withdraw;

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