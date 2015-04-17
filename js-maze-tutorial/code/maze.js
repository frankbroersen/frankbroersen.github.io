
/**
 * Render the maze wrapper, returns the html of the maze
 * @param {Int} max_x
 * @param {Int} max_y
 * @returns {String} the maze html
 */
function renderMazeWrapper(max_x, max_y) { 
    var html = '<table class="table"><tbody>';
    for(var y = 0; y < max_y; y++) {
        html += '<tr>';
        for(var x = 0; x < max_x; x++) {
            html += '<td data-x="' + x + '" data-y="' + y + '"></td>';
        }
        html += '</tr>';
    }
    html += '</tbody></table>';
    return html;
}