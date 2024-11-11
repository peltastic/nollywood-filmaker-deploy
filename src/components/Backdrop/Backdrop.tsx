import React from 'react'

type Props = {}

const Backdrop = (props: Props) => {
  return (
    <div className='z-10 fixed w-full top-0 left-0 h-full backdrop-blur-md bg-[#7777773f]'></div>
  )
}

export default Backdrop