import * as React from 'react'
import { ChevronLeft, AlignJustify, Image, Link, Smile } from 'lucide-react'

const UserChat = () => {
    return (
        <div className='w-75 h-100 bg-white shadow-xl '>
            <div className='bg-[#1e567b] text-white flex items-center justify-between p-2 h-10'>
                <div className='hover:cursor-pointer hover:bg-[#878686] rounded-full'>
                    <ChevronLeft></ChevronLeft>
                </div>
                <div className=''>
                    Chat
                </div>
                <div className='hover:cursor-pointer hover:bg-[#878686] rounded-full p-1'>
                    <AlignJustify size={18}></AlignJustify>
                </div>
            </div>
            <div className='h-80'>

            </div>
            <div className='flex p-2 gap-x-1 border-t border-t-[#ccc]'>
                <div className='grow-1 '>
                    <input type="text" placeholder='Nhập phản hồi' className='w-full outline-none' />
                </div>
                <div className='flex items-center gap-x-1'>
                    <div>
                        <Image size={20}></Image>
                    </div>
                    <div>
                        <Link size={20}></Link>
                    </div>
                    <div>
                        <Smile size={20}></Smile>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserChat
