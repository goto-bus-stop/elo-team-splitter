const { h } = require('hyperapp')

module.exports = PlayerTable

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
