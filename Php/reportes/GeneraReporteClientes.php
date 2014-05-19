<?php
     //LIA. Hiber Tadeo Moreno Tovilla 01 Mayo 2012 delphiiceberg@gmail.com INITECSoftware 
    //Configuracion Ruta Para Archivos
    $RutaFiles=$_SERVER[ "DOCUMENT_ROOT"];

	 //Llamando las librerias
	require_once('http://localhost:8080/JavaBridge/java/Java.inc');
	require($RutaFiles.'/php-jru/php-jru.php');
	
	
	$CodigoDocto=$_POST['CodigoDocto'];//Nombre de mi Reporte Generado, viene de ExtJs
	
	
	//Llamando o invocando la funcion JRU de la libreria php-jru
	$jru=new JRU();
	//Ruta del reporte compilado Jasper generado por IReports
	$RutaReporte=$RutaFiles.'/MvcClientesIII/App/Reportes/';
	//Reporte a Procesar:Este nombre es del reporte creado en Ireports
	$Reporte='Clientes';
	//Ruta a donde deseo Guardar Mi archivo de salida Pdf
	$RutaSalidaReporte=$RutaFiles.'/MvcClientesIII/App/Reportes/Pdf/';
	//Nombre Salida Reporte
	$NombreSalidaReporte=$CodigoDocto ;
	//Extension de Salida
	$ExtensionReporte='.pdf';
	//Funcion de Conexion a mi Base de datos tipo MySql, cambiar el Password de la Bd y el user si es necesario
	$Conexion= new JdbcConnection("com.mysql.jdbc.Driver","jdbc:mysql://localhost/mvcclientes","root","123");
	
	//Parametro en caso de que el reporte no este parametrizado
	$Parametro=new java('java.util.HashMap');
    
	
	//Anexamos las extensiones y salidas
	$RutaReporte=$RutaReporte.$Reporte.'.jasper';
	$RutaSalidaReporte=$RutaSalidaReporte.$NombreSalidaReporte.$ExtensionReporte;
	//Generamos la Exportacion del reporte
	$jru->runReportToPdfFile($RutaReporte,$RutaSalidaReporte,$Parametro,$Conexion->getConnection());
	//Mandamos respuesta del Servidor al iFrame de Extjs para darle el nombre del PDF que mostrara
	$result =$NombreSalidaReporte.$ExtensionReporte or die('La consulta fall&oacute;: '.mysql_error());
        	if(!$result)
				 {
				   echo 'NoData';
				 }
				 else
				 {
					
				  echo json_encode(   
					 array(  
						   //
						   'success'   => true,
						   'Reporte' => $result //Nombre de reporte enviado de vuelta a Extjs,para mostrarlo
						  )); 
					   
						
					   
				 
				 }
?>

