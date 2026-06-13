/**
 * Nội dung chi tiết theo chủ đề / ngày học
 * Mỗi ngày: objectives, phiên học cụ thể, câu mẫu, immersion
 */
const TOPIC_DETAILS = {
  Greetings: {
    level: "A1",
    objectives: ["Phát âm 5 nguyên âm cơ bản", "Dùng được 12 cụm chào hỏi", "Giới thiệu bản thân 30 giây"],
    pronunciation: {
      title: "Vowel Sounds: /i/ /ɪ/ /e/ /æ/ /ʌ/",
      description: "Phân biệt sheep/ship, bed/bad — nền tảng phát âm tiếng Anh",
      task: "Shadowing đoạn 1-3 của video, ghi âm và so sánh",
      resource: { type: "youtube", url: "https://www.youtube.com/watch?v=p1SRYnumsBE", title: "Rachel's English - Vowel Sounds", duration: "12 min" }
    },
    vocabulary: {
      title: "Greetings & Self-introduction",
      description: "12 cụm chào hỏi thông dụng + động từ to be",
      task: "Viết 8 câu: 3 chào hỏi, 3 giới thiệu, 2 cảm ơn/xin lỗi",
      resource: { type: "website", url: "https://learnenglish.britishcouncil.org/free-resources/speaking/a1/meeting-new-people", title: "BC A1 - Meeting new people" },
      examples: ["Hello, my name is Linh.", "Nice to meet you!", "Good morning, how are you?"]
    },
    listening: {
      title: "First Contact - Scared to speak?",
      description: "BBC 6 Minute English: tâm lý người mới học nói",
      task: "Nghe 2 lần: lần 1 tổng quan, lần 2 ghi 5 từ mới + 1 ý chính",
      resource: { type: "youtube", url: "https://www.youtube.com/watch?v=YAsDeXcYyTg", title: "BBC 6 Minute English", duration: "6 min" }
    },
    speaking: {
      title: "Self-introduction Recording",
      description: "Shadowing + ghi âm giới thiệu bản thân",
      task: "Ghi âm 30 giây: tên, tuổi, quốc gia, 1 sở thích",
      prompts: ["Say: Hi, I'm [name]. I'm from Vietnam.", "I'm a student. I like music.", "Nice to meet you!"]
    },
    readingWriting: {
      title: "A1 Reading: Meeting People",
      description: "Đọc hội thoại chào hỏi đơn giản",
      readTask: "Đọc bài 'Meeting people' trên British Council, gạch chân 5 từ mới",
      writeTask: "Viết 5 câu giới thiệu bản thân (dùng am/is/are)",
      resource: { type: "website", url: "https://learnenglish.britishcouncil.org/skills/reading/a1-reading", title: "BC A1 Reading" }
    },
    immersion: ["Đổi ngôn ngữ điện thoại sang English 1 giờ", "Chào gia đình bằng English khi gặp", "Self-talk: mô tả buổi sáng của bạn"]
  },

  Numbers: {
    level: "A1",
    objectives: ["Đếm 1-20 rõ ràng", "Nói màu sắc cơ bản", "Hỏi How many...?"],
    pronunciation: {
      title: "Consonant Clusters & Numbers",
      description: "Phát âm số 13-19 (thirteen vs thirty) — hay nhầm nhất",
      task: "Đọc to 1-20, ghi âm, nghe lại và sửa",
      resource: { type: "youtube", url: "https://www.youtube.com/watch?v=1MVthl6D9e4", title: "Rachel's English - Numbers", duration: "8 min" }
    },
    vocabulary: {
      title: "Numbers 1-20 & Colors",
      description: "Số đếm + 6 màu cơ bản + This is / That is",
      task: "Đếm đồ vật trong phòng: 5 câu There are... / I see...",
      resource: { type: "website", url: "https://learnenglish.britishcouncil.org/free-resources/grammar/english-grammar-reference/count-nouns", title: "BC - Numbers" },
      examples: ["I have three books.", "The sky is blue.", "How many apples? — Five."]
    },
    listening: {
      title: "Counting & Colors in Context",
      description: "Nghe hội thoại mua sắm có số và màu",
      task: "Nghe và viết lại 10 số/màu bạn nghe được",
      resource: { type: "youtube", url: "https://www.youtube.com/watch?v=DR-cfDsHCGA", title: "Learn English - Numbers", duration: "5 min" }
    },
    speaking: {
      title: "Describe Objects Around You",
      description: "Mô tả 5 đồ vật xung quanh bằng màu và số",
      task: "Nói liên tục 1 phút: This is a red bag. I have two pens...",
      prompts: ["Point at objects and say the color.", "Count items: I see one..., two...", "Ask: How many... do you have?"]
    },
    readingWriting: {
      title: "Colors & Numbers Reading",
      readTask: "Đọc đoạn mô tả căn phòng (tìm số và màu)",
      writeTask: "Viết 6 câu mô tả bàn học của bạn (màu + số lượng)",
      resource: { type: "website", url: "https://learnenglish.britishcouncil.org/skills/reading/a1-reading", title: "BC A1 Reading" }
    },
    immersion: ["Label 10 đồ vật nhà bằng sticky note English", "Đếm bậc thang 1-20 bằng tiếng Anh", "Nghe bài hát đếm số (Ten in the Bed)"]
  },

  Family: {
    level: "A1",
    objectives: ["Từ vựng 12 thành viên gia đình", "Dùng my/your/his/her", "Mô tả gia đình 1 phút"],
    pronunciation: {
      title: "Word Stress: Family Vocabulary",
      description: "Nhấn âm đúng: FAmily, MOther, broTHER",
      task: "Shadowing 12 từ gia đình, chú ý trọng âm",
      resource: { type: "youtube", url: "https://www.youtube.com/watch?v=n4NVPg2kHv4", title: "BBC - Word Stress", duration: "6 min" }
    },
    vocabulary: {
      title: "Family Members & Possessives",
      description: "mother, father, siblings + my/your/his/her",
      task: "Vẽ sơ đồ gia đình, ghi tên tiếng Anh + 1 câu/ người",
      resource: { type: "website", url: "https://learnenglish.britishcouncil.org/free-resources/grammar/a1-a2/possessive-s", title: "BC - Possessives" },
      examples: ["My mother is kind.", "His sister is a student.", "We have a big family."]
    },
    listening: {
      title: "Talking About Family",
      description: "VOA/BBC: giới thiệu gia đình",
      task: "Nghe và điền tên 4 thành viên gia đình trong bài",
      resource: { type: "website", url: "https://learningenglish.voanews.com/z/952", title: "VOA Learning English Level 1" }
    },
    speaking: {
      title: "My Family Presentation",
      task: "Ghi âm 1 phút giới thiệu gia đình (4-5 người)",
      prompts: ["I have a small/big family.", "My father works as...", "I love my family because..."]
    },
    readingWriting: {
      title: "Family Stories A1",
      readTask: "Đọc truyện ngắn về gia đình, trả lời 3 câu hỏi",
      writeTask: "Viết 8 câu về gia đình bạn (dùng have got / possessives)",
      resource: { type: "website", url: "https://www.newsinlevels.com/", title: "News in Levels" }
    },
    immersion: ["Gọi thành viên gia đình bằng tiếng Anh (mother, dad...)", "Xem video 'Meet my family'", "Viết caption English cho ảnh gia đình"]
  },

  Food: {
    level: "A1",
    objectives: ["12 từ thức ăn/đồ uống", "Some/Any với danh từ đếm được", "Order đồ uống đơn giản"],
    pronunciation: {
      title: "Food Vocabulary Pronunciation",
      description: "Phát âm: vegetable, chocolate, breakfast",
      task: "Shadowing 10 từ food, chú ý /ʃ/ và /tʃ/",
      resource: { type: "youtube", url: "https://www.youtube.com/watch?v=8yjRmGaTQ14", title: "English with Lucy - Food Vocab", duration: "10 min" }
    },
    vocabulary: {
      title: "Food & Drink + Some/Any",
      description: "Countable/uncountable nouns, some water, an apple",
      task: "Liệt kê bữa sáng hôm nay bằng 6 câu English",
      resource: { type: "website", url: "https://learnenglish.britishcouncil.org/free-resources/grammar/a1-a2/nouns-countable-uncountable", title: "BC - Some/Any" },
      examples: ["I'd like some coffee.", "Do you have any bread?", "I eat rice for lunch."]
    },
    listening: {
      title: "At the Café",
      description: "Hội thoại gọi đồ uống",
      task: "Nghe và viết order của khách (3 món)",
      resource: { type: "website", url: "https://www.elllo.org/", title: "ELLLO - Food Conversations" }
    },
    speaking: {
      title: "Order Food Role-play",
      task: "Role-play: bạn là waiter, tự hỏi đáp order 1 phút",
      prompts: ["Can I have..., please?", "I'd like a cup of tea.", "How much is it?"]
    },
    readingWriting: {
      title: "Recipes & Menus A1",
      readTask: "Đọc menu đơn giản, tìm 5 món + giá",
      writeTask: "Viết thực đơn bữa tối lý tưởng (5 món)",
      resource: { type: "website", url: "https://learnenglish.britishcouncil.org/skills/reading/a1-reading", title: "BC A1 Reading" }
    },
    immersion: ["Đọc nhãn thực phẩm bằng English", "Xem video nấu ăn (English subtitles)", "Self-talk: mô tả bữa trưa"]
  },

  Time: {
    level: "A1",
    objectives: ["Giờ giấc: at 7 o'clock", "Trạng từ tần suất", "Mô tả daily routine"],
    pronunciation: {
      title: "Linking Sounds in Routines",
      description: "Nối âm: wake_up, look_at, want_to",
      task: "Shadowing 8 câu daily routine",
      resource: { type: "youtube", url: "https://www.youtube.com/watch?v=6T9TYz5-GlM", title: "mmmEnglish - Connected Speech", duration: "9 min" }
    },
    vocabulary: {
      title: "Time & Daily Routine",
      description: "at/in/on + always, usually, sometimes, never",
      task: "Viết daily routine từ 6am-10pm (10 câu)",
      resource: { type: "website", url: "https://learnenglish.britishcouncil.org/free-resources/grammar/english-grammar-reference/how-often", title: "BC - Frequency adverbs" },
      examples: ["I usually wake up at 6.", "She never eats breakfast.", "We study in the evening."]
    },
    listening: {
      title: "A Day in the Life",
      task: "Nghe và sắp xếp 8 hoạt động đúng thứ tự thời gian",
      resource: { type: "youtube", url: "https://www.youtube.com/watch?v=YAsDeXcYyTg", title: "BBC 6 Minute English", duration: "6 min" }
    },
    speaking: {
      title: "My Daily Routine",
      task: "Nói daily routine 90 giây (dùng firstly, then, after that)",
      prompts: ["Every morning I...", "At noon I usually...", "Before bed I always..."]
    },
    readingWriting: {
      readTask: "Đọc lịch trình 1 người, trả lời When does she...?",
      writeTask: "Viết 10 câu về thói quen hàng ngày",
      resource: { type: "website", url: "https://learnenglish.britishcouncil.org/skills/reading/a1-reading", title: "BC A1 Reading" }
    },
    immersion: ["Nói giờ mỗi khi xem đồng hồ", "Viết schedule ngày mai bằng English", "Nghe podcast buổi sáng"]
  },

  Shopping: {
    level: "A1",
    objectives: ["How much/How many", "Mua bán cơ bản", "Hỏi giá và thanh toán"],
    pronunciation: { title: "Intonation in Questions", description: "Giọng lên cuối câu hỏi: How much is it?", task: "Luyện 8 câu hỏi mua sắm" },
    vocabulary: { title: "Shopping & Money", task: "Role-play mua 3 món, hỏi giá và cảm ơn", examples: ["How much does it cost?", "It's too expensive.", "Do you accept cards?"] },
    listening: { title: "At the Market", task: "Nghe hội thoại chợ, ghi giá 3 món" },
    speaking: { title: "Shopping Dialog", task: "Role-play khách-hàng 90 giây", prompts: ["I'm looking for...", "Can I try this on?", "I'll take it."] },
    readingWriting: { readTask: "Đọc quảng cáo sale", writeTask: "Viết list mua sắm tuần (8 món + giá ước tính)" },
    immersion: ["Đọc giá sản phẩm online bằng English", "Nói trong đầu khi mua đồ", "Xem haul video English"]
  },
  Weather: {
    level: "A1",
    objectives: ["It's + adjective", "4 kiểu thời tiết", "Dự báo đơn giản"],
    vocabulary: { title: "Weather & Seasons", task: "Viết forecast 3 ngày (It's sunny on...)" },
    listening: { title: "Weather Forecast", task: "Nghe dự báo, ghi nhiệt độ + weather 3 ngày" },
    speaking: { title: "Describe Today's Weather", task: "Nói 1 phút + so sánh hôm qua/hôm nay", prompts: ["Today it's...", "Yesterday was...", "Tomorrow will be..."] },
    readingWriting: { writeTask: "Viết tin nhắn bạn: kế hoạch picnic theo thời tiết" },
    immersion: ["Xem weather app bằng English", "Mô tả thời tiết khi ra cửa", "Nghe weather podcast 5 phút"]
  },
  Directions: {
    level: "A1",
    objectives: ["Turn left/right", "Prepositions of place", "Hỏi đường"],
    vocabulary: { title: "Directions & Prepositions", task: "Vẽ map nhà → trường, viết chỉ đường 6 bước" },
    listening: { title: "Asking for Directions", task: "Nghe chỉ đường, vẽ lại route" },
    speaking: { title: "Give Directions", task: "Chỉ đường từ A→B (1 phút, dùng imperative)" },
    readingWriting: { readTask: "Đọc map đơn giản", writeTask: "Viết email mời đến nhà (kèm directions)" },
    immersion: ["Google Maps voice English", "Chỉ đường trong game/map app"]
  },
  Body: {
    level: "A1",
    objectives: ["12 bộ phận cơ thể", "I have a headache", "Should cho lời khuyên"],
    vocabulary: { title: "Body & Health Basics", task: "Label hình người + 6 câu I have..." },
    speaking: { title: "Describe Symptoms", task: "Role-play bác sĩ-bệnh nhân 90 giây" },
    listening: { title: "At the Doctor", task: "Nghe triệu chứng, ghi 4 body parts + 2 symptoms" },
    readingWriting: { writeTask: "Viết note xin nghỉ học vì ốm (5 câu)" }
  },
  Clothes: {
    level: "A1",
    objectives: ["Quần áo cơ bản", "Present continuous mặc gì", "Mô tả trang phục"],
    vocabulary: { title: "Clothes & What are you wearing?", task: "Mô tả 5 người trong ảnh (clothes + colors)" },
    speaking: { title: "Fashion Description", task: "Mô tả outfit hôm nay 1 phút" },
    listening: { title: "Shopping for Clothes", task: "Nghe mua quần áo, ghi size + màu" },
    readingWriting: { writeTask: "Viết wish list quần áo (8 items)" }
  },
  Home: {
    level: "A1",
    objectives: ["Phòng trong nhà", "There is/are", "Prepositions in/on/under"],
    vocabulary: { title: "Rooms & Furniture", task: "Mô tả phòng ngủ: 8 câu there is/are" },
    speaking: { title: "House Tour", task: "Tour nhà ảo 90 giây (This is my...)" },
    listening: { title: "Describing a Home", task: "Nghe mô tả nhà, vẽ sơ đồ 4 phòng" },
    readingWriting: { writeTask: "Viết quảng cáo cho thuê phòng (6 câu)" }
  },
  Transport: {
    level: "A1",
    objectives: ["Phương tiện giao thông", "How do you get to...?", "Going to cho kế hoạch"],
    vocabulary: { title: "Transport & Travel Plans", task: "Viết 5 câu: How I get to school/work" },
    speaking: { title: "Commute Story", task: "Kể hành trình đi làm/học 90 giây" },
    listening: { title: "Public Transport Announcements", task: "Nghe thông báo bus/train, ghi điểm dừng" },
    readingWriting: { writeTask: "Viết itinerary chuyến đi 1 ngày (transport)" }
  },
  Future: {
    level: "A2",
    objectives: ["Will vs Going to", "Plans và predictions", "Time clauses"],
    vocabulary: { title: "Future Plans", task: "Viết 10 câu về kế hoạch tuần tới (5 will, 5 going to)" },
    speaking: { title: "My Future Plans", task: "Nói 2 phút về 1 năm tới", prompts: ["I'm going to...", "I will probably...", "I hope to..."] },
    listening: { title: "New Year's Resolutions", task: "Nghe resolutions, phân loại will/going to" },
    readingWriting: { writeTask: "Viết email invite event (future tense)" }
  },
  Jobs: {
    level: "A2",
    objectives: ["What do you do?", "Nghề nghiệp", "Present simple mô tả công việc"],
    vocabulary: { title: "Jobs & Workplace", task: "Viết CV mini 5 câu (name, job, skills)" },
    speaking: { title: "Job Interview Intro", task: "Giới thiệu nghề nghiệp/mơ ước 2 phút" },
    listening: { title: "Career Stories", task: "Nghe 2 người nói về job, so sánh" },
    readingWriting: { readTask: "Đọc job ad", writeTask: "Viết cover letter ngắn (80 từ)" }
  },
  Health: {
    level: "A2",
    objectives: ["Should/Shouldn't advice", "Healthy lifestyle", "Symptoms & remedies"],
    vocabulary: { title: "Health & Advice", task: "Viết 8 lời khuyên You should... cho healthy life" },
    speaking: { title: "Health Advice", task: "Tư vấn bạn healthy habits 90 giây" },
    listening: { title: "Healthy Living Podcast", task: "Nghe, ghi 5 tips" },
    readingWriting: { writeTask: "Viết blog ngắn: How to stay healthy" }
  },
  Phone: {
    level: "A2",
    objectives: ["Can I speak to...?", "Leave a message", "Phone etiquette"],
    vocabulary: { title: "Phone Phrases", task: "Viết script gọi điện hỏi thông tin (8 câu)" },
    speaking: { title: "Phone Call Role-play", task: "Role-play 2 phút (formal + informal)" },
    listening: { title: "Voicemail & Messages", task: "Nghe voicemail, viết lại message" }
  },
  Feelings: {
    level: "A2",
    objectives: ["Feel + adjective", "Emotions vocabulary", "Empathy phrases"],
    vocabulary: { title: "Feelings & Emotions", task: "Nhật ký cảm xúc: 6 câu I feel... because..." },
    speaking: { title: "Express Feelings", task: "Kể sự kiện + cảm xúc 2 phút" },
    listening: { title: "Emotional Intelligence", task: "Nghe story, identify feelings" }
  },
  Opinions: {
    level: "A2",
    objectives: ["I think/believe", "Agree/disagree politely", "Giving reasons"],
    vocabulary: { title: "Opinion Language", task: "Viết 6 câu opinion về 3 topics (agree + disagree)" },
    speaking: { title: "Debate Mini", task: "1 phút ủng hộ + 1 phút phản biện 1 topic" },
    readingWriting: { writeTask: "Viết opinion paragraph 80 từ (I believe... because...)" }
  },
  Comparisons: {
    level: "A2",
    objectives: ["Comparative & superlative", "As...as", "Than"],
    vocabulary: { title: "Comparing Things", task: "So sánh 3 thành phố / 3 món ăn (8 câu)" },
    speaking: { title: "Compare & Contrast", task: "So sánh 2 sở thích 90 giây" }
  },
  "Modal Verbs": {
    level: "A2",
    objectives: ["Can/could/should/must", "Permission & obligation", "Advice"],
    vocabulary: { title: "Modals in Daily Life", task: "Viết 10 câu: rules at home (must/should/can't)" },
    speaking: { title: "Rules & Advice", task: "Giải thích nội quy trường/lớp 90 giây" }
  },
  Conditionals: {
    level: "A2",
    objectives: ["First conditional", "If + present, will", "Real possibilities"],
    vocabulary: { title: "If Clauses", task: "Viết 8 câu If... I will... (real situations)" },
    speaking: { title: "What Would You Do?", task: "8 tình huống if — trả lời ngay" }
  },
  "Phrasal Verbs": {
    level: "A2",
    objectives: ["12 phrasal verbs", "Separable/inseparable", "Context practice"],
    vocabulary: { title: "Common Phrasal Verbs", task: "Đặt câu với 8 phrasal verbs hôm nay" },
    speaking: { title: "Story with Phrasal Verbs", task: "Kể chuyện 2 phút, dùng ≥5 phrasal verbs" }
  },
  "Passive Voice": {
    level: "B1",
    objectives: ["Be + past participle", "Passive in news", "Agent with by"],
    vocabulary: { title: "Passive Structures", task: "Chuyển 8 câu active → passive" },
    readingWriting: { readTask: "Đọc news, gạch chân 5 câu passive", writeTask: "Viết 6 câu passive về sản phẩm công nghệ" }
  },
  "Reported Speech": {
    level: "B1",
    objectives: ["Say/tell/ask", "Tense backshift", "Reporting verbs"],
    vocabulary: { title: "Reported Speech", task: "Chuyển 6 hội thoại trực tiếp → gián tiếp" },
    listening: { title: "News Reporting", task: "Nghe tin, viết 3 câu reported speech" }
  },
  Media: {
    level: "B1",
    objectives: ["News vocabulary", "Headlines", "Summarize articles"],
    vocabulary: { title: "Media & Journalism", task: "Viết headline + lead cho tin giả định" },
    readingWriting: { readTask: "Đọc 1 bài news B1, summary 5 câu", writeTask: "Viết comment opinion 80 từ" }
  },
  Environment: {
    level: "B1",
    objectives: ["Climate vocabulary", "Cause-effect", "Suggestions should"],
    vocabulary: { title: "Environment Issues", task: "Viết 8 câu về pollution + solutions" },
    speaking: { title: "Green Living", task: "Persuade friend eco-friendly 2 phút" }
  },
  Technology: {
    level: "B1",
    objectives: ["Tech vocabulary", "Passive in tech", "Pros/cons"],
    vocabulary: { title: "Technology & Digital Life", task: "Viết pros/cons social media (8 câu)" },
    speaking: { title: "Tech Debate", task: "1 phút pro + 1 phút con technology in education" }
  },
  Culture: {
    level: "B1",
    objectives: ["Traditions & customs", "Compare cultures", "Present perfect experiences"],
    vocabulary: { title: "Culture & Traditions", task: "So sánh 1 custom VN vs nước khác (8 câu)" },
    speaking: { title: "Cultural Presentation", task: "Present 1 festival VN 2 phút (English)" }
  },
  Collocations: {
    level: "B1",
    objectives: ["Verb-noun collocations", "Natural word pairs", "Avoid literal translation"],
    vocabulary: { title: "Common Collocations", task: "Flashcard 12 collocations + câu ví dụ" },
    readingWriting: { writeTask: "Viết email dùng 5 collocations chính xác" }
  },
  "Formal Writing": {
    level: "B1",
    objectives: ["Linking words", "Formal register", "Letter/email structure"],
    readingWriting: { writeTask: "Viết formal letter complaint (120 từ)", readTask: "Phân tích 1 formal email mẫu" }
  },
  Presentations: {
    level: "B1",
    objectives: ["Signposting", "Intro-body-conclusion", "Q&A phrases"],
    speaking: { title: "3-Minute Presentation", task: "Present topic tự chọn: intro + 3 points + conclusion", prompts: ["Today I'll talk about...", "Moving on to...", "To sum up..."] }
  },
  Debates: {
    level: "B1",
    objectives: ["Argument structure", "Counter-arguments", "Evidence phrases"],
    speaking: { title: "Structured Debate", task: "Debate: Online learning vs classroom (4 phút total)" }
  },
  Negotiation: {
    level: "B1",
    objectives: ["Offer-counteroffer", "Compromise language", "Deal closing"],
    speaking: { title: "Negotiation Role-play", task: "Negotiate price/deadline 3 phút", prompts: ["We'd like to propose...", "Could you consider...", "Let's meet halfway."] }
  },
  "Advanced Listening": {
    level: "B2",
    objectives: ["Native speed exposure", "Note-taking", "Inference"],
    listening: { title: "TED Talk / Podcast Advanced", task: "Nghe 10 phút, notes + summary 8 câu", resource: { type: "youtube", url: "https://www.youtube.com/watch?v=8jPQjQQBbO8", title: "TED-Ed", duration: "10 min" } }
  },
  "Academic Reading": {
    level: "B2",
    objectives: ["Skimming & scanning", "Identify thesis", "Academic vocabulary"],
    readingWriting: { readTask: "Đọc academic paragraph, outline main ideas", writeTask: "Paraphrase 3 câu (không copy)" }
  },
  "Essay Writing": {
    level: "B2",
    objectives: ["Essay structure", "Thesis statement", "Supporting paragraphs"],
    readingWriting: { writeTask: "Viết essay 150 từ: advantages/disadvantages topic tự chọn" }
  },
  "TOEIC Prep": {
    level: "B2",
    objectives: ["Listening Part 1-2 format", "Reading Part 5 grammar", "Time management"],
    listening: { title: "TOEIC Listening Practice", task: "Làm 10 câu listening Part 2 style" },
    readingWriting: { title: "TOEIC Reading", task: "10 câu grammar + vocabulary drill" }
  },
  Fluency: {
    level: "B2",
    objectives: ["Reduce hesitation", "Fillers natural", "Extended speech 3 min"],
    speaking: { title: "Fluency Drill", task: "Nói 3 phút không dừng về random topic", prompts: ["Pick a topic and speak!", "Use: Well, Actually, You know naturally"] }
  },
  Accent: {
    level: "B2",
    objectives: ["Intonation patterns", "Weak forms", "Shadowing native"],
    pronunciation: { title: "Accent Reduction Shadowing", task: "Shadowing 15 phút native speaker video", resource: { type: "youtube", url: "https://www.youtube.com/watch?v=p1SRYnumsBE", title: "Rachel's English", duration: "15 min" } }
  },
  Storytelling: {
    level: "B2",
    objectives: ["Narrative tenses", "Engaging openings", "Climax & ending"],
    speaking: { title: "Tell a Story", task: "Kể chuyện có twist 3 phút (past tenses)", prompts: ["It all started when...", "Suddenly...", "In the end..."] }
  },
  Interviews: {
    level: "B2",
    objectives: ["STAR method intro", "Strengths/weaknesses", "Questions for interviewer"],
    speaking: { title: "Mock Job Interview", task: "Mock interview 5 phút (record)", prompts: ["Tell me about yourself.", "Why should we hire you?", "Do you have questions for us?"] }
  },
  Debate: {
    level: "B2",
    objectives: ["Advanced argumentation", "Rebuttal", "Rhetorical devices"],
    speaking: { title: "Advanced Debate", task: "Debate có chuẩn bị 5 phút mỗi bên" }
  },
  "Final Review": {
    level: "B2",
    objectives: ["Ôn toàn bộ 60 ngày", "Gap analysis", "Personal study plan"],
    vocabulary: { title: "Master Vocabulary List", task: "Tạo list 50 từ quan trọng nhất + ôn flashcard" },
    speaking: { title: "Comprehensive Oral Test", task: "Ghi âm 5 phút: mọi chủ đề đã học" },
    readingWriting: { writeTask: "Viết study plan 90 ngày tiếp theo (200 từ)" }
  },
  Graduation: {
    level: "B2",
    objectives: ["Portfolio review", "Speech rehearsal", "Set new goals"],
    speaking: { title: "Rehearse Graduation Speech", task: "Luyện bài nói Day 60 (3 phút)" }
  },
  Hobbies: {
    level: "A1",
    objectives: ["12 từ sở thích", "Like + V-ing", "Hỏi What do you like doing?"],
    pronunciation: {
      title: "-ing Ending Pronunciation",
      description: "Phát âm -ing: swimming, reading, running",
      task: "Luyện 10 động từ -ing, ghi âm",
      resource: { type: "youtube", url: "https://www.youtube.com/watch?v=p1SRYnumsBE", title: "Rachel's English", duration: "10 min" }
    },
    vocabulary: {
      title: "Hobbies & Like + gerund",
      task: "Viết 6 câu: I like / I don't like / Do you like...?",
      examples: ["I enjoy playing football.", "She hates waking up early.", "Do you like cooking?"]
    },
    listening: {
      title: "Free Time Activities",
      task: "Nghe 3 người nói sở thích, ghi tên hobby mỗi người",
      resource: { type: "youtube", url: "https://www.youtube.com/watch?v=HAnw168huqA", title: "English with Lucy", duration: "8 min" }
    },
    speaking: {
      title: "Talk About Your Hobbies",
      task: "Nói 1 phút: sở thích, tần suất, lý do thích",
      prompts: ["In my free time I...", "I've been ... for 2 years.", "My favorite hobby is... because..."]
    },
    readingWriting: {
      readTask: "Đọc blog ngắn về hobby",
      writeTask: "Viết 8 câu giới thiệu sở thích yêu thích",
      resource: { type: "website", url: "https://learnenglish.britishcouncil.org/skills/reading/a1-reading", title: "BC Reading" }
    },
    immersion: ["Xem YouTube về hobby bằng English", "Comment 1 câu English trên video", "Kể cho bạn bè về weekend plans"]
  }
};

// Giai đoạn 2-4: mẫu chi tiết theo phase (bổ sung từng topic)
const TOPIC_DETAILS_PHASE2 = {
  "Past Tense": {
    level: "A2",
    objectives: ["Dùng was/were và V2", "Kể chuyện quá khứ đơn giản", "Thời gian: yesterday, last week"],
    pronunciation: { title: "-ed Endings /t/ /d/ /ɪd/", description: "walked, played, wanted", task: "Đọc 15 động từ quá khứ, phân loại 3 nhóm -ed" },
    vocabulary: { title: "Simple Past Regular & Irregular", task: "Viết 8 câu về hôm qua (4 regular, 4 irregular)" },
    listening: { title: "What did you do yesterday?", task: "Nghe kể chuyện cuối tuần, ghi 5 động từ V2" },
    speaking: { title: "Weekend Story", task: "Kể hôm qua/cuối tuần 90 giây (dùng past tense)", prompts: ["Last weekend I went...", "I didn't... because...", "It was really..."] },
    readingWriting: { readTask: "Đọc diary entry ngắn", writeTask: "Viết nhật ký 8 câu về hôm qua" }
  },
  Travel: {
    level: "A2",
    objectives: ["Từ vựng sân bay/khách sạn", "Have you ever...?", "Đặt phòng đơn giản"],
    pronunciation: { title: "Travel Phrases Intonation", task: "Shadowing 10 câu du lịch thông dụng" },
    vocabulary: { title: "Travel Essentials", task: "Viết hội thoại đặt phòng khách sạn (6 câu)" },
    listening: { title: "At the Airport", task: "Nghe thông báo sân bay, ghi gate + time", resource: { type: "youtube", url: "https://www.youtube.com/watch?v=Gv2uY7X3X8c", title: "Travel English", duration: "12 min" } },
    speaking: { title: "Plan a Trip", task: "Nói kế hoạch du lịch 2 phút", prompts: ["I'm going to visit...", "I need to book...", "I've never been to..."] },
    readingWriting: { readTask: "Đọc travel blog A2", writeTask: "Viết email xin nghỉ phép đi du lịch (formal đơn giản)" }
  },
  Restaurant: {
    level: "A2",
    objectives: ["Would like + noun", "Order và complain lịch sự", "Từ vựng menu"],
    vocabulary: { title: "Restaurant Language", task: "Role-play order 3 món + hỏi bill" },
    speaking: { title: "Dining Out Role-play", task: "2 phút role-play waiter-customer", prompts: ["Are you ready to order?", "Could we have the bill, please?", "The soup is cold."] },
    listening: { title: "Restaurant Dialogues", task: "Nghe 2 hội thoại nhà hàng, so sánh tone" },
    readingWriting: { readTask: "Đọc menu nhà hàng", writeTask: "Viết review nhà hàng 6 câu" }
  },
  Email: {
    level: "A2",
    objectives: ["Cấu trúc email formal/informal", "Subject line rõ ràng", "Attachment & reply"],
    vocabulary: { title: "Email Structure & Phrases", task: "Viết email cảm ơn sau phỏng vấn (80 từ)" },
    writing: { title: "Professional Email Draft", task: "Email xin việc / hỏi thông tin (template)" },
    readingWriting: { readTask: "Đọc 2 mẫu email, phân biệt formal/informal", writeTask: "Viết email cho giáo viên xin nộp bài muộn" }
  }
};

const TOPIC_DETAILS_PHASE3 = {
  "Present Perfect": {
    level: "B1",
    objectives: ["Have/has + PP", "For/since/already/yet", "Kinh nghiệm sống"],
    vocabulary: { title: "Present Perfect for Experience", task: "Viết 10 câu Have you ever...? + câu trả lời" },
    listening: { title: "Life Experiences Podcast", task: "Nghe 3 câu chuyện, ghi have/has + PP" },
    speaking: { title: "Experiences Interview", task: "Tự phỏng vấn 2 phút về kinh nghiệm", prompts: ["Have you ever traveled abroad?", "I've lived here since...", "I've just finished..."] },
    readingWriting: { writeTask: "Viết đoạn 100 từ về kinh nghiệm học English" }
  },
  Business: {
    level: "B1",
    objectives: ["Email họp, deadline, agenda", "Small talk công sở", "Present ideas ngắn"],
    vocabulary: { title: "Business Meetings Vocabulary", task: "Viết agenda cuộc họp 15 phút (5 bullet)" },
    speaking: { title: "Mini Presentation", task: "Present 1 ý tưởng project 2 phút", prompts: ["I'd like to outline...", "The main advantage is...", "Shall we schedule a follow-up?"] },
    readingWriting: { readTask: "Đọc email business mẫu", writeTask: "Reply email xác nhận họp" }
  },
  Idioms: {
    level: "B1",
    objectives: ["12 idioms thông dụng", "Đoán nghĩa qua context", "Dùng 3 idioms trong hội thoại"],
    vocabulary: { title: "Everyday Idioms", task: "Chọn 5 idioms, viết câu truyện ngắn dùng chúng" },
    speaking: { title: "Idiom Storytelling", task: "Kể chuyện 2 phút, dùng ít nhất 3 idioms" },
    listening: { title: "Idioms in Movies", task: "Xem clip 3 phút, ghi 3 idioms nghe được" }
  }
};

const TOPIC_DETAILS_PHASE4 = {
  "IELTS Prep": {
    level: "B2",
    objectives: ["Speaking Part 1 format", "Fluency 2 phút không ngập", "Linking words cơ bản"],
    speaking: { title: "IELTS Speaking Part 1 Mock", task: "Trả lời 8 câu Part 1 (work, hometown, hobbies)", prompts: ["What kind of work do you do?", "What's your hometown like?", "Do you prefer...?"] },
    listening: { title: "IELTS Listening Section 1", task: "Làm 1 bài Section 1, chấm điểm" },
    readingWriting: { writeTask: "Task 1: mô tả biểu đồ đơn giản (50 từ)", readTask: "Đọc passage 1, trả lời True/False/NG" }
  },
  "Mock Test": {
    level: "B2",
    objectives: ["Đánh giá 4 kỹ năng", "Quản lý thời gian", "Xác định điểm yếu"],
    sessions: "mock"
  },
  Celebration: {
    level: "B2",
    objectives: ["Tổng kết 60 ngày", "So sánh Week 1 vs Week 8", "Lập kế hoạch tiếp theo"]
  }
};

Object.assign(TOPIC_DETAILS, TOPIC_DETAILS_PHASE2, TOPIC_DETAILS_PHASE3, TOPIC_DETAILS_PHASE4);

/** Tài nguyên theo phase khi topic chưa có template đầy đủ */
const PHASE_DEFAULTS = {
  1: {
    pronunciationUrl: "https://www.youtube.com/watch?v=p1SRYnumsBE",
    pronunciationTitle: "Rachel's English",
    listeningUrl: "https://www.youtube.com/watch?v=YAsDeXcYyTg",
    listeningTitle: "BBC 6 Minute English",
    readingUrl: "https://learnenglish.britishcouncil.org/skills/reading/a1-reading",
    level: "A1"
  },
  2: {
    pronunciationUrl: "https://www.youtube.com/watch?v=n4NVPg2kHv4",
    pronunciationTitle: "BBC Pronunciation",
    listeningUrl: "https://www.youtube.com/watch?v=HAnw168huqA",
    listeningTitle: "English with Lucy",
    readingUrl: "https://learnenglish.britishcouncil.org/skills/reading/a2-reading",
    level: "A2"
  },
  3: {
    pronunciationUrl: "https://www.youtube.com/watch?v=6T9TYz5-GlM",
    pronunciationTitle: "mmmEnglish Connected Speech",
    listeningUrl: "https://www.youtube.com/watch?v=YAsDeXcYyTg",
    listeningTitle: "BBC 6 Minute English",
    readingUrl: "https://learnenglish.britishcouncil.org/skills/reading/b1-reading",
    level: "B1"
  },
  4: {
    pronunciationUrl: "https://www.youtube.com/watch?v=p1SRYnumsBE",
    pronunciationTitle: "Accent & Fluency Practice",
    listeningUrl: "https://www.youtube.com/watch?v=8jPQjQQBbO8",
    listeningTitle: "TED-Ed / Advanced Listening",
    readingUrl: "https://www.newsinlevels.com/",
    level: "B2"
  }
};

/** Ngày ôn tập chi tiết */
function getReviewContent(day, meta) {
  const ranges = {
    7: { from: 1, to: 6, label: "Tuần 1" },
    15: { from: 1, to: 14, label: "Giai đoạn 1" },
    30: { from: 16, to: 29, label: "Giai đoạn 2" },
    45: { from: 31, to: 44, label: "Giai đoạn 3" },
    56: { from: 46, to: 55, label: "Tuần 8" },
    58: { from: 1, to: 57, label: "Toàn khóa" }
  };
  const range = ranges[day] || { from: Math.max(1, day - 6), to: day - 1, label: "Tuần" };
  const topics = DAY_TOPICS.filter((t) => t.day >= range.from && t.day <= range.to).map((t) => t.title);

  return {
    level: PHASE_DEFAULTS[meta.phase]?.level || "A2",
    objectives: [
      `Ôn tập ${range.label} (ngày ${range.from}-${range.to})`,
      "Củng cố từ vựng qua flashcard & quiz",
      "Ghi âm speaking so sánh với tuần trước"
    ],
    reviewFromDays: range.from,
    reviewToDays: range.to,
    reviewTopics: topics,
    pronunciation: {
      title: `Review Pronunciation — ${range.label}`,
      description: "Ôn các âm khó từ các ngày trước",
      task: `Chọn 3 ngày (${range.from}-${range.to}), shadowing lại phần pronunciation`
    },
    vocabulary: {
      title: `Vocabulary Review — ${range.label}`,
      description: `Ôn từ vựng: ${topics.slice(0, 4).join(", ")}...`,
      task: "Ôn hết flashcard due + quiz 10 câu + đạt ≥7/10"
    },
    listening: {
      title: "Listening Comprehension Review",
      task: "Nghe 1 bài BBC 6 min, viết summary 5 câu",
      resource: { type: "youtube", url: "https://www.youtube.com/watch?v=YAsDeXcYyTg", title: "BBC 6 Minute English", duration: "6 min" }
    },
    speaking: {
      title: "Consolidation Speaking Test",
      task: `Ghi âm 2 phút tổng hợp chủ đề ${range.label}`,
      prompts: ["This week I learned about...", "The most useful phrase was...", "I still need to improve..."]
    },
    readingWriting: {
      title: "Reflection Essay",
      readTask: "Đọc lại 1 bài reading yêu thích từ tuần qua",
      writeTask: `Viết reflection 10 câu: 3 điều học được, 2 khó khăn, 2 mục tiêu tuần tới`
    },
    immersion: [
      "Ôn immersion checklist — tick những mục chưa làm",
      "Nói English liên tục 30 phút (micro immersion)",
      "Xem lại video yêu thích từ các ngày trước"
    ]
  };
}

/** Sinh nội dung chi tiết cho 1 ngày */
function getDayContent(day, meta) {
  const phaseDef = PHASE_DEFAULTS[meta.phase] || PHASE_DEFAULTS[1];

  if (meta.topic === "Review" || [7, 15, 30, 45, 56, 58].includes(day)) {
    return ensureAllSections(getReviewContent(day, meta), meta, phaseDef, day);
  }
  if (day === 57) {
    return ensureAllSections({
      level: "B2",
      objectives: ["Mock test 4 kỹ năng (45 phút)", "Chấm điểm tự đánh giá", "Ghi nhận điểm yếu"],
      pronunciation: { title: "Warm-up Pronunciation", task: "5 phút shadowing warm-up" },
      vocabulary: { title: "Vocab & Grammar Quiz", task: "Quiz 15 câu mixed (mục tiêu ≥12/15)" },
      listening: { title: "Listening Test (15 min)", task: "Nghe 1 bài 6-8 phút + 5 câu hỏi tự đặt", resource: { type: "youtube", url: "https://www.youtube.com/watch?v=YAsDeXcYyTg", title: "BBC 6 Minute English" } },
      speaking: { title: "Speaking Test (5 min)", task: "Part 1 + Part 2 mock (2 phút + 1 phút)" },
      readingWriting: { title: "Reading + Writing (20 min)", readTask: "Đọc 1 bài B1, 5 câu hỏi", writeTask: "Viết 100 từ opinion essay" },
      immersion: ["Mock test mode — không dùng tiếng Việt 45 phút", "Ghi điểm vào journal", "Lập plan cải thiện 1 tuần"]
    }, meta, phaseDef, day);
  }
  if (day === 59) {
    return ensureAllSections({
      level: "B2",
      objectives: ["Chuẩn bị bài nói tốt nghiệp", "Portfolio 60 ngày", "Checklist hoàn thành"],
      speaking: { title: "Graduation Speech Draft", task: "Viết và luyện bài nói 3 phút", prompts: ["60 days ago I couldn't...", "Now I can...", "My next goal is..."] },
      readingWriting: { writeTask: "Viết thư cho bản thân 3 tháng sau (150 từ)" },
      vocabulary: { title: "Final Vocab Review", task: "Ôn toàn bộ flashcard, clear due queue" },
      listening: { title: "Celebrate with English Media", task: "Xem 1 talk hoặc documentary yêu thích (English)" },
      pronunciation: { title: "Polish Your Best Recording", task: "Re-record introduction, so sánh Day 1" },
      immersion: ["Chia sẻ thành tích với bạn bè (English)", "Viết post reflection (English)", "Đặt mục tiêu B2/C1"]
    }, meta, phaseDef, day);
  }
  if (day === 60) {
    return {
      level: "B2",
      objectives: ["Hoàn thành chương trình 60 ngày", "Bài nói tổng kết 3 phút", "Kế hoạch 90 ngày tiếp"],
      isGraduation: true,
      pronunciation: { title: "Victory Lap — Favorite Shadowing", task: "Shadowing bài yêu thích nhất 60 ngày" },
      vocabulary: { title: "Vocabulary Hall of Fame", task: "Liệt kê 20 từ hữu ích nhất bạn đã học" },
      listening: { title: "Listen & Celebrate", task: "Nghe podcast/news — enjoy không ghi chú" },
      speaking: { title: "Graduation Speech (3 min)", task: "Ghi âm bài nói tốt nghiệp, lưu làm kỷ niệm", prompts: ["I started this journey because...", "The biggest change is...", "I recommend this plan because..."] },
      readingWriting: { writeTask: "Viết reflection 15 câu + 3 mục tiêu 90 ngày tới", readTask: "Đọc lại bài viết Day 1 và Day 30 — so sánh" },
      immersion: ["Celebrate — xem phim/nhạc English yêu thích", "Cảm ơn bản thân đã kiên trì", "Share milestone với cộng đồng học English"]
    };
  }

  const topicDetail = TOPIC_DETAILS[meta.topic];

  if (topicDetail) {
    return enrichWithDefaults(topicDetail, meta, phaseDef, day);
  }

  return buildGenericDetailedContent(day, meta, phaseDef);
}

function ensureAllSections(content, meta, phaseDef, day) {
  const fallback = buildGenericDetailedContent(day, meta, phaseDef);
  ["pronunciation", "vocabulary", "listening", "speaking", "readingWriting"].forEach((key) => {
    content[key] = { ...fallback[key], ...(content[key] || {}) };
  });
  if (!content.immersion?.length) content.immersion = fallback.immersion;
  if (!content.objectives?.length) content.objectives = fallback.objectives;
  if (!content.dailyTip) content.dailyTip = fallback.dailyTip;
  if (!content.level) content.level = fallback.level;
  return content;
}

function enrichWithDefaults(detail, meta, phaseDef, day) {
  const vocab = VOCAB_BY_TOPIC[meta.topic] || [];
  const grammar = GRAMMAR_BY_TOPIC[meta.topic] || [];
  const merged = {
    ...detail,
    level: detail.level || phaseDef.level,
    vocabulary: {
      ...(detail.vocabulary || {}),
      vocab: detail.vocabulary?.vocab || vocab,
      grammar: detail.vocabulary?.grammar || grammar,
      resource: detail.vocabulary?.resource || { type: "website", url: "https://learnenglish.britishcouncil.org/grammar", title: "British Council Grammar" }
    },
    pronunciation: {
      ...(detail.pronunciation || {}),
      resource: detail.pronunciation?.resource || { type: "youtube", url: phaseDef.pronunciationUrl, title: phaseDef.pronunciationTitle, duration: "10 min" }
    },
    listening: {
      ...(detail.listening || {}),
      resource: detail.listening?.resource || { type: "youtube", url: phaseDef.listeningUrl, title: phaseDef.listeningTitle, duration: "6 min" }
    },
    readingWriting: {
      ...(detail.readingWriting || {}),
      resource: detail.readingWriting?.resource || { type: "website", url: phaseDef.readingUrl, title: "Reading Practice" }
    },
    immersion: detail.immersion || [
      `Self-talk 5 phút về ${meta.title}`,
      "Nghe podcast English 15 phút",
      "Đổi ngôn ngữ thiết bị sang English 1 giờ"
    ],
    dailyTip: detail.dailyTip || getDailyTip(meta.topic, day)
  };
  return ensureAllSections(merged, meta, phaseDef, day);
}

function buildGenericDetailedContent(day, meta, phaseDef) {
  const vocab = VOCAB_BY_TOPIC[meta.topic] || VOCAB_BY_TOPIC.Greetings;
  const grammar = GRAMMAR_BY_TOPIC[meta.topic] || [];

  return {
    level: phaseDef.level,
    objectives: [
      `Nắm từ vựng chủ đề: ${meta.title}`,
      `Áp dụng ngữ pháp: ${grammar[0] || "cấu trúc cơ bản"}`,
      `Giao tiếp được về ${meta.focus}`
    ],
    pronunciation: {
      title: `${meta.focus} — Phát âm từ khóa`,
      description: `Luyện phát âm 10 từ trọng tâm ngày ${day}`,
      task: `Chọn 10 từ từ chủ đề ${meta.topic}, shadowing mỗi từ 3 lần`,
      resource: { type: "youtube", url: phaseDef.pronunciationUrl, title: phaseDef.pronunciationTitle, duration: "10 min" }
    },
    vocabulary: {
      title: meta.focus,
      description: `Học ${vocab.length} từ + ${grammar.join(", ")}`,
      task: `Tạo 8 câu ví dụ về ${meta.title}, đọc to rõ ràng`,
      vocab,
      grammar,
      examples: vocab.slice(0, 3).map((w) => `I use "${w}" when talking about ${meta.topic}.`),
      resource: { type: "website", url: "https://learnenglish.britishcouncil.org/grammar", title: "British Council" }
    },
    listening: {
      title: `Listening: ${meta.title}`,
      description: `Nghe nội dung về ${meta.focus}`,
      task: "Nghe 2 lần: outline 3 ý chính + 5 từ mới",
      resource: { type: "youtube", url: phaseDef.listeningUrl, title: phaseDef.listeningTitle, duration: "6-10 min" }
    },
    speaking: {
      title: `Speaking: ${meta.focus}`,
      description: "Shadowing + monologue có chủ đề",
      task: `Nói liên tục 90 giây - 2 phút về ${meta.title}`,
      prompts: [
        `Let me tell you about ${meta.topic.toLowerCase()}...`,
        `The most important thing about ${meta.title} is...`,
        `For example, ...`
      ]
    },
    readingWriting: {
      title: `Reading & Writing: ${meta.title}`,
      readTask: `Đọc 1 bài ${phaseDef.level} về ${meta.topic}, trả lời 3 câu hỏi`,
      writeTask: `Viết ${phaseDef.level === "A1" ? "6" : phaseDef.level === "A2" ? "8" : "10"} câu về ${meta.title}`,
      resource: { type: "website", url: phaseDef.readingUrl, title: "Reading Practice" }
    },
    immersion: [
      `Google "${meta.title} in English" và đọc 1 bài`,
      `Self-talk: giải thích ${meta.focus} cho người mới`,
      "Nghe 1 video YouTube về chủ đề hôm nay"
    ],
    dailyTip: getDailyTip(meta.topic, day)
  };
}

function getDailyTip(topic, day) {
  const tips = [
    "Ghi âm giọng mỗi ngày — so sánh Day 1 và hôm nay sẽ thấy tiến bộ.",
    "Đừng học thụ động: nói to mọi câu bạn viết.",
    "Dùng flashcard SRS mỗi sáng, 5 phút là đủ.",
    "Nghe không hiểu 100% là bình thường — bắt từ khóa trước.",
    "Viết 5 câu journal mỗi tối — não sẽ quen dùng English.",
    "Shadowing: bắt chước cả ngữ điệu, không chỉ từ.",
    "Immersion nhỏ mỗi ngày > học 3 giờ 1 lần/tuần."
  ];
  return tips[day % tips.length];
}

/** Chuyển day content → mảng sessions cho app */
function buildSessionsFromContent(day, meta, content) {
  if (content.isGraduation || (day === 60 && content.speaking?.title?.includes("Graduation"))) {
    return [
      { id: `d${day}-s1`, time: "0-20", skill: "Review", title: content.vocabulary?.title || "Tổng kết từ vựng", description: content.vocabulary?.title, task: content.vocabulary?.task, vocab: content.vocabulary?.vocab },
      { id: `d${day}-s2`, time: "20-50", skill: "Speaking", title: content.speaking.title, description: content.speaking.description, task: content.speaking.task, prompts: content.speaking.prompts },
      { id: `d${day}-s3`, time: "50-70", skill: "Listening", title: content.listening?.title || "Listening", task: content.listening?.task, resources: content.listening?.resource ? [content.listening.resource] : [] },
      { id: `d${day}-s4`, time: "70-90", skill: "Writing", title: "Reflection & Next Steps", description: content.readingWriting?.writeTask, task: content.readingWriting?.writeTask }
    ];
  }

  const isReview = content.reviewTopics;
  if (isReview) {
    return [
      { id: `d${day}-s1`, time: "0-20", skill: "Review", title: content.vocabulary.title, description: content.vocabulary.description, task: content.vocabulary.task, reviewTopics: content.reviewTopics },
      { id: `d${day}-s2`, time: "20-45", skill: "Speaking", title: content.speaking.title, description: content.speaking.description, task: content.speaking.task, prompts: content.speaking.prompts },
      { id: `d${day}-s3`, time: "45-70", skill: "Listening", title: content.listening.title, description: content.listening.description, task: content.listening.task, resources: content.listening.resource ? [content.listening.resource] : [] },
      { id: `d${day}-s4`, time: "70-90", skill: "Writing", title: content.readingWriting.title, description: content.readingWriting.readTask, task: content.readingWriting.writeTask }
    ];
  }

  const pron = content.pronunciation || {};
  const vocab = content.vocabulary || {};
  const listen = content.listening || {};
  const speak = content.speaking || { title: "Speaking Practice", task: "Luyện nói theo chủ đề hôm nay" };
  const rw = content.readingWriting || {};

  return [
    {
      id: `d${day}-s1`,
      time: "0-15",
      skill: "Pronunciation",
      title: pron.title || "Pronunciation Practice",
      description: pron.description,
      task: pron.task,
      resources: pron.resource ? [pron.resource] : []
    },
    {
      id: `d${day}-s2`,
      time: "15-35",
      skill: "Vocabulary + Grammar",
      title: vocab.title || meta.focus,
      description: vocab.description,
      task: vocab.task || "Học từ vựng và làm bài tập",
      vocab: vocab.vocab,
      grammar: vocab.grammar,
      examples: vocab.examples,
      resources: vocab.resource ? [vocab.resource] : []
    },
    {
      id: `d${day}-s3`,
      time: "35-55",
      skill: "Listening",
      title: listen.title || "Listening Practice",
      description: listen.description,
      task: listen.task || "Nghe 2 lần, ghi chú 5 từ mới",
      resources: listen.resource ? [listen.resource] : []
    },
    {
      id: `d${day}-s4`,
      time: "55-75",
      skill: "Speaking",
      title: speak.title || "Speaking Practice",
      description: speak.description,
      task: speak.task || `Nói về ${meta.title}`,
      prompts: speak.prompts
    },
    {
      id: `d${day}-s5`,
      time: "75-90",
      skill: "Reading + Writing",
      title: rw.title || `Reading & Writing: ${meta.title}`,
      description: rw.description || rw.readTask,
      task: `${rw.readTask || ""} | Viết: ${rw.writeTask || ""}`,
      resources: rw.resource ? [rw.resource] : []
    }
  ];
}

function buildLessonFromContent(day, meta) {
  const content = getDayContent(day, meta);
  const vocabCount = content.vocabulary?.vocab?.length || (meta.topic === "Review" ? 0 : 12);

  return {
    day,
    phase: meta.phase,
    title: `Ngày ${day}: ${meta.title}`,
    focus: meta.focus,
    duration: 90,
    level: content.level,
    objectives: content.objectives,
    dailyTip: content.dailyTip,
    reviewFromDays: content.reviewFromDays,
    reviewToDays: content.reviewToDays,
    reviewTopics: content.reviewTopics,
    sessions: buildSessionsFromContent(day, meta, content),
    immersion: content.immersion,
    dailyVocabCount: vocabCount,
    topic: meta.topic
  };
}
