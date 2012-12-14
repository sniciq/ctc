/*
 * comments
 */
Ext.namespace('com.ms.customer.ChargeSearchPanel');
com.ms.customer.ChargeSearchPanel=Ext.extend(Ext.Panel, {
	initComponent: function() {
		var roleReader = new Ext.data.JsonReader({
			totalProperty: 'total',
			idProperty:'id',
			root: 'invdata',
			fields: [
				{name: 'id'},
				{name: 'roleName'},
				{name: 'describle'}
			]
		});
		
		var rolesDS = new Ext.data.Store({
			proxy: new Ext.data.HttpProxy({url: ''}),
			remoteSort: true,
			paramNames: {
				start : 'extLimit.start', 
			    limit : 'extLimit.limit', 
			    sort : 'extLimit.sort', 
			    dir : 'extLimit.dir'   
			},
			reader: roleReader
		});
		var rolesGrid = new Ext.grid.GridPanel({
			store: rolesDS,
			hideHeaders: true,
			colModel: new Ext.grid.ColumnModel([
				{header:'角色', dataIndex:'roleName', sortable:true,menuDisabled: true}
			]),
			sm:sm,
			viewConfig: {
				forceFit: true
			}
		});
		
		var userRolesDS = new Ext.data.Store({
			proxy: new Ext.data.HttpProxy({url: ''}),
			remoteSort: true,
			paramNames: {
				start : 'extLimit.start', 
			    limit : 'extLimit.limit', 
			    sort : 'extLimit.sort', 
			    dir : 'extLimit.dir'   
			},
			reader: roleReader
		});
		var userRolesGrid = new Ext.grid.GridPanel({
			store: userRolesDS,
			hideHeaders: true,
			colModel: new Ext.grid.ColumnModel([
				{header:'角色', dataIndex:'roleName', sortable:true,menuDisabled: true}
			]),
			sm:sm,
			viewConfig: {
				forceFit: true
			}
		});
		
		var userRoleWin = new Ext.Window({
			title: '编辑用户角色',
			modal: true,
			layout:'fit',
			width:500,
			height:320,
			closeAction:'hide',
			plain: true,
			layout: 'hbox',
			layoutConfig: {
                padding:'1',
                align:'stretch'
            },
            defaults:{margins:'0 5 0 0'},
			items: [
				{
					title: '可选角色',
					flex: 5,
					layout: 'fit',
					items: [rolesGrid]
				},
				{
					width: 40,
					layout: {
						type:'vbox',
						padding:'5',
						pack:'center',
						align:'center'
					},
					defaults:{margins:'0 0 10 0'},
					items:[
						{
						    xtype:'button',
						    width: 30,
							text: ' >> ',
							handler: function(){
				            	var rs = rolesGrid.getSelectionModel().getSelections();
				            	userRolesDS.add(rs);
				            	rolesDS.remove(rs);
				            }
						},
						{
						    xtype:'button',
						    width: 30,
							text: ' << ',
							handler: function(){
				            	var rs = userRolesGrid.getSelectionModel().getSelections();
				            	rolesDS.add(rs);
				            	userRolesDS.remove(rs);
				            }
						}
					]
				},
				{
					title: '已有角色',
					flex: 5,
			        layout: 'fit',
			        items: [userRolesGrid]
				}
			],
			buttons: [
				{
		            text: '确定',
		            handler: function(){
		            	Ext.MessageBox.confirm('提示', '确定保存 ?', function(btn) {
							if(btn != 'yes') {
								return;
							}
							
							var userRoleIds = '';
							userRolesDS.each(function(rec){
					    		userRoleIds += rec.data.id + ',';
						   	});
						   	
						   	var userIds = '';
						   	var sr = grid.getSelectionModel().getSelections();
						   	for(var i = 0; i < sr.length; i++) {
						   		userIds += sr[i].data.id + ',';
						   	}
							
							alert('SAVE');
						});
		            }
				},
				{
					text: '取消',
		            handler: function(){
		            	userRoleWin.hide();
		            }
				}
			]
		});
		
		var searchForm = new Ext.FormPanel({
			frame: true,
			collapsible : false,
			collapsed: false,
			height: 80,
			collapseMode:'mini',
			region: 'north',
			split: true,
			labelAlign: 'right',
			items: [
				{
					layout: 'column',
					items: [
						{
							columnWidth: .33, layout: 'form',
							items:[
								{
					                xtype: 'compositefield',fieldLabel: '付款日期',frame:true,defaults: {flex: 1},anchor : '95%',
					                items: [
					                    {xtype: 'datefield',format : "Y-m-d",allowBlank : true,name : 'startTime',editable:false},
					                    {xtype: 'datefield',format : "Y-m-d",allowBlank : true,name : 'endTime',editable:false}
					                ]
					            }
							]
						},
						{
							columnWidth: .33, layout: 'form',
							items:[
								{
									xtype: 'compositefield',fieldLabel: '到期日期',frame:true,defaults: {flex: 1},anchor : '95%',
					                items: [
					                    {xtype: 'datefield',format : "Y-m-d",allowBlank : true,name : 'startTime',editable:false},
					                    {xtype: 'datefield',format : "Y-m-d",allowBlank : true,name : 'endTime',editable:false}
					                ]
								}
							]
						},
						{
							columnWidth: .33, layout: 'form',
							items: [
								{xtype: 'textfield',name: 'username', fieldLabel: '客户名称',anchor : '95%'}
							]
						}
					]
				},
				{
					layout: 'column',
					items: [
						{
							columnWidth: .33, layout: 'form',
							items:[
								{xtype: 'textfield',name: 'username', fieldLabel: '智能卡号',anchor : '95%'}
							]
						},
						{
							columnWidth: .66,layout: 'hbox',
							defaults:{margins:'0 5 0 0'},layoutConfig: {padding:'5',pack:'end',align:'middle'},
							items: [
								{
									xtype: 'button',text: '查询',anchor : '95%',scope: this,width: 80,
									handler: function() {
									}
								},
								{
									xtype: 'button',text: '清空',anchor : '95%',scope: this,width: 80,
									handler: function() {
									}
								}
							]
						}
					]
				}
			],
			keys: [
				{
					key: [13],
					fn: function() {
						var fv = searchForm.getForm().getValues();
						ds.baseParams= fv;
						ds.load({params: {"extLimit.start":0, "extLimit.limit":25}});
					}
				}
			]
		});
		
		var sm = new Ext.grid.CheckboxSelectionModel({singleSelect:false});
		
		var cm = new Ext.grid.ColumnModel([
			sm,
			new Ext.grid.RowNumberer(),
			{header:'客户名称', dataIndex:'gender', sortable:true},
			{header:'智能卡号', dataIndex:'gender', sortable:true},
			{header:'手机号码', dataIndex:'gender', sortable:true},
			{header:'付款日期', dataIndex:'id', sortable:true},
			{header:'到期日期', dataIndex:'name', sortable:true}
		]);
		
		var ds = new Ext.data.Store({
			proxy: new Ext.data.HttpProxy({url: ''}),
			remoteSort: true,
			paramNames: {
				start : 'extLimit.start', 
			    limit : 'extLimit.limit', 
			    sort : 'extLimit.sort', 
			    dir : 'extLimit.dir'   
			},
			reader: new Ext.data.JsonReader({
				totalProperty: 'total',
				idProperty:'id',
				root: 'invdata',
				fields: [
					{name: 'id'},
					{name: 'username'},
					{name: 'password'},
					{name: 'useremail'},
					{name: 'usertype'},
					{name: 'gender'},
					{name: 'name'}
				]
			})
		});
		//ds.load({params: {"extLimit.start":0, "extLimit.limit":25}});
		
		var grid = new Ext.grid.GridPanel({
			region: 'center',
			store: ds,
			colModel: cm,
			sm:sm,
			viewConfig: {
				forceFit: true
			},
			tbar: new Ext.Toolbar({
				buttons: [
					{
						text: '新增',
						iconCls: 'add',
						handler: function() {
							editForm.form.reset();
							editWin.show();
						}
					},
					{
						text: '修改'	,
						iconCls: 'edit',
						handler: function() {
							var rs = grid.getSelectionModel().getSelected();
							showInfo(rs.data.id);
						}
					},
					{
						text: '删除'	,
						iconCls: 'del',
						handler: function() {
							var rs = grid.getSelectionModel().getSelected();
							if(rs.data.realName == 'SysUser') {
								Ext.MessageBox.show({
					        		title: '提示',
				        		    msg: '不能删除系统管理员!',
				        		    buttons: Ext.Msg.OK,
				        		    fn: function(){},
				        		    icon: Ext.MessageBox.ERROR
					        	});
							}
							else {
								deleteResource(rs.data.id, rs.data.realName);
							}
						}
					},
					{
						text: '收费情况'	,
						iconCls: 'add',
						scope: this,
						handler: function() {
							this.CustomerChargeWin.show();
						}
					}
				]
			}),
			bbar: new Ext.PagingToolbar({
				pageSize: 25,
				store: ds,
				displayInfo: true,
				displayMsg: '显示第{0}条到{1}条记录,一共{2}条',
				emptyMsg: '没有记录',
				items: [
					'-',
					{
						text: '导出Excel',
						iconCls: 'export',
						scope: this,
						handler: function() {
							
						}
					}
				]
			})
		});
		
		var contextMenu = new Ext.menu.Menu({
	        items: [
		        {
		            text: '修改',
		            iconCls: 'edit',
		            scope: this,
		            handler: function() {
		            	var rs = grid.getSelectionModel().getSelected();
		            	showInfo(rs.data.id);
		            }
		        },
		        {
		            text: '删除',
		            iconCls: 'del',
		            scope: this,
		            handler: function() {
		            	var rs = grid.getSelectionModel().getSelected();
		            	deleteResource(rs.data.id, rs.data.menuName);
		            }
		        }
			]
	    });
	    
	    grid.on('rowcontextmenu', function(grid, index, event) {
			event.stopEvent();
			grid.getSelectionModel().selectRow(index);
			contextMenu.showAt(event.getXY());
		});
		
		grid.addListener('rowdblclick', function(grid, rowindex, e) {
			var record = grid.getStore().getAt(rowindex);
			showInfo(record.data.id);
		});
		
		function showInfo(id) {
//			editForm.load({
//				url: '../basic/UserController/getDetailInfo.sdo',
//				params: {id: id},
//				success:function(form,action){
//				}
//			});
			editWin.show();
		}
		
		function deleteResource(id, info) {
			Ext.MessageBox.confirm('提示', '确定删除  ' + info + ' ?', function(btn) {
				if(btn != 'yes') {
					return;
				}
				
			});
		}
		
		Ext.apply(this, {  
            iconCls: 'tabs',  
            autoScroll: false,  
            closable: true,
            layout: 'border',
            items:[
            	searchForm,grid
            ]
        });  
        //调用父类构造函数（必须）  
		com.ms.customer.ChargeSearchPanel.superclass.initComponent.apply(this, arguments);
	},
	
	initMethod: function() {
	}
});
