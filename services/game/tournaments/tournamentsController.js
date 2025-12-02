import { tournamentsItems } from "../data/testTournamentsItems.js";
import hyperid from 'hyperid'

const getTournamentsItems = async function (req, reply) {
	reply.send(tournamentsItems);
}

const getTournamentItem = async function (req, reply) {
	const {id} = req.params;

	const tournamentItem = tournamentsItems.find(tournamentItem => tournamentItem.id === id)

	reply.send(tournamentItem);
}

const createTournamentItem = async function (req, reply) {
	const instance = hyperid({urlSafe: true});
	const new_id = instance();
	const now = new Date();
	const dateTime = `${now.getDate()}-${now.getMonth()}-${now.getFullYear()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;

	let newTournament = {
		id: new_id,
		status: "created",
		startDate: dateTime
	}

	tournamentsItems.push(newTournament);
	reply.code(201).send(newTournament);
}

export { getTournamentsItems, getTournamentItem, createTournamentItem };
