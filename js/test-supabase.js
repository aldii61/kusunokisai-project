async function saveData() {

    const { data, error } = await supabaseClient
        .from("expenses")
        .insert([
            {
                user_id: "test",
                date: "2026-07-02",
                type: "支出",
                category: "食費",
                amount: 500,
                memo: "テスト"
            }
        ]);

    if (error) {
        console.error(error);
        alert("保存失敗");
    } else {
        console.log(data);
        alert("保存成功！");
    }

}