var controls = (function () {
	
	var rowList = [];
	
	var nestedGridList = [];
	
	var nestedRowList = [];
	
	var counterRows = -1;
	var counterRowsNested = -1;
	
	var nestedGrid = false;
	var header = false;
	
	var idIndexer = 0;
	
	
	function GridView(selector) {
		var selectedEl = document.querySelector("#" + selector);
		
		this.addHeader = function (input) {
			
			header = true;
			
			var params = input.split(',');
			
			var headerRow = new GridRow(params);
			
			if (nestedGrid == true) {
				nestedGridList[idIndexer].unshift(headerRow);
				
			} else {
				rowList.unshift(headerRow);
				nestedGridList.push(1);
			};
			
		}
		
		this.addRow = function (input) {
			
			if (!nestedGrid) {
				counterRows += 1;
			}
			
			
			
			var params = input.split(',');
			
			
			var row = new GridRow(params);
			
			if (nestedGrid == true) {
				counterRowsNested++;
				nestedGridList[idIndexer].push(row);
				return row;
			} else {
				
				rowList.push(row);
				nestedGridList.push(1);
				return row;
			};
			
		}
		
		this.render = function (selector) {
			
			
			
			while (selectedEl.firstChild) {
				selectedEl.removeChild(selectedEl.firstChild);
			}
			
			
			
			if (nestedGrid == true) {
				for (var i = 0; i < nestedGridList[idIndexer].length; i++) {
				
					selectedEl.appendChild(nestedGridList[idIndexer][i].render());
					
				}
			} else {
				for (var i = 0; i < rowList.length; i++) {
				
					selectedEl.appendChild(rowList[i].render());
					
				}
			};
			
		}
		
		
	}
	
	

	
	
	function GridRow(params) {
		
		this.params = params;
		this.idNumber = "row" + counterRows;
		this.idIndex = counterRows;
		
		this.render = function () {
			
			var rowHolder = document.createElement("div");
			if(nestedGrid != true) {
				if (header == true) {
					rowHolder.id = "header";
					header = false;
				} else {
					rowHolder.id = this.idNumber;
				}
			};
			rowHolder.className = "rowHolder";
			
			for (var i = 0; i < this.params.length; i+=1) {
				var cell = document.createElement("div");
				cell.innerHTML = this.params[i].toString();
				rowHolder.appendChild(cell);
			}
			
			return rowHolder;
		}
		
		this.getNestedGridView = function () {
			nestedGrid = true;
			nestedRowList = [];
			nestedGridList[this.idIndex] = nestedRowList;
			idIndexer = this.idIndex;
			
			var nestedHolder = document.createElement("div");
			nestedHolder.id = "nestedHolder" + this.idIndex;
			var holder = document.getElementById("nestedHolder");
			holder.appendChild(nestedHolder);
			counterRowsNested = 0;
			return new GridView("nestedHolder" + this.idIndex);
			
		}
		
		
		
	}
	
	
	function getGridView(selector) {
		return new GridView(selector);
	}
	
	function serializeGrid() {
		
		return rowList;
	}
	
	function serializeSubGrids() {
		
		return nestedGridList;
	}
	
	return {
		getGridView: getGridView,
		serializeGrid: serializeGrid,
		serializeSubGrids: serializeSubGrids
		
	}
	
}());
