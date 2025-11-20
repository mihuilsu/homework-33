const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');
const browserSync = require('browser-sync').create();
const del = require('del');

// Шляхи до файлів
const paths = {
  styles: {
    src: 'src/scss/**/*.scss',
    dest: 'dist/css/'
  },
  html: {
    src: 'src/*.html',
    dest: 'dist/'
  },
  js: {
    src: 'src/js/**/*.js',
    dest: 'dist/js/'
  }
};

// Очищення папки dist
function clean() {
  return del(['dist']);
}

// Компіляція SCSS в CSS з автопрефіксером
function styles() {
  return gulp.src(paths.styles.src)
    // Компіляція SCSS в CSS
    .pipe(sass({
      outputStyle: 'expanded'
    }).on('error', sass.logError))
    // Додавання вендорних префіксів
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 2 versions'],
      cascade: false
    }))
    // Збереження нормального CSS файлу
    .pipe(gulp.dest(paths.styles.dest))
    // Мінімізація CSS
    .pipe(cleanCSS({
      level: 2
    }))
    // Перейменування з суфіксом .min
    .pipe(rename({
      suffix: '.min'
    }))
    // Збереження мінімізованого файлу
    .pipe(gulp.dest(paths.styles.dest))
    // Оновлення браузера
    .pipe(browserSync.stream());
}

// Копіювання HTML файлів
function html() {
  return gulp.src(paths.html.src)
    .pipe(gulp.dest(paths.html.dest))
    .pipe(browserSync.stream());
}

// Копіювання JS файлів
function scripts() {
  return gulp.src(paths.js.src)
    .pipe(gulp.dest(paths.js.dest))
    .pipe(browserSync.stream());
}

// Запуск локального сервера з Browser-sync
function serve() {
  browserSync.init({
    server: {
      baseDir: './dist'
    },
    port: 3000,
    notify: false
  });

  // Відстеження змін у файлах
  gulp.watch(paths.styles.src, styles);
  gulp.watch(paths.html.src, html);
  gulp.watch(paths.js.src, scripts);
}

// Збірка проєкту
const build = gulp.series(
  clean,
  gulp.parallel(styles, html, scripts)
);

// Режим розробки
const dev = gulp.series(
  build,
  serve
);

// Експорт задач
exports.clean = clean;
exports.styles = styles;
exports.html = html;
exports.scripts = scripts;
exports.serve = serve;
exports.build = build;
exports.dev = dev;
exports.default = dev;