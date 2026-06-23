/* calendar.js（カレンダー画面専用 - VERSI FINAL BERSIH） */

// 1. USER PRIVACY SYSTEM / ユーザー固有のプライバシーシステム
const currentUser = localStorage.getItem("currentUser") || "guest";
const storageKey = `kakeibo_${currentUser}`; // Target key per logged-in user / ログインユーザー専用のキー

// Load current user's data / アクティブなユーザーのデータのみを読み込む
let data = JSON.parse(localStorage.getItem(storageKey)) || [];

// 2. TIME INITIALIZATION (FIXED) / 日付変数の初期化（修正：バグの原因を解決）
let current = new Date();
let year = current.getFullYear(); // [FIX] Extracted current year / 現在の年を取得
let month = current.getMonth(); // [FIX] Extracted current month / 現在の月を取得

// 3. PAGE INITIALIZATION / ページ読み込み時の初期表示
window.addEventListener("DOMContentLoaded", () => {
  showCalendar(); // Render calendar on load / 画面が開いた瞬間にカレンダーを描画
});

/* --- 4. DELETE DATA FUNCTION (FIXED: NO DUPLICATION) / データ削除関数（修正：重複を削除） --- */
function deleteData(index) {
  // Remove 1 item from array / 配列から指定データを削除
  data.splice(index, 1);

  // Save changes to user's unique key / ユーザー固有のキーに変更を保存
  localStorage.setItem(storageKey, JSON.stringify(data));

  // Refresh view / 画面を再描画して反映
  showCalendar();
}

// 5. RENDER CALENDAR LOGIC / カレンダー描画処理
function showCalendar() {
  // Set month title / 年月のタイトルを表示
  document.getElementById("monthTitle").textContent = `${year}年${month + 1}月`;

  const calendar = document.getElementById("calendar");
  const listBody = document.getElementById("listBody");

  calendar.innerHTML = "";
  if (listBody) listBody.innerHTML = ""; // Clear table body / テーブルを初期化

  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();

  let income = 0;
  let expense = 0;

  // Create empty blocks for previous month spaces / 月初めの空白マスを作成
  for (let i = 0; i < firstDay; i++) {
    calendar.innerHTML += `<div></div>`;
  }

  // Generate date cells / 日付マスの生成
  for (let day = 1; day <= lastDate; day++) {
    let text = "";

    data.forEach((item) => {
      const d = new Date(item.date + "T00:00:00");

      // Filter data by year, month, and day / 年・月・日が一致するデータを抽出
      if (
        d.getFullYear() === year &&
        d.getMonth() === month &&
        d.getDate() === day
      ) {
        const mark = item.type === "収入" ? "+" : "-";
        const className = item.type === "収入" ? "plus" : "minus";

        // Display transaction mark on calendar / カレンダー内に金額マークを表示
        text += `
          <div class="memo ${className}">
            ${mark}${item.amount}
          </div>
        `;

        // Calculate totals / 月間集計の計算
        if (item.type === "収入") {
          income += item.amount;
        } else {
          expense += item.amount;
        }
      }
    });

    // Append day cell to grid / カレンダーに日を追加
    calendar.innerHTML += `
      <div class="day">
        <div class="day-number">${day}</div>
        ${text}
      </div>
    `;
  }

  // Update total summary blocks / 画面の合計金額数値を更新
  document.getElementById("income").textContent = income;
  document.getElementById("expense").textContent = expense;
  document.getElementById("saving").textContent = income - expense;

  // Render the detailed table underneath / 下部の明細一覧表を描画
  showTable();
}

// 6. RENDER DETAILED TABLE / 明細一覧表の描画処理
function showTable() {
  const listBody = document.getElementById("listBody");
  if (!listBody) return;

  data.forEach((item, index) => {
    const d = new Date(item.date + "T00:00:00");

    // Filter table by current active month / 現在表示中の年月の明細のみを表示
    if (d.getFullYear() === year && d.getMonth() === month) {
      const mark = item.type === "収入" ? "+" : "-";

      listBody.innerHTML += `
        <tr>
          <td>${item.date}</td>
          <td>${item.category}</td>
          <td>${mark}${item.amount}</td>
          <td>
            <button onclick="deleteData(${index})">削除</button>
          </td>
        </tr>
      `;
    }
  });
}

// 7. MONTH NAVIGATION / 月の切り替え処理
function prevMonth() {
  month--;
  if (month < 0) {
    month = 11;
    year--;
  }
  showCalendar();
}

function nextMonth() {
  month++;
  if (month > 11) {
    month = 0;
    year++;
  }
  showCalendar();
}
