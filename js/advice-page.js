const currentUser = localStorage.getItem("currentUser") || "guest";

// 1. Cek apakah ada data riwayat lama yang sedang di-request untuk dilihat
let expenses = JSON.parse(localStorage.getItem("viewing_history_expenses"));

// 2. Jika tidak ada (artinya pengguna membuka lewat halaman utama secara normal), ambil data minggu berjalan
if (!expenses) {
  expenses = JSON.parse(localStorage.getItem(`expenses_${currentUser}`)) || [];
}

// ========== FUTURE VALUE ==========
function futureValue(total) {
  const yearly = total * 52;
  return {
    yearly: yearly,
    switch: Math.floor(yearly / 40000),
    airpods: Math.floor(yearly / 39000),
    disney: Math.floor(yearly / 9000),
    usj: Math.floor(yearly / 10000), //
    yakiniku: Math.floor(yearly / 4000),
    travel: Math.floor(yearly / 50000),
  };
}

// ========== DIAGNOSIS ==========
function showDiagnosis() {
  if (expenses.length === 0) {
    document.getElementById("result-desc").innerHTML = `
        <div class="diagnosis-box">
            <h2 class="type-normal">データなし</h2>
            <p style="text-align:center;">今週の出費データがまだ入力されていません。</p>
        </div>
    `;
    return;
  }

  const total = expenses.reduce((s, e) => s + e.amount, 0);
  const wasteCount = expenses.filter((e) => e.sat <= 2).length;
  const impulseCount = expenses.filter((e) => e.category === "衝動買い").length;
  const avgSat = expenses.reduce((s, e) => s + e.sat, 0) / expenses.length;

  let type = "";
  let desc = "";
  let colorClass = "type-normal"; // Default style class

  if (wasteCount / expenses.length > 0.6) {
    type = "浪費王タイプ";
    desc =
      "欲しいと思った瞬間に迷わけずお金を使うタイプ。<br>満足度よりも欲求を優先しやすく、気づけば出費が積み重なりやすい傾向があります。";
    colorClass = "type-danger";
  } else if (impulseCount >= 2) {
    type = "衝動爆発タイプ";
    desc =
      "その場の気分や勢いでお金を使いやすいタイプ。<br>後から振り返ると「なんで買ったんだろう」と思うことも多めです。";
    colorClass = "type-danger";
  } else if (total < 8000 && avgSat >= 4) {
    type = "節約マスター";
    desc =
      "少ない支出でも高い満足度を得られるタイプ。<br>無駄遣いが少なく、コスパ重視の考え方が自然にできています。";
    colorClass = "type-master";
  } else if (avgSat >= 3) {
    type = "バランス型";
    desc =
      "必要なものには使い、抑えるところは抑えられるタイプ。<br>感情と理性のバランスが良く、安定したお金の使い方が特徴です。";
    colorClass = "type-balance";
  } else {
    type = "迷走タイプ";
    desc =
      "支出の基準gが一定ではなく、その時の気分で大きく変わりやすいタイプ。<br>使い方の軸gがまだ固まりきっていない状態です。";
    colorClass = "type-normal";
  }

  document.getElementById("result-desc").innerHTML = `
        <div class="diagnosis-box">
            <h2 class="${colorClass}">👑 ${type}</h2>
            <p>${desc}</p>
        </div>
    `;
}

// ========== SUMMARY WITH IMAGES ==========
function showSummary() {
  const total = expenses.reduce((s, e) => s + e.amount, 0);
  const f = futureValue(total);
  let items = "";

  if (f.switch > 0) {
    items += `
            <div class="advice-item">
                <p>Switch: ${f.switch}台分</p>
                <img src="image/1.swichi.avif" class="summary-img">
            </div>
        `;
  }
  if (f.airpods > 0) {
    items += `
            <div class="advice-item">
                <p>AirPods Pro: ${f.airpods}台分</p>
                <img src="image/1.イヤホン.jpg" class="summary-img">
            </div>
        `;
  }
  if (f.disney > 0) {
    items += `
            <div class="advice-item">
                <p>ディズニー: ${f.disney}回分</p>
                <img src="image/1.Disney.jpg" class="summary-img">
            </div>
        `;
  }
  if (f.usj > 0) {
    items += `
            <div class="advice-item">
                <p>USJ: ${f.usj}回分</p>
                <img src="image/1.usj.png" class="summary-img"> </div>
        `;
  }
  if (f.yakiniku > 0) {
    items += `
            <div class="advice-item">
                <p>焼肉食べ放題: ${f.yakiniku}回分</p>
                <img src="image/1.焼肉.jpg" class="summary-img">
            </div>
        `;
  }
  if (f.travel > 0) {
    items += `
            <div class="advice-item">
                <p>国内旅行: ${f.travel}回分</p>
                <img src="image/1.旅行.jpg" class="summary-img">
            </div>
        `;
  }

  // Membungkus output items ke dalam .items-grid agar berjejer rapi
  document.getElementById("future").innerHTML = `
        <div class="future-box">
            <h2>この出費ペース、1年で…</h2>
            <h1>${f.yearly.toLocaleString()}円！</h1>
        </div>
        <p class="section-title">🛍️ 1年で買えるものの例:</p>
        <div class="items-grid">
            ${items || "<p style='grid-column: span 2; color:#9ca3af; padding: 20px;'>大きな買い物はできないみたい…</p>"}
        </div>
    `;
}

// ========== INIT ==========
showDiagnosis();
showSummary();

function goBackSmart() {
  const backTarget = localStorage.getItem("back_to_target") || "index.html";
  localStorage.removeItem("viewing_history_expenses");
  localStorage.removeItem("back_to_target");
  window.location.href = backTarget;
}
