/* ==========================================================================
   js/app.js
   ========================================================================== */

const currentUser =
  localStorage.getItem("currentUser") || "guest";

const currentLanguage =
  localStorage.getItem("appLanguage") || "ja";

const storageKey =
  `expenses_${currentUser}`;

let expenses = [];

async function loadExpenses() {
  expenses =
    JSON.parse(
      localStorage.getItem(storageKey)
    ) || [];
}


  //翻訳
  const indexTranslations = {
  ja: {
    pageTitle: "節約チェッカーモード",
    backToMode: "←モード選択画面に戻る",
    logout: "ログアウト",
    expenseInput: "支出を入力",
    amount: "金額",
    category: "カテゴリ",
    satisfaction: "満足度",
    necessaryCheck: "必需品だったらチェック",
    add: "追加",
    saveWeek: "今週分を保存",
    historySatisfaction: "満足度",
historyNecessary: "必需品",
historyDelete: "削除",
historyCurrency: "円",
  },

  en: {
    pageTitle: "Savings Checker Mode",
    backToMode: "← Back to mode selection",
    logout: "Log out",
    expenseInput: "Enter expense",
    amount: "Amount",
    category: "Category",
    satisfaction: "Satisfaction",
    necessaryCheck: "Check if it was necessary",
    add: "Add",
    saveWeek: "Save this week",
    historySatisfaction: "Satisfaction",
historyNecessary: "Necessary",
historyDelete: "Delete",
historyCurrency: "yen",
  },

  my: {
    pageTitle: "ချွေတာရေး စစ်ဆေးမှု မုဒ်",
    backToMode: "← မုဒ်ရွေးချယ်မှုသို့ ပြန်သွားရန်",
    logout: "ထွက်ရန်",
    expenseInput: "အသုံးစရိတ် ထည့်ရန်",
    amount: "ငွေပမာဏ",
    category: "အမျိုးအစား",
    satisfaction: "ကျေနပ်မှု",
    necessaryCheck: "လိုအပ်သောအသုံးစရိတ်ဖြစ်ပါက အမှန်ခြစ်ပါ",
    add: "ထည့်ရန်",
    saveWeek: "ဒီအပတ်ကို သိမ်းရန်",
    historySatisfaction: "ကျေနပ်မှု",
historyNecessary: "မရှိမဖြစ်လိုအပ်သောပစ္စည်း",
historyDelete: "ဖျက်ရန်",
historyCurrency: "ယန်း",
  },

  id: {
    pageTitle: "Mode Pemeriksa Penghematan",
    backToMode: "← Kembali ke pilihan mode",
    logout: "Keluar",
    expenseInput: "Masukkan pengeluaran",
    amount: "Jumlah",
    category: "Kategori",
    satisfaction: "Kepuasan",
    necessaryCheck: "Centang jika merupakan kebutuhan",
    add: "Tambah",
    saveWeek: "Simpan minggu ini",
    historySatisfaction: "Kepuasan",
historyNecessary: "Kebutuhan",
historyDelete: "Hapus",
historyCurrency: "yen",
  },

  "zh-CN": {
    pageTitle: "省钱检查模式",
    backToMode: "← 返回模式选择",
    logout: "退出登录",
    expenseInput: "输入支出",
    amount: "金额",
    category: "分类",
    satisfaction: "满意度",
    necessaryCheck: "如果是必需品请勾选",
    add: "添加",
    saveWeek: "保存本周",
    historySatisfaction: "满意度",
historyNecessary: "必需品",
historyDelete: "删除",
historyCurrency: "日元",
  },

  "zh-TW": {
    pageTitle: "省錢檢查模式",
    backToMode: "← 返回模式選擇",
    logout: "登出",
    expenseInput: "輸入支出",
    amount: "金額",
    category: "分類",
    satisfaction: "滿意度",
    necessaryCheck: "如果是必需品請勾選",
    add: "新增",
    saveWeek: "儲存本週",
    historySatisfaction: "滿意度",
historyNecessary: "必需品",
historyDelete: "刪除",
historyCurrency: "日圓",
  },

  ru: {
    pageTitle: "Режим контроля экономии",
    backToMode: "← Вернуться к выбору режима",
    logout: "Выйти",
    expenseInput: "Добавить расход",
    amount: "Сумма",
    category: "Категория",
    satisfaction: "Удовлетворённость",
    necessaryCheck: "Отметьте, если это было необходимо",
    add: "Добавить",
    saveWeek: "Сохранить неделю",
    historySatisfaction: "Удовлетворённость",
historyNecessary: "Необходимое",
historyDelete: "Удалить",
historyCurrency: "иен",
  },

  vi: {
    pageTitle: "Chế độ kiểm tra tiết kiệm",
    backToMode: "← Quay lại chọn chế độ",
    logout: "Đăng xuất",
    expenseInput: "Nhập chi tiêu",
    amount: "Số tiền",
    category: "Danh mục",
    satisfaction: "Mức độ hài lòng",
    necessaryCheck: "Đánh dấu nếu đây là nhu cầu thiết yếu",
    add: "Thêm",
    saveWeek: "Lưu tuần này",
    historySatisfaction: "Mức độ hài lòng",
historyNecessary: "Thiết yếu",
historyDelete: "Xóa",
historyCurrency: "yên",
  },

  ko: {
    pageTitle: "절약 체크 모드",
    backToMode: "← 모드 선택으로 돌아가기",
    logout: "로그아웃",
    expenseInput: "지출 입력",
    amount: "금액",
    category: "카테고리",
    satisfaction: "만족도",
    necessaryCheck: "필수품이면 체크",
    add: "추가",
    saveWeek: "이번 주 저장",
    historySatisfaction: "만족도",
historyNecessary: "필수품",
historyDelete: "삭제",
historyCurrency: "엔",
  },

  th: {
    pageTitle: "โหมดตรวจสอบการประหยัด",
    backToMode: "← กลับไปเลือกโหมด",
    logout: "ออกจากระบบ",
    expenseInput: "กรอกรายจ่าย",
    amount: "จำนวนเงิน",
    category: "หมวดหมู่",
    satisfaction: "ความพึงพอใจ",
    necessaryCheck: "เลือกหากเป็นของจำเป็น",
    add: "เพิ่ม",
    saveWeek: "บันทึกสัปดาห์นี้",
    historySatisfaction: "ความพึงพอใจ",
historyNecessary: "ของจำเป็น",
historyDelete: "ลบ",
historyCurrency: "เยน",
  },

  es: {
    pageTitle: "Modo de control de ahorro",
    backToMode: "← Volver a la selección de modo",
    logout: "Cerrar sesión",
    expenseInput: "Introducir gasto",
    amount: "Importe",
    category: "Categoría",
    satisfaction: "Satisfacción",
    necessaryCheck: "Marcar si era necesario",
    add: "Añadir",
    saveWeek: "Guardar esta semana",
    historySatisfaction: "Satisfacción",
historyNecessary: "Necesario",
historyDelete: "Eliminar",
historyCurrency: "yenes",
  },

  "pt-BR": {
    pageTitle: "Modo de controle de economia",
    backToMode: "← Voltar à seleção de modo",
    logout: "Sair",
    expenseInput: "Inserir despesa",
    amount: "Valor",
    category: "Categoria",
    satisfaction: "Satisfação",
    necessaryCheck: "Marque se era necessário",
    add: "Adicionar",
    saveWeek: "Salvar esta semana",
    historySatisfaction: "Satisfação",
historyNecessary: "Necessário",
historyDelete: "Excluir",
historyCurrency: "ienes",
  },
};

/* ========================================
   固定表示の追加翻訳
======================================== */

const indexExtraTranslations = {
  ja: {
    recentHistory: "最近の履歴",
    totalLabel: "合計：",
    yenUnit: "円",
    chart: "グラフ",
    history: "履歴",
    analysis: "分析",
    addLastWeek: "先週の入力漏れを追加",
    manageCategories: "カテゴリの追加・削除",
    popoTitle: "節約応援犬ぽぽちゃん",
    weeklyBudget: "今週の目標予算",
    condition: "コンディション",
    points: "ポイント",
    shop: "ショップ",
    meat: "お肉",
    strawHat: "麦わら帽子",
    ribbon: "リボン",
    glasses: "メガネ",
    studentHat: "学生帽",
    catEars: "猫耳",
    showMore: "もっと見る",
    removeHeadAccessory: "帽子・耳飾りを外す",
    removeGlasses: "メガネを外す",
    removeRibbon: "リボンを外す",
    lastWeekReport: "先週のレポート",
    loading: "読み込み中です...",
    doBestThisWeek: "今週も頑張る！",
    emptyHistoryTitle: "まだ履歴はありません",
emptyHistoryDescription:
  "支出を追加すると、ここに表示されます",
close: "閉じる",
amountPlaceholder: "例）1200",
categoryFood: "食費",
satisfactionRegret: "後悔",
satisfactionPoor: "いまいち",
satisfactionNormal: "普通",
satisfactionSatisfied: "満足",
satisfactionVerySatisfied: "大満足",
categoryFood: "食費",
categoryTransport: "交通費",
categoryDailyGoods: "日用品",
categoryEntertainment: "娯楽",
categoryStudy: "学習",
categoryImpulse: "衝動買い",
  },

  en: {
    recentHistory: "Recent history",
    totalLabel: "Total:",
    yenUnit: "yen",
    chart: "Chart",
    history: "History",
    analysis: "Analysis",
    addLastWeek: "Add a missed entry from last week",
    manageCategories: "Add or remove categories",
    popoTitle: "Popo, your savings support dog",
    weeklyBudget: "Weekly budget goal",
    condition: "Condition",
    points: "Points",
    shop: "Shop",
    meat: "Meat",
    strawHat: "Straw hat",
    ribbon: "Ribbon",
    glasses: "Glasses",
    studentHat: "Student cap",
    catEars: "Cat ears",
    showMore: "Show more",
    removeHeadAccessory: "Remove hat or ears",
    removeGlasses: "Remove glasses",
    removeRibbon: "Remove ribbon",
    lastWeekReport: "Last week's report",
    loading: "Loading...",
    doBestThisWeek: "Let's do our best this week!",
    emptyHistoryTitle: "No history yet",
emptyHistoryDescription:
  "Your expenses will appear here after you add them",
close: "Close",
amountPlaceholder: "e.g. 1200",
categoryFood: "Food",
satisfactionRegret: "Regret",
satisfactionPoor: "Not great",
satisfactionNormal: "Neutral",
satisfactionSatisfied: "Satisfied",
satisfactionVerySatisfied: "Very satisfied",
categoryFood: "Food",
categoryTransport: "Transportation",
categoryDailyGoods: "Daily necessities",
categoryEntertainment: "Entertainment",
categoryStudy: "Education",
categoryImpulse: "Impulse purchase",
  },

  my: {
    recentHistory: "လတ်တလောမှတ်တမ်း",
    totalLabel: "စုစုပေါင်း:",
    yenUnit: "ယန်း",
    chart: "ဂရပ်",
    history: "မှတ်တမ်း",
    analysis: "ခွဲခြမ်းစိတ်ဖြာမှု",
    addLastWeek: "ပြီးခဲ့သည့်အပတ်မှ မဖြည့်ရသေးသောအချက်ကို ထည့်ရန်",
    manageCategories: "အမျိုးအစား ထည့်ရန် သို့မဟုတ် ဖျက်ရန်",
    popoTitle: "ချွေတာရေးအားပေးခွေး ပိုပို",
    weeklyBudget: "ဒီအပတ် ရည်မှန်းဘတ်ဂျက်",
    condition: "အခြေအနေ",
    points: "ပွိုင့်",
    shop: "ဆိုင်",
    meat: "အသား",
    strawHat: "ကောက်ရိုးဦးထုပ်",
    ribbon: "ဖဲကြိုး",
    glasses: "မျက်မှန်",
    studentHat: "ကျောင်းသားဦးထုပ်",
    catEars: "ကြောင်နားရွက်",
    showMore: "ပိုမိုကြည့်ရန်",
    removeHeadAccessory: "ဦးထုပ် သို့မဟုတ် နားရွက်ကို ဖယ်ရန်",
    removeGlasses: "မျက်မှန်ကို ဖယ်ရန်",
    removeRibbon: "ဖဲကြိုးကို ဖယ်ရန်",
    lastWeekReport: "ပြီးခဲ့သည့်အပတ် အစီရင်ခံစာ",
    loading: "ဖတ်နေသည်...",
    doBestThisWeek: "ဒီအပတ်လည်း ကြိုးစားမယ်!",
    emptyHistoryTitle:
  "မှတ်တမ်းမရှိသေးပါ",
emptyHistoryDescription:
  "အသုံးစရိတ်ထည့်ပြီးနောက် ဤနေရာတွင် ပြသပါမည်",
close: "ပိတ်ရန်",
amountPlaceholder: "ဥပမာ 1200",
categoryFood: "အစားအသောက်",
satisfactionRegret: "နောင်တရ",
satisfactionPoor: "သိပ်မကောင်း",
satisfactionNormal: "ပုံမှန်",
satisfactionSatisfied: "ကျေနပ်",
satisfactionVerySatisfied: "အလွန်ကျေနပ်",
categoryFood: "အစားအသောက်",
categoryTransport: "သွားလာရေး",
categoryDailyGoods: "နေ့စဉ်သုံးပစ္စည်း",
categoryEntertainment: "ဖျော်ဖြေရေး",
categoryStudy: "ပညာသင်ကြားရေး",
categoryImpulse: "အလျင်စလိုဝယ်ယူမှု",
  },

  id: {
    recentHistory: "Riwayat terbaru",
    totalLabel: "Total:",
    yenUnit: "yen",
    chart: "Grafik",
    history: "Riwayat",
    analysis: "Analisis",
    addLastWeek: "Tambahkan catatan yang terlewat minggu lalu",
    manageCategories: "Tambah atau hapus kategori",
    popoTitle: "Popo, anjing pendukung penghematan",
    weeklyBudget: "Target anggaran minggu ini",
    condition: "Kondisi",
    points: "Poin",
    shop: "Toko",
    meat: "Daging",
    strawHat: "Topi jerami",
    ribbon: "Pita",
    glasses: "Kacamata",
    studentHat: "Topi pelajar",
    catEars: "Telinga kucing",
    showMore: "Lihat lainnya",
    removeHeadAccessory: "Lepas topi atau telinga",
    removeGlasses: "Lepas kacamata",
    removeRibbon: "Lepas pita",
    lastWeekReport: "Laporan minggu lalu",
    loading: "Memuat...",
    doBestThisWeek: "Mari lakukan yang terbaik minggu ini!",
    emptyHistoryTitle:
  "Belum ada riwayat",
emptyHistoryDescription:
  "Pengeluaran akan ditampilkan di sini setelah ditambahkan",
close: "Tutup",
amountPlaceholder: "contoh: 1200",
categoryFood: "Makanan",
satisfactionRegret: "Menyesal",
satisfactionPoor: "Kurang puas",
satisfactionNormal: "Biasa",
satisfactionSatisfied: "Puas",
satisfactionVerySatisfied: "Sangat puas",
categoryFood: "Makanan",
categoryTransport: "Transportasi",
categoryDailyGoods: "Kebutuhan sehari-hari",
categoryEntertainment: "Hiburan",
categoryStudy: "Pendidikan",
categoryImpulse: "Belanja impulsif",
  },

  "zh-CN": {
    recentHistory: "最近记录",
    totalLabel: "合计：",
    yenUnit: "日元",
    chart: "图表",
    history: "记录",
    analysis: "分析",
    addLastWeek: "补充上周遗漏的记录",
    manageCategories: "添加或删除分类",
    popoTitle: "省钱应援犬波波",
    weeklyBudget: "本周目标预算",
    condition: "状态",
    points: "积分",
    shop: "商店",
    meat: "肉",
    strawHat: "草帽",
    ribbon: "蝴蝶结",
    glasses: "眼镜",
    studentHat: "学生帽",
    catEars: "猫耳",
    showMore: "查看更多",
    removeHeadAccessory: "摘下帽子或耳饰",
    removeGlasses: "摘下眼镜",
    removeRibbon: "摘下蝴蝶结",
    lastWeekReport: "上周报告",
    loading: "加载中...",
    doBestThisWeek: "本周也要加油！",
    emptyHistoryTitle:
  "暂无记录",
emptyHistoryDescription:
  "添加支出后，将显示在这里",
close: "关闭",
amountPlaceholder: "例：1200",
categoryFood: "餐饮",
satisfactionRegret: "后悔",
satisfactionPoor: "不太满意",
satisfactionNormal: "一般",
satisfactionSatisfied: "满意",
satisfactionVerySatisfied: "非常满意",
categoryFood: "餐饮",
categoryTransport: "交通费",
categoryDailyGoods: "日用品",
categoryEntertainment: "娱乐",
categoryStudy: "学习",
categoryImpulse: "冲动消费",

  },

  "zh-TW": {
    recentHistory: "最近記錄",
    totalLabel: "合計：",
    yenUnit: "日圓",
    chart: "圖表",
    history: "記錄",
    analysis: "分析",
    addLastWeek: "補充上週遺漏的記錄",
    manageCategories: "新增或刪除分類",
    popoTitle: "省錢應援犬波波",
    weeklyBudget: "本週目標預算",
    condition: "狀態",
    points: "點數",
    shop: "商店",
    meat: "肉",
    strawHat: "草帽",
    ribbon: "蝴蝶結",
    glasses: "眼鏡",
    studentHat: "學生帽",
    catEars: "貓耳",
    showMore: "查看更多",
    removeHeadAccessory: "取下帽子或耳飾",
    removeGlasses: "取下眼鏡",
    removeRibbon: "取下蝴蝶結",
    lastWeekReport: "上週報告",
    loading: "載入中...",
    doBestThisWeek: "本週也要加油！",
    emptyHistoryTitle:
  "尚無記錄",
emptyHistoryDescription:
  "新增支出後，將顯示在這裡",
close: "關閉",
amountPlaceholder: "例：1200",
categoryFood: "餐飲",
satisfactionRegret: "後悔",
satisfactionPoor: "不太滿意",
satisfactionNormal: "普通",
satisfactionSatisfied: "滿意",
satisfactionVerySatisfied: "非常滿意",
categoryFood: "餐飲",
categoryTransport: "交通費",
categoryDailyGoods: "日用品",
categoryEntertainment: "娛樂",
categoryStudy: "學習",
categoryImpulse: "衝動消費",
  },

  ru: {
    recentHistory: "Последние записи",
    totalLabel: "Итого:",
    yenUnit: "иен",
    chart: "График",
    history: "История",
    analysis: "Анализ",
    addLastWeek: "Добавить пропущенную запись за прошлую неделю",
    manageCategories: "Добавить или удалить категории",
    popoTitle: "Попо — помощница в экономии",
    weeklyBudget: "Целевой бюджет на неделю",
    condition: "Состояние",
    points: "Баллы",
    shop: "Магазин",
    meat: "Мясо",
    strawHat: "Соломенная шляпа",
    ribbon: "Бант",
    glasses: "Очки",
    studentHat: "Студенческая фуражка",
    catEars: "Кошачьи ушки",
    showMore: "Показать ещё",
    removeHeadAccessory: "Снять головной аксессуар",
    removeGlasses: "Снять очки",
    removeRibbon: "Снять бант",
    lastWeekReport: "Отчёт за прошлую неделю",
    loading: "Загрузка...",
    doBestThisWeek: "Постараемся и на этой неделе!",
    emptyHistoryTitle:
  "Записей пока нет",
emptyHistoryDescription:
  "Добавленные расходы появятся здесь",
close: "Закрыть",
amountPlaceholder: "например, 1200",
categoryFood: "Питание",
satisfactionRegret: "Сожалею",
satisfactionPoor: "Не очень",
satisfactionNormal: "Нормально",
satisfactionSatisfied: "Доволен",
satisfactionVerySatisfied: "Очень доволен",
categoryFood: "Питание",
categoryTransport: "Транспорт",
categoryDailyGoods: "Товары первой необходимости",
categoryEntertainment: "Развлечения",
categoryStudy: "Обучение",
categoryImpulse: "Импульсивная покупка",
  },

  vi: {
    recentHistory: "Lịch sử gần đây",
    totalLabel: "Tổng:",
    yenUnit: "yên",
    chart: "Biểu đồ",
    history: "Lịch sử",
    analysis: "Phân tích",
    addLastWeek: "Thêm khoản bị bỏ sót của tuần trước",
    manageCategories: "Thêm hoặc xóa danh mục",
    popoTitle: "Popo, chú chó cổ vũ tiết kiệm",
    weeklyBudget: "Mục tiêu ngân sách tuần này",
    condition: "Tình trạng",
    points: "Điểm",
    shop: "Cửa hàng",
    meat: "Thịt",
    strawHat: "Mũ rơm",
    ribbon: "Nơ",
    glasses: "Kính",
    studentHat: "Mũ học sinh",
    catEars: "Tai mèo",
    showMore: "Xem thêm",
    removeHeadAccessory: "Tháo mũ hoặc tai",
    removeGlasses: "Tháo kính",
    removeRibbon: "Tháo nơ",
    lastWeekReport: "Báo cáo tuần trước",
    loading: "Đang tải...",
    doBestThisWeek: "Tuần này cũng cố gắng nhé!",
    emptyHistoryTitle:
  "Chưa có lịch sử",
emptyHistoryDescription:
  "Các khoản chi sẽ xuất hiện ở đây sau khi được thêm",
close: "Đóng",
amountPlaceholder: "ví dụ: 1200",
categoryFood: "Ăn uống",
satisfactionRegret: "Hối tiếc",
satisfactionPoor: "Không tốt lắm",
satisfactionNormal: "Bình thường",
satisfactionSatisfied: "Hài lòng",
satisfactionVerySatisfied: "Rất hài lòng",
categoryFood: "Ăn uống",
categoryTransport: "Đi lại",
categoryDailyGoods: "Đồ dùng hằng ngày",
categoryEntertainment: "Giải trí",
categoryStudy: "Học tập",
categoryImpulse: "Mua sắm bốc đồng",
  },

  ko: {
    recentHistory: "최근 기록",
    totalLabel: "합계:",
    yenUnit: "엔",
    chart: "그래프",
    history: "기록",
    analysis: "분석",
    addLastWeek: "지난주 누락 내역 추가",
    manageCategories: "카테고리 추가·삭제",
    popoTitle: "절약 응원견 포포",
    weeklyBudget: "이번 주 목표 예산",
    condition: "컨디션",
    points: "포인트",
    shop: "상점",
    meat: "고기",
    strawHat: "밀짚모자",
    ribbon: "리본",
    glasses: "안경",
    studentHat: "학생모",
    catEars: "고양이 귀",
    showMore: "더 보기",
    removeHeadAccessory: "모자·귀 장식 벗기",
    removeGlasses: "안경 벗기",
    removeRibbon: "리본 벗기",
    lastWeekReport: "지난주 보고서",
    loading: "불러오는 중...",
    doBestThisWeek: "이번 주도 힘내요!",
    emptyHistoryTitle:
  "아직 기록이 없습니다",
emptyHistoryDescription:
  "지출을 추가하면 여기에 표시됩니다",
close: "닫기",
amountPlaceholder: "예: 1200",
categoryFood: "식비",
satisfactionRegret: "후회",
satisfactionPoor: "아쉬움",
satisfactionNormal: "보통",
satisfactionSatisfied: "만족",
satisfactionVerySatisfied: "매우 만족",
categoryFood: "식비",
categoryTransport: "교통비",
categoryDailyGoods: "생활용품",
categoryEntertainment: "오락",
categoryStudy: "학습",
categoryImpulse: "충동구매",
  },

  th: {
    recentHistory: "ประวัติล่าสุด",
    totalLabel: "รวม:",
    yenUnit: "เยน",
    chart: "กราฟ",
    history: "ประวัติ",
    analysis: "วิเคราะห์",
    addLastWeek: "เพิ่มรายการที่ตกหล่นจากสัปดาห์ก่อน",
    manageCategories: "เพิ่มหรือลบหมวดหมู่",
    popoTitle: "โปโปะ สุนัขเชียร์การประหยัด",
    weeklyBudget: "เป้าหมายงบประมาณสัปดาห์นี้",
    condition: "สภาพ",
    points: "คะแนน",
    shop: "ร้านค้า",
    meat: "เนื้อ",
    strawHat: "หมวกฟาง",
    ribbon: "ริบบิ้น",
    glasses: "แว่นตา",
    studentHat: "หมวกนักเรียน",
    catEars: "หูแมว",
    showMore: "ดูเพิ่มเติม",
    removeHeadAccessory: "ถอดหมวกหรือหู",
    removeGlasses: "ถอดแว่น",
    removeRibbon: "ถอดริบบิ้น",
    lastWeekReport: "รายงานสัปดาห์ก่อน",
    loading: "กำลังโหลด...",
    doBestThisWeek: "สัปดาห์นี้ก็สู้กันนะ!",
    emptyHistoryTitle:
  "ยังไม่มีประวัติ",
emptyHistoryDescription:
  "เมื่อเพิ่มรายจ่ายแล้ว จะแสดงที่นี่",
close: "ปิด",
amountPlaceholder: "ตัวอย่าง 1200",
categoryFood: "ค่าอาหาร",
satisfactionRegret: "เสียดาย",
satisfactionPoor: "ไม่ค่อยดี",
satisfactionNormal: "ปกติ",
satisfactionSatisfied: "พอใจ",
satisfactionVerySatisfied: "พอใจมาก",
categoryFood: "ค่าอาหาร",
categoryTransport: "ค่าเดินทาง",
categoryDailyGoods: "ของใช้ประจำวัน",
categoryEntertainment: "ความบันเทิง",
categoryStudy: "การเรียน",
categoryImpulse: "ซื้อของตามอารมณ์",
  },

  es: {
    recentHistory: "Historial reciente",
    totalLabel: "Total:",
    yenUnit: "yenes",
    chart: "Gráfico",
    history: "Historial",
    analysis: "Análisis",
    addLastWeek: "Añadir una entrada omitida de la semana pasada",
    manageCategories: "Añadir o eliminar categorías",
    popoTitle: "Popo, la perrita que te ayuda a ahorrar",
    weeklyBudget: "Objetivo semanal de presupuesto",
    condition: "Estado",
    points: "Puntos",
    shop: "Tienda",
    meat: "Carne",
    strawHat: "Sombrero de paja",
    ribbon: "Lazo",
    glasses: "Gafas",
    studentHat: "Gorra de estudiante",
    catEars: "Orejas de gato",
    showMore: "Ver más",
    removeHeadAccessory: "Quitar sombrero u orejas",
    removeGlasses: "Quitar gafas",
    removeRibbon: "Quitar lazo",
    lastWeekReport: "Informe de la semana pasada",
    loading: "Cargando...",
    doBestThisWeek: "¡Hagámoslo bien esta semana!",
    emptyHistoryTitle:
  "Aún no hay historial",
emptyHistoryDescription:
  "Los gastos aparecerán aquí después de añadirlos",
close: "Cerrar",
amountPlaceholder: "ej.: 1200",
categoryFood: "Alimentación",
satisfactionRegret: "Me arrepiento",
satisfactionPoor: "Poco satisfecho",
satisfactionNormal: "Normal",
satisfactionSatisfied: "Satisfecho",
satisfactionVerySatisfied: "Muy satisfecho",
categoryFood: "Alimentación",
categoryTransport: "Transporte",
categoryDailyGoods: "Artículos diarios",
categoryEntertainment: "Entretenimiento",
categoryStudy: "Estudios",
categoryImpulse: "Compra impulsiva",
  },

  "pt-BR": {
    recentHistory: "Histórico recente",
    totalLabel: "Total:",
    yenUnit: "ienes",
    chart: "Gráfico",
    history: "Histórico",
    analysis: "Análise",
    addLastWeek: "Adicionar um registro esquecido da semana passada",
    manageCategories: "Adicionar ou remover categorias",
    popoTitle: "Popo, a cachorrinha que ajuda a economizar",
    weeklyBudget: "Meta de orçamento da semana",
    condition: "Condição",
    points: "Pontos",
    shop: "Loja",
    meat: "Carne",
    strawHat: "Chapéu de palha",
    ribbon: "Laço",
    glasses: "Óculos",
    studentHat: "Boné de estudante",
    catEars: "Orelhas de gato",
    showMore: "Ver mais",
    removeHeadAccessory: "Remover chapéu ou orelhas",
    removeGlasses: "Remover óculos",
    removeRibbon: "Remover laço",
    lastWeekReport: "Relatório da semana passada",
    loading: "Carregando...",
    doBestThisWeek: "Vamos fazer o nosso melhor esta semana!",
    emptyHistoryTitle:
  "Ainda não há histórico",
emptyHistoryDescription:
  "As despesas aparecerão aqui depois de adicionadas",
close: "Fechar",
amountPlaceholder: "ex.: 1200",
categoryFood: "Alimentação",
satisfactionRegret: "Arrependido",
satisfactionPoor: "Pouco satisfeito",
satisfactionNormal: "Normal",
satisfactionSatisfied: "Satisfeito",
satisfactionVerySatisfied: "Muito satisfeito",
categoryFood: "Alimentação",
categoryTransport: "Transporte",
categoryDailyGoods: "Itens do dia a dia",
categoryEntertainment: "Entretenimento",
categoryStudy: "Estudos",
categoryImpulse: "Compra por impulso",
  },
};

Object.keys(indexExtraTranslations).forEach(
  (language) => {
    Object.assign(
      indexTranslations[language],
      indexExtraTranslations[language]
    );
  }
);


    /* ========================================
   ぽぽのメッセージ翻訳
======================================== */

const petTranslations = {
  ja: {
    userSuffix: "さん",
    conditionWithin:
      "予算以内で元気いっぱい！",
    conditionOver:
      "予算オーバーでしょぼん…",

    welcomeMessage: (userName) => `
      ${userName}、会いに来てくれてありがとう^_^<br>
      今週は何円節約できるかワン？
    `,

    remainingMessage: (amount) => `
      いい感じだワン！<br>
      予算はあと
      ${amount}円だワン！
    `,

    overMessage: (amount) => `
      予算を
      ${amount}円
      オーバーしているワン…。<br>
      次の支出は少し考えてみよう！
    `,
  },

  en: {
    userSuffix: "",
    conditionWithin:
      "Happy and within budget!",
    conditionOver:
      "Feeling sad because the budget was exceeded…",

    welcomeMessage: (userName) => `
      ${userName}, thank you for coming to see me! ^_^<br>
      How much can we save this week? Woof!
    `,

    remainingMessage: (amount) => `
      Looking good! Woof!<br>
      You have ¥${amount} left in your budget!
    `,

    overMessage: (amount) => `
      You are ¥${amount} over budget…<br>
      Let's think carefully before the next purchase!
    `,
  },

  my: {
    userSuffix: "",
    conditionWithin:
      "ဘတ်ဂျက်အတွင်းရှိပြီး အားအင်ပြည့်နေပါတယ်။",
    conditionOver:
      "ဘတ်ဂျက်ကျော်သွားလို့ စိတ်မကောင်းဖြစ်နေပါတယ်။",

    welcomeMessage: (userName) => `
      ${userName}၊ လာတွေ့ပေးလို့ ကျေးဇူးတင်ပါတယ် ^_^<br>
      ဒီအပတ် ဘယ်လောက်ချွေတာနိုင်မလဲ ဝုတ်ဝုတ်။
    `,

    remainingMessage: (amount) => `
      အခြေအနေကောင်းပါတယ် ဝုတ်ဝုတ်။<br>
      ဘတ်ဂျက်မှာ ¥${amount} ကျန်ပါသေးတယ်။
    `,

    overMessage: (amount) => `
      ဘတ်ဂျက်ထက် ¥${amount} ကျော်နေပါတယ်။<br>
      နောက်တစ်ခါ မဝယ်ခင် စဉ်းစားကြည့်ရအောင်။
    `,
  },

  id: {
    userSuffix: "",
    conditionWithin:
      "Tetap semangat dan masih sesuai anggaran!",
    conditionOver:
      "Sedih karena anggaran terlampaui…",

    welcomeMessage: (userName) => `
      ${userName}, terima kasih sudah datang menemuiku! ^_^<br>
      Berapa banyak yang bisa kita hemat minggu ini? Guk!
    `,

    remainingMessage: (amount) => `
      Bagus sekali! Guk!<br>
      Anggaranmu masih tersisa ¥${amount}!
    `,

    overMessage: (amount) => `
      Anggaranmu terlampaui sebesar ¥${amount}…<br>
      Mari pikirkan lagi sebelum pengeluaran berikutnya!
    `,
  },

  "zh-CN": {
    userSuffix: "",
    conditionWithin:
      "预算以内，精神满满！",
    conditionOver:
      "超出预算，有点失落……",

    welcomeMessage: (userName) => `
      ${userName}，谢谢你来看我！^_^<br>
      这周能省下多少钱呢？汪！
    `,

    remainingMessage: (amount) => `
      做得很好！汪！<br>
      预算还剩 ¥${amount}！
    `,

    overMessage: (amount) => `
      已经超出预算 ¥${amount}……<br>
      下次消费前再稍微考虑一下吧！
    `,
  },

  "zh-TW": {
    userSuffix: "",
    conditionWithin:
      "預算以內，精神滿滿！",
    conditionOver:
      "超出預算，有點失落……",

    welcomeMessage: (userName) => `
      ${userName}，謝謝你來看我！^_^<br>
      這週能省下多少錢呢？汪！
    `,

    remainingMessage: (amount) => `
      做得很好！汪！<br>
      預算還剩 ¥${amount}！
    `,

    overMessage: (amount) => `
      已經超出預算 ¥${amount}……<br>
      下次消費前再稍微考慮一下吧！
    `,
  },

  ru: {
    userSuffix: "",
    conditionWithin:
      "Бюджет соблюдён, настроение отличное!",
    conditionOver:
      "Грустно из-за превышения бюджета…",

    welcomeMessage: (userName) => `
      ${userName}, спасибо, что пришли ко мне! ^_^<br>
      Сколько мы сможем сэкономить на этой неделе? Гав!
    `,

    remainingMessage: (amount) => `
      Всё идёт хорошо! Гав!<br>
      В бюджете осталось ¥${amount}!
    `,

    overMessage: (amount) => `
      Бюджет превышен на ¥${amount}…<br>
      Давайте подумаем перед следующей покупкой!
    `,
  },

  vi: {
    userSuffix: "",
    conditionWithin:
      "Vẫn tràn đầy năng lượng và trong ngân sách!",
    conditionOver:
      "Hơi buồn vì đã vượt ngân sách…",

    welcomeMessage: (userName) => `
      ${userName}, cảm ơn bạn đã đến gặp mình! ^_^<br>
      Tuần này chúng ta có thể tiết kiệm bao nhiêu nhỉ? Gâu!
    `,

    remainingMessage: (amount) => `
      Rất tốt! Gâu!<br>
      Ngân sách vẫn còn ¥${amount}!
    `,

    overMessage: (amount) => `
      Bạn đã vượt ngân sách ¥${amount}…<br>
      Hãy suy nghĩ thêm trước lần chi tiêu tiếp theo nhé!
    `,
  },

  ko: {
    userSuffix: "님",
    conditionWithin:
      "예산 안에서 기운이 넘쳐요!",
    conditionOver:
      "예산을 초과해서 시무룩해요…",

    welcomeMessage: (userName) => `
      ${userName}, 만나러 와 주셔서 감사해요! ^_^<br>
      이번 주에는 얼마를 절약할 수 있을까요? 멍!
    `,

    remainingMessage: (amount) => `
      잘하고 있어요! 멍!<br>
      예산이 ¥${amount} 남았어요!
    `,

    overMessage: (amount) => `
      예산을 ¥${amount} 초과했어요…<br>
      다음 지출은 조금 더 생각해 봐요!
    `,
  },

  th: {
    userSuffix: "",
    conditionWithin:
      "ยังสดใสและอยู่ในงบประมาณ!",
    conditionOver:
      "หงอยเพราะใช้เกินงบประมาณ…",

    welcomeMessage: (userName) => `
      ${userName} ขอบคุณที่มาหากันนะ ^_^<br>
      สัปดาห์นี้เราจะประหยัดได้เท่าไรกันนะ? โฮ่ง!
    `,

    remainingMessage: (amount) => `
      ทำได้ดีมาก โฮ่ง!<br>
      งบประมาณยังเหลือ ¥${amount}!
    `,

    overMessage: (amount) => `
      ใช้เกินงบประมาณ ¥${amount}…<br>
      ก่อนใช้จ่ายครั้งต่อไปลองคิดอีกนิดนะ!
    `,
  },

  es: {
    userSuffix: "",
    conditionWithin:
      "¡Con mucha energía y dentro del presupuesto!",
    conditionOver:
      "Triste porque se superó el presupuesto…",

    welcomeMessage: (userName) => `
      ${userName}, ¡gracias por venir a verme! ^_^<br>
      ¿Cuánto podremos ahorrar esta semana? ¡Guau!
    `,

    remainingMessage: (amount) => `
      ¡Vas muy bien! ¡Guau!<br>
      Todavía quedan ¥${amount} en el presupuesto.
    `,

    overMessage: (amount) => `
      Has superado el presupuesto en ¥${amount}…<br>
      Pensemos un poco antes del próximo gasto.
    `,
  },

  "pt-BR": {
    userSuffix: "",
    conditionWithin:
      "Animada e dentro do orçamento!",
    conditionOver:
      "Triste porque o orçamento foi ultrapassado…",

    welcomeMessage: (userName) => `
      ${userName}, obrigado por vir me ver! ^_^<br>
      Quanto conseguiremos economizar esta semana? Au-au!
    `,

    remainingMessage: (amount) => `
      Está indo muito bem! Au-au!<br>
      Ainda restam ¥${amount} no orçamento.
    `,

    overMessage: (amount) => `
      Você ultrapassou o orçamento em ¥${amount}…<br>
      Vamos pensar um pouco antes da próxima despesa!
    `,
  },
};

/* ========================================
   敬称付きユーザー名
======================================== */

function getDisplayUserName() {
  const texts =
    petTranslations[currentLanguage] ||
    petTranslations.ja;

  const suffix =
    texts.userSuffix || "";

  return suffix
    ? `${currentUser} ${suffix}`
    : currentUser;
}



function applyIndexLanguage() {
  const texts =
    indexTranslations[currentLanguage] ||
    indexTranslations.ja;

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
      "[data-i18n-placeholder]"
    )
    .forEach((element) => {
      const key =
        element.dataset.i18nPlaceholder;

      if (texts[key] !== undefined) {
        element.placeholder =
          texts[key];
      }
    });

  document.title =
    `${texts.pageTitle} | 節約チェッカー`;

  document.documentElement.lang =
    currentLanguage;

  displayCurrentUser();

  if (window.lucide) {
    lucide.createIcons();
  }
}


/* ========================================
   ショップ商品
======================================== */

const shopItems = {
  strawHat: {
    name: "麦わら帽子",
    price: 60,
    slot: "head",
    image: "image/straw-hat.png",
    className: "item-straw-hat",
  },

  studentHat: {
    name: "学生帽",
    price: 70,
    slot: "head",
    image: "image/student-hat.png",
    className: "item-student-hat",
  },

  catEars: {
    name: "猫耳",
    price: 80,
    slot: "head",
    image: "image/cat-ears.png",
    className: "item-cat-ears",
  },

  glasses: {
    name: "メガネ",
    price: 50,
    slot: "eyes",
    image: "image/glasses.png",
    className: "item-glasses",
  },

  ribbon: {
    name: "リボン",
    price: 40,
    slot: "neck",
    image: "image/ribbon.png",
    className: "item-ribbon",
  },

  meat: {
    name: "お肉",
    price: 20,
    slot: "food",
    image: "image/meat.png",
  },
};

/* ========================================
   週
======================================== */

function getWeekIdentifier(date) {
  const target = new Date(date);

  target.setHours(0, 0, 0, 0);

  const day =
    target.getDay() || 7;

  const monday =
    new Date(target);

  monday.setDate(
    target.getDate() - day + 1
  );

  const sunday =
    new Date(monday);

  sunday.setDate(
    monday.getDate() + 6
  );

  return `${monday.getFullYear()}年${monday.getMonth() + 1}月${monday.getDate()}日〜${sunday.getMonth() + 1}月${sunday.getDate()}日`;
}

function checkWeeklyReset() {
  const lastResetKey =
    `last_reset_time_${currentUser}`;

  const lastResetTime =
    localStorage.getItem(lastResetKey);

  const now =
    new Date();

  const currentWeekLabel =
    getWeekIdentifier(now);

  if (lastResetTime) {
    const lastDate =
      new Date(Number(lastResetTime));

    const differenceDays =
      (now - lastDate) /
      (1000 * 60 * 60 * 24);

    const lastDay =
      lastDate.getDay() || 7;

    const currentDay =
      now.getDay() || 7;

    if (
      differenceDays >= 7 ||
      (
        differenceDays >= 1 &&
        currentDay < lastDay
      )
    ) {
      const previousWeekLabel =
        localStorage.getItem(
          `last_active_week_${currentUser}`
        ) || currentWeekLabel;

      autoArchiveWeek(
        previousWeekLabel,
        true
      );
    }
  }

  localStorage.setItem(
    lastResetKey,
    now.getTime().toString()
  );

  localStorage.setItem(
    `last_active_week_${currentUser}`,
    currentWeekLabel
  );
}

function autoArchiveWeek(
  weekLabel,
  isAutomated = false
) {
  const totalAmount =
    expenses.reduce(
      (sum, expense) =>
        sum + Number(expense.amount || 0),
      0
    );

  const weeklyLimit =
    Number(
      localStorage.getItem(
        `limit_${currentUser}`
      )
    ) || 20000;

  if (isAutomated) {
    const percent =
      totalAmount === 0
        ? 100
        : Math.round(
            (
              (weeklyLimit - totalAmount) /
              weeklyLimit
            ) * 100
          );

    localStorage.setItem(
      `pending_report_${currentUser}`,
      JSON.stringify({
        week: weekLabel,
        total: totalAmount,
        limit: weeklyLimit,
        percent,
      })
    );

    if (totalAmount <= weeklyLimit) {
      const pointKey =
        `points_${currentUser}`;

      const currentPoints =
        Number(
          localStorage.getItem(pointKey)
        ) || 0;

      localStorage.setItem(
        pointKey,
        currentPoints + 100
      );
    }
  }

  const historyKey =
    `history_${currentUser}`;

  const fullHistory =
    JSON.parse(
      localStorage.getItem(historyKey)
    ) || [];

  const existingIndex =
    fullHistory.findIndex(
      (item) =>
        item.date === weekLabel
    );

  if (existingIndex !== -1) {
    fullHistory[existingIndex].total +=
      totalAmount;

    fullHistory[existingIndex].details =
      fullHistory[existingIndex].details.concat(
        expenses
      );
  } else {
    fullHistory.unshift({
      date: weekLabel,
      total: totalAmount,
      details: expenses,
    });
  }

  localStorage.setItem(
    historyKey,
    JSON.stringify(fullHistory)
  );

  expenses = [];

  localStorage.setItem(
    storageKey,
    JSON.stringify(expenses)
  );
}

/* ========================================
   ユーザー
======================================== */

function displayCurrentUser() {
  const element =
    document.getElementById(
      "user-display"
    );

  if (!element) {
    return;
  }

  element.textContent =
    getDisplayUserName();
}

/* ========================================
   カテゴリアイコン
======================================== */

function getCategoryIcon(category) {
  const iconMap = {
    食費: "utensils",
    交通費: "train-front",
    日用品: "shopping-basket",
    娯楽: "gamepad-2",
    学習: "book-open",
    衝動買い: "shopping-bag",
  };

  return iconMap[category] ||
    "receipt-text";
}

function getTranslatedCategoryName(category) {
  const texts =
    indexTranslations[currentLanguage] ||
    indexTranslations.ja;

  const categoryKeyMap = {
    食費: "categoryFood",
    交通費: "categoryTransport",
    日用品: "categoryDailyGoods",
    娯楽: "categoryEntertainment",
    学習: "categoryStudy",
    衝動買い: "categoryImpulse",
  };

  const key =
    categoryKeyMap[category];

  return key && texts[key]
    ? texts[key]
    : category;
}

/* ========================================
   支出追加
======================================== */

function addExpense() {
  const amount =
    Number(
      document.getElementById(
        "amount"
      )?.value
    );

  const category =
    document.getElementById(
      "category"
    )?.value || "食費";

  const selectedSatisfaction =
    document.querySelector(
      'input[name="satisfaction"]:checked'
    );

  const sat =
    Number(
      selectedSatisfaction?.value
    ) || 3;

  const isNecessary =
    document.getElementById(
      "is-necessary"
    )?.checked || false;

  if (!amount || amount <= 0) {
    alert("金額を入力してください。");
    return;
  }

const expense = {
  category: category,
  amount: amount,
  sat: sat,
  isNecessary: isNecessary,
  memo: "",
};

expenses.push(expense);

localStorage.setItem(
  storageKey,
  JSON.stringify(expenses)
);


  /* 支出を1件追加するごとに10ポイント */
  const pointKey =
    `points_${currentUser}`;

  const currentPoints =
    Number(
      localStorage.getItem(pointKey)
    ) || 0;

  localStorage.setItem(
    pointKey,
    currentPoints + 10
  );

  const amountInput =
    document.getElementById(
      "amount"
    );

  if (amountInput) {
    amountInput.value = "";
  }

  const defaultSatisfaction =
    document.querySelector(
      'input[name="satisfaction"][value="3"]'
    );

  if (defaultSatisfaction) {
    defaultSatisfaction.checked = true;
  }

  const necessaryCheckbox =
    document.getElementById(
      "is-necessary"
    );

  if (necessaryCheckbox) {
    necessaryCheckbox.checked = false;
  }

  updateTotal();
  renderLog();
}

/* ========================================
   履歴表示
======================================== */
function renderLog() {
  const logContainer =
    document.getElementById("log");

  if (!logContainer) {
    return;
  }

  const texts =
    indexTranslations[currentLanguage] ||
    indexTranslations.ja;

  logContainer.innerHTML = "";

  if (expenses.length === 0) {
    logContainer.innerHTML = `
      <div class="empty-history">
        <i data-lucide="receipt-text"></i>

        <p>
          ${texts.emptyHistoryTitle}
        </p>

        <span>
          ${texts.emptyHistoryDescription}
        </span>
      </div>
    `;

    if (window.lucide) {
      lucide.createIcons();
    }

    return;
  }

  for (
    let index = expenses.length - 1;
    index >= 0;
    index--
  ) {
    const expense =
      expenses[index];

    const item =
      document.createElement("div");

    item.className =
      "log-item";

    const necessaryTag =
      expense.isNecessary
        ? `
          <span class="tag-necessary">
            ${texts.historyNecessary}
          </span>
        `
        : "";

    item.innerHTML = `
      <div class="log-main">
        <span class="log-category-icon">
          <i
            data-lucide="${getCategoryIcon(expense.category)}"
          ></i>
        </span>

        <span class="log-category-name">
          ${getTranslatedCategoryName(expense.category)}
        </span>

        <span class="log-satisfaction">
          ${texts.historySatisfaction}
          ${expense.sat}
        </span>

        <span class="log-amount">
          -${Number(expense.amount).toLocaleString()}
          ${texts.historyCurrency}
        </span>

        ${necessaryTag}
      </div>

      <button
        type="button"
        class="btn-delete-inline"
        onclick="deleteExpenseIndex(${index})"
      >
        <i data-lucide="trash-2"></i>

        ${texts.historyDelete}
      </button>
    `;

    logContainer.appendChild(item);
  }

  if (window.lucide) {
    lucide.createIcons();
  }
}

/* ========================================
   履歴削除
======================================== */

function deleteExpenseIndex(index) {
  expenses.splice(index, 1);

  localStorage.setItem(
    storageKey,
    JSON.stringify(expenses)
  );

  updateTotal();
  renderLog();
}

/* ========================================
   合計更新
======================================== */

function updateTotal() {
  const total =
    expenses.reduce(
      (sum, expense) =>
        sum +
        Number(expense.amount || 0),
      0
    );

  const totalElement =
    document.getElementById(
      "total"
    );

  if (totalElement) {
    totalElement.textContent =
      total.toLocaleString();
  }

  updatePetStatus(total);
  updatePointDisplay();
}

/* ========================================
   今週分を保存
======================================== */

function saveCurrentWeek() {
  if (expenses.length === 0) {
    alert(
      "保存するデータがありません！"
    );

    return;
  }

  const shouldSave =
    confirm(
      "今週のデータを確定して履歴に保存しますか？"
    );

  if (!shouldSave) return;

  autoArchiveWeek(
    getWeekIdentifier(
      new Date()
    ),
    false
  );

  updateTotal();
  renderLog();

  alert(
    "データを履歴に保存しました！"
  );
}

/* ========================================
   予算
======================================== */

function saveWeeklyLimit() {
  const input =
    document.getElementById(
      "weekly-limit-input"
    );

  const weeklyLimit =
    Number(input?.value) ||
    20000;

  localStorage.setItem(
    `limit_${currentUser}`,
    weeklyLimit
  );

  updateTotal();
}

function loadWeeklyLimit() {
  const input =
    document.getElementById(
      "weekly-limit-input"
    );

  if (!input) return;

  const weeklyLimit =
    Number(
      localStorage.getItem(
        `limit_${currentUser}`
      )
    ) || 20000;

  input.value =
    weeklyLimit;
}

/* ========================================
   ポポの表情・メッセージ
======================================== */

function updatePetStatus(
  totalAmount
) {
  const petImage =
    document.getElementById(
      "pet-image"
    );

  const petCondition =
    document.getElementById(
      "pet-condition"
    );

  const petMessage =
    document.getElementById(
      "pet-message"
    );

  if (
    !petImage ||
    !petCondition ||
    !petMessage
  ) {
    return;
  }

  const texts =
    petTranslations[currentLanguage] ||
    petTranslations.ja;

  const weeklyLimit =
    Number(
      localStorage.getItem(
        `limit_${currentUser}`
      )
    ) || 20000;

  const displayUserName =
    getDisplayUserName();

  if (totalAmount <= weeklyLimit) {
    const remaining =
      weeklyLimit - totalAmount;

    const formattedRemaining =
      remaining.toLocaleString();

    petImage.src =
      "image/popo-happy.jpg";

    petCondition.textContent =
      texts.conditionWithin;

    if (totalAmount === 0) {
      petMessage.innerHTML =
        texts.welcomeMessage(
          displayUserName
        );
    } else {
      petMessage.innerHTML =
        texts.remainingMessage(
          formattedRemaining
        );
    }
  } else {
    const overAmount =
      totalAmount - weeklyLimit;

    const formattedOverAmount =
      overAmount.toLocaleString();

    petImage.src =
      "image/popo-sad.jpg";

    petCondition.textContent =
      texts.conditionOver;

    petMessage.innerHTML =
      texts.overMessage(
        formattedOverAmount
      );
  }

  updateAccessories();
}



/* ========================================
   ポイント表示
======================================== */

function updatePointDisplay() {
  const pointValue =
    document.getElementById(
      "point-value"
    );

  if (!pointValue) return;

  const currentPoints =
    Number(
      localStorage.getItem(
        `points_${currentUser}`
      )
    ) || 0;

  pointValue.textContent =
    currentPoints.toLocaleString();
}

/* ========================================
   商品購入
======================================== */

function buyShopItem(itemKey) {
  const item =
    shopItems[itemKey];

  if (!item) return;

  if (item.slot === "food") {
    feedPet(item);
    return;
  }

  const pointKey =
    `points_${currentUser}`;

  const ownedKey =
    `owned_${itemKey}_${currentUser}`;

  let currentPoints =
    Number(
      localStorage.getItem(pointKey)
    ) || 0;

  const isOwned =
    localStorage.getItem(
      ownedKey
    ) === "true";

  if (!isOwned) {
    if (
      currentPoints <
      item.price
    ) {
      alert(
        `${item.name}を買うにはポイントが足りません！`
      );

      return;
    }

    currentPoints -=
      item.price;

    localStorage.setItem(
      pointKey,
      currentPoints
    );

    localStorage.setItem(
      ownedKey,
      "true"
    );
  }

  localStorage.setItem(
    `active_${item.slot}_${currentUser}`,
    itemKey
  );

  updatePointDisplay();
  updateAccessories();

  alert(
    `${item.name}を装着したワン！`
  );
}

/* ========================================
   アクセサリー表示
======================================== */

function updateAccessories() {
  const headAccessory =
    document.getElementById(
      "head-accessory"
    );

  const eyeAccessory =
    document.getElementById(
      "eye-accessory"
    );

  const neckAccessory =
    document.getElementById(
      "neck-accessory"
    );

  setAccessoryImage(
    headAccessory,
    localStorage.getItem(
      `active_head_${currentUser}`
    )
  );

  setAccessoryImage(
    eyeAccessory,
    localStorage.getItem(
      `active_eyes_${currentUser}`
    )
  );

  setAccessoryImage(
    neckAccessory,
    localStorage.getItem(
      `active_neck_${currentUser}`
    )
  );
}

function setAccessoryImage(
  imageElement,
  itemKey
) {
  if (!imageElement) return;

  const item =
    shopItems[itemKey];

  imageElement.className =
    "pet-accessory";

  if (!item) {
    imageElement.removeAttribute(
      "src"
    );

    imageElement.style.display =
      "none";

    return;
  }

  imageElement.src =
    item.image;

  if (item.className) {
    imageElement.classList.add(
      item.className
    );
  }

  imageElement.style.display =
    "block";
}

/* ========================================
   アクセサリーを外す
======================================== */

function removeAccessory(slot) {
  localStorage.removeItem(
    `active_${slot}_${currentUser}`
  );

  updateAccessories();
}

/* ========================================
   肉を食べる動画
======================================== */

function feedPet(item) {
  const pointKey =
    `points_${currentUser}`;

  let currentPoints =
    Number(
      localStorage.getItem(pointKey)
    ) || 0;

  if (
  currentPoints <
  item.price
) {
  alert(
    "お肉を買うポイントが足りないワン！"
  );

  return;
}

currentPoints -= item.price;

localStorage.setItem(
  pointKey,
  currentPoints
);

updatePointDisplay();

const petImage =
  document.getElementById(
    "pet-image"
  );

const video =
  document.getElementById(
    "pet-eating-video"
  );

const petMessage =
  document.getElementById(
    "pet-message"
  );

if (!video || !petImage) {
  return;
}

/* 動画再生中は通常画像を非表示 */
petImage.hidden = true;
video.hidden = false;
const accessories =
  document.querySelectorAll(
    ".pet-accessory"
  );

accessories.forEach(
  (accessory) => {
    accessory.style.display = "none";
  }
);

if (petMessage) {
  petMessage.innerHTML =
    "お肉おいしいワン！<br>ごほうびありがとう！";
}

video.currentTime = 0;
video.loop = true;

video.play().catch((error) => {
  console.error(
    "動画を再生できませんでした",
    error
  );

  /* 再生失敗時は画像へ戻す */
  video.hidden = true;
  petImage.hidden = false;
  updateAccessories();
  video.loop = false;
});

/* 10秒後に動画を止めて通常画像へ戻す */
setTimeout(() => {
  video.pause();
  video.currentTime = 0;
  video.loop = false;

  video.hidden = true;
  petImage.hidden = false;

  updateAccessories();
  updateTotal();
}, 10000);
}
/* ========================================
   もっと見る
======================================== */
function toggleMoreShop() {
  const moreItems =
    document.getElementById(
      "more-shop-items"
    );

  const text =
    document.getElementById(
      "shop-more-text"
    );

  const icon =
    document.getElementById(
      "shop-more-icon"
    );

  if (
    !moreItems ||
    !text ||
    !icon
  ) {
    return;
  }

  const texts =
    indexTranslations[currentLanguage] ||
    indexTranslations.ja;

  const isOpen =
    moreItems.classList.toggle(
      "open"
    );

  if (isOpen) {
    text.textContent =
      texts.close;

    icon.setAttribute(
      "data-lucide",
      "chevron-up"
    );
  } else {
    text.textContent =
      texts.showMore;

    icon.setAttribute(
      "data-lucide",
      "chevron-down"
    );
  }

  if (window.lucide) {
    lucide.createIcons();
  }
}


/* ========================================
   画面移動
======================================== */

function goToChart() {
  localStorage.setItem(
    storageKey,
    JSON.stringify(expenses)
  );

  location.href =
    "chart.html";
}

function goToAdvice() {
  localStorage.setItem(
    storageKey,
    JSON.stringify(expenses)
  );

  location.href = "advice.html";
}
/* ========================================
   ログアウト
======================================== */

function handleLogout() {
  const shouldLogout =
    confirm(
      "ログアウトしますか？"
    );

  if (!shouldLogout) return;

  sessionStorage.removeItem(
    `popup_shown_${currentUser}`
  );

  localStorage.removeItem(
    "currentUser"
  );

  location.href =
    "login.html";
}

/* ========================================
   今週の月曜日を取得
======================================== */

function getCurrentWeekKey() {
  const today = new Date();

  today.setHours(0, 0, 0, 0);

  // 日曜日を7として扱う
  const day =
    today.getDay() || 7;

  // 今週の月曜日
  const monday =
    new Date(today);

  monday.setDate(
    today.getDate() - day + 1
  );

  const year =
    monday.getFullYear();

  const month =
    String(
      monday.getMonth() + 1
    ).padStart(2, "0");

  const date =
    String(
      monday.getDate()
    ).padStart(2, "0");

  return `${year}-${month}-${date}`;
}
/* ========================================
   先週レポート
======================================== */

/* 使用率に応じた表示パターンを返す */
function getReportPattern(total, limit) {
  const usageRate =
    limit > 0
      ? (total / limit) * 100
      : 0;

  const roundedRate =
    Math.round(usageRate);

  const overRate =
    Math.max(
      Math.round(usageRate - 100),
      0
    );

  /* 支出なし */
  if (total === 0) {
    return {
      icon: "👑",
      title: "完璧です！",
      message: `
        先週の支出はありませんでした！<br>
        この調子で無理なく続けていきましょう。
      `,
    };
  }

  /* 1％～29％ */
  if (usageRate < 30) {
    return {
      icon: "🏆",
      title: "素晴らしい成果です！",
      message: `
        目標予算の
        <strong>${roundedRate}％</strong>
        に抑えることができました。<br><br>
        とても上手に予算を管理できています！
      `,
    };
  }

  /* 30％～59％ */
  if (usageRate < 60) {
    return {
      icon: "✨",
      title: "とても順調です！",
      message: `
        目標予算の
        <strong>${roundedRate}％</strong>
        を使いました。<br><br>
        まだ予算に余裕があります。
        このペースを続けましょう！
      `,
    };
  }

  /* 60％～79％ */
  if (usageRate < 80) {
    return {
      icon: "😊",
      title: "いいペースです！",
      message: `
        目標予算の
        <strong>${roundedRate}％</strong>
        を使いました。<br><br>
        予算内にしっかり収まっています。
        バランスよく管理できました！
      `,
    };
  }

  /* 80％～99％ */
  if (usageRate < 100) {
    return {
      icon: "👍",
      title: "予算内に収まりました！",
      message: `
        目標予算の
        <strong>${roundedRate}％</strong>
        を使いました。<br><br>
        予算に近づいていますが、
        きちんと目標を達成できています！
      `,
    };
  }

  /* 100％ちょうど */
  if (usageRate === 100) {
    return {
      icon: "🎯",
      title: "予算ぴったりです！",
      message: `
        目標予算をちょうど使い切りました。<br><br>
        計画どおりに予算を管理できています！
      `,
    };
  }

  /* 101％～199％ */
  if (usageRate < 200) {
    return {
      icon: "🌱",
      title: "少しだけ予算オーバーです",
      message: `
        目標予算を
        <strong>${overRate}％</strong>
        オーバーしました。<br><br>
        少し支出を見直せば、
        次週は予算内を目指せそうです！
      `,
    };
  }

  /* 200％～299％ */
  if (usageRate < 300) {
    return {
      icon: "⚠️",
      title: "支出を見直してみましょう",
      message: `
        目標予算を
        <strong>${overRate}％</strong>
        オーバーしました。<br><br>
        大きな買い物や、
        予定外の支出がなかったか確認してみましょう。
      `,
    };
  }

  /* 300％～399％ */
  if (usageRate < 400) {
    return {
      icon: "⚠️",
      title: "使いすぎに注意です！",
      message: `
        目標予算を
        <strong>${overRate}％</strong>
        オーバーしました。<br><br>
        支出履歴を確認して、
        減らせそうな項目を探してみましょう。
      `,
    };
  }

  /* 400％～499％ */
  if (usageRate < 500) {
    return {
      icon: "⚠️",
      title: "予算を大きく超えました",
      message: `
        目標予算を
        <strong>${overRate}％</strong>
        オーバーしました。<br><br>
        今週は買う前に一度考えることを
        意識してみましょう。
      `,
    };
  }

  /* 500％～599％ */
  if (usageRate < 600) {
    return {
      icon: "⚠️",
      title: "次週がんばりましょう！",
      message: `
        目標予算を
        <strong>${overRate}％</strong>
        オーバーしました。<br><br>
        まずは一つだけ、
        減らせそうな支出を決めてみましょう。
      `,
    };
  }

  /* 600％～699％ */
  if (usageRate < 700) {
    return {
      icon: "⚠️",
      title: "かなり使いすぎています！",
      message: `
        目標予算を
        <strong>${overRate}％</strong>
        オーバーしました。<br><br>
        支出内容を確認して、
        必要な買い物だったか振り返ってみましょう。
      `,
    };
  }

  /* 700％以上 */
  return {
    icon: "⚠️",
    title: "大幅な予算オーバーです！",
    message: `
      目標予算を
      <strong>${overRate}％</strong>
      オーバーしました。<br><br>
      今週は少しだけ意識して、
      無駄遣いを一緒に減らしていきましょう！
    `,
  };
}


function checkPendingReportModal() {
const currentWeekKey =
  getCurrentWeekKey();

const shownWeek =
  localStorage.getItem(
    `report_popup_week_${currentUser}`
  );

if (
  shownWeek === currentWeekKey
) {
  return;
}

  const report =
    JSON.parse(
      localStorage.getItem(
        `pending_report_${currentUser}`
      )
    );

  if (!report) return;

  const modal =
    document.getElementById(
      "welcome-modal"
    );

  const modalIcon =
    document.getElementById(
      "modal-icon"
    );

  const modalTitle =
    document.getElementById(
      "modal-title"
    );

  const modalMessage =
    document.getElementById(
      "modal-message"
    );

  if (
    !modal ||
    !modalIcon ||
    !modalTitle ||
    !modalMessage
  ) {
    return;
  }

  const total =
    Number(report.total) || 0;

  const limit =
    Number(report.limit) || 0;

  const pattern =
    getReportPattern(
      total,
      limit
    );

  modalIcon.textContent =
    pattern.icon;

  modalTitle.textContent =
    pattern.title;

  modalMessage.innerHTML = `
    <strong>
      ${report.week}<br>の予算管理が完了しました。
    </strong>

    <br><br>

    ${pattern.message}

    <br><br>

    支出総額：
    <strong>
      ${total.toLocaleString()}円
    </strong>

    <br>

    目標予算：
    <strong>
      ${limit.toLocaleString()}円
    </strong>
    <br><br>
  `;
  

  modal.style.display =
    "flex";

  localStorage.setItem(
  `report_popup_week_${currentUser}`,
  currentWeekKey
);
}


function closeWelcomeModal() {
  const modal =
    document.getElementById(
      "welcome-modal"
    );

  if (modal) {
    modal.style.display =
      "none";
  }
}
/* ========================================
   Enterキーで追加
======================================== */

const amountInput =
  document.getElementById(
    "amount"
  );

if (amountInput) {
  amountInput.addEventListener(
    "keydown",
    function (event) {
      if (
        event.key === "Enter"
      ) {
        event.preventDefault();
        addExpense();
      }
    }
  );
}

/* ========================================
   起動
======================================== */

applyIndexLanguage();
loadWeeklyLimit();

(async () => {
  await loadExpenses();

  checkWeeklyReset();
  updatePointDisplay();
  updateAccessories();
  updateTotal();
  renderLog();

  checkPendingReportModal();

  if (window.lucide) {
    lucide.createIcons();
  }
})();