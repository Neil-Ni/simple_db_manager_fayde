/// <reference path="../lib/Fayde/Fayde.d.ts" />

import Table = require("Models/Table");
import Api = require("Helpers/Api");

class MainViewModel extends Fayde.MVVM.ViewModelBase {
	tables: Fayde.Collections.ObservableCollection<Table> = new Fayde.Collections.ObservableCollection<Table>();
	selectedTable: Table = null;
	newTableName: string = "";
	tableApi: Api = null;
	constructor() {
		super();
		this.tableApi = new Api('tables');
		this.load()
	}
	load() {
		this.tableApi.getAll()
			.end((err, res) => {
				for (var x=0; x < res.body.length; x++) {
					var table = new Table();
					table.id = res.body[x].id;
					table.name = res.body[x].name;
					this.tables.Add(table);
				}
			});
	}

	SelectTableName(obj: any) {
		this.selectedTable = obj.parameter;
	}

	AddClass() {

	}

	CreateTable() {
		var table = new Table();
		table.name = this.newTableName;
		this.tableApi.post(table)
			.end((err, res) => {
				if (!err) {
					this.newTableName = "";
					table.id = res.body.id;
					this.tables.Add(table);
				}
			})
	}

	CancelTable() {
		this.newTableName = "";
	}

	DeleteTable() {
		if (!this.selectedTable || !this.selectedTable.id) return;
		this.tableApi.del(this.selectedTable.id)
			.end((err, res) => {
				var index = this.tables.IndexOf(this.selectedTable);
				if (index > -1) {
					this.tables.RemoveAt(index);
				}
			})
	}

}
Fayde.MVVM.NotifyProperties(MainViewModel, ["tables", "selectedTable", "newTableName"]);

export = MainViewModel;