const gulp = require("gulp");
const inlinesource = require("gulp-inline-source");

const $ = require("gulp-load-plugins")({
	rename: { "gulp-rev-delete-original": "revdel", "gulp-if": "if" },
});

gulp.task("inline-code", function() {
	return gulp
		.src("index.html")
		.pipe(inlinesource())
		.pipe(gulp.dest("dist/"));
});

gulp.task("copy", function() {
	return gulp
		.src(["src/{images,fonts}/**/*", "src/.htaccess"])
		.pipe(gulp.dest("dist"));
});

gulp.task("clean", function() {
	return gulp.src("dist/", { read: false }).pipe($.clean());
});

/* Minificação */
gulp.task("minify-js", function() {
	return gulp
		.src("src/**/*.js")
		.pipe(
			$.uglify().on("error", function(e) {
				console.log(e);
			}),
		)
		.pipe(gulp.dest("dist/"));
});

gulp.task("minify-css", function() {
	return gulp
		.src("src/**/*.css")
		.pipe($.cssnano({ safe: true }))
		.pipe(gulp.dest("dist/"));
});

gulp.task("minify-html", function() {
	return gulp
		.src("src/**/*.html")
		.pipe($.htmlmin({ collapseWhitespace: true }))
		.pipe(gulp.dest("dist/"));
});

/* Concatenação */
gulp.task("useref", function() {
	return gulp
		.src("src/*.html")
		.pipe($.useref())
		.pipe($.if("*.html", $.inlineSource()))
		.pipe($.if("*.html", $.htmlmin({ collapseWhitespace: true })))
		.pipe($.if("*.js", $.uglify()))
		.pipe($.if("*.css", $.cssnano({ safe: true })))
		.pipe(gulp.dest("dist"));
});

/* Imagens */
gulp.task("imagemin", function() {
	return gulp
		.src("src/images/*")
		.pipe(
			$.imagemin(
				{
					progressive: true,
					svgoPlugins: [{ removeViewBox: false }, { cleanupIDs: false }],
				},
				{
					verbose: true,
				},
			),
		)
		.pipe(gulp.dest("dist/images"));
});

/* Revisão de arquivos */
gulp.task("rev", function() {
	return gulp
		.src(["dist/**/*.{css,js,jpg,jpeg,png,svg}"])
		.pipe($.rev())
		.pipe($.revdel())
		.pipe(gulp.dest("dist/"))
		.pipe($.rev.manifest())
		.pipe(gulp.dest("dist/"));
});

gulp.task("revreplace", ["rev"], function() {
	return gulp
		.src(["dist/*.html", "dist/**/*.css"])
		.pipe(
			$.revReplace({
				manifest: gulp.src("dist/rev-manifest.json"),
				replaceInExtensions: [".html", ".js", ".css"],
			}),
		)
		.pipe(gulp.dest("dist/"));
});

gulp.task("minify", ["minify-js", "minify-css", "minify-html"]);

gulp.task(
	"build",
	$.sequence(
		["minify-js", "minify-css", "inline-code", "imagemin"],
		"useref",
		"revreplace",
	),
);

gulp.task("default", $.sequence("clean", "copy", "build"));
