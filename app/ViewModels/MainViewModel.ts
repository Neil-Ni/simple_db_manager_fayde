/// <reference path="../lib/Fayde/Fayde.d.ts" />

import Table = require("Models/Table");
import Column = require("Models/Column");
import Row = require("Models/Row");
import Api = require("Helpers/Api");

class MainViewModel extends Fayde.MVVM.ViewModelBase {
	tables = new Fayde.Collections.ObservableCollection<Table>();
	columns = new Fayde.Collections.ObservableCollection<string>();
	rows = new Fayde.Collections.ObservableCollection<Row>();
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
				var row = new Row();
				var cols = [];
				for (var x=0; x < res.body.length; x++) {
					var column = new Column();
					column.name = res.body[x].name;
					cols.push(column);
					this.columns.Add(res.body[x].name);
				}
				row.columns = cols;
        row["id"] = 2;
        row["First Name"] = "Brad";
        row["Last Name"] = "SIckles";
        row["Email"] = "bs@bs.com";
				var row2 = new Row();
				row2.columns = cols;
				this.rows.Add(row);
				this.rows.Add(row2);
			})
	}

	AddClass() {

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