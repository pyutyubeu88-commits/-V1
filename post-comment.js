export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: '허용되지 않는 메서드' });

  const { parentId, text, accessToken } = req.body;
  if (!parentId || !text || !accessToken)
    return res.status(400).json({ error: 'parentId, text, accessToken 필요' });

  try {
    const r = await fetch('https://www.googleapis.com/youtube/v3/comments?part=snippet', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${accessToken}` },
      body: JSON.stringify({ snippet: { parentId, textOriginal: text } })
    });
    const data = await r.json();
    if (data.error) return res.status(400).json({ error: data.error.message });
    return res.status(200).json({ success: true, id: data.id });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
