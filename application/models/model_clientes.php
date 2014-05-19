<?php  if ( ! defined('BASEPATH')) exit('El acceso directo a este archivo no esta permitido.');
/**
	 * MVCClientes Aplicacion para facturacion de Clientes
	 * @author     Hiber Tadeo Moreno Tovilla (icebergdelphi)
	 * @version	   Version 3.0 
	 */

	/**
	 * Controlador de inicio de la aplicacion
	 * @name        model_clientes.php
	 * @category    Models
	 * @author      Hiber Tadeo Moreno Tovilla 
	 * @version     Version 1.0
	 * Creado      el : 18/Julio/2012
	 */
	 
class model_clientes extends CI_Model{ 

	/* Funcion para leer clientes de la BD */
	function ReadClientes()
	{  	
	    // Si hubo una busqueda entonces...
	    if (isset($_POST['query'])){ //Esta parte de codigo nos sirve para hacer el filtro con el SeearchField
				$fields=$_POST['fields'];//Recibimos el  campo a filtrar
					switch ($fields) {
					  case 'Cliente': 	
						  $this->db->select('*');
						  $this->db->from('clientes');
						  $this->db->like('Cliente',$_POST['query']); 
						  $SqlRead  = $this->db->get();
					  break;
					case 'Sexo'	:
						  $this->db->select('*');
						  $this->db->from('clientes');
						  $this->db->like('Sexo',$_POST['query']); 
						  $SqlRead  = $this->db->get();
					break;
				} 				
        } 
		else
		{
		   // Llamamos a la Tabla y sus datos select * from clientes
		   $SqlRead = $this->db->get('clientes');
		}
	
		foreach($SqlRead->result() as $row)
		{
			$arr[] = $row;
		}
		echo  json_encode($arr);
	} 
	
/* Funcion para Insert eregi tabla clientes de la BD */	
   function InsertClientes()
   { 	//Obtenemos los parametros
		$info=$this->input->post("data");
		//Decodificamos los Parametros
		$data = json_decode(stripslashes($info));
		$Cliente = $data->Cliente;
		$Sexo = $data->Sexo;
		$Edad = $data->Edad;
		$id_limitecredito=$data->id_limitecredito;
		//Creamos el Array de datos para despues usarlos en la Clausula insert
		$dataInsert = array(
               'Cliente' => $Cliente,
               'Sexo' => $Sexo,
               'Edad' => $Edad,
			   'id_limitecredito'=>$id_limitecredito
            );
       //Insertamos los valores a la Tabla Clientes
       $this->db->insert('clientes', $dataInsert); 
	   //Mandamos los mensajes y datos de retorno a Extjs
	   echo json_encode(array(
					"success" 	=> true,//mysql_errno() == 0,
					"message"		=> mysql_errno() == 0?"Datos Agregados Correctamente":mysql_error(),
					"data"		=> array(
						array(
							"idcliente"	=> mysql_insert_id(),// <--- importantisimo regresar el ID asignado al record, para que funcione correctamente el metodo update y delete
							"Cliente"	=> $Cliente,
							"Sexo"	=> $Sexo,
							"Edad"	=> $Edad,
							"id_limitecredito"=>$id_limitecredito
						)
					)
				));	
	} 	
	
	
  /* Funcion para Actualizar tabla clientes de la BD */	
   function UpdateClientes()
   { 	//Obtenemos los parametros
		$info=$this->input->post("data");
		//Decodificamos los Parametros
		$data = json_decode(stripslashes($info));
		$Cliente = $data->Cliente;
		$Sexo = $data->Sexo;
		$Edad = $data->Edad;
		$id_limitecredito=$data->id_limitecredito;
		$id = $data->idcliente;
		//Actualizamos la Tabla con los datos capturados
		$this->db->set('Cliente', $Cliente); 
		$this->db->set('Sexo', $Sexo);
		$this->db->set('Edad', $Edad);
        $this->db->set('id_limitecredito',$id_limitecredito);		
		$this->db->where('idcliente',$id);
		$this->db->update('clientes');
		echo json_encode(array(
			"success" 	=>  true,
			"msg"		=>mysql_errno() == 0?'Datos Actualizados formalmente':mysql_error()
		));
	} 
	
  /* Funcion para Eliminar datos de tabla clientes de la BD */	
   function DeleteClientes()
   { 	//Obtenemos los parametros
		$info=$this->input->post("data");
		//Decodificamos los Parametros
		$data = json_decode(stripslashes($info));
		$id = $data->idcliente;
		//Borramos los datos
		$this->db->where('idcliente',$id);
        $this->db->delete('clientes');
		//return ($this->db->affected_rows() > 0) ? TRUE : FALSE;
	
		echo json_encode(array(
			"success" 	=>  true,
			"msg"		=> mysql_errno() == 0?'Datos Borrados Correctamente':mysql_error()
		));
	}
	
	

   
}	
?>