/* normal.js（入力画面専用 - FULL SINGLE USER VERSION） */

let stream;

// 1. CATEGORY LISTS / カテゴリーリスト
const expenseList = [
  "学費",
  "家賃",
  "光熱費",
  "交通費",
  "娯楽費",
  "サブスク",
  "食費",
  "クレジットカード",
  "医療費",
  "美容",
  "洋服",
];
const incomeList = ["給料", "臨時収入", "おこづかい"];

// 2. USER PRIVACY SYSTEM / ユーザー固有のプライバシーシステム
const currentUser = localStorage.getItem("currentUser") || "guest";
const storageKey = `kakeibo_${currentUser}`;

let data = JSON.parse(localStorage.getItem(storageKey)) || [];

// 3. PAGE INITIALIZATION / ページ初期表示の設定
window.addEventListener("DOMContentLoaded", () => {
  document.getElementById("date").valueAsDate = new Date();
  document.getElementById("type").value = "支出";

  changeCategory();
  showData();
  displayCurrentUser(); // 👈 Memanggil nama user saat dimuat

  document.getElementById("amount").addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      addData();
    }
  });
});

// 4. DISPLAY CURRENT USER / ログイン中のユーザー表示
function displayCurrentUser() {
  const userDisplayEl = document.getElementById("user-display");
  if (userDisplayEl) {
    const formattedUser =
      currentUser.charAt(0).toUpperCase() + currentUser.slice(1);
    userDisplayEl.textContent = `👤  ${formattedUser}`;
  }
}

// 5. DYNAMIC CATEGORY LOGIC / カテゴリーの動的切り替え
function changeCategory() {
  const type = document.getElementById("type").value;
  const category = document.getElementById("category");
  if (!category) return;

  category.innerHTML = "";
  const list = type === "支出" ? expenseList : incomeList;

  list.forEach((item) => {
    const option = document.createElement("option");
    option.value = item;
    option.textContent = item;
    category.appendChild(option);
  });
}

// 6. SAVE DATA FUNCTION / データ追加関数
function addData() {
  const date = document.getElementById("date").value;
  const type = document.getElementById("type").value;
  const category = document.getElementById("category").value;
  const amount = Number(document.getElementById("amount").value);
  const memo = document.getElementById("memo").value;

  if (date === "" || amount <= 0) {
    alert("入力してください / Please fill in the data correctly");
    return;
  }

  data.push({ date, type, category, amount, memo });
  localStorage.setItem(storageKey, JSON.stringify(data));

  showData();
  showToast("入力完了✔");

  document.getElementById("amount").value = "";
  document.getElementById("memo").value = "";
}

// 7. NOTIFIKASI TOAST / トースト通知機能
function showToast(msg) {
  const t = document.createElement("div");
  t.textContent = msg;
  t.style.cssText = `
    position: fixed; bottom: 20px; left: 50%; transform: translateX(-50%);
    background: #22c55e; color: white; padding: 10px 20px; border-radius: 10px;
    z-index: 9999; opacity: 1; transition: 0.5s;
  `;
  document.body.appendChild(t);
  setTimeout(() => {
    t.style.opacity = "0";
  }, 700);
  setTimeout(() => {
    t.remove();
  }, 1200);
}

// 8. CALCULATE TOTALS & LOG / 当月データの集計処理
function showData() {
  const log = document.getElementById("log");
  if (log) log.innerHTML = "";

  let income = 0;
  let expense = 0;

  const now = new Date();
  const thisMonth = now.getMonth();
  const thisYear = now.getFullYear();

  data.forEach((item) => {
    const d = new Date(item.date + "T00:00:00");
    const isThisMonth =
      d.getFullYear() === thisYear && d.getMonth() === thisMonth;

    if (isThisMonth) {
      if (item.type === "収入") income += item.amount;
      else expense += item.amount;
    }
  });
}

// 9. CAMERA & OCR CONTROL / カメラとレシート読み取りの制御
function stopCamera() {
  if (stream) {
    stream.getTracks().forEach((track) => track.stop());
  }
  document.getElementById("camera").srcObject = null;
  document.getElementById("cameraWrap").style.display = "none";
}

async function startCamera() {
  try {
    stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: "environment" },
      audio: false,
    });
    document.getElementById("camera").srcObject = stream;
    document.getElementById("cameraWrap").style.display = "block";
    setTimeout(() => {
      scanReceipt();
    }, 5000);
  } catch (err) {
    alert("Camera error / カメラエラー: " + err.message);
  }
}

async function scanReceipt() {
  const video = document.getElementById("camera");
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  const scanText = document.getElementById("scanText");
  let successCount = 0;

  const interval = setInterval(async () => {
    if (video.videoWidth === 0) return;
    scanText.textContent = "読み取り中 (Scanning)...";
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    try {
      const result = await Tesseract.recognize(canvas, "jpn");
      const text = result.data.text;

      if (
        text.includes("合計") ||
        text.includes("TOTAL") ||
        text.includes("税込")
      ) {
        successCount++;
      } else {
        successCount = 0;
      }

      if (successCount >= 1) {
        clearInterval(interval);
        scanText.textContent = "読み取り成功✔ (Success)";
        autoInput(text);
        addData();
        setTimeout(() => {
          stopCamera();
        }, 2000);
      }
    } catch (err) {
      console.error(err);
    }
  }, 3000);
}

// 10. AUTOMATIC INPUT FROM OCR / レシートデータの自動入力処理
function autoInput(text) {
  const match = text.match(/(?:合計|TOTAL|税込).*?([0-9,]{3,})/);
  if (match) {
    document.getElementById("amount").value = match[1].replace(/,/g, "");
  }

  if (
    text.includes("セブン") ||
    text.includes("ファミマ") ||
    text.includes("ローソン")
  ) {
    document.getElementById("category").value = "食費";
    document.getElementById("memo").value = "コンビニ";
  }
}

// 11. LOGOUT / ログアウト
function handleLogout() {
  if (confirm("ログアウトしますか？ / Do you want to logout?")) {
    localStorage.removeItem("currentUser");
    window.location.href = "login.html";
  }
}
