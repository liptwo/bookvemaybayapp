import React from 'react'
import ResponsiveAppBar from '~/components/ResponsiveAppBar/ResponsiveAppBar'
// import AppBarNoLogo from '~/components/ResponsiveAppBar/AppBarNoLogo' // Chưa sử dụng, có thể xóa
import VHL from '~/asset/img/travellokaBg.webp'
// import Trusted from '../../asset/img/trusted.png' // Chưa sử dụng, có thể xóa
import { Box, Button, Typography } from '@mui/material' // Thêm Typography
import Container from '@mui/material/Container'
import Badge from '@mui/material/Badge';
import {
    Gift,
    Plane,
    CircleAlert,
    Hotel,
    Navigation,
    Copy,
    // Search,
    MessageSquareMore,
    BadgeQuestionMark
} from 'lucide-react'
import km1 from '../../asset/img/km1.png'
import km2 from '../../asset/img/km2.png'
import km3 from '../../asset/img/km3.png'
import DANANG from '../../asset/img/vietnam.jpg'
import FUJI from '../../asset/img/fuji.jpg'
import HUE from '../../asset/img/hue.jpg'
import r1 from '../../asset/img/r1.png'
import r2 from '../../asset/img/r2.png'
import r3 from '../../asset/img/r3.png'
// import GuestSelector from '~/components/GuestSelector/GuestSelector'
// import SelectChairType from '~/components/SelectChairType/SelectChairType'
// import FlightSearchBox from '~/components/FlightSearchBox/FlightSearchBox'
// import FlightDatePick from '~/components/FlightDatePick/FlightDatePick'
import SearchFlight from './SearchFlight'
import UserChat from '~/components/Chat/UserChat'

const Home = () => {
    const [showChat, setShowChat] = React.useState(false)
    const toggleChat = () => {
        setShowChat(prev => !prev);
    }
    return (
        <div className="bg-gradient-to-b from-[#eaf6ff] to-white min-h-screen pb-10 font-sans">
            {/* Banner và Thanh điều hướng */}
            <img
                src={VHL}
                alt='Background Plane'
                draggable='false'
                // Giảm brightness xuống 50 để nội dung dễ đọc hơn, thêm object-bottom để hình ảnh trông đẹp hơn
                className="absolute inset-0 w-full h-[600px] object-cover object-center brightness-60 z-0 transition-all duration-700"
            />
            <Container maxWidth='lg' className='relative z-10'> {/* Thêm relative z-10 để nội dung nằm trên ảnh */}
                <Box sx={{ height: 'auto', paddingTop: 2 }}> {/* Bỏ chiều cao cố định, thêm padding */}
                    <ResponsiveAppBar />
                </Box>
                {/* Form tìm kiếm */}
                <SearchFlight></SearchFlight>

            </Container>

            {/* Phần Khuyến mãi hình ảnh */}
            <Container maxWidth='lg' className='flex z-10 gap-x-6 mt-30 justify-center animate-fade-in-up'> {/* Tăng khoảng cách mt-10, thêm justify-center */}
                <div className='hover:opacity-95 hover:cursor-pointer shadow-xl transition-all duration-500 transform hover:-translate-y-2 rounded-2xl overflow-hidden scale-100 hover:scale-105 bg-white animate-fade-in-up'> {/* Thêm shadow, transition */}
                    <img src={km1} alt='Khuyến mãi 1' className='object-cover w-full h-full' /> {/* Thêm object-cover */}
                </div>
                <div className='hover:opacity-95 hover:cursor-pointer shadow-xl transition-all duration-500 transform hover:-translate-y-2 rounded-2xl overflow-hidden scale-100 hover:scale-105 bg-white animate-fade-in-up'>
                    <img src={km2} alt='Khuyến mãi 2' className='object-cover w-full h-full' />
                </div>
                <div className='hover:opacity-95 hover:cursor-pointer shadow-xl transition-all duration-500 transform hover:-translate-y-2 rounded-2xl overflow-hidden scale-100 hover:scale-105 bg-white animate-fade-in-up'>
                    <img src={km3} alt='Khuyến mãi 3' className='object-cover w-full h-full' />
                </div>
            </Container>

            {/* Mã ưu đãi tặng bạn mới */}
            <Container maxWidth='lg' className='mt-10'>
                <div className='flex items-center text-[#073e68] text-2xl gap-x-2 font-bold mb-5'> {/* Điều chỉnh gap-x, thêm mb-5 */}
                    <Gift size={30} /> {/* Tăng kích thước icon */}
                    <Typography variant='h5' component='h2' className='!font-bold'>Mã ưu đãi tặng bạn mới</Typography> {/* Sử dụng Typography */}
                </div>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in-up'> {/* Sử dụng grid cho bố cục responsive */}
                    <div className='border border-[#e3e8ee] py-5 px-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 bg-white animate-fade-in-up'> {/* Điều chỉnh padding, thêm shadow, rounded */}
                        <div className='flex items-start gap-x-3 border-b border-[#eee] pb-3 mb-3'> {/* Thêm items-start */}
                            <Plane className='p-2 rounded-full !bg-[#d1f0ff] min-w-[40px] min-h-[40px]' size={24}></Plane> {/* Tăng padding, thêm min-w/h */}
                            <div className='flex-grow'>
                                <p className='font-bold text-lg'>Giảm ngay 50K</p> {/* Tăng font size */}
                                <p className='font-normal text-sm text-gray-700'>
                                    Áp dụng cho lần đặt đầu tiên trên ứng dụng Booking
                                </p>
                            </div>
                            <CircleAlert size={20}></CircleAlert>
                        </div>
                        <div className='flex items-center justify-between gap-x-2'>
                            <div className='flex bg-[#e8faff] p-2 rounded-md w-full gap-x-2 items-center'> {/* Điều chỉnh màu nền, thêm rounded, items-center */}
                                <Copy size={18}></Copy>
                                <p className='font-semibold text-[#073e68]'>BKBANMOI</p> {/* Thêm font-semibold, màu chữ */}
                            </div>
                            <Button
                                className="!bg-gradient-to-r from-[#0194f3] to-[#20648c] !text-white !px-6 !py-2 !rounded-full !hover:from-[#007acc] !hover:to-[#0194f3] !whitespace-nowrap shadow-md hover:scale-105 transition-all duration-300"
                                variant='contained'
                            >
                                Copy
                            </Button>
                        </div>
                    </div>

                    <div className='border border-[#e3e8ee] py-5 px-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 bg-white animate-fade-in-up'>
                        <div className='flex items-start gap-x-3 border-b border-[#eee] pb-3 mb-3'>
                            <Hotel className='p-2 rounded-full !bg-[#d1f0ff] min-w-[40px] min-h-[40px]' size={24}></Hotel>
                            <div className='flex-grow'>
                                <p className='font-bold text-lg'>8% giảm giá Khách sạn </p>
                                <p className='font-normal text-sm text-gray-700'>
                                    Áp dụng cho lần đặt đầu tiên trên ứng dụng Booking
                                </p>
                            </div>
                            <CircleAlert size={20}></CircleAlert>
                        </div>
                        <div className='flex items-center justify-between gap-x-2'>
                            <div className='flex bg-[#e8faff] p-2 rounded-md w-full gap-x-2 items-center'>
                                <Copy size={18}></Copy>
                                <p className='font-semibold text-[#073e68]'>BKBANMOI</p>
                            </div>
                            <Button
                                className="!bg-gradient-to-r from-[#0194f3] to-[#20648c] !text-white !px-6 !py-2 !rounded-full !hover:from-[#007acc] !hover:to-[#0194f3] !whitespace-nowrap shadow-md hover:scale-105 transition-all duration-300"
                                variant='contained'
                            >
                                Copy
                            </Button>
                        </div>
                    </div>

                    <div className='border border-[#e3e8ee] py-5 px-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 bg-white animate-fade-in-up'>
                        <div className='flex items-start gap-x-3 border-b border-[#eee] pb-3 mb-3'>
                            <Navigation className='p-2 rounded-full !bg-[#d1f0ff] min-w-[40px] min-h-[40px]' size={24}></Navigation>
                            <div className='flex-grow'>
                                <p className='font-bold text-lg'>9% giảm hoạt động du lịch</p>
                                <p className='font-normal text-sm text-gray-700'>
                                    Áp dụng cho lần đặt đầu tiên trên ứng dụng Booking
                                </p>
                            </div>
                            <CircleAlert size={20}></CircleAlert>
                        </div>
                        <div className='flex items-center justify-between gap-x-2'>
                            <div className='flex bg-[#e8faff] p-2 rounded-md w-full gap-x-2 items-center'>
                                <Copy size={18}></Copy>
                                <p className='font-semibold text-[#073e68]'>BKBANMOI</p>
                            </div>
                            <Button
                                className="!bg-gradient-to-r from-[#0194f3] to-[#20648c] !text-white !px-6 !py-2 !rounded-full !hover:from-[#007acc] !hover:to-[#0194f3] !whitespace-nowrap shadow-md hover:scale-105 transition-all duration-300"
                                variant='contained'
                            >
                                Copy
                            </Button>
                        </div>
                    </div>
                </div>
            </Container>

            {/* Đặt vé du lịch ngay */}
            <Container maxWidth='lg' className='mt-10'>
                <div className='flex items-center text-[#073e68] text-2xl gap-x-2 font-bold mb-5'>
                    <Navigation size={30}></Navigation>
                    <Typography variant='h5' component='h2' className='!font-bold'>Đặt vé du lịch ngay</Typography>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in-up'> {/* Sử dụng grid */}
                    <div className='bg-white p-6 shadow-2xl rounded-2xl hover:shadow-3xl hover:brightness-95 transition-all duration-300 hover:scale-105 animate-fade-in-up'>
                        <div>
                            <img src={DANANG} alt='Đà nẵng' className='w-full h-48 object-cover object-top rounded-md mb-3' /> {/* Thay đổi ảnh, thêm styling */}
                        </div>
                        <div className=''>
                            <div className='my-2'>
                                <Typography variant='h6' component='h3' className='!font-bold !text-base'>
                                    Tham quan Đà Nẵng 1 người
                                </Typography>
                                <Typography variant='subtitle1' className='!font-bold !text-sm !text-amber-600'>
                                    3.499.000 VND
                                </Typography>
                            </div>
                            <Button variant='contained' className='!bg-gradient-to-r from-[#0194f3] to-[#20648c] !hover:from-[#007acc] !hover:to-[#0194f3] !w-full !text-lg !font-bold !rounded-full shadow-lg hover:scale-105 transition-all duration-300'>Đặt vé ngay</Button>
                        </div>
                    </div>
                    <div className='bg-white p-6 shadow-2xl rounded-2xl hover:shadow-3xl hover:brightness-95 transition-all duration-300 hover:scale-105 animate-fade-in-up'>
                        <div>
                            <img src={FUJI} alt='Vịnh Hạ Long 2 người' className='w-full h-48 object-cover rounded-md mb-3' />
                        </div>
                        <div className=''>
                            <div className='my-2'>
                                <Typography variant='h6' component='h3' className='!font-bold !text-base'>
                                    Tour Nhật Bản với 2 người
                                </Typography>
                                <Typography variant='subtitle1' className='!font-bold !text-sm !text-amber-600'>
                                    4.499.000 VND
                                </Typography>
                            </div>
                            <Button variant='contained' className='!bg-gradient-to-r from-[#0194f3] to-[#20648c] !hover:from-[#007acc] !hover:to-[#0194f3] !w-full !text-lg !font-bold !rounded-full shadow-lg hover:scale-105 transition-all duration-300'>Đặt vé ngay</Button>
                        </div>
                    </div>
                    <div className='bg-white p-6 shadow-2xl rounded-2xl hover:shadow-3xl hover:brightness-95 transition-all duration-300 hover:scale-105 animate-fade-in-up'>
                        <div>
                            <img src={HUE} alt='Vịnh Hạ Long 10 người' className='w-full h-48 object-cover rounded-md mb-3' />
                        </div>
                        <div className=''>
                            <div className='my-2'>
                                <Typography variant='h6' component='h3' className='!font-bold !text-base'>
                                    Tham quan Kinh Thành Huế với 10 người
                                </Typography>
                                <Typography variant='subtitle1' className='!font-bold !text-sm !text-amber-600'>
                                    12.499.000 VND
                                </Typography>
                            </div>
                            <Button variant='contained' className='!bg-gradient-to-r from-[#0194f3] to-[#20648c] !hover:from-[#007acc] !hover:to-[#0194f3] !w-full !text-lg !font-bold !rounded-full shadow-lg hover:scale-105 transition-all duration-300'>Đặt vé ngay</Button>
                        </div>
                    </div>
                </div>
            </Container>

            {/* Lý do nên đặt vé với Booking */}
            <Container maxWidth='lg' className='mt-10'>
                <div className='flex items-center text-[#073e68] text-2xl gap-x-2 font-bold mb-5'>
                    <BadgeQuestionMark size={30}></BadgeQuestionMark>
                    <Typography variant='h5' component='h2' className='!font-bold'>Lý do nên đặt vé với Booking</Typography>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in-up'> {/* Sử dụng grid */}
                    <div className='flex items-center bg-white shadow-xl p-6 text-black rounded-2xl hover:shadow-2xl transition-all duration-300 animate-fade-in-up'>
                        <div className='w-32 flex-shrink-0 mr-4'> {/* Điều chỉnh width và thêm margin-right */}
                            <img src={r1} alt='Reason 1' className='w-full h-auto object-contain' />
                        </div>
                        <div className='text-sm flex-grow'>
                            <Typography variant='subtitle1' className='!font-bold !mb-1'>Đáp ứng mọi nhu cầu của bạn</Typography>
                            <Typography variant='body2' className='text-gray-700'>
                                Từ chuyến bay, lưu trú, đến điểm tham quan, bạn có thể tin chọn sản phẩm hoàn chỉnh và hướng dẫn du lịch của chúng tôi.
                            </Typography>
                        </div>
                    </div>
                    <div className='flex items-center bg-white shadow-xl p-6 text-black rounded-2xl hover:shadow-2xl transition-all duration-300 animate-fade-in-up'>
                        <div className='w-32 flex-shrink-0 mr-4'>
                            <img src={r2} alt='Reason 2' className='w-full h-auto object-contain' />
                        </div>
                        <div className='text-sm flex-grow'>
                            <Typography variant='subtitle1' className='!font-bold !mb-1'>Giá cả cạnh tranh</Typography>
                            <Typography variant='body2' className='text-gray-700'>
                                Booking luôn tìm kiếm và cung cấp cho bạn những ưu đãi tốt nhất, giúp bạn tiết kiệm chi phí cho chuyến đi.
                            </Typography>
                        </div>
                    </div>
                    <div className='flex items-center bg-white shadow-xl p-6 text-black rounded-2xl hover:shadow-2xl transition-all duration-300 animate-fade-in-up'>
                        <div className='w-32 flex-shrink-0 mr-4'>
                            <img src={r3} alt='Reason 3' className='w-full h-auto object-contain' />
                        </div>
                        <div className='text-sm flex-grow'>
                            <Typography variant='subtitle1' className='!font-bold !mb-1'>Hỗ trợ 24/7</Typography>
                            <Typography variant='body2' className='text-gray-700'>
                                Đội ngũ hỗ trợ khách hàng của chúng tôi luôn sẵn sàng giải đáp mọi thắc mắc và hỗ trợ bạn mọi lúc, mọi nơi.
                            </Typography>
                        </div>
                    </div>
                </div>
            </Container>

            <div className='fixed z-20 bottom-7 right-7   w-14 text-black shadow-lg rounded-full bg-[#d8dadc] flex items-center justify-center'>
                <div onClick={toggleChat} className='hover:cursor-pointer hover:brightness-90 p-3'>
                    <Badge badgeContent={4} color="primary">
                        <MessageSquareMore size={30}></MessageSquareMore>
                    </Badge>
                </div>
                <div className='absolute -top-100 right-5'>
                    {showChat && <UserChat></UserChat>}
                </div>
            </div>

            {/* Footer */}
            <Container>
                <div className='text-black font-bold text-xl flex justify-center mt-10 animate-fade-in'> {/* Tăng mt-10 */}
                    Nhóm 3
                </div>
            </Container>
        </div>
    )
}

export default Home