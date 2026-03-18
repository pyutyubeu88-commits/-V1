// api/post-comment.js
// YouTube 댓글 게시 서버사이드 처리

export default async function handler(req, res) {
  // CORS 헤더
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: '허용되지 않는 메서드입니다.' });
  }

  const { parentId, text, accessToken } = req.body;
  
  if (!parentId || !text || !accessToken) {
    return res.status(400).json({ error: 'parentId, text, accessToken이 필요합니다.' });
  }

  try {
    const response = await fetch(
      'https://www.googleapis.com/youtube/v3/comments?part=snippet',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({
          snippet: {
            parentId: parentId,
            textOriginal: text
          }
        })
      }
    );
    
    const data = await response.json();
    
    if (data.error) {
      return res.status(400).json({ error: data.error.message });
    }
    
    return res.status(200).json({ success: true, comment: data });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
