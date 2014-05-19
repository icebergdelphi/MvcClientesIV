<?php  if ( ! defined('BASEPATH')) exit('El acceso directo a este archivo no esta permitido.');
/**
	 * MVCClientes Aplicacion para facturacion de Clientes
	 * @author     Hiber Tadeo Moreno Tovilla (icebergdelphi)
	 * @version	   Version 3.0 
	 */

	/**
	 * Controlador de inicio de la aplicacion
	 * @name        model_catalogos.php
	 * @category    Models
	 * @author      Hiber Tadeo Moreno Tovilla 
	 * @version     Version 1.0
	 * Creado      el : 18/Julio/2012
	 */
	 
class model_catalogos extends CI_Model{ 

	/* Funcion para leer Limite credito de la BD */
	function readLimiteCredito()
	{  	
	    $this->db->select('*');
		$this->db->from('catalogo_limite_credito');
	    $SqlRead  = $this->db->get();         

		foreach($SqlRead->result() as $row)
		{
			$arr[] = $row;
		}
		echo  json_encode($arr);
	} 
	


   
}	
?>