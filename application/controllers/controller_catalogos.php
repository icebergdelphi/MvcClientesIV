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
	 * @name        controller_catalogos.php
	 * @category    Models
	 * @author      Hiber Tadeo Moreno Tovilla 
	 * @version     Version 1.0
	 * Creado      el : 18/Julio/2012
	 */

class controller_catalogos extends CI_Controller
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
		$this->load->model('model_catalogos','',TRUE);
	}
	

	function readLimiteCredito()
	{
		
		$resultado =$this->model_catalogos->readLimiteCredito();
	}
	
	

}

?>