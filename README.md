# wondelful-factorial.lambda.ts

🛶🛶🛶 🐶ダフルに(再帰関数もループ処理も用いずに)、階乗を計算する！  

![成果物](./fruit.gif)  

Lambdaを再帰的に呼び出すことで、階乗を計算します。  
※ 広義の再帰関数に該当しちゃうかな？？？  

## 環境構築

最初にAWS CLIをインストールします。  
<https://docs.aws.amazon.com/ja_jp/cli/latest/userguide/install-cliv2.html>  

以下のコマンドを実行して、AWS CLIのバージョンが表示されればOKです。  

```shell
aws --version
```

認証情報を設定します。  

```shell
aws configure
```

以下のように聞かれるので、適宜入力してください。

```shell
AWS Access Key ID [None]: アクセスキーID
AWS Secret Access Key [None]: シークレットアクセスキー
Default region name [None]: リージョン名
Default output format [None]: json
```

これらの情報は、AWSのコンソール画面から確認できます。  
IAMのページから指定のユーザを選択肢、アクセスキーを発行してください。  

続いて、AWS SAMをインストールします。  
こちらはサーバレスアプリケーションを構築するためのツールです。  
<https://docs.aws.amazon.com/ja_jp/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html>  

以下のコマンドを実行して、AWS SAMのバージョンが表示されればOKです。  

```shell
sam --version
```

サーバサイドアプリケーションを開発用に実行するためには、以下のコマンドを実行します。  

```shell
sam build --use-container
sam local start-api
```

## 本番環境の準備

### GitHub Secretsの設定

| キー | バリュー |
| --- | --- |
| STACK_NAME | プロジェクト名(CloudFormationのスタック名) |
| AWS_ACCESS_KEY_ID | AWSのアクセスキーID |
| AWS_SECRET_ACCESS_KEY | AWSのシークレットアクセスキー |
| AWS_REGION | リージョン名 |

### デプロイ

`v-*`形式のタグをつけると、GitHub Actionsがデプロイを行います。  
手動でデプロイする場合は、以下のコマンドを実行してください。  

```shell
sam build --use-container
sam deploy --stack-name <スタック名>
```

各種出力データを確認するためには、以下のコマンドを実行してください。  

```shell
aws cloudformation describe-stacks --stack-name <スタック名> --query 'Stacks[].Outputs'
```
