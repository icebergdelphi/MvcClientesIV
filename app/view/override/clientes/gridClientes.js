Ext.define('MvcClientesIV.view.override.clientes.gridClientes', {
    override: 'MvcClientesIV.view.clientes.gridClientes',
    initComponent: function() {
    var me = this;    
        Ext.applyIf(me, {
         viewConfig: {    
          },
            plugins: [
                Ext.create('Ext.ux.grid.SelectSearch', {
                       mode: 'remote',
                       comboWidth:150,
                       width: 300,
                       hiddenComboFields:['Idcliente','Edad'],
                       showSelectAll :true,
                       searchText:'Buscar por..',
                       searchTriggerEmptyText:'Escriba el texto a buscar y presione ENTER',
                       positionDock:'top'
                })

            ]
                
         });
        me.callParent(arguments);
    }
    
});