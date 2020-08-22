class PostsController < ApplicationController
  def index
    @posts = Post.all.order(id: "DESC")
  end


  def create
    post = Post.create(content: params[:content], checked: false)
    # メモ作成時に未読の情報を保存するようにしたこと
    render json:{ post: post }
  end

  def checked
    post = Post.find(params[:id])
    # postの中身がわからない？
    if post.checked 
      # postテーブルの中身checked=1なら
      post.update(checked: false)
      #もしpostテーブルのcheckedがあったらfalse(未読)に書き換えて
    else
      #postテーブルの中身checked=0,nullなら
      post.update(checked: true)
      #それ以外postテーブルのcheckedがなかったらtrue(既読)に書き換えて
    end

    item = Post.find(params[:id])
    # trueかfalseに書き換えた情報をitemに代入する
    render json: { post: item }
    # 書き換えた情報をjson形式で返却する(post:item)とは？
  end
end