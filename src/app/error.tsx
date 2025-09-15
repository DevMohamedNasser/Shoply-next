'use client';
import React from 'react'

export default function Error({error} : {error: Error}) {
  return (
    <div className='text-white h-screen bg-red-800 flex items-center justify-center'>
        <div className="">
            <div className=" flex gap-1.5 items-center justify-center">
            <p className='text-2xl'>Some thing went wrong!</p>
            <div className="h-10 w-2 rounded-sm bg-white"></div>
            <p className="text-2xl">Plz try again.</p>
        </div>
        <p className='text-center'>{error.message}</p>
        </div>
    </div>
  )
}
