
import React from 'react'
import { MdOutlineSearch } from "react-icons/md";


type Props = {}

const ChatSearch = (props: Props) => {
  return (
    <div className='bg-stroke-4 flex w-full py-4 px-6 rounded-2xl'>
        <MdOutlineSearch className='text-2xl mr-2' />
        <input type='text' className='bg-transparent outline-none w-full placeholder:text-[#00000064] placeholder:text-[0.88rem]' placeholder='Search messages' />
    </div>
  )
}

export default ChatSearch