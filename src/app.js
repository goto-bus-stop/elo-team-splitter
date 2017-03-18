const { h, app } = require('hyperapp')
const css = require('sheetify')

css('tachyons')

function PlayerRow ({ name, elo }) {
  return (
    <tr class="table-stripe">
      <td>{name}</td>
      <td>{elo}</td>
      <td>-</td>
    </tr>
  )
}

function AddPlayerRow ({ addingPlayer, onAdd, onNameInput, onEloInput }) {
  function onKeyDown (event) {
    if (event.code === 'Enter') {
      onAdd()
      // Focus first input.
      const tr = event.target.parentNode.parentNode
      tr.querySelector('input').focus()
    }
  }

  return (
    <tr>
      <td>
        <input
          type="text"
          value={addingPlayer.name || ''}
          oninput={(e) => onNameInput(e.target.value)}
          onkeydown={onKeyDown}
        />
      </td>
      <td>
        <input
          type="number"
          value={addingPlayer.elo || ''}
          oninput={(e) => onEloInput(e.target.value)}
          onkeydown={onKeyDown}
        />
      </td>
      <td>
        <button onClick={onAdd}>+</button>
      </td>
    </tr>
  )
}

function PlayerTable ({ players, addingPlayer, onAdd, onNameInput, onEloInput }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Player</th>
          <th>ELO</th>
          <th>Team</th>
        </tr>
      </thead>
      <tbody>
        {players.map(PlayerRow)}
      </tbody>
      <tfoot>
        <AddPlayerRow
          addingPlayer={addingPlayer}
          onAdd={onAdd}
          onNameInput={onNameInput}
          onEloInput={onEloInput}
        />
      </tfoot>
    </table>
  )
}

app({
  model: {
    players: [],
    newPlayer: {}
  },
  actions: {
    add: (model) => ({
      players: model.players.concat([ model.newPlayer ]),
      newPlayer: {}
    }),

    setAddingName: (model, name) => ({
      newPlayer: {
        ...model.newPlayer,
        name
      }
    }),
    setAddingElo: (model, elo) => ({
      newPlayer: {
        ...model.newPlayer,
        elo
      }
    })
  },
  view: (model, actions) => (
    <div>
      <h1>Team Splitter</h1>
      <p>
        Add players and their Elo ratings below.
      </p>
      <PlayerTable
        players={model.players}
        addingPlayer={model.newPlayer}
        onNameInput={actions.setAddingName}
        onEloInput={actions.setAddingElo}
        onAdd={actions.add}
      />
    </div>
  )
})
