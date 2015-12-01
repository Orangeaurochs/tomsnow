

To use it, copy tomsnow_v2.js to a directory on your web-server, and add the following code to the head of any pages on which you would like snow:

    <script type="text/javascript" src="http://www.yourdomain.com/path/tomsnow_v2.js"></script>
    <script type="text/javascript">
    function init () {
      snow();
    }
    window.onload=init;
    </script>

