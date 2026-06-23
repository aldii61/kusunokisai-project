let users = JSON.parse(localStorage.getItem("users")) || [];

// [JP] 新規ユーザー登録 / [EN] Register new user account
function handleRegister() {
  const userInp = document.getElementById("username").value.trim();
  const passInp = document.getElementById("password").value.trim();

  if (!userInp || !passInp) {
    alert("【エラー/Error】入力してください / Please fill in all fields.");
    return;
  }

  const isExist = users.some(
    (u) => u.username.toLowerCase() === userInp.toLowerCase(),
  );
  if (isExist) {
    alert(
      "【エラー/Error】この名前は使えません / This username is already taken.",
    );
    return;
  }

  users.push({ username: userInp, password: passInp });
  localStorage.setItem("users", JSON.stringify(users));
  alert("【成功/Success】登録完了！ / Registration successful!");
}

// [JP] ログイン機能 / [EN] Login function
function handleLogin() {
  const userInp = document.getElementById("username").value.trim();
  const passInp = document.getElementById("password").value.trim();

  const validUser = users.find(
    (u) => u.username === userInp && u.password === passInp,
  );

  if (validUser) {
    localStorage.setItem("currentUser", userInp); // [JP] ユーザーを保存 / [EN] Save current user

    // 🛠️ [FIX] Ubah dari index.html menjadi page1.html
    window.location.href = "page1.html";
  } else {
    alert("【エラー/Error】データが違います / Incorrect username or password.");
  }
}
