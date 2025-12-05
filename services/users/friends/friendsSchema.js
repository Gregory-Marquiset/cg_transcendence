import * as friendsController from './friendsController.js'

export const sendFriendRequestOpts = {
	schema: {
		response: {
			201: {
				type: "object",
				properties: {
					sender_id: { type: "integer" },
					receiver_id: { type: "integer" },
					status: { type: "string" }
				}
			}
		}
	},
	handler: friendsController.sendFriendsRequest
}
