#Instrucciones de uso/ How to use this example
Ejemplo del uso de reportes en Extjs con Ireports, y el uso dinamico del TreePanel, ademas de una busqueda por grid con el plugin SelectSearch.js.

Example using reports with Extjs and Ireports, and the dynamic use of the TreePanel, besides a searching grid using the Select Search.js plugin.

Read LEEME.DOC to configure Javabridg with PHP and Tomcat to execute the reports made it with Ireports.

User and passwords:

Admin : 123 ---->Menu user configured Andres: 123 ---->No Menu configured in the database Jose: 123------->Menu user configured

Put in your web explorer: http://localhost/MvcClientesIV

Mysql Database included, configure the codeigniter database info with your server configuration , using this path: C:\xampp\htdocs\MvcClientesIV\application\config\database.php

Lines:

$db['default']['username'] = 'root'; //Your user $db['default']['password'] = '';//Your password

# MvcClientesIV/app

This folder contains the javascript files for the application.

# MvcClientesIV/resources

This folder contains static resources (typically an `"images"` folder as well).

# MvcClientesIV/overrides

This folder contains override classes. All overrides in this folder will be 
automatically included in application builds if the target class of the override
is loaded.

# MvcClientesIV/sass/etc

This folder contains misc. support code for sass builds (global functions, 
mixins, etc.)

# MvcClientesIV/sass/src

This folder contains sass files defining css rules corresponding to classes
included in the application's javascript code build.  By default, files in this 
folder are mapped to the application's root namespace, 'MvcClientesIV'. The
namespace to which files in this directory are matched is controlled by the
app.sass.namespace property in MvcClientesIV/.sencha/app/sencha.cfg. 

# MvcClientesIV/sass/var

This folder contains sass files defining sass variables corresponding to classes
included in the application's javascript code build.  By default, files in this 
folder are mapped to the application's root namespace, 'MvcClientesIV'. The
namespace to which files in this directory are matched is controlled by the
app.sass.namespace property in MvcClientesIV/.sencha/app/sencha.cfg. 
