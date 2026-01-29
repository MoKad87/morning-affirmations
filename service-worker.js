function sendCmd(cmd) {
  const number = '2532011314';
  const body = encodeURIComponent(cmd);

  const ua = navigator.userAgent || "";
  const isIOS = /iPad|iPhone|iPod/.test(ua);
  const isAndroid = /Android/i.test(ua);

  if (isIOS) {
    // iOS: needs &body
    window.location.href = `sms:${number}&body=${body}`;
    return;
  }

  if (isAndroid) {
    // Android: smsto: is more reliable for pre-filling body across messaging apps
    window.location.href = `smsto:${number}?body=${body}`;
    return;
  }

  // Fallback for anything else
  window.location.href = `sms:${number}?body=${body}`;
}
