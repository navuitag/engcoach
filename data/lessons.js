function buildLessons() {
  return DAY_TOPICS.map((meta) => buildLessonFromContent(meta.day, meta));
}

const english60Data = {
  totalDays: 60,
  phases: [
    { id: 1, name: "Giai đoạn 1: Nền tảng", days: "1-15", description: "Chào hỏi, số đếm, gia đình, thức ăn, thời gian cơ bản" },
    { id: 2, name: "Giai đoạn 2: Xây dựng", days: "16-30", description: "Thì quá khứ, tương lai, công việc, du lịch, giao tiếp" },
    { id: 3, name: "Giai đoạn 3: Trung cấp", days: "31-45", description: "Ngữ pháp nâng cao, tiếng Anh thương mại, văn hóa" },
    { id: 4, name: "Giai đoạn 4: Nâng cao", days: "46-60", description: "Luyện thi, fluency, hoàn thành chương trình" }
  ],
  lessons: buildLessons()
};

const IMMERSION_PROMPTS = [
  "Describe what you did this morning in English.",
  "Talk about your favorite food and why you like it.",
  "Explain your daily routine step by step.",
  "Describe your family members and their personalities.",
  "Talk about a place you want to visit and why.",
  "Describe the weather today and how it makes you feel.",
  "Explain your hobbies and how often you do them.",
  "Talk about your job or what you want to do in the future.",
  "Describe your home and favorite room.",
  "Talk about a movie or book you recently enjoyed.",
  "Explain how to get from your home to the nearest store.",
  "Describe what you are wearing today.",
  "Talk about your plans for this weekend.",
  "Describe a memorable trip you took.",
  "Explain your favorite season and activities you do.",
  "Talk about technology you use every day.",
  "Describe your ideal vacation.",
  "Talk about a skill you want to learn.",
  "Explain what makes you happy.",
  "Describe your city or town to a tourist."
];

const IMMERSION_CHECKLIST = [
  { id: "ic1", text: "Đổi ngôn ngữ điện thoại sang English", category: "Daily" },
  { id: "ic2", text: "Nghe nhạc/podcast tiếng Anh 15 phút", category: "Daily" },
  { id: "ic3", text: "Self-talk 5 phút về hoạt động hàng ngày", category: "Daily" },
  { id: "ic4", text: "Đọc 1 bài news tiếng Anh (News in Levels)", category: "Daily" },
  { id: "ic5", text: "Xem 1 video YouTube không phụ đề", category: "Weekly" },
  { id: "ic6", text: "Viết journal 5 câu bằng tiếng Anh", category: "Daily" },
  { id: "ic7", text: "Shadowing 10 phút theo native speaker", category: "Daily" },
  { id: "ic8", text: "Nghĩ bằng tiếng Anh khi làm việc nhà", category: "Daily" },
  { id: "ic9", text: "Tìm language partner online", category: "Weekly" },
  { id: "ic10", text: "Label đồ vật trong nhà bằng tiếng Anh", category: "Weekly" }
];
