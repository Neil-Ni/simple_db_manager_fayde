/// <reference path="../lib/Fayde/Fayde.d.ts" />

import Table = require("Models/Table");
import Api = require("Helpers/Api");

class MainViewModel extends Fayde.MVVM.ViewModelBase {
	tables: Table[] = [];  
	selectedTable: Table = null;
	newTableName: string = "";
	tableApi: Api = null;
	constructor() {
		super();
		this.tableApi = new Api('tables');
		this.load()
	}
	load() {
		this.tables = [];
		this.tableApi.getAll()
			.end((err, res) => {
				this.tables = res.body;
			});
	}

    SelectTableName(obj: any) {
    	this.selectedTable = obj.parameter;
    }

    CreateTable() {
    	this.tableApi.post({name: this.newTableName})
    		.end((err, res) => {
    			if (!err) {
    				this.newTableName = "";
    				this.load();
    			}
    		})
    }

    CancelTable() {
    	this.newTableName = "";
    }

    DeleteTable() {
    	if (!this.selectedTable.id) return;
    	this.tableApi.del(this.selectedTable.id)
    		.end((err, res) => {
    			if (!err) {
    				this.load();
    			}
    		})
    }

}
Fayde.MVVM.NotifyProperties(MainViewModel, ["tables", "selectedTable", "newTableName"]);

export = MainViewModel;