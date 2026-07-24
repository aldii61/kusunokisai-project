/* =========================================================
   normal.js
   家計簿入力・Document AIレシート読み取り
========================================================= */
const currentLanguage =
  localStorage.getItem("appLanguage") || "ja";

/* =========================================================
   1. カテゴリー
========================================================= */

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
  "日用品",
];

const incomeList = [
  "給料",
  "臨時収入",
  "おこづかい",
];
const normalTranslations = {
  ja: {
    pageTitle: "節約チェッカー | 家計簿モード",
    backToMode: "←モード選択画面に戻る",
    logout: "ログアウト",
    appTitle: "節約チェッカー",
    householdMode: "家計簿モード",
    mainMenu: "メインメニュー",
    input: "入力",
    calendar: "カレンダー",
    graph: "グラフ",
    date: "日付",
    typeSelection: "収入または支出",
    expense: "支出",
    income: "収入",
    category: "カテゴリ",
    editCategories: "カテゴリ編集",
    amountPlaceholder: "金額（円）",
    amount: "金額",
    memoPlaceholder:
      "メモ（例：大宮まで、友達ランチ）",
    memo: "メモ",
    add: "追加",
    readReceipt: "レシートを読み取る",
    back: "← 戻る",
    alignReceipt:
      "レシートを枠内に合わせてください",
    receiptCamera: "レシート撮影用カメラ",
    startingCamera:
      "カメラを起動しています",
    captureNow: "今すぐ読み取る",
    cameraNotSupported:
  "このブラウザではカメラを使用できません。",

cameraStarting:
  "カメラを起動しています…",

autoScanCountdown:
  "10秒後に自動で読み取ります",

cameraStartFailedLog:
  "カメラの起動に失敗しました",

cameraPermissionError:
  "カメラを起動できませんでした。\nブラウザのカメラ権限を確認してください。",

cameraNotReady:
  "カメラの準備ができていません",

readingReceipt:
  "レシートを読み取っています…",

receiptReadSuccess:
  "レシートを読み取りました✔",

receiptReadFailedLog:
  "レシートの読み取りに失敗しました",

receiptReadRetry:
  "読み取りに失敗しました。もう一度お試しください",

receiptReadServerError:
  "レシートを読み取れませんでした。\nFlaskサーバーが起動しているか確認してください。",
  invalidDateAmount:
  "日付と金額を正しく入力してください。",

inputComplete:
  "入力完了",

receiptGuide:
  "レシート全体が映るようにしてください",

imageCreationFailed:
  "撮影画像を作成できませんでした",

logoutConfirm:
  "ログアウトしますか？",
  },

  en: {
    pageTitle: "Savings Checker | Household Mode",
    backToMode: "← Back to mode selection",
    logout: "Log out",
    appTitle: "Savings Checker",
    householdMode: "Household Budget Mode",
    mainMenu: "Main menu",
    input: "Input",
    calendar: "Calendar",
    graph: "Graph",
    date: "Date",
    typeSelection: "Income or expense",
    expense: "Expense",
    income: "Income",
    category: "Category",
    editCategories: "Edit categories",
    amountPlaceholder: "Amount (yen)",
    amount: "Amount",
    memoPlaceholder:
      "Memo (e.g. trip to Omiya, lunch with a friend)",
    memo: "Memo",
    add: "Add",
    readReceipt: "Scan receipt",
    back: "← Back",
    alignReceipt:
      "Place the receipt inside the frame",
    receiptCamera: "Receipt camera",
    startingCamera:
      "Starting camera",
    captureNow: "Scan now",
    cameraNotSupported:
  "This browser does not support camera access.",

cameraStarting:
  "Starting the camera…",

autoScanCountdown:
  "The receipt will be scanned automatically in 10 seconds.",

cameraStartFailedLog:
  "Failed to start the camera.",

cameraPermissionError:
  "Could not start the camera.\nPlease check your browser's camera permissions.",

cameraNotReady:
  "The camera is not ready yet.",

readingReceipt:
  "Reading the receipt…",

receiptReadSuccess:
  "Receipt scanned successfully ✔",

receiptReadFailedLog:
  "Failed to read the receipt.",

receiptReadRetry:
  "Failed to read the receipt. Please try again.",

receiptReadServerError:
  "Could not read the receipt.\nPlease check that the Flask server is running.",
  invalidDateAmount:
  "Please enter a valid date and amount.",

inputComplete:
  "Entry completed ✔",

receiptGuide:
  "Make sure the entire receipt is visible.",

imageCreationFailed:
  "Could not create the captured image.",

logoutConfirm:
  "Do you want to log out?",
  },
    my: {
    pageTitle: "ချွေတာရေး စစ်ဆေးမှု | အိမ်သုံးစာရင်း",
    backToMode: "← မုဒ်ရွေးချယ်မှုသို့ ပြန်သွားရန်",
    logout: "ထွက်ရန်",
    appTitle: "ချွေတာရေး စစ်ဆေးမှု",
    householdMode: "အိမ်သုံးစာရင်း မုဒ်",
    mainMenu: "အဓိကမီနူး",
    input: "ထည့်သွင်းရန်",
    calendar: "ပြက္ခဒိန်",
    graph: "ဂရပ်",
    date: "ရက်စွဲ",
    typeSelection: "ဝင်ငွေ သို့မဟုတ် အသုံးစရိတ်",
    expense: "အသုံးစရိတ်",
    income: "ဝင်ငွေ",
    category: "အမျိုးအစား",
    editCategories: "အမျိုးအစား ပြင်ဆင်ရန်",
    amountPlaceholder: "ငွေပမာဏ（ယန်း）",
    amount: "ငွေပမာဏ",
    memoPlaceholder: "မှတ်စု（ဥပမာ ခရီးစရိတ်၊ သူငယ်ချင်းနှင့် နေ့လယ်စာ）",
    memo: "မှတ်စု",
    add: "ထည့်ရန်",
    readReceipt: "ပြေစာဖတ်ရန်",
    back: "← ပြန်ရန်",
    alignReceipt: "ပြေစာကို ဘောင်အတွင်းထားပါ",
    receiptCamera: "ပြေစာဓာတ်ပုံရိုက်ကင်မရာ",
    startingCamera: "ကင်မရာစတင်နေသည်",
    captureNow: "ယခုဖတ်ရန်",
    cameraNotSupported:
  "ဤဘရောက်ဇာတွင် ကင်မရာကို အသုံးပြု၍ မရပါ။",

cameraStarting:
  "ကင်မရာကို စတင်နေသည်…",

autoScanCountdown:
  "၁၀ စက္ကန့်အကြာတွင် အလိုအလျောက် ဖတ်ပါမည်။",

cameraStartFailedLog:
  "ကင်မရာကို စတင်၍ မရပါ။",

cameraPermissionError:
  "ကင်မရာကို စတင်၍ မရပါ။\nဘရောက်ဇာ၏ ကင်မရာခွင့်ပြုချက်ကို စစ်ဆေးပါ။",

cameraNotReady:
  "ကင်မရာ အဆင်သင့်မဖြစ်သေးပါ။",

readingReceipt:
  "ပြေစာကို ဖတ်နေသည်…",

receiptReadSuccess:
  "ပြေစာကို အောင်မြင်စွာ ဖတ်ပြီးပါပြီ ✔",

receiptReadFailedLog:
  "ပြေစာဖတ်ခြင်း မအောင်မြင်ပါ။",

receiptReadRetry:
  "ဖတ်ခြင်း မအောင်မြင်ပါ။ ထပ်မံကြိုးစားပါ။",

receiptReadServerError:
  "ပြေစာကို မဖတ်နိုင်ပါ။\nFlask ဆာဗာ အလုပ်လုပ်နေကြောင်း စစ်ဆေးပါ။",
  invalidDateAmount:
  "ရက်စွဲနှင့် ငွေပမာဏကို မှန်ကန်စွာ ထည့်သွင်းပါ။",

inputComplete:
  "ထည့်သွင်းမှု ပြီးပါပြီ ✔",

receiptGuide:
  "ပြေစာတစ်ခုလုံး မြင်ရအောင် ထားပါ။",

imageCreationFailed:
  "ရိုက်ကူးထားသောပုံကို ဖန်တီး၍မရပါ။",

logoutConfirm:
  "ထွက်လိုပါသလား။",
  },

  id: {
    pageTitle: "Pemeriksa Penghematan | Mode Buku Keuangan",
    backToMode: "← Kembali ke pilihan mode",
    logout: "Keluar",
    appTitle: "Pemeriksa Penghematan",
    householdMode: "Mode Buku Keuangan",
    mainMenu: "Menu utama",
    input: "Input",
    calendar: "Kalender",
    graph: "Grafik",
    date: "Tanggal",
    typeSelection: "Pemasukan atau pengeluaran",
    expense: "Pengeluaran",
    income: "Pemasukan",
    category: "Kategori",
    editCategories: "Edit kategori",
    amountPlaceholder: "Jumlah (yen)",
    amount: "Jumlah",
    memoPlaceholder: "Memo (contoh: ke Omiya, makan siang bersama teman)",
    memo: "Memo",
    add: "Tambah",
    readReceipt: "Pindai struk",
    back: "← Kembali",
    alignReceipt: "Posisikan struk di dalam bingkai",
    receiptCamera: "Kamera struk",
    startingCamera: "Memulai kamera",
    captureNow: "Pindai sekarang",
    cameraNotSupported:
  "Browser ini tidak mendukung penggunaan kamera.",

cameraStarting:
  "Memulai kamera…",

autoScanCountdown:
  "Struk akan dipindai otomatis dalam 10 detik.",

cameraStartFailedLog:
  "Gagal memulai kamera.",

cameraPermissionError:
  "Kamera tidak dapat dijalankan.\nPeriksa izin kamera pada browser Anda.",

cameraNotReady:
  "Kamera belum siap.",

readingReceipt:
  "Membaca struk…",

receiptReadSuccess:
  "Struk berhasil dibaca ✔",

receiptReadFailedLog:
  "Gagal membaca struk.",

receiptReadRetry:
  "Gagal membaca struk. Silakan coba lagi.",

receiptReadServerError:
  "Struk tidak dapat dibaca.\nPastikan server Flask sedang berjalan.",
  invalidDateAmount:
  "Masukkan tanggal dan jumlah yang valid.",

inputComplete:
  "Input selesai ✔",

receiptGuide:
  "Pastikan seluruh struk terlihat.",

imageCreationFailed:
  "Gambar hasil pemotretan tidak dapat dibuat.",

logoutConfirm:
  "Apakah Anda ingin keluar?",
  },

  "zh-CN": {
    pageTitle: "省钱检查 | 家庭记账模式",
    backToMode: "← 返回模式选择",
    logout: "退出登录",
    appTitle: "省钱检查",
    householdMode: "家庭记账模式",
    mainMenu: "主菜单",
    input: "输入",
    calendar: "日历",
    graph: "图表",
    date: "日期",
    typeSelection: "收入或支出",
    expense: "支出",
    income: "收入",
    category: "分类",
    editCategories: "编辑分类",
    amountPlaceholder: "金额（日元）",
    amount: "金额",
    memoPlaceholder: "备注（例：去大宫、和朋友吃午餐）",
    memo: "备注",
    add: "添加",
    readReceipt: "扫描小票",
    back: "← 返回",
    alignReceipt: "请将小票放入框内",
    receiptCamera: "小票拍摄相机",
    startingCamera: "正在启动相机",
    captureNow: "立即扫描",
    cameraNotSupported:
  "此浏览器无法使用摄像头。",

cameraStarting:
  "正在启动摄像头……",

autoScanCountdown:
  "将在10秒后自动读取小票。",

cameraStartFailedLog:
  "摄像头启动失败。",

cameraPermissionError:
  "无法启动摄像头。\n请检查浏览器的摄像头权限。",

cameraNotReady:
  "摄像头尚未准备好。",

readingReceipt:
  "正在读取小票……",

receiptReadSuccess:
  "小票读取成功 ✔",

receiptReadFailedLog:
  "小票读取失败。",

receiptReadRetry:
  "读取失败，请再试一次。",

receiptReadServerError:
  "无法读取小票。\n请确认 Flask 服务器是否正在运行。",
  invalidDateAmount:
  "请输入正确的日期和金额。",

inputComplete:
  "输入完成 ✔",

receiptGuide:
  "请确保整张小票都显示在画面中。",

imageCreationFailed:
  "无法创建拍摄的图像。",

logoutConfirm:
  "确定要退出登录吗？",
  },

  "zh-TW": {
    pageTitle: "省錢檢查 | 家庭記帳模式",
    backToMode: "← 返回模式選擇",
    logout: "登出",
    appTitle: "省錢檢查",
    householdMode: "家庭記帳模式",
    mainMenu: "主選單",
    input: "輸入",
    calendar: "日曆",
    graph: "圖表",
    date: "日期",
    typeSelection: "收入或支出",
    expense: "支出",
    income: "收入",
    category: "分類",
    editCategories: "編輯分類",
    amountPlaceholder: "金額（日圓）",
    amount: "金額",
    memoPlaceholder: "備註（例：去大宮、和朋友吃午餐）",
    memo: "備註",
    add: "新增",
    readReceipt: "掃描收據",
    back: "← 返回",
    alignReceipt: "請將收據放入框內",
    receiptCamera: "收據拍攝相機",
    startingCamera: "正在啟動相機",
    captureNow: "立即掃描",
    cameraNotSupported:
  "此瀏覽器無法使用相機。",

cameraStarting:
  "正在啟動相機……",

autoScanCountdown:
  "將在10秒後自動讀取收據。",

cameraStartFailedLog:
  "相機啟動失敗。",

cameraPermissionError:
  "無法啟動相機。\n請檢查瀏覽器的相機權限。",

cameraNotReady:
  "相機尚未準備好。",

readingReceipt:
  "正在讀取收據……",

receiptReadSuccess:
  "收據讀取成功 ✔",

receiptReadFailedLog:
  "收據讀取失敗。",

receiptReadRetry:
  "讀取失敗，請再試一次。",

receiptReadServerError:
  "無法讀取收據。\n請確認 Flask 伺服器是否正在執行。",
  invalidDateAmount:
  "請輸入正確的日期和金額。",

inputComplete:
  "輸入完成 ✔",

receiptGuide:
  "請確保整張收據都顯示在畫面中。",

imageCreationFailed:
  "無法建立拍攝的影像。",

logoutConfirm:
  "確定要登出嗎？",
  },

  ru: {
    pageTitle: "Контроль экономии | Домашний бюджет",
    backToMode: "← Вернуться к выбору режима",
    logout: "Выйти",
    appTitle: "Контроль экономии",
    householdMode: "Домашний бюджет",
    mainMenu: "Главное меню",
    input: "Ввод",
    calendar: "Календарь",
    graph: "График",
    date: "Дата",
    typeSelection: "Доход или расход",
    expense: "Расход",
    income: "Доход",
    category: "Категория",
    editCategories: "Редактировать категории",
    amountPlaceholder: "Сумма (иены)",
    amount: "Сумма",
    memoPlaceholder: "Заметка (например: поездка в Омию, обед с другом)",
    memo: "Заметка",
    add: "Добавить",
    readReceipt: "Сканировать чек",
    back: "← Назад",
    alignReceipt: "Поместите чек внутрь рамки",
    receiptCamera: "Камера для чека",
    startingCamera: "Запуск камеры",
    captureNow: "Сканировать сейчас",
    cameraNotSupported:
  "Этот браузер не поддерживает доступ к камере.",

cameraStarting:
  "Запуск камеры…",

autoScanCountdown:
  "Чек будет автоматически считан через 10 секунд.",

cameraStartFailedLog:
  "Не удалось запустить камеру.",

cameraPermissionError:
  "Не удалось запустить камеру.\nПроверьте разрешение на использование камеры в браузере.",

cameraNotReady:
  "Камера ещё не готова.",

readingReceipt:
  "Считывание чека…",

receiptReadSuccess:
  "Чек успешно считан ✔",

receiptReadFailedLog:
  "Не удалось считать чек.",

receiptReadRetry:
  "Не удалось считать чек. Попробуйте ещё раз.",

receiptReadServerError:
  "Не удалось считать чек.\nУбедитесь, что сервер Flask запущен.",

  invalidDateAmount:
  "Введите корректную дату и сумму.",

inputComplete:
  "Данные добавлены ✔",

receiptGuide:
  "Убедитесь, что чек полностью виден.",

imageCreationFailed:
  "Не удалось создать снимок.",

logoutConfirm:
  "Вы хотите выйти?",
  },

  vi: {
    pageTitle: "Kiểm tra tiết kiệm | Chế độ sổ thu chi",
    backToMode: "← Quay lại chọn chế độ",
    logout: "Đăng xuất",
    appTitle: "Kiểm tra tiết kiệm",
    householdMode: "Chế độ sổ thu chi",
    mainMenu: "Menu chính",
    input: "Nhập",
    calendar: "Lịch",
    graph: "Biểu đồ",
    date: "Ngày",
    typeSelection: "Thu nhập hoặc chi tiêu",
    expense: "Chi tiêu",
    income: "Thu nhập",
    category: "Danh mục",
    editCategories: "Chỉnh sửa danh mục",
    amountPlaceholder: "Số tiền (yên)",
    amount: "Số tiền",
    memoPlaceholder: "Ghi chú (ví dụ: đến Omiya, ăn trưa với bạn)",
    memo: "Ghi chú",
    add: "Thêm",
    readReceipt: "Quét hóa đơn",
    back: "← Quay lại",
    alignReceipt: "Đặt hóa đơn vào trong khung",
    receiptCamera: "Camera chụp hóa đơn",
    startingCamera: "Đang khởi động camera",
    captureNow: "Quét ngay",
    cameraNotSupported:
  "Trình duyệt này không hỗ trợ sử dụng camera.",

cameraStarting:
  "Đang khởi động camera…",

autoScanCountdown:
  "Hóa đơn sẽ được quét tự động sau 10 giây.",

cameraStartFailedLog:
  "Không thể khởi động camera.",

cameraPermissionError:
  "Không thể khởi động camera.\nVui lòng kiểm tra quyền truy cập camera của trình duyệt.",

cameraNotReady:
  "Camera chưa sẵn sàng.",

readingReceipt:
  "Đang đọc hóa đơn…",

receiptReadSuccess:
  "Đã đọc hóa đơn thành công ✔",

receiptReadFailedLog:
  "Không thể đọc hóa đơn.",

receiptReadRetry:
  "Đọc hóa đơn thất bại. Vui lòng thử lại.",

receiptReadServerError:
  "Không thể đọc hóa đơn.\nVui lòng kiểm tra xem máy chủ Flask có đang chạy không.",
  invalidDateAmount:
  "Vui lòng nhập ngày và số tiền hợp lệ.",

inputComplete:
  "Đã nhập xong ✔",

receiptGuide:
  "Hãy đảm bảo toàn bộ hóa đơn nằm trong khung hình.",

imageCreationFailed:
  "Không thể tạo ảnh đã chụp.",

logoutConfirm:
  "Bạn có muốn đăng xuất không?",
  
  },

  ko: {
    pageTitle: "절약 체크 | 가계부 모드",
    backToMode: "← 모드 선택으로 돌아가기",
    logout: "로그아웃",
    appTitle: "절약 체크",
    householdMode: "가계부 모드",
    mainMenu: "메인 메뉴",
    input: "입력",
    calendar: "캘린더",
    graph: "그래프",
    date: "날짜",
    typeSelection: "수입 또는 지출",
    expense: "지출",
    income: "수입",
    category: "카테고리",
    editCategories: "카테고리 편집",
    amountPlaceholder: "금액(엔)",
    amount: "금액",
    memoPlaceholder: "메모(예: 오미야까지, 친구와 점심)",
    memo: "메모",
    add: "추가",
    readReceipt: "영수증 읽기",
    back: "← 돌아가기",
    alignReceipt: "영수증을 프레임 안에 맞춰 주세요",
    receiptCamera: "영수증 촬영 카메라",
    startingCamera: "카메라를 시작하고 있습니다",
    captureNow: "지금 읽기",
    cameraNotSupported:
  "이 브라우저에서는 카메라를 사용할 수 없습니다.",

cameraStarting:
  "카메라를 시작하고 있습니다…",

autoScanCountdown:
  "10초 후 자동으로 영수증을 읽습니다.",

cameraStartFailedLog:
  "카메라 시작에 실패했습니다.",

cameraPermissionError:
  "카메라를 시작할 수 없습니다.\n브라우저의 카메라 권한을 확인해 주세요.",

cameraNotReady:
  "카메라가 아직 준비되지 않았습니다.",

readingReceipt:
  "영수증을 읽고 있습니다…",

receiptReadSuccess:
  "영수증을 읽었습니다 ✔",

receiptReadFailedLog:
  "영수증 읽기에 실패했습니다.",

receiptReadRetry:
  "읽기에 실패했습니다. 다시 시도해 주세요.",

receiptReadServerError:
  "영수증을 읽을 수 없습니다.\nFlask 서버가 실행 중인지 확인해 주세요.",
  invalidDateAmount:
  "날짜와 금액을 올바르게 입력해 주세요.",

inputComplete:
  "입력 완료 ✔",

receiptGuide:
  "영수증 전체가 보이도록 해 주세요.",

imageCreationFailed:
  "촬영 이미지를 만들 수 없습니다.",

logoutConfirm:
  "로그아웃하시겠습니까?",
  },

  th: {
    pageTitle: "ตรวจสอบการประหยัด | โหมดบัญชีครัวเรือน",
    backToMode: "← กลับไปเลือกโหมด",
    logout: "ออกจากระบบ",
    appTitle: "ตรวจสอบการประหยัด",
    householdMode: "โหมดบัญชีครัวเรือน",
    mainMenu: "เมนูหลัก",
    input: "กรอกข้อมูล",
    calendar: "ปฏิทิน",
    graph: "กราฟ",
    date: "วันที่",
    typeSelection: "รายรับหรือรายจ่าย",
    expense: "รายจ่าย",
    income: "รายรับ",
    category: "หมวดหมู่",
    editCategories: "แก้ไขหมวดหมู่",
    amountPlaceholder: "จำนวนเงิน (เยน)",
    amount: "จำนวนเงิน",
    memoPlaceholder: "บันทึก (เช่น ไปโอมิยะ, กินข้าวกับเพื่อน)",
    memo: "บันทึก",
    add: "เพิ่ม",
    readReceipt: "สแกนใบเสร็จ",
    back: "← กลับ",
    alignReceipt: "จัดใบเสร็จให้อยู่ภายในกรอบ",
    receiptCamera: "กล้องถ่ายใบเสร็จ",
    startingCamera: "กำลังเปิดกล้อง",
    captureNow: "สแกนตอนนี้",
    cameraNotSupported:
  "เบราว์เซอร์นี้ไม่รองรับการใช้งานกล้อง",

cameraStarting:
  "กำลังเปิดกล้อง…",

autoScanCountdown:
  "ระบบจะอ่านใบเสร็จอัตโนมัติในอีก 10 วินาที",

cameraStartFailedLog:
  "ไม่สามารถเปิดกล้องได้",

cameraPermissionError:
  "ไม่สามารถเปิดกล้องได้\nกรุณาตรวจสอบสิทธิ์การใช้งานกล้องของเบราว์เซอร์",

cameraNotReady:
  "กล้องยังไม่พร้อม",

readingReceipt:
  "กำลังอ่านใบเสร็จ…",

receiptReadSuccess:
  "อ่านใบเสร็จสำเร็จ ✔",

receiptReadFailedLog:
  "ไม่สามารถอ่านใบเสร็จได้",

receiptReadRetry:
  "อ่านใบเสร็จไม่สำเร็จ กรุณาลองอีกครั้ง",

receiptReadServerError:
  "ไม่สามารถอ่านใบเสร็จได้\nกรุณาตรวจสอบว่าเซิร์ฟเวอร์ Flask กำลังทำงานอยู่",
  invalidDateAmount:
  "กรุณากรอกวันที่และจำนวนเงินให้ถูกต้อง",

inputComplete:
  "กรอกข้อมูลเรียบร้อยแล้ว ✔",

receiptGuide:
  "กรุณาให้ใบเสร็จทั้งหมดอยู่ในภาพ",

imageCreationFailed:
  "ไม่สามารถสร้างภาพที่ถ่ายได้",

logoutConfirm:
  "คุณต้องการออกจากระบบหรือไม่?",
  },

  es: {
    pageTitle: "Control de ahorro | Presupuesto familiar",
    backToMode: "← Volver a la selección de modo",
    logout: "Cerrar sesión",
    appTitle: "Control de ahorro",
    householdMode: "Modo de presupuesto familiar",
    mainMenu: "Menú principal",
    input: "Entrada",
    calendar: "Calendario",
    graph: "Gráfico",
    date: "Fecha",
    typeSelection: "Ingreso o gasto",
    expense: "Gasto",
    income: "Ingreso",
    category: "Categoría",
    editCategories: "Editar categorías",
    amountPlaceholder: "Importe (yenes)",
    amount: "Importe",
    memoPlaceholder: "Nota (ej.: viaje a Omiya, comida con un amigo)",
    memo: "Nota",
    add: "Añadir",
    readReceipt: "Escanear recibo",
    back: "← Volver",
    alignReceipt: "Coloca el recibo dentro del marco",
    receiptCamera: "Cámara para recibos",
    startingCamera: "Iniciando cámara",
    captureNow: "Escanear ahora",
    cameraNotSupported:
  "Este navegador no permite usar la cámara.",

cameraStarting:
  "Iniciando la cámara…",

autoScanCountdown:
  "El recibo se leerá automáticamente en 10 segundos.",

cameraStartFailedLog:
  "No se pudo iniciar la cámara.",

cameraPermissionError:
  "No se pudo iniciar la cámara.\nComprueba los permisos de cámara del navegador.",

cameraNotReady:
  "La cámara aún no está lista.",

readingReceipt:
  "Leyendo el recibo…",

receiptReadSuccess:
  "Recibo leído correctamente ✔",

receiptReadFailedLog:
  "No se pudo leer el recibo.",

receiptReadRetry:
  "No se pudo leer el recibo. Inténtalo de nuevo.",

receiptReadServerError:
  "No se pudo leer el recibo.\nComprueba que el servidor Flask esté en ejecución.",
  invalidDateAmount:
  "Introduce una fecha y un importe válidos.",

inputComplete:
  "Entrada completada ✔",

receiptGuide:
  "Asegúrate de que el recibo completo sea visible.",

imageCreationFailed:
  "No se pudo crear la imagen capturada.",

logoutConfirm:
  "¿Quieres cerrar sesión?",
  },

  "pt-BR": {
    pageTitle: "Controle de economia | Orçamento doméstico",
    backToMode: "← Voltar à seleção de modo",
    logout: "Sair",
    appTitle: "Controle de economia",
    householdMode: "Modo de orçamento doméstico",
    mainMenu: "Menu principal",
    input: "Entrada",
    calendar: "Calendário",
    graph: "Gráfico",
    date: "Data",
    typeSelection: "Receita ou despesa",
    expense: "Despesa",
    income: "Receita",
    category: "Categoria",
    editCategories: "Editar categorias",
    amountPlaceholder: "Valor (ienes)",
    amount: "Valor",
    memoPlaceholder: "Observação (ex.: ida a Omiya, almoço com amigo)",
    memo: "Observação",
    add: "Adicionar",
    readReceipt: "Digitalizar recibo",
    back: "← Voltar",
    alignReceipt: "Posicione o recibo dentro da moldura",
    receiptCamera: "Câmera para recibos",
    startingCamera: "Iniciando câmera",
    captureNow: "Digitalizar agora",
    cameraNotSupported:
  "Este navegador não permite o uso da câmera.",

cameraStarting:
  "Iniciando a câmera…",

autoScanCountdown:
  "O recibo será lido automaticamente em 10 segundos.",

cameraStartFailedLog:
  "Não foi possível iniciar a câmera.",

cameraPermissionError:
  "Não foi possível iniciar a câmera.\nVerifique as permissões de câmera do navegador.",

cameraNotReady:
  "A câmera ainda não está pronta.",

readingReceipt:
  "Lendo o recibo…",

receiptReadSuccess:
  "Recibo lido com sucesso ✔",

receiptReadFailedLog:
  "Não foi possível ler o recibo.",

receiptReadRetry:
  "Não foi possível ler o recibo. Tente novamente.",

receiptReadServerError:
  "Não foi possível ler o recibo.\nVerifique se o servidor Flask está em execução.",
  invalidDateAmount:
  "Insira uma data e um valor válidos.",

inputComplete:
  "Entrada concluída ✔",

receiptGuide:
  "Certifique-se de que o recibo inteiro esteja visível.",

imageCreationFailed:
  "Não foi possível criar a imagem capturada.",

logoutConfirm:
  "Deseja sair?",
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
    クレジットカード: "クレジットカード",
    医療費: "医療費",
    美容: "美容",
    洋服: "洋服",
    日用品: "日用品",
    給料: "給料",
    臨時収入: "臨時収入",
    おこづかい: "おこづかい",
  },

  en: {
    学費: "Tuition",
    家賃: "Rent",
    光熱費: "Utilities",
    交通費: "Transportation",
    娯楽費: "Entertainment",
    サブスク: "Subscriptions",
    食費: "Food",
    クレジットカード: "Credit card",
    医療費: "Medical expenses",
    美容: "Beauty",
    洋服: "Clothing",
    日用品: "Daily necessities",
    給料: "Salary",
    臨時収入: "Extra income",
    おこづかい: "Allowance",
  },

  my: {
    学費: "ကျောင်းလခ",
    家賃: "အိမ်ငှားခ",
    光熱費: "မီးနှင့်ရေဖိုး",
    交通費: "သွားလာရေး",
    娯楽費: "ဖျော်ဖြေရေး",
    サブスク: "စာရင်းသွင်းဝန်ဆောင်မှု",
    食費: "အစားအသောက်",
    クレジットカード: "ခရက်ဒစ်ကတ်",
    医療費: "ဆေးကုသစရိတ်",
    美容: "အလှအပ",
    洋服: "အဝတ်အစား",
    日用品: "နေ့စဉ်သုံးပစ္စည်း",
    給料: "လစာ",
    臨時収入: "အပိုဝင်ငွေ",
    おこづかい: "မုန့်ဖိုး",
  },

  id: {
    学費: "Biaya pendidikan",
    家賃: "Sewa",
    光熱費: "Utilitas",
    交通費: "Transportasi",
    娯楽費: "Hiburan",
    サブスク: "Langganan",
    食費: "Makanan",
    クレジットカード: "Kartu kredit",
    医療費: "Biaya medis",
    美容: "Kecantikan",
    洋服: "Pakaian",
    日用品: "Kebutuhan sehari-hari",
    給料: "Gaji",
    臨時収入: "Pendapatan tambahan",
    おこづかい: "Uang saku",
  },

  "zh-CN": {
    学費: "学费",
    家賃: "房租",
    光熱費: "水电燃气费",
    交通費: "交通费",
    娯楽費: "娱乐费",
    サブスク: "订阅服务",
    食費: "餐饮",
    クレジットカード: "信用卡",
    医療費: "医疗费",
    美容: "美容",
    洋服: "服装",
    日用品: "日用品",
    給料: "工资",
    臨時収入: "临时收入",
    おこづかい: "零用钱",
  },

  "zh-TW": {
    学費: "學費",
    家賃: "房租",
    光熱費: "水電瓦斯費",
    交通費: "交通費",
    娯楽費: "娛樂費",
    サブスク: "訂閱服務",
    食費: "餐飲",
    クレジットカード: "信用卡",
    医療費: "醫療費",
    美容: "美容",
    洋服: "服裝",
    日用品: "日用品",
    給料: "薪資",
    臨時収入: "臨時收入",
    おこづかい: "零用錢",
  },

  ru: {
    学費: "Обучение",
    家賃: "Аренда",
    光熱費: "Коммунальные услуги",
    交通費: "Транспорт",
    娯楽費: "Развлечения",
    サブスク: "Подписки",
    食費: "Питание",
    クレジットカード: "Кредитная карта",
    医療費: "Медицинские расходы",
    美容: "Красота",
    洋服: "Одежда",
    日用品: "Повседневные товары",
    給料: "Зарплата",
    臨時収入: "Дополнительный доход",
    おこづかい: "Карманные деньги",
  },

  vi: {
    学費: "Học phí",
    家賃: "Tiền thuê nhà",
    光熱費: "Điện nước",
    交通費: "Đi lại",
    娯楽費: "Giải trí",
    サブスク: "Dịch vụ đăng ký",
    食費: "Ăn uống",
    クレジットカード: "Thẻ tín dụng",
    医療費: "Chi phí y tế",
    美容: "Làm đẹp",
    洋服: "Quần áo",
    日用品: "Đồ dùng hằng ngày",
    給料: "Lương",
    臨時収入: "Thu nhập thêm",
    おこづかい: "Tiền tiêu vặt",
  },

  ko: {
    学費: "학비",
    家賃: "월세",
    光熱費: "공과금",
    交通費: "교통비",
    娯楽費: "오락비",
    サブスク: "구독",
    食費: "식비",
    クレジットカード: "신용카드",
    医療費: "의료비",
    美容: "미용",
    洋服: "의류",
    日用品: "생활용품",
    給料: "급여",
    臨時収入: "임시 수입",
    おこづかい: "용돈",
  },

  th: {
    学費: "ค่าเล่าเรียน",
    家賃: "ค่าเช่า",
    光熱費: "ค่าน้ำค่าไฟ",
    交通費: "ค่าเดินทาง",
    娯楽費: "ค่าความบันเทิง",
    サブスク: "บริการสมัครสมาชิก",
    食費: "ค่าอาหาร",
    クレジットカード: "บัตรเครดิต",
    医療費: "ค่ารักษาพยาบาล",
    美容: "ความงาม",
    洋服: "เสื้อผ้า",
    日用品: "ของใช้ประจำวัน",
    給料: "เงินเดือน",
    臨時収入: "รายได้พิเศษ",
    おこづかい: "เงินค่าขนม",
  },

  es: {
    学費: "Matrícula",
    家賃: "Alquiler",
    光熱費: "Servicios",
    交通費: "Transporte",
    娯楽費: "Entretenimiento",
    サブスク: "Suscripciones",
    食費: "Alimentación",
    クレジットカード: "Tarjeta de crédito",
    医療費: "Gastos médicos",
    美容: "Belleza",
    洋服: "Ropa",
    日用品: "Artículos diarios",
    給料: "Salario",
    臨時収入: "Ingresos extra",
    おこづかい: "Dinero de bolsillo",
  },

  "pt-BR": {
    学費: "Mensalidade escolar",
    家賃: "Aluguel",
    光熱費: "Contas domésticas",
    交通費: "Transporte",
    娯楽費: "Entretenimento",
    サブスク: "Assinaturas",
    食費: "Alimentação",
    クレジットカード: "Cartão de crédito",
    医療費: "Despesas médicas",
    美容: "Beleza",
    洋服: "Roupas",
    日用品: "Itens do dia a dia",
    給料: "Salário",
    臨時収入: "Renda extra",
    おこづかい: "Mesada",
  },
    
    
};

function getTranslatedCategory(category) {
  const languageCategories =
    categoryTranslations[currentLanguage] ||
    categoryTranslations.ja;

  return (
    languageCategories[category] ||
    category
  );
}


function getNormalTexts() {
  return (
    normalTranslations[currentLanguage] ||
    normalTranslations.ja
  );
}

function applyNormalLanguage() {
  const texts =
    getNormalTexts();

  document
    .querySelectorAll("[data-i18n]")
    .forEach((element) => {
      const key =
        element.dataset.i18n;

      if (texts[key] !== undefined) {
        element.textContent =
          texts[key];
      }
    });

  document
    .querySelectorAll(
      "[data-i18n-placeholder]"
    )
    .forEach((element) => {
      const key =
        element.dataset.i18nPlaceholder;

      if (texts[key] !== undefined) {
        element.placeholder =
          texts[key];
      }
    });

  document
    .querySelectorAll(
      "[data-i18n-aria-label]"
    )
    .forEach((element) => {
      const key =
        element.dataset.i18nAriaLabel;

      if (texts[key] !== undefined) {
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
/* =========================================================
   2. ユーザーごとの保存データ
========================================================= */

const currentUser =
  localStorage.getItem("currentUser") || "guest";

const storageKey = `kakeibo_${currentUser}`;

let data =
  JSON.parse(localStorage.getItem(storageKey)) || [];


/* =========================================================
   3. カメラ用の変数
========================================================= */

let cameraStream = null;
let autoCaptureTimer = null;
let isReadingReceipt = false;
let isOpeningCamera = false;
let cameraSessionId = 0;


/* =========================================================
   4. HTML要素
========================================================= */

const startBtn =
  document.getElementById("startBtn");

const closeCameraBtn =
  document.getElementById("closeCameraBtn");

const captureBtn =
  document.getElementById("captureBtn");

const cameraScreen =
  document.getElementById("cameraScreen");

const camera =
  document.getElementById("camera");

const canvas =
  document.getElementById("canvas");

const scanText =
  document.getElementById("scanText");


/* =========================================================
   5. ページ初期化
========================================================= */

window.addEventListener("DOMContentLoaded", () => {
  applyNormalLanguage();

  const dateInput =
    document.getElementById("date");

  const typeSelect =
    document.getElementById("type");

  const amountInput =
    document.getElementById("amount");

  dateInput.valueAsDate = new Date();
  typeSelect.value = "支出";

  changeCategory();
  showData();
  displayCurrentUser();

  /* Enterキーで追加 */
  amountInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      addData();
    }
  });

  /* カメラを開く */
  startBtn.addEventListener("click", startCamera);

  /* カメラを閉じる */
  closeCameraBtn.addEventListener(
    "click",
    closeCamera
  );

  /* 自動撮影を待たずに撮影 */
  captureBtn.addEventListener(
    "click",
    takePhoto
  );
});


/* =========================================================
   6. ログイン中のユーザー表示
========================================================= */

function displayCurrentUser() {
  const userDisplayEl =
    document.getElementById("user-display");

  if (!userDisplayEl) {
    return;
  }

  const userSuffixes = {
    ja: "さん",
    ko: "님",
  };

  const userSuffix =
    userSuffixes[currentLanguage] || "";

  userDisplayEl.textContent =
    userSuffix
      ? `${currentUser} ${userSuffix}`
      : currentUser;
}

/* =========================================================
   7. カテゴリー切り替え
========================================================= */

function changeCategory() {
  const type =
    document.getElementById("type").value;

  const category =
    document.getElementById("category");

  if (!category) {
    return;
  }

  category.innerHTML = "";

  const selectedList =
    type === "支出"
      ? expenseList
      : incomeList;

  selectedList.forEach((item) => {
    const option =
      document.createElement("option");

    option.value = item;
    option.textContent =
  getTranslatedCategory(item);

    category.appendChild(option);
  });
}


/* =========================================================
   8. データ追加
========================================================= */

function addData() {
  const texts =
    getNormalTexts();

  const date =
    document.getElementById("date").value;

  const type =
    document.getElementById("type").value;

  const category =
    document.getElementById("category").value;

  const amount =
    Number(
      document.getElementById("amount").value
    );

  const memo =
    document.getElementById("memo").value;

  if (date === "" || amount <= 0) {
    alert(
      texts.invalidDateAmount
    );

    return;
  }

  data.push({
    date,
    type,
    category,
    amount,
    memo,
  });

  localStorage.setItem(
    storageKey,
    JSON.stringify(data)
  );

  showData();

  showToast(
    texts.inputComplete
  );

  document.getElementById("amount").value = "";
  document.getElementById("memo").value = "";

  document.getElementById("date").valueAsDate =
    new Date();
}


/* =========================================================
   9. トースト通知
========================================================= */

function showToast(message) {
  const toast =
    document.createElement("div");

  toast.textContent = message;

  toast.style.cssText = `
    position: fixed;
    bottom: 20px;
    left: 50%;
    z-index: 9999;

    padding: 10px 20px;

    transform: translateX(-50%);

    background: #6fa98a;
    color: white;

    border-radius: 10px;

    opacity: 1;

    transition: opacity 0.5s;
  `;

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
  }, 700);

  setTimeout(() => {
    toast.remove();
  }, 1200);
}


/* =========================================================
   10. 当月データ集計
========================================================= */

function showData() {
  const log =
    document.getElementById("log");

  if (log) {
    log.innerHTML = "";
  }

  let income = 0;
  let expense = 0;

  const now = new Date();
  const thisMonth = now.getMonth();
  const thisYear = now.getFullYear();

  data.forEach((item) => {
    const itemDate =
      new Date(item.date + "T00:00:00");

    const isThisMonth =
      itemDate.getFullYear() === thisYear &&
      itemDate.getMonth() === thisMonth;

    if (!isThisMonth) {
      return;
    }

    if (item.type === "収入") {
      income += Number(item.amount);
    } else {
      expense += Number(item.amount);
    }
  });
}


/* =========================================================
   11. カメラを起動
========================================================= */

async function startCamera() {
  const texts =
  getNormalTexts();

  if (
    cameraStream ||
    isOpeningCamera
  ) {
    return;
  }

  if (
    !navigator.mediaDevices ||
    !navigator.mediaDevices.getUserMedia
  ) {
    alert(
      texts.cameraNotSupported
    );

    return;
  }

  isOpeningCamera = true;

  const currentSessionId =
    ++cameraSessionId;

  cameraScreen.classList.add("active");

  document.body.classList.add(
    "camera-open"
  );

  scanText.textContent =
    texts.cameraStarting;

  captureBtn.disabled = true;

  try {
    const newStream =
      await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: {
            ideal: "environment",
          },

          width: {
            ideal: 1920,
          },

          height: {
            ideal: 1080,
          },
        },

        audio: false,
      });

    /*
      カメラの許可画面中に戻るボタンを押した場合、
      あとからカメラが起動しないようにする
    */
    if (
      currentSessionId !==
      cameraSessionId
    ) {
      newStream
        .getTracks()
        .forEach((track) => {
          track.stop();
        });

      return;
    }

    cameraStream = newStream;

    camera.srcObject =
      cameraStream;

    await camera.play();

    captureBtn.disabled = false;

    scanText.textContent =
      texts.autoScanCountdown;

    /*
      10秒後に自動撮影
    */
    autoCaptureTimer =
      setTimeout(() => {
        takePhoto();
      }, 10000);
  } catch (error) {
    console.error(
      texts.cameraStartFailedLog,
      error
    );

    closeCamera();

    alert(
      texts.cameraPermissionError
    );
  } finally {
    isOpeningCamera = false;
  }
}

/* =========================================================
   12. 写真を撮影してOCRへ送信
========================================================= */

async function takePhoto() {
  const texts =
    getNormalTexts();

  /* 1ブラウザにつきOCRは1回まで */
  const OCR_LIMIT_KEY =
    "receiptOcrUsed";

  if (
    localStorage.getItem(
      OCR_LIMIT_KEY
    ) === "true"
  ) {
    alert(
      "レシート読み取り体験は1回までです"
    );

    closeCamera();

    return;
  }

  /*
    自動撮影と手動撮影が同時に実行されるのを防ぐ
  */
  if (isReadingReceipt) {
    return;
  }

  if (
    !cameraStream ||
    camera.videoWidth === 0 ||
    camera.videoHeight === 0
  ) {
    scanText.textContent =
      texts.cameraNotReady;

    return;
  }

  isReadingReceipt = true;

  captureBtn.disabled = true;

  clearAutoCaptureTimer();

  scanText.textContent =
    texts.readingReceipt;

  try {
    canvas.width =
      camera.videoWidth;

    canvas.height =
      camera.videoHeight;

    const context =
      canvas.getContext("2d");

    context.drawImage(
      camera,
      0,
      0,
      canvas.width,
      canvas.height
    );

    const imageBlob =
      await canvasToBlob(canvas);

    const formData =
      new FormData();

    formData.append(
      "image",
      imageBlob,
      "receipt.jpg"
    );

    const response =
      await fetch(
        "/ocr",
        {
          method: "POST",
          body: formData,
        }
      );

    if (!response.ok) {
      throw new Error(
        `OCR server error: ${response.status}`
      );
    }

    const receipt =
      await response.json();

    console.log(
      "Document AI:",
      receipt
    );

    inputDocumentAIData(
      receipt
    );

    /*
      OCR成功時だけ
      「1回使用済み」にする
    */
    localStorage.setItem(
      OCR_LIMIT_KEY,
      "true"
    );

    closeCamera();

    showToast(
      texts.receiptReadSuccess
    );

  } catch (error) {
    console.error(
      texts.receiptReadFailedLog,
      error
    );

    scanText.textContent =
      texts.receiptReadRetry;

    captureBtn.disabled = false;

    alert(
      texts.receiptReadServerError
    );

  } finally {
    isReadingReceipt = false;
  }
}
/* =========================================================
   13. Canvasを画像Blobへ変換
========================================================= */

function canvasToBlob(targetCanvas) {
  return new Promise((resolve, reject) => {
    targetCanvas.toBlob(
      (blob) => {
        if (blob) {
          resolve(blob);
        } else {
         const texts =
  getNormalTexts();

reject(
  new Error(
    texts.imageCreationFailed
  )
);
        }
      },

      "image/jpeg",
      0.92
    );
  });
}


/* =========================================================
   14. カメラを閉じる
========================================================= */


  function closeCamera() {
  const texts =
    getNormalTexts();

  /*
    起動中のカメラセッションを無効化
  */
  cameraSessionId += 1;

  clearAutoCaptureTimer();

  if (cameraStream) {
    cameraStream
      .getTracks()
      .forEach((track) => {
        track.stop();
      });

    cameraStream = null;
  }

  camera.srcObject = null;

  cameraScreen.classList.remove("active");
  document.body.classList.remove("camera-open");

  captureBtn.disabled = false;

  scanText.textContent =
    texts.receiptGuide;
}


/* =========================================================
   15. 自動撮影タイマーを解除
========================================================= */

function clearAutoCaptureTimer() {
  if (autoCaptureTimer) {
    clearTimeout(autoCaptureTimer);
    autoCaptureTimer = null;
  }
}
/* =========================================================
   16. OCR結果を入力欄へ反映
========================================================= */

function inputDocumentAIData(receipt) {
  const receiptDate = String(receipt.date || "")
    .normalize("NFKC")
    .replace(/\s+/g, "");

  let parsedDate = null;

  /* 2026年6月28日 */
  let match = receiptDate.match(
    /(\d{4})年(\d{1,2})月(\d{1,2})日/
  );

  /* 2026-06-28、2026/06/28 */
  if (!match) {
    match = receiptDate.match(
      /(\d{4})[-/](\d{1,2})[-/](\d{1,2})/
    );
  }

  if (match) {
    parsedDate = new Date(
      Number(match[1]),
      Number(match[2]) - 1,
      Number(match[3])
    );
  }

  /* 20260628のような8桁 */
  if (!parsedDate) {
    const digits =
      receiptDate.replace(/\D/g, "");

    if (/^\d{8}$/.test(digits)) {
      parsedDate = new Date(
        Number(digits.slice(0, 4)),
        Number(digits.slice(4, 6)) - 1,
        Number(digits.slice(6, 8))
      );
    }
  }

  /* 読み取った日付が現実的か確認 */
  if (
    parsedDate &&
    !Number.isNaN(parsedDate.getTime())
  ) {
    const today = new Date();

    today.setHours(0, 0, 0, 0);
    parsedDate.setHours(0, 0, 0, 0);

    const twoYearsAgo = new Date(today);
    twoYearsAgo.setFullYear(
      twoYearsAgo.getFullYear() - 2
    );

    const sevenDaysLater = new Date(today);
    sevenDaysLater.setDate(
      sevenDaysLater.getDate() + 7
    );

    if (
      parsedDate >= twoYearsAgo &&
      parsedDate <= sevenDaysLater
    ) {
      const year =
        parsedDate.getFullYear();

      const month = String(
        parsedDate.getMonth() + 1
      ).padStart(2, "0");

      const day = String(
        parsedDate.getDate()
      ).padStart(2, "0");

      document.getElementById("date").value =
        `${year}-${month}-${day}`;
    } else {
      console.warn(
        "OCRの日付が不自然なため使用しません:",
        receipt.date
      );
    }
  } else {
    console.warn(
      "OCRで日付を読み取れませんでした:",
      receipt.date
    );
  }

  const amount =
    String(receipt.amount || "")
      .replace(/[^\d]/g, "");

  document.getElementById("amount").value =
    amount;

  document.getElementById("memo").value =
    receipt.memo || "";

  document.getElementById("type").value =
    "支出";

  changeCategory();

  const categoryName =
    decideCategory(receipt);

  document.getElementById("category").value =
    categoryName;
}


/* =========================================================
   17. 店名・商品名からカテゴリー判定
========================================================= */
function decideCategory(receipt) {
  // OCR結果全体を文字列にする
  // memo以外の項目にCOSMOが入っていても探せる
  const text = JSON.stringify(receipt);

  const normalizedText = text
    .normalize("NFKC")
    .toLowerCase()
    .replace(/\s+/g, "");

  console.log(
    "カテゴリー判定用文字:",
    normalizedText
  );



  /* 洋服 */
  if (
    normalizedText.includes("ユニクロ") ||
    normalizedText.includes("gu") ||
    normalizedText.includes("しまむら") ||
    normalizedText.includes("zara") ||
    normalizedText.includes("h&m") ||
    normalizedText.includes("wego") ||
    normalizedText.includes("shein") ||
    normalizedText.includes("street") ||
    normalizedText.includes("2nd") ||
    normalizedText.includes("abc-mart")
  ) {
    return "洋服";
  }

  /* 日用品 */
  if (
    normalizedText.includes("無印") ||
    normalizedText.includes("ドンキ") ||
    normalizedText.includes("ロフト") ||
    normalizedText.includes("daiso") ||
    normalizedText.includes("ダイソー") ||
    normalizedText.includes("seria") ||
    normalizedText.includes("キャンドゥ")
  ) {
    return "日用品";
  }

  /* 交通費 */
  if (
    normalizedText.includes("jr") ||
    normalizedText.includes("suica") ||
    normalizedText.includes("pasmo") ||
    normalizedText.includes("駅") ||
    normalizedText.includes("cosmo") ||
    normalizedText.includes("コスモ石油") ||
    normalizedText.includes("コスモ") ||
    normalizedText.includes("バス")
  ) {
    return "交通費";
  }

  if (
    normalizedText.includes("アルス")
  ) {
    return "学費";
  }

  if (
    normalizedText.includes("病院")||
    normalizedText.includes("hospital")
  ) {
    return "医療費";
  }

  /* 食費 */
  if (
    normalizedText.includes("lawson") ||
    normalizedText.includes("かば") ||
    normalizedText.includes("dou") ||
    normalizedText.includes("mine") ||
    normalizedText.includes("az") ||
    normalizedText.includes("セブン") ||
    normalizedText.includes("familymart") ||
    normalizedText.includes("マクドナルド") ||
    normalizedText.includes("すき家") ||
    normalizedText.includes("サイゼリヤ") ||
    normalizedText.includes("スターバックス") ||
    normalizedText.includes("ドトール") ||
    normalizedText.includes("タリーズ") ||
    normalizedText.includes("ミスド") ||
    normalizedText.includes("ケンタッキー") ||
    normalizedText.includes("モスバーガー") ||
    normalizedText.includes("松屋") ||
    normalizedText.includes("吉野家") ||
    normalizedText.includes("丸亀") ||
    normalizedText.includes("ガスト") ||
    normalizedText.includes("ココス") ||
    normalizedText.includes("スシロー") ||
    normalizedText.includes("くら寿司") ||
    normalizedText.includes("ミニストップ") ||
    normalizedText.includes("ministop") ||
    normalizedText.includes("ベルク") ||
    normalizedText.includes("ヤオヒロ") ||
    normalizedText.includes("yao") ||
    normalizedText.includes("eon") || 
    normalizedText.includes("bento") || 
    normalizedText.includes("blooming") ||
    normalizedText.includes("good") ||
    normalizedText.includes("イオン") ||
    normalizedText.includes("anger") ||
    normalizedText.includes("パティスリーアンジェラ") ||
    normalizedText.includes("はま寿司")
  ) {
    return "食費";
  }

  /* 娯楽費 */
  if (
    normalizedText.includes("新時代") ||
    normalizedText.includes("貴族") ||
    normalizedText.includes("cinema") ||
    normalizedText.includes("カラオケ")
  ) {
    return "娯楽費";
  }

  return "日用品";
}


/* =========================================================
   18. ログアウト
========================================================= */

function handleLogout() {
  const texts =
  getNormalTexts();

const shouldLogout =
  confirm(
    texts.logoutConfirm
  );
    

  if (!shouldLogout) {
    return;
  }

  closeCamera();

  localStorage.removeItem("currentUser");

  window.location.href = "login.html";
}