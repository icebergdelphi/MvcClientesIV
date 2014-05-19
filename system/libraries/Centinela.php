<?php if ( ! defined('BASEPATH')) exit('El acceso directo a este archivo no esta permitido.');
	
class Centinela
{
	
	var $_id = 0;
	var $_nick = "";
	var $_clave = "";
	var $_nivel = "";
	
	var $_auth = FALSE;
	
	function Centinela($auto = TRUE)
  {
		if($auto)
		{
			$CI =& get_instance();
			
			if($this->login($CI->session->userdata('nick'), $CI->session->userdata('clave')))
			{
				$this->_id = $CI->session->userdata('id');
				$this->_nick = $CI->session->userdata('nick');
				$this->_clave = $CI->session->userdata('clave');
				$this->_nivel = $CI->session->userdata('nivel');				
			}
		}
   }
	/* Si en algun momento en cualquier parte del sistema necesitamos recoger los datos
	* hacer lo siguiente: function getNick(){return $this->_nick;}
	* recogeremos el valor de las variables y lo devolvemos*/
   function login($nick = "", $clave = "")
   {  
		if(empty($nick)||empty($clave))
			return FALSE;
		
		$CI =& get_instance();		
			
		$sql = "SELECT * FROM `users` WHERE `nick`=? AND `password`=?";
		$query = $CI->db->query($sql, array($nick, $clave));
		
		//login ok
		if($query->num_rows()==1)
		{	
			$row = $query->row();
			
			$CI->session->set_userdata('id', $row->id);
			$this->_id = $row->id; 
			$CI->session->set_userdata('nick', $nick);
			$this->_nick = $nick;
			$CI->session->set_userdata('clave', $clave);
			$this->_clave = $row->password;
			$CI->session->set_userdata('nivel', $row->rank);				
			$this->_nivel = $row->rank;
			
			$this->_auth = TRUE;
			
			return TRUE;
		}
		else
		{
			$this->_auth = FALSE;
			$this->logout();
			
			return FALSE;
		}
  }	
  
  function logout()
  {
		 $CI =& get_instance();
		 $CI->session->sess_destroy();
		 $this->_auth = FALSE;			
  }
  /*
    La funcion Check es para checar niveles de usuario p/e: 
    [Nivel1:Usuario, Nivel2:Moderador, Nivel3:Administrador]
  */
  function check($nivel = 0, $estricto = TRUE)
 {
	if(!$this->_auth)
		return FALSE;
		
	if($estricto)
	{
		if($nivel == $this->_nivel)
			return TRUE;
		else
			return FALSE;
	}
	else
	{
		if($nivel < = $this->_nivel)
			return TRUE;
		else
			return FALSE;				
	}
 }	
?>