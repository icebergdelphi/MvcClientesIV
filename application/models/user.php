<?php
Class User extends CI_Model
{
	function login($username, $password)
	{
		$this -> db -> select('id, username, password');
		$this -> db -> from('users');
		$this -> db -> where('username' , $username); 
		$this -> db -> where('password',SHA1($password)); //SHA1 Encryptacion de 40 caracteres
		$this -> db -> limit(1);

		$query = $this -> db -> get();

		if($query -> num_rows() == 1)
		{
			return $query->result();
			
		}
		else
		{
			return false;
		}

	}
	
}


?>