var gridController = (function($) {
		
	// ----------------------------------------
	
	var Grid = {
		
		init: function(selector) {
			
			this.selector = selector;
			this.container = $(selector);
			this.header = [];
			this.rows = [];
			this.addEventHandlers();
		},
		
		addHeader: function(header) {
			
			if (this.header.length) {
				alert("This grid view already has a header");
				return;
			}
			
			var hdr = Object.create(Header);
			hdr.init(header);
			this.header.push(hdr);
			return hdr;
		},
		
		addRow: function(row) {
			
			var rw = Object.create(Row);
			rw.init(row);
			this.rows.push(rw);
			return rw;
			
		},
		
		buildGrid: function(selector) {
			
			var html = '<section class="main-grid-view">';
			var i;
			
			if (selector) {
				// use new selector for the nested grids
				this.container = $(selector);
			}
			
			if (this.header.length) {
				html += ui.buildHeader(this.header[0]);
			}
			
			
			for (i = 0; i < this.rows.length; i++) {
				html += ui.buildRow(this.rows[i]) + '<section class="nested-grid-view"' +
				'id="row-' + i + '" style="display:none"></section>';
			}
			
			html += '</section>';
			
			this.container.html(html);
			
			for (i = 0; i < this.rows.length; i++) {
				
				if (this.rows[i].nestedGrid) {
					
					// for the reconstruction from local storage, recovers the buildGrid method
					
					if (!(this.rows[i].nestedGrid.buildGrid)) {
						this.rows[i].nestedGrid.buildGrid = this.buildGrid;
						
					}
					
					//---
					
					// 'circular reference error' is probably here
					this.rows[i].nestedGrid.buildGrid("#row-" + i);
				}
			}
			
			// (fix)removes duplicate id's
			
			$(".nested-grid-view section").removeAttr("id");
			
		},
		
		getGridViewData: function() {
			var data = [];
			data.push(this.header);
			data.push(this.rows);
			return data;
		},
		
		
		addEventHandlers: function() {
			
			var self = this;
			
			
			this.container.on("click", function(ev) {
				
				var el = $(ev.target).parent().next();
				var el2 = $(ev.target);
				console.log(el2);
				
				
				if (!(el.hasClass("nested-grid-view"))) {
					return;
				}
				
				
				if ((el.css("display") == "none") || (el.css("display") == "")) {
					el.show();
				} else {
					el.hide();
				}
				
				if (el2.hasClass("grid-header-cell")) {
					
				}
				
				
				
				
			})
			
			
			
		}
		
		
		
		 
		
		
		
	
	}
	
	// ------------------------------------
	// --partially refactored, trying to fix 'circular reference error'----
	function getNestedGrid() {
		
		var ngrid = Object.create(Grid);
		ngrid.init();
		
		return ngrid;
	}
	// --
	
	var Row = {
		
		init: function(cells) {
			
			var lst = cells.htmlEscape();
			lst = cells.split(", ");
			this.cellList = lst;
			this.nestedGrid;
		},
		
		getNestedGrid: function() {
			
			if (this.nestedGrid) {
				alert("This row already has a subgrid");
				return;
			}
			this.nestedGrid = getNestedGrid();
			return this.nestedGrid;
		}
		
	}
	
	// ------------------------------------
	
	var Header = Row.extend({
	
		init: function(cells) {
			Row.init.apply(this, arguments);
		}
		
		
	
	});
	
	
	// -------------------------------------------
	
	
	var SchoolsRepository = {
		
		init: function(repository) {
			this.repository = repository;
		},
		
		save: function(data) {
			var dt = JSON.stringify(data);
			
			localStorage.setItem(this.repository, dt);
		},
		
		load: function(repo) {
			if (repo) {
				return JSON.parse(localStorage.getItem(repo));
			} else {
				return JSON.parse(localStorage.getItem(this.repository));
			}
		}
		
	}
	
	
	function getGridView(selector) {
		
		var grd = Object.create(Grid);
		grd.init(selector);
		return grd;
		
	}
	
	function getSchoolsRepository(repository) {
		var repo = Object.create(SchoolsRepository);
		repo.init(repository);
		return repo
	}
	
	function buildGridView(selector, data) {
		
		var grid = Object.create(Grid);
		grid.init(selector);
		
		grid.header = data[0];
		grid.rows = data[1];
		
		return grid;
	}
	
	
	
	
	return {
		
		getGridView: getGridView,
		getSchoolsRepository: getSchoolsRepository,
		buildGridView: buildGridView
	}
	
	
}(jQuery));
