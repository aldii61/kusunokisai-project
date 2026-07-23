// js/page1.js

// Check if user is logged in & display user status
window.addEventListener("load", function () {
  const currentUser = localStorage.getItem("currentUser");

  if (!currentUser) {
    window.location.href = "login.html";
    return;
  }

  // Tampilkan nama user jika berhasil login
  displayCurrentUser(currentUser);
});

// Tampilkan info user aktif
function displayCurrentUser(currentUser) {
  const userDisplayEl =
    document.getElementById("user-display");

  if (!userDisplayEl) {
    return;
  }

  const language =
    localStorage.getItem("appLanguage") || "ja";

  const texts =
    modeTranslations[language] ||
    modeTranslations.ja;

  const userSuffix =
    texts.userSuffix || "";

  userDisplayEl.textContent =
    userSuffix
      ? `${currentUser} ${userSuffix}`
      : currentUser;
}


// Fungsi logout (Sama persis dengan halaman index dan normal)
function handleLogout() {
  if (confirm("ログアウトしますか？")) {
    localStorage.removeItem("currentUser");
    window.location.href = "login.html";
  }
}

// Mode selection function - 🔥 VERSI AMAN PRIVASI
function startApp(mode) {
  const currentUser = localStorage.getItem("currentUser") || "guest";
  const storageKey = `expenses_${currentUser}`;

  if (!localStorage.getItem(storageKey)) {
    localStorage.setItem(storageKey, JSON.stringify([]));
  }

  if (mode === "easy") {
    window.location.href = "index.html";
  } else if (mode === "normal") {
    window.location.href = "normal.html";
  }
}

/* =========================================================
   モード選択画面 多言語対応
========================================================= */

const modeTranslations = {
  ja: {
    userSuffix: "さん",
    pageTitle: "節約チェッカー | モード選択",
    logout: "ログアウト",
    modeQuestion: "どちらのモードで記録しますか？",
    savingChecker: "節約チェッカー",
    savingCheckerDescription: "項目ごとに簡単入力",
    householdMode: "家計簿モード",
    householdModeDescription: "詳細に記録できます",
    languageTitle: "言語を選ぶ",
    languageDescription: "表示する言語を選択してください",
  },

  en: {
    userSuffix: "",
    pageTitle: "Savings Checker | Select Mode",
    logout: "Log out",
    modeQuestion: "Which mode would you like to use?",
    savingChecker: "Savings Checker",
    savingCheckerDescription: "Quick and easy expense entry",
    householdMode: "Household Budget Mode",
    householdModeDescription: "Record your finances in detail",
    languageTitle: "Select Language",
    languageDescription: "Choose the language to display",
  },

  my: {
    userSuffix: "",
    pageTitle:
      "ငွေချွေတာမှု စစ်ဆေးကိရိယာ | မုဒ်ရွေးချယ်ရန်",
    logout: "ထွက်ရန်",
    modeQuestion:
      "မည်သည့်မုဒ်ဖြင့် မှတ်တမ်းတင်လိုပါသလဲ။",
    savingChecker:
      "ငွေချွေတာမှု စစ်ဆေးကိရိယာ",
    savingCheckerDescription:
      "အသုံးစရိတ်ကို လွယ်ကူစွာ ထည့်သွင်းပါ",
    householdMode:
      "အိမ်သုံးစာရင်း မုဒ်",
    householdModeDescription:
      "ဝင်ငွေနှင့် အသုံးစရိတ်ကို အသေးစိတ် မှတ်တမ်းတင်နိုင်သည်",
    languageTitle:
      "ဘာသာစကား ရွေးချယ်ရန်",
    languageDescription:
      "ဖော်ပြလိုသည့် ဘာသာစကားကို ရွေးချယ်ပါ",
  },

  id: {
    userSuffix: "",
    pageTitle:
      "Pemeriksa Penghematan | Pilih Mode",
    logout: "Keluar",
    modeQuestion:
      "Mode mana yang ingin Anda gunakan?",
    savingChecker:
      "Pemeriksa Penghematan",
    savingCheckerDescription:
      "Masukkan pengeluaran dengan mudah",
    householdMode:
      "Mode Buku Keuangan",
    householdModeDescription:
      "Catat keuangan secara terperinci",
    languageTitle:
      "Pilih Bahasa",
    languageDescription:
      "Pilih bahasa yang ingin ditampilkan",
  },

  "zh-CN": {
    userSuffix: "",
    pageTitle:
      "省钱检查 | 选择模式",
    logout:
      "退出登录",
    modeQuestion:
      "请选择要使用的记录模式",
    savingChecker:
      "省钱检查",
    savingCheckerDescription:
      "轻松快速地记录支出",
    householdMode:
      "家庭记账模式",
    householdModeDescription:
      "可以详细记录收入和支出",
    languageTitle:
      "选择语言",
    languageDescription:
      "请选择要显示的语言",
  },

  "zh-TW": {
    userSuffix: "",
    pageTitle:
      "省錢檢查 | 選擇模式",
    logout:
      "登出",
    modeQuestion:
      "請選擇要使用的記錄模式",
    savingChecker:
      "省錢檢查",
    savingCheckerDescription:
      "輕鬆快速地記錄支出",
    householdMode:
      "家庭記帳模式",
    householdModeDescription:
      "可以詳細記錄收入與支出",
    languageTitle:
      "選擇語言",
    languageDescription:
      "請選擇要顯示的語言",
  },

  ru: {
    userSuffix: "",
    pageTitle:
      "Контроль экономии | Выбор режима",
    logout:
      "Выйти",
    modeQuestion:
      "Какой режим вы хотите использовать?",
    savingChecker:
      "Контроль экономии",
    savingCheckerDescription:
      "Быстрый и простой ввод расходов",
    householdMode:
      "Домашний бюджет",
    householdModeDescription:
      "Подробный учёт доходов и расходов",
    languageTitle:
      "Выберите язык",
    languageDescription:
      "Выберите язык интерфейса",
  },

  vi: {
    userSuffix: "",
    pageTitle:
      "Kiểm tra tiết kiệm | Chọn chế độ",
    logout:
      "Đăng xuất",
    modeQuestion:
      "Bạn muốn sử dụng chế độ nào?",
    savingChecker:
      "Kiểm tra tiết kiệm",
    savingCheckerDescription:
      "Nhập chi tiêu nhanh chóng và dễ dàng",
    householdMode:
      "Chế độ sổ thu chi",
    householdModeDescription:
      "Ghi lại thu nhập và chi tiêu chi tiết",
    languageTitle:
      "Chọn ngôn ngữ",
    languageDescription:
      "Chọn ngôn ngữ muốn hiển thị",
  },

  ko: {
    userSuffix: "님",
    pageTitle:
      "절약 체크 | 모드 선택",
    logout:
      "로그아웃",
    modeQuestion:
      "어떤 모드로 기록하시겠습니까?",
    savingChecker:
      "절약 체크",
    savingCheckerDescription:
      "항목별로 간편하게 입력",
    householdMode:
      "가계부 모드",
    householdModeDescription:
      "수입과 지출을 자세히 기록",
    languageTitle:
      "언어 선택",
    languageDescription:
      "표시할 언어를 선택해 주세요",
  },

  th: {
    userSuffix: "",
    pageTitle:
      "ตรวจสอบการประหยัด | เลือกโหมด",
    logout:
      "ออกจากระบบ",
    modeQuestion:
      "คุณต้องการบันทึกด้วยโหมดใด?",
    savingChecker:
      "ตรวจสอบการประหยัด",
    savingCheckerDescription:
      "บันทึกรายจ่ายได้ง่ายและรวดเร็ว",
    householdMode:
      "โหมดบัญชีครัวเรือน",
    householdModeDescription:
      "บันทึกรายรับและรายจ่ายอย่างละเอียด",
    languageTitle:
      "เลือกภาษา",
    languageDescription:
      "เลือกภาษาที่ต้องการแสดง",
  },

  es: {
    userSuffix: "",
    pageTitle:
      "Control de ahorro | Seleccionar modo",
    logout:
      "Cerrar sesión",
    modeQuestion:
      "¿Qué modo quieres utilizar?",
    savingChecker:
      "Control de ahorro",
    savingCheckerDescription:
      "Registra gastos de forma rápida y sencilla",
    householdMode:
      "Modo de presupuesto familiar",
    householdModeDescription:
      "Registra ingresos y gastos detalladamente",
    languageTitle:
      "Seleccionar idioma",
    languageDescription:
      "Elige el idioma que deseas mostrar",
  },

  "pt-BR": {
    userSuffix: "",
    pageTitle:
      "Controle de economia | Selecionar modo",
    logout:
      "Sair",
    modeQuestion:
      "Qual modo você deseja usar?",
    savingChecker:
      "Controle de economia",
    savingCheckerDescription:
      "Registre despesas de forma rápida e fácil",
    householdMode:
      "Modo de orçamento doméstico",
    householdModeDescription:
      "Registre receitas e despesas em detalhes",
    languageTitle:
      "Selecionar idioma",
    languageDescription:
      "Escolha o idioma que deseja exibir",
  },
    
};

/* =========================================================
   言語を画面に反映
========================================================= */

function applyLanguage(language) {
  const texts =
    modeTranslations[language] ||
    modeTranslations.ja;

  document
    .querySelectorAll("[data-i18n]")
    .forEach((element) => {
      const key =
        element.dataset.i18n;

      if (texts[key]) {
        element.textContent =
          texts[key];
      }
    });

  document.title =
    texts.pageTitle;

  document.documentElement.lang =
    language;

  localStorage.setItem(
    "appLanguage",
    language
  );

  const currentUser =
    localStorage.getItem("currentUser");

  if (currentUser) {
    displayCurrentUser(currentUser);
  }
}

/* =========================================================
   セレクトボックス変更時
========================================================= */

function changeLanguage() {
  const languageSelect =
    document.getElementById(
      "language-select"
    );

  if (!languageSelect) {
    return;
  }

  applyLanguage(
    languageSelect.value
  );
}


/* =========================================================
   ページを開いたとき
========================================================= */

document.addEventListener(
  "DOMContentLoaded",
  () => {
    const savedLanguage =
  localStorage.getItem(
    "appLanguage"
  ) || "ja";
    

    const languageSelect =
      document.getElementById(
        "language-select"
      );

    if (languageSelect) {
      languageSelect.value =
        savedLanguage;
    }

    applyLanguage(savedLanguage);

    if (window.lucide) {
      lucide.createIcons();
    }
  }
);
