/* =========================================================
   js/category.js
   12言語対応 カテゴリ管理ページ
   ========================================================= */


/* =========================================================
   1. ユーザー・保存キー
   ========================================================= */

const currentUser =
  localStorage.getItem("currentUser") || "guest";

const CATEGORY_STORAGE_KEY =
  `category_master_${currentUser}`;

const LANGUAGE_STORAGE_KEY =
  "appLanguage";


/* =========================================================
   2. 対応言語
   ========================================================= */

const LANGUAGES = [
  {
    code: "ja",
    label: "日本語",
  },
  {
    code: "en",
    label: "English",
  },
  {
    code: "my",
    label: "မြန်မာ",
  },
  {
    code: "id",
    label: "Bahasa Indonesia",
  },
  {
    code: "zh-CN",
    label: "简体中文",
  },
  {
    code: "zh-TW",
    label: "繁體中文",
  },
  {
    code: "ru",
    label: "Русский",
  },
  {
    code: "vi",
    label: "Tiếng Việt",
  },
  {
    code: "ko",
    label: "한국어",
  },
  {
    code: "th",
    label: "ภาษาไทย",
  },
  {
    code: "es",
    label: "Español",
  },
  {
    code: "pt-BR",
    label: "Português",
  },
];


/* =========================================================
   3. 画面表示用翻訳
   ========================================================= */

const UI_TRANSLATIONS = {
  ja: {
    appName: "節約チェッカー・家計簿",
    pageTitle: "カテゴリ管理",
    pageDescription:
      "各モードで使用するカテゴリを追加・編集・削除できます。",
    displayLanguage: "表示言語",
    back: "戻る",

    checkerMode: "節約チェッカーモード",
    checkerDescription:
      "満足度を記録する支出で使用するカテゴリです。",

    householdMode: "家計簿モード",
    householdDescription:
      "通常の家計簿入力で使用するカテゴリです。",

    expenseCategory: "支出カテゴリ",
    incomeCategory: "収入カテゴリ",
    addCategory: "カテゴリを追加",

    addTitle: "カテゴリを追加",
    editTitle: "カテゴリを編集",

    editorDescription:
      "日本語名は必須です。ほかの言語が未入力の場合は、日本語名が表示されます。",

    required: "必須",
    optional: "任意",

    save: "保存する",
    cancel: "キャンセル",
    edit: "編集",
    delete: "削除",

    expense: "支出",
    income: "収入",

    empty: "カテゴリがありません。",

    fallbackJapanese:
      "日本語名を表示しています",

    deleteNotice:
      "カテゴリを削除しても、すでに登録されている過去の支出・収入データは削除されません。",

    deleteConfirm:
      "「{name}」をカテゴリ一覧から削除しますか？\n過去の登録データは削除されません。",

    saved:
      "カテゴリを保存しました。",

    deleted:
      "カテゴリを削除しました。",

    requiredJapanese:
      "日本語のカテゴリ名を入力してください。",

    duplicate:
      "同じ日本語名のカテゴリがすでに登録されています。",

    cannotDeleteLast:
      "カテゴリをすべて削除することはできません。最低1つは残してください。",

    inputPlaceholder:
      "カテゴリ名を入力",
  },


  en: {
    appName: "Savings Checker / Household Budget",
    pageTitle: "Category Management",
    pageDescription:
      "Add, edit, or delete the categories used in each mode.",
    displayLanguage: "Display language",
    back: "Back",

    checkerMode: "Savings Checker Mode",
    checkerDescription:
      "Categories used for expenses with satisfaction ratings.",

    householdMode: "Household Budget Mode",
    householdDescription:
      "Categories used for regular income and expense entries.",

    expenseCategory: "Expense categories",
    incomeCategory: "Income categories",
    addCategory: "Add category",

    addTitle: "Add category",
    editTitle: "Edit category",

    editorDescription:
      "The Japanese name is required. If another language is blank, the Japanese name will be displayed.",

    required: "Required",
    optional: "Optional",

    save: "Save",
    cancel: "Cancel",
    edit: "Edit",
    delete: "Delete",

    expense: "Expense",
    income: "Income",

    empty: "No categories have been registered.",

    fallbackJapanese:
      "Showing Japanese name",

    deleteNotice:
      "Deleting a category will not delete previously saved income or expense records.",

    deleteConfirm:
      "Delete “{name}” from the category list?\nPreviously saved records will not be deleted.",

    saved:
      "The category has been saved.",

    deleted:
      "The category has been deleted.",

    requiredJapanese:
      "Please enter the Japanese category name.",

    duplicate:
      "A category with the same Japanese name already exists.",

    cannotDeleteLast:
      "You cannot delete every category. Please leave at least one category.",

    inputPlaceholder:
      "Enter category name",
  },


  my: {
    appName: "ချွေတာရေးစစ်ဆေးမှု / အိမ်သုံးစာရင်း",
    pageTitle: "အမျိုးအစား စီမံခန့်ခွဲမှု",
    pageDescription:
      "မုဒ်တစ်ခုစီတွင် အသုံးပြုသည့် အမျိုးအစားများကို ထည့်ခြင်း၊ ပြင်ဆင်ခြင်းနှင့် ဖျက်ခြင်း ပြုလုပ်နိုင်သည်။",
    displayLanguage: "ပြသမည့်ဘာသာစကား",
    back: "နောက်သို့",

    checkerMode: "ချွေတာရေးစစ်ဆေးမှု မုဒ်",
    checkerDescription:
      "ကျေနပ်မှုအဆင့် မှတ်တမ်းတင်သည့် အသုံးစရိတ်အတွက် အမျိုးအစားများဖြစ်သည်။",

    householdMode: "အိမ်သုံးစာရင်း မုဒ်",
    householdDescription:
      "ပုံမှန် ဝင်ငွေနှင့် အသုံးစရိတ် ထည့်သွင်းရာတွင် အသုံးပြုသည့် အမျိုးအစားများဖြစ်သည်။",

    expenseCategory: "အသုံးစရိတ် အမျိုးအစားများ",
    incomeCategory: "ဝင်ငွေ အမျိုးအစားများ",
    addCategory: "အမျိုးအစား ထည့်ရန်",

    addTitle: "အမျိုးအစား ထည့်ရန်",
    editTitle: "အမျိုးအစား ပြင်ရန်",

    editorDescription:
      "ဂျပန်အမည်ကို မဖြစ်မနေ ထည့်ရမည်။ အခြားဘာသာစကားကို မထည့်ထားပါက ဂျပန်အမည်ကို ပြသမည်။",

    required: "မဖြစ်မနေ",
    optional: "ရွေးချယ်နိုင်",

    save: "သိမ်းရန်",
    cancel: "မလုပ်တော့ပါ",
    edit: "ပြင်ရန်",
    delete: "ဖျက်ရန်",

    expense: "အသုံးစရိတ်",
    income: "ဝင်ငွေ",

    empty: "အမျိုးအစား မရှိသေးပါ။",

    fallbackJapanese:
      "ဂျပန်အမည်ကို ပြသထားသည်",

    deleteNotice:
      "အမျိုးအစားကို ဖျက်သော်လည်း ယခင်သိမ်းထားသော ဝင်ငွေနှင့် အသုံးစရိတ်ဒေတာများကို မဖျက်ပါ။",

    deleteConfirm:
      "“{name}” ကို အမျိုးအစားစာရင်းမှ ဖျက်မည်လား။\nယခင်ဒေတာများကို မဖျက်ပါ။",

    saved:
      "အမျိုးအစားကို သိမ်းပြီးပါပြီ။",

    deleted:
      "အမျိုးအစားကို ဖျက်ပြီးပါပြီ။",

    requiredJapanese:
      "ဂျပန်ဘာသာ အမျိုးအစားအမည်ကို ထည့်ပါ။",

    duplicate:
      "တူညီသော ဂျပန်အမည်ဖြင့် အမျိုးအစားရှိပြီးသားဖြစ်သည်။",

    cannotDeleteLast:
      "အမျိုးအစားအားလုံးကို ဖျက်၍မရပါ။ အနည်းဆုံးတစ်ခု ချန်ထားပါ။",

    inputPlaceholder:
      "အမျိုးအစားအမည် ထည့်ပါ",
  },


  id: {
    appName:
      "Pemeriksa Penghematan / Keuangan Rumah Tangga",
    pageTitle:
      "Kelola Kategori",
    pageDescription:
      "Tambahkan, edit, atau hapus kategori yang digunakan pada setiap mode.",
    displayLanguage:
      "Bahasa tampilan",
    back:
      "Kembali",

    checkerMode:
      "Mode Pemeriksa Penghematan",
    checkerDescription:
      "Kategori untuk pengeluaran yang diberi nilai kepuasan.",

    householdMode:
      "Mode Keuangan Rumah Tangga",
    householdDescription:
      "Kategori untuk pencatatan pemasukan dan pengeluaran biasa.",

    expenseCategory:
      "Kategori pengeluaran",
    incomeCategory:
      "Kategori pemasukan",
    addCategory:
      "Tambah kategori",

    addTitle:
      "Tambah kategori",
    editTitle:
      "Edit kategori",

    editorDescription:
      "Nama bahasa Jepang wajib diisi. Jika bahasa lain kosong, nama Jepang akan ditampilkan.",

    required:
      "Wajib",
    optional:
      "Opsional",

    save:
      "Simpan",
    cancel:
      "Batal",
    edit:
      "Edit",
    delete:
      "Hapus",

    expense:
      "Pengeluaran",
    income:
      "Pemasukan",

    empty:
      "Belum ada kategori.",

    fallbackJapanese:
      "Menampilkan nama Jepang",

    deleteNotice:
      "Menghapus kategori tidak akan menghapus data pemasukan atau pengeluaran yang telah disimpan.",

    deleteConfirm:
      "Hapus “{name}” dari daftar kategori?\nData lama tidak akan dihapus.",

    saved:
      "Kategori telah disimpan.",

    deleted:
      "Kategori telah dihapus.",

    requiredJapanese:
      "Masukkan nama kategori dalam bahasa Jepang.",

    duplicate:
      "Kategori dengan nama Jepang yang sama sudah terdaftar.",

    cannotDeleteLast:
      "Semua kategori tidak dapat dihapus. Sisakan minimal satu kategori.",

    inputPlaceholder:
      "Masukkan nama kategori",
  },


  "zh-CN": {
    appName:
      "省钱检查 / 家庭记账",
    pageTitle:
      "分类管理",
    pageDescription:
      "可以添加、编辑或删除各模式使用的分类。",
    displayLanguage:
      "显示语言",
    back:
      "返回",

    checkerMode:
      "省钱检查模式",
    checkerDescription:
      "用于记录消费满意度的支出分类。",

    householdMode:
      "家庭记账模式",
    householdDescription:
      "用于普通收入和支出记录的分类。",

    expenseCategory:
      "支出分类",
    incomeCategory:
      "收入分类",
    addCategory:
      "添加分类",

    addTitle:
      "添加分类",
    editTitle:
      "编辑分类",

    editorDescription:
      "日语名称为必填项。其他语言未填写时，将显示日语名称。",

    required:
      "必填",
    optional:
      "选填",

    save:
      "保存",
    cancel:
      "取消",
    edit:
      "编辑",
    delete:
      "删除",

    expense:
      "支出",
    income:
      "收入",

    empty:
      "暂无分类。",

    fallbackJapanese:
      "正在显示日语名称",

    deleteNotice:
      "删除分类不会删除过去已保存的收入或支出数据。",

    deleteConfirm:
      "要从分类列表中删除“{name}”吗？\n过去的数据不会被删除。",

    saved:
      "分类已保存。",

    deleted:
      "分类已删除。",

    requiredJapanese:
      "请输入日语分类名称。",

    duplicate:
      "已存在相同日语名称的分类。",

    cannotDeleteLast:
      "不能删除全部分类。请至少保留一个分类。",

    inputPlaceholder:
      "请输入分类名称",
  },


  "zh-TW": {
    appName:
      "省錢檢查 / 家庭記帳",
    pageTitle:
      "分類管理",
    pageDescription:
      "可以新增、編輯或刪除各模式使用的分類。",
    displayLanguage:
      "顯示語言",
    back:
      "返回",

    checkerMode:
      "省錢檢查模式",
    checkerDescription:
      "用於記錄消費滿意度的支出分類。",

    householdMode:
      "家庭記帳模式",
    householdDescription:
      "用於一般收入與支出記錄的分類。",

    expenseCategory:
      "支出分類",
    incomeCategory:
      "收入分類",
    addCategory:
      "新增分類",

    addTitle:
      "新增分類",
    editTitle:
      "編輯分類",

    editorDescription:
      "日文名稱為必填。其他語言未填寫時，將顯示日文名稱。",

    required:
      "必填",
    optional:
      "選填",

    save:
      "儲存",
    cancel:
      "取消",
    edit:
      "編輯",
    delete:
      "刪除",

    expense:
      "支出",
    income:
      "收入",

    empty:
      "目前沒有分類。",

    fallbackJapanese:
      "正在顯示日文名稱",

    deleteNotice:
      "刪除分類不會刪除過去已儲存的收入或支出資料。",

    deleteConfirm:
      "要從分類清單中刪除「{name}」嗎？\n過去的資料不會被刪除。",

    saved:
      "分類已儲存。",

    deleted:
      "分類已刪除。",

    requiredJapanese:
      "請輸入日文分類名稱。",

    duplicate:
      "已經存在相同日文名稱的分類。",

    cannotDeleteLast:
      "不能刪除全部分類。請至少保留一個分類。",

    inputPlaceholder:
      "請輸入分類名稱",
  },


  ru: {
    appName:
      "Контроль экономии / Домашний бюджет",
    pageTitle:
      "Управление категориями",
    pageDescription:
      "Добавляйте, редактируйте и удаляйте категории для каждого режима.",
    displayLanguage:
      "Язык интерфейса",
    back:
      "Назад",

    checkerMode:
      "Режим контроля экономии",
    checkerDescription:
      "Категории расходов с оценкой удовлетворённости.",

    householdMode:
      "Режим домашнего бюджета",
    householdDescription:
      "Категории для обычного учёта доходов и расходов.",

    expenseCategory:
      "Категории расходов",
    incomeCategory:
      "Категории доходов",
    addCategory:
      "Добавить категорию",

    addTitle:
      "Добавить категорию",
    editTitle:
      "Редактировать категорию",

    editorDescription:
      "Название на японском языке обязательно. Если другой перевод не указан, будет показано японское название.",

    required:
      "Обязательно",
    optional:
      "Необязательно",

    save:
      "Сохранить",
    cancel:
      "Отмена",
    edit:
      "Изменить",
    delete:
      "Удалить",

    expense:
      "Расход",
    income:
      "Доход",

    empty:
      "Категорий пока нет.",

    fallbackJapanese:
      "Показано японское название",

    deleteNotice:
      "Удаление категории не удаляет ранее сохранённые записи о доходах и расходах.",

    deleteConfirm:
      "Удалить «{name}» из списка категорий?\nРанее сохранённые записи останутся.",

    saved:
      "Категория сохранена.",

    deleted:
      "Категория удалена.",

    requiredJapanese:
      "Введите название категории на японском языке.",

    duplicate:
      "Категория с таким японским названием уже существует.",

    cannotDeleteLast:
      "Нельзя удалить все категории. Оставьте хотя бы одну.",

    inputPlaceholder:
      "Введите название категории",
  },


  vi: {
    appName:
      "Kiểm tra tiết kiệm / Sổ thu chi",
    pageTitle:
      "Quản lý danh mục",
    pageDescription:
      "Thêm, chỉnh sửa hoặc xóa các danh mục sử dụng trong từng chế độ.",
    displayLanguage:
      "Ngôn ngữ hiển thị",
    back:
      "Quay lại",

    checkerMode:
      "Chế độ kiểm tra tiết kiệm",
    checkerDescription:
      "Danh mục chi tiêu có ghi lại mức độ hài lòng.",

    householdMode:
      "Chế độ sổ thu chi",
    householdDescription:
      "Danh mục dùng để ghi thu nhập và chi tiêu thông thường.",

    expenseCategory:
      "Danh mục chi tiêu",
    incomeCategory:
      "Danh mục thu nhập",
    addCategory:
      "Thêm danh mục",

    addTitle:
      "Thêm danh mục",
    editTitle:
      "Chỉnh sửa danh mục",

    editorDescription:
      "Tên tiếng Nhật là bắt buộc. Nếu ngôn ngữ khác để trống, tên tiếng Nhật sẽ được hiển thị.",

    required:
      "Bắt buộc",
    optional:
      "Không bắt buộc",

    save:
      "Lưu",
    cancel:
      "Hủy",
    edit:
      "Sửa",
    delete:
      "Xóa",

    expense:
      "Chi tiêu",
    income:
      "Thu nhập",

    empty:
      "Chưa có danh mục.",

    fallbackJapanese:
      "Đang hiển thị tên tiếng Nhật",

    deleteNotice:
      "Việc xóa danh mục không làm mất dữ liệu thu nhập hoặc chi tiêu đã lưu trước đó.",

    deleteConfirm:
      "Xóa “{name}” khỏi danh sách danh mục?\nDữ liệu cũ sẽ không bị xóa.",

    saved:
      "Đã lưu danh mục.",

    deleted:
      "Đã xóa danh mục.",

    requiredJapanese:
      "Vui lòng nhập tên danh mục bằng tiếng Nhật.",

    duplicate:
      "Đã tồn tại danh mục có cùng tên tiếng Nhật.",

    cannotDeleteLast:
      "Không thể xóa tất cả danh mục. Vui lòng giữ lại ít nhất một danh mục.",

    inputPlaceholder:
      "Nhập tên danh mục",
  },


  ko: {
    appName:
      "절약 체크 / 가계부",
    pageTitle:
      "카테고리 관리",
    pageDescription:
      "각 모드에서 사용하는 카테고리를 추가, 수정 또는 삭제할 수 있습니다.",
    displayLanguage:
      "표시 언어",
    back:
      "뒤로",

    checkerMode:
      "절약 체크 모드",
    checkerDescription:
      "만족도를 기록하는 지출에 사용하는 카테고리입니다.",

    householdMode:
      "가계부 모드",
    householdDescription:
      "일반적인 수입과 지출 기록에 사용하는 카테고리입니다.",

    expenseCategory:
      "지출 카테고리",
    incomeCategory:
      "수입 카테고리",
    addCategory:
      "카테고리 추가",

    addTitle:
      "카테고리 추가",
    editTitle:
      "카테고리 수정",

    editorDescription:
      "일본어 이름은 필수입니다. 다른 언어가 비어 있으면 일본어 이름이 표시됩니다.",

    required:
      "필수",
    optional:
      "선택",

    save:
      "저장",
    cancel:
      "취소",
    edit:
      "수정",
    delete:
      "삭제",

    expense:
      "지출",
    income:
      "수입",

    empty:
      "등록된 카테고리가 없습니다.",

    fallbackJapanese:
      "일본어 이름 표시 중",

    deleteNotice:
      "카테고리를 삭제해도 이전에 저장한 수입 및 지출 데이터는 삭제되지 않습니다.",

    deleteConfirm:
      "“{name}” 카테고리를 삭제하시겠습니까?\n이전에 저장한 데이터는 삭제되지 않습니다.",

    saved:
      "카테고리를 저장했습니다.",

    deleted:
      "카테고리를 삭제했습니다.",

    requiredJapanese:
      "일본어 카테고리 이름을 입력해 주세요.",

    duplicate:
      "같은 일본어 이름의 카테고리가 이미 있습니다.",

    cannotDeleteLast:
      "모든 카테고리를 삭제할 수 없습니다. 최소 한 개는 남겨 주세요.",

    inputPlaceholder:
      "카테고리 이름 입력",
  },


  th: {
    appName:
      "ตัวช่วยตรวจสอบการประหยัด / บัญชีครัวเรือน",
    pageTitle:
      "จัดการหมวดหมู่",
    pageDescription:
      "เพิ่ม แก้ไข หรือลบหมวดหมู่ที่ใช้ในแต่ละโหมดได้",
    displayLanguage:
      "ภาษาที่แสดง",
    back:
      "กลับ",

    checkerMode:
      "โหมดตรวจสอบการประหยัด",
    checkerDescription:
      "หมวดหมู่สำหรับรายจ่ายที่มีการบันทึกระดับความพึงพอใจ",

    householdMode:
      "โหมดบัญชีครัวเรือน",
    householdDescription:
      "หมวดหมู่สำหรับบันทึกรายรับและรายจ่ายทั่วไป",

    expenseCategory:
      "หมวดหมู่รายจ่าย",
    incomeCategory:
      "หมวดหมู่รายรับ",
    addCategory:
      "เพิ่มหมวดหมู่",

    addTitle:
      "เพิ่มหมวดหมู่",
    editTitle:
      "แก้ไขหมวดหมู่",

    editorDescription:
      "ต้องกรอกชื่อภาษาญี่ปุ่น หากไม่ได้กรอกภาษาอื่น ระบบจะแสดงชื่อภาษาญี่ปุ่น",

    required:
      "จำเป็น",
    optional:
      "ไม่บังคับ",

    save:
      "บันทึก",
    cancel:
      "ยกเลิก",
    edit:
      "แก้ไข",
    delete:
      "ลบ",

    expense:
      "รายจ่าย",
    income:
      "รายรับ",

    empty:
      "ยังไม่มีหมวดหมู่",

    fallbackJapanese:
      "กำลังแสดงชื่อภาษาญี่ปุ่น",

    deleteNotice:
      "การลบหมวดหมู่จะไม่ลบข้อมูลรายรับหรือรายจ่ายที่บันทึกไว้ก่อนหน้านี้",

    deleteConfirm:
      "ลบ “{name}” ออกจากรายการหมวดหมู่หรือไม่?\nข้อมูลเดิมจะไม่ถูกลบ",

    saved:
      "บันทึกหมวดหมู่แล้ว",

    deleted:
      "ลบหมวดหมู่แล้ว",

    requiredJapanese:
      "กรุณากรอกชื่อหมวดหมู่ภาษาญี่ปุ่น",

    duplicate:
      "มีหมวดหมู่ที่ใช้ชื่อภาษาญี่ปุ่นเดียวกันอยู่แล้ว",

    cannotDeleteLast:
      "ไม่สามารถลบหมวดหมู่ทั้งหมดได้ กรุณาเหลือไว้อย่างน้อยหนึ่งหมวดหมู่",

    inputPlaceholder:
      "กรอกชื่อหมวดหมู่",
  },


  es: {
    appName:
      "Control de ahorro / Presupuesto familiar",
    pageTitle:
      "Gestión de categorías",
    pageDescription:
      "Añade, edita o elimina las categorías utilizadas en cada modo.",
    displayLanguage:
      "Idioma de visualización",
    back:
      "Volver",

    checkerMode:
      "Modo de control de ahorro",
    checkerDescription:
      "Categorías de gastos que incluyen una valoración de satisfacción.",

    householdMode:
      "Modo de presupuesto familiar",
    householdDescription:
      "Categorías utilizadas para registrar ingresos y gastos habituales.",

    expenseCategory:
      "Categorías de gastos",
    incomeCategory:
      "Categorías de ingresos",
    addCategory:
      "Añadir categoría",

    addTitle:
      "Añadir categoría",
    editTitle:
      "Editar categoría",

    editorDescription:
      "El nombre en japonés es obligatorio. Si otro idioma está vacío, se mostrará el nombre japonés.",

    required:
      "Obligatorio",
    optional:
      "Opcional",

    save:
      "Guardar",
    cancel:
      "Cancelar",
    edit:
      "Editar",
    delete:
      "Eliminar",

    expense:
      "Gasto",
    income:
      "Ingreso",

    empty:
      "No hay categorías registradas.",

    fallbackJapanese:
      "Mostrando el nombre japonés",

    deleteNotice:
      "Eliminar una categoría no borrará los ingresos ni los gastos guardados anteriormente.",

    deleteConfirm:
      "¿Eliminar “{name}” de la lista de categorías?\nLos datos anteriores no se eliminarán.",

    saved:
      "La categoría se ha guardado.",

    deleted:
      "La categoría se ha eliminado.",

    requiredJapanese:
      "Introduce el nombre de la categoría en japonés.",

    duplicate:
      "Ya existe una categoría con el mismo nombre en japonés.",

    cannotDeleteLast:
      "No se pueden eliminar todas las categorías. Debe quedar al menos una.",

    inputPlaceholder:
      "Introduce el nombre de la categoría",
  },


  "pt-BR": {
    appName:
      "Controle de economia / Orçamento doméstico",
    pageTitle:
      "Gerenciar categorias",
    pageDescription:
      "Adicione, edite ou exclua as categorias usadas em cada modo.",
    displayLanguage:
      "Idioma de exibição",
    back:
      "Voltar",

    checkerMode:
      "Modo de controle de economia",
    checkerDescription:
      "Categorias de despesas que recebem uma avaliação de satisfação.",

    householdMode:
      "Modo de orçamento doméstico",
    householdDescription:
      "Categorias usadas para registrar receitas e despesas comuns.",

    expenseCategory:
      "Categorias de despesas",
    incomeCategory:
      "Categorias de receitas",
    addCategory:
      "Adicionar categoria",

    addTitle:
      "Adicionar categoria",
    editTitle:
      "Editar categoria",

    editorDescription:
      "O nome em japonês é obrigatório. Se outro idioma estiver vazio, o nome japonês será exibido.",

    required:
      "Obrigatório",
    optional:
      "Opcional",

    save:
      "Salvar",
    cancel:
      "Cancelar",
    edit:
      "Editar",
    delete:
      "Excluir",

    expense:
      "Despesa",
    income:
      "Receita",

    empty:
      "Nenhuma categoria cadastrada.",

    fallbackJapanese:
      "Exibindo o nome em japonês",

    deleteNotice:
      "Excluir uma categoria não apagará receitas ou despesas salvas anteriormente.",

    deleteConfirm:
      "Excluir “{name}” da lista de categorias?\nOs dados anteriores não serão apagados.",

    saved:
      "A categoria foi salva.",

    deleted:
      "A categoria foi excluída.",

    requiredJapanese:
      "Digite o nome da categoria em japonês.",

    duplicate:
      "Já existe uma categoria com o mesmo nome em japonês.",

    cannotDeleteLast:
      "Não é possível excluir todas as categorias. Mantenha pelo menos uma.",

    inputPlaceholder:
      "Digite o nome da categoria",
  },
};


/* =========================================================
   4. 12言語のカテゴリ名を作る関数
   ========================================================= */

function createNames(
  ja,
  en,
  my,
  id,
  zhCN,
  zhTW,
  ru,
  vi,
  ko,
  th,
  es,
  ptBR
) {
  return {
    ja,
    en,
    my,
    id,
    "zh-CN": zhCN,
    "zh-TW": zhTW,
    ru,
    vi,
    ko,
    th,
    es,
    "pt-BR": ptBR,
  };
}


/* =========================================================
   5. 初期カテゴリの12言語名
   ========================================================= */

const CATEGORY_NAME_LIBRARY = {
  food: createNames(
    "食費",
    "Food",
    "အစားအသောက်စရိတ်",
    "Makanan",
    "餐饮费",
    "餐飲費",
    "Продукты и питание",
    "Ăn uống",
    "식비",
    "ค่าอาหาร",
    "Alimentación",
    "Alimentação"
  ),

  daily: createNames(
    "日用品",
    "Daily necessities",
    "နေ့စဉ်သုံးပစ္စည်းများ",
    "Kebutuhan sehari-hari",
    "日用品",
    "日用品",
    "Бытовые товары",
    "Đồ dùng hằng ngày",
    "생활용품",
    "ของใช้ประจำวัน",
    "Artículos de uso diario",
    "Itens do dia a dia"
  ),

  transport: createNames(
    "交通費",
    "Transportation",
    "သွားလာစရိတ်",
    "Transportasi",
    "交通费",
    "交通費",
    "Транспорт",
    "Đi lại",
    "교통비",
    "ค่าเดินทาง",
    "Transporte",
    "Transporte"
  ),

  entertainment: createNames(
    "娯楽費",
    "Entertainment",
    "အပန်းဖြေစရိတ်",
    "Hiburan",
    "娱乐费",
    "娛樂費",
    "Развлечения",
    "Giải trí",
    "여가비",
    "ค่าความบันเทิง",
    "Ocio",
    "Lazer"
  ),

  clothing: createNames(
    "洋服",
    "Clothing",
    "အဝတ်အစား",
    "Pakaian",
    "服装",
    "服飾",
    "Одежда",
    "Quần áo",
    "의류",
    "เสื้อผ้า",
    "Ropa",
    "Roupas"
  ),

  beauty: createNames(
    "美容",
    "Beauty",
    "အလှအပ",
    "Kecantikan",
    "美容",
    "美容",
    "Красота и уход",
    "Làm đẹp",
    "미용",
    "ความงาม",
    "Belleza",
    "Beleza"
  ),

  subscription: createNames(
    "サブスク",
    "Subscriptions",
    "စာရင်းသွင်းဝန်ဆောင်မှု",
    "Langganan",
    "订阅",
    "訂閱",
    "Подписки",
    "Gói đăng ký",
    "구독",
    "ค่าสมาชิก",
    "Suscripciones",
    "Assinaturas"
  ),

  hobby: createNames(
    "趣味",
    "Hobbies",
    "ဝါသနာ",
    "Hobi",
    "兴趣爱好",
    "興趣嗜好",
    "Хобби",
    "Sở thích",
    "취미",
    "งานอดิเรก",
    "Aficiones",
    "Hobbies"
  ),

  impulse: createNames(
    "衝動買い",
    "Impulse purchases",
    "စိတ်လိုက်မာန်ပါဝယ်ယူမှု",
    "Belanja impulsif",
    "冲动消费",
    "衝動購物",
    "Импульсивные покупки",
    "Mua sắm bốc đồng",
    "충동구매",
    "ซื้อของตามอารมณ์",
    "Compras impulsivas",
    "Compras por impulso"
  ),

  other: createNames(
    "その他",
    "Other",
    "အခြား",
    "Lainnya",
    "其他",
    "其他",
    "Другое",
    "Khác",
    "기타",
    "อื่น ๆ",
    "Otros",
    "Outros"
  ),

  tuition: createNames(
    "学費",
    "Tuition",
    "ကျောင်းလခ",
    "Biaya pendidikan",
    "学费",
    "學費",
    "Плата за обучение",
    "Học phí",
    "학비",
    "ค่าเล่าเรียน",
    "Matrícula",
    "Mensalidade escolar"
  ),

  rent: createNames(
    "家賃",
    "Rent",
    "အိမ်ငှားခ",
    "Sewa rumah",
    "房租",
    "房租",
    "Аренда жилья",
    "Tiền thuê nhà",
    "월세",
    "ค่าเช่าบ้าน",
    "Alquiler",
    "Aluguel"
  ),

  utilities: createNames(
    "光熱費",
    "Utilities",
    "မီး၊ ရေ၊ ဓာတ်ငွေ့ခ",
    "Listrik, air, dan gas",
    "水电燃气费",
    "水電瓦斯費",
    "Коммунальные услуги",
    "Điện, nước và gas",
    "공과금",
    "ค่าน้ำค่าไฟ",
    "Servicios básicos",
    "Contas de consumo"
  ),

  creditCard: createNames(
    "クレカ",
    "Credit card",
    "ခရက်ဒစ်ကတ်",
    "Kartu kredit",
    "信用卡",
    "信用卡",
    "Кредитная карта",
    "Thẻ tín dụng",
    "신용카드",
    "บัตรเครดิต",
    "Tarjeta de crédito",
    "Cartão de crédito"
  ),

  medical: createNames(
    "医療費",
    "Medical expenses",
    "ဆေးကုသစရိတ်",
    "Biaya medis",
    "医疗费",
    "醫療費",
    "Медицинские расходы",
    "Chi phí y tế",
    "의료비",
    "ค่ารักษาพยาบาล",
    "Gastos médicos",
    "Despesas médicas"
  ),

  insurance: createNames(
    "保険代",
    "Insurance",
    "အာမခံကြေး",
    "Asuransi",
    "保险费",
    "保險費",
    "Страхование",
    "Bảo hiểm",
    "보험료",
    "ค่าประกัน",
    "Seguros",
    "Seguros"
  ),

  salary: createNames(
    "給料",
    "Salary",
    "လစာ",
    "Gaji",
    "工资",
    "薪資",
    "Зарплата",
    "Lương",
    "급여",
    "เงินเดือน",
    "Salario",
    "Salário"
  ),

  extraIncome: createNames(
    "臨時収入",
    "Extra income",
    "အပိုဝင်ငွေ",
    "Pendapatan tambahan",
    "临时收入",
    "臨時收入",
    "Дополнительный доход",
    "Thu nhập thêm",
    "임시 수입",
    "รายได้พิเศษ",
    "Ingresos extra",
    "Renda extra"
  ),

  allowance: createNames(
    "おこづかい",
    "Allowance",
    "မုန့်ဖိုး",
    "Uang saku",
    "零花钱",
    "零用錢",
    "Карманные деньги",
    "Tiền tiêu vặt",
    "용돈",
    "เงินค่าขนม",
    "Paga",
    "Mesada"
  ),
};


/* =========================================================
   6. 初期カテゴリ
   ========================================================= */

const DEFAULT_CATEGORY_SETTINGS = [
  /* 節約チェッカーモード */

  ["checker", "expense", "food"],
  ["checker", "expense", "daily"],
  ["checker", "expense", "transport"],
  ["checker", "expense", "entertainment"],
  ["checker", "expense", "clothing"],
  ["checker", "expense", "beauty"],
  ["checker", "expense", "subscription"],
  ["checker", "expense", "hobby"],
  ["checker", "expense", "impulse"],
  ["checker", "expense", "other"],

  /* 家計簿モード・支出 */

  ["household", "expense", "tuition"],
  ["household", "expense", "rent"],
  ["household", "expense", "utilities"],
  ["household", "expense", "transport"],
  ["household", "expense", "entertainment"],
  ["household", "expense", "subscription"],
  ["household", "expense", "food"],
  ["household", "expense", "creditCard"],
  ["household", "expense", "medical"],
  ["household", "expense", "insurance"],
  ["household", "expense", "beauty"],
  ["household", "expense", "clothing"],

  /* 家計簿モード・収入 */

  ["household", "income", "salary"],
  ["household", "income", "extraIncome"],
  ["household", "income", "allowance"],
];


const DEFAULT_CATEGORIES =
  DEFAULT_CATEGORY_SETTINGS.map(
    ([mode, type, categoryKey], index) => {
      return {
        id:
          `default-${mode}-${type}-${categoryKey}`,

        mode,
        type,

        names: {
          ...CATEGORY_NAME_LIBRARY[categoryKey],
        },

        isDefault: true,
        order: index,
      };
    }
  );


/* =========================================================
   7. 言語コードを統一
   ========================================================= */

function normalizeLanguageCode(languageCode) {
  const code =
    String(languageCode || "")
      .trim()
      .toLowerCase();

  const languageMap = {
    ja: "ja",
    jp: "ja",
    japanese: "ja",

    en: "en",
    english: "en",

    my: "my",
    mm: "my",

    id: "id",
    in: "id",

    zh: "zh-CN",
    "zh-cn": "zh-CN",
    "zh-hans": "zh-CN",

    "zh-tw": "zh-TW",
    "zh-hant": "zh-TW",

    ru: "ru",
    vi: "vi",

    ko: "ko",
    kr: "ko",

    th: "th",
    es: "es",

    pt: "pt-BR",
    "pt-br": "pt-BR",
  };

  return languageMap[code] || "ja";
}


/* =========================================================
   8. 保存済み言語を取得
   ========================================================= */

function getSavedLanguage() {
  const savedLanguage =
    localStorage.getItem(LANGUAGE_STORAGE_KEY) ||
    localStorage.getItem("selectedLanguage") ||
    localStorage.getItem("currentLanguage") ||
    localStorage.getItem("language") ||
    "ja";

  return normalizeLanguageCode(savedLanguage);
}


let currentLanguage =
  getSavedLanguage();


/* =========================================================
   9. データの複製
   ========================================================= */

function cloneData(data) {
  return JSON.parse(
    JSON.stringify(data)
  );
}


/* =========================================================
   10. カテゴリデータを読み込む
   ========================================================= */

function loadCategories() {
  const savedData =
    localStorage.getItem(
      CATEGORY_STORAGE_KEY
    );

  if (!savedData) {
    const initialCategories =
      cloneData(DEFAULT_CATEGORIES);

    localStorage.setItem(
      CATEGORY_STORAGE_KEY,
      JSON.stringify(initialCategories)
    );

    return initialCategories;
  }

  try {
    const parsedData =
      JSON.parse(savedData);

    if (!Array.isArray(parsedData)) {
      throw new Error(
        "カテゴリデータが配列ではありません。"
      );
    }

    const validCategories =
      parsedData.filter((category) => {
        return (
          category &&
          typeof category.id === "string" &&
          typeof category.mode === "string" &&
          typeof category.type === "string" &&
          category.names &&
          typeof category.names === "object"
        );
      });

    return validCategories;
  } catch (error) {
    console.error(
      "カテゴリデータの読み込みに失敗しました。",
      error
    );

    const initialCategories =
      cloneData(DEFAULT_CATEGORIES);

    localStorage.setItem(
      CATEGORY_STORAGE_KEY,
      JSON.stringify(initialCategories)
    );

    return initialCategories;
  }
}


/* =========================================================
   11. カテゴリデータを保存
   ========================================================= */

function saveCategories() {
  localStorage.setItem(
    CATEGORY_STORAGE_KEY,
    JSON.stringify(categories)
  );
}


let categories =
  loadCategories();


/* =========================================================
   12. UI翻訳を取得
   ========================================================= */

function translate(key) {
  return (
    UI_TRANSLATIONS[currentLanguage]?.[key] ||
    UI_TRANSLATIONS.ja[key] ||
    key
  );
}


/* =========================================================
   13. カテゴリ名を取得
   ========================================================= */

function getCategoryName(
  category,
  language = currentLanguage
) {
  if (!category || !category.names) {
    return "";
  }

  return (
    category.names[language] ||
    category.names.ja ||
    category.names.en ||
    Object.values(category.names).find(
      (name) =>
        String(name || "").trim()
    ) ||
    ""
  );
}


/* =========================================================
   14. 言語選択欄を作成
   ========================================================= */

function buildLanguageSelect() {
  const languageSelect =
    document.getElementById(
      "language-select"
    );

  languageSelect.innerHTML = "";

  LANGUAGES.forEach((language) => {
    const option =
      document.createElement("option");

    option.value =
      language.code;

    option.textContent =
      language.label;

    languageSelect.appendChild(option);
  });

  languageSelect.value =
    currentLanguage;
}


/* =========================================================
   15. 12言語入力欄を作成
   ========================================================= */

function buildTranslationFields() {
  const fieldArea =
    document.getElementById(
      "translation-fields"
    );

  fieldArea.innerHTML = "";

  LANGUAGES.forEach((language) => {
    const field =
      document.createElement("div");

    field.className =
      "translation-field";

    const label =
      document.createElement("label");

    label.htmlFor =
      `category-name-${language.code}`;

    const languageName =
      document.createElement("span");

    languageName.textContent =
      language.label;

    const fieldNote =
      document.createElement("span");

    fieldNote.className =
      "field-note";

    if (language.code === "ja") {
      fieldNote.classList.add(
        "required-note"
      );

      fieldNote.dataset.noteType =
        "required";
    } else {
      fieldNote.dataset.noteType =
        "optional";
    }

    label.appendChild(languageName);
    label.appendChild(fieldNote);

    const input =
      document.createElement("input");

    input.type = "text";

    input.id =
      `category-name-${language.code}`;

    input.className =
      "translation-input";

    input.dataset.language =
      language.code;

    input.autocomplete =
      "off";

    if (language.code === "ja") {
      input.required = true;
    }

    field.appendChild(label);
    field.appendChild(input);

    fieldArea.appendChild(field);
  });
}


/* =========================================================
   16. 画面全体の言語を反映
   ========================================================= */

function applyLanguage() {
  document.documentElement.lang =
    currentLanguage;

  document.title =
    `${translate("pageTitle")} | ${translate("appName")}`;

  document
    .querySelectorAll("[data-i18n]")
    .forEach((element) => {
      const key =
        element.dataset.i18n;

      element.textContent =
        translate(key);
    });

  document
    .querySelectorAll(
      ".translation-input"
    )
    .forEach((input) => {
      input.placeholder =
        translate("inputPlaceholder");
    });

  document
    .querySelectorAll(
      "[data-note-type]"
    )
    .forEach((note) => {
      const noteType =
        note.dataset.noteType;

      if (noteType === "required") {
        note.textContent =
          translate("required");
      } else {
        note.textContent =
          translate("optional");
      }
    });


  renderAllCategories();

  const editor =
    document.getElementById(
      "category-editor"
    );

  if (!editor.hidden) {
    updateEditorDisplay();
  }
}


/* =========================================================
   17. すべてのカテゴリ一覧を表示
   ========================================================= */

function renderAllCategories() {
  renderCategoryList(
    "checker",
    "expense",
    "checker-expense-list"
  );

  renderCategoryList(
    "household",
    "expense",
    "household-expense-list"
  );

  renderCategoryList(
    "household",
    "income",
    "household-income-list"
  );
}


/* =========================================================
   18. カテゴリ一覧を表示
   ========================================================= */

function renderCategoryList(
  mode,
  type,
  elementId
) {
  const listElement =
    document.getElementById(elementId);

  listElement.innerHTML = "";

  const filteredCategories =
    categories
      .filter((category) => {
        return (
          category.mode === mode &&
          category.type === type
        );
      })
      .sort((a, b) => {
        return (
          Number(a.order || 0) -
          Number(b.order || 0)
        );
      });

  if (filteredCategories.length === 0) {
    const emptyMessage =
      document.createElement("p");

    emptyMessage.className =
      "empty-message";

    emptyMessage.textContent =
      translate("empty");

    listElement.appendChild(
      emptyMessage
    );

    return;
  }

  filteredCategories.forEach(
    (category) => {
      const item =
        document.createElement("div");

      item.className =
        "category-item";

      const nameArea =
        document.createElement("div");

      nameArea.className =
        "category-name-area";

      const categoryName =
        document.createElement("span");

      categoryName.className =
        "category-name";

      categoryName.textContent =
        getCategoryName(category);

      nameArea.appendChild(
        categoryName
      );

      const currentTranslation =
        String(
          category.names[
            currentLanguage
          ] || ""
        ).trim();

      if (
        !currentTranslation &&
        currentLanguage !== "ja"
      ) {
        const fallbackText =
          document.createElement("span");

        fallbackText.className =
          "category-sub-name";

        fallbackText.textContent =
          translate(
            "fallbackJapanese"
          );

        nameArea.appendChild(
          fallbackText
        );
      }

      const buttonArea =
        document.createElement("div");

      buttonArea.className =
        "category-buttons";

      const editButton =
        document.createElement("button");

      editButton.type =
        "button";

      editButton.className =
        "edit-button";

      editButton.textContent =
        translate("edit");

      editButton.addEventListener(
        "click",
        () => {
          openEditForm(
            category.id
          );
        }
      );

      const deleteButton =
        document.createElement("button");

      deleteButton.type =
        "button";

      deleteButton.className =
        "delete-button";

      deleteButton.textContent =
        translate("delete");

      deleteButton.addEventListener(
        "click",
        () => {
          deleteCategory(
            category.id
          );
        }
      );

      buttonArea.appendChild(
        editButton
      );

      buttonArea.appendChild(
        deleteButton
      );

      item.appendChild(nameArea);
      item.appendChild(buttonArea);

      listElement.appendChild(item);
    }
  );
}


/* =========================================================
   19. カテゴリ追加フォームを開く
   ========================================================= */

function openAddForm(mode, type) {
  const form =
    document.getElementById(
      "category-form"
    );

  form.reset();

  document.getElementById(
    "editing-category-id"
  ).value = "";

  document.getElementById(
    "editing-mode"
  ).value = mode;

  document.getElementById(
    "editing-type"
  ).value = type;

  const editor =
    document.getElementById(
      "category-editor"
    );

  editor.hidden = false;

  updateEditorDisplay();

  editor.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });

  setTimeout(() => {
    document
      .getElementById(
        "category-name-ja"
      )
      .focus();
  }, 350);
}


/* =========================================================
   20. カテゴリ編集フォームを開く
   ========================================================= */

function openEditForm(categoryId) {
  const category =
    categories.find(
      (item) =>
        item.id === categoryId
    );

  if (!category) {
    return;
  }

  document.getElementById(
    "editing-category-id"
  ).value = category.id;

  document.getElementById(
    "editing-mode"
  ).value = category.mode;

  document.getElementById(
    "editing-type"
  ).value = category.type;

  document
    .querySelectorAll(
      ".translation-input"
    )
    .forEach((input) => {
      const language =
        input.dataset.language;

      input.value =
        category.names[language] || "";
    });

  const editor =
    document.getElementById(
      "category-editor"
    );

  editor.hidden = false;

  updateEditorDisplay();

  editor.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });

  setTimeout(() => {
    document
      .getElementById(
        "category-name-ja"
      )
      .focus();
  }, 350);
}


/* =========================================================
   21. 編集フォームの見出しを更新
   ========================================================= */

function updateEditorDisplay() {
  const editingId =
    document.getElementById(
      "editing-category-id"
    ).value;

  const mode =
    document.getElementById(
      "editing-mode"
    ).value;

  const type =
    document.getElementById(
      "editing-type"
    ).value;

  const editorTitle =
    document.getElementById(
      "editor-title"
    );

  if (editingId) {
    editorTitle.textContent =
      translate("editTitle");
  } else {
    editorTitle.textContent =
      translate("addTitle");
  }

  const modeText =
    mode === "checker"
      ? translate("checkerMode")
      : translate("householdMode");

  const typeText =
    type === "income"
      ? translate("income")
      : translate("expense");

  document.getElementById(
    "editor-context"
  ).textContent =
    `${modeText} / ${typeText}`;
}


/* =========================================================
   22. 編集フォームを閉じる
   ========================================================= */

function closeEditor() {
  const editor =
    document.getElementById(
      "category-editor"
    );

  editor.hidden = true;

  document
    .getElementById(
      "category-form"
    )
    .reset();

  document.getElementById(
    "editing-category-id"
  ).value = "";

  document.getElementById(
    "editing-mode"
  ).value = "";

  document.getElementById(
    "editing-type"
  ).value = "";
}


/* =========================================================
   23. カテゴリを保存
   ========================================================= */

function handleCategorySubmit(event) {
  event.preventDefault();

  const editingId =
    document.getElementById(
      "editing-category-id"
    ).value;

  const mode =
    document.getElementById(
      "editing-mode"
    ).value;

  const type =
    document.getElementById(
      "editing-type"
    ).value;

  const names = {};

  document
    .querySelectorAll(
      ".translation-input"
    )
    .forEach((input) => {
      names[
        input.dataset.language
      ] =
        input.value.trim();
    });

  if (!names.ja) {
    showMessage(
      translate(
        "requiredJapanese"
      ),
      "error"
    );

    document
      .getElementById(
        "category-name-ja"
      )
      .focus();

    return;
  }

  const duplicatedCategory =
    categories.some((category) => {
      if (
        category.id === editingId
      ) {
        return false;
      }

      return (
        category.mode === mode &&
        category.type === type &&
        String(
          category.names?.ja || ""
        )
          .trim()
          .toLowerCase() ===
          names.ja.toLowerCase()
      );
    });

  if (duplicatedCategory) {
    showMessage(
      translate("duplicate"),
      "error"
    );

    document
      .getElementById(
        "category-name-ja"
      )
      .focus();

    return;
  }

  if (editingId) {
    const categoryIndex =
      categories.findIndex(
        (category) =>
          category.id === editingId
      );

    if (categoryIndex === -1) {
      return;
    }

    categories[categoryIndex] = {
      ...categories[categoryIndex],
      names,
    };
  } else {
    const sameGroupCategories =
      categories.filter(
        (category) => {
          return (
            category.mode === mode &&
            category.type === type
          );
        }
      );

    const maximumOrder =
      sameGroupCategories.reduce(
        (maximum, category) => {
          return Math.max(
            maximum,
            Number(
              category.order || 0
            )
          );
        },
        -1
      );

    categories.push({
      id: createCategoryId(),
      mode,
      type,
      names,
      isDefault: false,
      order: maximumOrder + 1,
    });
  }

  saveCategories();
  renderAllCategories();
  closeEditor();

  showMessage(
    translate("saved"),
    "success"
  );
}


/* =========================================================
   24. カテゴリを削除
   ========================================================= */

function deleteCategory(categoryId) {
  const category =
    categories.find(
      (item) =>
        item.id === categoryId
    );

  if (!category) {
    return;
  }

  const sameGroupCategories =
    categories.filter((item) => {
      return (
        item.mode ===
          category.mode &&
        item.type ===
          category.type
      );
    });

  if (
    sameGroupCategories.length <= 1
  ) {
    showMessage(
      translate(
        "cannotDeleteLast"
      ),
      "error"
    );

    return;
  }

  const categoryName =
    getCategoryName(category);

  const confirmMessage =
    translate("deleteConfirm")
      .replace(
        "{name}",
        categoryName
      );

  const confirmed =
    window.confirm(
      confirmMessage
    );

  if (!confirmed) {
    return;
  }

  categories =
    categories.filter(
      (item) =>
        item.id !== categoryId
    );

  saveCategories();
  renderAllCategories();

  const editingId =
    document.getElementById(
      "editing-category-id"
    ).value;

  if (
    editingId === categoryId
  ) {
    closeEditor();
  }

  showMessage(
    translate("deleted"),
    "success"
  );
}


/* =========================================================
   25. カテゴリIDを作成
   ========================================================= */

function createCategoryId() {
  if (
    window.crypto &&
    typeof window.crypto.randomUUID ===
      "function"
  ) {
    return (
      `category-${crypto.randomUUID()}`
    );
  }

  return (
    "category-" +
    Date.now() +
    "-" +
    Math.random()
      .toString(16)
      .slice(2)
  );
}


/* =========================================================
   26. メッセージを表示
   ========================================================= */

let messageTimer = null;


function showMessage(
  message,
  type
) {
  const messageArea =
    document.getElementById(
      "message-area"
    );

  if (messageTimer) {
    clearTimeout(
      messageTimer
    );
  }

  messageArea.textContent =
    message;

  messageArea.className =
    `message-area ${type}`;

  messageArea.hidden = false;

  messageArea.scrollIntoView({
    behavior: "smooth",
    block: "nearest",
  });

  messageTimer =
    setTimeout(() => {
      messageArea.hidden = true;
    }, 4000);
}


/* =========================================================
   27. 戻る処理
   ========================================================= */

function goBack() {
  const parameters =
    new URLSearchParams(
      window.location.search
    );

  const returnPage =
    parameters.get("return");

  if (
    returnPage &&
    /^[a-zA-Z0-9_./-]+\.html(?:[?#].*)?$/.test(
      returnPage
    )
  ) {
    window.location.href =
      returnPage;

    return;
  }

  const from =
    parameters.get("from");

  if (from === "checker") {
    window.location.href =
      "index.html";

    return;
  }

  if (from === "household") {
    window.location.href =
      "normal.html";

    return;
  }

  if (
    window.history.length > 1
  ) {
    window.history.back();

    return;
  }

  window.location.href =
    "index.html";
}


/* =========================================================
   28. イベント設定
   ========================================================= */

function setEvents() {


  document
    .querySelectorAll(
      ".add-button"
    )
    .forEach((button) => {
      button.addEventListener(
        "click",
        () => {
          openAddForm(
            button.dataset.mode,
            button.dataset.type
          );
        }
      );
    });

  document
    .getElementById(
      "category-form"
    )
    .addEventListener(
      "submit",
      handleCategorySubmit
    );

  document
    .getElementById(
      "cancel-button"
    )
    .addEventListener(
      "click",
      closeEditor
    );

  document
    .getElementById(
      "editor-close-button"
    )
    .addEventListener(
      "click",
      closeEditor
    );

  document
    .getElementById(
      "back-button"
    )
    .addEventListener(
      "click",
      goBack
    );
}


/* =========================================================
   29. 初期表示
   ========================================================= */

function initializeCategoryPage() {
  buildTranslationFields();
  setEvents();
  applyLanguage();
}


document.addEventListener(
  "DOMContentLoaded",
  initializeCategoryPage
);