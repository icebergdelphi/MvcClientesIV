<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class CheckLogin extends CI_Controller {

  function __construct()
  {
    parent::__construct();
    $this->load->model('user','',TRUE);
	$this->load->helper('url');
	
  }

  function index()
  {
    //This method will have the credentials validation
	//Para Validar campo tipo Email,password,etc. Establecemos reglas
    $this->load->library('form_validation');

    $this->form_validation->set_rules('username', 'Username', 'trim|required|xss_clean');
    $this->form_validation->set_rules('password', 'Password', 'trim|required|xss_clean|callback_check_database');
	//$this->form_validation->set_rules('email_address', 'Email Address', 'valid_email|required');
   // $this->form_validation->set_rules('password', 'Password', 'required|min_length[4]');
	
    if($this->form_validation->run() == FALSE)
    {
      //Si la validacion fallo, Cargamos la Pantalla de Login
      $this->load->view('login_view');
    }
    else
    {
      //De lo contrario se carga la sesion y se abre el escritorio de trabajo Extjs
      redirect('inicio', 'refresh');//antes era home
    }
    
  }
  
  function check_database($password)
  {
    //Field validation succeeded.  Validate against database
    $username = $this->input->post('username');
    
    //query the database
    $result = $this->user->login($username, $password);
    
    if($result)
    {
      $sess_array = array();
      foreach($result as $row)
      {
        $sess_array = array(
          'id' => $row->id,
          'username' => $row->username
        );
        $this->session->set_userdata('logged_in', $sess_array);
      }
	 
      return TRUE;
    }
    else
    {
      $this->form_validation->set_message('check_database', 'Usuario o Password Invalido');
      return false;
    }
  }
  
}
?>