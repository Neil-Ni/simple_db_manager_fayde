/// <reference path="../lib/Fayde/Fayde.d.ts" />
/// <reference path="../superagent.d.ts" />
import superagent = require("superagent");
import Table = require("Models/Table");

class MainViewModel extends Fayde.MVVM.ViewModelBase {
	tables: Table[] = [];  
	selectedTable: Table = null;
	newTableName: string = "";
	constructor() {
		super();
		this.load()
	}
	load() {
		superagent
			.get('http://localhost:1337/tables')
			.end((err, res) => {
				this.tables = res.body;
			});
	}

    SelectTableName(obj: any) {
    	this.selectedTable = obj.parameter;
    }

    CreateTableName() {
    	this.newTableName = "";
    }

    CancelTableName() {
    	this.newTableName = "";
    }

}
Fayde.MVVM.NotifyProperties(MainViewModel, ["tables", "selectedTable", "newTableName"]);

export = MainViewModel;