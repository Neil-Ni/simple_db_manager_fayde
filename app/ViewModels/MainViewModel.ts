/// <reference path="../lib/Fayde/Fayde.d.ts" />
/// <reference path="../superagent.d.ts" />
import superagent = require("superagent");

class MainViewModel extends Fayde.MVVM.ViewModelBase {
	task: string; 
	constructor() {
		super();
		superagent
			.get('http://localhost:1337/tables')
			.end(function(err, res){
				this.task = res.body[0];
			});
	}
}
Fayde.MVVM.NotifyProperties(MainViewModel, ["task"]);

export = MainViewModel;