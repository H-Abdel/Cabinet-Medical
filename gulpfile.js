var gulp				= require('gulp')
  , webpack				= require("gulp-webpack")
  , named				= require('vinyl-named')
  , eslint				= require('gulp-eslint')
  , ExtractTextPlugin	= require("extract-text-webpack-plugin")
  , uglify				= require('gulp-uglify')
  , filter				= require('gulp-filter')
  , autoprefixer		= require('gulp-autoprefixer')
  , cleanCSS 			= require('gulp-clean-css')
  , gzip				= require('gulp-gzip')
  , through				= require('through-gulp')
  , upath				= require("upath")
  ;

var webpackEntries	=	[ 'js/secretary.js']
var filesToLint 	=	[ 'js/**/*.js','serverCabinetMedical.js'];

var problemFiles	=	filesToLint.slice();
function appendProblemFiles(fName) {
	if(problemFiles.indexOf(fName) === -1) {
		problemFiles.push(fName);
	}
}
function removeProblemFiles(fName) {
	var pos = problemFiles.indexOf(fName)
	if(pos !== -1) {
		problemFiles.splice(problemFiles.indexOf(fName), 1);
	}
}

function listLinted() {
	return stream = through(function(file, encoding,callback) {
		this.push(file);
		if(file.eslint) {
			var fName = upath.normalizeSafe( file.cwd + '/' + file.eslint.filePath );
			var pos = problemFiles.indexOf(fName);
			if( file.eslint.errorCount || file.eslint.warningCount) {
				appendProblemFiles(fName);
			} else {
				removeProblemFiles(fName);
			}
		}
		callback();
		}, function(callback) {callback();});
}

function linterPipeline() {
	// console.log( "linterPipeline", problemFiles );
    return gulp	.src ( problemFiles		)
				.pipe( eslint() 		)
				.pipe( listLinted() 	)
				.pipe( eslint.format() 	)
				;
}

gulp.task('lint', function () {return linterPipeline();});

gulp.task('watch', ['lint'], function () {
	// console.log("Task lint")
	problemFiles.splice(0, filesToLint.length);
	gulp.watch( filesToLint, function(event) {
		var fName = upath.normalizeSafe( event.path );
		// console.log( event );
		if (event.type !== 'deleted') {
	  			appendProblemFiles(fName);
				return linterPipeline();
			}
  });
});


gulp.task("webpack", function(callback) {
	var wp =
	gulp.src( webpackEntries )
		.pipe( named() )
		.pipe( webpack({
			progress	: false,
			stats: {
				colors	: true ,
				modules	: false,
				reasons	: false
			},
			watch		: true,
			module		: {
				loaders: [
					{ test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/},
					{ test	: /\.css$/	, loader: ExtractTextPlugin.extract("style-loader", "css-loader")},
					{ test	: /\.html$/	, loader: 'raw-loader'},
                    			{ test: /\.(png|woff|jpg|jpeg|gif)$/, loader: 'url-loader?limit=100000' }
				]
			},
			plugins: [ new ExtractTextPlugin("[name].css")
					 ],
			failOnError	: false
    	}) ); /* End of pipe webpack */
   // Split CSS and JS process
   var css = wp.pipe( filter('*.css' ))
     , js  = wp.pipe( filter('*.js'  ));
	// CSS process
	css.pipe( autoprefixer() )
		// Split dev and dist
		css	.pipe( gulp.dest('dev') )
			.pipe( cleanCSS() )
			.pipe( gulp.dest('dist') )
			.pipe( gzip() )
			.pipe( gulp.dest('dist') );

	// JS process
	js	.pipe( gulp.dest('dev') )
		.pipe( uglify() )
		.pipe( gulp.dest('dist') )
		.pipe( gzip() )
		.pipe( gulp.dest('dist') );

	return wp;
});

;


gulp.task('default', ['webpack', 'watch'], function() {
	console.log("Done ???");
});



