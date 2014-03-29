var log = console.log;

var gallery = gridController.getImageGallery("gridHolder");


gallery.addImage('title1', 'http://placehold.it/40x40');
gallery.addImage('title2', 'http://placehold.it/40x40');

var album = gallery.addAlbum('title');
album.addImage('title1', 'http://placehold.it/40x40');
album.addImage('title2', 'http://placehold.it/40x40');
var nested1 = album.addAlbum('title3');
nested1.addImage('title1', 'http://placehold.it/40x40');
nested1.addImage('title2', 'http://placehold.it/40x40');

var album2 = gallery.addAlbum('titleAl');
album2.addImage('title1', 'http://placehold.it/40x40');
album2.addImage('title2', 'http://placehold.it/40x40');
var nestedAl = album2.addAlbum('title3');
nestedAl.addImage('title1', 'http://placehold.it/40x40');
nestedAl.addImage('title2', 'http://placehold.it/40x40');
nestedAl.addAlbum('title2');
nestedAl.addAlbum('album3')
var sea = nestedAl.addAlbum('SeaAlbum');
sea.addImage('title1', 'http://placehold.it/40x40');
sea.addImage('title1', 'http://placehold.it/40x40');
sea.addImage('title1', 'http://placehold.it/40x40');

nestedAl.addAlbum('OceanAlbum')

gallery.build('gridHolder');


nestedAl.addAlbum('title12');
nestedAl.addImage('title12', 'http://placehold.it/40x40')
gallery.build('gridHolder');
album2.addImage('title12', 'http://placehold.it/40x40')

gallery.build('gridHolder');

var repo = gridController.createRepository();
// repo.save("ddd", "sdasdasd");
// var dd = repo.load("ddd");

var dataGal = gallery.getImageGalleryData();
repo.save("ddd", dataGal);
var dd = repo.load("ddd");

var serGal = gridController.buildImageGallery("gridHolder1", dd);



log(serGal);



