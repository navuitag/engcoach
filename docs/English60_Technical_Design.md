TÀI LIỆU ĐẶC TẢ KỸ THUẬT (Technical Specification)
Ứng dụng Hỗ trợ Học Tiếng Anh 60 Ngày – Pure HTML + JavaScript
Tên dự án: English60 – Personal English Learning Dashboard
Phiên bản: 1.0
Ngày lập: 01/06/2026
Mục đích: Xây dựng một Progressive Web App (PWA) đơn giản, chạy hoàn toàn trên trình duyệt (không cần server), tự động tổng hợp và liên kết tất cả tài liệu theo kế hoạch 60 ngày đã thảo luận.

1. Giới thiệu & Mục tiêu
Mục tiêu chính:

Giúp người học mới bắt đầu thực hiện đúng kế hoạch 60 ngày mà không phải mất thời gian tìm kiếm tài liệu.
Cung cấp lịch học hàng ngày, theo dõi tiến độ, và immersion nhanh.
Tất cả tài liệu (YouTube, website, podcast) được tích hợp sẵn dưới dạng link + mô tả.
Giao diện thân thiện, mobile-first, có thể cài đặt như app thật (PWA).

Phạm vi:

Chỉ dùng HTML5 + CSS3 + Vanilla JavaScript (có thể dùng Tailwind CSS qua CDN).
Lưu dữ liệu bằng localStorage.
Không cần backend, không đăng nhập (single user).


2. Yêu cầu Chức năng (Functional Requirements)
Module 1: Dashboard & Lịch Học

Hiển thị tiến độ tổng thể (60 ngày, % hoàn thành).
Xem lịch theo Giai đoạn (1-4) và Ngày hiện tại.
Nút “Start Today’s Session” → mở lịch 90 phút chi tiết.
Theo dõi streak (số ngày học liên tục).

Module 2: Daily Lesson Planner
Mỗi ngày hiển thị:

Thời gian biểu 90 phút (các khối: Pronunciation, Vocab+Grammar, Listening…).
Link tài liệu tích hợp sẵn cho từng phần (YouTube embed hoặc link trực tiếp).
Checklist hoàn thành từng khối.
Gợi ý Immersion cho ngày đó.

Module 3: Resource Library (Tự động tổng hợp)

Phân loại theo kỹ năng: Listening, Speaking, Reading, Writing, Vocabulary, Pronunciation, Immersion.
Danh sách tài liệu curated (cập nhật thủ công trong JSON).
Tìm kiếm nhanh theo chủ đề (Family, Food, Travel…).

Module 4: Progress Tracker

Ghi nhật ký học (Quick note).
Thống kê: Số giờ nghe, số từ đã học, số lần shadowing.
So sánh tiến bộ (Ghi âm Speaking tuần 1 vs tuần 8 – lưu file audio local).

Module 5: Immersion Tools

Self-talk prompt generator (random câu để nói một mình).
Daily immersion checklist (đổi ngôn ngữ điện thoại, nghe nhạc…).
Timer shadowing.

Module 6: Vocabulary & Anki-like

Flashcard cơ bản (dùng array JSON).
Spaced repetition đơn giản (localStorage).


3. Cấu trúc Dữ liệu (Data Model – JSON)
JavaScript// lessons.json (hoặc nhúng trực tiếp trong JS)
{
    "day": 1,
    "phase": 1,
    "title": "Ngày 1: Chào hỏi & Âm cơ bản",
    "focus": "Pronunciation + Basic Greetings",
    "duration": 90,
    "sessions": [
      {
        "id": "s1",
        "time": "0-15",
        "skill": "Pronunciation",
        "title": "Basic Vowel Sounds & Shadowing",
        "description": "Học và luyện âm nguyên âm cơ bản",
        "resources": [
          {
            "type": "youtube",
            "url": "https://www.youtube.com/watch?v=p1SRYnumsBE",
            "title": "Rachel's English - Master The Sounds",
            "duration": "12:00",
            "embed": true
          }
        ],
        "task": "Shadowing 3 lần theo video"
      },
      {
        "id": "s2",
        "time": "15-35",
        "skill": "Vocabulary + Grammar",
        "title": "Greetings & Self-introduction",
        "description": "Học 15 từ/cụm từ chào hỏi + cấu trúc câu Hello",
        "resources": [
          {
            "type": "website",
            "url": "https://learnenglish.britishcouncil.org/",
            "title": "British Council - Greetings"
          }
        ],
        "vocab": ["hello", "hi", "good morning", "nice to meet you", "my name is", "thank you"],
        "grammar": ["be verb (am/is/are)", "Simple present"]
      },
      {
        "id": "s3",
        "time": "35-55",
        "skill": "Listening",
        "title": "Listening Practice",
        "resources": [
          {
            "type": "youtube",
            "url": "https://www.youtube.com/watch?v=YAsDeXcYyTg",
            "title": "6 Minute English - Scared to speak English?"
          }
        ],
        "task": "Nghe 2 lần, ghi từ mới"
      },
      {
        "id": "s4",
        "time": "55-75",
        "skill": "Speaking",
        "title": "Shadowing & Self-talk",
        "task": "Ghi âm giới thiệu bản thân 30 giây"
      },
      {
        "id": "s5",
        "time": "75-90",
        "skill": "Reading + Writing",
        "title": "Simple Reading & Writing",
        "resources": [
          {
            "type": "website",
            "url": "https://learnenglish.britishcouncil.org/free-resources/reading/a1/poster-work",
            "title": "A1 Reading - A poster at work"
          }
        ],
        "task": "Đọc bài + viết 5 câu giới thiệu"
      }
    ],
    "immersion": [
      "Đổi ngôn ngữ điện thoại sang English",
      "Nghe 1 bài hát tiếng Anh có lyrics",
      "Self-talk: Mô tả hoạt động buổi sáng"
    ],
    "dailyVocabCount": 15,
    "review": ["Từ vựng ngày hôm qua"]
  }
Tương tự cho từ vựng theo giai đoạn, chủ đề.

4. Kiến trúc Hệ thống

Frontend: Single Page Application (SPA) với JavaScript thuần.
Routing: Hash routing (#day-15) hoặc History API.
Storage:
localStorage cho tiến độ, notes, flashcards.
IndexedDB (nâng cao) cho audio ghi âm nếu cần.

PWA Features:
manifest.json
Service Worker (cache assets, offline mode).

Thư viện:
Tailwind CSS (CDN).
Chart.js (biểu đồ tiến độ).
Howler.js hoặc Audio API (phát audio).
Responsive design.



5. Giao diện & Trải nghiệm Người dùng (UI/UX)

Màu sắc: Xanh dương + trắng (tươi sáng, dễ nhìn).
Trang chính:
Sidebar (mobile: bottom nav): Home, Today, Library, Progress, Immersion.

Mobile-first: Hoàn toàn responsive.
Accessibility: Alt text, keyboard navigation, high contrast.


6. Danh sách Tài nguyên Tích hợp Sẵn (Curated – 2026)
Dựa trên các nguồn uy tín hiện tại:
Pronunciation: Rachel’s English, BBC Learning English, ELSA Speak (web).
Listening: BBC 6 Minute English, VOA Learning English, EnglishClass101 Beginner.
YouTube Channels: English with Lucy, mmmEnglish, Woodward English, Let’s Talk, Speak English With Vanessa.
Reading: British Council LearnEnglish, BBC Learning English articles.
Vocabulary/Grammar: Cambridge Dictionary, Duolingo-style cards (tự build).
Immersion: Spotify playlists, YouTube music với lyrics.
Tất cả sẽ được lưu trong một mảng JSON lớn.

7. Yêu cầu Phi Chức năng (Non-functional)

Hiệu năng: Load dưới 2 giây, mượt mà trên điện thoại.
Offline: Hoạt động được khi không có mạng (cache resources).
Bảo mật: Không thu thập dữ liệu cá nhân.
Dễ Bảo trì: Code sạch, comment rõ ràng, dữ liệu tách biệt trong JSON.
Scalability: Dễ mở rộng thêm ngày hoặc giai đoạn mới.


8. Các Trang Chính (Pages)

index.html – Dashboard
today.html hoặc section – Daily Session
library.html – Resource Library
progress.html – Tracker
immersion.html – Immersion Tools


9. ấu trúc Folder Tổng thể
english60-app/
├── index.html                  # Trang chính (Dashboard)
├── manifest.json               # PWA configuration
├── service-worker.js           # Service Worker cho offline mode
├── README.md                   # Hướng dẫn dự án
├── LICENSE                     # (tùy chọn)

├── css/
│   ├── style.css               # CSS chính
│   ├── tailwind.css            # (nếu dùng Tailwind qua CDN hoặc build)
│   └── components/             # CSS cho các component riêng
│       ├── dashboard.css
│       ├── lesson.css
│       └── progress.css

├── js/
│   ├── app.js                  # File chính, khởi tạo ứng dụng
│   ├── router.js               # Xử lý chuyển trang (SPA)
│   ├── storage.js              # LocalStorage helper
│   ├── progress.js             # Quản lý tiến độ học
│   ├── flashcard.js            # Hệ thống flashcard
│   ├── audio.js                # Ghi âm & phát audio
│   └── utils.js                # Các hàm hỗ trợ chung

├── data/
│   ├── lessons.js              # Toàn bộ JSON 60 ngày (english60Data)
│   ├── vocabulary.js           # Từ vựng theo giai đoạn/chủ đề
│   └── resources.js            # Danh sách tài nguyên (YouTube, website...)

├── assets/
│   ├── images/                 # Logo, icon, background
│   │   ├── logo.png
│   │   ├── dashboard-bg.jpg
│   │   └── icons/
│   ├── icons/                  # PWA icons (192x192, 512x512...)
│   └── audio/                  # (tùy chọn) File audio mẫu

├── pages/                      # (Tùy chọn) HTML fragments cho SPA
│   ├── dashboard.html
│   ├── today.html
│   ├── library.html
│   ├── progress.html
│   └── immersion.html

├── components/                 # HTML templates (nếu dùng JS render)
│   ├── lesson-card.html
│   ├── session-item.html
│   └── progress-bar.html

└── docs/                       # Tài liệu
    ├── technical-spec.md
    └── user-guide.md
10. File manifest.json mẫu (PWA)
{
  "name": "EngCoach - Học Tiếng Anh 60 Ngày",
  "short_name": "EngCoach",
  "description": "Kế hoạch học tiếng Anh cho người mới bắt đầu",
  "start_url": "/index.html",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#0ea5e9",
  "icons": [
    {
      "src": "assets/icons/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "assets/icons/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}