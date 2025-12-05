import { httpError } from "../usersServer.js";
import { getRowFromDB, runSql } from '../../utils/sqlFunction.js'


export const sendFriendsRequest = async function (req, reply) {
	
	try {
		if (req.params === req.user.id)
			throw httpError(400, "Can't add yourself as friend");
		const searchForTarget = await getRowFromDB('SELECT id FROM users WHERE id = ?', [req.params]);
		if (!searchForTarget)
			throw httpError(404, "User not found");
		const searchForFriendship = getRowFromDB('SELECT * FROM friendships WHERE (sender_id = ? AND receiver_id = ?) OR (sender_id = ? AND receiver_id = ?)',
			[req.user.id, req.params, req.params, req.user.id]);
		if (searchForFriendship?.status === "pending")
			throw httpError(400, "Friend request already sent");
		else if (searchForFriendship?.status === "accepted")
			throw httpError(400, "You are already friends");
		else if (searchForFriendship?.status === "blocked")
			throw httpError(401, "Unhautorized");
		else if (searchForFriendship?.status === "refused")
		{
			const date = new Date().toISOString();
			await runSql('UPDATE friendships SET status = ?, updated_at = ? WHERE (sender_id = ? AND receiver_id = ?) OR (sender_id = ? AND receiver_id = ?)',
				["pending", date, req.user.id, req.params, req.params, req.user.id]);
			return (reply.code(201).send({ sender_id: req.user.id, receiver_id: req.params, status: "pending" }));
		}

		const date = new Date().toISOString();
		await runSql(`INSERT INTO friendships(sender_id, receiver_id, status, created_at, updated_at)
			VALUES (?, ?, ?, ?, ?)`, [req.user.id, req.params, "pending", date, date]);
		return (reply.code(201).send({ sender_id: req.user.id, receiver_id: req.params, status: "pending" }));
	} catch (err)
	{
		console.error(`\nERROR sendFriendsRequest: ${err.message}\n`);
		if (err.statusCode)
			throw err;
		err.statusCode = 500;
		throw err;
	}
}
