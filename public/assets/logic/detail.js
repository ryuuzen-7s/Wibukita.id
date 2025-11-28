const urlParams = new URLSearchParams(window.location.search);
const malId = urlParams.get('id');

if (malId) {
  fetch(`https://api.jikan.moe/v4/anime/${malId}`)
    .then(res => res.json())
    .then(data => {
      const anime = data.data;
      const container = document.getElementById('animeDetail');
      const synopsis = document.getElementById('synopsis');

      container.innerHTML = `
        <img src="${anime.images.jpg.image_url}" alt="${anime.title}">
        <h2>Judul Anime: ${anime.title}</h2>
        <p>Jumlah Episode: ${anime.episodes || 'Belum diketahui'}</p>
        <p>Pengarang: ${anime.authors?.map(a => a.name).join(', ') || '-'}</p>
        <p>Rating: ${anime.score || '-'}</p>
        <p>Studio: ${anime.studios?.map(s => s.name).join(', ') || '-'}</p>
        <p>Status: ${anime.status}</p>
        <p>Genre: ${anime.genres.map(g => g.name).join(', ')}</p>
      `;

      synopsis.textContent = anime.synopsis || 'Sinopsis belum tersedia.';
    });

  fetch(`https://api.jikan.moe/v4/anime/${malId}/recommendations`)
    .then(res => res.json())
    .then(data => {
      const relatedContainer = document.getElementById('relatedAnime');
      data.data.slice(0, 8).forEach(item => {
        const img = document.createElement('img');
        img.src = item.entry.images.jpg.image_url;
        img.alt = item.entry.title;
        img.addEventListener('click', () => {
          window.location.href = `detail.html?id=${item.entry.mal_id}`;
        });
        relatedContainer.appendChild(img);
      });
    });
}