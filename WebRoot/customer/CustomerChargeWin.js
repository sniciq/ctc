Ext.namespace('com.ms.customer.CustomerChargeWin');
com.ms.customer.CustomerChargeWin=Ext.extend(Ext.Window, {
	initComponent: function() {
		this.roleId = 0;
		
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
			{header:'付款日期', dataIndex:'id', sortable:true, width: 60},
			{header:'金额', dataIndex:'name', sortable:true},
			{header:'付款单号', dataIndex:'username', sortable:true, width: 60},
			{header:'到期日期', dataIndex:'usertype', sortable:true, width: 60}
		]);
		
		var ds = new Ext.data.Store({
			proxy: new Ext.data.HttpProxy({url: '../basic/UserRoleAction/getRoleUsers.action'}),
			remoteSort: false,
			sortInfo: {
				field: 'id',
				direction: 'DESC'
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
			        	text: '增加',
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
			        	text: '修改',
			        	iconCls: 'del',
			        	scope: this,
			        	handler: function() {
			        	}
			        },
			        {
			        	text: '删除',
			        	iconCls: 'del',
			        	scope: this,
			        	handler: function() {
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
            iconCls: 'add',  
            autoScroll: false,  
            closable: true,
            layout: 'border',
            items:[searchForm, grid]
        });
		
		com.ms.customer.CustomerChargeWin.superclass.initComponent.apply(this, arguments);
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

