<?php if ( ! defined('BASEPATH')) exit('El acceso directo a este archivo no esta permitido.');
/**
 * MVCClientes Aplicacion para facturacion de Clientes
 * @author     Hiber Tadeo Moreno Tovilla (icebergdelphi)
 * @version	   Version 3.0 
 */

/**
 * Controlador de inicio de la aplicacion
 * @name        inicio.php
 * @package		Inicio de la aplicacion
 * @subpackage  Controllers
 * @category    Controllers
 * @author      Hiber Tadeo Moreno Tovilla 
 * @version     Version 1.0
 * Creado      el : 18/Julio/2012
 */

class Inicio extends CI_Controller{
	
	public function __construct(){
		parent::__construct();

		/*-- Cargamos Funciones asistentes de CodeIgniter --*/
		$this->load->helper( array('html','url') );
			
	}
	
	/* Funcion por defecto del controlador actual */
	function index()
	{
	
		
		if($this->session->userdata('logged_in'))
		{
		  $session_data = $this->session->userdata('logged_in');
		  $data['username'] = $session_data['username'];
		  $this->load->view('header', $data);
		 
		}
		else
		{
		  //De los contrario si no hay session regresamos al Login
		  redirect('login', 'refresh');
		}
		
			
	}
	
	
		
	function logout()
   {
		$this->session->unset_userdata('logged_in');
		session_destroy();
		redirect('inicio');
		
   }
   
  
  //Building the menu..Creando el Menu
  function menuMain()
	{
	    $session_data = $this->session->userdata('logged_in');
		$data['username'] = $session_data['username'];
		$username=$session_data['username'];
		$this->db->select('permissions.Menu_id as menuId');
		$this->db->from('permissions');
		$this->db->join('users','permissions.Group_id=users.grupoId');
		$this->db->join('menu','permissions.Menu_id = menu.id');
		$this->db->where('users.username',$username);
		$resultdb  = $this->db->get();
		$folder = array();
		
		if($resultdb->num_rows()!=0){
			$in = '(';

			/* fetch associative array */
			foreach($resultdb->result_array() as $user){
				$in .=  $user['menuId'] . ",";
			}
			$in = substr($in, 0, -1).')' ;
					
			/* free result set */
			$resultdb->free_result(); 
				   
			$resultdb = $this->db->query("SELECT * FROM MENU WHERE parent_id IS NULL AND id in". $in);
						
			if ($resultdb->result_array()!=0) {
				foreach($resultdb->result_array() as $r){				    
					
					$sqlquery=$this->db->query("SELECT * FROM MENU WHERE parent_id=".$r['id']. " AND id in". $in);
					// check if have a child node
					if ($nodes = $sqlquery) {
					
						// determine number of rows result set
						$count = $nodes->num_rows();
										
						if ($count > 0){

							// if have a child
							$r['leaf'] = false;

							$r['items'] = array();

							foreach($nodes->result_array() as $item){
								$item['leaf'] = true;
								$r['items'][] = $item;
							}

						} else {
							// if have no child
							$r['leaf'] = true;
						}
						$folder[] = $r;
						
					}	

				}
			
			
			}
		
		}
		
		echo json_encode(array(
			"items" => $folder
		));	
	   
	
	}
	
}
?>