// Головний JavaScript файл

// Лог при завантаженні
console.log('🚀 Gulp проєкт успішно завантажено!');

// Анімація прогрес-бару
document.addEventListener('DOMContentLoaded', () => {
  const progressBar = document.querySelector('.progress__bar');
  
  if (progressBar) {
    // Анімація від 0 до 100%
    progressBar.style.width = '0%';
    setTimeout(() => {
      progressBar.style.width = '100%';
    }, 300);
  }

  // Додавання інтерактивності до карток
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    card.addEventListener('click', () => {
      console.log('Клік по картці:', card.querySelector('.card__title').textContent);
    });
  });

  // Додавання плавної появи для елементів
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, {
    threshold: 0.1
  });

  // Застосування анімації до всіх карток та секцій
  document.querySelectorAll('.card, .features, .alert').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });

  // Виведення інформації про проєкт
  console.log(`
    ╔══════════════════════════════════════╗
    ║   Gulp Automation Project v1.0.0    ║
    ╠══════════════════════════════════════╣
    ║ ✓ SCSS Compilation                  ║
    ║ ✓ Auto-prefixer                     ║
    ║ ✓ CSS Minification                  ║
    ║ ✓ Browser-sync Live Reload          ║
    ║ ✓ Modern Development Workflow       ║
    ╚══════════════════════════════════════╝
  `);
});