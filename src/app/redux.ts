import { ActionType, createAction, createReducer } from 'typesafe-actions'
import { cellKey } from '../util/cell'

export const Actions = {
  toggleCell: createAction(
    'Checksum/Matrix/ToggleCell',
    action => (row: number, column: number) => action({ row, column })
  ),
  changeSize: createAction('Checksum/Matrix/ChangeSize', action => (size: number) => action({ size })),
  freeze: createAction('Checksum/Matrix/Freeze'),
  toggleFreeze: createAction('Checksum/Matrix/ToggleFreeze'),
  toggleExpand: createAction('Checksum/Matrix/ToggleExpand'),
  reset: createAction('Checksum/Matrix/Reset'),
}

export type Action = ActionType<typeof Actions>

export type MatrixValues = Readonly<{ [key: string]: boolean }>

export type State = Readonly<{
  size: number
  expanded: boolean,
  freezeChecksum: boolean,
  matrixValues: MatrixValues
  rowsChecksumValues: boolean[]
  columnsChecksumValues: boolean[]
}>

export const InitialState = {
  size: 5,
  expanded: false,
  freezeChecksum: false,
  matrixValues: {},
  rowsChecksumValues: [],
  columnsChecksumValues: [],
}

const calcRowChecksumValues = (matrix: MatrixValues, size: number, row: number): boolean => {
  let count = 0
  for (let i = 0; i < size; i++) {if (matrix[cellKey(row, i)]) count = count + 1}
  return count % 2 !== 0
}

const calcRowsChecksumValues = (matrix: MatrixValues, size: number): boolean[] => {
  const array: boolean[] = Array(size)

  for (let i = 0; i < size; i++) {array[i] = calcRowChecksumValues(matrix, size, i)}

  return array
}

const calcColumnChecksumValues = (matrix: MatrixValues, size: number, column: number): boolean => {
  let count = 0
  for (let i = 0; i < size; i++) {if (matrix[cellKey(i, column)]) count = count + 1}
  return count % 2 !== 0
}

const calcColumnsChecksumValues = (matrix: MatrixValues, size: number): boolean[] => {
  const array: boolean[] = Array(size)

  for (let i = 0; i < size; i++) {array[i] = calcColumnChecksumValues(matrix, size, i)}

  return array
}

export const reducer = createReducer<State, Action>(InitialState)
  .handleAction(Actions.toggleCell, (state, action) => {
    const { row, column } = action.payload
    const newMatrixValues = { ...state.matrixValues, [cellKey(row, column)]: !Selectors.getValue(row, column)(state) }

    return {
      ...state,
      matrixValues: newMatrixValues,
      rowsChecksumValues: state.freezeChecksum ? state.rowsChecksumValues : calcRowsChecksumValues(newMatrixValues, state.size),
      columnsChecksumValues: state.freezeChecksum ? state.columnsChecksumValues : calcColumnsChecksumValues(newMatrixValues, state.size),
    }
  })
  .handleAction(Actions.changeSize, (state, action) => {
    return {
      ...state,
      size: action.payload.size,
      rowsChecksumValues: calcRowsChecksumValues(state.matrixValues, action.payload.size),
      columnsChecksumValues: calcColumnsChecksumValues(state.matrixValues, action.payload.size),
    }
  })
  .handleAction(Actions.toggleFreeze, state => {
    return {
      ...state,
      freezeChecksum: !state.freezeChecksum,
      rowsChecksumValues: !state.freezeChecksum ? state.rowsChecksumValues : calcRowsChecksumValues(state.matrixValues, state.size),
      columnsChecksumValues: !state.freezeChecksum ? state.columnsChecksumValues : calcColumnsChecksumValues(state.matrixValues, state.size),
    }
  })
  .handleAction(Actions.freeze, state => ({...state, freezeChecksum: true}))
  .handleAction(Actions.toggleExpand, state => ({...state, expanded: !state.expanded}))
  .handleAction(Actions.reset, () => InitialState)

export const Selectors = {
  getValue: (row: number, column: number) => (state: State) => !!state.matrixValues[cellKey(row, column)],
  getRowChecksumValue: (row: number) => (state: State) => state.rowsChecksumValues[row],
  getColumnChecksumValue: (column: number) => (state: State) => state.columnsChecksumValues[column],
  isChecksumFrozen: (state: State) => state.freezeChecksum,
  isExpanded: (state: State) => state.expanded,
  getSize: (state: State) => state.size,
}