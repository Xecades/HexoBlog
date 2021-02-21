const gulp = require('gulp');
const fs = require('fs');
const webp = require('gulp-webp');
const rename = require('gulp-rename');
const ignore = require('gulp-ignore');
const imagemin = require('imagemin');
const imageminSvgo = require('imagemin-svgo');
const {
	extname
} = require('path');

function condition(f) {
	if (fs.existsSync(f.path + ".webp")) {
		console.log("[Exclude] " + f.path);
		return true;
	}
	console.log("[Generate] " + f.path);
	return false;
};

gulp.task('minify', () => (
	gulp.src('source/assets/*.svg')
	.pipe(imagemin([
		imageminSvgo({
			plugins: [{
				cleanupListOfValues: true
			}, {
				removeXMLNS: true
			}]
		})
	]))
	.pipe(gulp.dest('source/assets'))
));

gulp.task('default', () => (
	gulp.src('source/assets/*.{jpg,png,jpeg}')
	.pipe(ignore.exclude(condition))
	.pipe(rename(path => {
		path.extname += '.webp';
	}))
	.pipe(webp({
		quality: 100,
		preset: 'text',
		method: 6
	}))
	.pipe(gulp.dest('source/assets'))
));