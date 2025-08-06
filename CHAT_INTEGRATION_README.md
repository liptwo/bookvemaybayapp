# Chat System Integration Guide

## Tổng quan
Hệ thống chat đã được tích hợp hoàn chỉnh vào frontend với các tính năng real-time communication giữa client và admin.

## Cấu trúc Files

### Backend (bookvexeapis)
```
src/
├── routes/v1/chatRoute.js          # Chat API routes
├── controllers/chatController.js    # Chat controllers
├── services/chatService.js         # Chat business logic
├── models/
│   ├── conversationModel.js        # Conversation model
│   └── messageModel.js             # Message model
├── sockets/chatSocket.js           # Socket.IO chat events
├── middlewares/
│   ├── authMiddlewares.js          # Auth & admin middleware
│   └── socketMiddleware.js         # Socket middleware
└── config/socket.js                # Socket configuration
```

### Frontend (bookvexeapp)
```
src/
├── apis/chatAPI.js                 # Chat API functions
├── hooks/useChat.js                # Custom chat hook
├── components/Chat/
│   ├── ChatProvider.jsx            # Chat context provider
│   ├── ChatWidget.jsx              # Chat widget component
│   ├── ChatButton.jsx              # Chat button component
│   ├── StaffChat.jsx               # Admin chat interface
│   └── UserChat.jsx                # Client chat interface
├── socketClient.js                 # Socket.IO client config
└── App.jsx                         # Main app with chat integration
```

## Tính năng chính

### ✅ Client Features
- Bắt đầu cuộc trò chuyện mới
- Gửi tin nhắn real-time
- Nhận tin nhắn từ admin
- Form nhập thông tin cá nhân

### ✅ Admin Features
- Xem danh sách cuộc trò chuyện đang mở
- Tham gia cuộc trò chuyện
- Gửi tin nhắn real-time
- Rời khỏi cuộc trò chuyện
- Đóng cuộc trò chuyện
- Lọc cuộc trò chuyện (tất cả/chưa đọc)

### ✅ Real-time Features
- Socket.IO connection
- Instant message delivery
- Live conversation updates
- Admin notifications
- Error handling

## Cách sử dụng

### 1. Khởi động Backend
```bash
cd bookvexeapis
npm start
```

### 2. Khởi động Frontend
```bash
cd bookvexeapp
npm run dev
```

### 3. Sử dụng Chat

#### Cho Client (Khách hàng)
1. Click vào nút chat ở góc phải dưới
2. Nhập họ tên và email
3. Click "Bắt đầu chat"
4. Bắt đầu gửi tin nhắn

#### Cho Admin (Nhân viên)
1. Đăng nhập với tài khoản admin
2. Click vào nút chat (sẽ hiển thị Staff Chat)
3. Chọn cuộc trò chuyện từ danh sách
4. Bắt đầu trả lời khách hàng

## API Endpoints

### Client APIs
- `POST /v1/chat/start` - Bắt đầu cuộc trò chuyện
- `GET /v1/chat/:id/history` - Lấy lịch sử tin nhắn

### Admin APIs
- `GET /v1/chat/open` - Danh sách cuộc trò chuyện đang mở
- `POST /v1/chat/:id/message` - Gửi tin nhắn
- `PUT /v1/chat/:id/close` - Đóng cuộc trò chuyện

## Socket Events

### Client Events
- `join-conversation` - Tham gia cuộc trò chuyện
- `client:send-message` - Gửi tin nhắn

### Admin Events
- `join-conversation` - Tham gia cuộc trò chuyện
- `client:send-message` - Gửi tin nhắn
- `admin:leave-conversation` - Rời khỏi cuộc trò chuyện
- `admin:close-conversation` - Đóng cuộc trò chuyện

### Server Events
- `server:receive-message` - Nhận tin nhắn mới
- `server:admin-joined` - Admin tham gia
- `server:admin-left` - Admin rời đi
- `server:conversation-closed` - Cuộc trò chuyện đóng
- `server:new-conversation-pending` - Cuộc trò chuyện mới (admin)
- `server:conversation-updated` - Cập nhật cuộc trò chuyện (admin)

## Cấu hình

### Backend Configuration
```javascript
// src/config/socket.js
export const initSocket = (httpServer) => {
  io = new Server(httpServer, {
    cors: {
      origin: 'http://localhost:5173', // Frontend URL
      methods: ['GET', 'POST']
    }
  })
  configureChatSocket(io)
}
```

### Frontend Configuration
```javascript
// src/socketClient.js
export const createChatSocket = (authData = null) => {
  const options = {
    path: '/socket.io/',
    transports: ['websocket', 'polling']
  }
  
  if (authData) {
    options.auth = authData
  }
  
  return io(`${API_ROOT}/chat`, options)
}
```

## Database Schema

### Conversations Collection
```javascript
{
  _id: ObjectId,
  clientInfo: {
    name: String,
    email: String
  },
  adminId: ObjectId, // null initially
  status: String, // 'pending', 'active', 'closed'
  createdAt: Date,
  updatedAt: Date
}
```

### Messages Collection
```javascript
{
  _id: ObjectId,
  conversationId: ObjectId,
  senderId: String, // client socket.id or admin userId
  senderRole: String, // 'client' or 'admin'
  content: String,
  createdAt: Date
}
```

## Error Handling

### Frontend Error Handling
- Toast notifications cho API errors
- Error display trong chat interface
- Socket connection error handling
- Form validation

### Backend Error Handling
- API error responses với status codes
- Socket error events
- Database error handling
- Authentication error handling

## Security Features

### Authentication
- JWT token validation cho admin APIs
- Role-based access control
- Admin-only endpoints protection

### Socket Security
- Admin authentication qua socket auth
- Room-based message isolation
- Input validation và sanitization

## Performance Optimizations

### Frontend
- React hooks optimization
- Socket connection management
- Message pagination (có thể mở rộng)
- Debounced input handling

### Backend
- Database indexing
- Socket room management
- Efficient message queries
- Connection pooling

## Troubleshooting

### Common Issues

1. **Socket không kết nối**
   - Kiểm tra backend đã chạy chưa
   - Kiểm tra CORS configuration
   - Kiểm tra network connectivity

2. **Admin không thấy cuộc trò chuyện**
   - Kiểm tra user role có phải admin không
   - Kiểm tra JWT token có hợp lệ không
   - Kiểm tra socket auth data

3. **Tin nhắn không gửi được**
   - Kiểm tra socket connection
   - Kiểm tra conversation status
   - Kiểm tra input validation

### Debug Tips
- Mở browser console để xem socket events
- Kiểm tra Network tab để xem API calls
- Sử dụng MongoDB Compass để xem database
- Kiểm tra backend logs

## Mở rộng tính năng

### Có thể thêm
- File/image sharing
- Typing indicators
- Read receipts
- Message reactions
- Chat history export
- Auto-reply messages
- Chat analytics
- Multi-language support

### Performance improvements
- Message pagination
- Image compression
- WebSocket fallback
- Connection pooling
- Caching strategies 