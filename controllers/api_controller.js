const burger = require('../models/burgers.js');

exports.total = function(req, res) {
	burger.all(function(data) {
		var hbsObject = {
			burgers: data,
		};
		console.log(hbsObject);
		res.json(hbsObject);
	});
};

exports.new = function(req, res) {
	burger.create(['name', 'devoured'], [req.body.name, req.body.devoured], function(result) {
		// Send back the ID of the new quote
		res.json({ id: result.insertId });
	});
};

exports.destroy = function(req, res) {
	var condition = 'id = ' + req.params.id;
	burger.delete(condition, function(result) {
		if (result.affectedRows == 0) {
			// If no rows were changed, then the ID must not exist, so 404
			return res.status(404).end();
		} else {
			res.status(200).end();
		}
	});
};
exports.change = function(req, res) {
	var condition = 'id = ' + req.params.id;
	console.log('condition', condition);
	burger.update(
		{
			devoured: req.body.devoured,
		},
		condition,
		function(result) {
			if (result.changedRows == 0) {
				// If no rows were changed, then the ID must not exist, so 404
				return res.status(404).end();
			} else {
				res.status(200).end();
			}
		}
	);
};
exports.nameChange = function(req, res) {
	var condition = 'id = ' + req.params.id;
	console.log('condition', condition);
	burger.update(
		{
			name: req.body.name,
		},
		condition,
		function(result) {
			if (result.changedRows == 0) {
				// If no rows were changed, then the ID must not exist, so 404
				return res.status(404).end();
			} else {
				res.status(200).end();
			}
		}
	);
};
