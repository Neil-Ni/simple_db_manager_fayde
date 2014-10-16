/**
 * ColumnsController
 *
 * @description :: Server-side logic for managing columns
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	find: function (req, res) {
		if (req.query.table === "Users") {
			res.send([{ name: "id"}, { name: "First Name"}, { name: "Last Name"}, { name: "Email"}])
		} else {
			res.send([]);
		}
	}
};

