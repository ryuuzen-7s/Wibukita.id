// Ambil anime populer dari Jikan API
fetch('https://api.jikan.moe/v4/top/anime?limit=12')
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById('popular-anime');
    data.data.forEach(anime => {
      const img = document.createElement('img');
      img.src = anime.images.jpg.image_url;
      img.alt = anime.title;
      img.addEventListener('click', () => {
        window.location.href = `detail.html?id=${anime.mal_id}`;
      });
      container.appendChild(img);
    });
  });

// Ambil anime baru tayang dari Jikan API
fetch('https://api.jikan.moe/v4/seasons/now?limit=12')
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById('new-anime');
    data.data.forEach(anime => {
      const img = document.createElement('img');
      img.src = anime.images.jpg.image_url;
      img.alt = anime.title;
      img.addEventListener('click', () => {
        window.location.href = `detail.html?id=${anime.mal_id}`;
      });
      container.appendChild(img);
    });
  });