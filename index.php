<?php 
require_once 'core/core.php';

$controller = isset($_GET['c']) ? $_GET['c'] : 'All';
$method = isset($_GET['m']) ? $_GET['m'] : 'index';

$controller=$controller.'Controller';
require_once 'controllers/'.$controller.'.php';

// call_user_func([$controller,$method]);
$objeto = new $controller();
$objeto->$method();