import * as React from 'react'
import { ReactNode } from 'react'
import './Cell.css'

export type ValueProps = {
  value: boolean,
  row: number,
  column: number
}

export type EventProps = {
  onClick: () => void
}

export type Props = ValueProps & EventProps

export class Cell extends React.PureComponent<Props> {
  render(): ReactNode {
    return (
      <div
        className={'cell ' + (this.props.value ? 'style1' : 'style2')}
        onClick={this.props.onClick}>
        <p className={"cellP"}>
        {    String.fromCharCode(96 + this.props.column +1).toUpperCase()} - {this.props.row+1}
        </p>
      </div>
    )
  }
}
