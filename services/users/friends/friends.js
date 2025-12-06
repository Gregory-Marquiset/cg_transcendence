import * as friendsOpts from './friendsSchema.js'

async function friendsRoutes(app, options) {
	app.post('/friends/:targetId', { onRequest: [app.authenticate], ...friendsOpts.sendFriendRequestOpts });

	app.patch('/friends/:senderId', { onRequest: [app.authenticate], ...friendsOpts.manageFriendRequestOpts });
}

export { friendsRoutes };
