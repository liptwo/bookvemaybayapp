import * as React from 'react'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { useForm } from 'react-hook-form'
import { Plane } from 'lucide-react'
import { Box } from '@mui/material'
import { useNavigate } from 'react-router-dom'
// import { Navigate } from 'react-router-dom'

export default function Login() {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const onSubmit = data => {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ padding: '20px' }}>
      <Card
        sx={{
          minWidth: 400,
          maxWidth: 500,
          p: 3,
          mt: '50%',
          left: '50%',
          gap:2,
          // position: 'absolute',
          // transform: 'translate(-50%, -50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap:2, pb: 2 }}>
          <Typography sx={{ fontWeight: '700' }} variant="h6">
            Login
          </Typography>
          <Plane />
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
          size= 'small'
          error={Boolean(errors.email)}
          helperText={errors.email?.message}
          sx={{ pb: 2 }}
          id="email"
          label="Email"
          variant="outlined"
        />

        <TextField
          {...register('password', {
            required: 'Mật khẩu không được để trống',
            minLength: {
              value: 6,
              message: 'Mật khẩu phải có ít nhất 6 ký tự'
            }
          })}
          size= 'small'
          fullWidth
          error={Boolean(errors.password)}
          helperText={errors.password?.message}
          sx={{ pb: 2 }}
          id="password"
          label="Password"
          type="password"
          variant="outlined"
        />

        <Button type="submit" fullWidth variant="contained">
          Sign in
        </Button>
        <Typography sx={{ fontWeight: '300'}} variant="span">
            Nếu chưa có tài khoản, hãy {" "}
          <span className='text-amber-500 cursor-pointer hover:text-amber-300' onClick={() => {navigate('/register')}}> Đăng ký</span>
        </Typography>

      </Card>
    </form>
  )
}
