// package
// npm i -D del gulp-sass gulp-notify gulp-plumber gulp-sourcemaps gulp-changed gulp-postcss autoprefixer css-mqpacker gulp-imagemin imagemin-mozjpeg imagemin-pngquant next-transpile-modules
const del = require('del');
const gulp = require('gulp');
var webp = require('gulp-webp');
var rename = require("gulp-rename");
const sass = require('gulp-sass')(require('sass'));
// var sass = require('gulp-sass')(require('sass'));
const notify = require('gulp-notify');
const plumber = require('gulp-plumber');
// const sourcemaps = require('gulp-sourcemaps');
const changed = require('gulp-changed');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const mqpacker = require('css-mqpacker');
const imagemin = require('gulp-imagemin');
const mozjpeg = require('imagemin-mozjpeg');
const pngquant = require('imagemin-pngquant');
// var cache      = require('gulp-cached');
// const imagemin = require('imagemin');
// import imagemin from 'imagemin'
// import mozjpeg from 'imagemin-mozjpeg'
// import pngquant from 'imagemin-pngquant'
// const browserSync = import('browser-sync').create();


// origin path
const originPath = 'assets/';

// path
const cssDir = originPath + 'css';
const scssDir = originPath + 'scss';
const imgDir =  originPath + '_img';
const compImgDir =  originPath + 'img/';
const cssFile =  originPath + 'css/**/*.css';
const scssFile =  originPath + 'scss/**/*.scss';


// styleCompile
const styleCompile = () => {
  return gulp
    .src(scssFile)
    // .pipe(sourcemaps.init())
    .pipe(changed(cssDir))
    // .pipe(cache('sass'))
    .pipe(
      plumber({
        errorHandler: notify.onError('<%= error.message %>'),
      }),
    )
    .pipe(
      sass({
        outputStyle: 'compressed',
        // outputStyle: 'expanded',
      }),
    )
    // .pipe(sourcemaps.write())
    .pipe(
      postcss([
        autoprefixer({
          cascade: false,
        })
      ])
    )
    .pipe(gulp.dest(cssDir));
}

// styleOrganize
const styleOrganize = () => {
  return gulp
    .src(cssFile)
    .pipe(
      postcss([
        mqpacker()
      ])
    )
    .pipe(gulp.dest(cssDir));
}

// syncDel
const syncDel = (path, file) => {
  if(file === 'scss') {
    del([
      path.replace(scssDir + '/', cssDir + '/').replace('.scss', '.css')
    ]);
  } else if(file === 'img') {
    del([
      path.replace(imgDir + '/', compImgDir + '/')
    ]);
  }
}


// imageCompress
const imageCompress = () => {
  return gulp
    .src(imgDir + '/**/*.{jpg,jpeg,png,gif,svg}')
    .pipe(changed(compImgDir))
    .pipe(
      imagemin([
        pngquant({
          quality: [ 0.65, 0.8 ],
          speed: 1
        }),
        mozjpeg({
          quality: 80
        }),
        imagemin.gifsicle({
          interlaced: false
        }),
        imagemin.svgo({
          plugins: [
            { removeViewBox: true },
            { cleanupIDs: false }
          ]
        }),
      ])
    )
    .pipe(gulp.dest(compImgDir));
}


// webpCompress
const webpCompress = () => {
	return gulp
		.src(imgDir + '/**/*.{png,jpg,jpeg}')
		.pipe(rename(function (path) {
			path.basename += path.extname;
		}))
		.pipe(webp())
		.pipe(gulp.dest(compImgDir + '/webp'));
}

// Browser Sync
const taskServer = () =>
  browserSync.init({
    server: {
            //ルートディレクトリの指定
      baseDir: '.',
      index: "index.html",
    }
    
  });

const reload = (done) =>  {
  browserSync.reload();
  done();
}

// taskWatch
// const taskWatch = (cb) => {
//   gulp.watch(scssFile, styleCompile);
//   gulp.watch(scssFile, styleOrganize);
//   gulp.watch(scssFile).on('unlink', (path) => syncDel(path, 'scss'));
//   console.log(scssFile);
//   gulp.watch(imgDir, imageCompress);
//   gulp.watch(imgDir, webpCompress);
//   // gulp.watch("./**/*.html", reload);
//   // gulp.watch("./**/*.css", reload);
//   gulp.watch(imgDir).on('all', (event, path) => {
//     if(event === 'unlink' || event === 'unlinkDir') {
//       syncDel(path, 'img');
//     }
//   });
//   cb();
// }

const taskWatch = (cb) => {
  gulp.watch(scssFile, styleCompile);
  gulp.watch(imgDir, imageCompress);
  gulp.watch(imgDir, webpCompress);
  gulp.watch(scssFile).on('unlink', (path) => syncDel(path, 'scss'));
  gulp.watch(imgDir).on('all', (event, path) => {
    if(event === 'unlink' || event === 'unlinkDir') {
      syncDel(path, 'img');
    }
  });
  cb();
}


const mediaStyleCompile = () => {
  return gulp
    .src('media/' + scssFile)
    // .pipe(sourcemaps.init())
    .pipe(changed('media/' + cssDir))
    // .pipe(cache('sass'))
    .pipe(
      plumber({
        errorHandler: notify.onError('<%= error.message %>'),
      }),
    )
    .pipe(
      sass({
        outputStyle: 'compressed',
        // outputStyle: 'expanded',
      }),
    )
    // .pipe(sourcemaps.write())
    .pipe(
      postcss([
        autoprefixer({
          cascade: false,
        })
      ])
    )
    .pipe(gulp.dest('media/' + cssDir));
}

const mediaImageCompress = () => {
  return gulp
    .src('media' + imgDir + '/**/*.{jpg,jpeg,png,gif,svg}')
    .pipe(changed('media' + compImgDir))
    .pipe(
      imagemin([
        pngquant({
          quality: [ 0.65, 0.8 ],
          speed: 1
        }),
        mozjpeg({
          quality: 80
        }),
        imagemin.gifsicle({
          interlaced: false
        }),
        imagemin.svgo({
          plugins: [
            { removeViewBox: true },
            { cleanupIDs: false }
          ]
        }),
      ])
    )
    .pipe(gulp.dest('media' + compImgDir));
}

const mediaTaskWatch = (cb) => {
  gulp.watch('media/' + scssFile, mediaStyleCompile);
  gulp.watch('media/' + imgDir, mediaImageCompress);
  gulp.watch('media/' + scssFile).on('unlink', (path) => syncDel(path, 'scss'));
  gulp.watch('media/' + imgDir).on('all', (event, path) => {
    if(event === 'unlink' || event === 'unlinkDir') {
      syncDel(path, 'img');
    }
  });
  cb();
}

// exports
exports.default = gulp.series(styleCompile, taskWatch);
exports.css = styleOrganize;
exports.media = gulp.series(mediaStyleCompile, mediaTaskWatch);