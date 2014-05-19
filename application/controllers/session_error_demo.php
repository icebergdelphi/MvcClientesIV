<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Session_error_demo extends CI_Controller {
	  function __construct() 
	{
	   parent::__construct();
		$this->load->helper('url');
		
		
		 
	}
	
	function inicializa()
	{
	   $this->load->model('user','',TRUE);
	   $this->session->set_userdata($user);
	   echo 'Session initialized.'; 
	}

	

	function reset() {
		$this->session->sess_destroy();
		echo 'Session reset.';
	}
	
	function keepAlive()
   {
		$this->load->library('session');
		$this->session->set_userdata(array('last_activity'=>time()));
		if(isset($this->session->userdata["Hi world"]))
          {		
			echo json_encode(array(
						"success"	=> true,
						"Respuesta"		=> "Alive"
					));
		  }
		  else
		  {
					echo json_encode(array(
						"success"	=> false,
						"Respuesta"	=> "EndedSession"
					));
		  } 
    }
}
?>