const currentUser =
  localStorage.getItem("currentUser") ||
  "guest";

const currentLanguage =
  localStorage.getItem("appLanguage") ||
  "ja";

let myChart = null;


/* ========================================
   翻訳データ
======================================== */

const chartPageTranslations = {
  ja: {
    pageTitle:
      "グラフ | 節約チェッカー",

    appName:
      "節約チェッカー",

    graphTitle:
      "グラフ",

    weeklyTotal:
      "今週の合計",

    largestExpense:
      "一番多い出費",

    categoryCount:
      "カテゴリ数",

    mostSpentCategory:
      "今週一番使ったのは",

    expenseChart:
      "支出カテゴリ別グラフ",

    back:
      "戻る",

    total:
      "合計",

    noData:
      "データなし",

    other:
      "その他",

    currency:
      "円",
  },

  en: {
    pageTitle:
      "Chart | Savings Checker",

    appName:
      "Savings Checker",

    graphTitle:
      "Chart",

    weeklyTotal:
      "This week's total",

    largestExpense:
      "Largest expense",

    categoryCount:
      "Number of categories",

    mostSpentCategory:
      "You spent the most on",

    expenseChart:
      "Expense chart by category",

    back:
      "Back",

    total:
      "Total",

    noData:
      "No data",

    other:
      "Other",

    currency:
      "yen",
  },

  my: {
    pageTitle:
      "ဂရပ် | ချွေတာရေး စစ်ဆေးမှု",

    appName:
      "ချွေတာရေး စစ်ဆေးမှု",

    graphTitle:
      "ဂရပ်",

    weeklyTotal:
      "ဒီအပတ် စုစုပေါင်း",

    largestExpense:
      "အများဆုံး အသုံးစရိတ်",

    categoryCount:
      "အမျိုးအစား အရေအတွက်",

    mostSpentCategory:
      "ဒီအပတ် အများဆုံးသုံးခဲ့တာ",

    expenseChart:
      "အသုံးစရိတ် အမျိုးအစားအလိုက် ဂရပ်",

    back:
      "ပြန်ရန်",

    total:
      "စုစုပေါင်း",

    noData:
      "ဒေတာမရှိပါ",

    other:
      "အခြား",

    currency:
      "ယန်း",
  },

  id: {
    pageTitle:
      "Grafik | Pemeriksa Penghematan",

    appName:
      "Pemeriksa Penghematan",

    graphTitle:
      "Grafik",

    weeklyTotal:
      "Total minggu ini",

    largestExpense:
      "Pengeluaran terbesar",

    categoryCount:
      "Jumlah kategori",

    mostSpentCategory:
      "Pengeluaran terbesar minggu ini",

    expenseChart:
      "Grafik pengeluaran berdasarkan kategori",

    back:
      "Kembali",

    total:
      "Total",

    noData:
      "Tidak ada data",

    other:
      "Lainnya",

    currency:
      "yen",
  },

  "zh-CN": {
    pageTitle:
      "图表 | 省钱检查",

    appName:
      "省钱检查",

    graphTitle:
      "图表",

    weeklyTotal:
      "本周合计",

    largestExpense:
      "最大支出",

    categoryCount:
      "分类数量",

    mostSpentCategory:
      "本周花费最多的是",

    expenseChart:
      "按类别显示的支出图表",

    back:
      "返回",

    total:
      "合计",

    noData:
      "暂无数据",

    other:
      "其他",

    currency:
      "日元",
  },

  "zh-TW": {
    pageTitle:
      "圖表 | 省錢檢查",

    appName:
      "省錢檢查",

    graphTitle:
      "圖表",

    weeklyTotal:
      "本週合計",

    largestExpense:
      "最大支出",

    categoryCount:
      "分類數量",

    mostSpentCategory:
      "本週花費最多的是",

    expenseChart:
      "依分類顯示的支出圖表",

    back:
      "返回",

    total:
      "合計",

    noData:
      "暫無資料",

    other:
      "其他",

    currency:
      "日圓",
  },

  ru: {
    pageTitle:
      "График | Контроль экономии",

    appName:
      "Контроль экономии",

    graphTitle:
      "График",

    weeklyTotal:
      "Итого за неделю",

    largestExpense:
      "Самая большая статья расходов",

    categoryCount:
      "Количество категорий",

    mostSpentCategory:
      "Больше всего за неделю потрачено на",

    expenseChart:
      "График расходов по категориям",

    back:
      "Назад",

    total:
      "Итого",

    noData:
      "Нет данных",

    other:
      "Другое",

    currency:
      "иен",
  },

  vi: {
    pageTitle:
      "Biểu đồ | Kiểm tra tiết kiệm",

    appName:
      "Kiểm tra tiết kiệm",

    graphTitle:
      "Biểu đồ",

    weeklyTotal:
      "Tổng tuần này",

    largestExpense:
      "Khoản chi lớn nhất",

    categoryCount:
      "Số danh mục",

    mostSpentCategory:
      "Tuần này bạn chi nhiều nhất cho",

    expenseChart:
      "Biểu đồ chi tiêu theo danh mục",

    back:
      "Quay lại",

    total:
      "Tổng cộng",

    noData:
      "Không có dữ liệu",

    other:
      "Khác",

    currency:
      "yên",
  },

  ko: {
    pageTitle:
      "그래프 | 절약 체크",

    appName:
      "절약 체크",

    graphTitle:
      "그래프",

    weeklyTotal:
      "이번 주 합계",

    largestExpense:
      "가장 큰 지출",

    categoryCount:
      "카테고리 수",

    mostSpentCategory:
      "이번 주 가장 많이 사용한 항목",

    expenseChart:
      "카테고리별 지출 그래프",

    back:
      "돌아가기",

    total:
      "합계",

    noData:
      "데이터 없음",

    other:
      "기타",

    currency:
      "엔",
  },

  th: {
    pageTitle:
      "กราฟ | ตรวจสอบการประหยัด",

    appName:
      "ตรวจสอบการประหยัด",

    graphTitle:
      "กราฟ",

    weeklyTotal:
      "ยอดรวมสัปดาห์นี้",

    largestExpense:
      "รายจ่ายสูงสุด",

    categoryCount:
      "จำนวนหมวดหมู่",

    mostSpentCategory:
      "สัปดาห์นี้ใช้จ่ายมากที่สุดกับ",

    expenseChart:
      "กราฟรายจ่ายแยกตามหมวดหมู่",

    back:
      "กลับ",

    total:
      "รวม",

    noData:
      "ไม่มีข้อมูล",

    other:
      "อื่น ๆ",

    currency:
      "เยน",
  },

  es: {
    pageTitle:
      "Gráfico | Control de ahorro",

    appName:
      "Control de ahorro",

    graphTitle:
      "Gráfico",

    weeklyTotal:
      "Total de esta semana",

    largestExpense:
      "Mayor gasto",

    categoryCount:
      "Número de categorías",

    mostSpentCategory:
      "Esta semana gastaste más en",

    expenseChart:
      "Gráfico de gastos por categoría",

    back:
      "Volver",

    total:
      "Total",

    noData:
      "Sin datos",

    other:
      "Otros",

    currency:
      "yenes",
  },

  "pt-BR": {
    pageTitle:
      "Gráfico | Controle de economia",

    appName:
      "Controle de economia",

    graphTitle:
      "Gráfico",

    weeklyTotal:
      "Total desta semana",

    largestExpense:
      "Maior despesa",

    categoryCount:
      "Número de categorias",

    mostSpentCategory:
      "Nesta semana, você gastou mais com",

    expenseChart:
      "Gráfico de despesas por categoria",

    back:
      "Voltar",

    total:
      "Total",

    noData:
      "Sem dados",

    other:
      "Outros",

    currency:
      "ienes",
  },
};


/* ========================================
   カテゴリ翻訳
======================================== */

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
    その他: "その他",
  },

  en: {
    学費: "Education",
    家賃: "Rent",
    光熱費: "Utilities",
    交通費: "Transportation",
    娯楽費: "Entertainment",
    サブスク: "Subscriptions",
    食費: "Food",
    クレカ: "Credit card",
    医療費: "Medical",
    保険代: "Insurance",
    美容: "Beauty",
    洋服: "Clothing",
    その他: "Other",
  },

  my: {
    学費: "ပညာသင်စရိတ်",
    家賃: "အိမ်လခ",
    光熱費: "မီးနှင့်ရေစရိတ်",
    交通費: "သွားလာစရိတ်",
    娯楽費: "အပန်းဖြေစရိတ်",
    サブスク: "စာရင်းသွင်းဝန်ဆောင်မှု",
    食費: "စားသောက်စရိတ်",
    クレカ: "ခရက်ဒစ်ကတ်",
    医療費: "ဆေးကုသစရိတ်",
    保険代: "အာမခံစရိတ်",
    美容: "အလှအပ",
    洋服: "အဝတ်အစား",
    その他: "အခြား",
  },

  id: {
    学費: "Pendidikan",
    家賃: "Sewa",
    光熱費: "Utilitas",
    交通費: "Transportasi",
    娯楽費: "Hiburan",
    サブスク: "Langganan",
    食費: "Makanan",
    クレカ: "Kartu kredit",
    医療費: "Kesehatan",
    保険代: "Asuransi",
    美容: "Kecantikan",
    洋服: "Pakaian",
    その他: "Lainnya",
  },

  "zh-CN": {
    学費: "学费",
    家賃: "房租",
    光熱費: "水电费",
    交通費: "交通费",
    娯楽費: "娱乐费",
    サブスク: "订阅服务",
    食費: "餐饮费",
    クレカ: "信用卡",
    医療費: "医疗费",
    保険代: "保险费",
    美容: "美容",
    洋服: "服装",
    その他: "其他",
  },

  "zh-TW": {
    学費: "學費",
    家賃: "房租",
    光熱費: "水電費",
    交通費: "交通費",
    娯楽費: "娛樂費",
    サブスク: "訂閱服務",
    食費: "餐飲費",
    クレカ: "信用卡",
    医療費: "醫療費",
    保険代: "保險費",
    美容: "美容",
    洋服: "服裝",
    その他: "其他",
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
    医療費: "Медицина",
    保険代: "Страхование",
    美容: "Красота",
    洋服: "Одежда",
    その他: "Другое",
  },

  vi: {
    学費: "Học phí",
    家賃: "Tiền thuê nhà",
    光熱費: "Điện nước",
    交通費: "Đi lại",
    娯楽費: "Giải trí",
    サブスク: "Đăng ký dịch vụ",
    食費: "Ăn uống",
    クレカ: "Thẻ tín dụng",
    医療費: "Y tế",
    保険代: "Bảo hiểm",
    美容: "Làm đẹp",
    洋服: "Quần áo",
    その他: "Khác",
  },

  ko: {
    学費: "학비",
    家賃: "월세",
    光熱費: "공과금",
    交通費: "교통비",
    娯楽費: "오락비",
    サブスク: "구독 서비스",
    食費: "식비",
    クレカ: "신용카드",
    医療費: "의료비",
    保険代: "보험료",
    美容: "미용",
    洋服: "의류",
    その他: "기타",
  },

  th: {
    学費: "ค่าเล่าเรียน",
    家賃: "ค่าเช่า",
    光熱費: "ค่าน้ำค่าไฟ",
    交通費: "ค่าเดินทาง",
    娯楽費: "ค่าความบันเทิง",
    サブスク: "ค่าสมาชิก",
    食費: "ค่าอาหาร",
    クレカ: "บัตรเครดิต",
    医療費: "ค่ารักษาพยาบาล",
    保険代: "ค่าประกัน",
    美容: "ความงาม",
    洋服: "เสื้อผ้า",
    その他: "อื่น ๆ",
  },

  es: {
    学費: "Educación",
    家賃: "Alquiler",
    光熱費: "Servicios",
    交通費: "Transporte",
    娯楽費: "Entretenimiento",
    サブスク: "Suscripciones",
    食費: "Alimentación",
    クレカ: "Tarjeta de crédito",
    医療費: "Salud",
    保険代: "Seguro",
    美容: "Belleza",
    洋服: "Ropa",
    その他: "Otros",
  },

  "pt-BR": {
    学費: "Educação",
    家賃: "Aluguel",
    光熱費: "Contas da casa",
    交通費: "Transporte",
    娯楽費: "Entretenimento",
    サブスク: "Assinaturas",
    食費: "Alimentação",
    クレカ: "Cartão de crédito",
    医療費: "Saúde",
    保険代: "Seguro",
    美容: "Beleza",
    洋服: "Roupas",
    その他: "Outros",
  },
};


/* ========================================
   翻訳取得
======================================== */

function getChartTexts() {
  return (
    chartPageTranslations[
      currentLanguage
    ] ||
    chartPageTranslations.ja
  );
}


function getTranslatedCategory(
  category
) {
  const translations =
    categoryTranslations[
      currentLanguage
    ] ||
    categoryTranslations.ja;

  return (
    translations[category] ||
    category
  );
}


/* ========================================
   金額表示
======================================== */

function formatMoney(amount) {
  const texts =
    getChartTexts();

  return (
    `${Number(amount).toLocaleString()} ` +
    `${texts.currency}`
  );
}


/* ========================================
   固定文言を翻訳
======================================== */

function applyChartPageLanguage() {
  const texts =
    getChartTexts();

  document
    .querySelectorAll("[data-i18n]")
    .forEach((element) => {
      const key =
        element.dataset.i18n;

      if (
        texts[key] !== undefined
      ) {
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
        element.dataset
          .i18nAriaLabel;

      if (
        texts[key] !== undefined
      ) {
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


/* ========================================
   支出データを取得
======================================== */

let expenses =
  JSON.parse(
    localStorage.getItem(
      "viewing_history_expenses"
    )
  );


if (
  !Array.isArray(expenses) ||
  expenses.length === 0
) {
  expenses =
    JSON.parse(
      localStorage.getItem(
        `expenses_${currentUser}`
      )
    ) || [];
}


if (!Array.isArray(expenses)) {
  expenses = [];
}


expenses =
  expenses
    .filter((expense) => {
      return (
        expense.type !== "収入"
      );
    })
    .map((expense) => {
      const category =
        expense.category &&
        String(
          expense.category
        ).trim()
          ? String(
              expense.category
            ).trim()
          : "その他";

      const amount =
        Number(
          String(
            expense.amount ?? 0
          )
            .replace(/,/g, "")
            .replace(/円/g, "")
            .trim()
        ) || 0;

      return {
        ...expense,
        category,
        amount,
      };
    })
    .filter((expense) => {
      return (
        expense.amount > 0 &&
        expense.category
      );
    });


/* ========================================
   画面読み込み時
======================================== */

document.addEventListener(
  "DOMContentLoaded",
  function () {
    applyChartPageLanguage();
    calculateMetrics();
    renderDoughnutChart();
  }
);


/* ========================================
   カテゴリごとの金額を集計
======================================== */

function createCategoryMap() {
  const dataMap = {};

  expenses.forEach((expense) => {
    const category =
      expense.category ||
      "その他";

    dataMap[category] =
      (
        dataMap[category] ||
        0
      ) +
      Number(expense.amount);
  });

  return dataMap;
}


/* ========================================
   メトリックを計算
======================================== */

function calculateMetrics() {
  const totalAmount =
    expenses.reduce(
      (sum, expense) => {
        return (
          sum +
          Number(expense.amount)
        );
      },
      0
    );

  const dataMap =
    createCategoryMap();

  const categoriesUsed =
    Object.keys(dataMap).length;

  let topCategory = "-";
  let topAmount = 0;

  Object.entries(dataMap)
    .forEach(
      ([category, amount]) => {
        if (amount > topAmount) {
          topAmount = amount;
          topCategory =
            category;
        }
      }
    );

  const metricTotal =
    document.getElementById(
      "metric-total"
    );

  const metricTop =
    document.getElementById(
      "metric-top"
    );

  const metricCount =
    document.getElementById(
      "metric-count"
    );

  const topCategoryElement =
    document.getElementById(
      "top-category"
    );

  const topAmountElement =
    document.getElementById(
      "top-amount"
    );

  if (metricTotal) {
    metricTotal.textContent =
      formatMoney(totalAmount);
  }

  if (metricTop) {
    metricTop.textContent =
      topCategory === "-"
        ? "-"
        : getTranslatedCategory(
            topCategory
          );
  }

  if (metricCount) {
    metricCount.textContent =
      String(categoriesUsed);
  }

  if (topCategoryElement) {
    topCategoryElement.textContent =
      topCategory === "-"
        ? "-"
        : getTranslatedCategory(
            topCategory
          );
  }

  if (topAmountElement) {
    topAmountElement.textContent =
      formatMoney(topAmount);
  }
}


/* ========================================
   ドーナツグラフを描画
======================================== */

function renderDoughnutChart() {
  const texts =
    getChartTexts();

  const chartElement =
    document.getElementById(
      "chart"
    );

  if (!chartElement) {
    console.error(
      'canvas要素「id="chart"」が見つかりません。'
    );

    return;
  }

  if (
    typeof Chart ===
    "undefined"
  ) {
    console.error(
      "Chart.jsが読み込まれていません。"
    );

    return;
  }

  const context =
    chartElement.getContext(
      "2d"
    );

  const dataMap =
    createCategoryMap();

  const originalCategories =
    Object.keys(dataMap);

  const labels =
    originalCategories.map(
      (category) => {
        return getTranslatedCategory(
          category
        );
      }
    );

  const values =
    Object.values(dataMap);

  const totalAmount =
    values.reduce(
      (sum, amount) => {
        return (
          sum +
          Number(amount)
        );
      },
      0
    );

  if (myChart) {
    myChart.destroy();
    myChart = null;
  }


  /* ========================================
     中央に合計金額を表示
  ======================================== */

  const centerTextPlugin = {
    id: "centerText",

    afterDraw(chart) {
      const {
        ctx,
        chartArea,
      } = chart;

      if (!chartArea) {
        return;
      }

      const {
        left,
        right,
        top,
        bottom,
      } = chartArea;

      const centerX =
        (left + right) / 2;

      const centerY =
        (top + bottom) / 2;

      ctx.save();

      ctx.textAlign =
        "center";

      ctx.textBaseline =
        "middle";

      ctx.fillStyle =
        "#7d7378";

      ctx.font =
        '600 12px "Noto Sans JP", sans-serif';

      ctx.fillText(
        texts.total,
        centerX,
        centerY - 14
      );

      ctx.fillStyle =
        "#2f2a2d";

      ctx.font =
        '700 20px "Noto Sans JP", sans-serif';

      ctx.fillText(
        formatMoney(
          totalAmount
        ),
        centerX,
        centerY + 10
      );

      ctx.restore();
    },
  };


  /* ========================================
     データがない場合
  ======================================== */

  if (labels.length === 0) {
    myChart =
      new Chart(
        context,
        {
          type: "doughnut",

          data: {
            labels: [
              texts.noData,
            ],

            datasets: [
              {
                data: [1],

                backgroundColor: [
                  "#eee7ea",
                ],

                borderColor:
                  "#ffffff",

                borderWidth: 3,

                hoverOffset: 0,
              },
            ],
          },

          options: {
            responsive: true,

            maintainAspectRatio:
              true,

            animation: {
              duration: 500,
            },

            plugins: {
              legend: {
                display: false,
              },

              tooltip: {
                enabled: false,
              },
            },

            cutout: "70%",
          },

          plugins: [
            centerTextPlugin,
          ],
        }
      );

    return;
  }


  /* ========================================
     通常のグラフ
  ======================================== */

  myChart =
    new Chart(
      context,
      {
        type: "doughnut",

        data: {
          labels,

          datasets: [
            {
              data: values,

              backgroundColor: [
                "#c986a0",
                "#6fa98a",
                "#e7ad69",
                "#789fbe",
                "#b18fc0",
                "#cf6f78",
                "#83b9aa",
                "#d6a2b5",
                "#a9a47a",
                "#8e9fc2",
                "#d08a73",
                "#9b8fb5",
              ],

              borderColor:
                "#ffffff",

              borderWidth: 3,

              hoverOffset: 10,

              hoverBorderWidth:
                3,
            },
          ],
        },

        options: {
          responsive: true,

          maintainAspectRatio:
            true,

          animation: {
            duration: 700,
          },

          layout: {
            padding: {
              top: 5,
              right: 5,
              bottom: 5,
              left: 5,
            },
          },

          plugins: {
            legend: {
              display: true,

              position: "bottom",

              labels: {
                color:
                  "#5f565b",

                padding: 16,

                usePointStyle:
                  true,

                pointStyle:
                  "circle",

                font: {
                  family:
                    "Noto Sans JP",

                  size: 12,

                  weight:
                    "600",
                },
              },
            },

            tooltip: {
              callbacks: {
                label(context) {
                  const label =
                    context.label ||
                    "";

                  const value =
                    Number(
                      context.raw
                    ) || 0;

                  const percentage =
                    totalAmount > 0
                      ? (
                          (
                            value /
                            totalAmount
                          ) *
                          100
                        ).toFixed(1)
                      : "0.0";

                  return (
                    `${label}：` +
                    `${formatMoney(value)} ` +
                    `(${percentage}%)`
                  );
                },
              },

              titleFont: {
                family:
                  "Noto Sans JP",
              },

              bodyFont: {
                family:
                  "Noto Sans JP",
              },
            },
          },

          cutout: "70%",
        },

        plugins: [
          centerTextPlugin,
        ],
      }
    );
}


/* ========================================
   戻るボタン
======================================== */

function goBackSmart() {
  const backTarget =
    localStorage.getItem(
      "back_to_target"
    ) ||
    "index.html";

  localStorage.removeItem(
    "viewing_history_expenses"
  );

  localStorage.removeItem(
    "back_to_target"
  );

  window.location.href =
    backTarget;
}