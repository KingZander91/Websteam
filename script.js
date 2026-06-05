async function loadGames(){
  try{
    const res = await fetch('games.json');
    const games = await res.json();
    renderGames(games);
  }catch(e){
    console.error('Failed to load games', e);
    document.getElementById('library').textContent = 'Failed to load games.json';
  }
}

function renderGames(games){
  const root = document.getElementById('library');
  root.innerHTML = '';
  games.forEach(game => {
    const card = document.createElement('article');
    card.className = 'game-card';

    const cover = document.createElement('div');
    cover.className = 'cover';
    cover.style.backgroundImage = `url(${game.cover})`;

    const thumb = document.createElement('img');
    thumb.className = 'thumb';
    thumb.src = game.thumbnail;
    thumb.alt = game.title + ' thumbnail';

    cover.appendChild(thumb);

    const body = document.createElement('div');
    body.className = 'card-body';

    const info = document.createElement('div');
    const title = document.createElement('div');
    title.className = 'title';
    title.textContent = game.title;
    const meta = document.createElement('div');
    meta.className = 'meta';
    meta.textContent = game.genre || '';
    info.appendChild(title);
    info.appendChild(meta);

    const actions = document.createElement('div');
    actions.className = 'actions';

    // Play button uses the Download.png image for all games
    const link = document.createElement('a');
    link.href = game.playlink || '#';
    link.target = '_blank';
    link.className = 'play-link';
    const img = document.createElement('img');
    img.src = 'assets/Download.png';
    img.alt = 'Download';
    const txt = document.createElement('span');
    txt.textContent = 'Play';
    link.appendChild(img);
    link.appendChild(txt);

    actions.appendChild(link);

    body.appendChild(info);
    body.appendChild(actions);

    card.appendChild(cover);
    card.appendChild(body);
    root.appendChild(card);
  });
}

loadGames();
