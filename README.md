
# VMU Student Assistant - Triển khai & Cài đặt

## 🚀 Cách đưa App lên Web nhanh nhất
1. **Tải toàn bộ code**: Nhấn nút Download trong môi trường này.
2. **Đưa lên Vercel**:
   - Truy cập [vercel.com/deploy](https://vercel.com/deploy).
   - Kéo và thả thư mục đã tải về vào vùng kéo thả.
3. **Cấu hình API Key**:
   - Sau khi Deploy xong, vào **Settings > Environment Variables**.
   - Thêm `API_KEY` với mã Gemini của bạn.
   - Nhấn **Redeploy** lại bản mới nhất.

## 🛠 Giải quyết lỗi/cảnh báo thường gặp

### 1. "npm warn deprecated node-domexception"
- **Ý nghĩa**: Đây chỉ là cảnh báo rằng một thư viện phụ trợ của Node.js đã cũ.
- **Cách xử lý**: **BỎ QUA**. Nó không gây ảnh hưởng đến App. Bạn vẫn có thể chạy lệnh `npm install` hoặc `vercel` bình thường.

### 2. App trắng màn hình sau khi deploy
- Đảm bảo bạn đã thêm thẻ `<script type="module" src="index.tsx"></script>` trong file `index.html`. (Tôi đã cập nhật sẵn trong bản này).

## 📱 Cách cài đặt vào điện thoại
Mở link web của bạn (ví dụ: `vmu-xxx.vercel.app`) trên điện thoại:
- **Android**: Nhấn 3 chấm > "Cài đặt ứng dụng".
- **iOS (iPhone)**: Nhấn nút Chia sẻ > "Thêm vào màn hình chính".
