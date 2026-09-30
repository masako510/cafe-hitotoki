// HTMLの読み込みが完了してから処理を開始します
$(function () {


  // ========================================
  // スムーススクロール
  // ========================================

  // ページ内リンクを取得します
  $('a[href^="#"]').on("click", function (event) {

    // href属性の値を取得します
    const target = $(this).attr("href");

    // 「#」だけの場合は処理を終了します
    if (target === "#") {
      return;
    }

    // 移動先の要素が存在しない場合は処理を終了します
    if ($(target).length === 0) {
      return;
    }

    // ブラウザ標準のジャンプを停止します
    event.preventDefault();

    // 固定ヘッダーの高さを取得します
    const headerHeight = $(".header").outerHeight();

    // 移動先の位置を取得します
    const targetPosition = $(target).offset().top;

    // 800ミリ秒かけて移動します
    $("html, body").animate(
      {
        scrollTop: targetPosition - headerHeight
      },
      800
    );

    // スマートフォンメニューを閉じます
    closeMobileMenu();

  });


  // ========================================
  // ハンバーガーメニュー
  // ========================================

  // ハンバーガーボタンをクリックしたときの処理です
  $(".hamburger").on("click", function () {

    // 現在メニューが開いているか確認します
    const isOpen = $(this).hasClass("is-open");

    // ハンバーガーの見た目を切り替えます
    $(this).toggleClass("is-open");

    // スマートフォンメニューを開閉します
    $("#mobile-menu").toggleClass("is-open");

    // aria-expandedの値を更新します
    $(this).attr("aria-expanded", !isOpen);

    // ボタンの説明文を変更します
    $(this).attr(
      "aria-label",
      isOpen ? "メニューを開く" : "メニューを閉じる"
    );

  });


  // ========================================
  // スマートフォンメニューを閉じる関数
  // ========================================

  // メニューを閉じるための関数です
  function closeMobileMenu() {

    // ハンバーガーを通常状態に戻します
    $(".hamburger").removeClass("is-open");

    // スマートフォンメニューを閉じます
    $("#mobile-menu").removeClass("is-open");

    // aria-expandedをfalseにします
    $(".hamburger").attr("aria-expanded", "false");

    // ボタンの説明文を元に戻します
    $(".hamburger").attr("aria-label", "メニューを開く");

  }


  // ========================================
  // フェードイン
  // ========================================

  // IntersectionObserverが利用できるか確認します
  if ("IntersectionObserver" in window) {

    // 画面内に入った要素を監視します
    const observer = new IntersectionObserver(
      function (entries, observer) {

        // 監視対象を1つずつ確認します
        entries.forEach(function (entry) {

          // 要素が画面内に入ったか確認します
          if (entry.isIntersecting) {

            // 表示用のクラスを追加します
            $(entry.target).addClass("is-visible");

            // 一度表示した要素の監視を終了します
            observer.unobserve(entry.target);

          }

        });

      },
      {
        // 要素が少し画面に入った時点で反応させます
        threshold: 0.15
      }
    );


    // フェードイン対象を取得します
    document.querySelectorAll(".fade-in").forEach(function (element) {

      // 要素の監視を開始します
      observer.observe(element);

    });

  } else {

    // 古いブラウザでは最初から表示します
    $(".fade-in").addClass("is-visible");

  }


  // ========================================
  // ESCキー
  // ========================================

  // キーボード操作を監視します
  $(document).on("keydown", function (event) {

    // ESCキーが押されたか確認します
    if (event.key === "Escape") {

      // スマートフォンメニューを閉じます
      closeMobileMenu();

    }

  });


  // ========================================
  // ウィンドウサイズ変更
  // ========================================

  // ブラウザサイズが変わったときに処理します
  $(window).on("resize", function () {

    // 768px以上になった場合です
    if ($(window).width() >= 768) {

      // スマートフォンメニューを閉じます
      closeMobileMenu();

    }

  });


});
