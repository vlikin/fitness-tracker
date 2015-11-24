var base_dir = __dirname;
var app = require('app');

require('electron-debug')({
    showDevTools: true
});

var BrowserWindow = require('browser-window');
app.on('ready', function(){
  var mainWindow = new BrowserWindow({
    width: 800,
    height: 600
  });
  mainWindow.loadUrl('file://' + __dirname + '/build/html/index.html')
});
