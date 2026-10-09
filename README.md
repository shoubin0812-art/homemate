# HomeMate｜LINE 表單

手機友善的 HomeMate 訂製表單，送出後透過 LINE Messaging API 傳到指定工作群組。

## Vercel 環境變數
- `LINE_CHANNEL_ACCESS_TOKEN`：LINE Developers 產生的長期 Channel access token，請使用 Secret。
- `LINE_TO_GROUP_ID`：要接收 HomeMate 結果的 LINE 群組 ID。

## LINE Webhook
部署後，把：
`https://你的網域/api/webhook`
設定到 LINE Developers 的 Webhook URL，並啟用 Use webhook。

官方帳號在目標群組內收到任意訊息後，Webhook 會把 groupId 回傳到該群組，方便複製到 Vercel。
Deployment update
