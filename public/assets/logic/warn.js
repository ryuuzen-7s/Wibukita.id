window.addEventListener('DOMContentLoaded', () => {
  const audio = document.getElementById('notifSound');
  if (audio) audio.play();

  let waktu = 5;
  const countdown = document.getElementById('countdown');
  const interval = setInterval(() => {
    waktu--;
    countdown.textContent = `Anda akan kembali secara otomatis dalam: ${waktu} detik`;
    if (waktu <= 0) {
      clearInterval(interval);
      window.location.href = 'index.html';
    }
  }, 1000);
});