<?php if ( ! defined('BASEPATH')) exit('El acceso directo a este archivo no esta permitido.');
/**
	 * MVCClientes Aplicacion para facturacion de Clientes
	 * 
	 * @author     Hiber Tadeo Moreno Tovilla (icebergdelphi)
	 * @version	   Version 3.0 
	 */

	/**
	 * Controlador de inicio de la aplicacion
	 * 
	 * @name        model_clientes.php
	 * @category    Models
	 * @author      Hiber Tadeo Moreno Tovilla 
	 * @version     Version 1.0
	 * Creado      el : 18/Julio/2012
	 */

class controller_clientes extends CI_Controller
{
	
	/**
	 * Funcion constructor del controlador
	 * 
	 * Los Constructores son utiles si necesitas colocar valores por defecto, o correr algun
     * proceso cuando la clase es instanciada. Los constructores no pueden retornar un valor,
     * pero pueden hacer algun trabajo por defecto.
	 */	
	public function __construct(){
		parent::__construct();

		/*-- Funciones asistentes  --*/
		$this->load->helper( array('html','url') );
		
		/*-- Carga de modelos --*/
		$this->load->model('model_clientes','',TRUE);
	}
	
	/* Funcion para obtener los datos de los clientes */
	function readClientes()
	{
		//La funcion ReadClientes se encuentra en el modelo Model_Clientes
		$resultado =$this->model_clientes->ReadClientes();
	}
	
	/* Funcion para actualizar los datos de los clientes */
	function insertClientes()
	{
		//La funcion InsertClientes se encuentra en el modelo Model_Clientes
		$resultado =$this->model_clientes->InsertClientes();
	}
	
	/* Funcion para actualizar los datos de los clientes */
	function updateClientes()
	{
		//La funcion UpdateClientes se encuentra en el modelo Model_Clientes
		$resultado =$this->model_clientes->UpdateClientes();
	}
	
	/* Funcion para actualizar los datos de los clientes */
	function deleteClientes()
	{
		//La funcion DeleteClientes se encuentra en el modelo Model_Clientes
		$resultado =$this->model_clientes->DeleteClientes();
	}
	
	
	
	

}

?>