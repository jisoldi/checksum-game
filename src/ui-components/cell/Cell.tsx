import * as React from 'react'
import { ReactNode } from 'react'
import './Cell.css'

export type ValueProps = {
  value: boolean
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
        onClick={this.props.onClick}
      />
    )
  }
}