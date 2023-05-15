# liberta ※開発途中
フリーランスの教師と生徒のマッチングサービス

## 開発環境

### バックエンド ※Docker上で構築

・*Rails API*

・*redis*

・*MySQL*

### フロントエンド
・*Next.js*

・*TypeScript*
 
## 概要
Dockerを使用してRails, MySQL, およびRedisの環境を構築し、apiエンドポイントをrailsで作成、Next.jsでデータを受け取り表示。

## 現段階の実際の画面と実装機能

### トップ画面

##### アニメーションを多用してモダンな雰囲気にした

##### 例）タイトルがフェードイン、アイコンが無限回転、タイピングアニメーション、ホバーアクション

#### デスクトップ
<img width="600" height="auto" alt="スクリーンショット 2023-05-13 18 47 44" src="https://github.com/taikiyokoo/liberta/assets/110810721/f846fcd5-49bf-4f9f-af8c-30dcc34e45f2">

#### モバイル
<img width="200" height="auto" src="https://github.com/taikiyokoo/liberta/assets/110810721/bcab6915-f4bb-4224-a610-9df2e0523a78">

### ログイン画面

#### デスクトップ
<img width="600" height="auto" alt="スクリーンショット 2023-05-13 18 48 21" src="https://github.com/taikiyokoo/liberta/assets/110810721/429634af-1660-48b0-8542-4e2ffa0cbadf">

#### モバイル
<img width="200" height="auto" src="https://github.com/taikiyokoo/liberta/assets/110810721/b54eaca9-7fb6-432e-9dd2-3fe9fada8a5d">

### ホーム画面

##### カードにしてホバーアクション、中の科目チップを無限にループさせる、ページ遷移を減らす、ローディング中はスケルトンを表示するなどしてモダンな感じに

##### ユーザデータはキャッシュに保存して再利用

###### ※テストデータはChatGPTで適当に生成

###### ※写真はうちの犬

#### デスクトップ
<img width="600" height="auto" alt="スクリーンショット 2023-05-13 18 26 04" src="https://github.com/taikiyokoo/liberta/assets/110810721/be673cb7-f64d-4d23-a3d6-69a45dcfee75">

#### モバイル
<img width="200" height="auto" src="https://github.com/taikiyokoo/liberta/assets/110810721/61b39988-f968-4732-80ce-9dcee3b77e16">

### 検索モーダル

##### 検索結果はキャッシュに保存し検索条件に応じて再利用

#### デスクトップ
<img width="600" height="auto" alt="スクリーンショット 2023-05-13 18 38 25"
 src="https://github.com/taikiyokoo/liberta/assets/110810721/a60f4a2b-faa3-47e8-9740-52e6f4634054">
 
#### 　モバイル
<img width="200" height="auto" src="https://github.com/taikiyokoo/liberta/assets/110810721/c968940d-3f0a-4a68-adf6-fd05c8de8120">

### ユーザ詳細ダイアログ

#### デスクトップ
<img width="600" height="auto" alt="スクリーンショット 2023-05-13 18 39 18" src="https://github.com/taikiyokoo/liberta/assets/110810721/5e1348d0-a0ee-467a-8ee2-d5364361c4b7">

#### 　モバイル
<img width="200" height="auto" src="https://github.com/taikiyokoo/liberta/assets/110810721/e34db4f4-405a-40b7-abee-894d1d8fab6d">

###### ※紹介文と他のカラムをChatGPTにそれぞれ別で生成させたので矛盾が生じている

### フロント検索

##### useMemoを使用して効率化

#### デスクトップ
<img width="600" height="auto" alt="スクリーンショット 2023-05-13 18 38 56" src="https://github.com/taikiyokoo/liberta/assets/110810721/2b00dcf9-77e8-40ce-98c2-3b94e28a2e59">

#### モバイル
<img width="200" height="auto" src="https://github.com/taikiyokoo/liberta/assets/110810721/bb1e6afb-5af6-47fb-bea7-abfdcc55f719">

### いいね一覧

#### デスクトップ
<img width="600" height="auto" alt="スクリーンショット 2023-05-13 18 37 57" src="https://github.com/taikiyokoo/liberta/assets/110810721/ae9f93af-a100-4b41-9738-6116cb53bc85">

#### 　モバイル
<img width="200" height="auto" src="https://github.com/taikiyokoo/liberta/assets/110810721/3639f9cb-6439-467f-8825-342118414e78">

### チャット画面

##### ActionCableを利用し、WebSocketプロトコルに基づく通信を実現することで、リアルタイムにメッセージのやり取りが可能なチャット機能を実装

#### デスクトップ
<img width="600" height="auto" alt="スクリーンショット 2023-05-13 18 37 08" src="https://github.com/taikiyokoo/liberta/assets/110810721/ffccdfb4-ebb2-4e8f-8c35-8d55d0b85d3f">

#### モバイル
<img width="200" height="auto" src="https://github.com/taikiyokoo/liberta/assets/110810721/0578950b-dd2d-4bd3-b426-167117a5b649">


