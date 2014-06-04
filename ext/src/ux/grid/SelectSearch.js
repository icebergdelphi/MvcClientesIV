/**
 * @class Ext.ux.grid.SelectSearch
 * @extends Ext.util.Observable
 *
 * Search plugin for Ext.grid.GridPanel, Ext.grid.EditorGrid ver. 2.x or subclasses of them 
 *
 * @Originalauthor    Ing. Jozef Sak?lo?
 * @ModifiedBy  Iceberdelphi(Hiber Tadeo Moreno Tovilla Mayo 2014, Chiapas, México)
 * @copyright (c) 2008, by Ing. Jozef Sak?lo?
 * @date      <ul>
 * <li>17. January 2008<li>
 * <li>6. February 2009</li>
 * </ul>
 * @version   1.1.1
 * @revision  $Id: Ext.ux.grid.Search.js 798 2010-01-17 00:46:57Z jozo $
 *
 * @license Ext.ux.grid.Search is licensed under the terms of
 * the Open Source LGPL 3.0 license.  Commercial use is permitted to the extent
 * that the code/component(s) do NOT become part of another Open Source or Commercially
 * licensed development library or toolkit without explicit permission.
 * 
 * <p>License details: <a href="http://www.gnu.org/licenses/lgpl.html"
 * target="_blank">http://www.gnu.org/licenses/lgpl.html</a></p>
 *
 * @forum     23615
 * @demo      http://gridsearch.extjs.eu
 * @download  
 * <ul>
 * <li><a href="http://gridsearch.extjs.eu/gridsearch.tar.bz2">gridsearch.tar.bz2</a></li>
 * <li><a href="http://gridsearch.extjs.eu/gridsearch.tar.gz">gridsearch.tar.gz</a></li>
 * <li><a href="http://gridsearch.extjs.eu/gridsearch.zip">gridsearch.zip</a></li>
 * </ul>
 *
 * @donate
 * <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_blank">
 * <input type="hidden" name="cmd" value="_s-xclick">
 * <input type="hidden" name="hosted_button_id" value="3430419">
 * <input type="image" src="https://www.paypal.com/en_US/i/btn/x-click-butcc-donate.gif" 
 * border="0" name="submit" alt="PayPal - The safer, easier way to pay online.">
 * <img alt="" border="0" src="https://www.paypal.com/en_US/i/scr/pixel.gif" width="1" height="1">
 * </form>
 */
Ext.define('Ext.ux.grid.SelectSearch', {
    extend: 'Ext.AbstractPlugin',
    alias: 'plugin.gridsearch',
    uses: [
        'Ext.container.Container',
        'Ext.layout.container.HBox',
        'Ext.grid.Panel',
        'Ext.data.*',
        'Ext.button.Button',
		'Ext.form.field.ComboBox',
        'Ext.form.field.Trigger'
    ],
    mixins: {
        observable: 'Ext.util.Observable'
    },

    /**
     * @cfg {Boolean} autoFocus Try to focus the input field on each store load if set to true (defaults to undefined)
     */

    /**
     * @cfg {String} searchText Text to display on menu button
     */
    searchText: 'Search',

    /**
     * @cfg {String} searchTipText Text to display as input tooltip. Set to '' for no tooltip
     */ 
    searchTipText: 'Type a text to search and press Enter',
    
	/**
     * @cfg {String} searchTipText Text to display as input tooltip. Set to '' for no tooltip
     */ 
    searchTriggerEmptyText: 'Type a text to search and press Enter',

    /**
     * @cfg {String} position Where to display the search controls. Valid values are top and bottom
     * Corresponding toolbar has to exist at least with mimimum configuration tbar:[] for position:top or bbar:[]
     * for position bottom. Plugin does NOT create any toolbar.(defaults to "bottom")
     */
    positionDock: 'bottom',


    /**
     * @cfg {String} minCharsTipText Tooltip to display if minChars is > 1
     */
    minCharsTipText: 'Type at least {0} characters',

    /**
     * @cfg {String} mode Use 'remote' for remote stores or 'local' for local stores. If mode is local
     * no data requests are sent to server the grid's store is filtered instead (defaults to "remote")
     */
    mode: 'remote',

    /**
     * @cfg {Array}  Array of fields names to hide , e.g. ['mycomboField', 'FieldX']
     * (defaults to undefined)
     */
	 
	  hiddenComboFields: [],

    /**
     * @cfg {Number} width Width of input field in pixels (defaults to 100)
     */
    width: 100,
    
	/**
     * @cfg {Number} width Width of input field in pixels (defaults to 100)
     */
     comboWidth: 100,
    /**
     * @cfg {String} xtype xtype is usually not used to instantiate this plugin but you have a chance to identify it
     */

    /**
     * @cfg {Object} paramNames Params name map (defaults to {fields:"fields", query:"query"}
     */
    paramNames: {
        fields:'fields',
        query:'query'
    },

    /**
     * @cfg {String} shortcutKey Key to fucus the input field (defaults to r = Sea_r_ch). Empty string disables shortcut
     */
    shortcutKey: 'r',

    /**
     * @cfg {String} shortcutModifier Modifier for shortcutKey. Valid values: alt, ctrl, shift (defaults to "alt")
     */
    shortcutModifier: 'alt',

    /**
     * @cfg {Boolean} resetPage Resets the page and start properties to load 
     * page 1 if true (defaults to true)
     */
    resetPage: true,
    
    /**
     * @cfg {String} align "left" or "right" (defaults to "left")
     */
    
    /**
     * @cfg {Number} minLength Force user to type this many character before he can make a search 
     * (defaults to undefined)
     */

    /**
     * @cfg {Ext.Panel/String} toolbarContainer Panel (or id of the panel) which contains toolbar we want to render
     * search controls to (defaults to this.grid, the grid this plugin is plugged-in into)
     */
	 toolbarContainerId:'',

    constructor: function() {
        var me = this;
        
        me.callParent(arguments);
        me.mixins.observable.constructor.apply(this,arguments);
    },

    /**
     * @private
     * @param {Ext.grid.GridPanel/Ext.grid.EditorGrid} grid reference to grid this plugin is used for
     */
    init: function(grid) {
        this.grid = grid;

        // setup toolbar container if id was given
        if('string' === typeof this.toolbarContainer) {
            this.toolbarContainer = Ext.getCmp(this.toolbarContainer);
        }

        // do our processing after grid render and reconfigure
        grid.onRender = Ext.Function.createSequence(grid.onRender, this.onRender, this);
        grid.reconfigure = Ext.Function.createSequence(grid.reconfigure, this.reconfigure, this);
        
        this.addEvents(
            /**
             * @event beforesearch
             * Fires before the first search trigger is clicked, returning FALSE 
             * from this event will cancel event.
             * @param {Ext.ux.grid.Search} this This search field
             * @param {Ext.data.Store} store Data store connected to the search field
             * @param {String} value The current value of the field
             */
            'beforesearch',
            /**
             * @event search
             * Fires when the first trigger button is clicked
             * @param {Ext.ux.grid.Search} this This search field
             * @param {Ext.data.Store} store Data store connected to the search field
             * @param {String} value The current value of the field
             */
            'search'
        );

    },

    /**
     * adds plugin controls to <b>existing</b> toolbar and calls reconfigure
     * @private
     */
    onRender:function() {
        var panel = this.toolbarContainer || this.grid;
        //var tb = 'bottom' === this.position ? panel.bottomToolbar : panel.topToolbar;
        //finds the toolbar that matches inte specified position in the 
        //docked items
		
        var docked = panel.getDockedItems();
        for (var i = 0; i < docked.length; i++) {
            if (docked[i].dock == this.positionDock && docked[i].componentCls == 'x-toolbar') {
                var tb = docked[i];
                /*break;*/
            }
        }
        
        //if the toolbar isn't found, create one in the specified
        //position in the docked items
        if (!tb) {
            var tb = Ext.create('Ext.toolbar.Toolbar',{ dock: this.positionDock });
            this.grid.addDocked(tb);
        }

       // this.menu = new Ext.menu.Menu();
		this.combobox=Ext.create('Ext.form.field.ComboBox',{width:this. comboWidth,queryMode: 'local',emptyText: this.searchText,displayField:'value'});

        // handle position
        if('right' === this.align) { tb.add('->'); }
        else {
            if(0 < tb.items.getCount()) {
                if (tb.displayInfo) for (var i = 0; i < tb.items.getCount(); i++) {
                    if (tb.items.items[i] == tb.displayItem) {
                        tb.displayItem = tb.remove(tb.items.items[i],false);
                        tb.remove(tb.items.items[i-1]);
                        break;
                    }
                }
                tb.add('-');
            }
        }

        // add menu button
		
        tb.add({           
			xtype:this.combobox
            
        });
        // add input field (TwinTriggerField in fact)
        this.field = Ext.create('Ext.form.field.Trigger',{
            width: this.width,
            selectOnFocus: (undefined === this.selectOnFocus) ? true : this.selectOnFocus,
            trigger1Cls: 'x-form-clear-trigger',
            trigger2Cls: (this.minChars) ? 'x-hide-display' : 'x-form-search-trigger',
            onTrigger1Click: this.createDelegate(this.onTriggerClear, this),
            onTrigger2Click: this.minChars ? Ext.emptyFn : this.createDelegate(this.onTriggerSearch, this),
            minLength: this.minLength,
			emptyText:this.searchTriggerEmptyText			
        });
        
        // install event handlers on input field
        this.field.on('render', function() {
            // register quick tip on the way to search
            if((undefined === this.minChars || 1 < this.minChars) && this.minCharsTipText) {
                Ext.QuickTips.register({
                    target: this.field.el,
                    text: this.minChars ? String.format(this.minCharsTipText, this.minChars) : this.searchTipText
                });
            }

            if(this.minChars) {
                this.field.el.on({scope:this, buffer:300, keyup:this.onKeyUp});
            }

            // install key map
            var map = new Ext.util.KeyMap(this.field.el, [{
                key: Ext.EventObject.ENTER,
                scope: this,
                fn: this.onTriggerSearch
            },{
                key: Ext.EventObject.ESC,
                scope: this,
                fn: this.onTriggerClear
            }]);
            map.stopEvent = true;
        }, this, {single:true});

        tb.add(this.field);

        // re-layout the panel if the toolbar is outside
        if(panel !== this.grid) {
            this.toolbarContainer.doLayout();
        }

        // reconfigure
        this.reconfigure();

        // keyMap
        if(this.shortcutKey && this.shortcutModifier) {
                var shortcutEl = this.grid.getEl();
                var shortcutCfg = [{
                    key:this.shortcutKey,
                    scope:this,
                    stopEvent:true,
                    fn:function() { this.field.focus(); }
                }];
                shortcutCfg[0][this.shortcutModifier] = true;
                this.keymap = new Ext.util.KeyMap(shortcutEl, shortcutCfg);
        }

        if(true === this.autoFocus) {
            this.grid.store.on({scope:this, load:function(){this.field.focus();}});
        }

        if (tb.displayInfo) {
            tb.add('->',tb.displayItem);
        }
		

    },
            
    /**
     * field el keypup event handler. Triggers the search
     * @private
     */
    onKeyUp:function(e, t, o) {

        // ignore special keys 
        if(e.isNavKeyPress()) { return; }

        var length = this.field.getValue().toString().length;
        if(0 === length || this.minChars <= length) {
            this.onTriggerSearch();
        }
    }, // eo function onKeyUp

    /**
     * Clear Trigger click handler
     * @private 
     */
    onTriggerClear: function() {
        if(this.field.getValue()) {
            this.field.setValue('');
            this.field.focus();
            this.onTriggerSearch();
        }
    },
    
    onTriggerSearch: function() {
        if(!this.field.isValid()) {
            return;
        }
        var val = this.field.getValue();
        var store = this.grid.store;
		//Get the value of the selected combobox field                
		var fields=this.combobox.getValue();
		var cm = this.grid.columns;
		var dataIndexValue;
		//Get the dataindex from Grid
		Ext.each(cm, function(config) {
		  if (config.text==fields)
		  {
		     dataIndexValue=config.dataIndex;
		  }
                      
        }, this);

        // grid's store filter  
        if (this.fireEvent('beforesearch', this, store, val) !== false) {
            if(this.mode === 'local') {
                store.clearFilter();
                if(val) {
                    store.filterBy(function(r) {
					var rv = r.get(dataIndexValue);
					rv = rv instanceof Date ? rv.format(this.dateFormat || r.fields.get(item.dataIndex).dateFormat) : rv;
                        if(rv === val) {
								return true;
						}
						else 
						{
								return false;
						}
                    }, this);
                }
            }
            // ask server to filter records
            else {
                // clear start (necessary if we have paging)
                if(store.lastOptions && store.lastOptions.params) {
                    store.lastOptions.params[store.paramNames.start] = 0;
                }
                // add fields and query to baseParams of store
                delete(store.proxy.extraParams[this.paramNames.fields]);
                delete(store.proxy.extraParams[this.paramNames.query]);
                if (store.lastOptions && store.lastOptions.params) {
                    delete(store.lastOptions.params[this.paramNames.fields]);
                    delete(store.lastOptions.params[this.paramNames.query]);
                }
                if(fields.length) {
                    store.proxy.extraParams[this.paramNames.fields] = fields;
                    store.proxy.extraParams[this.paramNames.query] = val;
                }

                // reload store
                if (this.resetPage === false) store.reload();
                else {
                    store.currentPage = 1;
                    store.reload({
                        page: 1,
                        start: 0
                    });
                }
            }
<<<<<<< HEAD
			//01/06/2014 Clear all after search,because we do not want anything load in memory.
			delete(store.proxy.extraParams[this.paramNames.fields]);
            delete(store.proxy.extraParams[this.paramNames.query]);
            
=======
            //01/06/2014 Clear all after search,because we do not want anything load in memory.
	    delete(store.proxy.extraParams[this.paramNames.fields]);
            delete(store.proxy.extraParams[this.paramNames.query]);
>>>>>>> fac2f59cb718c27887dcf2e897f2156ea0c1368c
            this.fireEvent('search', this, store, val); 
        }
    },
    
	reconfigure: function() {
        // remove old items
        var combobox = this.combobox;
        combobox.clearValue();
		var found = false;
		// add to a temp array a few items
        var cm = this.grid.columns;        
        var dataFields = [];		
		Ext.each(cm, function(config) {
		      dataFields.push([config.text]); //Get the Column Text
        }, this);        

        
		//We gonna let only the fields that are no hidden
		for(var i = 0; i<dataFields.length; i++)
		{
			for(var j=0; j<this.hiddenComboFields.length; j++){
				if(dataFields[i].toString() === this.hiddenComboFields[j].toString()){
					dataFields.splice(i, 1);//Removing the repeated elements beetwen the two arrays
				}
			}
		}
	    //Create the combobox store
		var dataStore = new Ext.data.ArrayStore({
			data   : dataFields ,
			fields : ['value']
			
		});
        combobox.store=dataStore;        
    },
    
    /**
     * Creates a function delegate, copied from ExtJS 3.4
     * @private
     */
    createDelegate : function(method, obj, args, appendArgs){
        //var method = this;
        return function() {
            var callArgs = args || arguments;
            if (appendArgs === true){
                callArgs = Array.prototype.slice.call(arguments, 0);
                callArgs = callArgs.concat(args);
            }else if (Ext.isNumber(appendArgs)){
                callArgs = Array.prototype.slice.call(arguments, 0); // copy arguments first
                var applyArgs = [appendArgs, 0].concat(args); // create method call params
                Array.prototype.splice.apply(callArgs, applyArgs); // splice them in
            }
            return method.apply(obj || window, callArgs);
        }
    }

});
