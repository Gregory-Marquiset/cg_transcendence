async function healthRoute (app, options) {
	app.get('/health', async (req, reply) =>{
		return ({ status: "ok"});
	});
}

async function ping(app, options) {
	app.get('/api/ping', async(req, reply) =>
	{
		return ({ pong: true});
	});
}


export { healthRoute, ping };
