import { Avatar } from '@mui/material'
import { Ellipsis, MessageCircle, Settings, Image, Link } from 'lucide-react'
import * as React from 'react'

const StaffChat = () => {
    return (
        <div className='bg-white grid grid-cols-[4%_20%_76%] text-black h-[100vh]'>
            <div className='bg-blue-600 flex flex-col justify-between items-center py-4'>
                <div className='flex flex-col items-center gap-y-4'>
                    <div className='hover:cursor-pointer hover:brightness-95'>
                        <Avatar src="/broken-image.jpg" />
                    </div>
                    <div className='hover:cursor-pointer hover:bg-[#737070] p-1 rounded-full'>
                        <MessageCircle size={30}></MessageCircle>
                    </div>
                </div>
                <div className='hover:cursor-pointer hover:bg-[#737070] p-1 rounded-full'>
                    <Settings size={30}></Settings>
                </div>
            </div>
            <div className='border-r border-r-[#ccc]'>
                <div className='flex items-center justify-between border-b border-b-[#ccc] pb-1'>
                    <div className='flex items-center gap-x-1.5 text-sm font-medium'>
                        <div className='hover:underline hover:cursor-pointer'>Tất cả</div>
                        <div className='hover:underline hover:cursor-pointer'>Chưa đọc</div>
                    </div>
                    <div className='hover:cursor-pointer hover:bg-[#7c7979] p-1 rounded-full'>
                        <Ellipsis></Ellipsis>
                    </div>
                </div>
                <div className='pt-1.5 gap-y-1'>
                    <div className='flex items-center gap-x-1.5 p-2 hover:cursor-pointer hover:bg-[#cdcbcb] rounded'>
                        <div>
                            <Avatar alt="Hemy Sharp" src="/static/images/avatar/1.jpg" />
                        </div>
                        <div className='flex w-full'>
                            <div className='grow-1 justify-between'>
                                <div className='font-medium'>
                                    Đào Huỳnh
                                </div>
                                <div>
                                    Lên thư viện k
                                </div>
                            </div>
                            <div className='text-sm'>
                                2 giờ
                            </div>
                        </div>
                    </div>
                    <div className='flex items-center gap-x-1.5 p-2 hover:cursor-pointer hover:bg-[#cdcbcb] rounded'>
                        <div>
                            <Avatar alt="Hemy Sharp" src="/static/images/avatar/1.jpg" />
                        </div>
                        <div className='flex w-full'>
                            <div className='grow-1 justify-between'>
                                <div className='font-medium'>
                                    Đào Huỳnh
                                </div>
                                <div>
                                    Lên thư viện k
                                </div>
                            </div>
                            <div className='text-sm'>
                                2 giờ
                            </div>
                        </div>
                    </div>
                    <div className='flex items-center gap-x-1.5 p-2 hover:cursor-pointer hover:bg-[#cdcbcb] rounded'>
                        <div>
                            <Avatar alt="Hemy Sharp" src="/static/images/avatar/1.jpg" />
                        </div>
                        <div className='flex w-full'>
                            <div className='grow-1 justify-between'>
                                <div className='font-medium'>
                                    Đào Huỳnh
                                </div>
                                <div>
                                    Chìn chá
                                </div>
                            </div>
                            <div className='text-sm'>
                                2 giờ
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className=''>
                <div className='flex w-full p-2 gap-x-1 items-center border-b border-b-[#ccc] pb-2'>
                    <div>
                        <Avatar alt="Hemy Sharp" src="/static/images/avatar/1.jpg" />
                    </div>
                    <div className=''>
                        Đào Huỳnh
                    </div>
                </div>
                <div>
                    {/* Chat */}
                    <div className='bg-[#ebecf0] h-[82vh] p-2'>
                        {/* Khachs hangf */}
                        <div className='flex items-center gap-x-1'>
                            <Avatar alt="Hemy Sharp" src="/static/images/avatar/1.jpg" />
                            <div className='p-2 shadow-lg bg-white rounded'>
                                <div className=''>
                                    Mai lên thư viện k
                                </div>
                                <div className='text-[10px]'>
                                    19:12
                                </div>
                            </div>
                        </div>

                        {/* Minhf */}
                        <div className="flex justify-end mt-2">
                            <div className="shadow-lg bg-white rounded px-3 py-2 inline-block max-w-[70%]">
                                <div>
                                    Okee
                                </div>
                                <div className='text-[10px]'>
                                    19:13
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className=''>
                        <div className='flex items-center gap-x-3  border-b border-b-[#ccc]'>
                            <div className='hover:cursor-pointer hover:bg-[#cdcccc] rounded p-1'>
                                <Image></Image>
                            </div>
                            <div className='hover:cursor-pointer hover:bg-[#cdcccc] rounded p-1'>
                                <Link></Link>
                            </div>
                            <div className='hover:cursor-pointer hover:bg-[#cdcccc] rounded p-1'>
                                <Ellipsis></Ellipsis>
                            </div>
                        </div>
                        <div>
                            <input type="text" placeholder='Nhập tin nhắn' className='w-full px-1 py-2 outline-none' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StaffChat
