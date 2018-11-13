# レンダリングサービス

HTMLをレンダリングし、画像として出力するWebサービスです。

使用するポート番号は`3031/tcp`です。

## 使用例

`curl`を使ってHTMLを画像に変換する例を以下に示します。

```sh
curl \
  --request POST \
  --header "Content-Type: application/json" \
  --data-binary @hello.json \
  http://localhost:3031/render_html > hello.png
```
