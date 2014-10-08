/// <reference path="../lib/Fayde/Fayde.d.ts" />
/// <reference path="../superagent.d.ts" />
import superagent = require("superagent");
import Table = require("Models/Table");

class MainViewModel extends Fayde.MVVM.ViewModelBase {
	tables: Table[] = [];  
	selectedTable: Table = null;
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

	private _select_table_name_command: Fayde.Input.ICommand = null;
	get SelectTableNameCommand():  Fayde.Input.ICommand {
        if (this._select_table_name_command === null) {
            this._select_table_name_command = new Fayde.MVVM.RelayCommand(
                (obj) => this.SelectTableName(obj),
                () => true);
        }
        return this._select_table_name_command;
    }

    SelectTableName(obj: any) {
    	this.selectedTable = obj.parameter;
    }

}
Fayde.MVVM.NotifyProperties(MainViewModel, ["tables", "selectedTable"]);

export = MainViewModel;