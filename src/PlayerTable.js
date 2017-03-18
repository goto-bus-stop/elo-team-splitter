const { h } = require('hyperapp')

module.exports = PlayerTable

function teamColor (team) {
  return [, 'red', 'blue'][team] || 'white'
}

function PlayerRow ({ name, elo, team = '-' }) {
  return (
    <tr class="stripe-dark">
      <td class="pa2">{name}</td>
      <td class="pa2">{elo}</td>
      <td class={`pa2 tc b ${teamColor(team)}`}>{team}</td>
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
      <td class="pa1">
        <input
          class="ba br2 b--light-red pa2"
          type="text"
          autofocus
          placeholder="Name"
          value={addingPlayer.name || ''}
          oninput={(e) => onNameInput(e.target.value)}
          onkeydown={onKeyDown}
        />
      </td>
      <td class="pa1">
        <input
          class="ba br2 b--light-red pa2"
          type="number"
          placeholder="Elo Rating"
          value={addingPlayer.elo || ''}
          oninput={(e) => onEloInput(e.target.value)}
          onkeydown={onKeyDown}
        />
      </td>
      <td class="pa1 tc">
        <button
          class="ba br2 b--light-red pa2 pointer w-100"
          onClick={onAdd}
        >
          Add
        </button>
      </td>
    </tr>
  )
}

function PlayerTable ({ players, addingPlayer, onAdd, onNameInput, onEloInput }) {
  return (
    <table>
      <thead>
        <tr>
          <th class="tl pa2">Player</th>
          <th class="tl pa2">Elo Rating</th>
          <th class="tl pa2">Team</th>
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
