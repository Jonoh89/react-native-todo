const gulp = require('gulp');
const eslint = require('gulp-eslint');

const files = {
  javascript: ['*.js', 'src/**/*.js', 'src/**/*.jsx', 'test/**/*.js'],
};

gulp.task('eslint', () =>
  gulp.src(files.javascript)
    .pipe(eslint({ fix: true }))
    .pipe(eslint.format())
);

