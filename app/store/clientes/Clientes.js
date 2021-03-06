/*
 * File: app/store/clientes/Clientes.js
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

Ext.define('MvcClientesIV.store.clientes.Clientes', {
    extend: 'Ext.data.Store',

    requires: [
        'MvcClientesIV.model.clientes.Clientes',
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json',
        'Ext.data.writer.Json'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: false,
            autoSync: true,
            model: 'MvcClientesIV.model.clientes.Clientes',
            storeId: 'clientes.Clientes',
            proxy: {
                type: 'ajax',
                actionMethods: {
                    read: 'POST'
                },
                api: {
                    read: 'controller_clientes/readClientes',
                    create: 'controller_clientes/insertClientes',
                    update: 'controller_clientes/updateClientes',
                    destroy: 'controller_clientes/deleteClientes'
                },
                reader: {
                    type: 'json',
                    root: 'data'
                },
                writer: {
                    type: 'json',
                    encode: true,
                    root: 'data'
                },
                listeners: {
                    exception: {
                        fn: me.onAjaxException,
                        scope: me
                    }
                }
            }
        }, cfg)]);
    },

    onAjaxException: function(proxy, response, operation, eOpts) {
        Ext.MessageBox.show({
            title: 'ERROR',
            msg: operation.getError(),
            icon: Ext.MessageBox.ERROR,
            buttons: Ext.Msg.OK
        });
    }

});