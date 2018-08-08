# 印刷ツール

文字列、画像を印刷するためのツールです。主にテスト用途を想定しています。

```sh
cd tool/print/
./build_image.sh
docker run --interactive --tty --rm ${USER}/thermal-printer/tool/print /bin/bash
```
