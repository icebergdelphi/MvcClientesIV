<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" dir="ltr" lang="es-ES">
<head>
	<title>Login</title>
	<META HTTP-EQUIV="Pragma" CONTENT="no-cache">
<link rel="stylesheet" type="text/css" href="<?=base_url()?>resources/css/login.css"/>
<link rel="stylesheet" type="text/css" href="<?=base_url()?>resources/css/colors-fresh.css"/>
<script>
if (history.forward(1)){location.replace(history.forward(1))}
</script> 
<script src="<?=base_url()?>resources/js/jsapi.js"></script>
	<script>google.load("jquery", "1");</script>
	<script src="<?=base_url()?>resources/js/jquery.ez-bg-resize.js" type="text/javascript" charset="utf-8"></script>
	<script>
		$(document).ready(function() {
			
			var BGImageArray =  ["bg.jpg","bg1.jpg","bg2.jpg","bg3.jpg","bg4.jpg","bg5.jpg","bg6.jpg","bg7.jpg","bg8.jpg","bg9.jpg","bg10.jpg","bg11.jpg","bg12.jpg","bg13.jpg","bg14.jpg","bg15.jpg","bg16.jpg"];
			var BGImage = BGImageArray[Math.floor(Math.random()*BGImageArray.length)]

			$("body").ezBgResize({
				img     : "<?=base_url()?>resources/image/" + BGImage, // Relative path example.  You could also use an absolute url (http://...).
				opacity : 1, // Opacity. 1 = 100%.  This is optional.
				center  : true // Boolean (true or false). This is optional. Default is true.
			});
		});
	</script>
</head>

<body class="login">

<div id="login">
<?php echo validation_errors(); ?>
<?php echo form_open('checklogin'); ?>
<form name="loginform" id="login_view" >
	<p>
		<label>Usuarios<br />
		<input type="text" name="username" id="username" class="input" value="" size="20" tabindex="10" /></label>
	</p>
	<p>
		<label>Password<br />
		<input type="password" name="password" id="password" class="input" value="" size="20" tabindex="20" /></label>

	</p>
	<p class="submit">
	  <input type="submit" name="wp-submit" id="wp-submit" value="Iniciar sesi&oacute;n" tabindex="100" />
		
       	<input type="hidden" name="testcookie" value="1" />
	</p>
</form>

<p id="nav">

</p>

</div>

</body>

</html>