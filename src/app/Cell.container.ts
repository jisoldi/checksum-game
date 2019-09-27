import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { State, Selectors, Actions } from './redux'
import { Cell, EventProps, ValueProps } from '../ui-components/cell/Cell'
import { CellComponentProps } from '../ui-components/matrix/Matrix'

export type OwnProps = CellComponentProps

const mapState = (state: State, ownProps: OwnProps): ValueProps => ({
  value: Selectors.getValue(ownProps.row, ownProps.column)(state),
})

const mapDispatch = (dispatch: Dispatch, ownProps: OwnProps): EventProps => ({
  onClick: () => dispatch(Actions.toggleCell(ownProps.row, ownProps.column)),
})

export const CellContainer = connect(mapState, mapDispatch)(Cell)