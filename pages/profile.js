import React from 'react'
import Profile from '../Component/Profile'
// import {getSession} from 'next-auth/react'

const profile = () => {
  

  return (
    <div>
        <Profile />
    </div>
  )
}

export default profile

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
// console.log(session.user)
// let token = session.user
  
//   return {
//     props:{
//       token
//     }
//   }
// }