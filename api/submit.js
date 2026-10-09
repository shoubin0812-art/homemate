// Vercel Serverless Function: /api/submit
export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({error:"Method Not Allowed"});
  try {
    const d = req.body || {};
    const arr = v => Array.isArray(v) ? v.join("、") : (v || "未填寫");
    const text =
`💗 HomeMate 新訂製

01｜基本資料
伴侶名稱：${d["伴侶名稱"] || "未填寫"}
性別：${d["性別"] || "未填寫"}
年齡：${d["年齡"] || "未填寫"}

02｜外型、性格、愛好
外型：${d["外型"] || "未填寫"}
個性：${d["個性"] || "未填寫"}
愛好：${d["愛好"] || "未填寫"}

03｜戀愛模式
心情不好時：${arr(d["心情不好"])}
喜歡被愛：${arr(d["被愛方式"])}

04｜日常相處
約會：${arr(d["約會"])}

05｜衝突設定
吵架時：${arr(d["吵架"])}

06｜完美伴侶測試
永遠不離開：${d["永遠不離開"] || "未填寫"}
沒有自己的想法：${d["沒有自己的想法"] || "未填寫"}
違背設定：${d["違背設定"] || "未填寫"}
真正的愛：${d["真正的愛"] || "未填寫"}

❤️ 最後一題
最希望他說的一句話：
${d["最希望他說的一句話"] || "未填寫"}

「你確定，這就是你想愛上的人嗎？」`;

    const token = process.env.LINE_CHANNEL_ACCESS_TOKEN;
    const to = process.env.LINE_TO_USER_ID;
    if (!token || !to) return res.status(500).json({error:"LINE credentials are not configured"});

    const r = await fetch("https://api.line.me/v2/bot/message/push", {
      method:"POST",
      headers:{"Content-Type":"application/json","Authorization":`Bearer ${token}`},
      body:JSON.stringify({to, messages:[{type:"text", text}]})
    });
    if (!r.ok) return res.status(502).json({error:"LINE API error"});
    return res.status(200).json({ok:true});
  } catch(e) {
    return res.status(500).json({error:"Server error"});
  }
}
