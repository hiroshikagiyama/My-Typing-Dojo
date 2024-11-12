# My-typing-dojo
タイピングと日々の学習を同時に行える。タイピングアプリです。  
Renderで公開しているので、[My-typing-dojo](https://my-typing-dojo.onrender.com)から利用できます。  
```hoge```と入力して、```Login```ボタンを押して、プレイ開始です。  

## Play demo  
![gif](https://github.com/user-attachments/assets/3ae47424-79a4-42bf-a5ef-91edd5128865)

このアプリは以下技術を利用しています。  
<img src="https://img.shields.io/badge/-React-61DAFB.svg?logo=&style=for-the-badge">
<img src="https://img.shields.io/badge/-Javascript-F7DF1E.svg?logo=&style=for-the-badge">
<img src="https://img.shields.io/badge/-chakra%20ui-258AAF.svg?logo=&style=for-the-badge"> 
<img src="https://img.shields.io/badge/-Vite-003791.svg?logo=&style=for-the-badge"> 
<img src="https://img.shields.io/badge/-Postgresql-336791.svg?logo=&style=for-the-badge">
<img src="https://img.shields.io/badge/-Knex-272822.svg?logo=&style=for-the-badge"> 
<img src="https://img.shields.io/badge/-Express-003791.svg?logo=&style=for-the-badge"> 
<img src="https://img.shields.io/badge/-Render-5391FE.svg?logo=powershell&style=for-the-badge"> 

## version
React 18.3.1  
Node.js 20.18.0  
PostgreSQL 14.13  
Chakra ui 3.1.1  

## Quick Start
* コマンドを１行ずつ実行して、任意のローカルリポジトリにクローンしてください。
```bash
$ git clone git@github.com:hiroshikagiyama/my-typing-dojo.git
$ cd my-typing-dojo
$ npm install
```

* frontendディレクトリで、必要なライブラリをインストールします。
```bash
$ cd frontend
$ npm install
```

* Chakra UIの必要なライブラリをインストールします。
```bash
$ npm i @chakra-ui/react @emotion/react
$ npx @chakra-ui/cli snippet add
```

* backendディレクトリで、必要なライブラリをインストールします。
```bash
$ cd ..
$ cd backend
$ npm install
```


* ローカル環境に、データベースを作成します。 ご自身の方法で作成していただいて結構です。
* psqlにログインします。
```bash  
$ psql postgres
```  
```#postgres=```になっていることを確認してください。  

* データベースを作成します。
```bash  
$ CREATE DATABASE my_typing_dojo;
```  
```CREATE DATABASE```が表示されれば、成功です。

* psqlからログアウトする
```bash  
$ exit
``` 
ターミナルは閉じてかまいません。  
***手順の半分まで来ました。頑張りましょう！！***

## Next step
データベースへのマイグレーション、シードを行います。
* コードエディターを開いてください。ターミナル上で操作しても構いません。
* backendディレクトリで、以下のコマンドを実行し、マイグレーションを行います。
```bash
$ npm run db:migrate
```
データテーブルが３つ作成されました。  
```user_lis``` ユーザーリスト  
```sentence_list``` typingの文章が登録されるテーブル  
```typing_log``` typingのスコアが記録されるテーブル  

* 続いて、シードを行います。
```bash
$ npm run db:seed
```
データテーブルに初期データが登録されました。

* frontendディレクトリでローカルサーバーを起動します。
```bash
$ npm run dev
```

* backendディレクトリでアプリを起動します。
```bash
$ npm run dev
```

***さあ、すべてのセットアップが完了しました 🎉***  
***ここからアプリにアクセス：[http://localhost:5173/](http://localhost:5173/)***  
ログイン画面で ```hoge``` もしくは、```moge``` でログインしましょー 🚀


***お疲れ様でした。***  
***これで、タイピングとプログラミングの学習を同時に行えます 👻***


## Coming soon
### ログイン認証の追加
passport.jsを使ってユーザー認証機能を実装
### 文章の追加登録機能
学習中のプログラミング言語、英語を追加できる機能を実装
### スコアの履歴表示機能
ユーザーのベストスコア、成長記録を表示する画面を実装
### 文章の折り返し修正
単語の途中で折り返さないようにコード修正

