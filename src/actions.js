exports.add = (model) => ({
  players: model.players.concat([ model.newPlayer ]),
  newPlayer: {}
})

exports.setAddingName = (model, name) => ({
  newPlayer: {
    ...model.newPlayer,
    name
  }
})

exports.setAddingElo = (model, elo) => ({
  newPlayer: {
    ...model.newPlayer,
    elo
  }
})
