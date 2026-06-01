# TÀI LIỆU ĐẶC TẢ KỸ THUẬT (SRS)
## Dự án: English 60 Days Coach
### Phiên bản 1.0

## 1. Tổng quan dự án
- Ứng dụng SPA HTML/CSS/JavaScript.
- Hỗ trợ lộ trình học tiếng Anh 60 ngày.
- Tự động tổng hợp và liên kết tài liệu học tập.
- Theo dõi tiến độ, ôn tập và đánh giá.

## 2. Đối tượng người dùng
- Người mới bắt đầu.
- Học sinh THCS.
- Người đi làm.

## 3. Phạm vi hệ thống
### Bao gồm
- Vocabulary
- Grammar
- Listening
- Reading
- Speaking
- Writing
- Progress Tracking

### Không bao gồm
- AI tạo nội dung riêng
- Chấm phát âm AI
- Họp video

## 4. Kiến trúc tổng thể
Browser → SPA Application → IndexedDB/LocalStorage → Resource Aggregator

## 5. Module chính
- Dashboard
- Learning Plan
- Vocabulary
- Grammar
- Listening
- Reading
- Speaking
- Writing
- Review
- Progress

## 6. Dữ liệu
- Users
- Progress
- Vocabulary
- Notes

## 7. Nguồn học liệu
- VOA Learning English
- BBC Learning English
- ELLLO
- TED-Ed
- News in Levels
- British Council

## 8. Resource Engine
Tự động đề xuất tài liệu theo:
Ngày học → Chủ đề → Kỹ năng → Nguồn phù hợp

## 9. Lộ trình 60 ngày
Mỗi ngày:
- 10 từ mới
- 1 điểm ngữ pháp
- 1 bài nghe
- 1 bài đọc
- 1 bài nói
- 1 bài viết

## 10. MVP
Sprint 1: Dashboard, Plan, Vocabulary
Sprint 2: Grammar, Listening, Reading
Sprint 3: Speaking, Writing, Quiz
Sprint 4: Progress, PWA, Export
