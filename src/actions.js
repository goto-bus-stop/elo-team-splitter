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

exports.compute = ({ players }) => (
  players.length >= 2
    ? { players: splitPlayers(players) }
    : {}
)

function combinations (arr, k) {
  const ret = []
  for (let i = 0; i < arr.length; i++) {
    if (k === 1) {
      ret.push([ arr[i] ])
    } else {
      const sub = combinations(arr.slice(i + 1), k - 1)
      for (let subI = 0; subI < sub.length; subI++) {
        const next = [arr[i], ...sub[subI]]
        ret.push(next)
      }
    }
  }
  return ret
}

function splitPlayers (players) {
  let leastDiff = Infinity
  let current

  const firstTeamCombos = combinations(players, Math.floor(players.length / 2))

  for (let i = 0; i < firstTeamCombos.length; i++) {
    const thisTeam = firstTeamCombos[i]

    const thisTeamRate = thisTeam.reduce((r, p) => r + p.elo, 0)
    const otherTeamRate = players.reduce((r, p) => {
      if (includes(thisTeam, p)) return r
      return r + p.elo
    }, 0)

    if (otherTeamRate === thisTeamRate) {
      current = thisTeam
      break
    }
    const diff = Math.abs(otherTeamRate - thisTeamRate)
    if (diff < leastDiff) {
      leastDiff = diff
      current = thisTeam
    }
  }

  return players.map((p) => ({
    ...p,
    team: includes(current, p) ? 1 : 2
  }))
}

function includes (arr, x) {
  return arr.indexOf(x) !== -1
}
