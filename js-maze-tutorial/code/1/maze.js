$(function() {
    
    // select the maze wrapper
    var maze_wrapper = $('#maze');
    
    // define the size of the maze
    var max_x = 30,
        max_y = 30;
        
    // open the table
    var html = '<table class="table">';
    
    // loop the rows
    for(var y = 0; y < max_y; y++) {
        
        // open the row
        html += '<tr>';
        
        // loop the columns
        for(var x = 0; x < max_x; x++) {
            // add the column, with data('x') and data('y') attributes, so later
            // on we can easily select them using jQuery 
            html += '<td data-x="' + x + '" data-y="' + y + '"></td>';
        }
        
        // close the row
        html += '</tr>';
    }
    
    // close the table
    html += '</table>';
    
    // insert the table into the maze element
    maze_wrapper.html(html);
    
});
