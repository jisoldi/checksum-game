import { connect } from 'react-redux'
import { Selectors, State } from './redux'
import { Matrix, Props } from '../ui-components/matrix/Matrix'
import { CellContainer } from './Cell.container'
import { ChecksumCellContainer } from './ChecksumCell.container'

const mapState = (state: State): Props => ({
  size: Selectors.getSize(state),
  cellComponent: CellContainer,
  checksumCellComponent: ChecksumCellContainer,
  expandChecksum: Selectors.isExpanded(state),
})


export const MatrixContainer = connect(mapState)(Matrix)