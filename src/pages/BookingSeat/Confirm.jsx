// App.js
import { format } from 'date-fns'
import { vi } from 'date-fns/locale'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createBookingAPI } from '~/apis'
import { STATUS } from '~/utils/constants'

const Confirm = ({ flight, mySeat, user, setIsSuccess }) => {
  const [isConfirmed, setIsConfirmed] = useState(false)
  const [discountCode, setDiscountCode] = useState('')
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null)
  const [agreedToTerms, setAgreedToTerms] = useState(false)

  // Simulated booking and payment data

  console.log('flight ', flight)
  const navigate = useNavigate()
  const paymentBreakdown = {
    subtotal: flight.price, // VNĐ
    discount: 0,
    utilityFee: 0 // VNĐ
  }

  // Payment methods mock data
  const paymentMethods = [
    {
      name: 'Thẻ tín dụng, thẻ ghi nợ quốc tế',
      icon: 'https://placehold.co/40x25/007bff/ffffff?text=VISA',
      type: 'card',
      logos: [
        'https://placehold.co/40x25/007bff/ffffff?text=VISA',
        'https://placehold.co/40x25/dc3545/ffffff?text=MC',
        'https://placehold.co/40x25/6c757d/ffffff?text=JCB'
      ]
    },
    {
      name: 'Thẻ ATM',
      icon: 'https://placehold.co/40x25/28a745/ffffff?text=NAPAS',
      type: 'napas'
    },
    {
      name: 'Mobile Banking VietQR',
      icon: 'https://placehold.co/40x25/6f42c1/ffffff?text=VietQR',
      type: 'mobile_qr'
    },
    {
      name: 'Quét mã QR VNPAY',
      icon: 'https://placehold.co/40x25/fd7e14/ffffff?text=VNPAY',
      type: 'vnpay_qr'
    },
    {
      name: 'Thanh toán nội địa VNPAY',
      icon: 'https://placehold.co/40x25/007bff/ffffff?text=VNPAY',
      type: 'vnpay_local'
    },
    {
      name: 'SkyPay',
      icon: 'https://placehold.co/40x25/17a2b8/ffffff?text=SkyPay',
      type: 'ewallet'
    },
    {
      name: 'MoMo',
      icon: 'https://placehold.co/40x25/e83e8c/ffffff?text=MOMO',
      type: 'ewallet'
    },
    {
      name: 'ZaloPay',
      icon: 'https://placehold.co/40x25/6610f2/ffffff?text=ZALOPAY',
      type: 'ewallet'
    },
    {
      name: 'Apple Pay',
      icon: 'https://placehold.co/40x25/6c757d/ffffff?text=APPLE',
      type: 'ewallet'
    }
  ]

  const payLaterMethods = [
    {
      name: 'Movi',
      description: 'Bay trước, trả sau',
      icon: 'https://placehold.co/40x25/20c997/ffffff?text=MOVI',
      type: 'pay_later'
    }
  ]

  const handleConfirmAfterSuccess = async () => {
    const newBooking = {
      flightId: flight._id,
      seatNumber: mySeat,
      status: STATUS.CONFIRMED,
      passengerName: user.username,
      passengerEmail: user.email
    }
    console.log('newBooking ', newBooking)
    try {
      await createBookingAPI(newBooking).finally(() => {
        navigate('/')
      })
    } catch (error) {
      console.error('Booking failed:', error)
    }
    setIsConfirmed(false)
    // setIsSuccess(true)')
    // setDiscountCode('')
    // setSelectedPaymentMethod(null)
    // setAgreedToTerms(false)
  }


  const handleConfirmPayment = () => {
    if (!selectedPaymentMethod) {
      alert('Vui lòng chọn phương thức thanh toán!') // Using alert for demo, replace with custom modal
      return
    }
    if (!agreedToTerms) {
      alert('Vui lòng đồng ý với Điều khoản và điều kiện!') // Using alert for demo, replace with custom modal
      return
    }
    // Simulate API call
    console.log('Payment initiated with:', {
      discountCode,
      selectedPaymentMethod: selectedPaymentMethod.name,
      totalAmount:
        paymentBreakdown.subtotal -
        paymentBreakdown.discount +
        paymentBreakdown.utilityFee
    })
    setIsConfirmed(true)
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount)
  }

  const totalAmountToPay =
    paymentBreakdown.subtotal -
    paymentBreakdown.discount +
    paymentBreakdown.utilityFee

  return (
    <div className='mx-2'>
      <div className=' w-full flex flex-col lg:flex-row gap-6'>
        {/* Main Payment Content */}
        <div className='flex-1 bg-white rounded-xl shadow-lg p-6 sm:p-8 lg:p-10'>
          {/* Discount Code Section */}
          <div className='mb-8 p-4 bg-blue-50 rounded-lg border border-blue-200'>
            <label
              htmlFor='discountCode'
              className='block text-gray-700 font-semibold mb-2'
            >
              Mã khuyến mãi hoặc phiếu quà tặng
            </label>
            <div className='flex'>
              <input
                type='text'
                id='discountCode'
                className='flex-1 p-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                placeholder='Nhập mã khuyến mãi'
                value={discountCode}
                onChange={(e) => setDiscountCode(e.target.value)}
              />
              <button className='bg-blue-600 text-white px-5 py-3 rounded-r-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300'>
                Áp dụng
              </button>
            </div>
          </div>

          {/* Payment Methods Section */}
          <div className='mb-8'>
            <h3 className='text-xl font-bold text-gray-800 mb-4'>
              Phương thức thanh toán
            </h3>
            <div className='space-y-6'>
              {/* Online Payment */}
              <div>
                <p className='text-gray-600 mb-3 text-sm'>
                  Được xử lý bởi Cổng thanh toán{' '}
                  <span className='font-bold text-indigo-700'>GALAXY PAY</span>
                </p>
                <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4'>
                  {paymentMethods.map((method) => (
                    <button
                      key={method.name}
                      className={`flex flex-col items-center justify-center p-4 border rounded-lg shadow-sm hover:shadow-md transition duration-200
                        ${
                          selectedPaymentMethod?.name === method.name
                            ? 'border-indigo-600 ring-2 ring-indigo-500 bg-indigo-50'
                            : 'border-gray-300 bg-white'
                        }`}
                      onClick={() => setSelectedPaymentMethod(method)}
                    >
                      {method.logos ? (
                        <div className='flex gap-1 mb-2'>
                          {method.logos.map((logo, index) => (
                            <img
                              key={index}
                              src={logo}
                              alt={method.name}
                              className='h-6 object-contain'
                            />
                          ))}
                        </div>
                      ) : (
                        <img
                          src={method.icon}
                          alt={method.name}
                          className='h-6 mb-2 object-contain'
                        />
                      )}
                      <span className='text-sm font-medium text-center'>
                        {method.name.includes('Thẻ tín dụng')
                          ? 'Thẻ tín dụng'
                          : method.name}
                      </span>
                      {method.name.includes('Thẻ tín dụng') && (
                        <span className='text-xs text-gray-500 text-center'>
                          , thẻ ghi nợ quốc tế
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Pay Later */}
              <div>
                <h4 className='text-lg font-bold text-gray-800 mb-3 mt-6'>
                  Thanh toán sau
                </h4>
                <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4'>
                  {payLaterMethods.map((method) => (
                    <button
                      key={method.name}
                      className={`flex flex-col items-center justify-center p-4 border rounded-lg shadow-sm hover:shadow-md transition duration-200
                        ${
                          selectedPaymentMethod?.name === method.name
                            ? 'border-indigo-600 ring-2 ring-indigo-500 bg-indigo-50'
                            : 'border-gray-300 bg-white'
                        }`}
                      onClick={() => setSelectedPaymentMethod(method)}
                    >
                      <img
                        src={method.icon}
                        alt={method.name}
                        className='h-6 mb-2 object-contain'
                      />
                      <span className='text-sm font-medium text-center'>
                        {method.name}
                      </span>
                      <span className='text-xs text-gray-500 text-center'>
                        {method.description}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Payment Details Section */}
          <div className='mb-8 p-6 bg-gray-50 rounded-xl border border-gray-200'>
            <h3 className='text-xl font-bold text-gray-800 mb-4'>
              Chi tiết thanh toán
            </h3>
            <div className='space-y-3 text-gray-700'>
              <div className='flex justify-between'>
                <span>Tạm tính:</span>
                <span className='font-semibold'>
                  {formatCurrency(paymentBreakdown.subtotal)}
                </span>
              </div>
              <div className='flex justify-between'>
                <span>Mã khuyến mãi/Phiếu quà tặng:</span>
                <span className='font-semibold text-red-500'>
                  {formatCurrency(paymentBreakdown.discount)}
                </span>
              </div>
              <div className='flex justify-between'>
                <span>Phí tiện ích:</span>
                <span className='font-semibold'>
                  {formatCurrency(paymentBreakdown.utilityFee)}
                </span>
              </div>
              <div className='flex justify-between border-t border-gray-300 pt-3 mt-3 text-lg font-bold'>
                <span>Tổng tiền:</span>
                <span className='text-indigo-600'>
                  {formatCurrency(totalAmountToPay)}
                </span>
              </div>
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className='mb-8 flex items-start'>
            <input
              type='checkbox'
              id='termsCheckbox'
              className='mt-1 h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded'
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
            />
            <label
              htmlFor='termsCheckbox'
              className='ml-2 text-sm text-gray-600'
            >
              Tôi đã đọc, hiểu và đồng ý với Chính sách về quyền riêng tư, Điều
              lệ vận chuyển, Điều kiện vé và Quy định vật dụng bị cấm mang lên
              máy bay
            </label>
          </div>

          {/* Action Buttons */}
          <div className='flex justify-between gap-4'>
            <button className='flex-1 px-6 py-3 bg-gray-200 text-gray-800 font-semibold rounded-lg shadow-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 transition duration-300'>
              Quay lại
            </button>
            <button
              onClick={handleConfirmPayment}
              className={`flex-1 px-6 py-3 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-opacity-75 transition duration-300
                ${
                  agreedToTerms && selectedPaymentMethod
                    ? 'bg-green-600 hover:bg-green-700 focus:ring-green-500'
                    : 'bg-gray-400 cursor-not-allowed'
                }`}
              disabled={!agreedToTerms || !selectedPaymentMethod}
            >
              Thanh toán
            </button>
          </div>
        </div>

        {/* Booking Information Sidebar */}
        <div className='w-full lg:w-96 bg-white rounded-xl shadow-lg p-6 sm:p-8 lg:p-6'>
          <div className='flex justify-between items-center mb-6 border-b pb-4 border-gray-200'>
            <h3 className='text-xl font-bold text-gray-800'>
              THÔNG TIN ĐẶT CHỖ
            </h3>
            <span className='text-blue-600 font-semibold text-sm cursor-pointer hover:underline'>
              Chi Tiết
            </span>
          </div>

          <div className='space-y-4 text-gray-700'>
            <div className='flex flex-col'>
              <span className='text-gray-600 text-sm'>
                Thông tin hành khách:
              </span>
              <span className='font-semibold text-base'>
                {user.username || 'Đang tải...'}
              </span>
            </div>
            <div className='flex flex-col'>
              <span className='text-gray-600 text-sm'>Số ghế:</span>
              <span className='font-semibold text-base'>
                {mySeat ? mySeat : 'Chưa chọn'}
              </span>
            </div>
            <div className='flex flex-col'>
              <span className='text-gray-600 text-sm'>Chuyến đi:</span>
              <span className='font-semibold text-base'>
                {flight.arrivalAirport} - {flight.departureAirport}
              </span>
              <span className='text-sm text-gray-500'>
                {flight?.departureDateTime
                  ? format(
                      new Date(flight.departureDateTime),
                      'HH:mm dd-M-yyyy',
                      {
                        locale: vi
                      }
                    )
                  : 'N/A'}{' '}
                - {' '}
                {flight?.arrivalDateTime
                  ? format(
                      new Date(flight.arrivalDateTime),
                      'HH:mm dd-M-yyyy',
                      {
                        locale: vi
                      }
                    )
                  : 'N/A'}
              </span>
            </div>
            <div className='flex justify-between items-center text-base'>
              <span className='text-gray-600'>Giá vé:</span>
              <span className='font-semibold'>
                {formatCurrency(flight.price)}
              </span>
            </div>
            <div className='flex justify-between items-center text-base'>
              <span className='text-gray-600'>Thuế, phí:</span>
              <span className='font-semibold'>{0}</span>
            </div>
            <div className='flex justify-between items-center text-base'>
              <span className='text-gray-600'>Dịch vụ:</span>
              <span className='font-semibold'>{0}</span>
            </div>
            <div className='flex justify-between items-center border-t border-gray-300 pt-4 mt-4 text-xl font-bold text-indigo-700'>
              <span>Tổng tiền:</span>
              <span>{formatCurrency(flight.price)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {isConfirmed && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4'>
          <div className='bg-white rounded-xl shadow-2xl p-8 max-w-sm w-full text-center'>
            <svg
              className='mx-auto h-24 w-24 text-green-500 mb-4 animate-bounce'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
              ></path>
            </svg>
            <p className='mt-4 text-2xl font-semibold text-gray-800'>
              Thanh toán thành công!
            </p>
            <p className='mt-2 text-gray-600'>
              Cảm ơn bạn đã mua hàng của chúng tôi.
            </p>
            <button
              onClick={handleConfirmAfterSuccess}
              className='mt-6 px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300'
            >
              Hoàn tất
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Confirm
