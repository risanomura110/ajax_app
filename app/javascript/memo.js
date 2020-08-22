function memo() {
  const submit = document.getElementById("submit");
  submit.addEventListener("click", (e) => {
  // ’投稿する’をクリックした時の機能内容 /なぜ？(e)????
  const formData = new FormData(document.getElementById("form"));
  const XHR = new XMLHttpRequest();
  XHR.open("POST", "/posts", true);
  // 投稿するをクリックしたらposts#createが実行される（クリックした時の処理内容）
  XHR.responseType = "json";
  XHR.send(formData);
  // メモ投稿のフォームに書き込まれた文字情報を送信する


  XHR.onload = () => {
    // レスポンスが成功した時の処理内容
    if (XHR.status != 200) {
      // エラー内容をアラートする
      alert(`Error ${XHR.status}: ${XHR.statusText}`);
      return null;
    }
    const item = XHR.response.post;
    // レスポンスとして返却されたメモのレコードデータ
    const list = document.getElementById("list");
    // HTMLを描画する場所を指定する際に使用する「描画する親要素」のlistの要素
    const formText = document.getElementById("content");
    // 「メモの入力フォーム」をリセットするためcontent要素を取得する
    const HTML = `
      <div class="post" data-id=${item.id}>
        <div class="post-date">
          投稿日時：${item.created_at}
        </div>
        <div class="post-content">
        ${item.content}
        </div>
      </div>`;
      list.insertAdjacentHTML("afterend", HTML);
    // html内に記述した<id=list>に上のHTMLを描画できる/list要素の直後に挿入
    formText.value = "";
    // メモの入力フォームに空の文字列が上書きされる
  };
  e.preventDefault();
  // memo.jsの処理が重複しないようにする？？？デフォルトの機能を妨害する？？？

});
}
window.addEventListener("load", memo);

// index.html
// <%= form.submit '投稿する' , id: "submit" %>
// <%= form_with url:  "/posts", method: :post,id: "form" do |form| %>
// <%= form.text_field :content  , id: "content"%>
/* <div id="list"></div> */
