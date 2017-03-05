const gulp = require('gulp');
const path = require('path');
const rimraf = require('rimraf');
const child_process = require('child_process');
const webpack = require("webpack");
const webpackConfig = require("./webpack.config.js");
const WebpackDevServer = require("webpack-dev-server");

const $ = require('gulp-load-plugins')();

//-------------------------------
//server
//-------------------------------
gulp.task('server:clean', cb => {
  rimraf('./build', () => cb());
});

gulp.task('server:build',
    gulp.series(
        'server:clean',
        compileServer
    ));

gulp.task(
    'server:watch',
    gulp.series(
        'server:build',
        watchServer
    ));

gulp.task(
    'server:dev',
    gulp.series(
        'server:build',
        gulp.parallel(
            watchServer,
            runServer
        )
    ));

gulp.task(
    'server:test',
    gulp.series(
        'server:build',
        testServer
    ));

gulp.task(
    'server:test:dev',
    gulp.series(
        'server:build',
        gulp.parallel(
            watchServer,
            runServerTests
        )));

function compileServer() {
  return gulp.src('./src/server/**/*.js')
             .pipe($.changed('./build'))
             .pipe($.sourcemaps.init())
             .pipe($.babel())
             .pipe($.sourcemaps.write('.', {sourceRoot: path.join(__dirname, 'src', 'server')}))
             .pipe(gulp.dest('./build'));
}

function watchServer() {
  return gulp
      .watch('./src/server/**/*.js', gulp.series(compileServer))
      .on('error', () => {});
}

function runServer() {
  return $.nodemon({
    script: './server.js',
    watch: 'build',
    ignore: ['**/__tests'],
    exec: 'node --inspect'
  });
}

function testServer(cb) {
  child_process.exec('node ./tests.js', (err, stdout, stderr) => {
    console.log(stdout);
    console.error(stderr);

    if (err) {
      cb(new $.util.PluginError('testServer', 'Tests failed'));
    } else {
      cb();
    }
  });
}

function runServerTests() {
  return $.nodemon({
    script: './tests.js',
    watch: 'build'
  });
}

//-------------------------------
//client
//-------------------------------

const consoleStats = {
  colors: true,
  exclude: ["node_modules"],
  chunks: false,
  assets: true,
  timings: true,
  modules: false,
  hash: false,
  version: false
};

gulp.task("client:clean", cb => {
  rimraf("./public/build", () => cb());
});

gulp.task(
    "client:build",
    gulp.series(
        "client:clean",
        buildClient
    ));

gulp.task(
    "client:dev",
    gulp.series(
        "client:clean",
        watchClient
    ));

function buildClient(cb) {
  webpack(webpackConfig, (err, stats) => {
    if (err) {
      cb(err);
      return;
    }

    console.log(stats.toString(consoleStats));
    cb();
  });
}

function watchClient() {
  const compiler = webpack(webpackConfig);

  const server = new WebpackDevServer(compiler, {
    publicPath: "/build/",
    hot: true,
    stats: consoleStats
  });

  server.listen(8080, () => {});
}

// -----------------------------------
// Other Tasks
gulp.task("dev", gulp.parallel("server:dev", "client:dev"));
gulp.task("build", gulp.parallel("server:build", "client:build"));