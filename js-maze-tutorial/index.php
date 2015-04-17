<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Javascript Maze Tutorial</title>

        <link rel="stylesheet" type="text/css" href="./code/bootstrap.min.css" />
        <style>
        body {
            font-family: Arial, sans-serif;
            font-size: 16px;
            line-height: 25px;
        }
        </style>
        
        <link rel="stylesheet" href="http://highlightjs.org/static/styles/zenburn.css">
        <script src="http://highlightjs.org/static/highlight.pack.js"></script>
        <script>
          (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
          (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
          m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
          })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
          ga('create', 'UA-38006851-7', 'auto');
          ga('send', 'pageview');
        </script>
    </head>
    <body>

        <div class='container'>

            <h1>JavaScript Maze Tutorial</h1>

            <p>The result of the tutorial is a Javascript that will generate a random maze, in a 
                grid that is defined by user input.</p>

            <p>Pre-requirements:</p>
            <ul>
                <li>Beginner javascript knowledge</li>
            </ul>

            <h2>Part 1: setting up the workspace</h2>

            <p>After following these steps, you will have a html page that we can use to render
                the maze using javascript. <a href="./code/1/index.html" target="_blank">Click here for an example</a>.</p>

            <p>We will start by creating a html page, maze.html, with the following content:</p>

            <pre><code class="html"><?php echo htmlspecialchars(file_get_contents('code/1/index.html')); ?></code></pre>

            <p>As you can see, we include jQuery, we will use jQuery for selecting the table cells
                so that we can manipulate them. Twitter Bootstrap is there because I like it.</p>

            <p>The style.css contains basic styles for displaying the maze, it gives all the table
                cells a transparent border, and adds classes for use in the maze.</p>

            <h3>Starting conditions</h3>

            <p>Since we are dealing with a square maze in this tutorial, we need to know the dimensions
                of the maze that we are rendering, we will call them max_x, and max_y.</p>

            <p>Using this max_x and max_y, we can generate the grid so that we have a visual representation
                of the generation of the maze; the javascript is as follows:</p>

            <pre><code class="js"><?php echo htmlspecialchars(file_get_contents('code/1/maze.js')); ?></code></pre>
            
            <p>Later on, we will move this code to a function, so that we can reuse it.</p>
            
            <h3>Part 2: explaining the algorithm</h3>
            
            <p>How will this algorithm actually work? After following the first steps of this tutorial, you will 
            have an algorithm that:</p>
            
            <ol>
                <li>Picks a starting point
                <li>Finds the surrounding points of this point (neighbors)
                <li>Picks a random neighbor, that we did not already visit
                <li>Repeats step 2 and 3 until it cannot find any unvisited neighbors
            </ol>
            
            <hr/>
            
            <h4>2.0 General</h4>
            
            <p>To indicate a position on the grid, we define an object that looks as follows, since a point has an x and y value.</p>
            
            <pre><code class="js"><?php echo htmlspecialchars(file_get_contents('code/2.1/point.js')); ?></code></pre>
            
            <p>Since we will be generating many random integers, we will create a function for generating one.</p>
            
            <pre><code class="js"><?php echo htmlspecialchars(file_get_contents('code/2.1/rand.js')); ?></code></pre>
            
            <hr/>
            
            <h4>2.1 The starting point of the maze</h4>
            
            <p>We will start our maze, always on the left side of the x axis, and pick a random position on the y axis:</p>
            
            <pre><code class="js"><?php echo htmlspecialchars(file_get_contents('code/2.1/start.js')); ?></code></pre>
            
            <p>To update the class of this point, we create a function that gives us the <i>td</i> that
            corresponds to the given x and y value.</p>
            
            <pre><code class="js"><?php echo htmlspecialchars(file_get_contents('code/2.1/element.js')); ?></code></pre>
            
            <p>We do not want to come across this point again, so we create an object to store the points
            that we have visited, and create a function to insert the point into the visited object. We will also
            add a class to the td element, so you can see in the grid, that this point is visited.</p>

            <pre><code class="js"><?php echo htmlspecialchars(file_get_contents('code/2.1/visited.js')); ?></code></pre>

            <hr/>
            
            <h4>2.2 Continuing our path</h4>
            
            <p>Now that we have our starting point defined, it is time to find the next point on our grid
            to continue the path of the maze.</p>
            
            <p>This point can be any of the squares that are neighbors of the starting point, let's first
                find all possible neighbors.</p>
            
            <pre><code class="js"><?php echo htmlspecialchars(file_get_contents('code/2.1/next.js')); ?></code></pre>
            
            <p>Next, we will add the code to check if this neighbor has already been visited, since we do
            not want to include those in our options for picking the next point on the grid.</p>
            
            <pre><code class="js"><?php echo htmlspecialchars(file_get_contents('code/2.1/next-visited.js')); ?></code></pre>
            
            <p>Now that we have available neighbors, we randomly pick one:</p>
            
            <pre><code class="js"><?php echo htmlspecialchars(file_get_contents('code/2.1/pick-neighbor.js')); ?></code></pre>
            
            <p>Lastly, we mark this neighbor as visited.</p>
            
            <pre><code class="js"><?php echo htmlspecialchars(file_get_contents('code/2.1/pick-neighbor-visited.js')); ?></code></pre>
            
            <hr/>
            
            <h4>2.3. Lets review what we have so far:</h4>
            
            <ol>
                <li>We generate a grid, based on the max_x and max_y value
                <li>We pick a random starting point on the left of the grid
                <li>We mark this point as visited
                <li>We look for the neighbor points of the starting point
                <li>We make sure that these neighbors are not already visited
                <li>We pick a random neighbor
                <li>We mark this neighbor as visited
            </ol>
            
            <p><a href="code/2.1/index.html" target="_blank">Look at the example</a> to see what you should have right now.</p>
            
            <hr/>
            
            <h4>2.4 Continuing the path</h4>
            
            <p>Now that we have two connecting positions, we want the borders between them to be removed.</p>

            <p>If the position we are moving towards is on the right of the current position:</p>
            
            <ul>
                <li>Remove the border on the right side of the current position
                <li>Remove the border on the left side of the neighbor
            </ul>
            
            <pre><code class="js"><?php echo htmlspecialchars(file_get_contents('code/2.2/borders.js')); ?></code></pre>

            <p>To continue this path, we can repeat the step to find the neighbor, until we cannot find another one, like this: </p>
            
            <pre><code class="js"><?php echo htmlspecialchars(file_get_contents('code/2.2/continue.js')); ?></code></pre>
            
            <p><a href="code/2.2/index.html" target="_blank">Look at the example</a> to see what you should have right now.</p>
            
            <hr/>
            
            <h4>2.5. Our first optimization</h4>
            
            <p>If we have the following situation:<br/>The first point chosen is: 0, 5</p>

            <p>The available options are now:</p>

            <ul>
                <li>moving up: 0, 4
                <li>moving right: 1, 5
                <li>moving down: 0, 6
            </ul>

            <p>The thing that you might notice, is that the chance of moving
                vertically is 66%, while the chance of moving right, is only 33%!</p>

            <p>To make this an equal chance, we can update our code, that in the case that we have 3 options,
                we give the 1 option that has less chance, the same chance as the other 2.</p>

            <pre><code class="js"><?php echo htmlspecialchars(file_get_contents('code/2.3/chance.js')); ?></code></pre>
            
            <p><a href="code/2.3/index.html" target="_blank">Click here to see the example page</a> with 4 versions of the algorithm.</p>
            
            <ul>
                <li>Our original algorithm
                <li>50/50% chance of moving on the x or y axis
                <li>75/25% chance of moving on the x or y axis, the maze contains more horizontal lines
                <li>25/75% chance of moving on the x or y axis, the maze contains more vertical lines
            </ul>
            
            <hr/>

            <h3>Part 3: completing the algorithm</h3>
            
            <p>Now that we have an algorithm for generating a single random path, that stops 
at the moment that there are no unvisited neighbors available, we are going to make the next step.</p>

            <h4>3.1 Marking the potential neighbors</h4>

            <p>To continue the path, we have to select any neighbor that we previously found, but 
did not use, see the following example where once again the first point chosen is: 0, 5:</p>
            
            <ul>
                <li>moving up: 0, 4
                <li><strong>moving right: 1, 5 &lt;- this is the chosen neighbor</strong>
                <li>moving down: 0, 6
            </ul>

            <p>That gives us 2 remaining neighbors, which we will mark as "potential neighbors".</p>
            
            <pre><code class="js"><?php echo htmlspecialchars(file_get_contents('code/3.1/mark.js')); ?></code></pre>
            
            <p><a href="code/3.1/index.html" target="_blank">Click here to see the example page</a> where we highlight the potential neighbors.</p>
            
            <h4>3.2 Continuing the path</h4>

            <p>To continue our path, we have to follow the following steps:</p>

            <ol>
                <li>Pick a potential neighbor
                <li>Mark this neighbor as visited
                <li>Find the next point from here
            </ol>

            <pre><code class="js"><?php echo htmlspecialchars(file_get_contents('code/3.2/pick.js')); ?></code></pre>

            <p><a href="code/3.2/index.html" target="_blank">Click here to see the example page</a> where we pick a random potential neighbor and continue the path from there.</p>

            <p><small><strong>Note 1:</strong> to optimize the code, as soon as we visit a point, we will check if this point is marked as 
a potential neighbor, if so, we can remove it from this list, since we already visited it.</small></p>

            <p><small><strong>Note 2:</strong> an addition to the <i>markAsNeighbor</i> function has been made. We
 will also store the current point that this neighbor is picked from, so we can use this as a reference to remove the border.</small></p>

            <h4>3.3 Finalizing our maze</h4>

            <p>As you can see in the <a href="code/3.2/index.html" target="_blank">previous example</a>, our maze is fully rendered.</p>

            <p>You might notice that there is 1 thing missing... the starting and end point are not open!</p>

            <p>For creating the start point, we will pick a random position on the y axis, and remove the border on the left:</p>

            <pre><code class="js"><?php echo htmlspecialchars(file_get_contents('code/3.3/open.js')); ?></code></pre>
       
            <p>For creating the end point, we will pick a random position on the y axis, and remove the border on the right:</p>

            <pre><code class="js"><?php echo htmlspecialchars(file_get_contents('code/3.3/close.js')); ?></code></pre>

            <h3>4. Further development</h3>

            <p>Just for fun, I have set up the same algorithm, with the other chance variations, so you can see 
what happens when the chance (as described in point 2.5) changes.</p>

            <ul>
                <li><a href="code/4/x.html" target="_blank">75/25% chance of moving on the x or y axis</a>
                <li><a href="code/4/y.html" target="_blank">25/75% chance of moving on the x or y axis</a>
                <li><a href="code/4/fun.html" target="_blank">putting an image in the center of maze</a>
            </ul>

            <script>
                hljs.configure({tabReplace: '    '});
                hljs.initHighlightingOnLoad();
            </script>

        </div>
    </body>
</html>