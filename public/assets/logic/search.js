function search() {
  const query = document.getElementById('searchInput').value.trim();
  const type = document.getElementById('typeSelect').value;
  const container = document.getElementById('searchResults');
  container.innerHTML = '';

  if (!query) return;

  const endpoint = type === 'anime'
    ? `https://api.jikan.moe/v4/anime?q=${encodeURIComponent(query)}&limit=12`
    : `https://api.jikan.moe/v4/manga?q=${encodeURIComponent(query)}&limit=12`;

  fetch(endpoint)
    .then(res => res.json())
    .then(data => {
      data.data.forEach(item => {
        const img = document.createElement('img');
        img.src = item.images.jpg.image_url;
        img.alt = item.title;
        img.addEventListener('click', () => {
          window.location.href = `detail.html?id=${item.mal_id}`;
        });
        container.appendChild(img);
      });
    })
    .catch(err => {
      console.error('Gagal mengambil data dari Jikan API:', err);
    });
}