/// <reference path="../superagent.d.ts" />
import superagent = require("superagent");

class Api {
	baseUrl: string = "http://localhost:1337/"
	constructor(uri: string) {
		this.baseUrl = this.baseUrl + uri + '/';
	}
	getAll() {
		return superagent.get(this.baseUrl)
	}
	get(id: number) {
		return superagent.get(this.baseUrl + id)
	}
	post(obj: any) {
		return superagent.post(this.baseUrl).send(obj)
	}
	del(id: number) {
		return superagent.del(this.baseUrl + id)
	}
	put(id: number) {
		return superagent.put(this.baseUrl + id)
	}
}

export = Api;