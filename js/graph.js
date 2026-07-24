"use strict";

/* ==============================
   ログイン中のユーザー
============================== */

const currentUser =
  localStorage.getItem("currentUser") || "guest";

const storageKey = `kakeibo_${currentUser}`;

const currentLanguage =
  localStorage.getItem("appLanguage") || "ja";


  //翻訳
  const graphTranslations = {
  ja: {
    pageTitle: "節約チェッカー | グラフ",
    userSuffix: "さん",
    backToMode: "←モード選択画面に戻る",
    logout: "ログアウト",
    appTitle: "節約チェッカー",
    householdMode: "家計簿モード",
    input: "入力",
    calendar: "カレンダー",
    graph: "グラフ",
    income: "収入",
    expense: "支出",
    monthlyBalance: "今月の収支",
    expenseChart: "支出グラフ",
    incomeChart: "収入グラフ",
    noData: "データなし",
    logoutConfirm: "ログアウトしますか？",
    currency: "円",
    monthFormat: (year, month) =>
      `${year}年${month}月`,
  },

  en: {
    pageTitle: "Savings Checker | Graph",
    userSuffix: "",
    backToMode: "← Back to mode selection",
    logout: "Log out",
    appTitle: "Savings Checker",
    householdMode: "Household Budget Mode",
    input: "Input",
    calendar: "Calendar",
    graph: "Graph",
    income: "Income",
    expense: "Expenses",
    monthlyBalance: "Monthly balance",
    expenseChart: "Expense chart",
    incomeChart: "Income chart",
    noData: "No data",
    logoutConfirm: "Do you want to log out?",
    currency: "yen",
    monthFormat: (year, month) =>
      `${month}/${year}`,
  },

  my: {
    pageTitle: "ချွေတာရေးစစ်ဆေးမှု | ဂရပ်",
    userSuffix: "",
    backToMode: "← မုဒ်ရွေးချယ်မှုသို့ ပြန်သွားရန်",
    logout: "ထွက်ရန်",
    appTitle: "ချွေတာရေး စစ်ဆေးမှု",
    householdMode: "အိမ်သုံးစာရင်း မုဒ်",
    input: "ထည့်သွင်းရန်",
    calendar: "ပြက္ခဒိန်",
    graph: "ဂရပ်",
    income: "ဝင်ငွေ",
    expense: "အသုံးစရိတ်",
    monthlyBalance: "လစဉ်လက်ကျန်",
    expenseChart: "အသုံးစရိတ်ဂရပ်",
    incomeChart: "ဝင်ငွေဂရပ်",
    noData: "ဒေတာမရှိပါ",
    logoutConfirm: "ထွက်လိုပါသလား။",
    currency: "ယန်း",
    monthFormat: (year, month) =>
      `${year} ခုနှစ် ${month} လ`,
  },

  id: {
    pageTitle: "Pemeriksa Penghematan | Grafik",
    userSuffix: "",
    backToMode: "← Kembali ke pilihan mode",
    logout: "Keluar",
    appTitle: "Pemeriksa Penghematan",
    householdMode: "Mode Buku Keuangan",
    input: "Input",
    calendar: "Kalender",
    graph: "Grafik",
    income: "Pemasukan",
    expense: "Pengeluaran",
    monthlyBalance: "Saldo bulan ini",
    expenseChart: "Grafik pengeluaran",
    incomeChart: "Grafik pemasukan",
    noData: "Tidak ada data",
    logoutConfirm: "Apakah Anda ingin keluar?",
    currency: "yen",
    monthFormat: (year, month) =>
      `${month}/${year}`,
  },

  "zh-CN": {
    pageTitle: "省钱检查 | 图表",
    userSuffix: "",
    backToMode: "← 返回模式选择",
    logout: "退出登录",
    appTitle: "省钱检查",
    householdMode: "家庭记账模式",
    input: "输入",
    calendar: "日历",
    graph: "图表",
    income: "收入",
    expense: "支出",
    monthlyBalance: "本月收支",
    expenseChart: "支出图表",
    incomeChart: "收入图表",
    noData: "暂无数据",
    logoutConfirm: "确定要退出登录吗？",
    currency: "日元",
    monthFormat: (year, month) =>
      `${year}年${month}月`,
  },

  "zh-TW": {
    pageTitle: "省錢檢查 | 圖表",
    userSuffix: "",
    backToMode: "← 返回模式選擇",
    logout: "登出",
    appTitle: "省錢檢查",
    householdMode: "家庭記帳模式",
    input: "輸入",
    calendar: "日曆",
    graph: "圖表",
    income: "收入",
    expense: "支出",
    monthlyBalance: "本月收支",
    expenseChart: "支出圖表",
    incomeChart: "收入圖表",
    noData: "尚無資料",
    logoutConfirm: "確定要登出嗎？",
    currency: "日圓",
    monthFormat: (year, month) =>
      `${year}年${month}月`,
  },

  ru: {
    pageTitle: "Контроль экономии | График",
    userSuffix: "",
    backToMode: "← Вернуться к выбору режима",
    logout: "Выйти",
    appTitle: "Контроль экономии",
    householdMode: "Домашний бюджет",
    input: "Ввод",
    calendar: "Календарь",
    graph: "График",
    income: "Доходы",
    expense: "Расходы",
    monthlyBalance: "Баланс за месяц",
    expenseChart: "График расходов",
    incomeChart: "График доходов",
    noData: "Нет данных",
    logoutConfirm: "Выйти из системы?",
    currency: "иен",
    monthFormat: (year, month) =>
      `${month}.${year}`,
  },

  vi: {
    pageTitle: "Kiểm tra tiết kiệm | Biểu đồ",
    userSuffix: "",
    backToMode: "← Quay lại chọn chế độ",
    logout: "Đăng xuất",
    appTitle: "Kiểm tra tiết kiệm",
    householdMode: "Chế độ sổ thu chi",
    input: "Nhập",
    calendar: "Lịch",
    graph: "Biểu đồ",
    income: "Thu nhập",
    expense: "Chi tiêu",
    monthlyBalance: "Số dư tháng này",
    expenseChart: "Biểu đồ chi tiêu",
    incomeChart: "Biểu đồ thu nhập",
    noData: "Không có dữ liệu",
    logoutConfirm: "Bạn có muốn đăng xuất không?",
    currency: "yên",
    monthFormat: (year, month) =>
      `${month}/${year}`,
  },

  ko: {
    pageTitle: "절약 체크 | 그래프",
    userSuffix: "님",
    backToMode: "← 모드 선택으로 돌아가기",
    logout: "로그아웃",
    appTitle: "절약 체크",
    householdMode: "가계부 모드",
    input: "입력",
    calendar: "캘린더",
    graph: "그래프",
    income: "수입",
    expense: "지출",
    monthlyBalance: "이번 달 수지",
    expenseChart: "지출 그래프",
    incomeChart: "수입 그래프",
    noData: "데이터 없음",
    logoutConfirm: "로그아웃하시겠습니까?",
    currency: "엔",
    monthFormat: (year, month) =>
      `${year}년 ${month}월`,
  },

  th: {
    pageTitle: "ตรวจสอบการประหยัด | กราฟ",
    userSuffix: "",
    backToMode: "← กลับไปเลือกโหมด",
    logout: "ออกจากระบบ",
    appTitle: "ตรวจสอบการประหยัด",
    householdMode: "โหมดบัญชีครัวเรือน",
    input: "กรอกข้อมูล",
    calendar: "ปฏิทิน",
    graph: "กราฟ",
    income: "รายรับ",
    expense: "รายจ่าย",
    monthlyBalance: "ยอดคงเหลือเดือนนี้",
    expenseChart: "กราฟรายจ่าย",
    incomeChart: "กราฟรายรับ",
    noData: "ไม่มีข้อมูล",
    logoutConfirm: "ต้องการออกจากระบบหรือไม่?",
    currency: "เยน",
    monthFormat: (year, month) =>
      `${month}/${year}`,
  },

  es: {
    pageTitle: "Control de ahorro | Gráfico",
    userSuffix: "",
    backToMode: "← Volver a la selección de modo",
    logout: "Cerrar sesión",
    appTitle: "Control de ahorro",
    householdMode: "Modo de presupuesto familiar",
    input: "Entrada",
    calendar: "Calendario",
    graph: "Gráfico",
    income: "Ingresos",
    expense: "Gastos",
    monthlyBalance: "Balance mensual",
    expenseChart: "Gráfico de gastos",
    incomeChart: "Gráfico de ingresos",
    noData: "Sin datos",
    logoutConfirm: "¿Quieres cerrar sesión?",
    currency: "yenes",
    monthFormat: (year, month) =>
      `${month}/${year}`,
  },

  "pt-BR": {
    pageTitle: "Controle de economia | Gráfico",
    userSuffix: "",
    backToMode: "← Voltar à seleção de modo",
    logout: "Sair",
    appTitle: "Controle de economia",
    householdMode: "Modo de orçamento doméstico",
    input: "Entrada",
    calendar: "Calendário",
    graph: "Gráfico",
    income: "Receitas",
    expense: "Despesas",
    monthlyBalance: "Saldo mensal",
    expenseChart: "Gráfico de despesas",
    incomeChart: "Gráfico de receitas",
    noData: "Sem dados",
    logoutConfirm: "Deseja sair?",
    currency: "ienes",
    monthFormat: (year, month) =>
      `${month}/${year}`,
  },
};

function getGraphTexts() {
  return (
    graphTranslations[currentLanguage] ||
    graphTranslations.ja
  );
}

function applyGraphLanguage() {
  const texts =
    getGraphTexts();

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

  document.title =
    texts.pageTitle;

  document.documentElement.lang =
    currentLanguage;
}


function getTranslatedCategory(category) {
  const categoryTranslations = {
    ja: {
      学費: "学費",
      家賃: "家賃",
      光熱費: "光熱費",
      交通費: "交通費",
      娯楽費: "娯楽費",
      サブスク: "サブスク",
      食費: "食費",
      クレジットカード: "クレジットカード",
      クレカ: "クレジットカード",
      医療費: "医療費",
      保険代: "保険代",
      美容: "美容",
      洋服: "洋服",
      日用品: "日用品",
      給料: "給料",
      臨時収入: "臨時収入",
      おこづかい: "おこづかい",
      未分類: "未分類",
    },

    en: {
      学費: "Tuition",
      家賃: "Rent",
      光熱費: "Utilities",
      交通費: "Transportation",
      娯楽費: "Entertainment",
      サブスク: "Subscriptions",
      食費: "Food",
      クレジットカード: "Credit card",
      クレカ: "Credit card",
      医療費: "Medical expenses",
      保険代: "Insurance",
      美容: "Beauty",
      洋服: "Clothing",
      日用品: "Daily necessities",
      給料: "Salary",
      臨時収入: "Extra income",
      おこづかい: "Allowance",
      未分類: "Uncategorized",
    },

    my: {
      学費: "ကျောင်းလခ",
      家賃: "အိမ်ငှားခ",
      光熱費: "မီးနှင့်ရေဖိုး",
      交通費: "သွားလာရေး",
      娯楽費: "ဖျော်ဖြေရေး",
      サブスク: "စာရင်းသွင်းဝန်ဆောင်မှု",
      食費: "အစားအသောက်",
      クレジットカード: "ခရက်ဒစ်ကတ်",
      クレカ: "ခရက်ဒစ်ကတ်",
      医療費: "ဆေးကုသစရိတ်",
      保険代: "အာမခံ",
      美容: "အလှအပ",
      洋服: "အဝတ်အစား",
      日用品: "နေ့စဉ်သုံးပစ္စည်း",
      給料: "လစာ",
      臨時収入: "အပိုဝင်ငွေ",
      おこづかい: "မုန့်ဖိုး",
      未分類: "အမျိုးအစားမသတ်မှတ်ရသေး",
    },

    id: {
      学費: "Biaya pendidikan",
      家賃: "Sewa",
      光熱費: "Utilitas",
      交通費: "Transportasi",
      娯楽費: "Hiburan",
      サブスク: "Langganan",
      食費: "Makanan",
      クレジットカード: "Kartu kredit",
      クレカ: "Kartu kredit",
      医療費: "Biaya medis",
      保険代: "Asuransi",
      美容: "Kecantikan",
      洋服: "Pakaian",
      日用品: "Kebutuhan sehari-hari",
      給料: "Gaji",
      臨時収入: "Pendapatan tambahan",
      おこづかい: "Uang saku",
      未分類: "Tanpa kategori",
    },

    "zh-CN": {
      学費: "学费",
      家賃: "房租",
      光熱費: "水电燃气费",
      交通費: "交通费",
      娯楽費: "娱乐费",
      サブスク: "订阅服务",
      食費: "餐饮",
      クレジットカード: "信用卡",
      クレカ: "信用卡",
      医療費: "医疗费",
      保険代: "保险费",
      美容: "美容",
      洋服: "服装",
      日用品: "日用品",
      給料: "工资",
      臨時収入: "临时收入",
      おこづかい: "零用钱",
      未分類: "未分类",
    },

    "zh-TW": {
      学費: "學費",
      家賃: "房租",
      光熱費: "水電瓦斯費",
      交通費: "交通費",
      娯楽費: "娛樂費",
      サブスク: "訂閱服務",
      食費: "餐飲",
      クレジットカード: "信用卡",
      クレカ: "信用卡",
      医療費: "醫療費",
      保険代: "保險費",
      美容: "美容",
      洋服: "服裝",
      日用品: "日用品",
      給料: "薪資",
      臨時収入: "臨時收入",
      おこづかい: "零用錢",
      未分類: "未分類",
    },

    ru: {
      学費: "Обучение",
      家賃: "Аренда",
      光熱費: "Коммунальные услуги",
      交通費: "Транспорт",
      娯楽費: "Развлечения",
      サブスク: "Подписки",
      食費: "Питание",
      クレジットカード: "Кредитная карта",
      クレカ: "Кредитная карта",
      医療費: "Медицинские расходы",
      保険代: "Страхование",
      美容: "Красота",
      洋服: "Одежда",
      日用品: "Товары первой необходимости",
      給料: "Зарплата",
      臨時収入: "Дополнительный доход",
      おこづかい: "Карманные деньги",
      未分類: "Без категории",
    },

    vi: {
      学費: "Học phí",
      家賃: "Tiền thuê nhà",
      光熱費: "Điện nước",
      交通費: "Đi lại",
      娯楽費: "Giải trí",
      サブスク: "Dịch vụ đăng ký",
      食費: "Ăn uống",
      クレジットカード: "Thẻ tín dụng",
      クレカ: "Thẻ tín dụng",
      医療費: "Chi phí y tế",
      保険代: "Bảo hiểm",
      美容: "Làm đẹp",
      洋服: "Quần áo",
      日用品: "Đồ dùng hằng ngày",
      給料: "Lương",
      臨時収入: "Thu nhập thêm",
      おこづかい: "Tiền tiêu vặt",
      未分類: "Chưa phân loại",
    },

    ko: {
      学費: "학비",
      家賃: "월세",
      光熱費: "공과금",
      交通費: "교통비",
      娯楽費: "오락비",
      サブスク: "구독",
      食費: "식비",
      クレジットカード: "신용카드",
      クレカ: "신용카드",
      医療費: "의료비",
      保険代: "보험료",
      美容: "미용",
      洋服: "의류",
      日用品: "생활용품",
      給料: "급여",
      臨時収入: "임시 수입",
      おこづかい: "용돈",
      未分類: "미분류",
    },

    th: {
      学費: "ค่าเล่าเรียน",
      家賃: "ค่าเช่า",
      光熱費: "ค่าน้ำค่าไฟ",
      交通費: "ค่าเดินทาง",
      娯楽費: "ค่าความบันเทิง",
      サブスク: "บริการสมัครสมาชิก",
      食費: "ค่าอาหาร",
      クレジットカード: "บัตรเครดิต",
      クレカ: "บัตรเครดิต",
      医療費: "ค่ารักษาพยาบาล",
      保険代: "ค่าประกัน",
      美容: "ความงาม",
      洋服: "เสื้อผ้า",
      日用品: "ของใช้ประจำวัน",
      給料: "เงินเดือน",
      臨時収入: "รายได้พิเศษ",
      おこづかい: "เงินค่าขนม",
      未分類: "ไม่จัดหมวดหมู่",
    },

    es: {
      学費: "Matrícula",
      家賃: "Alquiler",
      光熱費: "Servicios",
      交通費: "Transporte",
      娯楽費: "Entretenimiento",
      サブスク: "Suscripciones",
      食費: "Alimentación",
      クレジットカード: "Tarjeta de crédito",
      クレカ: "Tarjeta de crédito",
      医療費: "Gastos médicos",
      保険代: "Seguro",
      美容: "Belleza",
      洋服: "Ropa",
      日用品: "Artículos diarios",
      給料: "Salario",
      臨時収入: "Ingresos extra",
      おこづかい: "Dinero de bolsillo",
      未分類: "Sin categoría",
    },

    "pt-BR": {
      学費: "Mensalidade escolar",
      家賃: "Aluguel",
      光熱費: "Contas domésticas",
      交通費: "Transporte",
      娯楽費: "Entretenimento",
      サブスク: "Assinaturas",
      食費: "Alimentação",
      クレジットカード: "Cartão de crédito",
      クレカ: "Cartão de crédito",
      医療費: "Despesas médicas",
      保険代: "Seguro",
      美容: "Beleza",
      洋服: "Roupas",
      日用品: "Itens do dia a dia",
      給料: "Salário",
      臨時収入: "Renda extra",
      おこづかい: "Mesada",
      未分類: "Sem categoria",
    },
  };

  const languageCategories =
    categoryTranslations[currentLanguage] ||
    categoryTranslations.ja;

  return (
    languageCategories[category] ||
    category ||
    getGraphTexts().noData
  );
}


/* ==============================
   保存データの読み込み
============================== */

let data = loadData();


/* ==============================
   現在表示している年月
============================== */

const today = new Date();

let year = today.getFullYear();
let month = today.getMonth();


/* ==============================
   Chart.jsのグラフ
============================== */

let expenseChart = null;
let incomeChart = null;


/* ==============================
   グラフの色
============================== */

const expenseColors = [
  "#cf6f78",
  "#dc8e80",
  "#d9a36c",
  "#c5ad66",
  "#a9ae69",
  "#81aa7f",
  "#6fa59b",
  "#709eb1",
  "#7f91bc",
  "#9c84b5",
  "#b57fa6",
  "#c986a0"
];

const incomeColors = [
  "#6fa98a",
  "#77a99f",
  "#75a2b0",
  "#8798ba",
  "#9c8db7",
  "#b087ae"
];


/* ==============================
   初期処理
============================== */

applyGraphLanguage();
showUser();
showGraph();


/* ==============================
   localStorageの読み込み
============================== */

function loadData() {
  try {
    const savedData =
      JSON.parse(localStorage.getItem(storageKey));

    return Array.isArray(savedData)
      ? savedData
      : [];

  } catch (error) {
    console.error(
      "家計簿データを読み込めませんでした。",
      error
    );

    return [];
  }
}


/* ==============================
   ユーザー名表示
============================== */
function showUser() {
  const userDisplay =
    document.getElementById(
      "user-display"
    );

  if (!userDisplay) {
    return;
  }

  const texts =
    getGraphTexts();

  const suffix =
    texts.userSuffix || "";

  userDisplay.textContent =
    suffix
      ? `${currentUser} ${suffix}`
      : currentUser;
}
/* ==============================
   ログアウト
============================== */
function handleLogout() {
  const texts =
    getGraphTexts();

  const result =
    confirm(
      texts.logoutConfirm
    );

  if (!result) {
    return;
  }

  localStorage.removeItem(
    "currentUser"
  );

  window.location.href =
    "login.html";
}

/* ==============================
   グラフと集計の表示
============================== */

function showGraph() {
  const monthTitle =
    document.getElementById("monthTitle");

  if (monthTitle) {
    const texts =
  getGraphTexts();

monthTitle.textContent =
  texts.monthFormat(
    year,
    month + 1
  );
  }

  let income = 0;
  let expense = 0;

  const expenseData = {};
  const incomeData = {};

  const monthStart =
    new Date(year, month, 1);

  const nextMonthStart =
    new Date(year, month + 1, 1);

  data.forEach((item) => {
    const itemDate =
      convertToDate(item.date);

    const amount =
      getNumber(item.amount);

    if (!itemDate || amount < 0) {
      return;
    }

    /*
      表示中の月以外のデータは除外
    */
    if (
      itemDate < monthStart ||
      itemDate >= nextMonthStart
    ) {
      return;
    }

    const category =
      typeof item.category === "string" &&
      item.category.trim() !== ""
        ? item.category.trim()
        : "未分類";

    if (item.type === "収入") {
      income += amount;

      incomeData[category] =
        (incomeData[category] || 0) + amount;
    }

    if (item.type === "支出") {
      expense += amount;

      expenseData[category] =
        (expenseData[category] || 0) + amount;
    }
  });

 setText(
  "income",
  formatYen(income)
);

setText(
  "expense",
  formatYen(expense)
);

/* 今月の収支 */
const balance =
  income - expense;

setText(
  "balance",
  formatYen(balance)
);

/* 収支がプラスかマイナスかで色を変更 */
const balanceElement =
  document.getElementById("balance");

if (balanceElement) {
  balanceElement.classList.remove(
    "balance-plus",
    "balance-minus"
  );

  balanceElement.classList.add(
    balance >= 0
      ? "balance-plus"
      : "balance-minus"
  );
}

drawCharts(
  expenseData,
  incomeData
);
}
/* ==============================
   グラフの描画
============================== */

function drawCharts(
  expenseData,
  incomeData
) {
  destroyCharts();

  const expenseCanvas =
    document.getElementById("expenseChart");

  const incomeCanvas =
    document.getElementById("incomeChart");

  if (
    !expenseCanvas ||
    !incomeCanvas
  ) {
    console.error(
      "グラフ用のcanvasが見つかりません。"
    );

    return;
  }

  expenseChart = createDoughnutChart(
    expenseCanvas,
    expenseData,
    expenseColors
  );

  incomeChart = createDoughnutChart(
    incomeCanvas,
    incomeData,
    incomeColors
  );
}
/* ==============================
   円グラフを作成
============================== */

function createDoughnutChart(
  canvas,
  chartData,
  colors
) {
  const originalLabels =
    Object.keys(chartData);

  const labels =
    originalLabels.map(
      (category) =>
        getTranslatedCategory(category)
    );

  const values =
    originalLabels.map(
      (category) =>
        chartData[category]
    );

  const hasData =
    labels.length > 0;

  // この下は今まで通り

  return new Chart(
    canvas,
    {
      type: "doughnut",

      data: {
        labels: hasData
          ? labels
          : [getGraphTexts().noData],

        datasets: [
          {
            data: hasData
              ? values
              : [1],

            backgroundColor: hasData
              ? labels.map(
                  (_, index) =>
                    colors[index % colors.length]
                )
              : ["#e8e1e4"],

            borderWidth: 0,
            hoverOffset: hasData ? 7 : 0
          }
        ]
      },

      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "62%",

        plugins: {
          legend: {
            display: true,
            position: "bottom",

            labels: {
              boxWidth: 11,
              boxHeight: 11,
              usePointStyle: true,
              padding: 14,

              font: {
                family: "Noto Sans JP",
                size: 12
              }
            }
          },

          tooltip: {
            enabled: hasData,

            callbacks: {
              label(context) {
                const label =
                  context.label || "";

                return `${label}：${formatYen(context.raw)}`;
              }
            }
          }
        }
      }
    }
  );
}

/* ==============================
   既存のグラフを削除
============================== */

function destroyCharts() {
  if (expenseChart) {
    expenseChart.destroy();
    expenseChart = null;
  }

  if (incomeChart) {
    incomeChart.destroy();
    incomeChart = null;
  }
}


/* ==============================
   前の月
============================== */

function prevMonth() {
  month--;

  if (month < 0) {
    month = 11;
    year--;
  }

  showGraph();
}


/* ==============================
   次の月
============================== */

function nextMonth() {
  month++;

  if (month > 11) {
    month = 0;
    year++;
  }

  showGraph();
}


/* ==============================
   日付文字列をDateに変換
============================== */

function convertToDate(dateText) {
  if (
    typeof dateText !== "string" ||
    dateText.trim() === ""
  ) {
    return null;
  }

  const convertedDate =
    new Date(`${dateText}T00:00:00`);

  if (
    Number.isNaN(convertedDate.getTime())
  ) {
    return null;
  }

  return convertedDate;
}


/* ==============================
   数値への変換
============================== */

function getNumber(value) {
  const convertedValue =
    Number(
      String(value ?? "")
        .replaceAll(",", "")
        .replaceAll("円", "")
        .trim()
    );

  return Number.isFinite(convertedValue)
    ? convertedValue
    : 0;
}


/* ==============================
   金額表示
============================== */

function formatYen(value) {
  const texts =
    getGraphTexts();

  const formattedValue =
    Number(value).toLocaleString(
      currentLanguage === "ja"
        ? "ja-JP"
        : undefined
    );

  return currentLanguage === "ja"
    ? `${formattedValue}${texts.currency}`
    : `${formattedValue} ${texts.currency}`;
}

/* ==============================
   要素へ文字を表示
============================== */

function setText(id, text) {
  const element =
    document.getElementById(id);

  if (element) {
    element.textContent = text;
  }
}