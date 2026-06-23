/* js/history-page.js（VERSI INTEGRASI TOTAL - SESUAI ACUAN ORIGINAL） */

// Ambil user yang sedang login
const currentUser = localStorage.getItem("currentUser") || "guest";
const historyKey = `history_${currentUser}`;
let fullHistory = JSON.parse(localStorage.getItem(historyKey)) || [];

window.onload = function () {
  renderHistory();
};

/* Render History List / 履歴一覧の描画 */
function renderHistory() {
  const container = document.getElementById("history-container");
  if (!container) return;

  if (fullHistory.length === 0) {
    container.innerHTML = `<p class="no-data-msg">履歴データがありません / No history data available.</p>`;
    return;
  }

  container.innerHTML = "";

  fullHistory.forEach((entry, index) => {
    let detailItems = "";

    // INTEGRASI: Membaca status item penting (必要)
    entry.details.forEach((item) => {
      const tagNecessary = item.isNecessary
        ? `<span style="background: rgba(34, 197, 94, 0.2); color: #38f898; padding: 1px 5px; border-radius: 4px; font-size: 0.7rem; margin-left: 5px; font-weight: bold;">必要</span>`
        : "";

      detailItems += `<li>👛 -${item.amount.toLocaleString()}円 (${item.category} / ★${item.sat})${tagNecessary}</li>`;
    });

    // Merender menggunakan template string bawaan asli milikmu agar pas dengan CSS
    container.innerHTML += `
            <div class="history-card">
                <div class="card-header">
                    <h3 class="card-title">${entry.date}</h3>
                    <div class="button-group">
                        <button onclick="viewHistoryTarget(${index}, 'chart')" class="btn-action">📊 グラフ</button>
                        <button onclick="viewHistoryTarget(${index}, 'advice')" class="btn-action">💡 分析</button>
                        <button onclick="deleteHistoryItem(${index})" class="btn-delete">🗑️ 削除</button>
                    </div>
                </div>
                <p class="total-text">
                    Total: <span class="total-amount-highlight">${entry.total.toLocaleString()}円</span>
                </p>
                <hr class="card-divider">
                <ul class="detail-list">
                    ${detailItems}
                </ul>
            </div>
        `;
  });
}

/* Fungsi mengarahkan ke Chart/Advice masa lalu (Logika Asli Milikmu 100% Aman) */
function viewHistoryTarget(index, type) {
  const selectedWeekDetails = fullHistory[index].details;
  localStorage.setItem(
    "viewing_history_expenses",
    JSON.stringify(selectedWeekDetails),
  );
  localStorage.setItem("back_to_target", "history.html");

  if (type === "chart") {
    window.location.href = "chart.html";
  } else if (type === "advice") {
    window.location.href = "advice.html";
  }
}

/* Menghapus item riwayat tertentu */
function deleteHistoryItem(index) {
  if (confirm("この履歴データを完全に削除しますか？")) {
    fullHistory.splice(index, 1);
    localStorage.setItem(historyKey, JSON.stringify(fullHistory));
    renderHistory();
    alert("履歴を削除しました。");
  }
}
