var gridController = (function () {
	
	var dataBase = [];
	
	
	// IMAGE GALLERY ------------------------------------------------------
	
	
	function ImageGallery(container) {
		this.container = container;
		this.images = [];
		this.albums = [];
		this.holder = document.querySelector('#' + this.container);
		this.counter;
	};
	
	ImageGallery.prototype = {
		
		addImage: function (title, source) {
			
			var img = new Image(title, source)
			this.images.push(img);
			return img;
		},
		
		addAlbum: function (title) {
			
			var album = new Album(title);
			this.albums.push(album);
			return album;
		},
		
		addEvListener: function () {
			
			var self = this;
			
			if (self.counter == 1) {
				return;
			}
			
			function sort(target) {
				
				var items = target.childNodes;
				var itemsArr = [];
				for (var i in items) {
					if (items[i].nodeType == 1) { 
						itemsArr.push(items[i]);
					}
				}

				itemsArr.sort(function(a, b) {
				  return a.innerHTML == b.innerHTML
						  ? 0
						  : (a.innerHTML > b.innerHTML ? 1 : -1);
				});

				for (i = 0; i < itemsArr.length; ++i) {
				  target.appendChild(itemsArr[i]);
				}
			}
			
			
			self.holder.addEventListener("click", function (ev) {
				
				
				var target = ev.target;
				
				ev.stopPropagation();
				ev.preventDefault();
				
				if (!(target instanceof HTMLHeadingElement) && !(target instanceof HTMLImageElement) ) {
					return;
				}
				
				if (target instanceof HTMLImageElement) {
					console.log(target);
					var src = target.getAttribute("src");
					var img = document.createElement("img");
					img.setAttribute("src", src);
					img.setAttribute("style", "display: block; width: 80px; height: 80px" );
					
					var elem = document.querySelector('#focusImg');
					while (elem.firstChild) {
					  elem.removeChild(elem.firstChild);
					}
					elem.appendChild(img);
				}
				
				if (target instanceof HTMLButtonElement) {
					sort(target.previousElementSibling);
				}
				
				
				
				var imgs = target.nextElementSibling;
				
				if (!imgs) {
					return;
				}
				
				if (!(imgs.hasAttribute('style')) || !(imgs.style.display == "none")) {
					imgs.style.display = "none";
				} else {
					imgs.style = "";
				}
								
				}, false
			)
			
		},
		
		
		build: function () {
			
			if (self.counter != 1) {
				this.addEvListener();
				self.counter = 1;
			}
						
			this.holder.innerHTML = '<ul id="gridViewImages"></ul><ul id="gridViewAlbums"></ul><div id="focusImg"></div>'
			
			var gridImg =  document.querySelector("#gridViewImages");
			var gridAlb =  document.querySelector("#gridViewAlbums");
			
			var fragImgs = "";
			var fragAlbs = "";
			
			var lenI = this.images.length;
			var lenA = this.albums.length;
			var i;
			var j;
			
			for ( i = 0; i < lenI; i++) {
				
				fragImgs += this.images[i]["elementHTML"];
			}
			
			gridImg.innerHTML = fragImgs;
			
			for (var j = 0; j < lenA; j++) {
			
				fragAlbs += this.albums[j].build();
			}
			
			gridAlb.innerHTML = fragAlbs;
			
			
		},
		
		getImageGalleryData: function () {
			var data = [];
			data.push(this.images);
			data.push(this.albums);
			return data;
		}
		
		
		
		
		
	}
	
	
	// IMAGE ---------------------------------------
	
	
	function Image(title, source) {
		this.title = title;
		this.source = source;
		this.elementHTML = '<li class="images"><h4>'
				+ this.title
				+ '</h4><img src="'
				+ this.source
				+ '"></li>'
	}
	
	Image.prototype = {
		
		build: function () {
			
			
		}
	
	}
	
	
	// ALBUM(inherits from image gallery)------------------------------------------
	
	function Album(title) {
		ImageGallery.call(this);
		this.title = title;
		this.elementHTML = "";
	}
	
	
	
	Album.prototype = new ImageGallery();
	Album.prototype.constructor = Album;
	
	Album.prototype.build = function () {
		
		var imgFragment = "";
		var albFragment = "";
		
		if (this.images.length != 0) {
			
			for (var i = 0; i < this.images.length; i++) {
				imgFragment += this.images[i].elementHTML;
			}
		}
		
		this.elementHTML = '<div class="albums"><h3>' + this.title 
		+ '</h3><ul class="albumImages">' + imgFragment + '</ul>'
		
		if (this.albums.length != 0) {
			
			
			for (var j = 0; j < this.albums.length; j++) {
			
				albFragment += this.albums[j].build();
			}
			
		}
		
		this.elementHTML += albFragment + '</div><button class="sort">sort</button>';
		return this.elementHTML;
		
		
	}
	
	
	// IMAGE_GALLERY_REPOSITORY--------------------------------------------------
	
	
	function ImageGalleryRepository (repositoryName, data) {
		this.repositoryName = repositoryName;
		this.data = data;
	}
	
	ImageGalleryRepository.prototype = {
		
		save: function (repositoryName, data) {
			this.repositoryName = repositoryName;
			this.data = data;
			localStorage.setObject(repositoryName, data);
			
		},
		
		load: function (repositoryName) {
			var data = localStorage.getObject(repositoryName);
			return data;
		}
		
		
		
	}
	
	
	
	
	
	
	// OBJECT CREATION---------------------------------------
	
	function getImageGallery(container) {
		
		var gal = new ImageGallery(container);
		return gal;
		
	}
	
	function getImage(title, source) {
		var img = new Image(title, source);
		return img;
	}
	
	function getAlbum(title) {
		var alb = new Album(title);
		return alb;
	}
	
	function createRepository() {
		var repo = new ImageGalleryRepository();
		return repo;
	}
	
	function buildImageGallery(container, data) {
		
		var gal = new ImageGallery(container);
		gal.images = data[0];
		gal.albums = data[1];
		
		return gal;
		
	}
	
	
	
	
	return {
		getImageGallery: getImageGallery,
		getImage: getImage,
		getAlbum: getAlbum,
		createRepository: createRepository,
		buildImageGallery: buildImageGallery
	
	}
	
	
}());