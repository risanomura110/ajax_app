  function check() {
    const posts = document.querySelectorAll(".post");
    // (".post")とはhtml(class="post")のこと
    posts.forEach(function (post) { 
      // function(post)の引数の中には配列(posts)の要素が入る

      if (post.getAttribute("data-load") != null) {
        return null;
      }
      post.setAttribute("data-load", "true");
      // １度処理するものにdata-load=trueに変更
      // ?????data-loadとはメソッド？変数？？？？？
      // 2回目以降は処理済みとして処理を中断する


      post.addEventListener("click", () => { 
        // html(post)の要素をクリックするとpost#checkedアクションに飛ぶ・既読の有無を管理するchecked
        const postId = post.getAttribute("data-id");
        // data-idにpost.idの情報が入っている
        const XHR = new XMLHttpRequest();
        // 末尾の意味・HTTPリクエストを非同期で行うことができるメソッド
        XHR.open("GET", `/posts/${postId}`, true);
        // リクエストの内容（指定したpost.idのcheckedアクションに飛ぶ）
        XHR.responseType = "json";
        // 返却されるデーター形式はどうするのかの指定
        XHR.send();
        // sendメソッドで初めてリクエストできる
        XHR.onload = () => {


          if (XHR.status != 200) {
            // レスポンスエラーが起きた時のエラーメッセージの表示アラート
            alert(`Error ${XHR.status}: ${XHR.statusText}`);
            return null;    
            // JavaScriptの処理から抜け出す/エラーだったら下記の成功した時の処理をしない      
          }


        // レスポンスが成功した時の処理内容
          const item = XHR.response.post;
          //checkedアクションから返却されたitemのデーター
          if (item.checked === true) {
            post.setAttribute("data-check", "true");
            // htmlの中身を変更するdata-check=trueに
          } else if (item.checked === false) {
            post.removeAttribute("data-check");
            // htmlの中身を変更するdata-checkを消す
          }
        };
      });
    });
  }
setInterval(check, 1000);
// 1秒に1度check関数を実行する


/* <div class="post" data-id=<%= post.id %> data-check=<%= post.checked %>>
<%# 前者はメモのidが入り、後者は既読の有無を管理するcheckedカラムの情報 %>
<div class="post-date">
  投稿日時：<%= post.created_at %>
</div>
<div class="post-content">
  <%= post.content %>
</div>
</div>
<% end %> */

