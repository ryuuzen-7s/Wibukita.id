// Fungsi untuk menampilkan anime berdasarkan hari yang dipilih
function applyDay() {
  const day = document.getElementById('daySelect').value;
  const container = document.getElementById('scheduleResults');
  container.innerHTML = '';

  fetch(`https://api.jikan.moe/v4/schedules/${day}`)
    .then(res => res.json())
    .then(data => {
      data.data.slice(0, 12).forEach(anime => {
        const img = document.createElement('img');
        img.src = anime.images.jpg.image_url;
        img.alt = anime.title;
        img.title = anime.title;
        img.addEventListener('click', () => {
          window.location.href = `detail.html?id=${anime.mal_id}`;
        });
        container.appendChild(img);
      });
    })
    .catch(err => {
      container.innerHTML = '<p>Gagal memuat data jadwal. Silakan coba lagi nanti.</p>';
      console.error('Error saat mengambil jadwal:', err);
    });
}

// Fungsi untuk memilih hari secara acak
function randomDay() {
  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  const random = days[Math.floor(Math.random() * days.length)];
  document.getElementById('daySelect').value = random;
  applyDay();
}

// Muat jadwal default saat halaman pertama kali dibuka (misalnya hari ini)
window.addEventListener('DOMContentLoaded', () => {
  const today = new Date().getDay(); // 0 = Minggu, 1 = Senin, dst.
  const map = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  document.getElementById('daySelect').value = map[today];
  applyDay();
});