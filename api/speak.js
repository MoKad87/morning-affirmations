async function speakList(lines) {
  for (const line of lines) {
    try {
      const response = await fetch('/api/speak', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: line })
      });

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);

      // 👇 This ensures audio plays one-by-one
      await new Promise((resolve) => {
        audio.onended = resolve;
        audio.onerror = resolve;  // Fallback if there's a problem
        audio.play();
      });

    } catch (err) {
      console.error('Voice error:', err);
    }
  }
}
