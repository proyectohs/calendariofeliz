// script.js

document.addEventListener('DOMContentLoaded', () => {
  const calendarGrid = document.getElementById('calendar-grid');
  const modal = document.getElementById('modal');
  const modalImg = document.getElementById('modal-img');
  const modalDesc = document.getElementById('modal-desc');
  const closeModalBtn = document.getElementById('close-modal');

  const musicControlBtn = document.getElementById('toggle-music');
  
  let musicPlaying = false;
  const music = new Audio('audio/musica.mp3');
  music.loop = true;
  music.volume = 0.3;

  document.addEventListener('click', () => {
    if (!musicPlaying) {
      music.play().catch(() => {});
      musicPlaying = true;
      musicControlBtn.textContent = '🎵';
    }
  }, { once: true });

  musicControlBtn.addEventListener('click', () => {
    if(musicPlaying){
      music.pause();
      musicPlaying = false;
      musicControlBtn.textContent = '🔇';
    } else {
      music.play();
      musicPlaying = true;
      musicControlBtn.textContent = '🎵';
    }
  });

  closeModalBtn.addEventListener('click', () => {
    modal.classList.add('hidden');
  });

  fetch('./data/premios.json')
    .then(response => response.json())
    .then(data => {
      createCases(data.premios);
    })
    .catch(err => {
      console.error('Error cargando premios:', err);
      calendarGrid.innerHTML = '<p style="color:red;">No se pudieron cargar los premios.</p>';
    });

  function createCases(premios) {
    premios.forEach((premio, index) => {
      const caseNumber = index + 1;

      const div = document.createElement('div');
      div.classList.add('case');
      div.textContent = caseNumber;

      if(localStorage.getItem(`adviento_${caseNumber}_opened`) === 'true') {
        div.classList.add('opened');
        div.style.backgroundImage = `url(${premio.imagen})`;
        div.textContent = '';
        div.style.backgroundSize = 'cover';
        div.style.backgroundPosition = 'center';
      }

      div.addEventListener('click', () => {
        openCase(div, premio, caseNumber);
      });

      calendarGrid.appendChild(div);
    });
  }

  function openCase(div, premio, caseNumber) {
    if (!div.classList.contains('opened')) {
      div.classList.add('opened');
      localStorage.setItem(`adviento_${caseNumber}_opened`, 'true');
      div.style.backgroundImage = `url(${premio.imagen})`;
      div.textContent = '';
      div.style.backgroundSize = 'cover';
      div.style.backgroundPosition = 'center';
    }
    openModal(premio);
  }

  function openModal(premio) {
    modalImg.src = premio.imagen;
    modalImg.alt = premio.descripcion;
    modalDesc.textContent = premio.descripcion;
    modal.classList.remove('hidden');
  }

  const snowContainer = document.getElementById('snow-container');

  function createSnowflake() {
    const snowflake = document.createElement('div');
    snowflake.classList.add('snowflake');
    snowflake.style.left = Math.random() * window.innerWidth + 'px';
    const size = (Math.random() * 8) + 4;
    snowflake.style.width = size + 'px';
    snowflake.style.height = size + 'px';
    snowflake.style.animationDuration = (Math.random() * 5) + 5 + 's';
    snowflake.style.opacity = Math.random() + 0.3;

    snowContainer.appendChild(snowflake);

    setTimeout(() => {
      snowflake.remove();
    }, 10000);
  }

  setInterval(createSnowflake, 200);
});
