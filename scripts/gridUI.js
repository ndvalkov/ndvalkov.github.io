var ui = (function($) {
	
	
	
	function buildRow(row) {
		
		var html = '<div class="grid-row">'
		
		for (var i = 0; i < row.cellList.length; i++) {
			
			html += '<div class="grid-row-cell">' + row.cellList[i] + '</div>'
			
		}
		
		html += '</div>';
		
		return html;
	}
	
	function buildHeader(header) {
		
		var html = '<div class="grid-header">'
		
		for (var i = 0; i < header.cellList.length; i++) {
			
			html += '<div class="grid-header-cell">' + header.cellList[i] + '</div>'
			
		}
		
		html += '</div>';
		
		return html;
	}
	
	
	return {
		
		buildRow: buildRow,
		buildHeader: buildHeader
		
		
	}
	
	
}(jQuery));