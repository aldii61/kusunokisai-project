/* js/chart.js (Multilingual Version: ID / EN / JA) */

const currentUser = localStorage.getItem("currentUser") || "guest";

// 1. Ambil data pengeluaran (Cek riwayat sementara dulu, kalau kosong ambil minggu berjalan)
// 1. Get expense data (Check temporary history first, if empty get the current week)
// 1. 支出データを取得（まず閲覧履歴を確認し、空なら今週のデータを取得）
let expenses = JSON.parse(localStorage.getItem("viewing_history_expenses"));
if (!expenses) {
  expenses = JSON.parse(localStorage.getItem(`expenses_${currentUser}`)) || [];
}

let myChart = null;

// Jalankan fungsi saat halaman selesai dimuat
// Run functions when the page completes loading
// 画面の読み込みが完了した時に関数を実行
window.onload = function () {
  calculateMetrics();
  renderDoughnutChart();
};

/* 2. Fungsi Hitung Metrik 📊/ Calculate Metrics Function / メトリック計算関数 */
function calculateMetrics() {
  // Hitung total pengeluaran keseluruhan
  // Calculate total overall expenses
  // 支出の総合計を計算
  const totalAmount = expenses.reduce((s, e) => s + e.amount, 0);

  // Hitung jumlah kategori unik yang dipakai
  // Count the number of unique categories used
  // 使用されている固有のカテゴリ数をカウント
  const categoriesUsed = [...new Set(expenses.map((e) => e.category))].length;

  // Akumulasikan total per kategori untuk mencari yang terbesar
  // Accumulate total per category to find the highest one
  // 最も高いカテゴリを見つけるため、カテゴリごとの合計を蓄積
  const dataMap = {};
  expenses.forEach((e) => {
    dataMap[e.category] = (dataMap[e.category] || 0) + e.amount;
  });

  let topCategory = "-";
  let topAmount = 0;

  // Cari kategori dengan pengeluaran tertinggi
  // Find the category with the highest expense
  // 最も支出の多いカテゴリを特定
  for (const cat in dataMap) {
    if (dataMap[cat] > topAmount) {
      topAmount = dataMap[cat];
      topCategory = cat;
    }
  }

  // Masukkan data ke elemen-elemen HTML (ID sesuai dengan HTML kamu)
  // Insert data into HTML elements (IDs match your HTML)
  // HTML要素にデータを挿入（IDは各HTMLと一致）
  document.getElementById("metric-total").textContent =
    `${totalAmount.toLocaleString()}円`;
  document.getElementById("metric-top").textContent = topCategory;
  document.getElementById("metric-count").textContent = categoriesUsed;

  document.getElementById("top-category").textContent = topCategory;
  document.getElementById("top-amount").textContent =
    `${topAmount.toLocaleString()}円`;
}

/* 3. Fungsi Render Grafik 🍩/ Render Chart Function / グラフ描画関数 */
function renderDoughnutChart() {
  // Petakan data pengeluaran untuk kebutuhan grafik Chart.js
  // Map expense data for Chart.js graphing requirements
  // Chart.jsのグラフ用に支出データをマッピング
  const dataMap = {};
  expenses.forEach((e) => {
    dataMap[e.category] = (dataMap[e.category] || 0) + e.amount;
  });

  const chartEl = document.getElementById("chart");
  if (!chartEl) return;
  const ctx = chartEl.getContext("2d");

  // Hancurkan grafik lama jika sudah ada sebelum membuat yang baru
  // Destroy the old chart if it already exists before creating a new one
  // 新しいグラフを作成する前に、既存の古いグラフを破棄
  if (myChart) {
    myChart.destroy();
  }

  const totalAmount = expenses.reduce((s, e) => s + e.amount, 0);

  // Membuat plugin khusus Chart.js untuk menulis total uang di tengah lubang donat
  // Create a custom Chart.js plugin to write the total money in the center of the doughnut hole
  // ドーナツの中心に合計金額を描画するChart.jsカスタムプラグイン
  const centerTextPlugin = {
    id: "centerText",
    afterDraw(chart) {
      const {
        ctx,
        chartArea: { top, bottom, left, right, width, height },
      } = chart;
      ctx.save();

      // Set gaya teks angka / Set text style for numbers / 数字のテキストスタイル設定
      ctx.font = 'bold 20px "Plus Jakarta Sans", sans-serif';
      ctx.fillStyle = "#ffffff";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      const text = `${totalAmount.toLocaleString()}円`;
      const centerX = left + width / 2;
      const centerY = top + height / 2;

      ctx.fillText(text, centerX, centerY);
      ctx.restore();
    },
  };

  // Inisialisasi Chart.js / Chart.js Initialization / Chart.js の初期化
  myChart = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: Object.keys(dataMap),
      datasets: [
        {
          data: Object.values(dataMap),
          backgroundColor: ["#38f898", "#f87171", "#60a5fa", "#fbbf24"],
          borderWidth: 2,
          borderColor: "#1e293b",
          hoverOffset: 10,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "bottom",
          labels: {
            color: "#ffffff",
            font: { family: "Plus Jakarta Sans", size: 12 },
          },
        },
      },
      cutout: "70%",
    },
    plugins: [centerTextPlugin], // Plugin teks tengah diaktifkan di sini / Center text plugin enabled here / 中心テキストプラグインを有効化
  });
}

/* 4. Fungsi Kembali 🔙/ Smart Back Function / スマート戻る関数 */
function goBackSmart() {
  const backTarget = localStorage.getItem("back_to_target") || "index.html";

  // Bersihkan data sesi riwayat agar tidak menumpuk
  // Clear history session data to avoid buildup
  // データ蓄積を防ぐため、閲覧履歴セッションデータをクリア
  localStorage.removeItem("viewing_history_expenses");
  localStorage.removeItem("back_to_target");

  window.location.href = backTarget;
}
