const { h } = require('hyperapp')
const select = require('select')
const copy = require('copy-to-clipboard')
const notify = require('tiny-toast')
const css = require('insert-css')

module.exports = TeamSplit

function teamColor (team) {
  return [, 'red', 'blue'][team] || 'white'
}

css(`
  body .tinyToast {
    background: #fff;
    border-color: #f00;
    color: #f00;
  }
`)

function TeamSplit ({ players }) {
  const onclick = (e) => {
    select(e.target)
    if (players.length >= 2) {
      copy(players.map((p) => p.team).join(' '))
      notify.show('Copied to clipboard.').hide(3000)
    }
  }

  return (
    <div class="mt3">
      <p class="pa2 ma0">Teams for easy copying:</p>

      <p class="pa2 br2 b--light-red ba ma0 bg-near-black" onclick={onclick}>
        {players.length ? players.map((p) =>
          <span class={teamColor(p.team)}>{p.team || '-'} </span>
        ) : 'Nothing yet'}
      </p>
    </div>
  )
}
