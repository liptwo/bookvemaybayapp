# BookVeXeApp - Giao diện Đặt vé máy bay

Đây là dự án Frontend cho hệ thống đặt vé máy bay, được xây dựng bằng React.js. Giao diện được thiết kế để tương tác với [BookVeXeAPIs](https://github.com/your-username/BookVeXeAPIs) (bạn có thể thay link tới repo backend của mình ở đây), cung cấp trải nghiệm người dùng mượt mà từ tìm kiếm chuyến bay đến hỗ trợ trực tuyến.

## ✨ Tính năng chính

-   **Xác thực & Phân quyền:**
    -   Đăng ký và Đăng nhập tài khoản người dùng.
    -   Sử dụng `HttpOnly Cookies` và `Refresh Token` để duy trì phiên đăng nhập an toàn.
    -   Phân quyền truy cập các trang dựa trên vai trò người dùng (Client, Admin).
    -   Tự động chuyển hướng người dùng chưa đăng nhập về trang Login.

-   **Luồng Đặt vé:**
    -   Trang chủ với chức năng tìm kiếm chuyến bay theo điểm đi, điểm đến và ngày.
    -   Trang kết quả tìm kiếm, hiển thị danh sách các chuyến bay phù hợp.
    -   Trang chọn ghế ngồi trực quan, tương tác trong thời gian thực (ghế đang được người khác chọn sẽ bị khóa tạm thời).
    -   Thực hiện đặt vé và nhận thông báo.

-   **Quản lý tài khoản:**
    -   Trang cài đặt cho phép người dùng cập nhật thông tin cá nhân và bảo mật.

-   **Tính năng cho Admin:**
    -   Trang chat riêng biệt (`/staffchat`) để nhận và trả lời tin nhắn hỗ trợ từ khách hàng trong thời gian thực.

-   **Hỗ trợ trực tuyến (Live Chat):**
    -   Khách hàng (cả đã đăng nhập và chưa đăng nhập) có thể bắt đầu cuộc trò chuyện với nhân viên hỗ trợ.
    -   Widget chat được tích hợp trên toàn bộ trang web.

## 🚀 Công nghệ sử dụng

-   **Thư viện chính:** React.js
-   **Routing:** React Router DOM
-   **Quản lý State:** Redux Toolkit
-   **Giao tiếp API:** Axios
-   **Styling:** Tailwind CSS
-   **Thông báo:** React Toastify
-   **Real-time:** Socket.IO Client

## 📂 Cấu trúc thư mục
Dự án được tổ chức theo cấu trúc hướng tính năng (feature-oriented), giúp dễ dàng quản lý và mở rộng.
├── public/ 
├── src/
│ ├── apis/          # Chứa các hàm gọi API (ví dụ: chatAPI.js, index.js)
│ ├── assets/        # Nơi lưu trữ tài nguyên tĩnh (hình ảnh, icons)
│ ├── components/    # Chứa các component tái sử dụng (Chat, AppBar, etc.)
│ ├── hooks/         # Nơi lưu trữ các custom hooks
│ ├── pages/         # Chứa các trang chính của ứng dụng (Home, Auth, BookingPage)
│ ├── redux/         # Nơi cấu hình Redux (store, slices)
│ ├── utils/         # Chứa các hàm tiện ích (axios instance, constants)
│ ├── App.jsx        # Component gốc, quản lý routing
│ ├── App.css        # Chứa CSS toàn cục và các animation tùy chỉnh
│ └── main.jsx       # Điểm khởi đầu của ứng dụng React
├── .env             # Tệp chứa các biến môi trường (cần tự tạo)
├── package.json     # Chứa thông tin về dự án và các dependencies
└── README.md


## 🛠️ Cài đặt và Chạy dự án

1.  **Clone repository:**
    ```bash
    git clone <your-repository-url>
    cd bookvexeapp
    ```

2.  **Cài đặt các dependencies:**
    ```bash
    npm install
    ```
    hoặc
    ```bash
    yarn install
    ```

3.  **Tạo file `.env`:**
    Tạo một file `.env` ở thư mục gốc của dự án và thêm vào biến môi trường để kết nối đến backend.

    ```env
    # Thay đổi URL này thành địa chỉ API backend của bạn
    VITE_API_ROOT=http://localhost:8017
    ```

4.  **Chạy ứng dụng ở chế độ development:**
    ```bash
    npm run dev
    ```
    hoặc
    ```bash
    yarn dev
    ```
    Mở trình duyệt và truy cập vào `http://localhost:5173` (hoặc cổng khác được hiển thị trên terminal).

---

Hy vọng tài liệu này hữu ích cho dự án của bạn!

