const { h, app } = require('hyperapp')
const css = require('sheetify')
const PlayerTable = require('./PlayerTable')
const TeamSplit = require('./TeamSplit')

css('tachyons')

app({
  model: require('./model'),
  actions: require('./actions'),
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
        onAdd={both(actions.add, actions.compute)}
      />
      <TeamSplit players={model.players} />
    </div>
  )
})

function both (action1, action2) {
  return () => {
    action1()
    action2()
  }
}
