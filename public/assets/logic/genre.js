function applyGenre() {
  const genreId = document.getElementById('genreSelect').value;
  const container = document.getElementById('genreResults');
  container.innerHTML = '';

  fetch(`https://api.jikan.moe/v4/anime?genres=${genreId}&limit=12`)
    .then(res => res.json())
    .then(data => {
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
}

function randomGenre() {
  const options = document.getElementById('genreSelect').options;
  const randomIndex = Math.floor(Math.random() * options.length);
  options[randomIndex].selected = true;
  applyGenre();
}