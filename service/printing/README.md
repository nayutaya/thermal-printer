# 印刷サービス

画像をサーマルプリンタで印刷するためのWebサービスです。

使用するポート番号は`3030/tcp`（サーマルサーマル）です。

## 運用モード

運用モードで起動する手順は以下の通りです。
`run_service.sh`の起動は、サーマルプリンタが接続、認識された状態で行ってください。
正常に起動された場合、サーマルプリンタからバージョン番号などが印字されます。

```sh
cd service/printing
./build_image.sh
./run_service.sh
```

## Flask開発モード + モックモード

Flaskの開発モードで起動し、かつ実際のプリンタを接続せずにモックを使用する手順は以下の通りです。

```sh
cd service/printing
./build_image.sh
docker run --interactive --tty --rm \
  --publish 3030:8080 \
  --volume $(pwd):/workspace \
  thermal-printer/service/printing \
  /bin/bash

# Docker内のbashで実行する。
FLASK_APP=/workspace/src/app.py FLASK_ENV=development flask run --host=0.0.0.0 --port=8080
```

## 使用例

`curl`を使って画像を印刷する例を以下に示します。

```sh
curl \
  --request POST \
  --header "Content-Type: image/png" \
  --data-binary @hello.png \
  http://localhost:3030/print
```
