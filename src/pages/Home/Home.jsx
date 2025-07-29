import React from 'react'
import ResponsiveAppBar from '~/components/ResponsiveAppBar/ResponsiveAppBar'
import AppBarNoLogo from '~/components/ResponsiveAppBar/AppBarNoLogo'
import VHL from '../../asset/img/VHL.webp'
import Trusted from '../../asset/img/trusted.png'
import { Button } from '@mui/material'
import Container from '@mui/material/Container';
import { Gift, Plane, CircleAlert, Hotel, Navigation, Copy, Search, BadgeQuestionMark } from 'lucide-react'
import km1 from '../../asset/img/km1.png'
import km2 from '../../asset/img/km2.png'
import km3 from '../../asset/img/km3.png'
import r1 from '../../asset/img/r1.png'
import r2 from '../../asset/img/r2.png'
import r3 from '../../asset/img/r3.png'
import GuestSelector from '~/components/GuestSelector/GuestSelector'
import SelectChairType from '~/components/SelectChairType/SelectChairType'
import FlightSearchBox from '~/components/FlightSearchBox/FlightSearchBox'
import FlightDatePick from '~/components/FlightDatePick/FlightDatePick'

const Home = () => {
    return (
        <div className='bg-white pb-10'>
            <div className='relative '>
                <img src={VHL} alt="" className='h-125 w-full object-center' />
                <div className="absolute inset-0 bg-black opacity-40"></div>
                <div className='absolute top-0 left-0 w-full'>
                    <div className='fixed z-10 top-0 left-0 right-0'>
                        <div className='border-b border-b-[#767b7b]'>
                            <ResponsiveAppBar></ResponsiveAppBar>
                        </div>
                        <div>
                            <AppBarNoLogo></AppBarNoLogo>
                        </div>
                    </div>
                    <Container maxWidth='lg' className='pt-26 '>
                        <div className='flex justify-between items-center'>
                            <div>
                                <Button className='!mr-2 !rounded-full !text-md !p-1 !px-2 !bg-[#0194f3] !text-white !font-bold' >
                                    Một chiều / Khứ hồi
                                </Button>
                                <Button className='!text-md !rounded-full !p-1 !px-2  !text-white !font-bold' >
                                    Nhiều thành phố
                                </Button>
                            </div>
                            <div className='flex items-center'>
                                <GuestSelector></GuestSelector>
                                <SelectChairType></SelectChairType>
                            </div>
                        </div>
                        <div className='mt-5 flex items-center justify-between'>
                            <FlightSearchBox></FlightSearchBox>
                            <FlightDatePick></FlightDatePick>
                            <Button className='!text-white !rounded-full !p-2 !bg-[#20648c]'>
                                <Search></Search>
                            </Button>
                        </div>
                        <div className='flex justify-center mt-20'>
                            <img src={Trusted} alt="" className='rounded-2xl' />
                        </div>
                    </Container>
                </div>
            </div>
            <Container maxWidth='lg' className='flex gap-x-2 mt-3'>
                <div className='hover:bg-[#ccc] p-2 hover:opacity-90 hover:cursor-pointer'>
                    <img src={km1} alt="" className='object-center' />
                </div>
                <div className='hover:bg-[#ccc] p-2 hover:opacity-90 hover:cursor-pointer'>
                    <img src={km2} alt="" className='object-center' />
                </div>
                <div className='hover:bg-[#ccc] p-2 hover:opacity-90 hover:cursor-pointer'>
                    <img src={km3} alt="" className='object-center' />
                </div>
            </Container>
            <Container maxWidth='lg' >
                <div className='flex items-center text-[#073e68] text-2xl gap-x-1 font-bold mt-5'>
                    <div>
                        <Gift></Gift>
                    </div>
                    <div>
                        Mã ưu đãi tặng bạn mới
                    </div>
                </div>
                <div className='flex mt-5 text-black gap-x-3 justify-between'>
                    <div className='w-100 border border-[#ccc] py-1 px-2 '>
                        <div className='flex justify-between gap-x-1  border-b border-[#ccc] pb-2'>
                            <Plane className='p-1 rounded-full !bg-[#d1f0ff]'></Plane>
                            <div className='grow-1'>
                                <p className='font-bold'>Giảm ngay 50K</p>
                                <p className='font-light'>
                                    Áp dụng cho lần đặt đầu tiên trên ứng dụng Booking
                                </p>
                            </div>
                            <CircleAlert></CircleAlert>
                        </div>
                        <div className='flex items-center justify-between gap-x-3 p-2'>
                            <div className='flex bg-[#d1f0ff] p-2 w-full gap-x-1 '>
                                <Copy></Copy>
                                <p>BKBANMOI</p>
                            </div>
                            <div className='bg-[#d1f0ff] px-2 py-1 rounded-full hover:cursor-pointer hover:opacity-90'>Copy</div>
                        </div>
                    </div>
                    <div className='w-100 border border-[#ccc] py-1 px-2'>
                        <div className='flex justify-between gap-x-1  border-b border-[#ccc] pb-2'>
                            <Hotel className='p-1 rounded-full !bg-[#d1f0ff]'></Hotel>
                            <div className='grow-1'>
                                <p className='font-bold'>8% giảm giá Khách sạn </p>
                                <p className='font-light'>
                                    Áp dụng cho lần đặt đầu tiên trên ứng dụng Booking
                                </p>
                            </div>
                            <CircleAlert></CircleAlert>
                        </div>
                        <div className='flex items-center justify-between gap-x-3 p-2'>
                            <div className='flex bg-[#d1f0ff] p-2 w-full gap-x-1 '>
                                <Copy></Copy>
                                <p>BKBANMOI</p>
                            </div>
                            <div className='bg-[#d1f0ff] px-2 py-1 rounded-full hover:cursor-pointer hover:opacity-90'>Copy</div>
                        </div>
                    </div>
                    <div className='w-100 border border-[#ccc] py-1 px-2'>
                        <div className='flex justify-between gap-x-1  border-b border-[#ccc] pb-2'>
                            <Navigation className='p-1 rounded-full !bg-[#d1f0ff]'></Navigation>
                            <div className='grow-1'>
                                <p className='font-bold'>9% giảm hoạt động du lịch</p>
                                <p className='font-light'>
                                    Áp dụng cho lần đặt đầu tiên trên ứng dụng Booking
                                </p>
                            </div>
                            <CircleAlert></CircleAlert>
                        </div>
                        <div className='flex items-center justify-between gap-x-3 p-2'>
                            <div className='flex bg-[#d1f0ff] p-2 w-full gap-x-1 '>
                                <Copy></Copy>
                                <p>BKBANMOI</p>
                            </div>
                            <div className='bg-[#d1f0ff] px-2 py-1 rounded-full hover:cursor-pointer hover:opacity-90'>Copy</div>
                        </div>
                    </div>
                </div>
            </Container>
            <Container maxWidth='lg' >
                <div className='flex items-center text-[#073e68] text-2xl gap-x-1 font-bold mt-6'>
                    <div>
                        <Navigation></Navigation>
                    </div>
                    <div>
                        Đặt vé du lịch ngay
                    </div>
                </div>
                <div className='flex mt-2 text-black gap-x-3 justify-between'>
                    <div className='w-100 p-3 shadow-xl hover:brightness-90'>
                        <div>
                            <img src={VHL} alt="" />
                        </div>
                        <div className=''>
                            <div className='my-1'>
                                <div className='font-bold '>Tham quan Vịnh Hạ Long với 1 người</div>
                                <div className='font-bold text-sm text-amber-600'>3.499.000 VND</div>
                            </div>
                            <Button variant="contained">Đặt vé ngay</Button>
                        </div>
                    </div>
                    <div className='w-100 p-3 shadow-xl hover:brightness-90'>
                        <div>
                            <img src={VHL} alt="" />
                        </div>
                        <div className=''>
                            <div className='my-1'>
                                <div className='font-bold '>Tham quan Vịnh Hạ Long với 2 người</div>
                                <div className='font-bold text-sm text-amber-600'>4.499.000 VND</div>
                            </div>
                            <Button variant="contained">Đặt vé ngay</Button>
                        </div>
                    </div>
                    <div className='w-100 p-3 shadow-xl hover:brightness-90'>
                        <div>
                            <img src={VHL} alt="" />
                        </div>
                        <div className=''>
                            <div className='my-1'>
                                <div className='font-bold '>Tham quan Vịnh Hạ Long với 10 người</div>
                                <div className='font-bold text-sm text-amber-600'>12.499.000 VND</div>
                            </div>
                            <Button variant="contained">Đặt vé ngay</Button>
                        </div>
                    </div>
                </div>
            </Container>
            <Container maxWidth='lg'>
                <div className='flex items-center text-[#073e68] text-2xl gap-x-1 font-bold mt-6'>
                    <div>
                        <BadgeQuestionMark></BadgeQuestionMark>
                    </div>
                    <div>
                        Lý do nên đặt vé với Booking
                    </div>
                </div>
                <div className='flex items-center mt-2'>
                    <div className='flex items-center shadow-lg w-100 p-2 text-black'>
                        <div className='w-40'>
                            <img src={r1} alt="" />
                        </div>
                        <div className='text-sm'>
                            <p className='font-bold'>Đáp ứng mọi nhu cầu của bạn</p>
                            <p>Từ chuyến bay, lưu trú, đến điểm tham quan, bạn có thể tin chọn sản phẩm hoàn chỉnh và Hướng Dẫn Du Lịch  của chúng tôi.</p>
                        </div>
                    </div>
                    <div className='flex items-center shadow-lg w-100 p-2 text-black'>
                        <div className='w-40'>
                            <img src={r2} alt="" />
                        </div>
                        <div className='text-sm'>
                            <p className='font-bold'>Đáp ứng mọi nhu cầu của bạn</p>
                            <p>Từ chuyến bay, lưu trú, đến điểm tham quan, bạn có thể tin chọn sản phẩm hoàn chỉnh và Hướng Dẫn Du Lịch  của chúng tôi.</p>
                        </div>
                    </div>
                    <div className='flex items-center shadow-lg w-100 p-2 text-black'>
                        <div className='w-40'>
                            <img src={r3} alt="" />
                        </div>
                        <div className='text-sm'>
                            <p className='font-bold'>Đáp ứng mọi nhu cầu của bạn</p>
                            <p>Từ chuyến bay, lưu trú, đến điểm tham quan, bạn có thể tin chọn sản phẩm hoàn chỉnh và Hướng Dẫn Du Lịch  của chúng tôi.</p>
                        </div>
                    </div>
                </div>
            </Container>
            <Container>
                <div className='text-black font-bold text-xl flex justify-center mt-5'>
                    Nhóm 3
                </div>
            </Container>
        </div>
    )
}

export default Home
