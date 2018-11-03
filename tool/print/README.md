# 印刷ツール

文字列、画像を印刷するためのツールです。主にテスト用途を想定しています。

```sh
cd tool/print/
./build_image.sh
./run_bash.sh
```

```sh
/root/main.py text $(ls /dev/ttyACM* | head -n 1) "Hello World"
/root/main.py image $(ls /dev/ttyACM* | head -n 1) /root/hello.png
```
