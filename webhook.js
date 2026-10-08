// Vercel Serverless Function: /api/webhook
export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(200).send("OK");
  try {
    const events = req.body?.events || [];
    const token = process.env.LINE_CHANNEL_ACCESS_TOKEN;
    if (!token) return res.status(500).json({error:"LINE token is not configured"});

    for (const event of events) {
      const source = event.source || {};
      if (source.type === "group" && source.groupId) {
        const text = `HomeMate LINE 連線測試成功！\n\n這個群組的 groupId 已取得：\n${source.groupId}\n\n請把這串 groupId 複製到 Vercel 的 LINE_TO_GROUP_ID。`;
        await fetch("https://api.line.me/v2/bot/message/push", {
          method:"POST",
          headers:{
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
          },
          body:JSON.stringify({
            to: source.groupId,
            messages:[{type:"text", text}]
          })
        });
      }
    }
    return res.status(200).json({ok:true});
  } catch (e) {
    return res.status(500).json({error:"Webhook error"});
  }
}