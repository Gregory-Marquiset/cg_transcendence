import * as tournamentOpts from "./tournamentsSchemas.js";

async function tournamentsRoutes(app, options) {
	
	app.get('/game/tournaments', tournamentOpts.getTournamentsOpts);

	app.get('/game/tournaments/:id', tournamentOpts.getTournamentOpts);

	app.post('/game/tournaments/create', tournamentOpts.createTournamentOpts);
}

export { tournamentsRoutes };
