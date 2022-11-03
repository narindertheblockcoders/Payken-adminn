import React from 'react'
import EditUser from '../../Component/EditUser'

const edituser = ({id}) => {
  return (
    <EditUser id={id}/>
  )
}

export default edituser
export async function getServerSideProps(context){
  const { params } = await context;

  const id = await params.uid;
console.log(id ,"in props id")
  return {
        props: {
          id
        },
      };
}