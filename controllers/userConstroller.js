const { User } = require('../models');

async function getUsers(req, res) {
	try {
		const users = await User.findAll();
		res.send(users);
	} catch (err) {
		res.status(400).send({
			error: `Eerror during getting users`
		});
	}
}

async function getUserById(req, res, next) {
	const user = await User.findById(req.params.id);
	if(!user) {
		return res.status(400).send({
			error: `Eerror during getting user by id`
		});
	}
	res.send(user);	
}

async function updatUser(req, res, next) {
	const user = await User.findById(req.params.id);
	if(!user) {
		return res.status(400).send({
			error: `Eerror during getting user by id`
		});
	}
	user.password = req.body.password;
	await user.save();
	res.send(user);	
}

async function deleteUser(req, res, next) {
	const user = await User.findById(req.params.id);
	if(!user) {
		return res.status(400).send({
			error: `Eerror during getting user by id`
		});
	}
	await user.destroy();
	console.log("User "+user.email+" deleted with success ");
	res.send(user);
}


module.exports = { getUsers, getUserById, updatUser, deleteUser };