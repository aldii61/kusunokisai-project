/* graph.js */
const currentUser = localStorage.getItem("currentUser") || "guest";
const storageKey = `kakeibo_${currentUser}`;

let data = JSON.parse(localStorage.getItem(storageKey)) || [];

let current = new Date();
let year = current.getFullYear();
let month = current.getMonth();

let expenseChart;
let incomeChart;

console.log(income);
console.log(expense);
console.log(income - expense);

let savingChart;

showGraph();

function showGraph() {
  document.getElementById("monthTitle").textContent = `${year}年${month + 1}月`;

  let income = 0;
  let expense = 0;

  const expenseData = {};
  const incomeData = {};

  data.forEach((item) => {
    const d = new Date(item.date + "T00:00:00");

    if (d.getFullYear() === year && d.getMonth() === month) {
      if (item.type === "収入") {
        income += item.amount;
        incomeData[item.category] =
          (incomeData[item.category] || 0) + item.amount;
      } else {
        expense += item.amount;
        expenseData[item.category] =
          (expenseData[item.category] || 0) + item.amount;
      }
    }
  });

  const hasData = income > 0 || expense > 0;

  document.getElementById("income").textContent = income;
  document.getElementById("expense").textContent = expense;
  document.getElementById("saving").textContent = income - expense;

  drawCharts(expenseData, incomeData, hasData, income, expense);
}
function drawCharts(expenseData, incomeData, hasData, income, expense) {
  console.log(income);
  console.log(expense);
  console.log(income - expense);
  const expenseCanvas = document.getElementById("expenseChart");
  const incomeCanvas = document.getElementById("incomeChart");
  const savingCanvas = document.getElementById("savingChart");
  const emptyMessage = document.getElementById("emptyMessage");
  // ⭐データなしなら非表示
  if (!hasData) {
    emptyMessage.classList.remove("hidden");

    expenseCanvas.style.display = "none";
    incomeCanvas.style.display = "none";
    savingCanvas.style.display = "none";

    return;
  } else {
    emptyMessage.classList.add("hidden");

    expenseCanvas.style.display = "block";
    incomeCanvas.style.display = "block";
    savingCanvas.style.display = "block";
  }

  if (expenseChart) expenseChart.destroy();
  if (incomeChart) incomeChart.destroy();
  if (savingChart) savingChart.destroy();

  expenseChart = new Chart(expenseCanvas, {
    type: "pie",
    data: {
      labels: Object.keys(expenseData),
      datasets: [{ data: Object.values(expenseData) }],
    },
  });

  incomeChart = new Chart(incomeCanvas, {
    type: "pie",
    data: {
      labels: Object.keys(incomeData),
      datasets: [{ data: Object.values(incomeData) }],
    },
  });

  savingChart = new Chart(savingCanvas, {
    type: "bar",
    data: {
      labels: ["貯金"],
      datasets: [
        {
          label: "金額",
          data: [income - expense],
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
    },
  }); // <-- PASTIKAN ADA PENUTUP INI UNTUK CHART
} // <--- 🔥 INI DIA! Pastikan ada tanda kurung penutup untuk fungsi drawCharts di sini!

function prevMonth() {
  month--;
  if (month < 0) {
    month = 11;
    year--;
  }
  showGraph();
}

function nextMonth() {
  month++;
  if (month > 11) {
    month = 0;
    year++;
  }
  showGraph();
}
