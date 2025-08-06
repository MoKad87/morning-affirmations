export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST allowed' });
  }

  const { text } = req.body;
  const voiceId = '21m00Tcm4TlvDq8ikWAM'; // Replace with your preferred voice ID

  try {
    const elevenRes = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'xi-api-key': process.env.ELEVEN_API_KEY
      },
      body: JSON.stringify({
        text,
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.8
        }
      })
    });

    const audio = await elevenRes.arrayBuffer();
    res.setHeader('Content-Type', 'audio/mpeg');
    res.send(Buffer.from(audio));
  } catch (err) {
    res.status(500).json({ error: 'Failed to speak', details: err.message });
  }
}
