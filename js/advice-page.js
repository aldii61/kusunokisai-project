const currentUser =
  localStorage.getItem("currentUser") || "guest";

const currentLanguage =
  localStorage.getItem("appLanguage") || "ja";

let expenses = JSON.parse(
  localStorage.getItem("viewing_history_expenses")
);

if (!expenses) {
  expenses =
    JSON.parse(
      localStorage.getItem(`expenses_${currentUser}`)
    ) || [];
}

// ========== FUTURE VALUE ==========
function futureValue(total) {
  const yearly = total * 52;

  return {
    yearly: yearly,
    switch: Math.floor(yearly / 40000),
    airpods: Math.floor(yearly / 39000),
    disney: Math.floor(yearly / 9000),
    usj: Math.floor(yearly / 10000),
    yakiniku: Math.floor(yearly / 4000),
    travel: Math.floor(yearly / 50000),
  };
}

/* ========================================
   分析画面の固定文言翻訳
======================================== */

const advicePageTranslations = {
  ja: {
    pageTitle: "分析 | 節約チェッカー",
    analysisPageTitle: "支出の分析",
    weeklyExpenseAnalysis: "今週の支出の分析",
    continueAtThisPace: "このペースで続けると…",
    analysisResult: "支出の分析結果",
    futureValueResult: "今の支出を続けた場合の結果",
    back: "戻る",
    teacherName: "ぽぽ先生",
noAnalysisTitle:
  "まだ分析できるデータがないよ！",
noAnalysisMessage:
  "今週の支出を入力すると、<br>ぽぽ先生が一緒に振り返るよ♪",
teacherFrom: "ぽぽ先生より",
weeklyReview: "今週の振り返り",
totalExpense: "支出総額",
goalBudget: "目標予算",
usageRate: "目標金額の使用率",
averageSatisfaction: "平均満足度",
necessaryExpenses: "必要だった支出",
overBudgetAmount: "予算オーバー額",
remainingBudget: "残り予算",
improvementPoints: "改善のポイント",
weeklyMessageTitle: "今週のひとこと",
currency: "円",
countUnit: "件",  
speechOverBudget:
  "今週は目標予算を超えているよ。まずは無理なく減らせそうな支出を、一つだけ見つけてみよう♪",

speechBudgetEnding:
  "予算の終盤だよ。残りの支出は「今、本当に必要かな？」と一度考えてみよう♪",

speechHighSatisfaction:
  "満足度の高いお金の使い方ができているね！この調子で、自分にとって価値のある支出を選ぼう♪",

speechDefault:
  "今週の記録を一緒に見直して、次の買い物に活かしていこう♪",
weekMessageOver:
  "使いすぎた週があっても大丈夫。記録できたことが、次の改善につながります。",

weekMessageNormal:
  "小さな積み重ねが、大きな未来をつくります。来週も自分のペースで続けよう！",
switchName: "Nintendo Switch",
airpodsName: "AirPods Pro",
disneyName: "ディズニー",
usjName: "USJ",
yakinikuName: "焼肉食べ放題",
travelName: "国内旅行",
deviceUnit: "台分",
timesUnit: "回分",
futureYearTitle:
  "1年間このペースで支出すると…",

futureYearResult:
  "になります！",

futureComparisonTitle:
  "この金額、身近なものに例えると…",

noFutureItem:
  "まだ大きな買い物に置き換えられる金額ではないみたい。<br>小さな節約も、続けると大きくなるよ♪",
},

  en: {
    pageTitle: "Analysis | Savings Checker",
    analysisPageTitle: "Expense Analysis",
    weeklyExpenseAnalysis: "This Week's Expense Analysis",
    continueAtThisPace: "If you continue at this pace…",
    analysisResult: "Expense analysis result",
    futureValueResult:
      "Result of continuing your current spending pace",
    back: "Back",
    teacherName: "Professor Popo",
noAnalysisTitle:
  "There is no data to analyze yet!",
noAnalysisMessage:
  "Enter this week's expenses,<br>and Professor Popo will review them with you!",
  teacherFrom: "From Professor Popo",
weeklyReview: "This Week's Review",
totalExpense: "Total expenses",
goalBudget: "Target budget",
usageRate: "Budget usage rate",
averageSatisfaction: "Average satisfaction",
necessaryExpenses: "Necessary expenses",
overBudgetAmount: "Amount over budget",
remainingBudget: "Remaining budget",
improvementPoints: "Points for improvement",
weeklyMessageTitle: "Message for this week",
currency: "yen",
countUnit: "items",
speechOverBudget:
  "You have exceeded this week's target budget. Let's find just one expense you can reduce without pushing yourself too hard.",

speechBudgetEnding:
  "You are nearing the end of your budget. Before spending more, ask yourself, “Do I really need this now?”",

speechHighSatisfaction:
  "You are spending your money in a satisfying way! Keep choosing expenses that feel valuable to you.",

speechDefault:
  "Let's review this week's records together and use what you learned for your next purchase.",
weekMessageOver:
  "It is okay to have a week when you spend too much. Keeping a record will help you improve next time.",

weekMessageNormal:
  "Small steps create a better future. Keep going at your own pace next week!",
switchName: "Nintendo Switch",
airpodsName: "AirPods Pro",
disneyName: "Disney",
usjName: "USJ",
yakinikuName: "All-you-can-eat yakiniku",
travelName: "Domestic trips",
deviceUnit: "units",
timesUnit: "times",

futureYearTitle:
  "If you keep spending at this pace for one year…",

futureYearResult:
  "in total!",

futureComparisonTitle:
  "This amount is equivalent to…",

noFutureItem:
  "It is not yet enough to compare with a large purchase.<br>Small savings can grow into something big over time!",

},

  my: {
    pageTitle:
      "ခွဲခြမ်းစိတ်ဖြာမှု | ချွေတာရေး စစ်ဆေးမှု",
    analysisPageTitle:
      "အသုံးစရိတ် ခွဲခြမ်းစိတ်ဖြာမှု",
    weeklyExpenseAnalysis:
      "ဒီအပတ် အသုံးစရိတ် ခွဲခြမ်းစိတ်ဖြာမှု",
    continueAtThisPace:
      "ဒီနှုန်းအတိုင်း ဆက်သွားပါက…",
    analysisResult:
      "အသုံးစရိတ် ခွဲခြမ်းစိတ်ဖြာမှုရလဒ်",
    futureValueResult:
      "လက်ရှိအသုံးစရိတ်နှုန်းအတိုင်း ဆက်သွားပါက ရလဒ်",
    back: "ပြန်ရန်",
    teacherName: "ဆရာမ ပိုပို",
noAnalysisTitle:
  "ခွဲခြမ်းစိတ်ဖြာရန် ဒေတာမရှိသေးပါ။",
noAnalysisMessage:
  "ဒီအပတ် အသုံးစရိတ်ကို ထည့်ပါ။<br>ဆရာမ ပိုပိုက အတူပြန်လည်သုံးသပ်ပေးမယ်♪",
  teacherFrom: "ဆရာမ ပိုပိုထံမှ",
weeklyReview: "ဒီအပတ် ပြန်လည်သုံးသပ်ချက်",
totalExpense: "စုစုပေါင်း အသုံးစရိတ်",
goalBudget: "ရည်မှန်းဘတ်ဂျက်",
usageRate: "ဘတ်ဂျက်အသုံးပြုနှုန်း",
averageSatisfaction: "ပျမ်းမျှ ကျေနပ်မှု",
necessaryExpenses: "လိုအပ်သောအသုံးစရိတ်",
overBudgetAmount: "ဘတ်ဂျက်ကျော်သည့်ငွေ",
remainingBudget: "ကျန်ရှိသောဘတ်ဂျက်",
improvementPoints: "တိုးတက်ရန်အချက်များ",
weeklyMessageTitle: "ဒီအပတ်အတွက် စကားတစ်ခွန်း",
currency: "ယန်း",
countUnit: "ခု",
speechOverBudget:
  "ဒီအပတ် ရည်မှန်းဘတ်ဂျက်ကို ကျော်သွားပြီ။ အခက်အခဲမဖြစ်ဘဲ လျှော့ချနိုင်မယ့် အသုံးစရိတ်တစ်ခုကို ရှာကြည့်ရအောင်။",

speechBudgetEnding:
  "ဘတ်ဂျက်ကုန်ခါနီးပြီ။ နောက်ထပ်အသုံးမပြုခင် “အခုတကယ်လိုအပ်သလား” လို့ တစ်ကြိမ်စဉ်းစားကြည့်ပါ။",

speechHighSatisfaction:
  "ကျေနပ်မှုမြင့်တဲ့ ငွေသုံးစွဲမှုလုပ်နိုင်နေတယ်။ ကိုယ့်အတွက် တန်ဖိုးရှိတဲ့ အသုံးစရိတ်တွေကို ဆက်ရွေးကြရအောင်။",

speechDefault:
  "ဒီအပတ်မှတ်တမ်းကို အတူပြန်လည်သုံးသပ်ပြီး နောက်ဝယ်ယူမှုမှာ အသုံးချကြရအောင်။",
switchName: "Nintendo Switch",
airpodsName: "AirPods Pro",
disneyName: "Disney",
usjName: "USJ",
yakinikuName: "အသားကင်အဝစား",
travelName: "ပြည်တွင်းခရီး",
deviceUnit: "လုံး",
timesUnit: "ကြိမ်",
weekMessageOver:
  "အသုံးများသွားတဲ့အပတ်ရှိလည်း အဆင်ပြေပါတယ်။ မှတ်တမ်းတင်နိုင်ခဲ့တာက နောက်တစ်ကြိမ်တိုးတက်ဖို့ အထောက်အကူဖြစ်မယ်။",

weekMessageNormal:
  "သေးငယ်တဲ့ကြိုးစားမှုတွေက အနာဂတ်ကြီးတစ်ခုကို ဖန်တီးပေးတယ်။ နောက်အပတ်လည်း ကိုယ့်နှုန်းနဲ့ ဆက်လုပ်ကြရအောင်။",
futureYearTitle:
  "ဒီနှုန်းအတိုင်း တစ်နှစ်လုံး အသုံးပြုပါက…",

futureYearResult:
  "ဖြစ်လာမယ်။",

futureComparisonTitle:
  "ဒီငွေပမာဏကို နေ့စဉ်ဘဝက အရာတွေနဲ့ နှိုင်းယှဉ်ရင်…",

noFutureItem:
  "ကြီးမားတဲ့ဝယ်ယူမှုတစ်ခုနဲ့ နှိုင်းယှဉ်နိုင်လောက်တဲ့ ပမာဏ မရှိသေးပါ။<br>သေးငယ်တဲ့ချွေတာမှုတွေကို ဆက်လုပ်ရင် ကြီးမားလာနိုင်တယ်♪",
},

  id: {
    pageTitle:
      "Analisis | Pemeriksa Penghematan",
    analysisPageTitle:
      "Analisis Pengeluaran",
    weeklyExpenseAnalysis:
      "Analisis Pengeluaran Minggu Ini",
    continueAtThisPace:
      "Jika terus dengan kecepatan ini…",
    analysisResult:
      "Hasil analisis pengeluaran",
    futureValueResult:
      "Hasil jika pengeluaran saat ini diteruskan",
    back: "Kembali",
    teacherName: "Bu Popo",
noAnalysisTitle:
  "Belum ada data yang dapat dianalisis!",
noAnalysisMessage:
  "Masukkan pengeluaran minggu ini,<br>dan Bu Popo akan meninjaunya bersamamu!",
  teacherFrom: "Dari Bu Popo",
weeklyReview: "Tinjauan Minggu Ini",
totalExpense: "Total pengeluaran",
goalBudget: "Target anggaran",
usageRate: "Persentase penggunaan anggaran",
averageSatisfaction: "Rata-rata kepuasan",
necessaryExpenses: "Pengeluaran penting",
overBudgetAmount: "Jumlah melebihi anggaran",
remainingBudget: "Sisa anggaran",
improvementPoints: "Poin perbaikan",
weeklyMessageTitle: "Pesan minggu ini",
currency: "yen",
countUnit: "item",
speechOverBudget:
  "Pengeluaran minggu ini sudah melebihi target anggaran. Mari cari satu pengeluaran yang dapat dikurangi tanpa terlalu memaksakan diri.",

speechBudgetEnding:
  "Anggaran sudah mendekati batas. Sebelum berbelanja lagi, coba pikirkan, “Apakah ini benar-benar diperlukan sekarang?”",

speechHighSatisfaction:
  "Kamu sudah menggunakan uang dengan tingkat kepuasan yang tinggi! Teruslah memilih pengeluaran yang bernilai bagimu.",

speechDefault:
  "Mari tinjau catatan minggu ini dan gunakan hasilnya untuk pembelian berikutnya.",
switchName: "Nintendo Switch",
airpodsName: "AirPods Pro",
disneyName: "Disney",
usjName: "USJ",
yakinikuName: "Yakiniku sepuasnya",
travelName: "Perjalanan domestik",
deviceUnit: "unit",
timesUnit: "kali",
weekMessageOver:
  "Tidak apa-apa jika ada minggu ketika pengeluaran terlalu banyak. Catatan ini akan membantu perbaikan berikutnya.",

weekMessageNormal:
  "Langkah kecil dapat menciptakan masa depan yang besar. Minggu depan, lanjutkan dengan ritmemu sendiri!",
futureYearTitle:
  "Jika pengeluaran ini berlanjut selama satu tahun…",

futureYearResult:
  "totalnya!",

futureComparisonTitle:
  "Jika jumlah ini dibandingkan dengan hal yang lebih dekat…",

noFutureItem:
  "Jumlahnya belum cukup besar untuk dibandingkan dengan pembelian besar.<br>Penghematan kecil juga dapat menjadi besar jika terus dilakukan!",
},

  "zh-CN": {
    pageTitle: "分析 | 省钱检查",
    analysisPageTitle: "支出分析",
    weeklyExpenseAnalysis: "本周支出分析",
    continueAtThisPace: "如果按这个速度继续……",
    analysisResult: "支出分析结果",
    futureValueResult: "继续当前消费速度的结果",
    back: "返回",
    teacherName: "波波老师",
noAnalysisTitle:
  "还没有可以分析的数据！",
noAnalysisMessage:
  "输入本周的支出后，<br>波波老师会和你一起回顾♪",
  teacherFrom: "来自波波老师",
weeklyReview: "本周回顾",
totalExpense: "支出总额",
goalBudget: "目标预算",
usageRate: "目标金额使用率",
averageSatisfaction: "平均满意度",
necessaryExpenses: "必要支出",
overBudgetAmount: "超出预算金额",
remainingBudget: "剩余预算",
improvementPoints: "改进要点",
weeklyMessageTitle: "本周寄语",
currency: "日元",
countUnit: "笔",
speechOverBudget:
  "本周已经超过目标预算了。先找出一项可以轻松减少的支出吧。",

speechBudgetEnding:
  "预算快到上限了。接下来的支出先问问自己：“现在真的需要吗？”",

speechHighSatisfaction:
  "你的消费满意度很高！继续选择对自己真正有价值的支出吧。",

speechDefault:
  "一起回顾本周的记录，并把经验运用到下次消费中吧。",
  switchName: "Nintendo Switch",
airpodsName: "AirPods Pro",
disneyName: "迪士尼",
usjName: "USJ",
yakinikuName: "烤肉自助餐",
travelName: "国内旅行",
deviceUnit: "台",
timesUnit: "次",
weekMessageOver:
  "偶尔有一周花得比较多也没关系。能够记录下来，就能帮助你下次改进。",

weekMessageNormal:
  "一点一滴的积累，会创造更好的未来。下周也按照自己的节奏继续吧！",

futureYearTitle:
  "如果按照这个速度支出一年……",

futureYearResult:
  "总计！",

futureComparisonTitle:
  "把这笔金额换算成身边的东西……",

noFutureItem:
  "目前还没有达到可以换算成大额消费的金额。<br>小小的节省，坚持下去也会变成一大笔钱♪",

  },

  "zh-TW": {
    pageTitle: "分析 | 省錢檢查",
    analysisPageTitle: "支出分析",
    weeklyExpenseAnalysis: "本週支出分析",
    continueAtThisPace: "如果照這個速度繼續……",
    analysisResult: "支出分析結果",
    futureValueResult: "繼續目前消費速度的結果",
    back: "返回",
    teacherName: "波波老師",
noAnalysisTitle:
  "還沒有可以分析的資料！",
noAnalysisMessage:
  "輸入本週的支出後，<br>波波老師會和你一起回顧♪",
  teacherFrom: "來自波波老師",
weeklyReview: "本週回顧",
totalExpense: "支出總額",
goalBudget: "目標預算",
usageRate: "目標金額使用率",
averageSatisfaction: "平均滿意度",
necessaryExpenses: "必要支出",
overBudgetAmount: "超出預算金額",
remainingBudget: "剩餘預算",
improvementPoints: "改善重點",
weeklyMessageTitle: "本週的一句話",
currency: "日圓",
countUnit: "筆",
speechOverBudget:
  "本週已經超過目標預算了。先找出一項可以輕鬆減少的支出吧。",

speechBudgetEnding:
  "預算快到上限了。接下來的支出先問問自己：「現在真的需要嗎？」",

speechHighSatisfaction:
  "你的消費滿意度很高！繼續選擇對自己真正有價值的支出吧。",

speechDefault:
  "一起回顧本週的紀錄，並把經驗運用到下次消費中吧。",
  switchName: "Nintendo Switch",
airpodsName: "AirPods Pro",
disneyName: "迪士尼",
usjName: "USJ",
yakinikuName: "燒肉吃到飽",
travelName: "國內旅行",
deviceUnit: "台",
timesUnit: "次",
weekMessageOver:
  "偶爾有一週花得比較多也沒關係。能夠記錄下來，就能幫助你下次改善。",

weekMessageNormal:
  "一點一滴的累積，會創造更好的未來。下週也按照自己的步調繼續吧！",
futureYearTitle:
  "如果按照這個速度支出一年……",

futureYearResult:
  "總計！",

futureComparisonTitle:
  "把這筆金額換算成身邊的東西……",

noFutureItem:
  "目前還沒有達到可以換算成大額消費的金額。<br>小小的節省，持續下去也會變成一大筆錢♪",

  },

  ru: {
    pageTitle:
      "Анализ | Контроль экономии",
    analysisPageTitle:
      "Анализ расходов",
    weeklyExpenseAnalysis:
      "Анализ расходов за неделю",
    continueAtThisPace:
      "Если продолжать в таком темпе…",
    analysisResult:
      "Результат анализа расходов",
    futureValueResult:
      "Результат при сохранении текущего темпа расходов",
    back: "Назад",
    teacherName: "Учитель Попо",
noAnalysisTitle:
  "Пока нет данных для анализа!",
noAnalysisMessage:
  "Введите расходы за эту неделю,<br>и учитель Попо поможет их проанализировать!",
  teacherFrom: "От учителя Попо",
weeklyReview: "Обзор недели",
totalExpense: "Общие расходы",
goalBudget: "Целевой бюджет",
usageRate: "Процент использования бюджета",
averageSatisfaction: "Средняя удовлетворённость",
necessaryExpenses: "Необходимые расходы",
overBudgetAmount: "Превышение бюджета",
remainingBudget: "Оставшийся бюджет",
improvementPoints: "Что можно улучшить",
weeklyMessageTitle: "Сообщение недели",
currency: "иен",
countUnit: "поз.",
speechOverBudget:
  "На этой неделе целевой бюджет превышен. Давайте найдём хотя бы один расход, который можно сократить без лишнего напряжения.",

speechBudgetEnding:
  "Бюджет почти исчерпан. Перед следующей покупкой спросите себя: «Мне действительно нужно это сейчас?»",

speechHighSatisfaction:
  "Ваши расходы приносят высокий уровень удовлетворения! Продолжайте выбирать то, что действительно имеет для вас ценность.",

speechDefault:
  "Давайте вместе посмотрим записи за неделю и используем выводы при следующей покупке.",
switchName: "Nintendo Switch",
airpodsName: "AirPods Pro",
disneyName: "Disney",
usjName: "USJ",
yakinikuName: "Безлимитное якинику",
travelName: "Поездки по стране",
deviceUnit: "шт.",
timesUnit: "раз",
weekMessageOver:
  "Ничего страшного, если на этой неделе вы потратили больше. Запись расходов поможет улучшить ситуацию в следующий раз.",

weekMessageNormal:
  "Небольшие шаги создают большое будущее. Продолжайте в своём темпе и на следующей неделе!",
futureYearTitle:
  "Если продолжать тратить в таком темпе в течение года…",

futureYearResult:
  "всего!",

futureComparisonTitle:
  "Эту сумму можно сравнить с…",

noFutureItem:
  "Сумма пока недостаточно велика, чтобы сравнить её с крупной покупкой.<br>Даже небольшая экономия со временем становится значительной!",
},

  vi: {
    pageTitle:
      "Phân tích | Kiểm tra tiết kiệm",
    analysisPageTitle:
      "Phân tích chi tiêu",
    weeklyExpenseAnalysis:
      "Phân tích chi tiêu tuần này",
    continueAtThisPace:
      "Nếu tiếp tục với tốc độ này…",
    analysisResult:
      "Kết quả phân tích chi tiêu",
    futureValueResult:
      "Kết quả nếu tiếp tục mức chi tiêu hiện tại",
    back: "Quay lại",
    teacherName: "Cô Popo",
noAnalysisTitle:
  "Chưa có dữ liệu để phân tích!",
noAnalysisMessage:
  "Hãy nhập chi tiêu tuần này,<br>cô Popo sẽ cùng bạn xem lại nhé!",
  teacherFrom: "Từ cô Popo",
weeklyReview: "Nhìn lại tuần này",
totalExpense: "Tổng chi tiêu",
goalBudget: "Ngân sách mục tiêu",
usageRate: "Tỷ lệ sử dụng ngân sách",
averageSatisfaction: "Mức hài lòng trung bình",
necessaryExpenses: "Chi tiêu cần thiết",
overBudgetAmount: "Số tiền vượt ngân sách",
remainingBudget: "Ngân sách còn lại",
improvementPoints: "Điểm cần cải thiện",
weeklyMessageTitle: "Lời nhắn tuần này",
speechOverBudget:
  "Tuần này bạn đã vượt ngân sách mục tiêu. Hãy thử tìm một khoản có thể giảm mà không cần ép bản thân quá nhiều nhé.",

speechBudgetEnding:
  "Ngân sách đang gần hết. Trước khi chi thêm, hãy tự hỏi: “Mình có thực sự cần nó ngay lúc này không?”",

speechHighSatisfaction:
  "Bạn đang sử dụng tiền với mức hài lòng cao! Hãy tiếp tục chọn những khoản chi có giá trị với mình.",

speechDefault:
  "Hãy cùng xem lại ghi chép tuần này và áp dụng vào lần mua sắm tiếp theo nhé.",
currency: "yên",
countUnit: "khoản",
switchName: "Nintendo Switch",
airpodsName: "AirPods Pro",
disneyName: "Disney",
usjName: "USJ",
yakinikuName: "Yakiniku ăn thỏa thích",
travelName: "Du lịch trong nước",
deviceUnit: "chiếc",
timesUnit: "lần",
weekMessageOver:
  "Có một tuần chi tiêu nhiều hơn cũng không sao. Việc ghi chép sẽ giúp bạn cải thiện trong lần sau.",

weekMessageNormal:
  "Những bước nhỏ sẽ tạo nên một tương lai lớn. Tuần sau hãy tiếp tục theo nhịp độ của bạn nhé!",
futureYearTitle:
  "Nếu tiếp tục chi tiêu với mức này trong một năm…",

futureYearResult:
  "tổng cộng!",

futureComparisonTitle:
  "Nếu so số tiền này với những thứ quen thuộc…",

noFutureItem:
  "Số tiền này vẫn chưa đủ lớn để quy đổi thành một món đồ lớn.<br>Những khoản tiết kiệm nhỏ cũng sẽ trở nên lớn hơn nếu tiếp tục duy trì!",
},

  ko: {
    pageTitle:
      "분석 | 절약 체크",
    analysisPageTitle:
      "지출 분석",
    weeklyExpenseAnalysis:
      "이번 주 지출 분석",
    continueAtThisPace:
      "이대로 계속하면…",
    analysisResult:
      "지출 분석 결과",
    futureValueResult:
      "현재 지출 속도를 계속했을 때의 결과",
    back: "돌아가기",
    teacherName: "포포 선생님",
noAnalysisTitle:
  "아직 분석할 데이터가 없어요!",
noAnalysisMessage:
  "이번 주 지출을 입력하면,<br>포포 선생님이 함께 돌아봐 줄게요♪",
  teacherFrom: "포포 선생님으로부터",
weeklyReview: "이번 주 돌아보기",
totalExpense: "총지출",
goalBudget: "목표 예산",
usageRate: "목표 금액 사용률",
averageSatisfaction: "평균 만족도",
necessaryExpenses: "필요했던 지출",
overBudgetAmount: "예산 초과 금액",
remainingBudget: "남은 예산",
improvementPoints: "개선 포인트",
weeklyMessageTitle: "이번 주 한마디",
currency: "엔",
countUnit: "건",
speechOverBudget:
  "이번 주는 목표 예산을 초과했어요. 무리하지 않고 줄일 수 있는 지출을 하나만 찾아봐요.",

speechBudgetEnding:
  "예산이 거의 끝나가요. 남은 지출은 “지금 정말 필요한가?”를 한 번 생각해 봐요.",

speechHighSatisfaction:
  "만족도가 높은 소비를 하고 있어요! 자신에게 가치 있는 지출을 계속 선택해 봐요.",

speechDefault:
  "이번 주 기록을 함께 돌아보고 다음 소비에 활용해 봐요.",
switchName: "Nintendo Switch",
airpodsName: "AirPods Pro",
disneyName: "디즈니",
usjName: "USJ",
yakinikuName: "야키니쿠 무한리필",
travelName: "국내 여행",
deviceUnit: "대",
timesUnit: "회",
weekMessageOver:
  "지출이 많았던 주가 있어도 괜찮아요. 기록한 것이 다음 개선으로 이어질 거예요.",

weekMessageNormal:
  "작은 실천이 큰 미래를 만들어요. 다음 주도 자신의 속도로 계속해 봐요!",
futureYearTitle:
  "이 속도로 1년 동안 지출하면…",

futureYearResult:
  "이 됩니다!",

futureComparisonTitle:
  "이 금액을 친숙한 것에 비유하면…",

noFutureItem:
  "아직 큰 구매로 바꿔 볼 수 있을 만큼의 금액은 아니에요.<br>작은 절약도 계속하면 큰 금액이 돼요♪",
},

  th: {
    pageTitle:
      "วิเคราะห์ | ตรวจสอบการประหยัด",
    analysisPageTitle:
      "วิเคราะห์รายจ่าย",
    weeklyExpenseAnalysis:
      "วิเคราะห์รายจ่ายประจำสัปดาห์",
    continueAtThisPace:
      "หากใช้จ่ายในอัตรานี้ต่อไป…",
    analysisResult:
      "ผลการวิเคราะห์รายจ่าย",
    futureValueResult:
      "ผลลัพธ์หากใช้จ่ายในอัตราปัจจุบันต่อไป",
    back: "กลับ",
    teacherName: "คุณครูโปโปะ",
noAnalysisTitle:
  "ยังไม่มีข้อมูลสำหรับการวิเคราะห์!",
noAnalysisMessage:
  "กรอกรายจ่ายของสัปดาห์นี้<br>แล้วคุณครูโปโปะจะช่วยทบทวนไปด้วยกัน♪",
  teacherFrom: "จากคุณครูโปโปะ",
weeklyReview: "สรุปประจำสัปดาห์",
totalExpense: "รายจ่ายรวม",
goalBudget: "งบประมาณเป้าหมาย",
usageRate: "อัตราการใช้งบประมาณ",
averageSatisfaction: "ความพึงพอใจเฉลี่ย",
necessaryExpenses: "รายจ่ายที่จำเป็น",
overBudgetAmount: "จำนวนเงินที่เกินงบ",
remainingBudget: "งบประมาณคงเหลือ",
improvementPoints: "จุดที่ควรปรับปรุง",
weeklyMessageTitle: "ข้อความประจำสัปดาห์",
currency: "เยน",
countUnit: "รายการ",
speechOverBudget:
  "สัปดาห์นี้ใช้จ่ายเกินงบเป้าหมายแล้ว ลองหาค่าใช้จ่ายหนึ่งรายการที่ลดได้โดยไม่ฝืนตัวเองมากเกินไปนะ",

speechBudgetEnding:
  "งบประมาณใกล้หมดแล้ว ก่อนใช้จ่ายครั้งต่อไป ลองถามตัวเองว่า “ตอนนี้จำเป็นจริง ๆ ไหม?”",

speechHighSatisfaction:
  "คุณใช้เงินได้อย่างน่าพอใจมาก! เลือกใช้จ่ายกับสิ่งที่มีคุณค่าต่อตัวเองต่อไปนะ",

speechDefault:
  "มาทบทวนบันทึกของสัปดาห์นี้และนำไปใช้กับการซื้อครั้งต่อไปกันเถอะ",
switchName: "Nintendo Switch",
airpodsName: "AirPods Pro",
disneyName: "Disney",
usjName: "USJ",
yakinikuName: "บุฟเฟต์ยากินิกุ",
travelName: "ท่องเที่ยวในประเทศ",
deviceUnit: "เครื่อง",
timesUnit: "ครั้ง",
weekMessageOver:
  "มีบางสัปดาห์ที่ใช้จ่ายมากเกินไปก็ไม่เป็นไร การบันทึกครั้งนี้จะช่วยให้ปรับปรุงได้ในครั้งต่อไป",

weekMessageNormal:
  "การสะสมทีละเล็กทีละน้อยจะสร้างอนาคตที่ยิ่งใหญ่ สัปดาห์หน้าก็ทำต่อไปตามจังหวะของตัวเองนะ",

futureYearTitle:
  "หากใช้จ่ายในอัตรานี้ต่อเนื่องเป็นเวลา 1 ปี…",

futureYearResult:
  "รวมทั้งหมด!",

futureComparisonTitle:
  "หากเปรียบเทียบจำนวนเงินนี้กับสิ่งใกล้ตัว…",

noFutureItem:
  "จำนวนเงินยังไม่มากพอที่จะเปรียบเทียบกับการซื้อครั้งใหญ่<br>การประหยัดเพียงเล็กน้อย หากทำต่อเนื่องก็จะกลายเป็นเงินก้อนใหญ่ได้♪",
},

  es: {
    pageTitle:
      "Análisis | Control de ahorro",
    analysisPageTitle:
      "Análisis de gastos",
    weeklyExpenseAnalysis:
      "Análisis de gastos de esta semana",
    continueAtThisPace:
      "Si continúas a este ritmo…",
    analysisResult:
      "Resultado del análisis de gastos",
    futureValueResult:
      "Resultado de continuar con el ritmo actual de gastos",
    back: "Volver",
    teacherName: "Profesora Popo",
noAnalysisTitle:
  "¡Todavía no hay datos para analizar!",
noAnalysisMessage:
  "Introduce los gastos de esta semana<br>y la profesora Popo los revisará contigo.",
  teacherFrom: "De la profesora Popo",
weeklyReview: "Resumen de esta semana",
totalExpense: "Gasto total",
goalBudget: "Presupuesto objetivo",
usageRate: "Porcentaje de presupuesto utilizado",
averageSatisfaction: "Satisfacción media",
necessaryExpenses: "Gastos necesarios",
overBudgetAmount: "Importe por encima del presupuesto",
remainingBudget: "Presupuesto restante",
improvementPoints: "Puntos de mejora",
weeklyMessageTitle: "Mensaje de esta semana",
currency: "yenes",
countUnit: "gastos",
speechOverBudget:
  "Esta semana has superado el presupuesto objetivo. Busca un solo gasto que puedas reducir sin exigirte demasiado.",

speechBudgetEnding:
  "Estás llegando al final del presupuesto. Antes de gastar más, pregúntate: «¿De verdad lo necesito ahora?»",

speechHighSatisfaction:
  "¡Estás haciendo gastos con un nivel alto de satisfacción! Sigue eligiendo aquello que tenga valor para ti.",

speechDefault:
  "Revisemos juntos los registros de esta semana y usemos lo aprendido en la próxima compra.",
switchName: "Nintendo Switch",
airpodsName: "AirPods Pro",
disneyName: "Disney",
usjName: "USJ",
yakinikuName: "Yakiniku libre",
travelName: "Viajes nacionales",
deviceUnit: "unidades",
timesUnit: "veces",
weekMessageOver:
  "No pasa nada si alguna semana gastas demasiado. Haberlo registrado te ayudará a mejorar la próxima vez.",

weekMessageNormal:
  "Los pequeños pasos crean un gran futuro. ¡La próxima semana continúa a tu propio ritmo!",

futureYearTitle:
  "Si mantienes este ritmo de gasto durante un año…",

futureYearResult:
  "¡en total!",

futureComparisonTitle:
  "Esta cantidad equivale aproximadamente a…",

noFutureItem:
  "Todavía no es una cantidad suficiente para compararla con una compra grande.<br>¡Los pequeños ahorros pueden convertirse en algo grande con el tiempo!",

},

  "pt-BR": {
    pageTitle:
      "Análise | Controle de economia",
    analysisPageTitle:
      "Análise de despesas",
    weeklyExpenseAnalysis:
      "Análise das despesas desta semana",
    continueAtThisPace:
      "Se continuar nesse ritmo…",
    analysisResult:
      "Resultado da análise de despesas",
    futureValueResult:
      "Resultado ao manter o ritmo atual de despesas",
    back: "Voltar",
    teacherName: "Professora Popo",
noAnalysisTitle:
  "Ainda não há dados para analisar!",
noAnalysisMessage:
  "Insira as despesas desta semana<br>e a professora Popo irá analisá-las com você.",
  teacherFrom: "Da professora Popo",
weeklyReview: "Resumo desta semana",
totalExpense: "Total de despesas",
goalBudget: "Orçamento-alvo",
usageRate: "Percentual do orçamento utilizado",
averageSatisfaction: "Satisfação média",
necessaryExpenses: "Despesas necessárias",
overBudgetAmount: "Valor acima do orçamento",
remainingBudget: "Orçamento restante",
improvementPoints: "Pontos de melhoria",
weeklyMessageTitle: "Mensagem da semana",
currency: "ienes",
countUnit: "itens",
speechOverBudget:
  "Nesta semana, você ultrapassou o orçamento-alvo. Procure apenas uma despesa que possa reduzir sem se esforçar demais.",

speechBudgetEnding:
  "O orçamento está chegando ao fim. Antes de gastar mais, pergunte-se: “Eu realmente preciso disso agora?”",

speechHighSatisfaction:
  "Você está gastando com um alto nível de satisfação! Continue escolhendo despesas que tenham valor para você.",

speechDefault:
  "Vamos revisar os registros desta semana e usar o aprendizado na próxima compra.",
switchName: "Nintendo Switch",
airpodsName: "AirPods Pro",
disneyName: "Disney",
usjName: "USJ",
yakinikuName: "Yakiniku à vontade",
travelName: "Viagens nacionais",
deviceUnit: "unidades",
timesUnit: "vezes",
weekMessageOver:
  "Tudo bem ter uma semana com gastos excessivos. O registro ajudará você a melhorar na próxima vez.",

weekMessageNormal:
  "Pequenos passos criam um grande futuro. Na próxima semana, continue no seu próprio ritmo!",

futureYearTitle:
  "Se você mantiver esse ritmo de gastos durante um ano…",

futureYearResult:
  "no total!",

futureComparisonTitle:
  "Esse valor equivale aproximadamente a…",

noFutureItem:
  "O valor ainda não é suficiente para ser comparado a uma compra grande.<br>Pequenas economias podem se tornar algo grande com o tempo!",
},
};

/* ========================================
   使用する翻訳を取得
======================================== */

function getAdvicePageTexts() {
  return (
    advicePageTranslations[currentLanguage] ||
    advicePageTranslations.ja
  );
}


/* ========================================
   固定文言を翻訳
======================================== */

function applyAdvicePageLanguage() {
  const texts =
    getAdvicePageTexts();

  document
    .querySelectorAll("[data-i18n]")
    .forEach((element) => {
      const key =
        element.dataset.i18n;

      if (texts[key] !== undefined) {
        element.textContent =
          texts[key];
      }
    });

  document
    .querySelectorAll(
      "[data-i18n-aria-label]"
    )
    .forEach((element) => {
      const key =
        element.dataset.i18nAriaLabel;

      if (texts[key] !== undefined) {
        element.setAttribute(
          "aria-label",
          texts[key]
        );
      }
    });

  document.title =
    texts.pageTitle;

  document.documentElement.lang =
    currentLanguage;
}



// 110 × 4,000 = 440,000通りのアドバイス

const adviceSatMessages = {
  1: [
    "期待していた満足感は、今回はあまり得られなかったようです。",
    "支払った金額に対して、価値を感じにくい支出だったようです。",
    "購入前に想像していた結果との差が大きかったかもしれません。",
    "今回は、買ってよかったと思える部分が少なかったようです。",
    "満足度の面では、見直したい点が残る支出です。",
    "同じものをもう一度選ぶか考えると、判断のヒントになりそうです。",
    "購入を決めた理由と、実際の感想を比べてみるとよさそうです。",
    "今回は、別の選択肢を検討してもよかったかもしれません。",
    "使った後の気持ちを見ると、優先度は高くなかったようです。",
    "金額に見合う良さを、十分には感じられなかったようです。",
    "その場では必要に感じても、振り返ると印象が変わったようです。",
    "今回の結果から、自分に合わない支出の特徴が見えてきそうです。",
    "満足につながらなかった理由を一つ考えておくと役立ちます。",
    "買う前に少し時間を置くことで、防げた可能性のある支出です。",
    "価格、品質、タイミングのどこに不満があったか整理してみましょう。",
    "今回の記録は、今後同じ後悔を減らすための材料になります。",
    "満足度が低かったことを、次の選択に活かせそうです。",
    "買わなかった場合と比べても、得られたものは少なかったかもしれません。",
    "次回は、購入前に代わりになる方法がないか確認すると安心です。",
    "今回は残念な結果でしたが、振り返ったことには十分意味があります。"
  ],

  2: [
    "少し良さはあったものの、満足できない部分も残ったようです。",
    "必要な価値は得られましたが、金額にはやや見合いにくかったようです。",
    "悪い買い物とまでは言えませんが、改善できる点がありそうです。",
    "購入した理由は理解できますが、結果には少し物足りなさが残っています。",
    "期待したほどではなかった部分を、次回の条件に加えてみましょう。",
    "今回は、価格や選び方をもう少し比較してもよかったかもしれません。",
    "使った直後の満足感が続かなかった可能性があります。",
    "一部は役立ったものの、全体としては惜しい支出だったようです。",
    "購入前に優先した点と、実際に良かった点が少しずれていたようです。",
    "次回は、買う目的をもう少し具体的にすると選びやすくなります。",
    "満足度を下げた原因を一つ見つけるだけでも、次に活かせます。",
    "金額を抑えるか、品質を上げるかを考える余地がありそうです。",
    "今回は小さな後悔が残りましたが、傾向を知る材料になりました。",
    "同じ種類の支出では、口コミや比較を増やすと安心できそうです。",
    "買ったこと自体よりも、選んだ商品やタイミングに課題があったかもしれません。",
    "もう少し待ってから決めてもよかった可能性があります。",
    "満足感を高めるには、購入条件を絞ることが役立ちそうです。",
    "使い切れるか、長く使えるかを事前に確認するとよさそうです。",
    "次回は、似た商品との違いを比べてから選ぶと納得しやすくなります。",
    "今回の支出は、少し調整すればより良い選択につながりそうです。"
  ],

  3: [
    "大きな後悔はありませんが、特別な満足感も少なかったようです。",
    "支出としては標準的で、良い点と気になる点の両方がありそうです。",
    "目的はある程度果たせたものの、より良い選択肢も考えられます。",
    "金額と満足感は、おおむね釣り合っていたようです。",
    "今回は無難な選択でした。次回は重視したい点を一つ決めてみましょう。",
    "必要な役割は果たしましたが、強くおすすめできるほどではなかったようです。",
    "買って困るものではありませんが、優先度は中程度だったようです。",
    "満足度は平均的です。価格や品質を少し見直す余地があります。",
    "購入前の期待には、ある程度応えられたようです。",
    "良くも悪くも印象が強くない支出だったようです。",
    "今後も選ぶかどうかは、使用頻度を見て判断するとよさそうです。",
    "今回の選択を基準にすると、次は比較しやすくなります。",
    "満足感をもう一段上げるには、目的に合う条件を整理すると効果的です。",
    "日常の支出としては問題ありませんが、少し工夫できそうです。",
    "価格を下げても同じ満足感が得られた可能性があります。",
    "反対に、少し質を上げることで満足度が高まる支出かもしれません。",
    "今回の支出は、自分の好みを確認する材料になりました。",
    "似た支出を続けるかどうかは、実際の使用回数で判断してみましょう。",
    "満足度が中間だった理由を考えると、今後の選択が明確になります。",
    "記録を重ねることで、この種類の支出が自分に合うか見えてきそうです。"
  ],

  4: [
    "満足度の高い支出で、金額に見合う価値を感じられたようです。",
    "購入前の期待に、しっかり応えてくれた買い物です。",
    "納得感のあるお金の使い方ができています。",
    "生活や気持ちに、良い変化を与えてくれた支出のようです。",
    "価格と満足感のバランスは、良好だったと言えそうです。",
    "選んだ理由と実際の良さが、よく一致しています。",
    "大きな後悔がなく、今後も候補に入れられる支出です。",
    "自分に合うものを、きちんと選べたようです。",
    "使ったお金が、十分な価値につながっています。",
    "満足できた理由を覚えておくと、次の買い物にも役立ちます。",
    "品質、価格、タイミングのバランスが取れていたようです。",
    "気持ちよくお金を使えた、良い支出です。",
    "無理に削るより、今後も大切にしたい種類の支出かもしれません。",
    "自分の優先順位に合った選択ができています。",
    "購入後の満足感が高く、判断はおおむね良かったようです。",
    "同じ条件であれば、また選んでもよさそうです。",
    "満足感が高いため、支出の目的は十分に果たせています。",
    "生活の質を高める支出として、良い結果になりました。",
    "少しだけ改善点はあっても、全体としては納得できる買い物です。",
    "今回の選び方は、今後の良い基準になりそうです。"
  ],

  5: [
    "満足度がとても高く、使ったお金がしっかり価値につながっています。",
    "買ってよかったと思える、納得感の高い支出です。",
    "今回の選択は、自分の希望にとてもよく合っていたようです。",
    "支払った金額以上の満足感を得られた可能性があります。",
    "生活や気持ちを豊かにしてくれる、価値ある支出でした。",
    "価格、品質、タイミングのすべてがよく合っていたようです。",
    "後悔が少なく、今後も大切にしたいお金の使い方です。",
    "自分にとって何が大切かを理解した上で選べています。",
    "満足度の面では、理想的な支出と言えそうです。",
    "お金を使った目的が、十分に達成されています。",
    "無理に減らすより、満足感を保ちながら続けたい支出です。",
    "今回の買い物は、自分らしい選択になっています。",
    "長く使いたい、また利用したいと思える支出だったようです。",
    "この支出に価値を感じた理由を、今後の判断基準にできそうです。",
    "気持ちよく支払えて、その後の満足感も高い結果になりました。",
    "必要な価値と、楽しさの両方を得られたようです。",
    "満足感がはっきりしているため、優先したい支出が見えています。",
    "自分の好みや生活に合うものを、上手に選べています。",
    "今回の支出は、今後のお金の使い方の良い見本になりそうです。",
    "大切なお金を、自分にとって意味のあるものへ変えられています。"
  ]
};

const adviceNecessaryMessages = {
  true: [
    "必要な支出だったため、金額だけを見て自分を責める必要はありません。",
    "暮らしを維持するために必要なものへ、適切にお金を使えています。",
    "必要性が高い支出では、安さだけでなく使いやすさや品質も大切です。",
    "避けにくい出費だからこそ、次回は価格や購入時期を比べると負担を抑えられます。",
    "生活に必要な支出として、まずはきちんと確保できたことが大切です。",
    "必要なものを我慢しすぎるより、無理のない範囲で選ぶ方が長く続きます。",
    "今回の支出は、日常を支えるためのものとして考えてよさそうです。",
    "必要な買い物では、満足度が低かった場合に商品や購入先を見直すと効果的です。",
    "削ることだけを考えず、同じ役割をより納得できる形で得られるか考えてみましょう。",
    "必要性のある支出なので、今後は予算の中にあらかじめ含めておくと安心です。"
  ],

  false: [
    "必需品ではありませんが、満足感や気分転換につながる支出にも意味があります。",
    "必要でない支出は、使った後に価値を感じられたかが大切な判断基準です。",
    "なくても困らないものだからこそ、満足度と金額のバランスを見てみましょう。",
    "楽しみのための支出をすべて減らすのではなく、優先したいものを選ぶことが大切です。",
    "購入前に少し時間を置くと、本当に欲しいものか判断しやすくなります。",
    "同じ金額を別の楽しみに使った場合と比べると、納得度を確認できます。",
    "今回の支出が気分や生活に良い影響を与えたか、振り返ってみましょう。",
    "必要性が低くても、満足度が高ければ大切にしたい支出になることがあります。",
    "満足度が低かった場合は、次回から購入を見送る候補にしてもよさそうです。",
    "自分にとって残したい楽しみと、減らせる支出を分ける材料にしましょう。"
  ]
};

const adviceRateMessages = {
  0: [
    "現在の使用額は目標金額の0％で、予算には十分な余裕があります。",
    "まだ目標金額を使っていないため、今後の予定を落ち着いて考えられます。",
    "予算のスタート地点です。必要な支出の予定を先に整理しておくと安心です。",
    "今の段階では余裕がありますが、使える金額を一度に広く考えすぎないことも大切です。",
    "目標金額はまだ残っています。今後必要になる出費を先に確保しておきましょう。",
    "使用率は0％です。週や月の後半に必要な金額を残す計画を立てやすい状態です。",
    "予算に手をつけていない今のうちに、優先順位を決めておくと管理しやすくなります。",
    "十分な余裕があるため、焦って使う必要はありません。",
    "現在は理想的なスタートです。支出が発生したら、目的と満足度も一緒に記録しましょう。",
    "目標金額の全額が残っています。必要なものと楽しみの配分を考えてみましょう。"
  ],

  10: [
    "現在は目標金額の10％で、予算にはかなり余裕があります。",
    "まだ使い始めの段階です。今のペースを確認しながら進めましょう。",
    "使用額は低く、必要な支出にも対応しやすい状態です。",
    "残りは90％あります。今後の大きな予定を考えても余裕を持ちやすそうです。",
    "目標金額の一部を使った段階なので、無理に節約を強める必要はなさそうです。",
    "現在のペースが続くか、次の支出まで様子を見てみましょう。",
    "予算には十分な幅がありますが、小さな支出の積み重ねには注意しておくと安心です。",
    "まだ早い段階なので、必要なものを優先する方針を決めておきましょう。",
    "使用率は10％です。計画と実際のずれは、今のうちなら調整しやすい状態です。",
    "余裕のある進み方です。満足度の高い支出を選ぶ意識を続けてみましょう。"
  ],

  20: [
    "現在は目標金額の20％で、予算にはまだ十分な余裕があります。",
    "残りは80％です。今後の予定を考えながら、無理なく使える状態です。",
    "使用額は低めで、落ち着いたペースを保てています。",
    "今のところ大きな心配はありませんが、定期的な支出も忘れずに見込んでおきましょう。",
    "目標金額の5分の1を使いました。使い方の傾向を確認するにはよい時点です。",
    "余裕はありますが、満足度の低い支出が続いていないか確認してみましょう。",
    "現在の進み方なら、必要な支出にも対応しやすそうです。",
    "予算を保ちながら使えています。今後も目的を決めて支出すると安定します。",
    "使用率は20％です。今のペースが自分の予定に合っているか見てみましょう。",
    "まだ調整しやすい段階です。不要だった支出があれば、次回から少し減らせそうです。"
  ],

  30: [
    "現在は目標金額の30％で、予算には比較的余裕があります。",
    "残りは70％です。今後の予定を含めても、まだ調整しやすい段階です。",
    "使い始めから少し進みましたが、落ち着いた管理ができています。",
    "目標金額の約3分の1です。ここまでの支出内容を一度振り返ると効果的です。",
    "予算には余裕がありますが、同じ種類の支出が増えていないか確認してみましょう。",
    "現在のペースを維持できれば、大きく慌てる必要はなさそうです。",
    "必要な支出と楽しみの支出の割合を見直すには、ちょうどよい時点です。",
    "使用率は30％です。予定外の出費に備えて、少し余白を残しておきましょう。",
    "無理のない範囲で使えています。満足度が高い支出を優先していきましょう。",
    "今後の支出予定と照らし合わせ、使える金額を改めて確認してみましょう。"
  ],

  40: [
    "現在は目標金額の40％で、予算にはまだ余裕があります。",
    "残りは60％です。今後の必要な出費を考えながら進めたい段階です。",
    "目標金額の半分に近づいていますが、今のところ調整できる範囲です。",
    "ここまでの支出に満足できているか、内容を確認してみましょう。",
    "使用率は40％です。予定より早い場合は、次の支出を少し慎重に選ぶと安心です。",
    "まだ大きな制限は必要ありませんが、残りの期間とのバランスを見ておきましょう。",
    "必要性の低い支出が続いていなければ、順調な範囲と言えそうです。",
    "予算を使う目的が偏っていないか、一度確認してみるとよさそうです。",
    "残りの予算を、必要なものと楽しみの両方にどう配分するか考えてみましょう。",
    "現在の進み方が計画通りなら、無理なく続けられそうです。"
  ],

  50: [
    "現在は目標金額の50％で、ちょうど半分まで進んでいます。",
    "残りも50％です。残りの期間と支出予定を一度確認してみましょう。",
    "予算の折り返し地点です。ここからは優先順位がより大切になります。",
    "半分を使った時点で満足度が高ければ、良い配分ができている可能性があります。",
    "使用率は50％です。予定より早い場合は、次の買い物まで少し間を置くと安心です。",
    "ここまでの支出内容を見直し、残りの予算に反映させましょう。",
    "必要な支出が今後多い場合は、楽しみの支出を少し調整してもよさそうです。",
    "予算の半分が残っています。焦らず、今後必要になるものを先に考えましょう。",
    "現在のペースが期間の半分と合っているかを確認すると、判断しやすくなります。",
    "残りの金額を均等に使う必要はありません。予定に合わせて配分していきましょう。"
  ],

  60: [
    "現在は目標金額の60％で、残りの予算は40％です。",
    "半分を超えたため、今後の支出は優先順位を意識すると安心です。",
    "使用率は60％です。残りの期間が長い場合は、少しペースを整えてみましょう。",
    "必要な出費を先に見積もり、残りを楽しみに使う方法がおすすめです。",
    "ここからは、満足度の低い支出を減らすだけでも大きな違いが出ます。",
    "目標金額の6割を使いました。予定通りなら問題ありませんが、確認はしておきましょう。",
    "残りは40％あるため、まだ調整できる余地があります。",
    "今後の大きな予定がある場合は、その分を先に取り分けておくと安心です。",
    "支出を止めるよりも、必要性と満足度の高いものを選ぶことが大切です。",
    "現在の内容を見直し、同じような支出が重なっていないか確認してみましょう。"
  ],

  70: [
    "現在は目標金額の70％で、残りの予算は30％です。",
    "予算の残りが少しずつ限られてきました。今後の予定を確認しましょう。",
    "使用率は70％です。大きな買い物は、一度立ち止まって考えると安心です。",
    "必要な支出を優先し、満足度の低い支出は見送る時期に入っています。",
    "残りは30％です。予定外の出費に備えて、すべてを使い切らない意識も大切です。",
    "目標金額の7割を使いました。残りの期間に合わせてペースを調整してみましょう。",
    "ここからは、価格だけでなく本当に今必要かを確認すると効果的です。",
    "使える金額が限られるため、満足度の高い支出を選びたい段階です。",
    "残りの予算で対応する予定を、簡単に書き出してみると判断しやすくなります。",
    "無理に我慢する必要はありませんが、優先順位を決めてから使うと安心です。"
  ],

  80: [
    "現在は目標金額の80％で、残りの予算は20％です。",
    "予算の終盤に入っています。今後必要な支出を先に確保しましょう。",
    "使用率は80％です。急がない買い物は、次の期間に回すことも検討できます。",
    "残りは20％のため、必要性の高い支出を中心に考えたい段階です。",
    "目標金額の8割を使いました。予定外の支出には特に注意しておくと安心です。",
    "ここからは、買った後の満足感を具体的に想像してから決めてみましょう。",
    "予算に余裕が少なくなっているため、代わりの方法がないか確認するのも効果的です。",
    "今後の予定と残額が合っているか、早めに見直しておきましょう。",
    "満足度の高い支出でも、時期をずらせる場合は一度検討してみてください。",
    "残りの金額を守るために、少額の支出もまとめて確認すると分かりやすくなります。"
  ],

  90: [
    "現在は目標金額の90％で、残りの予算は10％です。",
    "目標金額の上限が近いため、これからの支出は慎重に選びたい段階です。",
    "使用率は90％です。必要な支出が残っていないか、先に確認しましょう。",
    "残りは10％です。急がない買い物は、次の期間まで待つと安心です。",
    "ここからは、金額の小ささよりも支出の回数に注意すると効果的です。",
    "予算のほとんどを使っています。予定外の出費に備えて少し残しておきましょう。",
    "必要性が低く満足度も読めない支出は、一度見送ることをおすすめします。",
    "目標金額まであと少しです。使う前に優先順位をもう一度確認してみましょう。",
    "残額が限られているため、代用品や手持ちのもので対応できないか考えてみましょう。",
    "無理な我慢ではなく、今使う価値が高いものだけを選ぶ時期です。"
  ],

  100: [
    "現在は目標金額の100％で、設定した上限に到達しています。",
    "目標金額を使い切ったため、追加の支出は必要性をよく確認しましょう。",
    "使用率は100％です。急がない買い物は、次の期間に回すと安心です。",
    "上限に達しています。今後必要な支出がある場合は、他の項目を見直しましょう。",
    "ここからの支出は予算を超えるため、購入前に一度時間を置くことがおすすめです。",
    "目標金額に到達しました。残りの期間は、手持ちのものを活用してみましょう。",
    "必要な支出が発生する場合は、金額を抑えられる方法を比較するとよさそうです。",
    "予算を使い切った今は、満足度の低い支出を増やさないことが大切です。",
    "今回の支出内容を振り返り、次の目標金額を決める材料にしましょう。",
    "上限に達したことを責めるより、どの支出を今後残したいか整理してみましょう。"
  ]
};

const adviceEndingMessages = [
  "数字だけで判断せず、必要性と満足感の両方を今後の選び方に活かしていきましょう。",
  "今回の記録を残しておくと、次に似た支出をするときの判断がしやすくなります。"
];

/* =========================================================
   現在の言語に応じたアドバイスデータ
========================================================= */

const selectedAdviceMessages =
  getAdviceMessages(currentLanguage);



  

let lastAdviceSignature = "";

function pickAdviceMessage(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function normalizeAdviceRate(rate) {
  const number = Number(rate);

  if (!Number.isFinite(number)) {
    return 0;
  }

  const clamped = Math.max(0, Math.min(100, number));
  return Math.round(clamped / 10) * 10;
}

function normalizeNecessaryValue(value) {
  if (typeof value === "string") {
    const normalized = value.trim().toLowerCase();

    if (["true", "1", "yes", "必要", "必要だった"].includes(normalized)) {
      return true;
    }

    if (["false", "0", "no", "不要", "必要ではなかった"].includes(normalized)) {
      return false;
    }
  }

  return Boolean(value);
}

/**
 * 満足度・予算使用率・必要性からアドバイスを生成する
 *
 * @param {number} sat 満足度 1〜5
 * @param {number} rate 目標金額に対する使用率 0〜100
 * @param {boolean|string|number} isNecessary 必要だったか
 * @returns {string} innerHTMLに入れられるHTML文字列
 */
function getCheerMessage(sat, rate, isNecessary) {
  const normalizedSat = Math.max(1, Math.min(5, Math.round(Number(sat) || 1)));
  const normalizedRate = normalizeAdviceRate(rate);
  const normalizedNecessary = normalizeNecessaryValue(isNecessary);

  let satIndex;
  let needIndex;
  let rateIndex;
  let endingIndex;
  let signature;

  // 同じ文章が連続しにくいように、最大10回選び直す
  for (let i = 0; i < 10; i++) {
    satIndex = Math.floor(
  Math.random() *
    selectedAdviceMessages
      .satisfaction[normalizedSat].length
);

needIndex = Math.floor(
  Math.random() *
    selectedAdviceMessages
      .necessary[normalizedNecessary].length
);

rateIndex = Math.floor(
  Math.random() *
    selectedAdviceMessages
      .rate[normalizedRate].length
);

endingIndex = Math.floor(
  Math.random() *
    selectedAdviceMessages
      .ending.length
);
    signature =
      `${normalizedSat}-${normalizedNecessary}-${normalizedRate}-` +
      `${satIndex}-${needIndex}-${rateIndex}-${endingIndex}`;

    if (signature !== lastAdviceSignature) {
      break;
    }
  }

  lastAdviceSignature = signature;

  const satMessage =
  selectedAdviceMessages
    .satisfaction[normalizedSat][satIndex];

const necessaryMessage =
  selectedAdviceMessages
    .necessary[normalizedNecessary][needIndex];

const rateMessage =
  selectedAdviceMessages
    .rate[normalizedRate][rateIndex];

const endingMessage =
  selectedAdviceMessages
    .ending[endingIndex];
  
  return `
    <div class="personal-advice">
      <p>${satMessage}</p>
      <p>${necessaryMessage}</p>
      <p>${rateMessage}</p>
      <p>${endingMessage}</p>
    </div>
  `;
}

/**
 * HTMLタグなしで文章だけ取得したい場合
 */
function getCheerMessageText(sat, rate, isNecessary) {
  const temp = document.createElement("div");
  temp.innerHTML = getCheerMessage(sat, rate, isNecessary);
  return temp.textContent.trim();
}

/**
 * アドバイス総数を確認する
 * 5 × 2 × 11 × 20 × 10 × 10 × 2 = 440,000
 */
function countAdvicePatterns() {
  const conditionCount = 5 * 2 * 11;
  const variationsPerCondition = 20 * 10 * 10 * 2;
  return conditionCount * variationsPerCondition;
}

// 配列数に不足がないか開発時に確認
Object.entries(adviceSatMessages).forEach(([sat, messages]) => {
  console.assert(
    messages.length === 20,
    `満足度${sat}の文章数が20個ではありません: ${messages.length}`
  );
});

Object.entries(adviceNecessaryMessages).forEach(([necessary, messages]) => {
  console.assert(
    messages.length === 10,
    `必要性${necessary}の文章数が10個ではありません: ${messages.length}`
  );
});

Object.entries(adviceRateMessages).forEach(([rate, messages]) => {
  console.assert(
    messages.length === 10,
    `達成度${rate}%の文章数が10個ではありません: ${messages.length}`
  );
});

console.assert(
  adviceEndingMessages.length === 2,
  `締めの文章数が2個ではありません: ${adviceEndingMessages.length}`
);

console.log(
  `アドバイス総数: ${countAdvicePatterns().toLocaleString()}通り`
);
function showDiagnosis() {
  const texts =
  getAdvicePageTexts();

  const resultDesc =
    document.getElementById("result-desc");

  if (!resultDesc) {
    console.error(
      'id="result-desc"がHTMLにありません。'
    );

    return;
  }

  /* 収入以外を支出として取得 */
  const expenseData =
    expenses.filter((item) => {
      return item.type !== "収入";
    });

  /* 支出データがない場合 */
if (expenseData.length === 0) {
  const texts =
    getAdvicePageTexts();

  resultDesc.innerHTML = `
    <div class="empty-message">
      <div>
        <img
          src="image/teacher.png"
          alt="${texts.teacherName}"
          class="teacher-img"
        >

        <h2>
          ${texts.noAnalysisTitle}
        </h2>

        <p>
          ${texts.noAnalysisMessage}
        </p>
      </div>
    </div>
  `;

  return;
}

  /* 支出総額 */
  const total =
    expenseData.reduce(
      (sum, item) => {
        return (
          sum +
          Number(item.amount || 0)
        );
      },
      0
    );

  /* 満足度が入力されているデータ */
  const satData =
    expenseData.filter((item) => {
      const sat =
        Number(item.sat);

      return (
        Number.isFinite(sat) &&
        sat >= 1 &&
        sat <= 5
      );
    });

  /* 平均満足度 */
  const avgSat =
    satData.length > 0
      ? satData.reduce(
          (sum, item) => {
            return (
              sum +
              Number(item.sat)
            );
          },
          0
        ) / satData.length
      : 3;

  const diagnosisSat =
    Math.round(avgSat);

  /* 必要だった支出の数 */
  const necessaryCount =
    expenseData.filter((item) => {
      const necessaryValue =
        item.isNecessary ??
        item.necessary ??
        item.need ??
        item.isNeed;

      return normalizeNecessaryValue(
        necessaryValue
      );
    }).length;

  /* 半分以上が必要だった支出か */
  const diagnosisNecessary =
    necessaryCount >=
    expenseData.length / 2;

  /* 週の目標予算 */
  const goalAmount =
    Number(
      localStorage.getItem(
        `weeklyLimit_${currentUser}`
      )
    ) || 20000;

  /* 正確な使用率 */
  const rawRate =
    goalAmount > 0
      ? (total / goalAmount) * 100
      : 0;

  /* アドバイス文章用の使用率 */
  const diagnosisRate =
    normalizeAdviceRate(rawRate);

  /* 画面表示用の使用率 */
  const displayRate =
    Number.isInteger(rawRate)
      ? rawRate.toFixed(0)
      : rawRate.toFixed(1);

  /* 予算を超えた金額 */
  const overAmount =
    Math.max(
      total - goalAmount,
      0
    );

  /* 残り予算 */
  const remainingAmount =
    Math.max(
      goalAmount - total,
      0
    );

  /* 登録されている文章からアドバイス生成 */
  const adviceText =
    getCheerMessageText(
      diagnosisSat,
      diagnosisRate,
      diagnosisNecessary
    );

    /* 長い文章を句点ごとに分割 */
  const adviceSentences =
  adviceText
    .split(/(?<=[。！？.!?])\s*/)
    .map((text) => {
      return text.trim();
    })
    .filter(Boolean);

  /* ぽぽ先生の吹き出し */
let speechMessage = "";

if (rawRate > 100) {
  speechMessage =
    texts.speechOverBudget;
} else if (rawRate >= 80) {
  speechMessage =
    texts.speechBudgetEnding;
} else if (avgSat >= 4) {
  speechMessage =
    texts.speechHighSatisfaction;
} else {
  speechMessage =
    texts.speechDefault;
}

  /* 改善ポイントを表示 */
  const improvementItems =
    adviceSentences
      .map((message) => {
        return `
          <li>
            ${message}
          </li>
        `;
      })
      .join("");

  /* 今週のひとこと */
 const weekMessage =
  rawRate > 100
    ? texts.weekMessageOver
    : texts.weekMessageNormal;
   

  resultDesc.innerHTML = `
    <div class="diagnosis-box">

      <!-- ぽぽ先生と吹き出し -->
      <div class="teacher-area">
        <div class="teacher-img-wrap">
          <img
            src="image/teacher.png"
            alt="${texts.teacherName}"
            class="teacher-img"
          >
        </div>

        <div class="teacher-speech">
          <span class="teacher-name">
            ${texts.teacherFrom}
          </span>

          ${speechMessage}
        </div>
      </div>

      <!-- 今週の振り返り -->
      <section class="analysis-section">
        <h3 class="analysis-heading">
          <span class="analysis-icon">
            <i class="fa-regular fa-clipboard"></i>
          </span>

          ${texts.weeklyReview}
        </h3>

        <div class="summary-list">
          <div class="summary-row">
            <span>
              ${texts.totalExpense}
            </span>

            <strong>
              ${total.toLocaleString()} ${texts.currency}
            </strong>
          </div>

          <div class="summary-row">
            <span>
              ${texts.goalBudget}
            </span>

            <strong>
              ${goalAmount.toLocaleString()} ${texts.currency}
            </strong>
          </div>

          <div class="summary-row">
            <span>
              ${texts.usageRate}
            </span>

            <strong>
              ${displayRate}%
            </strong>
          </div>

          <div class="summary-row">
            <span>
              ${texts.averageSatisfaction}
            </span>

            <strong>
              ${avgSat.toFixed(1)} / 5
            </strong>
          </div>

          <div class="summary-row">
            <span>
              ${texts.necessaryExpenses}
            </span>

            <strong>
              ${necessaryCount} ${texts.countUnit}
            </strong>
          </div>

          <div class="summary-row">
            <span>
              ${
                rawRate > 100
                  ? texts.overBudgetAmount
                  : texts.remainingBudget
              }
            </span>

            <strong>
              ${
                (
                  rawRate > 100
                    ? overAmount
                    : remainingAmount
                ).toLocaleString()
              } ${texts.currency}
            </strong>
          </div>
        </div>
      </section>

      <!-- 改善ポイント -->
      <section class="analysis-section">
        <h3 class="analysis-heading">
          <span class="analysis-icon">
            <i class="fa-regular fa-lightbulb"></i>
          </span>

          ${texts.improvementPoints}
        </h3>

        <ul class="improvement-list">
          ${improvementItems}
        </ul>
      </section>

      <!-- 今週のひとこと -->
      <section class="analysis-section">
        <div class="week-message">
          <span class="week-message-icon">
            <i class="fa-solid fa-heart"></i>
          </span>

          <div>
            <h3>
              ${texts.weeklyMessageTitle}
            </h3>

            <p>
              ${weekMessage}
            </p>
          </div>
        </div>
      </section>
    </div>
  `;
}

/* ========================================
   右側：1年間の支出と画像
======================================== */

function showSummary() {
  const texts =
    getAdvicePageTexts();

  const futureElement =
    document.getElementById("future");

  if (!futureElement) {
    console.error(
      'id="future"がHTMLにありません。'
    );

    return;
  }

  /* 収入を除外 */
  const expenseData =
    expenses.filter((item) => {
      return item.type !== "収入";
    });

  /* 支出総額 */
  const total =
    expenseData.reduce(
      (sum, item) => {
        return (
          sum +
          Number(item.amount || 0)
        );
      },
      0
    );

  /* 1年間の金額に変換 */
  const f =
    futureValue(total);

  let items = "";

  /* Switch */
  if (f.switch > 0) {
    items += `
      <div class="advice-item">
        <img
          src="image/1.swichi.avif"
          alt="Nintendo Switch"
          class="summary-img"
        >

        <p>
  ${texts.switchName}：${f.switch} ${texts.deviceUnit}
</p>
      </div>
    `;
  }

  /* AirPods */
  if (f.airpods > 0) {
    items += `
      <div class="advice-item">
        <img
          src="image/1.イヤホン.jpg"
          alt="AirPods Pro"
          class="summary-img"
        >

        <p>
  ${texts.airpodsName}：${f.airpods} ${texts.deviceUnit}
</p>
      </div>
    `;
  }

  /* ディズニー */
  if (f.disney > 0) {
    items += `
      <div class="advice-item">
        <img
          src="image/1.Disney.jpg"
          alt="ディズニー"
          class="summary-img"
        >

        <p>
  ${texts.disneyName}：${f.disney} ${texts.timesUnit}
</p>
      </div>
    `;
  }

  /* USJ */
  if (f.usj > 0) {
    items += `
      <div class="advice-item">
        <img
          src="image/1.usj.png"
          alt="USJ"
          class="summary-img"
        >

        <p>
  ${texts.usjName}：${f.usj} ${texts.timesUnit}
</p>
      </div>
    `;
  }

  /* 焼肉 */
  if (f.yakiniku > 0) {
    items += `
      <div class="advice-item">
        <img
          src="image/1.焼肉.jpg"
          alt="焼肉食べ放題"
          class="summary-img"
        >

        <p>
  ${texts.yakinikuName}：${f.yakiniku} ${texts.timesUnit}
</p>
      </div>
    `;
  }

  /* 国内旅行 */
  if (f.travel > 0) {
    items += `
      <div class="advice-item">
        <img
          src="image/1.旅行.jpg"
          alt="国内旅行"
          class="summary-img"
        >

       <p>
  ${texts.travelName}：${f.travel} ${texts.timesUnit}
</p>
      </div>
    `;
  }

futureElement.innerHTML = `
  <div class="future-box">
    <h2>
      ${texts.futureYearTitle}
    </h2>

    <h1>
      ${f.yearly.toLocaleString()} ${texts.currency}
    </h1>

    <p>
      ${texts.futureYearResult}
    </p>
  </div>

  <p class="section-title">
    ${texts.futureComparisonTitle}
  </p>

  <div class="items-grid">
    ${
      items ||
      `
        <div class="no-future-item">
          ${texts.noFutureItem}
        </div>
      `
    }
  </div>
`;
}

/* ========================================
   最初に実行
======================================== */

applyAdvicePageLanguage();
showDiagnosis();
showSummary();


/* ========================================
   戻るボタン
======================================== */

function goBackSmart() {
  const backTarget =
    localStorage.getItem(
      "back_to_target"
    ) || "index.html";

  localStorage.removeItem(
    "viewing_history_expenses"
  );

  localStorage.removeItem(
    "back_to_target"
  );

  window.location.href =
    backTarget;
}