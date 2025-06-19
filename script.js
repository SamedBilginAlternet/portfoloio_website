const body = document.body;

const btnTheme = document.querySelector('.fa-moon');
const btnHamburger = document.querySelector('.fa-bars');

const addThemeClass = (bodyClass, btnClass) => {
  body.classList.add(bodyClass);
  btnTheme.classList.add(btnClass);
};

const getBodyTheme = localStorage.getItem('portfolio-theme');
const getBtnTheme = localStorage.getItem('portfolio-btn-theme');

addThemeClass(getBodyTheme, getBtnTheme);

const isDark = () => body.classList.contains('dark');

const setTheme = (bodyClass, btnClass) => {
  body.classList.remove(localStorage.getItem('portfolio-theme'));
  btnTheme.classList.remove(localStorage.getItem('portfolio-btn-theme'));

  addThemeClass(bodyClass, btnClass);

  localStorage.setItem('portfolio-theme', bodyClass);
  localStorage.setItem('portfolio-btn-theme', btnClass);
};

const toggleTheme = () =>
  isDark() ? setTheme('light', 'fa-moon') : setTheme('dark', 'fa-sun');

btnTheme.addEventListener('click', toggleTheme);

const displayList = () => {
  const navUl = document.querySelector('.nav__list');

  if (btnHamburger.classList.contains('fa-bars')) {
    btnHamburger.classList.remove('fa-bars');
    btnHamburger.classList.add('fa-times');
    navUl.classList.add('display-nav-list');
  } else {
    btnHamburger.classList.remove('fa-times');
    btnHamburger.classList.add('fa-bars');
    navUl.classList.remove('display-nav-list');
  }
};

btnHamburger.addEventListener('click', displayList);

const scrollUp = () => {
  const btnScrollTop = document.querySelector('.scroll-top');

  if (
    body.scrollTop > 500 ||
    document.documentElement.scrollTop > 500
  ) {
    btnScrollTop.style.display = 'block';
  } else {
    btnScrollTop.style.display = 'none';
  }
};

document.addEventListener('scroll', scrollUp);

// === Fancy Stars Background ===
const canvas = document.getElementById("stars");
if (canvas) {
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const stars = Array.from({ length: 200 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 1.5,
    vx: Math.random() * 0.5 - 0.25,
    vy: Math.random() * 0.5 - 0.25,
  }));

  const drawStars = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#fff";
    stars.forEach((star) => {
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      ctx.fill();
    });
  };

  const updateStars = () => {
    stars.forEach((star) => {
      star.x += star.vx;
      star.y += star.vy;

      if (star.x < 0 || star.x > canvas.width) star.vx *= -1;
      if (star.y < 0 || star.y > canvas.height) star.vy *= -1;
    });
  };

  const animateStars = () => {
    updateStars();
    drawStars();
    requestAnimationFrame(animateStars);
  };

  animateStars();
  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
}

// === Typewriter Effect ===
const typeWriterElement = document.querySelector(".about-hero__role");
if (typeWriterElement) {
  const texts = [
    "A Full Stack Developer.",
    "A .NET Enthusiast.",
    "A React.js Builder.",
    "An ERP Specialist."
  ];

  let index = 0;
  let charIndex = 0;
  let currentText = texts[index];

  const type = () => {
    if (charIndex < currentText.length) {
      typeWriterElement.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
      setTimeout(type, 100);
    } else {
      setTimeout(erase, 2000);
    }
  };

  const erase = () => {
    if (charIndex > 0) {
      typeWriterElement.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
      setTimeout(erase, 50);
    } else {
      index = (index + 1) % texts.length;
      currentText = texts[index];
      setTimeout(type, 1000);
    }
  };

  type();
}

// === 3D Tilt for Project Cards ===
const script = document.createElement('script');
script.src = "https://cdnjs.cloudflare.com/ajax/libs/vanilla-tilt/1.7.0/vanilla-tilt.min.js";
document.head.appendChild(script);

script.onload = () => {
  const cards = document.querySelectorAll(".project-card");
  if (cards.length) {
    VanillaTilt.init(cards, {
      max: 15,
      speed: 400,
      glare: true,
      "max-glare": 0.2,
    });
  }
};