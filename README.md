# liberta
フリーランスの教師と生徒のマッチングサービス

# 開発環境

### バックエンド
・*Docker*

・*Rails*

・*redis*

・*MySQL*

### フロントエンド
・*Next.js*

・*TypeScript*
 
## 実装機能と使用技術

・*ユーザ認証機能（devise_auth_token,cookie）*

・*検索機能（フロント&バックエンド）*
 
・*リアルタイムチャット機能(redis,Actioncable)*

・*ユーザーいいね機能*

・*画像アップロード(carrierwave)*

## 概要
docker上でrails環境を立ち上げapiエンドポイントを作成し、Next.jsでjsonを受け取り表示。

redisはリアルタイムチャット機能を実現するために使用

