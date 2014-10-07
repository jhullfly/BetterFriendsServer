'use strict';

function filePart(path) {
    var parts = path.split('/');
    return parts[parts.length-1];
}

function devicePath(res) {
    console.log(res.locals.parsedUA.os.family);
    if (res.locals.parsedUA.os.family === 'iOS') {
        return '/ios';
    } else if (res.locals.parsedUA.os.family === 'Android') {
        return '/android';
    } else {
        return '/default';
    }
}

/**
 * Module dependencies.
 */
exports.index = function(req, res) {
	res.render('index');
};

exports.platforms = function(req, res) {
    res.sendFile('/platforms' + devicePath(res)+'/'+filePart(req.path), {root : __dirname+'/..'});
};

