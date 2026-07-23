/* =========================================================
   advice-messages.js
   12言語対応・440,000通りの分析アドバイス
   5 × 2 × 11 × 20 × 10 × 10 × 2 = 440,000
========================================================= */

(function () {
  "use strict";

  const LANGUAGES = {
    ja: {
      sat: {
        1: [
          "今回は満足感をあまり得られなかったようです",
          "金額に見合う価値を感じにくかったようです",
          "購入前の期待との差が大きかったかもしれません",
          "買ってよかったと思える部分が少なかったようです",
          "満足度の面では見直したい支出です",
        ],
        2: [
          "少し良さはあったものの物足りなさも残ったようです",
          "必要な価値は得られましたが金額にはやや見合いにくかったようです",
          "悪い買い物ではありませんが改善できる点がありそうです",
          "購入した理由は理解できますが結果には惜しさが残っています",
          "期待したほどではなかった部分がありそうです",
        ],
        3: [
          "大きな後悔はありませんが特別な満足感も少なかったようです",
          "良い点と気になる点の両方がある支出だったようです",
          "目的はある程度果たせたものの別の選択肢も考えられます",
          "金額と満足感はおおむね釣り合っていたようです",
          "今回は無難な選択だったようです",
        ],
        4: [
          "満足度の高い支出で金額に見合う価値を感じられたようです",
          "購入前の期待にしっかり応えてくれた買い物です",
          "納得感のあるお金の使い方ができています",
          "生活や気持ちに良い変化を与えた支出のようです",
          "価格と満足感のバランスが良かったようです",
        ],
        5: [
          "満足度がとても高く使ったお金が価値につながっています",
          "買ってよかったと思える納得感の高い支出です",
          "今回の選択は自分の希望によく合っていたようです",
          "支払った金額以上の満足感を得られたようです",
          "生活や気持ちを豊かにする価値ある支出でした",
        ],
      },
      satTail: [
        "次回の判断基準として覚えておきましょう。",
        "今回感じたことを次の選択に活かせそうです。",
        "価格・品質・タイミングを振り返るとヒントになります。",
        "同じものをもう一度選ぶか考えると傾向が見えます。",
      ],
      need: {
        true: [
          "必要な支出だったため金額だけで自分を責める必要はありません",
          "暮らしを維持するための支出として考えてよさそうです",
          "必要なものへ適切にお金を使えています",
          "安さだけでなく使いやすさや品質も大切です",
          "今後は予算にあらかじめ含めておくと安心です",
        ],
        false: [
          "必需品ではありませんが満足感につながる支出にも意味があります",
          "必要でない支出は使った後の価値が判断基準になります",
          "なくても困らないものほど満足度とのバランスが大切です",
          "楽しみの支出は優先順位を決めて残していきましょう",
          "購入前に少し時間を置くと判断しやすくなります",
        ],
      },
      needTail: [
        "次回も目的を確認してから選びましょう。",
        "同じ役割をより納得できる方法で得られないか考えてみましょう。",
      ],
      rateTemplates: [
        "現在の使用率は{rate}%で、残りは{remaining}%です。今後の予定と照らし合わせてみましょう。",
        "目標金額の{rate}%を使っています。残りの支出の優先順位を確認しましょう。",
        "使用率は{rate}%です。必要な支出を先に確保すると安心です。",
        "残りの予算は{remaining}%です。満足度の高い支出を選びましょう。",
        "現在のペースが予定に合っているか確認してみましょう。使用率は{rate}%です。",
        "目標まであと{remaining}%あります。予定外の出費にも少し余白を残しましょう。",
        "使用率{rate}%の段階です。小さな支出の積み重ねも確認しておくと安心です。",
        "残り{remaining}%を何に使うか、必要なものと楽しみに分けて考えてみましょう。",
        "今の使用率は{rate}%です。急がない買い物は時期をずらす方法もあります。",
        "予算の進み具合は{rate}%です。記録を次の判断に活かしていきましょう。",
      ],
      ending: [
        "数字だけでなく必要性と満足感の両方を今後の選び方に活かしていきましょう。",
        "今回の記録を残しておくと次に似た支出をするときの判断がしやすくなります。",
      ],
    },

    en: {
      sat: {
        1: [
          "This purchase seems to have brought very little satisfaction",
          "It may have been difficult to feel value for the amount paid",
          "The result may have differed greatly from what you expected",
          "There seem to have been few reasons to feel glad about this purchase",
          "This is a purchase worth reviewing from the viewpoint of satisfaction",
        ],
        2: [
          "There were some positive points, but some disappointment remained",
          "You gained some value, though it may not fully match the price",
          "It was not necessarily a bad purchase, but there is room for improvement",
          "The reason for buying it makes sense, though the result feels slightly lacking",
          "Some parts may not have met your expectations",
        ],
        3: [
          "There was no major regret, but the satisfaction was not especially strong",
          "This purchase seems to have had both good and questionable points",
          "It met its purpose to some extent, though other options may exist",
          "The cost and satisfaction appear to have been reasonably balanced",
          "This seems to have been a safe and average choice",
        ],
        4: [
          "This was a satisfying expense that seems worth the amount paid",
          "The purchase met your expectations well",
          "You appear to have spent your money with confidence",
          "This expense seems to have improved your life or mood",
          "The balance between price and satisfaction was good",
        ],
        5: [
          "Your satisfaction was very high, and the money clearly created value",
          "This was a highly worthwhile purchase",
          "The choice seems to have matched your wishes very well",
          "You may have gained more satisfaction than the amount paid",
          "This was a valuable expense that enriched your life or mood",
        ],
      },
      satTail: [
        "Keep it in mind as a standard for your next decision.",
        "You can use what you felt this time in your next choice.",
        "Reviewing the price, quality, and timing may give you useful clues.",
        "Thinking about whether you would choose it again can reveal your spending pattern.",
      ],
      need: {
        true: [
          "Because this was necessary, you do not need to blame yourself based only on the amount",
          "It can be viewed as an expense that supports everyday life",
          "You used money appropriately for something you needed",
          "For necessary purchases, usability and quality matter as well as price",
          "Including this type of expense in the budget beforehand may help",
        ],
        false: [
          "Although it was not essential, spending that creates enjoyment can still have meaning",
          "For nonessential spending, the value felt afterward is an important measure",
          "The less necessary an item is, the more important the balance between cost and satisfaction becomes",
          "Choose which enjoyable expenses you truly want to keep",
          "Waiting briefly before buying can make the decision clearer",
        ],
      },
      needTail: [
        "Check the purpose again before making a similar choice next time.",
        "Consider whether the same benefit could be gained in a more satisfying way.",
      ],
      rateTemplates: [
        "Your current usage rate is {rate}%, leaving {remaining}%. Compare this with your upcoming plans.",
        "You have used {rate}% of the target amount. Review the priority of your remaining expenses.",
        "The usage rate is {rate}%. Securing necessary expenses first may give you peace of mind.",
        "You have {remaining}% of the budget left. Focus on spending that gives you real satisfaction.",
        "Check whether your current pace matches your plan. The usage rate is {rate}%.",
        "There is {remaining}% left before the target. Keep some room for unexpected expenses.",
        "You are at {rate}% of the budget. It may help to review the accumulation of small purchases.",
        "Think about how to divide the remaining {remaining}% between necessities and enjoyment.",
        "Your current usage rate is {rate}%. Purchases that are not urgent can sometimes wait.",
        "Your budget progress is {rate}%. Use this record to guide your next decision.",
      ],
      ending: [
        "Use both necessity and satisfaction, not only the numbers, to guide your future choices.",
        "Keeping this record will make it easier to judge similar expenses next time.",
      ],
    },

    id: {
      sat: {
        1: ["Pengeluaran ini tampaknya memberi sedikit kepuasan","Nilainya mungkin sulit dirasakan dibandingkan jumlah yang dibayar","Hasilnya mungkin jauh dari harapan sebelum membeli","Hanya sedikit bagian yang membuat pembelian ini terasa memuaskan","Pengeluaran ini perlu ditinjau kembali dari sisi kepuasan"],
        2: ["Ada beberapa hal baik, tetapi rasa kurang puas masih tersisa","Ada manfaat yang diperoleh, tetapi mungkin belum sebanding dengan harganya","Bukan pembelian yang buruk, tetapi masih ada ruang untuk perbaikan","Alasan membelinya dapat dipahami, tetapi hasilnya terasa sedikit kurang","Beberapa bagian mungkin tidak sesuai harapan"],
        3: ["Tidak ada penyesalan besar, tetapi kepuasannya juga tidak terlalu kuat","Pengeluaran ini memiliki sisi baik dan sisi yang perlu dipertimbangkan","Tujuannya cukup tercapai, meski mungkin ada pilihan lain","Biaya dan kepuasan tampaknya cukup seimbang","Ini tampaknya pilihan yang aman dan biasa"],
        4: ["Pengeluaran ini cukup memuaskan dan sepadan dengan jumlah yang dibayar","Pembelian ini memenuhi harapan dengan baik","Kamu tampaknya menggunakan uang dengan penuh keyakinan","Pengeluaran ini memberi perubahan positif pada hidup atau suasana hati","Keseimbangan antara harga dan kepuasan cukup baik"],
        5: ["Tingkat kepuasan sangat tinggi dan uang yang digunakan menghasilkan nilai","Ini adalah pembelian yang sangat layak","Pilihan ini sangat sesuai dengan keinginanmu","Kepuasan yang diperoleh mungkin melebihi jumlah yang dibayar","Pengeluaran ini memperkaya hidup atau suasana hati"],
      },
      satTail: ["Ingat sebagai acuan untuk keputusan berikutnya.","Gunakan pengalaman kali ini untuk pilihan berikutnya.","Meninjau harga, kualitas, dan waktu pembelian dapat memberi petunjuk.","Pikirkan apakah kamu akan memilihnya lagi untuk melihat pola pengeluaranmu."],
      need: {
        true: ["Karena ini pengeluaran penting, kamu tidak perlu menyalahkan diri hanya dari jumlahnya","Pengeluaran ini dapat dianggap sebagai penunjang kehidupan sehari-hari","Kamu telah menggunakan uang secara tepat untuk sesuatu yang dibutuhkan","Untuk kebutuhan penting, kenyamanan dan kualitas juga penting selain harga","Memasukkan pengeluaran ini ke anggaran sejak awal dapat membantu"],
        false: ["Walau bukan kebutuhan utama, pengeluaran yang memberi kesenangan tetap memiliki arti","Untuk pengeluaran nonpenting, nilai yang dirasakan setelahnya menjadi ukuran penting","Semakin tidak penting suatu barang, semakin penting keseimbangan biaya dan kepuasan","Pilih pengeluaran hiburan yang benar-benar ingin dipertahankan","Menunggu sebentar sebelum membeli dapat membantu memperjelas keputusan"],
      },
      needTail: ["Periksa kembali tujuannya sebelum membuat pilihan serupa.","Pertimbangkan apakah manfaat yang sama bisa diperoleh dengan cara yang lebih memuaskan."],
      rateTemplates: [
        "Tingkat penggunaan saat ini {rate}%, sehingga tersisa {remaining}%. Bandingkan dengan rencana berikutnya.",
        "Kamu telah memakai {rate}% dari target. Tinjau prioritas pengeluaran yang tersisa.",
        "Tingkat penggunaan {rate}%. Mengamankan kebutuhan penting lebih dulu dapat memberi ketenangan.",
        "Anggaran yang tersisa {remaining}%. Fokuslah pada pengeluaran yang benar-benar memuaskan.",
        "Periksa apakah ritme saat ini sesuai rencana. Tingkat penggunaan {rate}%.",
        "Masih tersisa {remaining}% sebelum mencapai target. Sisakan ruang untuk pengeluaran tak terduga.",
        "Penggunaan anggaran berada di {rate}%. Periksa juga akumulasi pengeluaran kecil.",
        "Pikirkan cara membagi {remaining}% yang tersisa antara kebutuhan dan kesenangan.",
        "Tingkat penggunaan saat ini {rate}%. Pembelian yang tidak mendesak bisa ditunda.",
        "Perkembangan anggaran berada di {rate}%. Gunakan catatan ini untuk keputusan berikutnya.",
      ],
      ending: ["Gunakan kebutuhan dan kepuasan, bukan hanya angka, untuk menentukan pilihan berikutnya.","Menyimpan catatan ini akan memudahkan penilaian pengeluaran serupa di masa depan."],
    },

    "zh-CN": {
      sat: {
        1: ["这笔支出似乎没有带来太多满足感","与支付金额相比，可能较难感受到价值","实际结果可能与购买前的期待差距较大","这次购买中值得庆幸的部分似乎较少","从满意度来看，这是一笔值得重新审视的支出"],
        2: ["虽然有一些优点，但仍留下了些许不满","得到了一定价值，但可能还不太符合价格","不能说是一次糟糕的购买，但仍有改进空间","购买理由可以理解，但结果略显不足","有些部分可能没有达到预期"],
        3: ["没有明显后悔，但满足感也不算特别强","这笔支出似乎同时有优点和需要考虑的地方","目的在一定程度上实现了，但也可能有其他选择","金额与满意度大致平衡","这似乎是一次稳妥而普通的选择"],
        4: ["这是一笔满意度较高且物有所值的支出","这次购买很好地达到了预期","你的花钱方式似乎很有把握","这笔支出似乎给生活或心情带来了积极变化","价格与满意度之间的平衡较好"],
        5: ["满意度非常高，所花的钱确实转化成了价值","这是一笔很值得的购买","这次选择非常符合你的期待","获得的满足感可能超过了支付金额","这是一笔让生活或心情更加丰富的支出"],
      },
      satTail: ["把它记作下次判断的标准吧。","把这次的感受运用到下一次选择中吧。","回顾价格、品质和购买时机，可能会得到线索。","想想是否还会再次选择它，可以看出自己的消费倾向。"],
      need: {
        true: ["因为这是必要支出，不必只看金额责怪自己","可以把它看作维持日常生活的支出","你把钱合理地用在了需要的地方","必要支出不仅要看价格，也要看使用便利性和品质","以后提前把这类支出列入预算会更安心"],
        false: ["虽然不是必需品，但能带来快乐的支出也有意义","对于非必要支出，使用后的价值感是重要标准","越不是必需品，金额与满意度的平衡越重要","选择真正想保留的娱乐支出","购买前稍微等待一下，会更容易判断"],
      },
      needTail: ["下次做相似选择前，再确认一次目的吧。","想想是否能用更满意的方式获得同样的作用。"],
      rateTemplates: [
        "当前使用率为{rate}%，剩余{remaining}%。请与接下来的计划对照一下。",
        "已经使用目标金额的{rate}%。请确认剩余支出的优先级。",
        "使用率为{rate}%。先确保必要支出会更安心。",
        "剩余预算为{remaining}%。优先选择真正有满足感的支出。",
        "确认目前的速度是否符合计划。当前使用率为{rate}%。",
        "距离目标还剩{remaining}%。请为意外支出留出一些空间。",
        "目前预算使用率为{rate}%。也要留意小额支出的累积。",
        "想想如何把剩余{remaining}%分配给必要支出和享受。",
        "当前使用率为{rate}%。不着急的购买可以考虑延后。",
        "预算进度为{rate}%。把这次记录用于下一次判断吧。",
      ],
      ending: ["今后的选择不要只看数字，也要结合必要性和满意度。","保留这次记录，下次遇到相似支出时会更容易判断。"],
    },

    "zh-TW": {
      sat: {
        1: ["這筆支出似乎沒有帶來太多滿足感","與支付金額相比，可能較難感受到價值","實際結果可能與購買前的期待差距較大","這次購買中值得慶幸的部分似乎較少","從滿意度來看，這是一筆值得重新檢視的支出"],
        2: ["雖然有一些優點，但仍留下了些許不滿","得到了一定價值，但可能還不太符合價格","不能說是一次糟糕的購買，但仍有改善空間","購買理由可以理解，但結果略顯不足","有些部分可能沒有達到預期"],
        3: ["沒有明顯後悔，但滿足感也不算特別強","這筆支出似乎同時有優點和需要考慮的地方","目的在一定程度上達成了，但也可能有其他選擇","金額與滿意度大致平衡","這似乎是一次穩妥而普通的選擇"],
        4: ["這是一筆滿意度較高且物有所值的支出","這次購買很好地達到了預期","你的花錢方式似乎很有把握","這筆支出似乎給生活或心情帶來了正面變化","價格與滿意度之間的平衡較好"],
        5: ["滿意度非常高，所花的錢確實轉化成了價值","這是一筆很值得的購買","這次選擇非常符合你的期待","獲得的滿足感可能超過了支付金額","這是一筆讓生活或心情更加豐富的支出"],
      },
      satTail: ["把它記作下次判斷的標準吧。","把這次的感受運用到下一次選擇中吧。","回顧價格、品質和購買時機，可能會得到線索。","想想是否還會再次選擇它，可以看出自己的消費傾向。"],
      need: {
        true: ["因為這是必要支出，不必只看金額責怪自己","可以把它看作維持日常生活的支出","你把錢合理地用在了需要的地方","必要支出不只要看價格，也要看使用便利性和品質","以後提前把這類支出列入預算會更安心"],
        false: ["雖然不是必需品，但能帶來快樂的支出也有意義","對於非必要支出，使用後的價值感是重要標準","越不是必需品，金額與滿意度的平衡越重要","選擇真正想保留的娛樂支出","購買前稍微等待一下，會更容易判斷"],
      },
      needTail: ["下次做相似選擇前，再確認一次目的吧。","想想是否能用更滿意的方式獲得同樣的作用。"],
      rateTemplates: [
        "目前使用率為{rate}%，剩餘{remaining}%。請與接下來的計畫對照一下。",
        "已經使用目標金額的{rate}%。請確認剩餘支出的優先順序。",
        "使用率為{rate}%。先確保必要支出會更安心。",
        "剩餘預算為{remaining}%。優先選擇真正有滿足感的支出。",
        "確認目前的速度是否符合計畫。目前使用率為{rate}%。",
        "距離目標還剩{remaining}%。請為意外支出留出一些空間。",
        "目前預算使用率為{rate}%。也要留意小額支出的累積。",
        "想想如何把剩餘{remaining}%分配給必要支出和享受。",
        "目前使用率為{rate}%。不著急的購買可以考慮延後。",
        "預算進度為{rate}%。把這次紀錄用於下一次判斷吧。",
      ],
      ending: ["今後的選擇不要只看數字，也要結合必要性和滿意度。","保留這次紀錄，下次遇到相似支出時會更容易判斷。"],
    },

    ko: {
      sat: {
        1: ["이번 지출은 만족감을 거의 주지 못한 것 같아요","지불한 금액에 비해 가치를 느끼기 어려웠을 수 있어요","구매 전 기대와 실제 결과의 차이가 컸을 수 있어요","사길 잘했다고 느낄 부분이 적었던 것 같아요","만족도 측면에서 다시 살펴볼 지출이에요"],
        2: ["좋은 점도 있었지만 아쉬움이 남은 것 같아요","필요한 가치는 얻었지만 금액에는 조금 못 미쳤을 수 있어요","나쁜 구매는 아니지만 개선할 여지가 있어 보여요","구매한 이유는 이해되지만 결과가 조금 부족했어요","기대한 만큼 충족되지 않은 부분이 있었을 수 있어요"],
        3: ["큰 후회는 없지만 특별한 만족감도 크지 않았어요","좋은 점과 고민할 점이 함께 있는 지출이었어요","목적은 어느 정도 달성했지만 다른 선택지도 있을 수 있어요","금액과 만족도가 대체로 균형을 이뤘어요","무난하고 평균적인 선택이었던 것 같아요"],
        4: ["만족도가 높고 지불한 금액만큼 가치가 있었어요","구매 전 기대를 잘 충족한 선택이에요","납득할 수 있는 소비를 했어요","생활이나 기분에 긍정적인 변화를 준 지출이에요","가격과 만족도의 균형이 좋았어요"],
        5: ["만족도가 매우 높고 사용한 돈이 분명한 가치로 이어졌어요","정말 잘 샀다고 느낄 수 있는 선택이에요","이번 선택은 원하는 바와 아주 잘 맞았어요","지불한 금액 이상의 만족을 얻었을 수 있어요","생활이나 기분을 풍요롭게 만든 가치 있는 지출이에요"],
      },
      satTail: ["다음 판단의 기준으로 기억해 두세요.","이번에 느낀 점을 다음 선택에 활용해 보세요.","가격·품질·시기를 돌아보면 힌트를 얻을 수 있어요.","다시 선택할지 생각해 보면 소비 성향이 보여요."],
      need: {
        true: ["필요한 지출이었으므로 금액만 보고 자신을 탓할 필요는 없어요","일상을 유지하기 위한 지출로 생각해도 좋아요","필요한 곳에 돈을 적절히 사용했어요","필요한 구매는 가격뿐 아니라 편의성과 품질도 중요해요","다음에는 예산에 미리 포함하면 더 안심할 수 있어요"],
        false: ["필수품이 아니어도 즐거움을 주는 지출에는 의미가 있어요","비필수 지출은 사용 후 느낀 가치가 중요한 기준이에요","필요성이 낮을수록 금액과 만족도의 균형이 중요해요","정말 남기고 싶은 즐거움의 지출을 선택해 보세요","구매 전 잠시 기다리면 판단이 더 쉬워져요"],
      },
      needTail: ["다음에 비슷한 선택을 하기 전 목적을 다시 확인해 보세요.","같은 효과를 더 만족스러운 방법으로 얻을 수 있는지 생각해 보세요."],
      rateTemplates: [
        "현재 사용률은 {rate}%이고 {remaining}%가 남아 있어요. 앞으로의 계획과 비교해 보세요.",
        "목표 금액의 {rate}%를 사용했어요. 남은 지출의 우선순위를 확인해 보세요.",
        "사용률은 {rate}%예요. 필요한 지출을 먼저 확보하면 안심할 수 있어요.",
        "남은 예산은 {remaining}%예요. 만족도가 높은 지출을 선택해 보세요.",
        "현재 속도가 계획에 맞는지 확인해 보세요. 사용률은 {rate}%예요.",
        "목표까지 {remaining}%가 남아 있어요. 예상치 못한 지출을 위한 여유도 남겨 두세요.",
        "현재 예산 사용률은 {rate}%예요. 작은 지출의 누적도 살펴보면 좋아요.",
        "남은 {remaining}%를 필요와 즐거움에 어떻게 나눌지 생각해 보세요.",
        "현재 사용률은 {rate}%예요. 급하지 않은 구매는 미루는 방법도 있어요.",
        "예산 진행률은 {rate}%예요. 이번 기록을 다음 판단에 활용해 보세요.",
      ],
      ending: ["숫자뿐 아니라 필요성과 만족도를 함께 다음 선택에 활용해 보세요.","이번 기록을 남겨 두면 다음에 비슷한 지출을 판단하기 쉬워져요."],
    },

    vi: {
      sat: {
        1: ["Khoản chi này dường như mang lại rất ít sự hài lòng","Có thể khó cảm nhận được giá trị tương xứng với số tiền đã trả","Kết quả có thể khác khá nhiều so với kỳ vọng ban đầu","Có vẻ không có nhiều điểm khiến bạn cảm thấy mua thật đáng","Đây là khoản chi nên xem lại về mức độ hài lòng"],
        2: ["Có một số điểm tốt nhưng vẫn còn cảm giác chưa thỏa mãn","Bạn nhận được một phần giá trị nhưng có thể chưa tương xứng với giá","Đây không hẳn là một lựa chọn tệ nhưng vẫn có chỗ để cải thiện","Lý do mua là hợp lý nhưng kết quả vẫn hơi thiếu","Một số phần có thể chưa đáp ứng kỳ vọng"],
        3: ["Không có hối tiếc lớn nhưng mức hài lòng cũng không quá cao","Khoản chi này có cả điểm tốt và điểm cần cân nhắc","Mục đích đã đạt được phần nào nhưng có thể vẫn còn lựa chọn khác","Chi phí và mức hài lòng tương đối cân bằng","Đây có vẻ là một lựa chọn an toàn và bình thường"],
        4: ["Đây là khoản chi có mức hài lòng cao và xứng đáng với số tiền bỏ ra","Lựa chọn này đáp ứng kỳ vọng khá tốt","Bạn dường như đã chi tiêu với sự tin tưởng","Khoản chi này mang lại thay đổi tích cực cho cuộc sống hoặc tâm trạng","Giá cả và mức hài lòng khá cân bằng"],
        5: ["Mức hài lòng rất cao và số tiền bỏ ra đã tạo ra giá trị rõ ràng","Đây là một lựa chọn rất đáng tiền","Lựa chọn này rất phù hợp với mong muốn của bạn","Mức hài lòng có thể cao hơn cả số tiền đã trả","Đây là khoản chi có giá trị giúp cuộc sống hoặc tâm trạng phong phú hơn"],
      },
      satTail: ["Hãy ghi nhớ điều này làm tiêu chuẩn cho quyết định sau.","Bạn có thể dùng cảm nhận lần này cho lựa chọn tiếp theo.","Xem lại giá cả, chất lượng và thời điểm có thể giúp bạn tìm ra gợi ý.","Nghĩ xem bạn có chọn lại hay không sẽ giúp thấy rõ xu hướng chi tiêu."],
      need: {
        true: ["Vì đây là khoản chi cần thiết, bạn không cần tự trách mình chỉ vì số tiền","Có thể xem đây là khoản chi hỗ trợ cuộc sống hằng ngày","Bạn đã dùng tiền hợp lý cho điều mình cần","Với khoản chi cần thiết, sự tiện dụng và chất lượng cũng quan trọng như giá","Lần sau đưa khoản này vào ngân sách từ trước sẽ giúp yên tâm hơn"],
        false: ["Dù không phải thiết yếu, khoản chi mang lại niềm vui vẫn có ý nghĩa","Với khoản chi không thiết yếu, giá trị cảm nhận sau khi sử dụng là tiêu chí quan trọng","Càng ít cần thiết thì sự cân bằng giữa chi phí và mức hài lòng càng quan trọng","Hãy chọn những khoản chi giải trí mà bạn thực sự muốn giữ lại","Chờ một chút trước khi mua sẽ giúp quyết định rõ ràng hơn"],
      },
      needTail: ["Hãy kiểm tra lại mục đích trước khi đưa ra lựa chọn tương tự lần sau.","Hãy nghĩ xem có cách nào đạt cùng lợi ích nhưng hài lòng hơn không."],
      rateTemplates: [
        "Tỷ lệ sử dụng hiện tại là {rate}%, còn lại {remaining}%. Hãy so sánh với kế hoạch sắp tới.",
        "Bạn đã dùng {rate}% mục tiêu. Hãy xem lại mức độ ưu tiên của các khoản còn lại.",
        "Tỷ lệ sử dụng là {rate}%. Đảm bảo các khoản cần thiết trước sẽ giúp yên tâm hơn.",
        "Ngân sách còn lại {remaining}%. Hãy ưu tiên những khoản chi thực sự mang lại hài lòng.",
        "Hãy kiểm tra tốc độ hiện tại có phù hợp kế hoạch không. Tỷ lệ sử dụng là {rate}%.",
        "Còn {remaining}% trước khi đạt mục tiêu. Hãy để lại một phần cho chi phí bất ngờ.",
        "Hiện bạn đã dùng {rate}% ngân sách. Cũng nên xem lại sự tích lũy của các khoản nhỏ.",
        "Hãy nghĩ cách chia {remaining}% còn lại giữa nhu cầu cần thiết và niềm vui.",
        "Tỷ lệ sử dụng hiện tại là {rate}%. Những món chưa gấp có thể để sau.",
        "Tiến độ ngân sách là {rate}%. Hãy dùng bản ghi này cho quyết định tiếp theo.",
      ],
      ending: ["Hãy dùng cả tính cần thiết và mức hài lòng, không chỉ con số, để định hướng lựa chọn sau.","Giữ lại bản ghi này sẽ giúp bạn đánh giá các khoản chi tương tự dễ hơn."],
    },

    ru: {
      sat: {
        1: ["Эта покупка, похоже, принесла мало удовлетворения","Возможно, было трудно почувствовать ценность, соответствующую цене","Результат мог сильно отличаться от ожиданий до покупки","Похоже, было мало причин считать эту покупку удачной","Эту трату стоит пересмотреть с точки зрения удовлетворения"],
        2: ["Были положительные стороны, но осталось чувство недостатка","Некоторая ценность была получена, но она могла не соответствовать цене","Покупка не обязательно была плохой, но есть место для улучшения","Причина покупки понятна, однако результат немного разочаровал","Некоторые моменты могли не оправдать ожиданий"],
        3: ["Сильного сожаления нет, но и особого удовлетворения тоже","У этой траты были как хорошие, так и спорные стороны","Цель была частично достигнута, хотя возможны и другие варианты","Цена и удовлетворение выглядят относительно сбалансированными","Похоже, это был безопасный и обычный выбор"],
        4: ["Это была удовлетворительная трата, соответствующая уплаченной сумме","Покупка хорошо оправдала ожидания","Похоже, вы потратили деньги с уверенностью","Эта трата положительно повлияла на жизнь или настроение","Баланс цены и удовлетворения был хорошим"],
        5: ["Удовлетворение было очень высоким, и деньги явно превратились в ценность","Это была действительно удачная покупка","Выбор очень хорошо соответствовал вашим желаниям","Полученное удовлетворение могло превысить уплаченную сумму","Эта ценная трата обогатила жизнь или настроение"],
      },
      satTail: ["Запомните это как ориентир для следующего решения.","Используйте нынешние ощущения при следующем выборе.","Анализ цены, качества и времени покупки может дать полезные подсказки.","Подумайте, выбрали бы вы это снова, чтобы увидеть свою модель расходов."],
      need: {
        true: ["Поскольку трата была необходимой, не стоит винить себя только из-за суммы","Это можно рассматривать как расход, поддерживающий повседневную жизнь","Вы разумно потратили деньги на нужную вещь","Для необходимых покупок важны удобство и качество, а не только цена","Если заранее включать такие расходы в бюджет, будет спокойнее"],
        false: ["Даже необязательные траты, приносящие радость, могут иметь смысл","Для необязательных расходов важна ценность, ощущаемая после покупки","Чем менее необходима вещь, тем важнее баланс цены и удовлетворения","Выберите те приятные расходы, которые действительно хотите сохранить","Небольшая пауза перед покупкой поможет принять более ясное решение"],
      },
      needTail: ["В следующий раз ещё раз проверьте цель перед похожим выбором.","Подумайте, можно ли получить тот же результат более удовлетворяющим способом."],
      rateTemplates: [
        "Текущий уровень использования — {rate}%, осталось {remaining}%. Сравните это с ближайшими планами.",
        "Вы использовали {rate}% целевой суммы. Проверьте приоритет оставшихся расходов.",
        "Уровень использования — {rate}%. Сначала обеспечьте необходимые расходы.",
        "Осталось {remaining}% бюджета. Сосредоточьтесь на действительно ценных тратах.",
        "Проверьте, соответствует ли текущий темп плану. Использовано {rate}%.",
        "До цели осталось {remaining}%. Оставьте немного места для неожиданных расходов.",
        "Сейчас использовано {rate}% бюджета. Полезно также проверить накопление мелких покупок.",
        "Подумайте, как разделить оставшиеся {remaining}% между необходимым и приятным.",
        "Текущий уровень использования — {rate}%. Несрочные покупки можно отложить.",
        "Прогресс бюджета — {rate}%. Используйте эту запись для следующего решения.",
      ],
      ending: ["Учитывайте не только цифры, но и необходимость и удовлетворение при будущих решениях.","Эта запись поможет легче оценить похожие расходы в следующий раз."],
    },

    th: {
      sat: {
        1: ["ค่าใช้จ่ายครั้งนี้ดูเหมือนจะให้ความพึงพอใจน้อย","อาจรู้สึกได้ยากว่าคุ้มค่ากับจำนวนเงินที่จ่าย","ผลลัพธ์อาจต่างจากที่คาดไว้ก่อนซื้อค่อนข้างมาก","ดูเหมือนจะมีเหตุผลน้อยที่จะรู้สึกว่าซื้อแล้วดี","ควรทบทวนค่าใช้จ่ายนี้ในด้านความพึงพอใจ"],
        2: ["มีข้อดีอยู่บ้างแต่ยังเหลือความรู้สึกไม่เต็มที่","ได้รับคุณค่าบางส่วนแต่ยังอาจไม่คุ้มกับราคา","ไม่ใช่การซื้อที่แย่แต่ยังมีจุดที่ปรับปรุงได้","เหตุผลที่ซื้อเข้าใจได้แต่ผลลัพธ์ยังขาดไปเล็กน้อย","บางส่วนอาจไม่ตรงตามความคาดหวัง"],
        3: ["ไม่มีความเสียดายมากแต่ความพึงพอใจก็ไม่ได้สูงเป็นพิเศษ","ค่าใช้จ่ายนี้มีทั้งข้อดีและจุดที่ควรคิดต่อ","บรรลุเป้าหมายบางส่วนแต่ยังอาจมีตัวเลือกอื่น","ราคาและความพึงพอใจค่อนข้างสมดุล","ดูเหมือนเป็นตัวเลือกที่ปลอดภัยและทั่วไป"],
        4: ["เป็นค่าใช้จ่ายที่น่าพอใจและคุ้มกับจำนวนเงินที่จ่าย","การซื้อครั้งนี้ตอบความคาดหวังได้ดี","คุณดูเหมือนใช้เงินอย่างมั่นใจ","ค่าใช้จ่ายนี้ส่งผลดีต่อชีวิตหรืออารมณ์","ราคาและความพึงพอใจสมดุลกันดี"],
        5: ["ความพึงพอใจสูงมากและเงินที่ใช้สร้างคุณค่าได้ชัดเจน","เป็นการซื้อที่คุ้มค่ามาก","ตัวเลือกนี้ตรงกับความต้องการของคุณมาก","ความพึงพอใจที่ได้อาจมากกว่าจำนวนเงินที่จ่าย","เป็นค่าใช้จ่ายที่มีคุณค่าซึ่งทำให้ชีวิตหรืออารมณ์ดีขึ้น"],
      },
      satTail: ["จดจำไว้เป็นเกณฑ์สำหรับการตัดสินใจครั้งต่อไป","นำความรู้สึกครั้งนี้ไปใช้กับตัวเลือกครั้งหน้า","การทบทวนราคา คุณภาพ และเวลาอาจช่วยให้เห็นแนวทาง","ลองคิดว่าจะเลือกอีกครั้งหรือไม่เพื่อดูรูปแบบการใช้จ่ายของตนเอง"],
      need: {
        true: ["เพราะเป็นค่าใช้จ่ายที่จำเป็น จึงไม่ต้องโทษตัวเองจากจำนวนเงินเพียงอย่างเดียว","สามารถมองว่าเป็นค่าใช้จ่ายที่ช่วยพยุงชีวิตประจำวัน","คุณใช้เงินอย่างเหมาะสมกับสิ่งที่จำเป็น","สำหรับของจำเป็น ความสะดวกและคุณภาพก็สำคัญพอ ๆ กับราคา","การใส่ค่าใช้จ่ายนี้ไว้ในงบล่วงหน้าจะช่วยให้อุ่นใจขึ้น"],
        false: ["แม้ไม่ใช่ของจำเป็น แต่ค่าใช้จ่ายที่สร้างความสุขก็ยังมีความหมาย","สำหรับค่าใช้จ่ายที่ไม่จำเป็น คุณค่าที่รู้สึกหลังใช้เป็นเกณฑ์สำคัญ","ยิ่งไม่จำเป็นเท่าไร ยิ่งต้องดูสมดุลระหว่างราคาและความพึงพอใจ","เลือกเก็บค่าใช้จ่ายเพื่อความสุขที่ต้องการจริง ๆ","รอสักครู่ก่อนซื้อจะช่วยให้ตัดสินใจชัดเจนขึ้น"],
      },
      needTail: ["ตรวจสอบจุดประสงค์อีกครั้งก่อนเลือกแบบเดียวกันในครั้งหน้า","ลองคิดว่ามีวิธีอื่นที่ให้ผลเหมือนกันแต่พึงพอใจกว่าหรือไม่"],
      rateTemplates: [
        "อัตราการใช้งบปัจจุบันคือ {rate}% เหลือ {remaining}% ลองเทียบกับแผนต่อไป",
        "คุณใช้เป้าหมายไปแล้ว {rate}% ตรวจสอบลำดับความสำคัญของค่าใช้จ่ายที่เหลือ",
        "อัตราการใช้คือ {rate}% การกันเงินสำหรับสิ่งจำเป็นก่อนจะช่วยให้อุ่นใจ",
        "งบที่เหลือคือ {remaining}% เลือกใช้กับสิ่งที่ให้ความพึงพอใจจริง ๆ",
        "ตรวจสอบว่าความเร็วปัจจุบันตรงกับแผนหรือไม่ อัตราการใช้คือ {rate}%",
        "ยังเหลือ {remaining}% ก่อนถึงเป้าหมาย ควรเผื่อสำหรับค่าใช้จ่ายที่ไม่คาดคิด",
        "ตอนนี้ใช้งบไป {rate}% ควรตรวจดูการสะสมของค่าใช้จ่ายเล็ก ๆ ด้วย",
        "ลองคิดว่าจะแบ่ง {remaining}% ที่เหลือระหว่างสิ่งจำเป็นและความสุขอย่างไร",
        "อัตราการใช้ปัจจุบันคือ {rate}% ของที่ไม่รีบสามารถเลื่อนไปก่อนได้",
        "ความคืบหน้าของงบคือ {rate}% ใช้บันทึกนี้ประกอบการตัดสินใจครั้งต่อไป",
      ],
      ending: ["ใช้ทั้งความจำเป็นและความพึงพอใจ ไม่ใช่แค่ตัวเลข ในการเลือกครั้งต่อไป","การเก็บบันทึกนี้จะช่วยให้ตัดสินค่าใช้จ่ายแบบเดียวกันได้ง่ายขึ้นในอนาคต"],
    },

    es: {
      sat: {
        1: ["Este gasto parece haber aportado muy poca satisfacción","Puede haber sido difícil sentir un valor acorde con la cantidad pagada","El resultado pudo diferir bastante de lo que esperabas antes de comprar","Parece que hubo pocos motivos para sentir que la compra valió la pena","Este gasto merece revisarse desde el punto de vista de la satisfacción"],
        2: ["Hubo algunos puntos positivos, pero quedó cierta insatisfacción","Se obtuvo algo de valor, aunque quizá no compense del todo el precio","No fue necesariamente una mala compra, pero hay margen de mejora","La razón de la compra se entiende, aunque el resultado quedó algo corto","Algunos aspectos quizá no cumplieron las expectativas"],
        3: ["No hubo un gran arrepentimiento, pero la satisfacción tampoco fue especialmente alta","Este gasto parece tener tanto puntos buenos como aspectos que revisar","Cumplió su objetivo en cierta medida, aunque puede haber otras opciones","El coste y la satisfacción parecen estar bastante equilibrados","Parece haber sido una elección segura y normal"],
        4: ["Fue un gasto satisfactorio y acorde con la cantidad pagada","La compra cumplió bien tus expectativas","Parece que gastaste tu dinero con confianza","Este gasto tuvo un efecto positivo en tu vida o estado de ánimo","El equilibrio entre precio y satisfacción fue bueno"],
        5: ["La satisfacción fue muy alta y el dinero se convirtió claramente en valor","Fue una compra realmente valiosa","La elección encajó muy bien con tus deseos","La satisfacción obtenida pudo superar la cantidad pagada","Fue un gasto valioso que enriqueció tu vida o tu ánimo"],
      },
      satTail: ["Recuérdalo como referencia para tu próxima decisión.","Usa lo que sentiste esta vez en tu próxima elección.","Revisar el precio, la calidad y el momento puede darte pistas útiles.","Pensar si volverías a elegirlo puede mostrar tu patrón de gasto."],
      need: {
        true: ["Como era un gasto necesario, no tienes que culparte solo por la cantidad","Puede considerarse un gasto que sostiene la vida diaria","Usaste el dinero adecuadamente en algo que necesitabas","En las compras necesarias importan la comodidad y la calidad, no solo el precio","Incluir este gasto en el presupuesto con antelación puede ayudar"],
        false: ["Aunque no fuera esencial, un gasto que aporta disfrute también puede tener sentido","En los gastos no esenciales, el valor sentido después es una medida importante","Cuanto menos necesario sea algo, más importa el equilibrio entre coste y satisfacción","Elige qué gastos de disfrute quieres conservar de verdad","Esperar un poco antes de comprar puede aclarar la decisión"],
      },
      needTail: ["Comprueba de nuevo el propósito antes de hacer una elección similar.","Piensa si podrías obtener el mismo beneficio de una forma más satisfactoria."],
      rateTemplates: [
        "Tu tasa de uso actual es del {rate}% y queda un {remaining}%. Compárala con tus próximos planes.",
        "Has utilizado el {rate}% del objetivo. Revisa la prioridad de los gastos restantes.",
        "La tasa de uso es del {rate}%. Asegurar primero los gastos necesarios puede darte tranquilidad.",
        "Queda un {remaining}% del presupuesto. Prioriza gastos que realmente te satisfagan.",
        "Comprueba si el ritmo actual coincide con tu plan. La tasa de uso es del {rate}%.",
        "Queda un {remaining}% antes del objetivo. Reserva algo para gastos inesperados.",
        "Has usado el {rate}% del presupuesto. También conviene revisar la acumulación de pequeñas compras.",
        "Piensa cómo dividir el {remaining}% restante entre necesidades y disfrute.",
        "Tu tasa de uso actual es del {rate}%. Las compras no urgentes pueden esperar.",
        "El progreso del presupuesto es del {rate}%. Usa este registro para tu próxima decisión.",
      ],
      ending: ["Usa tanto la necesidad como la satisfacción, no solo los números, para guiar tus próximas elecciones.","Guardar este registro facilitará evaluar gastos similares la próxima vez."],
    },

    "pt-BR": {
      sat: {
        1: ["Esta despesa parece ter trazido pouca satisfação","Pode ter sido difícil sentir um valor compatível com o valor pago","O resultado pode ter sido bem diferente do esperado antes da compra","Parece haver poucos motivos para sentir que a compra valeu a pena","Esta despesa merece ser revista do ponto de vista da satisfação"],
        2: ["Houve alguns pontos positivos, mas ainda restou insatisfação","Algum valor foi obtido, embora talvez não corresponda totalmente ao preço","Não foi necessariamente uma compra ruim, mas há espaço para melhorar","O motivo da compra faz sentido, embora o resultado tenha ficado um pouco aquém","Alguns aspectos podem não ter atendido às expectativas"],
        3: ["Não houve grande arrependimento, mas a satisfação também não foi especialmente alta","Esta despesa parece ter pontos positivos e aspectos a considerar","O objetivo foi atingido em parte, embora possam existir outras opções","O custo e a satisfação parecem razoavelmente equilibrados","Parece ter sido uma escolha segura e comum"],
        4: ["Foi uma despesa satisfatória e compatível com o valor pago","A compra correspondeu bem às expectativas","Você parece ter usado o dinheiro com confiança","Esta despesa teve um efeito positivo na vida ou no humor","O equilíbrio entre preço e satisfação foi bom"],
        5: ["A satisfação foi muito alta e o dinheiro claramente gerou valor","Foi uma compra realmente valiosa","A escolha combinou muito bem com o que você queria","A satisfação obtida pode ter superado o valor pago","Foi uma despesa valiosa que enriqueceu sua vida ou seu humor"],
      },
      satTail: ["Guarde isso como referência para a próxima decisão.","Use o que sentiu desta vez na próxima escolha.","Rever preço, qualidade e momento da compra pode trazer boas pistas.","Pensar se você escolheria novamente pode mostrar seu padrão de gastos."],
      need: {
        true: ["Como era uma despesa necessária, não é preciso se culpar apenas pelo valor","Pode ser vista como uma despesa que sustenta a vida cotidiana","Você usou o dinheiro de forma adequada em algo necessário","Em compras necessárias, praticidade e qualidade importam tanto quanto o preço","Incluir esse gasto no orçamento com antecedência pode ajudar"],
        false: ["Mesmo não sendo essencial, um gasto que traz prazer também pode ter sentido","Em gastos não essenciais, o valor percebido depois é um critério importante","Quanto menos necessário for algo, mais importa o equilíbrio entre custo e satisfação","Escolha quais gastos de lazer você realmente quer manter","Esperar um pouco antes de comprar pode deixar a decisão mais clara"],
      },
      needTail: ["Confira novamente o objetivo antes de fazer uma escolha parecida.","Pense se o mesmo benefício pode ser obtido de uma forma mais satisfatória."],
      rateTemplates: [
        "A taxa de uso atual é {rate}% e restam {remaining}%. Compare isso com seus próximos planos.",
        "Você usou {rate}% da meta. Reveja a prioridade das despesas restantes.",
        "A taxa de uso é {rate}%. Garantir primeiro as despesas necessárias pode trazer tranquilidade.",
        "Restam {remaining}% do orçamento. Priorize gastos que tragam satisfação real.",
        "Verifique se o ritmo atual está de acordo com o plano. A taxa de uso é {rate}%.",
        "Ainda restam {remaining}% antes da meta. Guarde uma margem para despesas inesperadas.",
        "Você já usou {rate}% do orçamento. Também vale conferir o acúmulo de pequenas compras.",
        "Pense em como dividir os {remaining}% restantes entre necessidades e lazer.",
        "A taxa de uso atual é {rate}%. Compras sem urgência podem esperar.",
        "O progresso do orçamento é {rate}%. Use este registro para a próxima decisão.",
      ],
      ending: ["Use necessidade e satisfação, e não apenas os números, para orientar suas próximas escolhas.","Guardar este registro facilitará avaliar despesas parecidas na próxima vez."],
    },

    my: {
      sat: {
        1: ["ဒီအသုံးစရိတ်က ကျေနပ်မှုအနည်းငယ်သာပေးခဲ့သလို ထင်ရပါတယ်","ပေးချေထားတဲ့ငွေနဲ့ နှိုင်းယှဉ်ရင် တန်ဖိုးကိုခံစားရခက်ခဲ့နိုင်ပါတယ်","ဝယ်မီမျှော်လင့်ချက်နဲ့ ရလဒ်ကြား ကွာဟချက်ကြီးခဲ့နိုင်ပါတယ်","ဝယ်ရတာကောင်းတယ်လို့ ခံစားရမယ့်အချက်နည်းခဲ့သလိုပါ","ကျေနပ်မှုအရ ပြန်လည်သုံးသပ်သင့်တဲ့အသုံးစရိတ်ပါ"],
        2: ["ကောင်းတဲ့အချက်ရှိပေမယ့် မကျေနပ်မှုလည်းကျန်ခဲ့ပါတယ်","တန်ဖိုးအချို့ရပေမယ့် ဈေးနှုန်းနဲ့ အပြည့်အဝမကိုက်နိုင်ပါ","မကောင်းတဲ့ဝယ်ယူမှုမဟုတ်ပေမယ့် ပြင်ဆင်နိုင်တာရှိပါတယ်","ဝယ်ခဲ့တဲ့အကြောင်းရင်းနားလည်ရပေမယ့် ရလဒ်နည်းနည်းလိုအပ်ပါတယ်","အချို့အပိုင်းတွေက မျှော်လင့်ချက်မပြည့်ခဲ့နိုင်ပါတယ်"],
        3: ["အလွန်နောင်တမရှိပေမယ့် ထူးခြားတဲ့ကျေနပ်မှုလည်းနည်းပါတယ်","ကောင်းတဲ့အချက်နဲ့ စဉ်းစားရမယ့်အချက်နှစ်မျိုးလုံးရှိပါတယ်","ရည်ရွယ်ချက်တချို့ပြည့်ခဲ့ပေမယ့် အခြားရွေးချယ်မှုရှိနိုင်ပါတယ်","ကုန်ကျစရိတ်နဲ့ ကျေနပ်မှု တော်တော်ညီမျှပါတယ်","လုံခြုံပြီးသာမန်ရွေးချယ်မှုတစ်ခုလိုပါပဲ"],
        4: ["ကျေနပ်မှုမြင့်ပြီး ပေးချေငွေနဲ့တန်တဲ့အသုံးစရိတ်ပါ","ဝယ်မီမျှော်လင့်ချက်ကိုကောင်းစွာပြည့်မီပါတယ်","ယုံကြည်မှုနဲ့ငွေသုံးနိုင်ခဲ့ပါတယ်","ဘဝသို့မဟုတ်စိတ်ခံစားမှုကိုကောင်းမွန်စေခဲ့ပါတယ်","ဈေးနှုန်းနဲ့ကျေနပ်မှုညီမျှပါတယ်"],
        5: ["ကျေနပ်မှုအလွန်မြင့်ပြီး ငွေကတန်ဖိုးအဖြစ်ပြောင်းလဲခဲ့ပါတယ်","အလွန်တန်တဲ့ဝယ်ယူမှုပါ","ရွေးချယ်မှုကကိုယ့်ဆန္ဒနဲ့အလွန်ကိုက်ညီပါတယ်","ပေးချေငွေထက်ပိုတဲ့ကျေနပ်မှုရနိုင်ပါတယ်","ဘဝသို့မဟုတ်စိတ်ခံစားမှုကိုကြွယ်ဝစေတဲ့အသုံးစရိတ်ပါ"],
      },
      satTail: ["နောက်ဆုံးဖြတ်ချက်အတွက်စံအဖြစ်မှတ်ထားပါ။","ဒီအတွေ့အကြုံကိုနောက်ရွေးချယ်မှုမှာအသုံးချပါ။","ဈေးနှုန်း၊အရည်အသွေး၊အချိန်ကိုပြန်ကြည့်ရင်အကြံရနိုင်ပါတယ်။","ထပ်ရွေးမလားစဉ်းစားရင်အသုံးစရိတ်ပုံစံမြင်နိုင်ပါတယ်။"],
      need: {
        true: ["လိုအပ်တဲ့အသုံးစရိတ်ဖြစ်လို့ ငွေပမာဏကြောင့်သာကိုယ့်ကိုအပြစ်မတင်ပါနဲ့","နေ့စဉ်ဘဝကိုထောက်ပံ့တဲ့အသုံးစရိတ်အဖြစ်မြင်နိုင်ပါတယ်","လိုအပ်တာအတွက်ငွေကိုမှန်ကန်စွာအသုံးပြုခဲ့ပါတယ်","လိုအပ်တဲ့ဝယ်ယူမှုမှာဈေးနှုန်းသာမကအသုံးဝင်မှုနဲ့အရည်အသွေးလည်းအရေးကြီးပါတယ်","နောက်တစ်ခါဘတ်ဂျက်ထဲကြိုထည့်ထားရင်စိတ်ချရပါတယ်"],
        false: ["မလိုအပ်ပေမယ့်ပျော်ရွှင်မှုရစေတဲ့အသုံးစရိတ်လည်းအဓိပ္ပာယ်ရှိပါတယ်","မလိုအပ်တဲ့အသုံးစရိတ်မှာသုံးပြီးနောက်ခံစားရတဲ့တန်ဖိုးကအရေးကြီးပါတယ်","လိုအပ်မှုနည်းလေလေကုန်ကျစရိတ်နဲ့ကျေနပ်မှုညီမျှမှုအရေးကြီးလေလေပါ","တကယ်ထိန်းထားချင်တဲ့ပျော်ရွှင်မှုအသုံးစရိတ်ကိုရွေးပါ","မဝယ်ခင်ခဏစောင့်ရင်ဆုံးဖြတ်ရလွယ်ပါတယ်"],
      },
      needTail: ["နောက်တစ်ခါအလားတူရွေးချယ်မှုမလုပ်ခင်ရည်ရွယ်ချက်ပြန်စစ်ပါ။","တူညီတဲ့အကျိုးကျေးဇူးကိုပိုကျေနပ်စရာနည်းနဲ့ရနိုင်မလားစဉ်းစားပါ။"],
      rateTemplates: [
        "လက်ရှိအသုံးပြုနှုန်း {rate}% ဖြစ်ပြီး {remaining}% ကျန်ပါတယ်။ နောက်အစီအစဉ်နဲ့နှိုင်းယှဉ်ပါ။",
        "ရည်မှန်းချက်ရဲ့ {rate}% ကိုသုံးထားပါတယ်။ ကျန်အသုံးစရိတ်ဦးစားပေးမှုကိုစစ်ပါ။",
        "အသုံးပြုနှုန်း {rate}% ပါ။ လိုအပ်တာကိုအရင်ထိန်းထားရင်စိတ်ချရပါတယ်။",
        "ဘတ်ဂျက် {remaining}% ကျန်ပါတယ်။ တကယ်ကျေနပ်စေတဲ့အသုံးစရိတ်ကိုရွေးပါ။",
        "လက်ရှိနှုန်းကအစီအစဉ်နဲ့ကိုက်မကိုက်စစ်ပါ။ အသုံးပြုနှုန်း {rate}% ပါ။",
        "ရည်မှန်းချက်မတိုင်မီ {remaining}% ကျန်ပါတယ်။ မမျှော်လင့်ထားတဲ့အသုံးစရိတ်အတွက်နေရာထားပါ။",
        "ဘတ်ဂျက် {rate}% သုံးထားပါတယ်။ အသေးစားဝယ်ယူမှုစုစည်းမှုကိုလည်းစစ်ပါ။",
        "ကျန် {remaining}% ကိုလိုအပ်တာနဲ့ပျော်ရွှင်မှုကြားဘယ်လိုခွဲမလဲစဉ်းစားပါ။",
        "လက်ရှိအသုံးပြုနှုန်း {rate}% ပါ။ အရေးမကြီးတဲ့ဝယ်ယူမှုကိုရွှေ့နိုင်ပါတယ်။",
        "ဘတ်ဂျက်တိုးတက်မှု {rate}% ပါ။ ဒီမှတ်တမ်းကိုနောက်ဆုံးဖြတ်ချက်မှာအသုံးချပါ။",
      ],
      ending: ["နောက်ရွေးချယ်မှုမှာဂဏန်းသာမကလိုအပ်မှုနဲ့ကျေနပ်မှုကိုပါအသုံးချပါ။","ဒီမှတ်တမ်းကနောက်အလားတူအသုံးစရိတ်ကိုဆုံးဖြတ်ရလွယ်စေပါတယ်။"],
    },
  };

  function buildSatMessages(languageData, satisfaction) {
    const leads = languageData.sat[satisfaction];
    const tails = languageData.satTail;
    const result = [];

    leads.forEach((lead) => {
      tails.forEach((tail) => {
        result.push(`${lead}。${tail}`);
      });
    });

    return result.slice(0, 20);
  }

  function buildNeedMessages(languageData, necessary) {
    const leads = languageData.need[necessary];
    const tails = languageData.needTail;
    const result = [];

    leads.forEach((lead) => {
      tails.forEach((tail) => {
        result.push(`${lead}。${tail}`);
      });
    });

    return result.slice(0, 10);
  }

  function buildRateMessages(languageData, rate) {
    const remaining = Math.max(0, 100 - Number(rate));

    return languageData.rateTemplates.map((template) => {
      return template
        .replaceAll("{rate}", String(rate))
        .replaceAll("{remaining}", String(remaining));
    });
  }

  function buildLanguageMessages(languageData) {
    const satisfaction = {};
    const necessary = {};
    const rate = {};

    [1, 2, 3, 4, 5].forEach((level) => {
      satisfaction[level] =
        buildSatMessages(languageData, level);
    });

    necessary.true =
      buildNeedMessages(languageData, true);

    necessary.false =
      buildNeedMessages(languageData, false);

    [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
      .forEach((value) => {
        rate[value] =
          buildRateMessages(languageData, value);
      });

    return {
      satisfaction,
      necessary,
      rate,
      ending: languageData.ending,
    };
  }

  const adviceMessagesByLanguage = {};

  Object.entries(LANGUAGES).forEach(
    ([language, languageData]) => {
      adviceMessagesByLanguage[language] =
        buildLanguageMessages(languageData);
    }
  );

  function getAdviceMessages(language) {
    return (
      adviceMessagesByLanguage[language] ||
      adviceMessagesByLanguage.ja
    );
  }

  function countAdvicePatterns() {
    return 5 * 2 * 11 * 20 * 10 * 10 * 2;
  }

  window.adviceMessagesByLanguage =
    adviceMessagesByLanguage;

  window.getAdviceMessages =
    getAdviceMessages;

  window.countAdvicePatterns =
    countAdvicePatterns;

  console.log(
    `多言語アドバイス総数: ${countAdvicePatterns().toLocaleString()}通り`
  );
})();
