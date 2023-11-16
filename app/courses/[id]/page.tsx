import React from 'react'

function page({params}: {params: {id: string}}) {
  return (
    <div>{params.id}</div>
  )
}

export default page