<?php

$size = [20,30];

if(isset($_GET['x'])) $size[0] = (int)$_GET['x'];
if(isset($_GET['y'])) $size[1] = (int)$_GET['y'];

?>
<style>
    table {
        border: 0;
        margin: 50px auto 0;
    }    
    td {
        border: 1px solid transparent;
        text-align: center;
        margin: 0;
        height: 14px;
        width: 14px;
        font: normal 11px/15px Arial;
    }
    td.visited {
        border: 1px solid #666;
        background: #efefef;
    }
    td.candidate {
        background: #efefef;
    }
    td.noborder-left {
        border-left-color: #efefef;
    }
    td.noborder-right {
        border-right-color: #efefef;
    }
    td.noborder-top {
        border-top-color: #efefef;
    }
    td.noborder-bottom {
        border-bottom-color: #efefef;
    }
</style>
<table id="maze" cellpadding="0" cellspacing="0">
    <?php for($i = 0; $i < $size[1]; $i++):?>
    <tr>
        <?php for($j = 0; $j < $size[0]; $j++):?>
            <td data-x="<?php echo $j;?>" data-y="<?php echo $i;?>">
            </td>
        <?php endfor;?>
    <?php endfor;?>
    </tr>
</table>
<div id="status"></div>
<script src="./jquery.min.js"></script>
<script src="./maze.js"></script>
<script>
$(function(){
    maze.generate($('#maze'), <?php echo $j;?>, <?php echo $i;?>);
});
</script>