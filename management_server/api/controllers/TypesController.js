/**
 * TypesController
 *
 * @description :: Server-side logic for managing types
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	find: function (req, res) {
		res.send([ "number", "string" ]);
    }	
};

