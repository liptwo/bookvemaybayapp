# Troubleshooting Chat API Errors

## Vấn đề 1: 404 Error - User not found

### Lỗi
```
User not found, Không thể GET http://localhost:8017/v1/chat/open 404 (Not Found)
```

### Nguyên nhân
- User ID trong JWT token không tồn tại trong database
- User không có role admin
- Database connection issues

### Cách khắc phục

#### Bước 1: Kiểm tra admin users trong database
```bash
cd bookvexeapis
node check-admin-users.js
```

#### Bước 2: Tạo admin user mới
```bash
cd bookvexeapis
node create-admin-user.js
```

#### Bước 3: Update user hiện tại thành admin
```bash
cd bookvexeapis
node update-user-to-admin.js <email>
```

#### Bước 4: Đăng nhập với admin account
- Email: admin@example.com
- Password: admin123

#### Bước 5: Kiểm tra backend logs
Xem console logs để debug:
- User ID từ JWT token
- Database query results
- Role validation

## Vấn đề 2: Real-time updates không hoạt động

### Lỗi
```
Client tạo cuộc trò chuyện mới nhưng admin không thấy ngay, phải refresh trang
```

### Nguyên nhân
- Admin socket chưa được authenticate đúng cách
- Admin chưa join admin_room
- Socket events không được emit hoặc nhận
- Frontend không lắng nghe events đúng cách

### Cách khắc phục

#### Bước 1: Kiểm tra admin socket connection
```bash
cd bookvexeapis
node test-realtime-chat.js
```

#### Bước 2: Kiểm tra backend logs
Xem console logs để xác định:
- Admin có join admin_room không
- Event có được emit không
- Socket connection status

#### Bước 3: Kiểm tra frontend logs
Mở browser console và xem:
- Socket connection status
- Event listeners
- Conversation updates

#### Bước 4: Restart cả frontend và backend
```bash
# Backend
cd bookvexeapis
npm start

# Frontend (terminal khác)
cd bookvexeapp
npm run dev
```

#### Bước 5: Clear browser cache
- Hard refresh (Ctrl+F5)
- Clear browser cache
- Check Network tab

## Vấn đề 3: 403 Error - Admin leave conversation

### Lỗi
```
Error leaving conversation: ApiError: You are not the admin of this conversation.
```

### Nguyên nhân
- Admin cố gắng rời khỏi cuộc trò chuyện mà họ không phải là admin hiện tại
- Logic join/leave conversation có vấn đề
- Admin join nhiều cuộc trò chuyện cùng lúc

### Cách khắc phục

#### Bước 1: Kiểm tra backend logs
Xem console logs để xác định:
- Admin ID đang cố gắng rời khỏi
- Conversation ID
- Admin hiện tại của conversation

#### Bước 2: Restart backend
```bash
cd bookvexeapis
npm start
```

#### Bước 3: Clear browser cache
- Hard refresh (Ctrl+F5)
- Clear browser cache
- Check Network tab

## Vấn đề 4: 404 Error - Route not found

### Lỗi
```
GET http://localhost:8017/v1/chat/open 404 (Not Found)
```

### Nguyên nhân
- Route `/open` bị conflict với dynamic route `/:conversationId`
- Backend chưa chạy
- Route chưa được đăng ký

### Cách khắc phục

#### Bước 1: Kiểm tra backend
```bash
cd bookvexeapis
npm start
```

#### Bước 2: Test backend connection
```bash
cd bookvexeapp
node test-backend.js
```

#### Bước 3: Kiểm tra routes
Đảm bảo thứ tự routes trong `chatRoute.js`:
```javascript
// Static routes trước
Router.route('/start')
Router.route('/open')

// Dynamic routes sau
Router.route('/:conversationId/history')
Router.route('/:conversationId/message')
Router.route('/:conversationId/close')
```

## Debug Steps

### 1. Kiểm tra console logs
Mở browser console và xem:
- API URL được gọi
- Error response
- Network tab
- Socket connection status

### 2. Kiểm tra backend logs
Xem backend console để tìm lỗi:
- Route not found
- Middleware errors
- Database errors
- User authentication errors
- Socket events
- Admin room joining

### 3. Test từng endpoint
Test từng endpoint riêng biệt để xác định vấn đề cụ thể.

### 4. Test real-time functionality
```bash
cd bookvexeapis
node test-realtime-chat.js
```

## Common fixes

### Fix 1: Restart backend
```bash
cd bookvexeapis
npm start
```

### Fix 2: Clear browser cache
- Hard refresh (Ctrl+F5)
- Clear browser cache
- Check Network tab

### Fix 3: Check authentication
- Đảm bảo user đã đăng nhập
- Kiểm tra JWT token
- Kiểm tra user role là admin

### Fix 4: Check database
- MongoDB connection
- Collections exist
- Data format
- Admin users exist

### Fix 5: Create admin user
```bash
cd bookvexeapis
node create-admin-user.js
```

### Fix 6: Check socket connections
- Kiểm tra socket connection status
- Kiểm tra socket events
- Restart frontend nếu cần

### Fix 7: Check real-time updates
- Kiểm tra admin socket authentication
- Kiểm tra admin_room joining
- Kiểm tra event emission

## Expected behavior

### Success case
- Backend running on port 8017
- API endpoints respond correctly
- Authentication works
- Database connected
- Admin user exists
- Socket connections stable
- Real-time updates work

### Error cases
- 404: Route not found hoặc User not found
- 401: Unauthorized
- 403: Forbidden (không phải admin hoặc không phải admin của conversation)
- 500: Server error
- Connection refused: Backend not running
- No real-time updates: Socket issues

## Admin User Setup

### Tạo admin user mới
```bash
cd bookvexeapis
node create-admin-user.js
```

### Update user hiện tại thành admin
```bash
cd bookvexeapis
node update-user-to-admin.js user@example.com
```

### Kiểm tra admin users
```bash
cd bookvexeapis
node check-admin-users.js
```

### Login credentials
- Email: admin@example.com
- Password: admin123

## Socket Events Debug

### Admin events
- `join-conversation`: Admin tham gia cuộc trò chuyện
- `admin:leave-conversation`: Admin rời khỏi cuộc trò chuyện
- `admin:close-conversation`: Admin đóng cuộc trò chuyện

### Server events
- `server:admin-joined`: Admin đã tham gia
- `server:admin-left`: Admin đã rời đi
- `server:conversation-closed`: Cuộc trò chuyện đã đóng
- `server:conversation-updated`: Cuộc trò chuyện đã cập nhật
- `server:new-conversation-pending`: Cuộc trò chuyện mới

### Error events
- `error-joining`: Lỗi khi tham gia
- `error-leaving`: Lỗi khi rời đi
- `error-closing`: Lỗi khi đóng

## Real-time Testing

### Test real-time updates
```bash
cd bookvexeapis
node test-realtime-chat.js
```

### Expected real-time behavior
1. Admin joins admin_room khi kết nối socket
2. Client tạo conversation mới
3. Backend emits `server:new-conversation-pending`
4. Admin nhận event và cập nhật UI
5. Conversation xuất hiện trong danh sách ngay lập tức 