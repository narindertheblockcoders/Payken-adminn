import React from 'react'

import {getSession} from 'next-auth/react'
import Login from '../Component/Login'


const index = () => {
  return (
    <div>
     <Login/>
    </div>
  )
}

export default index


export async function getServerSideProps(context) {
  const session = await getSession(context)
  if (session) {
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      }
    }
  }
  return {
    props:{
      session
    }
  }
}