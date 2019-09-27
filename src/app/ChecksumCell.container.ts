import { connect } from 'react-redux'
import { Selectors, State } from './redux'
import { ChecksumCell, ValueProps } from '../ui-components/checksum-cell/ChecksumCell'
import { ChecksumCellProps } from '../ui-components/matrix/Matrix'

export type OwnProps = ChecksumCellProps

const mapState = (state: State, ownProps: OwnProps): ValueProps => ({
  isRow: ownProps.isRow,
  value: ownProps.isRow ?
    Selectors.getRowChecksumValue(ownProps.index)(state) : Selectors.getColumnChecksumValue(ownProps.index)(state),
  expanded: ownProps.expanded,
  shrunken: ownProps.shrunken,
})

export const ChecksumCellContainer = connect(mapState)(ChecksumCell)