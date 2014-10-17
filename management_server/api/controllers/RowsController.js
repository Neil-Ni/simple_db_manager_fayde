/**
 * RowsController
 *
 * @description :: Server-side logic for managing rows
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
    find: function (req, res) {
        //TODO: in the future forward the request to accept
        if (req.query.table) {
			Rows.find({ table: req.query.table}, function(err, models) {
				if (err)	return res.json({ err: err }, 500);
				res.json(models);
			})
		} else {
			Rows.find().exec(function(err, models) {
				if (err)	return res.json({ err: err }, 500);
				res.json(models);
			})
		}
    },
    create: function (req, res) {
    	if (!req.body.table) {
    		res.send("Missing table name", 401);
    	} else {
    		Rows.create({table: req.body.table, row: req.body.row || []}, function(err, model) {	
    			if(err) return res.json({ err: err }, 500);
    			res.json(model);
  			});
    	}
    }
};

