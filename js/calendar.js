"use strict";

/* =========================================================
   calendar.js
   家計簿モード・カレンダー画面
========================================================= */

/* ==============================
   ユーザー・言語
============================== */

const currentUser =
  localStorage.getItem("currentUser") || "guest";

const currentLanguage =
  localStorage.getItem("appLanguage") || "ja";

const storageKey =
  `kakeibo_${currentUser}`;


/* ==============================
   保存済みデータ
============================== */

let data = [];

try {
  const savedData =
    JSON.parse(
      localStorage.getItem(storageKey)
    );

  data =
    Array.isArray(savedData)
      ? savedData
      : [];
} catch (error) {
  console.error(
    "家計簿データを読み込めませんでした。",
    error
  );

  data = [];
}


/* ==============================
   表示中の年月
============================== */

const now =
  new Date();

let year =
  now.getFullYear();

let month =
  now.getMonth();


/* ==============================
   翻訳
============================== */

const calendarTranslations = {
  ja: {
    pageTitle:
      "節約チェッカー | カレンダー",

    userSuffix: "さん",

    backToMode:
      "←モード選択画面に戻る",

    logout:
      "ログアウト",

    appTitle:
      "節約チェッカー",

    householdMode:
      "家計簿モード",

    input:
      "入力",

    calendar:
      "カレンダー",

    graph:
      "グラフ",

    sunday: "日",
    monday: "月",
    tuesday: "火",
    wednesday: "水",
    thursday: "木",
    friday: "金",
    saturday: "土",

    incomeLabel:
      "収入：",

    expenseLabel:
      "支出：",

    currency:
      "円",

    detailsList:
      "明細一覧",

    date:
      "日付",

    item:
      "項目",

    amount:
      "金額",

    action:
      "操作",

    delete:
      "削除",

    emptyMonth:
      "この月の明細はありません",

    logoutConfirm:
      "ログアウトしますか？",

    deleteConfirm:
      "この明細を削除しますか？",

    previousMonth:
      "前の月",

    nextMonth:
      "次の月",

    uncategorized:
      "未分類",

    monthFormat: (year, month) =>
      `${year}年${month}月`,
    memo: "メモ",
  },

  en: {
    memo: "Memo",
    pageTitle:
      "Savings Checker | Calendar",

    userSuffix: "",

    backToMode:
      "← Back to mode selection",

    logout:
      "Log out",

    appTitle:
      "Savings Checker",

    householdMode:
      "Household Budget Mode",

    input:
      "Input",

    calendar:
      "Calendar",

    graph:
      "Graph",

    sunday: "Sun",
    monday: "Mon",
    tuesday: "Tue",
    wednesday: "Wed",
    thursday: "Thu",
    friday: "Fri",
    saturday: "Sat",

    incomeLabel:
      "Income:",

    expenseLabel:
      "Expenses:",

    currency:
      "yen",

    detailsList:
      "Transaction details",

    date:
      "Date",

    item:
      "Category",

    amount:
      "Amount",

    action:
      "Action",

    delete:
      "Delete",

    emptyMonth:
      "There are no transactions for this month",

    logoutConfirm:
      "Do you want to log out?",

    deleteConfirm:
      "Delete this transaction?",

    previousMonth:
      "Previous month",

    nextMonth:
      "Next month",

    uncategorized:
      "Uncategorized",

    monthFormat: (year, month) =>
      `${month}/${year}`,
  },

  my: {
     memo: "မှတ်စု",
    pageTitle:
      "ချွေတာရေး စစ်ဆေးမှု | ပြက္ခဒိန်",

    userSuffix: "",

    backToMode:
      "← မုဒ်ရွေးချယ်မှုသို့ ပြန်သွားရန်",

    logout:
      "ထွက်ရန်",

    appTitle:
      "ချွေတာရေး စစ်ဆေးမှု",

    householdMode:
      "အိမ်သုံးစာရင်း မုဒ်",

    input:
      "ထည့်သွင်းရန်",

    calendar:
      "ပြက္ခဒိန်",

    graph:
      "ဂရပ်",

    sunday: "နွေ",
    monday: "လာ",
    tuesday: "ဂါ",
    wednesday: "ဟူး",
    thursday: "တေး",
    friday: "ကြာ",
    saturday: "နေ",

    incomeLabel:
      "ဝင်ငွေ：",

    expenseLabel:
      "အသုံးစရိတ်：",

    currency:
      "ယန်း",

    detailsList:
      "အသေးစိတ်စာရင်း",

    date:
      "ရက်စွဲ",

    item:
      "အမျိုးအစား",

    amount:
      "ငွေပမာဏ",

    action:
      "လုပ်ဆောင်ချက်",

    delete:
      "ဖျက်ရန်",

    emptyMonth:
      "ဤလအတွက် မှတ်တမ်းမရှိပါ",

    logoutConfirm:
      "ထွက်လိုပါသလား။",

    deleteConfirm:
      "ဤမှတ်တမ်းကို ဖျက်လိုပါသလား။",

    previousMonth:
      "ယခင်လ",

    nextMonth:
      "နောက်လ",

    uncategorized:
      "အမျိုးအစားမသတ်မှတ်ရသေး",

    monthFormat: (year, month) =>
      `${year} ခုနှစ် ${month} လ`,
  },

  id: {
    memo: "Catatan",

    pageTitle:
      "Pemeriksa Penghematan | Kalender",

    userSuffix: "",

    backToMode:
      "← Kembali ke pilihan mode",

    logout:
      "Keluar",

    appTitle:
      "Pemeriksa Penghematan",

    householdMode:
      "Mode Buku Keuangan",

    input:
      "Input",

    calendar:
      "Kalender",

    graph:
      "Grafik",

    sunday: "Min",
    monday: "Sen",
    tuesday: "Sel",
    wednesday: "Rab",
    thursday: "Kam",
    friday: "Jum",
    saturday: "Sab",

    incomeLabel:
      "Pemasukan:",

    expenseLabel:
      "Pengeluaran:",

    currency:
      "yen",

    detailsList:
      "Daftar transaksi",

    date:
      "Tanggal",

    item:
      "Kategori",

    amount:
      "Jumlah",

    action:
      "Tindakan",

    delete:
      "Hapus",

    emptyMonth:
      "Tidak ada transaksi pada bulan ini",

    logoutConfirm:
      "Apakah Anda ingin keluar?",

    deleteConfirm:
      "Hapus transaksi ini?",

    previousMonth:
      "Bulan sebelumnya",

    nextMonth:
      "Bulan berikutnya",

    uncategorized:
      "Tanpa kategori",

    monthFormat: (year, month) =>
      `${month}/${year}`,
  },

  "zh-CN": {
    memo: "备注",
    pageTitle:
      "省钱检查 | 日历",

    userSuffix: "",

    backToMode:
      "← 返回模式选择",

    logout:
      "退出登录",

    appTitle:
      "省钱检查",

    householdMode:
      "家庭记账模式",

    input:
      "输入",

    calendar:
      "日历",

    graph:
      "图表",

    sunday: "日",
    monday: "一",
    tuesday: "二",
    wednesday: "三",
    thursday: "四",
    friday: "五",
    saturday: "六",

    incomeLabel:
      "收入：",

    expenseLabel:
      "支出：",

    currency:
      "日元",

    detailsList:
      "明细列表",

    date:
      "日期",

    item:
      "分类",

    amount:
      "金额",

    action:
      "操作",

    delete:
      "删除",

    emptyMonth:
      "本月没有明细",

    logoutConfirm:
      "确定要退出登录吗？",

    deleteConfirm:
      "确定要删除这条明细吗？",

    previousMonth:
      "上个月",

    nextMonth:
      "下个月",

    uncategorized:
      "未分类",

    monthFormat: (year, month) =>
      `${year}年${month}月`,
  },

  "zh-TW": {
     memo: "備註",
    pageTitle:
      "省錢檢查 | 日曆",

    userSuffix: "",

    backToMode:
      "← 返回模式選擇",

    logout:
      "登出",

    appTitle:
      "省錢檢查",

    householdMode:
      "家庭記帳模式",

    input:
      "輸入",

    calendar:
      "日曆",

    graph:
      "圖表",

    sunday: "日",
    monday: "一",
    tuesday: "二",
    wednesday: "三",
    thursday: "四",
    friday: "五",
    saturday: "六",

    incomeLabel:
      "收入：",

    expenseLabel:
      "支出：",

    currency:
      "日圓",

    detailsList:
      "明細列表",

    date:
      "日期",

    item:
      "分類",

    amount:
      "金額",

    action:
      "操作",

    delete:
      "刪除",

    emptyMonth:
      "本月沒有明細",

    logoutConfirm:
      "確定要登出嗎？",

    deleteConfirm:
      "確定要刪除這筆明細嗎？",

    previousMonth:
      "上個月",

    nextMonth:
      "下個月",

    uncategorized:
      "未分類",

    monthFormat: (year, month) =>
      `${year}年${month}月`,
  },

  ru: {
     memo: "Заметка",
    pageTitle:
      "Контроль экономии | Календарь",

    userSuffix: "",

    backToMode:
      "← Вернуться к выбору режима",

    logout:
      "Выйти",

    appTitle:
      "Контроль экономии",

    householdMode:
      "Домашний бюджет",

    input:
      "Ввод",

    calendar:
      "Календарь",

    graph:
      "График",

    sunday: "Вс",
    monday: "Пн",
    tuesday: "Вт",
    wednesday: "Ср",
    thursday: "Чт",
    friday: "Пт",
    saturday: "Сб",

    incomeLabel:
      "Доходы:",

    expenseLabel:
      "Расходы:",

    currency:
      "иен",

    detailsList:
      "Список операций",

    date:
      "Дата",

    item:
      "Категория",

    amount:
      "Сумма",

    action:
      "Действие",

    delete:
      "Удалить",

    emptyMonth:
      "За этот месяц операций нет",

    logoutConfirm:
      "Выйти из системы?",

    deleteConfirm:
      "Удалить эту операцию?",

    previousMonth:
      "Предыдущий месяц",

    nextMonth:
      "Следующий месяц",

    uncategorized:
      "Без категории",

    monthFormat: (year, month) =>
      `${month}.${year}`,
  },

  vi: {
    memo: "Ghi chú",
    pageTitle:
      "Kiểm tra tiết kiệm | Lịch",

    userSuffix: "",

    backToMode:
      "← Quay lại chọn chế độ",

    logout:
      "Đăng xuất",

    appTitle:
      "Kiểm tra tiết kiệm",

    householdMode:
      "Chế độ sổ thu chi",

    input:
      "Nhập",

    calendar:
      "Lịch",

    graph:
      "Biểu đồ",

    sunday: "CN",
    monday: "T2",
    tuesday: "T3",
    wednesday: "T4",
    thursday: "T5",
    friday: "T6",
    saturday: "T7",

    incomeLabel:
      "Thu nhập:",

    expenseLabel:
      "Chi tiêu:",

    currency:
      "yên",

    detailsList:
      "Danh sách chi tiết",

    date:
      "Ngày",

    item:
      "Danh mục",

    amount:
      "Số tiền",

    action:
      "Thao tác",

    delete:
      "Xóa",

    emptyMonth:
      "Không có giao dịch trong tháng này",

    logoutConfirm:
      "Bạn có muốn đăng xuất không?",

    deleteConfirm:
      "Bạn có muốn xóa giao dịch này không?",

    previousMonth:
      "Tháng trước",

    nextMonth:
      "Tháng sau",

    uncategorized:
      "Chưa phân loại",

    monthFormat: (year, month) =>
      `${month}/${year}`,
  },

  ko: {
     memo: "메모",
    pageTitle:
      "절약 체크 | 캘린더",

    userSuffix: "님",

    backToMode:
      "← 모드 선택으로 돌아가기",

    logout:
      "로그아웃",

    appTitle:
      "절약 체크",

    householdMode:
      "가계부 모드",

    input:
      "입력",

    calendar:
      "캘린더",

    graph:
      "그래프",

    sunday: "일",
    monday: "월",
    tuesday: "화",
    wednesday: "수",
    thursday: "목",
    friday: "금",
    saturday: "토",

    incomeLabel:
      "수입:",

    expenseLabel:
      "지출:",

    currency:
      "엔",

    detailsList:
      "상세 내역",

    date:
      "날짜",

    item:
      "항목",

    amount:
      "금액",

    action:
      "작업",

    delete:
      "삭제",

    emptyMonth:
      "이번 달 내역이 없습니다",

    logoutConfirm:
      "로그아웃하시겠습니까?",

    deleteConfirm:
      "이 내역을 삭제하시겠습니까?",

    previousMonth:
      "이전 달",

    nextMonth:
      "다음 달",

    uncategorized:
      "미분류",

    monthFormat: (year, month) =>
      `${year}년 ${month}월`,
  },

  th: {
     memo: "บันทึก",
    pageTitle:
      "ตรวจสอบการประหยัด | ปฏิทิน",

    userSuffix: "",

    backToMode:
      "← กลับไปเลือกโหมด",

    logout:
      "ออกจากระบบ",

    appTitle:
      "ตรวจสอบการประหยัด",

    householdMode:
      "โหมดบัญชีครัวเรือน",

    input:
      "กรอกข้อมูล",

    calendar:
      "ปฏิทิน",

    graph:
      "กราฟ",

    sunday: "อา",
    monday: "จ",
    tuesday: "อ",
    wednesday: "พ",
    thursday: "พฤ",
    friday: "ศ",
    saturday: "ส",

    incomeLabel:
      "รายรับ:",

    expenseLabel:
      "รายจ่าย:",

    currency:
      "เยน",

    detailsList:
      "รายการรายละเอียด",

    date:
      "วันที่",

    item:
      "หมวดหมู่",

    amount:
      "จำนวนเงิน",

    action:
      "ดำเนินการ",

    delete:
      "ลบ",

    emptyMonth:
      "ไม่มีรายการในเดือนนี้",

    logoutConfirm:
      "ต้องการออกจากระบบหรือไม่?",

    deleteConfirm:
      "ต้องการลบรายการนี้หรือไม่?",

    previousMonth:
      "เดือนก่อน",

    nextMonth:
      "เดือนถัดไป",

    uncategorized:
      "ไม่จัดหมวดหมู่",

    monthFormat: (year, month) =>
      `${month}/${year}`,
  },

  es: {
    memo: "Nota",
    pageTitle:
      "Control de ahorro | Calendario",

    userSuffix: "",

    backToMode:
      "← Volver a la selección de modo",

    logout:
      "Cerrar sesión",

    appTitle:
      "Control de ahorro",

    householdMode:
      "Modo de presupuesto familiar",

    input:
      "Entrada",

    calendar:
      "Calendario",

    graph:
      "Gráfico",

    sunday: "Dom",
    monday: "Lun",
    tuesday: "Mar",
    wednesday: "Mié",
    thursday: "Jue",
    friday: "Vie",
    saturday: "Sáb",

    incomeLabel:
      "Ingresos:",

    expenseLabel:
      "Gastos:",

    currency:
      "yenes",

    detailsList:
      "Lista de movimientos",

    date:
      "Fecha",

    item:
      "Categoría",

    amount:
      "Importe",

    action:
      "Acción",

    delete:
      "Eliminar",

    emptyMonth:
      "No hay movimientos en este mes",

    logoutConfirm:
      "¿Quieres cerrar sesión?",

    deleteConfirm:
      "¿Quieres eliminar este movimiento?",

    previousMonth:
      "Mes anterior",

    nextMonth:
      "Mes siguiente",

    uncategorized:
      "Sin categoría",

    monthFormat: (year, month) =>
      `${month}/${year}`,
  },

  "pt-BR": {
    memo: "Observação",
    pageTitle:
      "Controle de economia | Calendário",

    userSuffix: "",

    backToMode:
      "← Voltar à seleção de modo",

    logout:
      "Sair",

    appTitle:
      "Controle de economia",

    householdMode:
      "Modo de orçamento doméstico",

    input:
      "Entrada",

    calendar:
      "Calendário",

    graph:
      "Gráfico",

    sunday: "Dom",
    monday: "Seg",
    tuesday: "Ter",
    wednesday: "Qua",
    thursday: "Qui",
    friday: "Sex",
    saturday: "Sáb",

    incomeLabel:
      "Receitas:",

    expenseLabel:
      "Despesas:",

    currency:
      "ienes",

    detailsList:
      "Lista de transações",

    date:
      "Data",

    item:
      "Categoria",

    amount:
      "Valor",

    action:
      "Ação",

    delete:
      "Excluir",

    emptyMonth:
      "Não há transações neste mês",

    logoutConfirm:
      "Deseja sair?",

    deleteConfirm:
      "Deseja excluir esta transação?",

    previousMonth:
      "Mês anterior",

    nextMonth:
      "Próximo mês",

    uncategorized:
      "Sem categoria",

    monthFormat: (year, month) =>
      `${month}/${year}`,
  },

    ne: {
       memo: "नोट",
    pageTitle:
      "बचत जाँचकर्ता | पात्रो",

    userSuffix: "",

    backToMode:
      "← मोड चयनमा फर्कनुहोस्",

    logout:
      "लग आउट",

    appTitle:
      "बचत जाँचकर्ता",

    householdMode:
      "घरायसी बजेट मोड",

    mainMenu:
      "मुख्य मेनु",

    input:
      "प्रविष्टि",

    calendar:
      "पात्रो",

    graph:
      "ग्राफ",

    sunday: "आइत",
    monday: "सोम",
    tuesday: "मङ्गल",
    wednesday: "बुध",
    thursday: "बिही",
    friday: "शुक्र",
    saturday: "शनि",

    incomeLabel:
      "आम्दानी:",

    expenseLabel:
      "खर्च:",

    currency:
      "येन",

    detailsList:
      "विवरण सूची",

    date:
      "मिति",

    item:
      "श्रेणी",

    amount:
      "रकम",

    action:
      "कार्य",

    delete:
      "मेटाउनुहोस्",

    emptyMonth:
      "यस महिनामा कुनै विवरण छैन",

    logoutConfirm:
      "लग आउट गर्न चाहनुहुन्छ?",

    deleteConfirm:
      "यो विवरण मेटाउन चाहनुहुन्छ?",

    previousMonth:
      "अघिल्लो महिना",

    nextMonth:
      "अर्को महिना",

    uncategorized:
      "वर्गीकरण नगरिएको",

    monthFormat: (year, month) =>
      `${year} साल ${month} महिना`,
  },

  si: {
     memo: "සටහන",
    pageTitle:
      "ඉතිරිකිරීම් පරීක්ෂකය | දින දර්ශනය",

    userSuffix: "",

    backToMode:
      "← මාදිලි තේරීමට ආපසු",

    logout:
      "ඉවත් වන්න",

    appTitle:
      "ඉතිරිකිරීම් පරීක්ෂකය",

    householdMode:
      "ගෘහස්ථ අයවැය මාදිලිය",

    mainMenu:
      "ප්‍රධාන මෙනුව",

    input:
      "ඇතුළත් කිරීම",

    calendar:
      "දින දර්ශනය",

    graph:
      "ප්‍රස්තාරය",

    sunday: "ඉරි",
    monday: "සඳු",
    tuesday: "අඟ",
    wednesday: "බදා",
    thursday: "බ්‍රහ",
    friday: "සිකු",
    saturday: "සෙන",

    incomeLabel:
      "ආදායම:",

    expenseLabel:
      "වියදම:",

    currency:
      "යෙන්",

    detailsList:
      "ගනුදෙනු විස්තර",

    date:
      "දිනය",

    item:
      "කාණ්ඩය",

    amount:
      "මුදල",

    action:
      "ක්‍රියාව",

    delete:
      "මකන්න",

    emptyMonth:
      "මෙම මාසයට ගනුදෙනු නොමැත",

    logoutConfirm:
      "ඉවත් වීමට අවශ්‍යද?",

    deleteConfirm:
      "මෙම ගනුදෙනුව මකා දැමීමට අවශ්‍යද?",

    previousMonth:
      "පෙර මාසය",

    nextMonth:
      "ඊළඟ මාසය",

    uncategorized:
      "කාණ්ඩගත කර නැත",

    monthFormat: (year, month) =>
      `${year} වසර ${month} මාසය`,
  },


};


/* ==============================
   使用する翻訳を取得
============================== */

function getTexts() {
  return (
    calendarTranslations[currentLanguage] ||
    calendarTranslations.ja
  );
}


/* ==============================
   固定文言の翻訳
============================== */

function applyCalendarLanguage() {
  const texts =
    getTexts();

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


/* ==============================
   ユーザー名
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
    getTexts();

  const suffix =
    texts.userSuffix || "";

  userDisplay.textContent =
    suffix
      ? `${currentUser} ${suffix}`
      : currentUser;
}


/* ==============================
   カテゴリ翻訳
============================== */

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
      クレカ: "クレカ",
      医療費: "医療費",
      保険代: "保険代",
      美容: "美容",
      洋服: "洋服",
      給料: "給料",
      臨時収入: "臨時収入",
      おこづかい: "おこづかい",
    },

    en: {
      学費: "Tuition",
      家賃: "Rent",
      光熱費: "Utilities",
      交通費: "Transportation",
      娯楽費: "Entertainment",
      サブスク: "Subscriptions",
      食費: "Food",
      クレカ: "Credit card",
      医療費: "Medical expenses",
      保険代: "Insurance",
      美容: "Beauty",
      洋服: "Clothing",
      給料: "Salary",
      臨時収入: "Extra income",
      おこづかい: "Allowance",
    },

    my: {
      学費: "ကျောင်းလခ",
      家賃: "အိမ်ငှားခ",
      光熱費: "မီးနှင့်ရေဖိုး",
      交通費: "သွားလာရေး",
      娯楽費: "ဖျော်ဖြေရေး",
      サブスク: "စာရင်းသွင်းဝန်ဆောင်မှု",
      食費: "အစားအသောက်",
      クレカ: "ခရက်ဒစ်ကတ်",
      医療費: "ဆေးကုသစရိတ်",
      保険代: "အာမခံ",
      美容: "အလှအပ",
      洋服: "အဝတ်အစား",
      給料: "လစာ",
      臨時収入: "အပိုဝင်ငွေ",
      おこづかい: "မုန့်ဖိုး",
    },

    id: {
      学費: "Biaya pendidikan",
      家賃: "Sewa",
      光熱費: "Utilitas",
      交通費: "Transportasi",
      娯楽費: "Hiburan",
      サブスク: "Langganan",
      食費: "Makanan",
      クレカ: "Kartu kredit",
      医療費: "Biaya medis",
      保険代: "Asuransi",
      美容: "Kecantikan",
      洋服: "Pakaian",
      給料: "Gaji",
      臨時収入: "Pendapatan tambahan",
      おこづかい: "Uang saku",
    },

    "zh-CN": {
      学費: "学费",
      家賃: "房租",
      光熱費: "水电燃气费",
      交通費: "交通费",
      娯楽費: "娱乐费",
      サブスク: "订阅服务",
      食費: "餐饮",
      クレカ: "信用卡",
      医療費: "医疗费",
      保険代: "保险费",
      美容: "美容",
      洋服: "服装",
      給料: "工资",
      臨時収入: "临时收入",
      おこづかい: "零用钱",
    },

    "zh-TW": {
      学費: "學費",
      家賃: "房租",
      光熱費: "水電瓦斯費",
      交通費: "交通費",
      娯楽費: "娛樂費",
      サブスク: "訂閱服務",
      食費: "餐飲",
      クレカ: "信用卡",
      医療費: "醫療費",
      保険代: "保險費",
      美容: "美容",
      洋服: "服裝",
      給料: "薪資",
      臨時収入: "臨時收入",
      おこづかい: "零用錢",
    },

    ru: {
      学費: "Обучение",
      家賃: "Аренда",
      光熱費: "Коммунальные услуги",
      交通費: "Транспорт",
      娯楽費: "Развлечения",
      サブスク: "Подписки",
      食費: "Питание",
      クレカ: "Кредитная карта",
      医療費: "Медицинские расходы",
      保険代: "Страхование",
      美容: "Красота",
      洋服: "Одежда",
      給料: "Зарплата",
      臨時収入: "Дополнительный доход",
      おこづかい: "Карманные деньги",
    },

    vi: {
      学費: "Học phí",
      家賃: "Tiền thuê nhà",
      光熱費: "Điện nước",
      交通費: "Đi lại",
      娯楽費: "Giải trí",
      サブスク: "Dịch vụ đăng ký",
      食費: "Ăn uống",
      クレカ: "Thẻ tín dụng",
      医療費: "Chi phí y tế",
      保険代: "Bảo hiểm",
      美容: "Làm đẹp",
      洋服: "Quần áo",
      給料: "Lương",
      臨時収入: "Thu nhập thêm",
      おこづかい: "Tiền tiêu vặt",
    },

    ko: {
      学費: "학비",
      家賃: "월세",
      光熱費: "공과금",
      交通費: "교통비",
      娯楽費: "오락비",
      サブスク: "구독",
      食費: "식비",
      クレカ: "신용카드",
      医療費: "의료비",
      保険代: "보험료",
      美容: "미용",
      洋服: "의류",
      給料: "급여",
      臨時収入: "임시 수입",
      おこづかい: "용돈",
    },

    th: {
      学費: "ค่าเล่าเรียน",
      家賃: "ค่าเช่า",
      光熱費: "ค่าน้ำค่าไฟ",
      交通費: "ค่าเดินทาง",
      娯楽費: "ค่าความบันเทิง",
      サブスク: "บริการสมัครสมาชิก",
      食費: "ค่าอาหาร",
      クレカ: "บัตรเครดิต",
      医療費: "ค่ารักษาพยาบาล",
      保険代: "ค่าประกัน",
      美容: "ความงาม",
      洋服: "เสื้อผ้า",
      給料: "เงินเดือน",
      臨時収入: "รายได้พิเศษ",
      おこづかい: "เงินค่าขนม",
    },

    es: {
      学費: "Matrícula",
      家賃: "Alquiler",
      光熱費: "Servicios",
      交通費: "Transporte",
      娯楽費: "Entretenimiento",
      サブスク: "Suscripciones",
      食費: "Alimentación",
      クレカ: "Tarjeta de crédito",
      医療費: "Gastos médicos",
      保険代: "Seguro",
      美容: "Belleza",
      洋服: "Ropa",
      給料: "Salario",
      臨時収入: "Ingresos extra",
      おこづかい: "Dinero de bolsillo",
    },

    "pt-BR": {
      学費: "Mensalidade escolar",
      家賃: "Aluguel",
      光熱費: "Contas domésticas",
      交通費: "Transporte",
      娯楽費: "Entretenimento",
      サブスク: "Assinaturas",
      食費: "Alimentação",
      クレカ: "Cartão de crédito",
      医療費: "Despesas médicas",
      保険代: "Seguro",
      美容: "Beleza",
      洋服: "Roupas",
      給料: "Salário",
      臨時収入: "Renda extra",
      おこづかい: "Mesada",
    },

        ne: {
      学費: "शिक्षण शुल्क",
      家賃: "घरभाडा",
      光熱費: "बिजुली, पानी र ग्यास",
      交通費: "यातायात खर्च",
      娯楽費: "मनोरञ्जन खर्च",
      サブスク: "सदस्यता",
      食費: "खाना खर्च",

      クレカ: "क्रेडिट कार्ड",
      クレジットカード: "क्रेडिट कार्ड",

      医療費: "चिकित्सा खर्च",
      保険代: "बीमा खर्च",
      美容: "सौन्दर्य",
      洋服: "कपडा",
      日用品: "दैनिक उपभोगका सामान",

      給料: "तलब",
      臨時収入: "अतिरिक्त आम्दानी",
      おこづかい: "खल्ती खर्च",
    },

    si: {
      学費: "අධ්‍යාපන ගාස්තු",
      家賃: "නිවාස කුලිය",
      光熱費: "ජල, විදුලි හා ගෑස් ගාස්තු",
      交通費: "ගමනාගමන වියදම්",
      娯楽費: "විනෝදාස්වාද වියදම්",
      サブスク: "දායකත්ව සේවා",
      食費: "ආහාර වියදම්",

      クレカ: "ක්‍රෙඩිට් කාඩ්පත",
      クレジットカード: "ක්‍රෙඩිට් කාඩ්පත",

      医療費: "වෛද්‍ය වියදම්",
      保険代: "රක්ෂණ ගාස්තු",
      美容: "රූපලාවණ්‍ය",
      洋服: "ඇඳුම්",
      日用品: "දෛනික භාවිත ද්‍රව්‍ය",

      給料: "වැටුප",
      臨時収入: "අමතර ආදායම",
      おこづかい: "අතේ වියදම් මුදල්",
    },
  };

  const languageCategories =
    categoryTranslations[currentLanguage] ||
    categoryTranslations.ja;

  return (
    languageCategories[category] ||
    category ||
    getTexts().uncategorized
  );
}


/* ==============================
   金額表示
============================== */

function getNumberLocale() {
  const localeMap = {
    ja: "ja-JP",
    en: "en-US",
    my: "my-MM",
    id: "id-ID",
    "zh-CN": "zh-CN",
    "zh-TW": "zh-TW",
    ru: "ru-RU",
    vi: "vi-VN",
    ko: "ko-KR",
    th: "th-TH",
    es: "es-ES",
    "pt-BR": "pt-BR",
        ne: "ne-NP",
    si: "si-LK",
  };

  return (
    localeMap[currentLanguage] ||
    "ja-JP"
  );
}

function formatNumber(value) {
  return Number(value).toLocaleString(
    getNumberLocale()
  );
}

function formatCurrency(value) {
  const texts =
    getTexts();

  const formatted =
    formatNumber(value);

  return currentLanguage === "ja"
    ? `${formatted}${texts.currency}`
    : `${formatted} ${texts.currency}`;
}


/* ==============================
   ログアウト
============================== */

function handleLogout() {
  const result =
    confirm(
      getTexts().logoutConfirm
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
   カレンダー表示
============================== */

function showCalendar() {
  const texts =
    getTexts();

  const monthTitle =
    document.getElementById(
      "monthTitle"
    );

  const calendar =
    document.getElementById(
      "calendar"
    );

  if (
    !monthTitle ||
    !calendar
  ) {
    return;
  }

  monthTitle.textContent =
    texts.monthFormat(
      year,
      month + 1
    );

  calendar.innerHTML = "";

  const firstDay =
    new Date(
      year,
      month,
      1
    ).getDay();

  const lastDate =
    new Date(
      year,
      month + 1,
      0
    ).getDate();

  let income = 0;
  let expense = 0;

  for (
    let index = 0;
    index < firstDay;
    index++
  ) {
    calendar.insertAdjacentHTML(
      "beforeend",
      `
        <div
          class="day empty"
          aria-hidden="true"
        ></div>
      `
    );
  }

  for (
    let day = 1;
    day <= lastDate;
    day++
  ) {
    let dailyText = "";

    data.forEach((item) => {
      const itemDate =
        new Date(
          `${item.date}T00:00:00`
        );

      if (
        Number.isNaN(
          itemDate.getTime()
        )
      ) {
        return;
      }

      if (
        itemDate.getFullYear() !== year ||
        itemDate.getMonth() !== month ||
        itemDate.getDate() !== day
      ) {
        return;
      }

      const amount =
        Number(item.amount) || 0;

      const isIncome =
        item.type === "収入";

      const mark =
        isIncome ? "+" : "-";

      const className =
        isIncome
          ? "plus"
          : "minus";

      dailyText += `
        <div class="memo ${className}">
          ${mark}${formatNumber(amount)}
        </div>
      `;

      if (isIncome) {
        income += amount;
      } else {
        expense += amount;
      }
    });

    const isToday =
      year === now.getFullYear() &&
      month === now.getMonth() &&
      day === now.getDate();

    const todayClass =
      isToday
        ? "today"
        : "";

    calendar.insertAdjacentHTML(
      "beforeend",
      `
        <div class="day ${todayClass}">
          <div class="day-number">
            ${day}
          </div>

          ${dailyText}
        </div>
      `
    );
  }

  const incomeElement =
    document.getElementById(
      "income"
    );

  const expenseElement =
    document.getElementById(
      "expense"
    );

  if (incomeElement) {
    incomeElement.textContent =
      formatNumber(income);
  }

  if (expenseElement) {
    expenseElement.textContent =
      formatNumber(expense);
  }

  showTable();
}


/* ==============================
   明細一覧
============================== */

function showTable() {
  const listBody =
    document.getElementById(
      "listBody"
    );

  if (!listBody) {
    return;
  }

  const texts =
    getTexts();

  listBody.innerHTML = "";

  let hasData = false;

  data.forEach(
    (item, index) => {
      const itemDate =
        new Date(
          `${item.date}T00:00:00`
        );

      if (
        Number.isNaN(
          itemDate.getTime()
        )
      ) {
        return;
      }

      if (
        itemDate.getFullYear() !== year ||
        itemDate.getMonth() !== month
      ) {
        return;
      }

      hasData = true;

      const amount =
        Number(item.amount) || 0;

      const isIncome =
        item.type === "収入";

      const mark =
        isIncome
          ? "+"
          : "-";

      const className =
        isIncome
          ? "plus"
          : "minus";

      const category =
        getTranslatedCategory(
          item.category
        );

      listBody.insertAdjacentHTML(
        "beforeend",
        `
          <tr>
            <td>
              ${item.date}
            </td>

            <td>
  ${category}
</td>

<td>
  ${item.memo || "－"}
</td>

<td class="${className}">
  ${mark}${formatCurrency(amount)}
</td>

            <td>
              <button
                type="button"
                onclick="deleteData(${index})"
              >
                ${texts.delete}
              </button>
            </td>
          </tr>
        `
      );
    }
  );

  if (!hasData) {
    listBody.innerHTML = `
      <tr>
        <td
          colspan="5"
          class="empty-message"
        >
          ${texts.emptyMonth}
        </td>
      </tr>
    `;
  }
}


/* ==============================
   データ削除
============================== */

function deleteData(index) {
  const isConfirmed =
    confirm(
      getTexts().deleteConfirm
    );

  if (!isConfirmed) {
    return;
  }

  data.splice(
    index,
    1
  );

  localStorage.setItem(
    storageKey,
    JSON.stringify(data)
  );

  showCalendar();
}


/* ==============================
   前月
============================== */

function prevMonth() {
  month--;

  if (month < 0) {
    month = 11;
    year--;
  }

  showCalendar();
}


/* ==============================
   次月
============================== */

function nextMonth() {
  month++;

  if (month > 11) {
    month = 0;
    year++;
  }

  showCalendar();
}


/* ==============================
   初期処理
============================== */

applyCalendarLanguage();
showUser();
showCalendar();