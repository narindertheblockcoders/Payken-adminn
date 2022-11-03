import React from 'react'
import BinaryIncome from '../Component/ScImplemented'
// import {getSession} from 'next-auth/react'


const binaryincome = () => {
  return (
    <div>
        <BinaryIncome/>
    </div>
  )
}

export default binaryincome;

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