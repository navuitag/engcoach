# English 60 Days Coach (EngCoach)

Ứng dụng PWA học tiếng Anh 60 ngày — HTML/CSS/JavaScript thuần, không cần backend.

## Tính năng

- **Dashboard** — Tiến độ 60 ngày, streak, nhiệm vụ hôm nay, theo giai đoạn
- **Today** — Lịch 90 phút/ngày, checklist từng khối, YouTube embed, từ vựng & ngữ pháp
- **Library** — Thư viện tài liệu curated (BBC, British Council, VOA, v.v.)
- **Vocabulary** — Flashcard + SRS (chu kỳ 1→3→7→14→30 ngày) + Quiz
- **Grammar / Listening / Reading / Speaking / Writing** — Theo bài học từng ngày
- **Immersion** — Self-talk prompts, checklist, shadowing timer
- **Progress** — Biểu đồ tuần, ghi chú nhanh, thống kê
- **Offline** — Service Worker cache + cài đặt PWA

## Tech Stack

- HTML5, CSS3, Vanilla JavaScript (ES6)
- localStorage + IndexedDB
- Chart.js (CDN), Service Worker, Web Manifest

## Chạy ứng dụng

```bash
cd engcoach
python3 -m http.server 8080
```

Mở trình duyệt: `http://localhost:8080`

> Cần chạy qua HTTP (không mở file trực tiếp) để Service Worker và ghi âm hoạt động.

## Cấu trúc thư mục

```text
engcoach/
├── index.html
├── manifest.json
├── service-worker.js
├── css/style.css
├── js/
│   ├── app.js
│   ├── router.js
│   ├── storage.js
│   ├── progress.js
│   ├── flashcard.js
│   ├── audio.js
│   └── utils.js
├── data/
│   ├── topics.js       # Chủ đề 60 ngày, từ vựng, ngữ pháp
│   ├── day-content.js  # Nội dung chi tiết từng ngày
│   ├── lessons.js      # Dữ liệu bài học (build từ day-content)
│   ├── vocabulary.js
│   └── resources.js
└── assets/icons/
```

## Dữ liệu

- `data/lessons.js` — 60 bài học (5 phiên × 90 phút/ngày)
- `data/vocabulary.js` — Flashcard + SRS
- `data/resources.js` — Link YouTube/website curated

Tiến độ lưu tự động trong trình duyệt (localStorage + IndexedDB).

---

## Tác giả

- **Nguyễn Anh Vũ**
- Email: [navuitag@gmail.com](mailto:navuitag@gmail.com)
- Điện thoại: [0986201079](tel:+84986201079)
