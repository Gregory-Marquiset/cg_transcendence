import * as tournamentsController from "./tournamentsController.js"

export const getTournamentsOpts = {
	schema: {
		response: {
			200: {
				type: "array",
				tournaments: {
					type: "object",
					properties: {
						id: {type: "string"},
						status: {type: "string"},
						startDate: {type: "string"}
					}
				}
			}
		}
	},
	handler:  tournamentsController.getTournamentsItems
}

export const getTournamentOpts = {
	schema: {
		response: {
			200: {
				type: "object",
				properties: {
					id: {type: "string"},
					status: {type: "string"},
					startDate: {type: "string"}
				}
			}
		}
	},
	handler: tournamentsController.getTournamentItem
}

export const createTournamentOpts = {
	schema: {
		// body: {
		// 	type: "object",
		// 	required: ["id", "name", "status", "startDate"],
		// 	properties: {
		// 			id: {type: "string"},
		// 			status: {type: "string"},
		// 			startDate: {type: "string"}
		// 	}
		// },
		response: {
			201: {
				type: "object",
				properties: {
					id: {type: "string"},
					status: {type: "string"},
					startDate: {type: "string"}
				}
			}
		}
	},
	handler: tournamentsController.createTournamentItem
}
