// TODO -> Aplicar atualização de tela no resize, de forma que não comprometa o mobile.

const themeButton = document.getElementById('theme-button');
const image = document.getElementById('logo');
const isMobile = window.matchMedia("(max-width: 768px)").matches;
const menuDesktop = document.getElementById('menuDesktop');
const menuMobile = document.getElementById('menuMobile');
const logo = {
  mobileDark: 'src/assets/image/logo-dark-mobile.png',
  mobileLight: 'src/assets/image/logo-light-mobile.png',
  desktopDark: 'src/assets/image/logo-dark.png',
  desktopLight: 'src/assets/image/logo-light.png'
}

if (!isMobile) {
  fetch('./src/pages/navbarDesktop.html')
    .then(r => {
      if (!r) throw new Error('Erro ao gerar menu desktop');
      return r.text();
    })
    .then(html => {
      document.getElementById('menuDesktop').innerHTML = html;
    })
    .catch(error => { console.error(`Erro ao carregar menu desktop`, error) });
  resizeTimer();
} else {
  fetch('./src/pages/navbarMobile.html')
  .then(r => {
      if (!r) throw new Error('Erro ao gerar menu mobile');
      return r.text();
    })
    .then(html => {
      document.getElementById('menuMobile').innerHTML = html;
    })
    .catch(error => { console.error(`Erro ao carregar menu mobile`, error) });
  resizeTimer();
}

function resizeTimer() {
  let resizeTimeout;

  window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);

    resizeTimeout = setTimeout(() => {
      if (isMobile) {
        menuMobile.classList.remove('hidden');
        menuDesktop.classList.add('hidden');
      } else {
        menuDesktop.classList.remove('hidden');
        menuMobile.classList.add('hidden');
      }
    }, 300);

  let reloadTimer;
    if (window.innerWidth > 576) {
      clearTimeout(reloadTimer);
      reloadTimer = setTimeout(() => {
        window.location.reload();
      }, 500);
    }
  });  
}



themeButton.addEventListener('click', () => {

  const html = document.documentElement;
  const currentTheme = html.getAttribute('data-theme') || 'light';
  let newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', newTheme);

  if (newTheme === 'light') {
    themeButton.classList.remove('bi-moon-stars')
    themeButton.classList.add('bi-brightness-high')

    themeButton.classList.add('animation-sun')
    setTimeout(() => {
      themeButton.classList.remove('animation-sun')
    }, 400);

  } else {
    themeButton.classList.remove('bi-brightness-high')
    themeButton.classList.add('bi-moon-stars')

    themeButton.classList.add('animation-moon')
    setTimeout(() => {
      themeButton.classList.remove('animation-moon')
    }, 400);
  }

  if (isMobile) {
    if (currentTheme === 'dark') {
      image.src = logo.mobileLight
    } else {
      image.src = logo.mobileDark
    }
  } else {
    if (currentTheme === 'dark') {
      image.src = logo.desktopLight
    } else {
      image.src = logo.desktopDark
    }
  }

})

const accordionContainer = document.querySelectorAll('.accordion__header');
accordionContainer.forEach(header => (
  header.addEventListener('click', () => {
    const accordionItem = header.parentElement;
    const accordionActive = accordionItem.classList.contains('active');
    accordionActive ? accordionItem.classList.remove('active') : accordionItem.classList.add('active');
  })
))

//Rotação do carrossel dos projetos
document.querySelectorAll('.carousel__container').forEach(carousel => {
  const items = carousel.querySelectorAll('.carousel__item');
  const nextBtn = carousel.querySelector('.carousel__control-next');
  const prevBtn = carousel.querySelector('.carousel__control-prev');

  let currentIndex = 0;

  function showItem(index, direction) {
    items[currentIndex].classList.remove('active', 'slide-in-right', 'slide-in-left');

    currentIndex = (index + items.length) % items.length;

    if (direction === 'next') {
      items[currentIndex].classList.add('active', 'slide-in-right');
    } else {
      items[currentIndex].classList.add('active', 'slide-in-left');
    }
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      showItem(currentIndex + 1, 'next');
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      showItem(currentIndex - 1, 'prev');
    });
  }
});

const itemsList = document.querySelectorAll('.menu__item');
const sections = {
  home: document.getElementById('home'),
  projects: document.getElementById('projects'),
  about: document.getElementById('about'),
  contact: document.getElementById('contact')
};

// Trocar destaque da navbar
const observer = new IntersectionObserver((entries) => {
  entries.forEach(section => {
    const currentSection = section.target.id;
    const activeItem = document.querySelector(`[data-section="${currentSection}"]`);

    if (section.isIntersecting) {
      itemsList.forEach(item => item.classList.remove("menu-active"));
      
      if (activeItem) {
        activeItem.classList.add("menu-active");
      }
    } else {
      if (activeItem){
        activeItem.classList.remove("menu-active");
        itemsList.forEach(item => item.classList.remove("menu-active"));
      }
    }
  });
}, {
  threshold: 0.1
});

observer.observe(sections.home);
observer.observe(sections.projects);
observer.observe(sections.about);
observer.observe(sections.contact);













// const carouselItems = document.querySelectorAll('.technologies__item');

// carouselItems.forEach(techItem => {
//   const carouselContainer = carouselItems.parentElement;
  
//   techItem.addEventListener('click', () => {
//     techItem.classList.add('tech-active');
//     const modal = techItem.lastElementChild;
    
//     if (techItem.classList.contains('tech-active')){
//       modal.classList.add('show-modal');
//     }

//     modal.addEventListener('click', () => {
//       modal.classList.remove('show-modal');
//     })
//   });

// })