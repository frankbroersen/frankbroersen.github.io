function getElement(x, y) {
    // find the element by using the jQuery data selector for the x and y value
    return maze_wrapper.find('[data-x="' + x + '"][data-y="' + y + '"]');
}