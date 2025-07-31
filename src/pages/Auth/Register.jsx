import React from 'react'

const Register = () => {
  return (
    <div       style={{
        minHeight: '100vh',
        width: '100%',
        backgroundImage: `url('https://i.pinimg.com/736x/8a/2f/21/8a2f21a357652e94e28956159100375c.jpg')`, 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <form className="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg w-full max-w-md space-y-4">
        <h2 className="text-2xl font-bold text-center text-blue-800">Đăng ký tài khoản</h2>

        <input type="text" placeholder="Họ và tên" className="w-full border rounded px-4 py-2" required />
        <input type="date" placeholder="Ngày sinh" className="w-full border rounded px-4 py-2" required />
        <input type="text" placeholder="Địa chỉ" className="w-full border rounded px-4 py-2" required />
        <input type="tel" placeholder="Số điện thoại" className="w-full border rounded px-4 py-2" required />
        <input type="email" placeholder="Email" className="w-full border rounded px-4 py-2" required />
        <input type="text" placeholder="CCCD" className="w-full border rounded px-4 py-2" required />
        <input type="text" placeholder="Quê quán" className="w-full border rounded px-4 py-2" required />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Đăng ký
        </button>
      </form>
    </div>
  )
}



export default Register
