/* =========================================================
   js/lastweek.js
   先週の入力漏れを履歴に追加する画面
   ========================================================= */

const currentUser =
  localStorage.getItem("currentUser") || "guest";

const historyKey = `history_${currentUser}`;

let draftExpenses = [];

/* =========================================================
   1. 月曜日〜日曜日の週情報を取得
   ========================================================= */

function getWeekInfo(date) {
  const target = new Date(date);
  target.setHours(0, 0, 0, 0);

  // 日曜日を7として扱う
  const day = target.getDay() || 7;

  // 対象日の週の月曜日
  const monday = new Date(target);
  monday.setDate(target.getDate() - day + 1);

  // 同じ週の日曜日
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);

  return {
    monday,
    sunday,
    label:
      `${formatDate(monday)}〜${formatDate(sunday)}`,
  };
}

/* =========================================================
   2. 日付表示
   ========================================================= */

function formatDate(date) {
  return (
    `${date.getFullYear()}年` +
    `${date.getMonth() + 1}月` +
    `${date.getDate()}日`
  );
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
      getLastWeekInfo().label;
  }

  renderDraft();
}

/* =========================================================
   5. 支出を入力リストに追加
   ========================================================= */

function addDraftExpense() {
  const amountInput =
    document.getElementById("amount");

  const categoryInput =
    document.getElementById("category");

  const satInput =
    document.getElementById("sat");

  const necessaryInput =
    document.getElementById("is-necessary");

  const amount = Number(amountInput.value);
  const category = categoryInput.value;
  const sat = Number(satInput.value);

  const isNecessary =
    necessaryInput.checked;

  if (!amount || amount <= 0) {
    alert("金額を入力してください。");
    amountInput.focus();
    return;
  }

  if (
    !Number.isInteger(sat) ||
    sat < 1 ||
    sat > 5
  ) {
    alert("満足度は1〜5で入力してください。");
    satInput.focus();
    return;
  }

  draftExpenses.push({
    amount,
    category,
    sat,
    isNecessary,
  });

  renderDraft();

  amountInput.value = "";
  satInput.value = "";
  necessaryInput.checked = false;

  amountInput.focus();
}

/* =========================================================
   6. 入力リストを表示
   ========================================================= */

function renderDraft() {
  const log =
    document.getElementById("draft-log");

  const totalElement =
    document.getElementById("draft-total");

  const countElement =
    document.getElementById("draft-count");

  const total = draftExpenses.reduce(
    (sum, expense) =>
      sum + Number(expense.amount),
    0,
  );

  totalElement.textContent =
    total.toLocaleString();

  countElement.textContent =
    `${draftExpenses.length}件`;

  log.innerHTML = "";

  if (draftExpenses.length === 0) {
    log.innerHTML = `
      <p class="empty-message">
        まだ入力されていません。
      </p>
    `;

    return;
  }

  draftExpenses.forEach(
    (expense, index) => {
      const item =
        document.createElement("div");

      item.className = "draft-item";

      const necessaryTag =
        expense.isNecessary
          ? `<span class="necessary-tag">必需品</span>`
          : "";

      item.innerHTML = `
        <div class="draft-item-main">
          <strong>
            ${Number(expense.amount).toLocaleString()}円
          </strong>

          <span>
            ${expense.category}
          </span>

          <span>
            満足度：${expense.sat}
          </span>

          ${necessaryTag}
        </div>

        <button
          type="button"
          class="btn-delete"
          data-index="${index}"
        >
          削除
        </button>
      `;

      log.appendChild(item);
    },
  );

  const deleteButtons =
    document.querySelectorAll(".btn-delete");

  deleteButtons.forEach((button) => {
    button.addEventListener(
      "click",
      function () {
        const index =
          Number(this.dataset.index);

        deleteDraftExpense(index);
      },
    );
  });
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
  if (draftExpenses.length === 0) {
    alert("保存する支出がありません。");
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
    `${savedCount}件を先週の履歴に追加しました！`,
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

  const satInput =
    document.getElementById("sat");

  addButton.addEventListener(
    "click",
    addDraftExpense,
  );

  saveButton.addEventListener(
    "click",
    saveToLastWeekHistory,
  );

  amountInput.addEventListener(
    "keydown",
    function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
        addDraftExpense();
      }
    },
  );

  satInput.addEventListener(
    "keydown",
    function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
        addDraftExpense();
      }
    },
  );
}

/* =========================================================
   11. ページ起動
   ========================================================= */

document.addEventListener(
  "DOMContentLoaded",
  function () {
    initializePage();
    setupEvents();
  },
);