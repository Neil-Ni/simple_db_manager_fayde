/// <reference path="../lib/Fayde/Fayde.d.ts" />

import Table = require("Models/Table");
import Column = require("Models/Column");
import Row = require("Models/Row");
import Api = require("Helpers/Api");

class MainViewModel extends Fayde.MVVM.ViewModelBase {
	tables = new Fayde.Collections.ObservableCollection<Table>();
	columns = new Fayde.Collections.ObservableCollection<string>();
	rows = new Fayde.Collections.ObservableCollection<any>();
	selectedTable: Table = null;
	newTableName: string = "";
	tablesApi: Api = null;
	columsApi: Api = null;
	rowsApi: Api = null;

	constructor() {
		super();
		this.tablesApi = new Api('tables');
		this.columsApi = new Api('columns');
		this.rowsApi = new Api('rows');
		this.load()
	}
	load() {
		this.tablesApi.getAll()
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
		this.columns.Clear();
		this.rows.Clear();
		this.columsApi.query({table : this.selectedTable.name})
			.end((err, res) => {
				for (var x=0; x < res.body.length; x++) {
					this.columns.Add(res.body[x].name);
				}
			});
		this.rowsApi.query({table : this.selectedTable.name})
			.end((err, res) => {
				for (var x=0; x < res.body.length; x++) {
					var row = {};
					var data = res.body[x].row[0];
					for (var key in data) {
						row[key] = data[key];
					}
					row["id"] = res.body[x].id;
					this.rows.Add(row);
				}
			});
	}

	RemoveRow (args: Fayde.IEventBindingArgs<Fayde.RoutedEventArgs>) {
		if (!args.parameter)	return;
		var row = args.parameter;
		this.rowsApi.del(row.id)
			.end((err, res) => {
				this.rows.Remove(row);
			});
	}

	CreateTable() {
		var table = new Table();
		table.name = this.newTableName;
		this.tablesApi.post(table)
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
		this.tablesApi.del(this.selectedTable.id)
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