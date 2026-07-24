/* =========================================================
   js/lastweek.js
   先週の入力漏れを履歴に追加する画面
   ========================================================= */

const currentUser =
  localStorage.getItem("currentUser") || "guest";

const historyKey = `history_${currentUser}`;

let draftExpenses = [];

/* =========================================================
   翻訳
   ========================================================= */

const currentLanguage =
  localStorage.getItem("appLanguage") || "ja";

const lastweekTranslations = {
  ja: {
    pageTitle: "先週の入力漏れ",
    weekHelp:
      "ここで追加した支出は、先週の履歴に保存されます。",
    amount: "金額",
    amountPlaceholder: "例）1200",
    yenUnit: "円",
    category: "カテゴリ",

    categoryFood: "食費",
    categoryTransport: "交通費",
    categoryDailyGoods: "日用品",
    categoryEntertainment: "娯楽",
    categoryStudy: "学習",
    categoryImpulse: "衝動買い",

    satisfaction: "満足度",
    satisfactionRegret: "後悔",
    satisfactionPoor: "いまいち",
    satisfactionNormal: "普通",
    satisfactionSatisfied: "満足",
    satisfactionVerySatisfied: "大満足",

    necessaryCheck:
      "必需品だったらチェック",

    add: "入力リストに追加",
    draftLabel: "追加する支出",
    total: "合計",
    empty: "まだ入力されていません。",
    save: "先週の履歴に保存",
    back: "← メイン画面に戻る",

    necessary: "必需品",
    delete: "削除",

    alertAmount:
      "金額を入力してください。",
    alertNoExpenses:
      "保存する支出がありません。",
    savedMessage:
      "件を先週の履歴に追加しました！",
    count: "件",
  },

  en: {
    pageTitle: "Missed Entries from Last Week",
    weekHelp:
      "Expenses added here will be saved to last week's history.",
    amount: "Amount",
    amountPlaceholder: "e.g. 1200",
    yenUnit: "yen",
    category: "Category",

    categoryFood: "Food",
    categoryTransport: "Transportation",
    categoryDailyGoods: "Daily necessities",
    categoryEntertainment: "Entertainment",
    categoryStudy: "Education",
    categoryImpulse: "Impulse purchase",

    satisfaction: "Satisfaction",
    satisfactionRegret: "Regret",
    satisfactionPoor: "Not great",
    satisfactionNormal: "Neutral",
    satisfactionSatisfied: "Satisfied",
    satisfactionVerySatisfied: "Very satisfied",

    necessaryCheck:
      "Check if it was necessary",

    add: "Add to list",
    draftLabel: "Expenses to add",
    total: "Total",
    empty: "Nothing has been entered yet.",
    save: "Save to last week's history",
    back: "← Back to main screen",

    necessary: "Necessary",
    delete: "Delete",

    alertAmount:
      "Please enter an amount.",
    alertNoExpenses:
      "There are no expenses to save.",
    savedMessage:
      " item(s) added to last week's history!",
    count: " items",
  },

  my: {
    pageTitle:
      "ပြီးခဲ့သည့်အပတ် မဖြည့်ရသေးသောအသုံးစရိတ်",
    weekHelp:
      "ဤနေရာတွင် ထည့်သောအသုံးစရိတ်များကို ပြီးခဲ့သည့်အပတ်မှတ်တမ်းတွင် သိမ်းဆည်းပါမည်။",
    amount: "ငွေပမာဏ",
    amountPlaceholder: "ဥပမာ 1200",
    yenUnit: "ယန်း",
    category: "အမျိုးအစား",

    categoryFood: "အစားအသောက်",
    categoryTransport: "သွားလာရေး",
    categoryDailyGoods: "နေ့စဉ်သုံးပစ္စည်း",
    categoryEntertainment: "ဖျော်ဖြေရေး",
    categoryStudy: "ပညာသင်ကြားရေး",
    categoryImpulse: "အလျင်စလိုဝယ်ယူမှု",

    satisfaction: "ကျေနပ်မှု",
    satisfactionRegret: "နောင်တရ",
    satisfactionPoor: "သိပ်မကောင်း",
    satisfactionNormal: "ပုံမှန်",
    satisfactionSatisfied: "ကျေနပ်",
    satisfactionVerySatisfied: "အလွန်ကျေနပ်",

    necessaryCheck:
      "လိုအပ်သောအသုံးစရိတ်ဖြစ်ပါက အမှန်ခြစ်ပါ",

    add: "စာရင်းသို့ထည့်ရန်",
    draftLabel: "ထည့်မည့်အသုံးစရိတ်",
    total: "စုစုပေါင်း",
    empty: "မဖြည့်ရသေးပါ။",
    save:
      "ပြီးခဲ့သည့်အပတ်မှတ်တမ်းသို့ သိမ်းရန်",
    back: "← ပင်မစာမျက်နှာသို့ ပြန်ရန်",

    necessary: "မရှိမဖြစ်",
    delete: "ဖျက်ရန်",

    alertAmount:
      "ငွေပမာဏကို ထည့်ပါ။",
    alertNoExpenses:
      "သိမ်းရန် အသုံးစရိတ်မရှိပါ။",
    savedMessage:
      " ခုကို ပြီးခဲ့သည့်အပတ်မှတ်တမ်းသို့ ထည့်ပြီးပါပြီ！",
    count: "ခု",
  },

  id: {
    pageTitle:
      "Entri yang Terlewat Minggu Lalu",
    weekHelp:
      "Pengeluaran yang ditambahkan di sini akan disimpan ke riwayat minggu lalu.",
    amount: "Jumlah",
    amountPlaceholder: "contoh: 1200",
    yenUnit: "yen",
    category: "Kategori",

    categoryFood: "Makanan",
    categoryTransport: "Transportasi",
    categoryDailyGoods: "Kebutuhan sehari-hari",
    categoryEntertainment: "Hiburan",
    categoryStudy: "Pendidikan",
    categoryImpulse: "Belanja impulsif",

    satisfaction: "Kepuasan",
    satisfactionRegret: "Menyesal",
    satisfactionPoor: "Kurang puas",
    satisfactionNormal: "Biasa",
    satisfactionSatisfied: "Puas",
    satisfactionVerySatisfied: "Sangat puas",

    necessaryCheck:
      "Centang jika merupakan kebutuhan",

    add: "Tambahkan ke daftar",
    draftLabel:
      "Pengeluaran yang akan ditambahkan",
    total: "Total",
    empty: "Belum ada yang dimasukkan.",
    save: "Simpan ke riwayat minggu lalu",
    back: "← Kembali ke layar utama",

    necessary: "Kebutuhan",
    delete: "Hapus",

    alertAmount:
      "Masukkan jumlah.",
    alertNoExpenses:
      "Tidak ada pengeluaran untuk disimpan.",
    savedMessage:
      " item ditambahkan ke riwayat minggu lalu!",
    count: " item",
  },

  "zh-CN": {
    pageTitle: "补充上周遗漏记录",
    weekHelp:
      "在这里添加的支出会保存到上周记录中。",
    amount: "金额",
    amountPlaceholder: "例：1200",
    yenUnit: "日元",
    category: "分类",

    categoryFood: "餐饮",
    categoryTransport: "交通费",
    categoryDailyGoods: "日用品",
    categoryEntertainment: "娱乐",
    categoryStudy: "学习",
    categoryImpulse: "冲动消费",

    satisfaction: "满意度",
    satisfactionRegret: "后悔",
    satisfactionPoor: "不太满意",
    satisfactionNormal: "一般",
    satisfactionSatisfied: "满意",
    satisfactionVerySatisfied: "非常满意",

    necessaryCheck:
      "如果是必需品请勾选",

    add: "添加到列表",
    draftLabel: "要添加的支出",
    total: "合计",
    empty: "尚未输入。",
    save: "保存到上周记录",
    back: "← 返回主页面",

    necessary: "必需品",
    delete: "删除",

    alertAmount: "请输入金额。",
    alertNoExpenses:
      "没有可保存的支出。",
    savedMessage:
      "条已添加到上周记录！",
    count: "条",
  },

  "zh-TW": {
    pageTitle: "補充上週遺漏記錄",
    weekHelp:
      "在這裡新增的支出會儲存到上週記錄中。",
    amount: "金額",
    amountPlaceholder: "例：1200",
    yenUnit: "日圓",
    category: "分類",

    categoryFood: "餐飲",
    categoryTransport: "交通費",
    categoryDailyGoods: "日用品",
    categoryEntertainment: "娛樂",
    categoryStudy: "學習",
    categoryImpulse: "衝動消費",

    satisfaction: "滿意度",
    satisfactionRegret: "後悔",
    satisfactionPoor: "不太滿意",
    satisfactionNormal: "普通",
    satisfactionSatisfied: "滿意",
    satisfactionVerySatisfied: "非常滿意",

    necessaryCheck:
      "如果是必需品請勾選",

    add: "新增到清單",
    draftLabel: "要新增的支出",
    total: "合計",
    empty: "尚未輸入。",
    save: "儲存到上週記錄",
    back: "← 返回主畫面",

    necessary: "必需品",
    delete: "刪除",

    alertAmount: "請輸入金額。",
    alertNoExpenses:
      "沒有可儲存的支出。",
    savedMessage:
      "筆已新增到上週記錄！",
    count: "筆",
  },

  ru: {
    pageTitle:
      "Пропущенные записи за прошлую неделю",
    weekHelp:
      "Добавленные здесь расходы будут сохранены в истории за прошлую неделю.",
    amount: "Сумма",
    amountPlaceholder: "например, 1200",
    yenUnit: "иен",
    category: "Категория",

    categoryFood: "Питание",
    categoryTransport: "Транспорт",
    categoryDailyGoods:
      "Товары первой необходимости",
    categoryEntertainment: "Развлечения",
    categoryStudy: "Обучение",
    categoryImpulse: "Импульсивная покупка",

    satisfaction: "Удовлетворённость",
    satisfactionRegret: "Сожалею",
    satisfactionPoor: "Не очень",
    satisfactionNormal: "Нормально",
    satisfactionSatisfied: "Доволен",
    satisfactionVerySatisfied:
      "Очень доволен",

    necessaryCheck:
      "Отметьте, если это было необходимо",

    add: "Добавить в список",
    draftLabel: "Расходы для добавления",
    total: "Итого",
    empty: "Пока ничего не введено.",
    save:
      "Сохранить в историю прошлой недели",
    back: "← Вернуться на главный экран",

    necessary: "Необходимое",
    delete: "Удалить",

    alertAmount: "Введите сумму.",
    alertNoExpenses:
      "Нет расходов для сохранения.",
    savedMessage:
      " записей добавлено в историю прошлой недели!",
    count: " шт.",
  },

  vi: {
    pageTitle:
      "Khoản bị bỏ sót tuần trước",
    weekHelp:
      "Các khoản chi thêm ở đây sẽ được lưu vào lịch sử tuần trước.",
    amount: "Số tiền",
    amountPlaceholder: "ví dụ: 1200",
    yenUnit: "yên",
    category: "Danh mục",

    categoryFood: "Ăn uống",
    categoryTransport: "Đi lại",
    categoryDailyGoods: "Đồ dùng hằng ngày",
    categoryEntertainment: "Giải trí",
    categoryStudy: "Học tập",
    categoryImpulse: "Mua sắm bốc đồng",

    satisfaction: "Mức độ hài lòng",
    satisfactionRegret: "Hối tiếc",
    satisfactionPoor: "Không tốt lắm",
    satisfactionNormal: "Bình thường",
    satisfactionSatisfied: "Hài lòng",
    satisfactionVerySatisfied:
      "Rất hài lòng",

    necessaryCheck:
      "Đánh dấu nếu đây là nhu cầu thiết yếu",

    add: "Thêm vào danh sách",
    draftLabel: "Khoản chi sẽ thêm",
    total: "Tổng",
    empty: "Chưa có dữ liệu.",
    save: "Lưu vào lịch sử tuần trước",
    back: "← Quay lại màn hình chính",

    necessary: "Thiết yếu",
    delete: "Xóa",

    alertAmount:
      "Vui lòng nhập số tiền.",
    alertNoExpenses:
      "Không có khoản chi để lưu.",
    savedMessage:
      " khoản đã được thêm vào lịch sử tuần trước!",
    count: " khoản",
  },

  ko: {
    pageTitle: "지난주 누락 입력",
    weekHelp:
      "여기에서 추가한 지출은 지난주 기록에 저장됩니다.",
    amount: "금액",
    amountPlaceholder: "예: 1200",
    yenUnit: "엔",
    category: "카테고리",

    categoryFood: "식비",
    categoryTransport: "교통비",
    categoryDailyGoods: "생활용품",
    categoryEntertainment: "오락",
    categoryStudy: "학습",
    categoryImpulse: "충동구매",

    satisfaction: "만족도",
    satisfactionRegret: "후회",
    satisfactionPoor: "아쉬움",
    satisfactionNormal: "보통",
    satisfactionSatisfied: "만족",
    satisfactionVerySatisfied: "매우 만족",

    necessaryCheck:
      "필수품이면 체크",

    add: "입력 목록에 추가",
    draftLabel: "추가할 지출",
    total: "합계",
    empty: "아직 입력되지 않았습니다.",
    save: "지난주 기록에 저장",
    back: "← 메인 화면으로 돌아가기",

    necessary: "필수품",
    delete: "삭제",

    alertAmount:
      "금액을 입력해 주세요.",
    alertNoExpenses:
      "저장할 지출이 없습니다.",
    savedMessage:
      "건을 지난주 기록에 추가했습니다!",
    count: "건",
  },

  th: {
    pageTitle:
      "รายการที่ตกหล่นของสัปดาห์ที่แล้ว",
    weekHelp:
      "รายจ่ายที่เพิ่มที่นี่จะถูกบันทึกไว้ในประวัติของสัปดาห์ที่แล้ว",
    amount: "จำนวนเงิน",
    amountPlaceholder: "เช่น 1200",
    yenUnit: "เยน",
    category: "หมวดหมู่",

    categoryFood: "อาหาร",
    categoryTransport: "การเดินทาง",
    categoryDailyGoods: "ของใช้ประจำวัน",
    categoryEntertainment: "ความบันเทิง",
    categoryStudy: "การเรียน",
    categoryImpulse: "ซื้อโดยไม่ได้วางแผน",

    satisfaction: "ความพึงพอใจ",
    satisfactionRegret: "เสียดาย",
    satisfactionPoor: "ไม่ค่อยดี",
    satisfactionNormal: "ปกติ",
    satisfactionSatisfied: "พอใจ",
    satisfactionVerySatisfied: "พอใจมาก",

    necessaryCheck:
      "เลือกหากเป็นของจำเป็น",

    add: "เพิ่มในรายการ",
    draftLabel: "รายจ่ายที่จะเพิ่ม",
    total: "รวม",
    empty: "ยังไม่มีข้อมูล",
    save:
      "บันทึกในประวัติสัปดาห์ที่แล้ว",
    back: "← กลับหน้าหลัก",

    necessary: "ของจำเป็น",
    delete: "ลบ",

    alertAmount:
      "กรุณากรอกจำนวนเงิน",
    alertNoExpenses:
      "ไม่มีรายจ่ายที่จะบันทึก",
    savedMessage:
      " รายการถูกเพิ่มในประวัติสัปดาห์ที่แล้ว!",
    count: " รายการ",
  },

  es: {
    pageTitle:
      "Entradas omitidas de la semana pasada",
    weekHelp:
      "Los gastos añadidos aquí se guardarán en el historial de la semana pasada.",
    amount: "Importe",
    amountPlaceholder: "ej. 1200",
    yenUnit: "yenes",
    category: "Categoría",

    categoryFood: "Comida",
    categoryTransport: "Transporte",
    categoryDailyGoods: "Artículos diarios",
    categoryEntertainment: "Entretenimiento",
    categoryStudy: "Estudio",
    categoryImpulse: "Compra impulsiva",

    satisfaction: "Satisfacción",
    satisfactionRegret: "Arrepentido",
    satisfactionPoor: "Regular",
    satisfactionNormal: "Normal",
    satisfactionSatisfied: "Satisfecho",
    satisfactionVerySatisfied: "Muy satisfecho",

    necessaryCheck:
      "Marcar si era necesario",

    add: "Añadir a la lista",
    draftLabel: "Gastos que se añadirán",
    total: "Total",
    empty:
      "Todavía no se ha introducido nada.",
    save:
      "Guardar en el historial de la semana pasada",
    back:
      "← Volver a la pantalla principal",

    necessary: "Necesario",
    delete: "Eliminar",

    alertAmount:
      "Introduce un importe.",
    alertNoExpenses:
      "No hay gastos para guardar.",
    savedMessage:
      " registro(s) añadidos al historial de la semana pasada!",
    count: " items",
  },

  "pt-BR": {
    pageTitle:
      "Lançamentos esquecidos da semana passada",
    weekHelp:
      "As despesas adicionadas aqui serão salvas no histórico da semana passada.",
    amount: "Valor",
    amountPlaceholder: "ex.: 1200",
    yenUnit: "ienes",
    category: "Categoria",

    categoryFood: "Alimentação",
    categoryTransport: "Transporte",
    categoryDailyGoods: "Itens do dia a dia",
    categoryEntertainment: "Entretenimento",
    categoryStudy: "Estudo",
    categoryImpulse: "Compra por impulso",

    satisfaction: "Satisfação",
    satisfactionRegret: "Arrependido",
    satisfactionPoor: "Mais ou menos",
    satisfactionNormal: "Normal",
    satisfactionSatisfied: "Satisfeito",
    satisfactionVerySatisfied: "Muito satisfeito",

    necessaryCheck:
      "Marque se era necessário",

    add: "Adicionar à lista",
    draftLabel: "Despesas a adicionar",
    total: "Total",
    empty: "Ainda não há lançamentos.",
    save:
      "Salvar no histórico da semana passada",
    back: "← Voltar à tela principal",

    necessary: "Necessário",
    delete: "Excluir",

    alertAmount:
      "Digite um valor.",
    alertNoExpenses:
      "Não há despesas para salvar.",
    savedMessage:
      " item(ns) foram adicionados ao histórico da semana passada!",
    count: " itens",
  },
};

/* =========================================================
   使用する翻訳を取得
   ========================================================= */

function getLastweekTexts() {
  return (
    lastweekTranslations[currentLanguage] ||
    lastweekTranslations.ja
  );
}


function getTranslatedCategoryName(category) {
  const texts = getLastweekTexts();

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

  return key
    ? texts[key]
    : category;
}

/* =========================================================
   翻訳を画面に反映
   ========================================================= */

function applyLastweekLanguage() {
  const texts =
    getLastweekTexts();

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

  if (window.lucide) {
    lucide.createIcons();
  }
}

/* =========================================================
   1. 月曜日〜日曜日の週情報を取得
   ========================================================= */

function getWeekInfo(date) {
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

  return {
    monday,
    sunday,

    // 履歴保存用
    label:
      `${monday.getFullYear()}年` +
      `${monday.getMonth() + 1}月` +
      `${monday.getDate()}日〜` +
      `${sunday.getMonth() + 1}月` +
      `${sunday.getDate()}日`,

    // 画面表示用
    displayLabel:
      `${formatDate(monday)} ～ ` +
      `${formatDate(sunday)}`,
  };
}
/* =========================================================
   2. 日付表示
   ========================================================= */
function formatDate(date) {
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
  };

  const locale =
    localeMap[currentLanguage] ||
    "ja-JP";

  return new Intl.DateTimeFormat(
    locale,
    {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    }
  ).format(date);
}

/* =========================================================
   3. 先週の情報を取得
   ========================================================= */

function getLastWeekInfo() {
  const lastWeekDate = new Date();

  lastWeekDate.setDate(
    lastWeekDate.getDate() - 7,
  );

  return getWeekInfo(lastWeekDate);
}
/* =========================================================
   4. 画面の初期表示
   ========================================================= */

function initializePage() {
  const weekLabel =
    document.getElementById("last-week-label");

  if (weekLabel) {
    weekLabel.textContent =
  getLastWeekInfo().displayLabel;
  }

  renderDraft();
}

/* =========================================================
   5. 支出を入力リストに追加
   ========================================================= */
function addDraftExpense() {
  const texts = getLastweekTexts();

  const amountInput =
    document.getElementById("amount");

  const categoryInput =
    document.getElementById("category");

  const selectedSatisfaction =
    document.querySelector(
      'input[name="satisfaction"]:checked'
    );

  const necessaryInput =
    document.getElementById("is-necessary");

  const amount =
    Number(amountInput.value);

  const category =
    categoryInput.value;

  const sat =
    Number(
      selectedSatisfaction?.value
    ) || 3;

  const isNecessary =
    necessaryInput.checked;

  if (!amount || amount <= 0) {
    alert(texts.alertAmount);

    amountInput.focus();
    return;
  }

  draftExpenses.push({
    amount,
    category,
    sat,
    isNecessary,
  });

  /* 1件追加するごとに10ポイント */
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

  renderDraft();

  /* 入力欄をリセット */
  amountInput.value = "";

  const defaultSatisfaction =
    document.querySelector(
      'input[name="satisfaction"][value="3"]'
    );

  if (defaultSatisfaction) {
    defaultSatisfaction.checked = true;
  }

  necessaryInput.checked = false;

  amountInput.focus();
}

/* =========================================================
   6. 入力リストを表示
   ========================================================= */

function renderDraft() {
  const texts = getLastweekTexts();

  const log =
    document.getElementById("draft-log");

  const totalElement =
    document.getElementById("draft-total");

  const countElement =
    document.getElementById("draft-count");

  const total =
    draftExpenses.reduce(
      (sum, expense) =>
        sum + Number(expense.amount),
      0
    );

  totalElement.textContent =
    total.toLocaleString();

  countElement.textContent =
    `${draftExpenses.length}${texts.count}`;

  log.innerHTML = "";

  if (draftExpenses.length === 0) {
    log.innerHTML = `
      <p class="empty-message">
        ${texts.empty}
      </p>
    `;

    return;
  }

  draftExpenses.forEach(
    (expense, index) => {
      const item =
        document.createElement("div");

      item.className =
        "draft-item";

      const necessaryTag =
        expense.isNecessary
          ? `
            <span class="necessary-tag">
              ${texts.necessary}
            </span>
          `
          : "";

      item.innerHTML = `
        <div class="draft-item-main">

          <strong>
            ${Number(
              expense.amount
            ).toLocaleString()}
            ${texts.yenUnit}
          </strong>

          <span>
            ${getTranslatedCategoryName(
              expense.category
            )}
          </span>

          <span>
            ${texts.satisfaction}：${expense.sat}
          </span>

          ${necessaryTag}

        </div>

        <button
          type="button"
          class="btn-delete"
          data-index="${index}"
        >
          ${texts.delete}
        </button>
      `;

      log.appendChild(item);
    }
  );

  const deleteButtons =
    document.querySelectorAll(
      ".btn-delete"
    );

  deleteButtons.forEach(
    (button) => {
      button.addEventListener(
        "click",
        function () {
          const index =
            Number(
              this.dataset.index
            );

          deleteDraftExpense(index);
        }
      );
    }
  );
}

/* =========================================================
   7. 入力リストから削除
   ========================================================= */

function deleteDraftExpense(index) {
  draftExpenses.splice(index, 1);
  renderDraft();
}

/* =========================================================
   8. 既存データを安全な形に直す
   ========================================================= */

function normalizeExpense(expense) {
  return {
    ...expense,

    amount:
      Number(expense.amount) || 0,

    sat:
      Number(expense.sat) || 3,

    isNecessary:
      expense.isNecessary === true,
  };
}
/* =========================================================
   履歴の日付文字列から開始日を取得
   ========================================================= */

function getHistoryStartDate(dateLabel) {
  const match = String(dateLabel).match(
    /(\d{4})年(\d{1,2})月(\d{1,2})日/,
  );

  if (!match) {
    return new Date(0);
  }

  const year = Number(match[1]);
  const month = Number(match[2]) - 1;
  const day = Number(match[3]);

  return new Date(year, month, day);
}

/* =========================================================
   9. 先週の履歴に保存
   ========================================================= */

function saveToLastWeekHistory() {
  const texts = getLastweekTexts();

  if (draftExpenses.length === 0) {
    alert(texts.alertNoExpenses);
    return;
  }

  const lastWeekInfo =
    getLastWeekInfo();

  let fullHistory;

  try {
    fullHistory =
      JSON.parse(
        localStorage.getItem(historyKey),
      ) || [];
  } catch (error) {
    fullHistory = [];
  }

  if (!Array.isArray(fullHistory)) {
    fullHistory = [];
  }

  const existingIndex =
    fullHistory.findIndex(
      (historyItem) =>
        historyItem.date ===
        lastWeekInfo.label,
    );

  const normalizedDraft =
    draftExpenses.map(normalizeExpense);

  if (existingIndex !== -1) {
    const existingDetails =
      Array.isArray(
        fullHistory[existingIndex].details,
      )
        ? fullHistory[
            existingIndex
          ].details.map(normalizeExpense)
        : [];

    const mergedDetails = [
      ...existingDetails,
      ...normalizedDraft,
    ];

    fullHistory[existingIndex].details =
      mergedDetails;

    fullHistory[existingIndex].total =
      mergedDetails.reduce(
        (sum, expense) =>
          sum + expense.amount,
        0,
      );
  } else {
    const total =
      normalizedDraft.reduce(
        (sum, expense) =>
          sum + expense.amount,
        0,
      );

    const newHistoryEntry = {
      date: lastWeekInfo.label,
      total,
      details: normalizedDraft,
    };

   fullHistory.push(
    newHistoryEntry,
    );
  }
  // 履歴を新しい週順に並び替える
    fullHistory.sort((a, b) => {
     return (
        getHistoryStartDate(b.date) -
        getHistoryStartDate(a.date)
    );
    });

  localStorage.setItem(
    historyKey,
    JSON.stringify(fullHistory),
  );

  const savedCount =
    draftExpenses.length;

  draftExpenses = [];
  renderDraft();

  alert(
  `${savedCount}${texts.savedMessage}`
);
}

/* =========================================================
   10. Enterキー対応
   ========================================================= */

function setupEvents() {
  const addButton =
    document.getElementById("add-button");

  const saveButton =
    document.getElementById("save-button");

  const amountInput =
    document.getElementById("amount");

  addButton.addEventListener(
    "click",
    addDraftExpense
  );

  saveButton.addEventListener(
    "click",
    saveToLastWeekHistory
  );

  amountInput.addEventListener(
    "keydown",
    function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
        addDraftExpense();
      }
    }
  );
}

/* =========================================================
   11. ページ起動
   ========================================================= */

document.addEventListener(
  "DOMContentLoaded",
  function () {
    applyLastweekLanguage();
    initializePage();
    setupEvents();

    if (window.lucide) {
      lucide.createIcons();
    }
  }
);