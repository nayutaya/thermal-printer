# 印刷サービス

## 開発モード（モックモード）

```sh
cd service/printing
./build_image.sh
./run_bash_without_tty.sh
```

```sh
FLASK_APP=/root/src/app.py FLASK_ENV=development flask run --host=0.0.0.0 --port=8080
```

```sh
docker run --interactive --tty --rm \
  --publish 8080:8080 \
  --volume $(pwd):/workspace \
  thermal-printer/service/printing \
  /bin/bash
```

```sh
FLASK_APP=/workspace/src/app.py FLASK_ENV=development flask run --host=0.0.0.0 --port=8080
```
