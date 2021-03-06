/*
 * File: app/controller/clientes/Clientes.js
 *
 * This file was generated by Sencha Architect version 3.0.3.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Ext JS 4.2.x library, under independent license.
 * License of Sencha Architect does not include license for Ext JS 4.2.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('MvcClientesIV.controller.clientes.Clientes', {
    extend: 'Ext.app.Controller',

    stores: [
        'clientes.Clientes',
        'catalogos.LimiteCredito'
    ],
    views: [
        'clientes.gridClientes',
        'clientes.Captura'
    ],

    refs: [
        {
            ref: 'clientesgridClientes',
            selector: '#gridClientes'
        }
    ],

    onBtnAddClick: function(button, e, eOpts) {
        StoreLimiteCredito=this.getCatalogosLimiteCreditoStore();
        StoreLimiteCredito.load();
        var FormAdd= Ext.widget('clientesCaptura');
    },

    onBtnCancelarClick: function(button, e, eOpts) {
        var win    = button.up('window');
        win.close();
    },

    onBtnEditarClick: function(button, e, eOpts) {
        var record;
        var grd=this.getClientesgridClientes();
        records = grd.getSelectionModel().getSelection();
        if(records.length > 0){
            var FormAddEditar= Ext.widget('clientesCaptura');
            var EditForm=FormAddEditar.down('form');
            var record=records[0];
            EditForm.loadRecord(record);
        }
    },

    onBtnEliminarClick: function(button, e, eOpts) {
        var grd= this.getClientesgridClientes();
        record =grd.getSelectionModel().getSelection();
        dataInfo=grd.getSelectionModel().getSelection()[0].data.Cliente;// Dato al cual se hara referencia a la eliminacion
        //En esta parte automaticamente el Controller crea las Funciones Getters
        store  = this.getClientesClientesStore();
        Ext.MessageBox.show({
            title : 'Eliminar Registro',
            buttons : Ext.MessageBox.YESNO,
            msg : 'Desea Eliminar'+' '+dataInfo+'?',
            icon : Ext.Msg.WARNING,
            fn : function(btn)
            {
                if (btn == 'yes')
                {
                    store.remove(record);

                }

            }
        });
    },

    onBtnGuardarClick: function(button, e, eOpts) {
        var win    = button.up('window'),
            form   = win.down('form'),
            record = form.getRecord(),
            values = form.getValues();
            store  = this.getClientesClientesStore();
            if (values.idcliente > 0){ //Si Hay algun Valor, entra en Modo de Actualizacion
                record.set(values);
                win.close();
            } else{ //De Lo contrario, si la accion fue para agregar, se inserta un registro
                record = Ext.create('MvcClientesIV.model.clientes.Clientes');
                record.set(values);
                //Validamos que todo este capturado antes de guardar
                var errors = record.validate();
                if(!errors.isValid()){
                    errors.each(function(error){
                        alert("El campo : "+ error.field+" debe de capturarse ");

                    });
                }
                else
                {
                    store.add(record);
                    win.close();

                }
        }

    },

    onGridpanelItemDblClick: function(dataview, record, item, index, e, eOpts) {
        var record;
        var grd=this.getClientesgridClientes();
        records = grd.getSelectionModel().getSelection();
        if(records.length > 0){
            var FormAddEditar= Ext.widget('clientesCaptura');
            var EditForm=FormAddEditar.down('form');
            var record=records[0];
            EditForm.loadRecord(record);
        }
    },

    onBtnImprimirClick: function(button, e, eOpts) {
        /***************************************************************************************************/
        /* Descomentar esta sección en el caso de que hayan tenido exito en la configuracion de JavaBridge*/
        /***************************************************************************************************/

        /*var CodigoDocto='MVC-01-Clientes';//Nombre del reporte a Generar en la salida
        Ext.Ajax.request({

            method: 'POST',
            url: '/MvcClientesIV/Php/reportes/GeneraReporteClientes.php',

            params:
            {
                CodigoDocto:CodigoDocto

            },
            success: function(response,options)
            {
                var jsonReporte = Ext.JSON.decode(response.responseText);
                Reporte=jsonReporte.Reporte;//Es necesario para indicarle que reporte es,
                // y para que lo muestre en el Iframe, en caso de que tuvieran mas reportes
                var Iframepanel=Ext.create('Ext.ux.SimpleIFrame', {
                    border: false,
                    src:'/MvcClientesIV/App/Reportes/Pdf/'+Reporte
                });
                var WinReporte=Ext.create('Ext.Window', {
                    title: 'Reporte de Clientes',
                    width: 600,
                    height: 500,
                    layout: 'fit',
                    modal:true,
                    items: Iframepanel
                });

                WinReporte.show();

            },
            failure: function ( )
            {


            }
        });	*/

        /***************************************************************************************************/
        /* Termina seccion                                                                                 */
        /***************************************************************************************************/


        /* Test Rapido de como se verian los Reportes, ejecutando uno que ya esta predeterminado en caso de tener problemas al configurar JavaBridge*/
        /* En caso contrario si tienes exito en configurar JavaBridge, comentar toda esta secccion*/
        var Iframepanel=Ext.create('Ext.ux.SimpleIFrame', {
            border: false,
            src:'/MvcClientesIV/App/Reportes/Pdf/'+'MVC-01-Clientes.pdf'
        });
        var WinReporte=Ext.create('Ext.Window', {
            title: 'Reporte de Clientes',
            width: 600,
            height: 500,
            layout: 'fit',
            modal:true,
            items: Iframepanel
        });

        WinReporte.show();


    },

    onBtnSalirClick: function(button, e, eOpts) {
        Ext.Msg.confirm("Confirmar","Desea salir de la aplicacion?",
        function(btn){
            if(btn === "yes"){
                document.location = "inicio/logout";
            }
        });
    },

    onGrdClienteslBeforeRender: function(component, eOpts) {
        //Cargamos los stores a peticion
        StoreClientes=this.getClientesClientesStore();
        StoreLimiteCredito=this.getCatalogosLimiteCreditoStore();
        StoreLimiteCredito.load();
        StoreClientes.load();

    },

    init: function(application) {
        this.control({
            "#btnAdd": {
                click: this.onBtnAddClick
            },
            "#btnCancelar": {
                click: this.onBtnCancelarClick
            },
            "#btnEdit": {
                click: this.onBtnEditarClick
            },
            "#btnDelete": {
                click: this.onBtnEliminarClick
            },
            "#btnGuardar": {
                click: this.onBtnGuardarClick
            },
            "#gridClientes": {
                itemdblclick: this.onGridpanelItemDblClick,
                beforerender: this.onGrdClienteslBeforeRender
            },
            "#btnImprimir": {
                click: this.onBtnImprimirClick
            },
            "#btnSalirSistema": {
                click: this.onBtnSalirClick
            }
        });
    }

});
