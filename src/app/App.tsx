import React, { ChangeEvent, ReactNode } from 'react'
import './App.css'
import { MatrixContainer } from './Matrix.container'

export type ValueProps = {
  size: number
  isFrozen: boolean
  expanded: boolean
}

export type EventProps = {
  onSizeChange: (size: number) => void
  onFreezeToggle: () => void
  onExpandToggle: () => void
  onReset: () => void
}

export type Props = ValueProps & EventProps

export class App extends React.PureComponent<Props> {
  render(): ReactNode {
    const { size, onReset, isFrozen, expanded, onFreezeToggle, onExpandToggle } = this.props

    return (
      <div className="app">
        <div className="button-panel">
          <select name="size" id="size" onChange={this.handleSizeChangeRef} value={size}>
            <option value={2}>2x2</option>
            <option value={3}>3x3</option>
            <option value={4}>4x4</option>
            <option value={5}>5x5</option>
            <option value={6}>6x6</option>
            <option value={7}>7x7</option>
          </select>
          <button onClick={onFreezeToggle}>{isFrozen ? 'Stop' : 'Start'}</button>
          <button onClick={onReset}>Reset</button>
          <button onClick={onExpandToggle}>{expanded ? 'Shrink' : 'Expand'}</button>
        </div>
        <div className="matrix-panel">
          <MatrixContainer/>
        </div>
      </div>
    )
  }

  private handleSizeChangeRef = this.handleSizeChange.bind(this)
  private handleSizeChange(event: ChangeEvent<HTMLSelectElement>) {
    this.props.onSizeChange(parseInt(event.target.value))
  }
}
