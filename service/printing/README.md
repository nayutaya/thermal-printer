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
