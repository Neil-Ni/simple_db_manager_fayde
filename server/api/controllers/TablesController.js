/**
 * TablesController
 *
 * @description :: Server-side logic for managing tables
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	find: function (req, res) {
		res.send([ { name: "a" }, { name: "b"} , { name:"c"}]);
    }
};

