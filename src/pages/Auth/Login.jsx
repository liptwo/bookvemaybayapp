import * as React from 'react'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { useForm } from 'react-hook-form'
import { Plane } from 'lucide-react'
import { Box } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { Mail } from 'lucide-react'
import InputAdornment from '@mui/material/InputAdornment'
// import { Navigate } from 'react-router-dom'
import Checkbox from '@mui/material/Checkbox'
import { LogIn } from 'lucide-react'
import { TypeAnimation } from 'react-type-animation'
import { useDispatch } from 'react-redux'
import { loginAPI } from '~/redux/item/userSlice'
import { toast } from 'react-toastify'

export default function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const submitLogin = async ( data ) => {
    // console.log('🚀 ~ Login.jsx:18 ~ submitLogin ~ data:', data)
    const { email, password } = data
    toast.promise(dispatch(loginAPI({ email, password }) ), { pending: 'Logging progress ...' }
    ).then( res => {
      // kiểm tra không có lỗi thì mới redirect về route
      if ( !res.error ) {navigate('/')}
    }
    )
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100%',
        backgroundImage: `url('https://static.vinwonders.com/production/ve-may-bay-chu-lai-ha-noi-banner.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        // fontFamily: 'Montserrat Variable'
      }}
    >
      <form
        onSubmit={handleSubmit(submitLogin)}
        style={{ width: '100%', maxWidth: 450, padding: 20 }}
      >
        <Card
          sx={{
            width: '100%',
            p: 3,
            gap: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.)',
            borderRadius: 2,
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
            backdropFilter: 'blur(10px)',
            color: 'white'
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
              justifyContent: 'center',
              gap: 2,
              pb: 2
            }}
          >
            <Typography
              sx={{
                fontWeight: '800',
                fontSize: 'medium',
                display: 'flex',
                gap: 1,
                alignItems: 'center',
                color:'black',
                justifyContent: 'center',
                fontFamily: 'Montserrat Variable'
              }}
              variant='h6'
            >
              Sign In <LogIn color='#333' size={20} />
            </Typography>
            {/* <Typography sx={{ fontWeight: '500', fontSize:'small' }} variant='span'>
              Please Enter Your Account
            </Typography> */}
            {/* <Plane color='#333' /> */}
            <TypeAnimation
              // className="text-3xl font-bold text-gray-800"
              // Initial text to display
              sequence={[
                // Same substring at the start will only be typed out once, initially
                'Please Enter Your Account',
                1000, // wait 1s before replacing "Mice" with "Hamsters"
                'Welcome to Book Ticket Plane',
                1000
              ]}
              wrapper='span'
              speed={10}
              style={{
                fontSize: '1rem',
                display: 'inline-block',
                fontWeight: '500',
                color: 'black',
                fontFamily: 'Montserrat Variable'
              }}
              repeat={Infinity}
            />
          </Box>

          <TextField
            {...register('email', {
              required: 'Email không được để trống',
              pattern: {
                value: /^\S+@\S+$/i,
                message: 'Email không hợp lệ'
              }
            })}
            fullWidth
            size='small'
            error={Boolean(errors.email)}
            helperText={errors.email?.message}
            sx={{ pb: 2 , fontFamily: 'Montserrat Variable'}}
            id='email'
            label='Email'
            variant='outlined'
          />

          <TextField
            {...register('password', {
              required: 'Mật khẩu không được để trống',
              minLength: {
                value: 6,
                message: 'Mật khẩu phải có ít nhất 6 ký tự'
              }
            })}
            size='small'
            fullWidth
            error={Boolean(errors.password)}
            helperText={errors.password?.message}
            sx={{ pb: 2, fontFamily: 'Montserrat Variable' }}
            id='password'
            label='Password'
            type='password'
            variant='outlined'
          />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
              mb: 2 // margin-bottom
            }}
          >
            {/* Remember me */}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <input type='checkbox' id='remember' />
              <label
                htmlFor='remember'
                style={{ marginLeft: 8, color: '#333', fontFamily: 'Montserrat Variable' }}
              >
                Remember me
              </label>
            </Box>

            {/* Forget password */}
            <Typography
              variant='body2'
              sx={{
                color: 'black',
                cursor: 'pointer',
                fontFamily: 'Montserrat Variable',
                textDecoration: 'underline',
                '&:hover': { color: '#ccc' }
              }}
              onClick={() => {
                // xử lý điều hướng nếu cần
                console.log('Quên mật khẩu được nhấn')
              }}
            >
              Forget Password?
            </Typography>
          </Box>

          <Button type='submit' sx={{fontFamily: 'Montserrat Variable'}} fullWidth variant='contained'>
            Sign In
          </Button>
          <Typography sx={{ fontWeight: '400', fontFamily: 'Montserrat Variable' }} color={'black'} variant='span'>
            Don't have an account? {''}
            <span
              className='text-blue-800 hover:text-blue-300'
              style={{fontFamily: 'Montserrat Variable'}}
              onClick={() => {
                navigate('/register')
              }}
            >
              {' '}
              Sign up
            </span>
          </Typography>
        </Card>
      </form>
    </div>
  )
}
