
# VMU Student Assistant - Fix Deploy

## 🛠 Cách sửa lỗi trên Vercel
1. **Tải lại code**: Nhấn nút Download bản mới nhất này.
2. **Xóa Project cũ trên Vercel**: Để tránh cache lỗi, bạn hãy xóa project cũ đi và tạo lại (New Project).
3. **Upload lại**: Kéo thả thư mục mới vào.
4. **Cấu hình API Key (QUAN TRỌNG)**:
   - Vào **Settings > Environment Variables**.
   - Name: `API_KEY`
   - Value: (Mã API của bạn)
   - Nhấn **Save**.
5. **Redeploy**: Vào tab **Deployments**, nhấn vào nút 3 chấm ở bản deploy lỗi và chọn **Redeploy**.

Lỗi `node-domexception` bạn thấy chỉ là cảnh báo, bản cập nhật này sẽ giúp Vite bỏ qua các cảnh báo đó và Build thành công thư mục `dist`.
