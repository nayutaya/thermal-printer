# 印刷サービス

## タスク

* [ ] `README.md`を整理する。

## 運用モード

```sh
cd service/printing
./build_image.sh
./run_service.sh
```

## Flask開発モード + モックモード

```sh
cd service/printing
./build_image.sh
docker run --interactive --tty --rm \
  --publish 3030:8080 \
  --volume $(pwd):/workspace \
  thermal-printer/service/printing \
  /bin/bash
```

```sh
FLASK_APP=/workspace/src/app.py FLASK_ENV=development flask run --host=0.0.0.0 --port=8080
```

## 使用例

```sh
curl \
  --request POST \
  --header "Content-Type: image/png" \
  --data-binary @hello.png \
  http://localhost:3030/print
```
