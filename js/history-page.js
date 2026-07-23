/* =========================================================
   js/history-page.js
   履歴画面・多言語対応版
========================================================= */

const currentUser =
  localStorage.getItem("currentUser") ||
  "guest";

const currentLanguage =
  localStorage.getItem("appLanguage") ||
  "ja";

const historyKey =
  `history_${currentUser}`;

let fullHistory =
  JSON.parse(
    localStorage.getItem(historyKey)
  ) || [];

if (!Array.isArray(fullHistory)) {
  fullHistory = [];
}

const historyPageTranslations = {
  ja: {
    pageTitle: "履歴 | 節約チェッカー",
    appName: "節約チェッカー",
    historyTitle: "履歴",
    noHistory: "履歴データがありません",
    graph: "グラフ",
    advice: "分析・アドバイス",
    delete: "削除",
    total: "合計",
    necessary: "必要",
    back: "戻る",
    confirmDelete:
      "この履歴データを完全に削除しますか？",
    deletedMessage:
      "履歴を削除しました。",
    currency: "円",
  },

  en: {
    pageTitle: "History | Savings Checker",
    appName: "Savings Checker",
    historyTitle: "History",
    noHistory: "No history data available.",
    graph: "Chart",
    advice: "Analysis & Advice",
    delete: "Delete",
    total: "Total",
    necessary: "Necessary",
    back: "Back",
    confirmDelete:
      "Are you sure you want to permanently delete this history entry?",
    deletedMessage:
      "The history entry has been deleted.",
    currency: "yen",
  },

  my: {
    pageTitle:
      "မှတ်တမ်း | ချွေတာရေး စစ်ဆေးမှု",
    appName:
      "ချွေတာရေး စစ်ဆေးမှု",
    historyTitle:
      "မှတ်တမ်း",
    noHistory:
      "မှတ်တမ်းဒေတာ မရှိပါ။",
    graph:
      "ဂရပ်",
    advice:
      "ခွဲခြမ်းစိတ်ဖြာမှုနှင့် အကြံပြုချက်",
    delete:
      "ဖျက်ရန်",
    total:
      "စုစုပေါင်း",
    necessary:
      "လိုအပ်",
    back:
      "ပြန်ရန်",
    confirmDelete:
      "ဒီမှတ်တမ်းဒေတာကို အပြီးအပိုင် ဖျက်မှာ သေချာပါသလား။",
    deletedMessage:
      "မှတ်တမ်းကို ဖျက်ပြီးပါပြီ။",
    currency:
      "ယန်း",
  },

  id: {
    pageTitle:
      "Riwayat | Pemeriksa Penghematan",
    appName:
      "Pemeriksa Penghematan",
    historyTitle:
      "Riwayat",
    noHistory:
      "Tidak ada data riwayat.",
    graph:
      "Grafik",
    advice:
      "Analisis & Saran",
    delete:
      "Hapus",
    total:
      "Total",
    necessary:
      "Penting",
    back:
      "Kembali",
    confirmDelete:
      "Apakah Anda yakin ingin menghapus data riwayat ini secara permanen?",
    deletedMessage:
      "Riwayat telah dihapus.",
    currency:
      "yen",
  },

  "zh-CN": {
    pageTitle:
      "历史记录 | 省钱检查",
    appName:
      "省钱检查",
    historyTitle:
      "历史记录",
    noHistory:
      "没有历史记录。",
    graph:
      "图表",
    advice:
      "分析与建议",
    delete:
      "删除",
    total:
      "合计",
    necessary:
      "必要",
    back:
      "返回",
    confirmDelete:
      "确定要永久删除这条历史记录吗？",
    deletedMessage:
      "历史记录已删除。",
    currency:
      "日元",
  },

  "zh-TW": {
    pageTitle:
      "歷史紀錄 | 省錢檢查",
    appName:
      "省錢檢查",
    historyTitle:
      "歷史紀錄",
    noHistory:
      "沒有歷史紀錄。",
    graph:
      "圖表",
    advice:
      "分析與建議",
    delete:
      "刪除",
    total:
      "合計",
    necessary:
      "必要",
    back:
      "返回",
    confirmDelete:
      "確定要永久刪除這筆歷史紀錄嗎？",
    deletedMessage:
      "歷史紀錄已刪除。",
    currency:
      "日圓",
  },

  ru: {
    pageTitle:
      "История | Контроль экономии",
    appName:
      "Контроль экономии",
    historyTitle:
      "История",
    noHistory:
      "История отсутствует.",
    graph:
      "График",
    advice:
      "Анализ и советы",
    delete:
      "Удалить",
    total:
      "Итого",
    necessary:
      "Необходимо",
    back:
      "Назад",
    confirmDelete:
      "Вы уверены, что хотите навсегда удалить эту запись?",
    deletedMessage:
      "Запись истории удалена.",
    currency:
      "иен",
  },

  vi: {
    pageTitle:
      "Lịch sử | Kiểm tra tiết kiệm",
    appName:
      "Kiểm tra tiết kiệm",
    historyTitle:
      "Lịch sử",
    noHistory:
      "Không có dữ liệu lịch sử.",
    graph:
      "Biểu đồ",
    advice:
      "Phân tích & Gợi ý",
    delete:
      "Xóa",
    total:
      "Tổng cộng",
    necessary:
      "Cần thiết",
    back:
      "Quay lại",
    confirmDelete:
      "Bạn có chắc muốn xóa vĩnh viễn dữ liệu lịch sử này không?",
    deletedMessage:
      "Đã xóa lịch sử.",
    currency:
      "yên",
  },

  ko: {
    pageTitle:
      "기록 | 절약 체크",
    appName:
      "절약 체크",
    historyTitle:
      "기록",
    noHistory:
      "기록 데이터가 없습니다.",
    graph:
      "그래프",
    advice:
      "분석·조언",
    delete:
      "삭제",
    total:
      "합계",
    necessary:
      "필요",
    back:
      "돌아가기",
    confirmDelete:
      "이 기록 데이터를 완전히 삭제하시겠어요?",
    deletedMessage:
      "기록을 삭제했습니다.",
    currency:
      "엔",
  },

  th: {
    pageTitle:
      "ประวัติ | ตรวจสอบการประหยัด",
    appName:
      "ตรวจสอบการประหยัด",
    historyTitle:
      "ประวัติ",
    noHistory:
      "ไม่มีข้อมูลประวัติ",
    graph:
      "กราฟ",
    advice:
      "วิเคราะห์และคำแนะนำ",
    delete:
      "ลบ",
    total:
      "รวม",
    necessary:
      "จำเป็น",
    back:
      "กลับ",
    confirmDelete:
      "คุณแน่ใจหรือไม่ว่าต้องการลบข้อมูลประวัตินี้อย่างถาวร?",
    deletedMessage:
      "ลบประวัติแล้ว",
    currency:
      "เยน",
  },

  es: {
    pageTitle:
      "Historial | Control de ahorro",
    appName:
      "Control de ahorro",
    historyTitle:
      "Historial",
    noHistory:
      "No hay datos en el historial.",
    graph:
      "Gráfico",
    advice:
      "Análisis y consejos",
    delete:
      "Eliminar",
    total:
      "Total",
    necessary:
      "Necesario",
    back:
      "Volver",
    confirmDelete:
      "¿Seguro que deseas eliminar permanentemente este registro?",
    deletedMessage:
      "El registro ha sido eliminado.",
    currency:
      "yenes",
  },

  "pt-BR": {
    pageTitle:
      "Histórico | Controle de economia",
    appName:
      "Controle de economia",
    historyTitle:
      "Histórico",
    noHistory:
      "Não há dados no histórico.",
    graph:
      "Gráfico",
    advice:
      "Análise e conselhos",
    delete:
      "Excluir",
    total:
      "Total",
    necessary:
      "Necessário",
    back:
      "Voltar",
    confirmDelete:
      "Tem certeza de que deseja excluir permanentemente este registro?",
    deletedMessage:
      "O registro foi excluído.",
    currency:
      "ienes",
  },
};

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

function getHistoryTexts() {
  return (
    historyPageTranslations[currentLanguage] ||
    historyPageTranslations.ja
  );
}

function getTranslatedCategory(category) {
  const translations =
    categoryTranslations[currentLanguage] ||
    categoryTranslations.ja;

  return (
    translations[category] ||
    category
  );
}

/* ========================================
   履歴の日付を翻訳
======================================== */

function formatHistoryDate(dateText) {
  if (!dateText) {
    return "-";
  }

  const match =
    String(dateText).match(
      /^(\d{4})年(\d{1,2})月(\d{1,2})日[〜～~\-](?:(\d{4})年)?(?:(\d{1,2})月)?(\d{1,2})日$/
    );

  if (!match) {
    return dateText;
  }

  const startYear =
    Number(match[1]);

  const startMonth =
    Number(match[2]);

  const startDay =
    Number(match[3]);

  const endYear =
    Number(match[4]) ||
    startYear;

  const endMonth =
    Number(match[5]) ||
    startMonth;

  const endDay =
    Number(match[6]);

  const startDate =
    new Date(
      startYear,
      startMonth - 1,
      startDay
    );

  const endDate =
    new Date(
      endYear,
      endMonth - 1,
      endDay
    );

  const localeMap = {
    ja: "ja-JP-u-ca-gregory",
    en: "en-US-u-ca-gregory",
    my: "my-MM-u-ca-gregory",
    id: "id-ID-u-ca-gregory",
    "zh-CN": "zh-CN-u-ca-gregory",
    "zh-TW": "zh-TW-u-ca-gregory",
    ru: "ru-RU-u-ca-gregory",
    vi: "vi-VN-u-ca-gregory",
    ko: "ko-KR-u-ca-gregory",
    th: "th-TH-u-ca-gregory",
    es: "es-ES-u-ca-gregory",
    "pt-BR": "pt-BR-u-ca-gregory",
  };

  const locale =
    localeMap[currentLanguage] ||
    localeMap.ja;

  const formatter =
    new Intl.DateTimeFormat(
      locale,
      {
        year: "numeric",
        month: "short",
        day: "numeric",
      }
    );

  if (
    typeof formatter.formatRange ===
    "function"
  ) {
    return formatter.formatRange(
      startDate,
      endDate
    );
  }

  return (
    `${formatter.format(startDate)} ～ ` +
    `${formatter.format(endDate)}`
  );
}

function formatMoney(amount) {
  const texts =
    getHistoryTexts();

  return (
    `${Number(amount).toLocaleString()} ` +
    `${texts.currency}`
  );
}

function applyHistoryPageLanguage() {
  const texts =
    getHistoryTexts();

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

  document.title =
    texts.pageTitle;

  document.documentElement.lang =
    currentLanguage;
}

function normalizeNecessaryValue(value) {
  if (
    typeof value ===
    "string"
  ) {
    const normalized =
      value
        .trim()
        .toLowerCase();

    if (
      [
        "true",
        "1",
        "yes",
        "必要",
        "必要だった",
      ].includes(normalized)
    ) {
      return true;
    }

    if (
      [
        "false",
        "0",
        "no",
        "不要",
        "必要ではなかった",
      ].includes(normalized)
    ) {
      return false;
    }
  }

  return Boolean(value);
}

function renderHistory() {
  const texts =
    getHistoryTexts();

  const container =
    document.getElementById(
      "history-container"
    );

  if (!container) {
    return;
  }

  if (fullHistory.length === 0) {
    container.innerHTML = `
      <p class="no-data-msg">
        ${texts.noHistory}
      </p>
    `;

    return;
  }

  container.innerHTML = "";

  fullHistory.forEach(
    (entry, index) => {
      let detailItems = "";

      const details =
        Array.isArray(entry.details)
          ? entry.details
          : [];

      details.forEach((item) => {
        const amount =
          Number(item.amount) || 0;

        const category =
          item.category ||
          "その他";

        const satisfaction =
          Number(item.sat) || 0;

        const necessaryValue =
          item.isNecessary ??
          item.necessary ??
          item.need ??
          item.isNeed;

        const isNecessary =
          normalizeNecessaryValue(
            necessaryValue
          );

        const necessaryTag =
          isNecessary
            ? `
              <span
                class="necessary-tag"
                style="
                  background:
                    rgba(
                      34,
                      197,
                      94,
                      0.2
                    );
                  color:
                    #33a36b;
                  padding:
                    1px 5px;
                  border-radius:
                    4px;
                  font-size:
                    0.7rem;
                  margin-left:
                    5px;
                  font-weight:
                    bold;
                "
              >
                ${texts.necessary}
              </span>
            `
            : "";

        detailItems += `
          <li>
            -${formatMoney(amount)}
            (
              ${getTranslatedCategory(
                category
              )}
              /
              ★${satisfaction}
            )
            ${necessaryTag}
          </li>
        `;
      });

      const total =
        Number(entry.total) ||
        details.reduce(
          (sum, item) => {
            return (
              sum +
              Number(
                item.amount || 0
              )
            );
          },
          0
        );

      container.innerHTML += `
        <div class="history-card">
          <div class="card-header">
            <h3 class="card-title">
  ${formatHistoryDate(entry.date)}
</h3>
            <div class="button-group">
              <button
                type="button"
                onclick="
                  viewHistoryTarget(
                    ${index},
                    'chart'
                  )
                "
                class="btn-action"
              >
                ${texts.graph}
              </button>

              <button
                type="button"
                onclick="
                  viewHistoryTarget(
                    ${index},
                    'advice'
                  )
                "
                class="btn-action"
              >
                ${texts.advice}
              </button>

              <button
                type="button"
                onclick="
                  deleteHistoryItem(
                    ${index}
                  )
                "
                class="btn-delete"
              >
                ${texts.delete}
              </button>
            </div>
          </div>

          <p class="total-text">
            ${texts.total}:

            <span
              class="total-amount-highlight"
            >
              ${formatMoney(total)}
            </span>
          </p>

          <hr class="card-divider">

          <ul class="detail-list">
            ${detailItems}
          </ul>
        </div>
      `;
    }
  );
}

function viewHistoryTarget(index, type) {
  const selectedHistory =
    fullHistory[index];

  if (!selectedHistory) {
    return;
  }

  const selectedWeekDetails =
    Array.isArray(
      selectedHistory.details
    )
      ? selectedHistory.details
      : [];

  localStorage.setItem(
    "viewing_history_expenses",
    JSON.stringify(
      selectedWeekDetails
    )
  );

  localStorage.setItem(
    "back_to_target",
    "history.html"
  );

  if (type === "chart") {
    window.location.href =
      "chart.html";

    return;
  }

  if (type === "advice") {
    window.location.href =
      "advice.html";
  }
}

function deleteHistoryItem(index) {
  const texts =
    getHistoryTexts();

  const confirmed =
    window.confirm(
      texts.confirmDelete
    );

  if (!confirmed) {
    return;
  }

  fullHistory.splice(
    index,
    1
  );

  localStorage.setItem(
    historyKey,
    JSON.stringify(
      fullHistory
    )
  );

  renderHistory();

  window.alert(
    texts.deletedMessage
  );
}

window.addEventListener(
  "DOMContentLoaded",
  function () {
    applyHistoryPageLanguage();
    renderHistory();
  }
);
