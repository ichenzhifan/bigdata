var gulp = require('gulp');
var os = require('os');
var plumber = require('gulp-plumber')
var del = require('del');
var browserify = require('browserify');
var babelify = require('babelify');
var watchify = require('watchify');
var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var open = require('gulp-open');
var gulpSequence = require('gulp-sequence');
var jade = require('gulp-jade');
var less = require('gulp-less');
var autoprefixer = require('gulp-autoprefixer');
var cssmin = require('gulp-minify-css');
var concat = require('gulp-concat');
var htmlmin = require('gulp-htmlmin');
var replace = require('gulp-replace');
var ngtemplates = require('gulp-angular-templatecache');
var ngAnnotate = require('gulp-ng-annotate');
var imagemin = require('gulp-imagemin');
var usemin = require('gulp-usemin');
var uglify = require('gulp-uglify');
var rev = require('gulp-rev');
var through = require('through2');
var fs = require('fs');
var babel = require('gulp-babel');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
//var Server = require('karma').Server;


var env = process.env.NODE_ENV || "development";
// env = "production";
var agent = process.env.agent || "yg";
var config = {
	app: "MobileCMSApp",
	src: "app",
  test:"test",
	dist: "dist",
	env: env,
	tmp: ".tmp",
	liveloadPort: 9001,
	entries: "app.js",
	agent: agent
};


/**
 * Run test once and exit
 */
gulp.task('test', function (done) {
  new Server({
    configFile: __dirname + '/karma.config.js',
    singleRun: false
  }, done).start();
});

// 清除临时目录
gulp.task('clean:dev', function() {
	return del(config.tmp)
});
// 清除临时目录和dist目录
gulp.task('clean:dist', function() {
	var dir = [config.tmp, config.dist];
	var options = {dot: true};
	return del(dir, options);
});

// 热启动工具。浏览器同步
gulp.task('browserSync', function() {
	var options = {
		port: config.liveloadPort,
		open: false,
		server: {
			baseDir: [config.src, config.tmp]
		}
	}
	browserSync.init(options);
});

// 自动打开浏览器
var browser = os.platform() === 'linux' ? 'google-chrome' : (
  os.platform() === 'darwin' ? 'google chrome' : (
  os.platform() === 'win32' ? 'chrome' : 'firefox'));
gulp.task('open', function() {
	var options = {
		app: browser,
		uri: "http://localhost:" + config.liveloadPort
	};
	return gulp.src("")
		.pipe(open(options));
});

gulp.task('toES5',function(){
  return gulp.src(config.test+'/src/**/*.js')
  .pipe(babel({presets:['es2015']}))
  .pipe(gulp.dest(config.test+'/spec'))
})

gulp.task('test:watch', function() {
  var src = config.test + "/src/**/*.js";
  gulp.watch(src, ['toES5']);
});

// Input file.
var entries = config.src + "/scripts/" + config.entries;
gulp.task('browserify', function() {
	watchify.args.debug = true;
	var bundler = watchify(browserify({entries: entries, debug: true}));
	// Babel transform
	bundler.transform(babelify);
	
	// 开发时使用
	function bundle() {
		return bundler.bundle()
			.on("error", function(err){
				console.log(err.message);
				browserSync.notify("Browserify Error!");
				this.emit("end");
			})
      .pipe(plumber())
			.pipe(source("bundle.js"))
			.pipe(buffer())
			.pipe(sourcemaps.init({loadMaps: true}))
			.pipe(sourcemaps.write('.'))
			.pipe(gulp.dest(config.tmp + '/scripts'))
			.pipe(browserSync.stream({once: true}));
	}
	// On updates recompile
	bundler.on('update', bundle);
	return bundle();
});
gulp.task('browserify:dist', function() {
	// 部署时使用
	function bundleDist(params) {
		var b = browserify({
			entries: entries,
			extensions: ".js"
		})
		return b.transform(babelify, {presets: ["es2015"]})
			.bundle()
			.pipe(source("bundle.js"))
			.pipe(gulp.dest(config.tmp + "/scripts"))
	}
	return bundleDist();
});

// 整合所有js文件到dist目录
gulp.task('jsconcat', function() {
	return gulp.src(config.tmp + "/scripts/*.js")
		.pipe(concat('bundle.js'))
		.pipe(gulp.dest(config.tmp + "/scripts"))
});

// jade编译html
gulp.task('jade', function() {
	var src = config.src + "/**/*.jade";
	var dest = config.src;
	return gulp.src(src)
    .pipe(plumber())
		.pipe(jade({pretty: true}))
		.pipe(gulp.dest(dest));
});
// jade监控，重载整个页面
gulp.task('jadeWatch', ["jade"], reload);
gulp.task('jade:watch', function () {
	var src = config.src + "/**/*.jade";
	gulp.watch(src, ['jadeWatch']);
});

// html压缩 
gulp.task('htmlmin', function() {
	var htmlSrc = config.dist + "/**/*.html"
	return gulp.src(htmlSrc)
		.pipe(htmlmin({collapseWhitespace: true}))
		.pipe(gulp.dest(config.dist));
});

// less编译css，less监控，将最新的样式文件注入页面
gulp.task('less', function() {
	var src = config.src + "/styles/**/*.less";
	var dest = config.tmp + "/styles";
	return gulp.src(src)
    .pipe(plumber())
		.pipe(less())
		.pipe(autoprefixer())  // autofix浏览器兼容前缀
		.pipe(gulp.dest(dest))
		.pipe(reload({stream: true}));
});
gulp.task('less:watch', function() {
  var src = config.src + "/styles/**/*.less";
  gulp.watch(src, ['less']);
});

// css整合与压缩
gulp.task('css:dist', function() {
	return gulp.src(config.tmp + "/styles/**/*.css")
		.pipe(concat('main.css')) // 将所有css文件整合成一个文件
		.pipe(cssmin())  // 压缩css文件
		.pipe(gulp.dest(config.tmp + "/styles"));
});

// 拷贝文件
gulp.task('copy', function() {
	return gulp.src([
		"*.{ico,txt}",
    ".htaccess",
		"components/**/*",
    "views/**/*.html",
    "sound/**/*",
    "swf/**/*",
		// "styles/**/*.css",
		"fonts/*"
	], {
		cwd: config.src,
    dot: true,
    base: config.src
	})
		.pipe(gulp.dest(config.dist));
});

gulp.task('copydist', function() {
	return gulp.src([
		"*.{ico,txt}",
    ".htaccess",
    "views/**/*.html",
    "sound/**/*",
    "swf/**/*",
		// "styles/**/*.css",
		"fonts/*"
	], {
		cwd: config.src,
    dot: true,
    base: config.src
	})
		.pipe(gulp.dest(config.dist));
});

// 部署时替换config文件中的env和agent变量
gulp.task('replace', function() {
	var reg = /\{\n*(\s)*env:.*,\n*\s*agent:.*\s*\n*\}/;
  var replacement = "{env:'" + config.env + "',agent:'" + config.agent +"'}";
  return gulp.src(config.tmp + "/scripts/bundle.js")
  	.pipe(replace(reg, replacement))
  	.pipe(gulp.dest(config.tmp + "/scripts"));
});

// angular模板存储到缓存中，提高页面加载速度
gulp.task('ngtemplates', function() {
	var options = {
		module: config.app,
    root: "modules"
	};
  return gulp.src(config.src + "/modules/**/*.html")
  	.pipe(ngtemplates(options))
  	.pipe(gulp.dest(config.tmp + "/scripts"));
});

// 将注入方式改为注解方式注入，避免压缩js时破坏angular的变量注入
gulp.task('ngAnnotate', function() {
	return gulp.src("bundle.js", {
		cwd: config.tmp + "/scripts"
	})
		.pipe(ngAnnotate())
		.pipe(gulp.dest(config.tmp + "/scripts"));
});

// 图片压缩
gulp.task('imagemin', function() {
	return gulp.src(config.src + "/image/**/*.{png,jpg,jpeg,gif}")
  	// .pipe(imagemin())
  	.pipe(gulp.dest(config.dist + "/image"));
});

// js压缩，css压缩。文件名变更
gulp.task('usemin', function() {
	return gulp.src(config.src + "/index.html")
		.pipe(usemin({
			js: [uglify, rev],
			css: [cssmin, rev]
		}))
		.pipe(gulp.dest(config.dist))
});

var rmOrig = function() {
	return through.obj(function (file, enc, cb) {
		if (!file.revOrigPath) {
			return cb;
		}
		var that = this;
		fs.unlink(file.revOrigPath, function (err) {
			that.push(file)
			cb();
		});
	});
} 

gulp.task('rev', function() {
	return gulp.src([
    config.dist + "/image/**/*.{png,jpg,jpeg,gif,webp,svg}",
    config.dist + "/styles/fonts/**/*"
  ], {base: config.dist})
		.pipe(rev())
		.pipe(gulp.dest(config.dist))
		.pipe(rmOrig())
});

gulp.task('doc', [], function () {
  var gulpDocs = require('gulp-ngdocs');
  var options = {
    // scripts: [entries],
    // html5Mode: true,
    // startPage: '/',
    // title: "My Awesome Docs",
    // titleLink: "/"
    // scripts: [
    //   '../../app/components/angular/angular.min.js',
    //   '../../app/components/angular/angular.min.js.map',
    //   '../../app/components/angular-animate/angular-animate.min.js',
    //   '../../app/components/angular-animate/angular-animate.min.js.map'
    // ]
  }
  return gulp.src(config.src+'/modules/**/*.js')
    .pipe(gulpDocs.process(options))
    .pipe(gulp.dest('./doc'));
});

gulp.task('connect_ngdocs', function() {
var connect = require('gulp-connect');
  connect.server({
    root: 'doc',
    livereload: false,
    fallback: 'doc/index.html',
    port: 8083
  });
});

gulp.task('server', gulpSequence(
  "clean:dev",
	"browserSync",
  "browserify",
  "less",
  "less:watch",
	"jade",
	"jade:watch",
  "test:watch",
  "open"
));

gulp.task('build', gulpSequence(
	"clean:dist",
	"jade",
  "ngtemplates",
	"browserify:dist",
  "replace",
	"jsconcat",
  "ngAnnotate",
  "less",
  "imagemin",
  "copydist",
  "usemin",
  "htmlmin"
));

gulp.task('default', ['build']);
