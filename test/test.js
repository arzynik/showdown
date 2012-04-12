#!/usr/local/bin/node

/**
 * markdown tests for showdown library
 *
 */

var
	fs = require('fs'),
	sd = require('../src/showdown.js'),
	testDir = 'MarkdownTest_1.0.3',
	reset = '\033[0m',
	bold = '\033[1;37m',
	red = '\033[1;31m',
	green  = '\033[1;32m';

var	readfile = function(file) {
	fs.readFile(testDir + '/Tests/' + file, 'ascii', function(err, data) {
		if (err) {
			console.error(red + "Could not open file: %s" + reset, err);
			process.exit(1);
		}
		return data;
	});
}

var showdown = new sd.Showdown.converter({
	'github_flavouring': true,
	'tables': true
});

fs.readdir(testDir + '/Tests/',function(err, files){
	if (err) throw err;

	files.forEach(function(file) {
		if (file.indexOf('.html') > -1 || file.indexOf('.') === 0) return;

		var filename = file.replace('.text','');

		fs.readFile(testDir + '/Tests/' + filename + '.text', 'ascii', function(err, data) {
			if (err) {
				console.error(red + "Could not open file: %s" + reset, err);
				process.exit(1);
			}
			var text = data;
			
			fs.readFile(testDir + '/Tests/' + filename + '.html', 'ascii', function(err, data) {
				if (err) {
					console.error(red + "Could not open file: %s" + reset, err);
					process.exit(1);
				}
				var
					html = data,
					chars = '',
					result = showdown.makeHtml(text) + "\n";

				for (x=0;x<=90 - filename.length;x++) {
					chars += ' ';
				}

				if (result == html) {
					console.log(filename + chars + '[' + green + ' YES ' + reset + ']');
				} else {
/*
console.log(green + html);
console.log(red + result);

console.log(reset);
process.exit(1);
*/
					console.log(bold + filename + reset + chars +  '[' + red + ' NO  ' + reset + ']');		
				}
	
			});
		});
		
	});
});

