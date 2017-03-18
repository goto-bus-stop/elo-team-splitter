const { h, app } = require('hyperapp')

app({
  model: {},
  view: (model) => (
    <div>
      <h1>Team Splitter</h1>
      <p>
        Add players and their Elo ratings below.
      </p>
    </div>
  )
})
