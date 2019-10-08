import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { State, Selectors, Actions } from './redux'
import { App, EventProps, ValueProps } from './App'

const mapState = (state: State): ValueProps => ({
  isFrozen: Selectors.isChecksumFrozen(state),
  size: Selectors.getSize(state),
  expanded: Selectors.isExpanded(state),
})

const mapDispatch = (dispatch: Dispatch): EventProps => ({
  onFreezeToggle: () => dispatch(Actions.toggleFreeze()),
  onExpandToggle: () => dispatch(Actions.toggleExpand()),
  onReset: () => dispatch(Actions.reset()),
  onSizeChange: size => dispatch(Actions.changeSize(size)),
  onRandomClick: () => {dispatch(Actions.randomize())}
})

export const AppContainer = connect(mapState, mapDispatch)(App)
