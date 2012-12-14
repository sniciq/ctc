Ext.namespace('com.ms.basic.RoleUserWin');
com.ms.basic.RoleUserWin=Ext.extend(Ext.Window, {
	initComponent: function() {
		this.roleId = 0;
		
		var ctx = '';
		
		
		var userComboStore = new Ext.data.Store({
			proxy: new Ext.data.HttpProxy({url: '../basic/UserAction/searchCRMUsers.action'}),
			reader: new Ext.data.JsonReader({
				totalProperty: 'total',
				idProperty:'id',
				root: 'invdata',
				fields: [
					{name: 'id'},
					{name: 'name'},
					{name: 'username'},
					{name: 'displayName', convert: function(v, record){return record.name + '(' + record.username + ')'}}
				]
			})
		});
		
		var searchForm = this.searchForm = new Ext.FormPanel({
			frame: true,
			collapsed: true,
			autoHeight:true,
			collapseMode:'mini',
			region: 'north',
			split: true,
			labelAlign: 'right',
			items: [
		        {
		        	layout: 'column',
		        	items: [
						{
							columnWidth: .6, layout: 'form',
							items: [
								new Ext.form.ComboBox({
									fieldLabel: '用户名',
									emptyText: '汉字或者拼音检索...',
									name: 'userName',
									triggerAction: 'all', 
									forceSelection: true,
									editable: true,
									hideTrigger: false,
									anchor : '95%',
									mode: 'local',
									valueField: 'id',
									displayField: 'displayName',
									store: userComboStore,
									listeners : {
										keyUp: function(comboBox, e){
											if(e.getKey() == 16 || e.getKey() == 17 || e.getKey() == 18 || e.getKey() == 20 || e.getKey() == 27 || e.getKey() == 13 || e.getKey() == 37 || e.getKey() == 38 || e.getKey() == 39 || e.getKey() == 40)
												return;
											userComboStore.load({params: {name: comboBox.el.dom.value, 'extLimit.sort': 'name', 'extLimit.dir': 'ASC', 'extLimit.start': 0, 'extLimit.limit':20}});
										}
									}
								})
							]
						},
						{
							columnWidth: .33, layout: 'form',
							items: [
								new Ext.Button({
									width: 80,
									text: '添加',
									scope: this,
									handler: function() {
										this.addRoleUser(this.roleId, this.searchForm.getForm().findField("userName").getValue(), this.searchForm.getForm().findField("userName").el.dom.value);
									}
								})
							]
						}
				    ]
		        }
			]
		});
		
		var sm = new Ext.grid.CheckboxSelectionModel({singleSelect:true});
		var cm = new Ext.grid.ColumnModel([
			sm,
			new Ext.grid.RowNumberer(),
			{header:'用户ID', dataIndex:'id', sortable:true, width: 60},
			{header:'用户名', dataIndex:'name', sortable:true},
			{header:'真实姓名', dataIndex:'username', sortable:true, width: 60},
			{header:'用户类型', dataIndex:'usertype', sortable:true, width: 60},
			{header:'邮箱', dataIndex:'useremail', sortable:true, width: 200}
		]);
		
		var ds = new Ext.data.Store({
			proxy: new Ext.data.HttpProxy({url: '../basic/UserRoleAction/getRoleUsers.action'}),
			remoteSort: false,
			sortInfo: {
				field: 'name',
				direction: 'ASC'
			},
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
					{name: 'id', type: 'int'},
					{name: 'username'},
					{name: 'password'},
					{name: 'useremail'},
					{name: 'usertype'},
					{name: 'gender'},
					{name: 'name'}
				]
			})
		});
		
		var grid = this.grid = new Ext.grid.GridPanel({
			region: 'center',
			ds: ds,
			cm: cm,
			sm:sm,
			viewConfig: {
				forceFit: true
			},
			tbar: new Ext.Toolbar({
				items: [
			        {
			        	text: '增加用户',
			        	iconCls: 'add',
			        	scope: this,
			        	handler: function() {
			        		if(this.searchForm.collapsed)
			        			this.searchForm.expand();
							else
								this.searchForm.collapse();
			        	}
			        },
			        {
			        	text: '删除',
			        	iconCls: 'del',
			        	scope: this,
			        	handler: function() {
			        		var rs = this.grid.getSelectionModel().getSelected();
			        		this.deleteOrgUser(this.roleId, rs.data.id, rs.data.username);
			        	}
			        }
				]
	        }),
	        bbar: new Ext.PagingToolbar({
				pageSize: 20,
				store: ds,
				displayInfo: true,
				displayMsg: '显示第{0}条到{1}条记录,一共{2}条',
				emptyMsg: '没有记录'
			})
		});
		
		Ext.apply(this, {  
            iconCls: 'tabs',  
            autoScroll: false,  
            closable: true,
            layout: 'border',
            items:[searchForm, grid]
        });
		
		com.ms.basic.RoleUserWin.superclass.initComponent.apply(this, arguments);
	},
	
	initMethod: function() {
	},
	
	addRoleUser: function(roleId, userId, info) {
		Ext.MessageBox.confirm('提示', '确定添加 ' + info + ' ?', function(btn) {
			if(btn != 'yes') {
				return;
			}
			
			Ext.Ajax.request({
				method: 'post',
				url: myApp.ctx + '/basic/UserRoleAction/addRoleUser.action',
				params: {roleId: roleId, userId: userId},
				scope: this,
				success:function(resp){
					var obj=Ext.util.JSON.decode(resp.responseText);
					if(obj.result == 'success') {
						this.grid.getStore().reload();
					}
					else {
						Ext.MessageBox.alert('报错了！！！', '添加失败！！！' + obj.info);
						this.grid.getStore().reload();
					}
					
					this.searchForm.getForm().findField("userName").setValue('');
				}
			});
		},this);
	},
	
	deleteOrgUser: function(roleId, userId, info) {
		Ext.MessageBox.confirm('提示', '确定删除  ' + info + ' ?', function(btn) {
			if(btn != 'yes') {
				return;
			}
			
			Ext.Ajax.request({
				method: 'post',
				url: myApp.ctx + '/basic/UserRoleAction/deleteRoleUser.action',
				params: {roleId: roleId, userId: userId},
				scope: this,
				success:function(resp){
					var obj=Ext.util.JSON.decode(resp.responseText);
					if(obj.result == 'success') {
						this.grid.getStore().reload();
						Ext.MessageBox.alert('提示', '删除成功！');
					}
					else {
						Ext.MessageBox.alert('报错了！！！', '删除失败！！！' + obj.info);
						this.grid.getStore().reload();
					}
				}
			});
		}, this);
	},
	
	loadData: function(roleId) {
		this.roleId = roleId;
		this.grid.getStore().baseParams = {id:roleId};
		this.grid.getStore().load({params: {"extLimit.start":0, "extLimit.limit":20}});
	}
});

