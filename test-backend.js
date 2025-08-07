const axios = require('axios')

const API_BASE = 'http://localhost:8017'

async function testBackend() {
  console.log('Testing backend connection...\n')

  try {
    // Test 1: Check if backend is running
    console.log('1. Testing backend status')
    const statusResponse = await axios.get(`${API_BASE}/v1/status`)
    console.log('✅ Backend is running:', statusResponse.data)

    // Test 2: Test chat start endpoint
    console.log('\n2. Testing chat start endpoint')
    const chatResponse = await axios.post(`${API_BASE}/v1/chat/start`, {
      name: 'Test User',
      email: 'test@example.com'
    })
    console.log('✅ Chat start endpoint works:', chatResponse.data)

    // Test 3: Test chat open endpoint (should fail without auth)
    console.log('\n3. Testing chat open endpoint (without auth)')
    try {
      await axios.get(`${API_BASE}/v1/chat/open`)
    } catch (error) {
      if (error.response?.status === 401) {
        console.log('✅ Chat open endpoint requires auth (expected)')
      } else {
        console.log('❌ Unexpected error:', error.response?.status)
      }
    }

    console.log('\n✅ Backend tests completed successfully!')

  } catch (error) {
    console.error('❌ Backend test failed:', error.message)
    if (error.code === 'ECONNREFUSED') {
      console.error('Backend is not running. Please start the backend server.')
    }
  }
}

testBackend() 