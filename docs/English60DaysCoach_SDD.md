# TÀI LIỆU THIẾT KẾ CHI TIẾT HỆ THỐNG (SDD)
## Dự án: English 60 Days Coach
### Phiên bản 1.0

## 1. Kiến trúc
Presentation Layer → Application Layer → Data Layer

## 2. Cấu trúc thư mục
```text
english60days/
├── index.html
├── css/
├── js/
├── data/
└── sw.js
```

## 3. Router
- /dashboard
- /plan
- /vocabulary
- /grammar
- /listening
- /reading
- /speaking
- /writing
- /review
- /progress

## 4. IndexedDB
Database: EnglishCoachDB

Stores:
- user
- progress
- notes
- vocabulary

## 5. Module Dashboard
- Hiển thị ngày học
- Tiến độ
- Streak
- Nhiệm vụ hôm nay

## 6. Learning Plan Module
Load dữ liệu JSON theo ngày học.

## 7. Resource Aggregator
Input:
- day
- topic
- skill
- level

Output:
- resourceList[]

## 8. Vocabulary Module
- Flashcards
- Quiz
- SRS Review

## 9. SRS Engine
Chu kỳ:
1 → 3 → 7 → 14 → 30 ngày

## 10. Grammar Module
- Bài học
- Ví dụ
- Bài tập

## 11. Listening Module
- Audio
- Transcript
- Tracking

## 12. Reading Module
- Highlight từ mới
- Ghi chú

## 13. Speaking Module
- Shadowing
- Recording

## 14. Writing Module
- Journal
- Word Count
- Sentence Count

## 15. Quiz Engine
- Vocabulary Quiz
- Grammar Quiz
- Mixed Quiz

## 16. Progress Module
Theo dõi:
- Time Spent
- Completion Rate
- Quiz Score

## 17. Recommendation Engine
Tự động tăng/giảm độ khó theo kết quả học.

## 18. Offline & PWA
- Service Worker
- Cache First
- Manifest

## 19. Security
- IndexedDB
- escapeHTML()

## 20. Roadmap
5 Sprint phát triển MVP.
