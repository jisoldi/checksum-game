import * as React from 'react'
import { ComponentType, ReactNode } from 'react'
import './Matrix.css'
import { createRange } from '../../util/range'
import { cellKey } from '../../util/cell'

export type CellComponentProps = { row: number, column: number }

export type ChecksumCellProps = { isRow: boolean, index: number, expanded?: boolean, shrunken?: boolean }

export type Props = {
  size: number,
  expandChecksum: boolean,
  cellComponent: ComponentType<CellComponentProps>
  checksumCellComponent: ComponentType<ChecksumCellProps>
}

export type State = {}

export class Matrix extends React.PureComponent<Props, State> {
  render(): ReactNode {
    const { expandChecksum, size } = this.props
    const CellComponent = this.props.cellComponent
    const ChecksumCellComponent = this.props.checksumCellComponent

    const range = createRange(size)

    const rowClassName = 'row' + (expandChecksum ? ' expanded' : '')

    return (
      <div className="matrix">
        <div className={rowClassName}>
          {range.map(column => (<ChecksumCellComponent key={column} isRow={false} index={column} shrunken={expandChecksum}/>))}
        </div>
        {range.map(row => (
          <div className={rowClassName} key={row}>
            <ChecksumCellComponent isRow={true} index={row} shrunken={expandChecksum}/>
            {range.map(column => (<CellComponent  key={cellKey(row, column)} row={row} column={column}/>))}
            <ChecksumCellComponent isRow={true} index={row} expanded={expandChecksum}/>
          </div>
        ))}
        <div className={rowClassName}>
          {range.map(column => (<ChecksumCellComponent key={column} isRow={false} index={column} expanded={expandChecksum}/>))}
        </div>
      </div>
    )
  }
}
