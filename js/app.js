/* ==========================================================================
   js/app.js（メイン画面専用 - CLEAN & NUMBERED VERSION）
   ========================================================================== */

const currentUser = localStorage.getItem("currentUser") || "guest";
const storageKey = `expenses_${currentUser}`;

/* Global Variables / グローバル変数 */
let myChart = null;

// localStorageからデータを読み込む。空なら空配列を作成
let expenses = JSON.parse(localStorage.getItem(storageKey)) || [];

// 1. Function: getWeekIdentifier
function getWeekIdentifier(date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);

  // Set ke hari Kamis terdekat untuk menentukan bulan dominan di minggu tersebut (Standar ISO)
  const day = d.getDay() || 7;
  d.setDate(d.getDate() + 4 - day);

  const year = d.getFullYear();
  const monthNames = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];
  const monthName = monthNames[d.getMonth()];

  // Hitung minggu ke-berapa di bulan tersebut
  const firstPositionOfMonth = new Date(d.getFullYear(), d.getMonth(), 1);
  const firstPositionDay = firstPositionOfMonth.getDay() || 7;

  // Jarak hari dari Senin pertama bulan itu
  const offset = d.getDate() + (firstPositionDay - 1);
  const weekOfMonth = Math.ceil(offset / 7);

  return `${monthName} ${year} - W ${weekOfMonth}`;
}

// 2. Function: checkWeeklyReset
function checkWeeklyReset() {
  const lastResetKey = `last_reset_time_${currentUser}`;
  const lastResetTime = localStorage.getItem(lastResetKey);
  const sekarang = new Date();

  // Ambil label nama minggu saat ini untuk keperluan laporan/history
  const currentWeekLabel = getWeekIdentifier(sekarang);

  if (lastResetTime) {
    const tanggalLalu = new Date(Number(lastResetTime));

    // Hitung selisih hari antara aktivitas terakhir dengan sekarang
    const selisihMilidetik = sekarang - tanggalLalu;
    const selisihHari = selisihMilidetik / (1000 * 60 * 60 * 24);

    // Cari tahu hari apa aktivitas terakhir dilakukan (0 = Minggu, 1 = Senin, dst)
    const hariLalu = tanggalLalu.getDay() || 7;
    const hariSekarang = sekarang.getDay() || 7;

    /* Sistem Otomatis Reset jika:
      1. Selisihnya sudah 7 hari atau lebih, ATAU
      2. Hari ini melewati hari Senin sejak aktivitas terakhir (Hari sekarang < Hari lalu tapi sudah beda tanggal)
    */
    if (selisihHari >= 7 || (selisihHari >= 1 && hariSekarang < hariLalu)) {
      const mingguLaluLabel =
        localStorage.getItem(`last_active_week_${currentUser}`) ||
        currentWeekLabel;

      // Jalankan pengarsipan otomatis (isAutomated = true) -> memicu koin & pending_report versi Jepang!
      autoArchiveWeek(mingguLaluLabel, true);
    }
  }

  // Perbarui database dengan waktu dan nama minggu terbaru agar siap untuk perhitungan minggu depan
  localStorage.setItem(lastResetKey, sekarang.getTime().toString());
  localStorage.setItem(`last_active_week_${currentUser}`, currentWeekLabel);
}

// 3. LOG FILE AUTOMATIC ARCHIVE
function autoArchiveWeek(weekLabel, isAutomated = false) {
  const totalAmount = expenses.reduce((s, e) => s + e.amount, 0);
  const BATAS_MINGGUAN =
    Number(localStorage.getItem(`limit_${currentUser}`)) || 20000;

  if (isAutomated) {
    let performaPersen = 0;

    if (totalAmount === 0) {
      performaPersen = 100;
    } else {
      performaPersen = Math.round(
        ((BATAS_MINGGUAN - totalAmount) / BATAS_MINGGUAN) * 100,
      );
    }

    // Mengubah format label ke bahasa Jepang untuk tampilan laporan modal
    let displayWeek = weekLabel;
    if (weekLabel.includes("W")) {
      const parts = weekLabel.split(" - W ");
      displayWeek = `${parts[0]} 第${parts[1]}週`;
    }

    const reportData = {
      week: displayWeek,
      total: totalAmount,
      limit: BATAS_MINGGUAN,
      percent: performaPersen,
    };

    // Simpan nota laporan ke database browser
    localStorage.setItem(
      `pending_report_${currentUser}`,
      JSON.stringify(reportData),
    );

    // Berikan koin bonus jika sukses hemat
    if (totalAmount <= BATAS_MINGGUAN) {
      const pointKey = `points_${currentUser}`;
      let currentPoints = Number(localStorage.getItem(pointKey)) || 0;
      currentPoints += 100;
      localStorage.setItem(pointKey, currentPoints);
    }
  }

  const historyKey = `history_${currentUser}`;
  let fullHistory = JSON.parse(localStorage.getItem(historyKey)) || [];
  const targetLabel = weekLabel;
  const existingWeekIndex = fullHistory.findIndex(
    (item) => item.date === targetLabel,
  );

  if (existingWeekIndex !== -1) {
    fullHistory[existingWeekIndex].total += totalAmount;
    fullHistory[existingWeekIndex].details =
      fullHistory[existingWeekIndex].details.concat(expenses);
  } else {
    const historyEntry = {
      date: targetLabel,
      total: totalAmount,
      details: expenses,
    };
    fullHistory.unshift(historyEntry);
  }
  localStorage.setItem(historyKey, JSON.stringify(fullHistory));

  expenses = [];
  localStorage.setItem(storageKey, JSON.stringify(expenses));
}

// 4. DISPLAY CURRENT USER / ログイン中のユーザー表示
function displayCurrentUser() {
  const userDisplayEl = document.getElementById("user-display");
  if (userDisplayEl) {
    const formattedUser =
      currentUser.charAt(0).toUpperCase() + currentUser.slice(1);
    userDisplayEl.textContent = `👤  ${formattedUser}`;
  }
}

// 5. SAVE EXPENSE / 支出の追加
function addExpense() {
  const amount = Number(document.getElementById("amount").value);
  const category = document.getElementById("category").value;
  const sat = Number(document.getElementById("sat").value) || 3;

  // Menangkap status apakah pengeluaran ini penting/terpaksa (必要)
  const isNecessary = document.getElementById("is-necessary")
    ? document.getElementById("is-necessary").checked
    : false;

  if (!amount) return;

  expenses.push({ amount, category, sat, isNecessary });
  localStorage.setItem(storageKey, JSON.stringify(expenses));

  rabbitHurt(amount);
  updateTotal();
  renderLog();

  document.getElementById("amount").value = "";
  document.getElementById("sat").value = "";
  if (document.getElementById("is-necessary")) {
    document.getElementById("is-necessary").checked = false;
  }
}

// 6. REFRESH LOG DISPLAY / ログの再描画
function renderLog() {
  const logContainer = document.getElementById("log");
  if (!logContainer) return;

  logContainer.innerHTML = "";

  for (let i = expenses.length - 1; i >= 0; i--) {
    const div = document.createElement("div");
    div.className = "log-item";

    const tagNecessary = expenses[i].isNecessary
      ? `<span class="tag-necessary">必要</span>`
      : "";

    div.innerHTML = `
      <span class="log-text">💥 -${expenses[i].amount}円（${expenses[i].category} / ★${expenses[i].sat}）${tagNecessary}</span>
      <button class="btn-delete-inline" onclick="deleteExpenseIndex(${i})">削除</button>
    `;

    logContainer.appendChild(div);
  }
}

// 7. DELETE EXPENSE BY INDEX / インデックス指定 of 削除関数
function deleteExpenseIndex(index) {
  expenses.splice(index, 1);
  localStorage.setItem(storageKey, JSON.stringify(expenses));
  updateTotal();
  renderLog();
}

// 8. TOTAL CALCULATION / 合計の計算
function updateTotal() {
  const total = expenses.reduce((s, e) => s + e.amount, 0);
  const nonNecessaryExpenses = expenses.filter((e) => !e.isNecessary);
  const avgSat =
    nonNecessaryExpenses.length > 0
      ? nonNecessaryExpenses.reduce((s, e) => s + e.sat, 0) /
        nonNecessaryExpenses.length
      : 5;

  const totalEl = document.getElementById("total");
  if (totalEl) {
    totalEl.textContent = total.toLocaleString();
  }

  updatePetStatus(total, avgSat);
  updatePointDisplay();
}

// 9. SAVE ACTIVE WEEK TO HISTORY / MANUAL LOCK BUTTON
function saveCurrentWeek() {
  if (!expenses || expenses.length === 0) {
    alert("保存するデータがありません！");
    return;
  }

  if (confirm("今週のデータを確定して履歴に保存しますか？")) {
    const currentWeekLabel = getWeekIdentifier(new Date());

    autoArchiveWeek(currentWeekLabel, false);

    if (document.getElementById("log"))
      document.getElementById("log").innerHTML = "";
    if (document.getElementById("total"))
      document.getElementById("total").textContent = "0";

    alert("データを履歴に保存しました！");
    updatePointDisplay();
    updateTotal();
  }
}

// 10. FINANCIAL DIAGNOSIS / 診断機能
function showDiagnosis() {
  const total = expenses.reduce((s, e) => s + e.amount, 0);
  const wasteCount = expenses.filter((e) => e.sat <= 2).length;
  const impulseCount = expenses.filter((e) => e.category === "衝動買い").length;
  const avgSat = expenses.reduce((s, e) => s + e.sat, 0) / expenses.length;

  let type = "";
  let desc = "";

  if (wasteCount / expenses.length > 0.6) {
    type = "浪費王タイプ";
    desc =
      "欲しいと思った瞬間に迷わずお金を使うタイプ。<br>満足度よりも欲求を優先しやすく、気づけば出費が積み重なりやすい傾向があります。";
  } else if (impulseCount >= 2) {
    type = "衝動爆発タイプ";
    desc =
      "その場の気分や勢いでお金を使いやすいタイプ。<br>後から振り返ると「なんで買ったんだろう」と思うことも多めです。";
  } else if (total < 8000 && avgSat >= 4) {
    type = "節約マスター";
    desc =
      "少ない支出でも高い満足度を得られるタイプ。<br>無駄遣いが少なく、コスパ重視の考え方が自然にできています。";
  } else if (avgSat >= 3) {
    type = "バランス型";
    desc =
      "必要なものには使い、抑えるところは抑えられるタイプ。<br>感情と理性のバランスが良く、安定したお金の使い方が特徴です。";
  } else {
    type = "迷走タイプ";
    desc =
      "支出の基準が一定ではなく、その時の気分で大きく変わりやすいタイプ。<br>使い方の軸がまだ固まりきっていない状態です。";
  }

  const resTitle = document.getElementById("result-title");
  const resDesc = document.getElementById("result-desc");

  if (resTitle) resTitle.textContent = type;
  if (resDesc) resDesc.innerHTML = `<p>${desc}</p>`;
}

// 11. FUTURE VALUE CALCULATION / 未来価値計算
function futureValue(total) {
  const yearly = total * 52;
  return {
    yearly: yearly,
    switch: Math.floor(yearly / 40000),
    disney: Math.floor(yearly / 9000),
    usj: Math.floor(yearly / 10000),
    yakiniku: Math.floor(yearly / 4000),
    airpods: Math.floor(yearly / 39000),
    travel: Math.floor(yearly / 50000),
  };
}

// 12. DISPLAY FUTURE VALUE SUMMARY / 未来価値の概要表示
function showSummary() {
  const total = expenses.reduce((s, e) => s + e.amount, 0);
  const f = futureValue(total);
  let items = "";

  if (f.switch > 0)
    items += `<p>Switch: ${f.switch}台分</p><img src="image/1.swichi.avif" class="summary-gift-img">`;
  if (f.airpods > 0)
    items += `<p>airpods Pro: ${f.airpods}台分</p><img src="image/1.イヤホン.jpg" class="summary-gift-img">`;
  if (f.disney > 0)
    items += `<p>ディズニー: ${f.disney}回分</p><img src="image/1.Disney.jpg" class="summary-gift-img">`;
  if (f.usj > 0)
    items += `<p class="text-usj">USJ チケット: ${f.usj}回分</p><img src="image/1.usj.jpg" class="summary-gift-img usj-img">`;
  if (f.yakiniku > 0)
    items += `<p>焼肉食べ放題：${f.yakiniku}回分</p><img src="image/1.焼肉.jpg" class="summary-gift-img">`;
  if (f.travel > 0)
    items += `<p>国内旅行5万円分：${f.travel}回分</p><img src="image/1.旅行.jpg" class="summary-gift-img">`;

  const futureEl = document.getElementById("future");
  if (futureEl) {
    futureEl.innerHTML = `
      <h2 class="summary-title-small">この出費ペース、1年で…</h2>
      <h1 class="summary-total-large">${f.yearly.toLocaleString()}円！</h1>
      <hr class="summary-divider">
      <h2 class="summary-list-title">🛍️ 1年で買えるものの例:</h2>
      <div class="summary-items-container">
        ${items || "<p class='text-empty-summary'>大きな買い物はできないみたい…</p>"}
      </div>
    `;
  }
}

// 13. NAVIGATION TO CHART / グラフ画面への遷移
function goToChart() {
  localStorage.setItem(storageKey, JSON.stringify(expenses));
  window.location.href = "chart.html";
}

// 14. NAVIGATION TO ADVICE / アドバイス画面への遷移
function goToAdvice() {
  localStorage.setItem(storageKey, JSON.stringify(expenses));
  window.location.href = "advice.html";
}

// 15. PROCESS LOGOUT / ログアウト処理
function handleLogout() {
  if (confirm("ログアウトしますか？")) {
    sessionStorage.removeItem(`popup_shown_${currentUser}`);
    localStorage.removeItem("currentUser");
    window.location.href = "login.html";
  }
}

// 16. VIRTUAL PET GAME SYSTEM / バーチャルペットシステム
function updatePetStatus(totalPengeluaranMingguan, avgSat) {
  const petAvatar = document.getElementById("pet-avatar");
  const petWearHead = document.getElementById("pet-wear-head");
  const petWearFace = document.getElementById("pet-wear-face");
  const petCondition = document.getElementById("pet-condition");
  const petMessage = document.getElementById("pet-message");

  if (!petAvatar || !petWearHead || !petWearFace) return;

  const BATAS_MINGGUAN =
    Number(localStorage.getItem(`limit_${currentUser}`)) || 20000;

  let headItem = localStorage.getItem(`active_head_${currentUser}`) || "none";
  let faceItem = localStorage.getItem(`active_face_${currentUser}`) || "none";

  petWearHead.innerText = "";
  petWearHead.className = "accessory-sticker";
  petWearFace.innerText = "";

  const totalKeinginan = expenses
    .filter((e) => !e.isNecessary)
    .reduce((s, e) => s + e.amount, 0);

  const isBorosParah =
    totalPengeluaranMingguan > BATAS_MINGGUAN &&
    totalKeinginan > BATAS_MINGGUAN * 0.5 &&
    avgSat < 3.5;

  if (!isBorosParah) {
    if (headItem === "hat") {
      petWearHead.innerText = "🎩";
      petWearHead.classList.add("hat");
    } else if (headItem === "crown") {
      petWearHead.innerText = "👑";
      petWearHead.classList.add("crown");
    }
    if (faceItem === "sunglasses") {
      petWearFace.innerText = "🕶️";
    }
  }

  if (totalPengeluaranMingguan === 0) {
    petAvatar.innerText = "😸";
    petCondition.innerText = "😸 元気 ";
    petCondition.style.color = "#38f898";
    petMessage.innerText = "今週は何円節約できるかニャ？";
  } else if (totalPengeluaranMingguan <= BATAS_MINGGUAN) {
    const sisaUang = BATAS_MINGGUAN - totalPengeluaranMingguan;
    petAvatar.innerText = "😻";
    petCondition.innerText = "😻 満足 ";
    petCondition.style.color = "#38f898";
    petMessage.innerText = `今週もよく頑張ったニャ！安全な予算の残りはあと ${sisaUang.toLocaleString()} 円だニャ！`;
  } else if (!isBorosParah) {
    const kelebihan = totalPengeluaranMingguan - BATAS_MINGGUAN;
    petAvatar.innerText = "😸";
    petCondition.innerText = "🤔 納得 ";
    petCondition.style.color = "#0ea5e9";
    petMessage.innerText = `予算は ${kelebihan.toLocaleString()} 円オーバーだけど、必要な出費（必要）が中心だから仕方ないニャ。ここから気を引き締めるのニャ！`;
  } else {
    const kelebihan = totalPengeluaranMingguan - BATAS_MINGGUAN;
    petAvatar.innerText = "😿";
    petCondition.innerText = "😿 浪費 ";
    petCondition.style.color = "#ef4444";
    petMessage.innerText = `大変だニャ！そこまで必要じゃない無駄遣いで予算を ${kelebihan.toLocaleString()} 円もオーバーしちゃったニャ😭 反省するのニャ！`;
  }
}

// 17. SAVE WEEKLY LIMIT / 今週の目標予算の保存
function saveWeeklyLimit() {
  const inputVal =
    Number(document.getElementById("weekly-limit-input").value) || 20000;
  localStorage.setItem(`limit_${currentUser}`, inputVal);
  updateTotal();
}

// 18. UPDATE POINT DISPLAY / ポイント表示の更新
function updatePointDisplay() {
  const pointEl = document.getElementById("user-points");
  if (pointEl) {
    const currentPoints =
      Number(localStorage.getItem(`points_${currentUser}`)) || 0;
    pointEl.textContent = `🪙 ポイント: ${currentPoints}`;
  }
}

// 19. SHOP ACCESSORY SYSTEM
function buyAccessory(item, harga) {
  if (item === "default") {
    localStorage.setItem(`active_head_${currentUser}`, "none");
    localStorage.setItem(`active_face_${currentUser}`, "none");
    alert("❌ すべてのアイテムを外しました！ / Semua aksesoris dilepas!");
    updatePointDisplay();
    updateTotal();
    return;
  }

  const pointKey = `points_${currentUser}`;
  let currentPoints = Number(localStorage.getItem(pointKey)) || 0;
  const isOwned =
    localStorage.getItem(`owned_${item}_${currentUser}`) === "true";

  if (!isOwned && currentPoints < harga) {
    alert("ポイントが足りないニャ！ / Poin kamu tidak cukup nya! 😿");
    return;
  }

  if (!isOwned) {
    currentPoints -= harga;
    localStorage.setItem(pointKey, currentPoints);
    localStorage.setItem(`owned_${item}_${currentUser}`, "true");
  }

  if (item === "sunglasses") {
    localStorage.setItem(`active_face_${currentUser}`, "sunglasses");
  } else if (item === "hat" || item === "crown") {
    localStorage.setItem(`active_head_${currentUser}`, item);
  }

  alert(`🛍️ アイテムを着用しました！ / Item berhasil dipakai! ✨`);
  updatePointDisplay();
  updateTotal();
}

// 20. TOGGLE SHOP MENU
function toggleShopMenu() {
  const shopMenu = document.getElementById("shop-items-menu");
  const toggleBtn = document.querySelector(".btn-shop-toggle");

  if (!shopMenu) return;

  if (shopMenu.style.display === "none" || shopMenu.style.display === "") {
    shopMenu.style.display = "block";
    toggleBtn.textContent = "❌ ショップを閉じる ";
    toggleBtn.style.backgroundColor = "rgba(239, 68, 68, 0.2)";
  } else {
    shopMenu.style.display = "none";
    toggleBtn.textContent = "🛒 ショップを開く ";
    toggleBtn.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
  }
}

// 21. checkPendingReportModal
// Fungsi untuk mengecek dan memunculkan pop-up pemberitahuan pencapaian minggu lalu secara berkala
function checkPendingReportModal() {
  if (sessionStorage.getItem(`popup_shown_${currentUser}`) === "true") {
    return;
  }

  const historyKey = `history_${currentUser}`;
  const fullHistory = JSON.parse(localStorage.getItem(historyKey)) || [];

  if (fullHistory.length === 0) return;

  // Hitung label minggu lalu secara dinamis
  const sekarang = new Date();
  const tujuhHariLalu = new Date();
  tujuhHariLalu.setDate(sekarang.getDate() - 7);

  const labelMingguLaluRaw = getWeekIdentifier(tujuhHariLalu);

  // Cari data di dalam history yang cocok dengan label minggu lalu
  let mingguLaluData = fullHistory.find(
    (item) => item.date === labelMingguLaluRaw,
  );

  if (!mingguLaluData) {
    mingguLaluData = fullHistory[0];
  }

  if (document.getElementById("welcome-modal")) return;

  const modalDiv = document.createElement("div");
  modalDiv.id = "welcome-modal";
  modalDiv.className = "modal-overlay";
  modalDiv.style.display = "none";
  modalDiv.innerHTML = `
    <div class="modal-content">
      <button class="modal-close-btn" onclick="closeWelcomeModal()">&times;</button>
      <div class="modal-icon" id="modal-icon">🏆</div>
      <h2 id="modal-title">先週のレポート</h2>
      <div class="modal-divider"></div>
      <p id="modal-message">レポートを読み込み中...</p>
      <button class="modal-action-btn" onclick="closeWelcomeModal()">確認しました</button>
    </div>
  `;
  document.body.appendChild(modalDiv);

  const BATAS_MINGGUAN =
    Number(localStorage.getItem(`limit_${currentUser}`)) || 20000;
  const totalPengeluaran = mingguLaluData.total;

  let persenHemat = 100;
  if (totalPengeluaran > 0) {
    persenHemat = Math.round(
      ((BATAS_MINGGUAN - totalPengeluaran) / BATAS_MINGGUAN) * 100,
    );
  }

  const isHemat = totalPengeluaran <= BATAS_MINGGUAN;
  const iconDinamis = isHemat ? "👑" : "📉";
  const titleDinamis = isHemat
    ? "素晴らしい成果です！"
    : "次週がんばりましょう！";

  document.getElementById("modal-icon").innerText = iconDinamis;
  document.getElementById("modal-title").textContent = titleDinamis;

  let namaMinggu = mingguLaluData.date;
  if (namaMinggu.includes(" - W ")) {
    const parts = namaMinggu.split(" - W ");
    namaMinggu = `${parts[0]} 第${parts[1]}週`;
  }

  if (isHemat) {
    document.getElementById("modal-message").innerHTML = `
      <b>${namaMinggu}</b> の予算管理が完了しました。<br>
      先週は目標予算の <b>${persenHemat}%</b> を守ることができました！<br><br>
      支出総額: <b>${totalPengeluaran.toLocaleString()} 円</b><br>
      （目標予算: ${BATAS_MINGGUAN.toLocaleString()} 円）<br><br>
      大変素晴らしい節約意識です。この調子で今週もキープしていきましょう！
    `;
  } else {
    const overPercent = Math.abs(persenHemat);
    document.getElementById("modal-message").innerHTML = `
      <b>${namaMinggu}</b> の予算管理が完了しました。<br>
      先週は目標予算を <b>${overPercent}%</b> オーバーしてしまいました。<br><br>
      支出総額: <b>${totalPengeluaran.toLocaleString()} 円</b><br>
      （目標予算: ${BATAS_MINGGUAN.toLocaleString()} 円）<br><br>
      今週は少しだけ意識して、無駄遣いを一緒に減らしていきましょう！
    `;
  }

  document.querySelector(".modal-action-btn").textContent = "今週も頑張る！ ✨";

  document.getElementById("welcome-modal").style.display = "flex";
  sessionStorage.setItem(`popup_shown_${currentUser}`, "true");
}

// 22. closeWelcomeModal
function closeWelcomeModal() {
  const modal = document.getElementById("welcome-modal");
  if (modal) {
    modal.style.display = "none";
  }
}

// ─── EVENT LISTENERS & SHORTCUTS (Bukan Fungsi Mandiri) ───
const amountInput = document.getElementById("amount");
const satInput = document.getElementById("sat");

if (amountInput) {
  amountInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      addExpense();
    }
  });
}
if (satInput) {
  satInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      addExpense();
    }
  });
}

// ─── RUN ON LAUNCH / JALANKAN OTOMATIS SAAT HALAMAN DIBUKA ───
displayCurrentUser();
updatePointDisplay();
updateTotal();
renderLog();

// Register fungsi ke global window agar aman dibaca HTML browser
window.checkWeeklyReset = checkWeeklyReset;
window.checkPendingReportModal = checkPendingReportModal;
window.closeWelcomeModal = closeWelcomeModal;

// Eksekusi utama penentu siklus mingguan
checkWeeklyReset();
checkPendingReportModal();
