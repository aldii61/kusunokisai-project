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
  const labels =
    Object.keys(chartData);

  const values =
    Object.values(chartData);

  const hasData =
    labels.length > 0;

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