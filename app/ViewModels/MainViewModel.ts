/// <reference path="../lib/Fayde/Fayde.d.ts" />
/// <reference path="../superagent.d.ts" />
import superagent = require("superagent");

class MainViewModel extends Fayde.MVVM.ViewModelBase {
	task: string; 
	constructor() {
		super();
		superagent
			.get('/search')
			.end(function(res){
				console.log(res);
			});
		this.task = "hi";
	}
}
Fayde.MVVM.NotifyProperties(MainViewModel, ["task"]);

export = MainViewModel;