<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
<title>Acceso al Sistema</title>
<link rel="stylesheet" type="text/css" href="<?=base_url()?>resources/css/login-box.css"/>
</head>



<body>
  <body background="<?=base_url()?>resources/image/bg7.jpg" > 


    <div style="width:500px; margin:100px auto;">
			<div id="login-box">

			<H2>Acceso</H2>

			<?php echo validation_errors(); ?>
			<?php echo form_open('checklogin'); ?>


			<br />
			<br />
			<div id="login-box-name" style="margin-top:20px;">Usuario:</div><div id="login-box-field" style="margin-top:20px;"><input name="username" class="form-login" title="Username" value="" size="30" maxlength="2048" /></div>
			<div id="login-box-name">Password:</div><div id="login-box-field"><input name="password" type="password" class="form-login" title="Password" value="" size="30" maxlength="2048" /></div>
			<p class="submit">
				  <input type="submit" name="login-boton" id="login-boton"  tabindex="100" value='' />
						<input type="hidden" name="testcookie" value="1" />
				</p>
			<br />

			<br />
			<br />


</div>













</body>
</html>
