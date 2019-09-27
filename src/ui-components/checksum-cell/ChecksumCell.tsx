import * as React from 'react'
import { ReactNode } from 'react'
import './ChecksumCell.css'

export type ValueProps = {
  isRow: boolean
  value: boolean
  expanded?: boolean
  shrunken?: boolean
}

export type EventProps = {}

export type Props = ValueProps & EventProps

export class ChecksumCell extends React.PureComponent<Props> {

  render(): ReactNode {
    const className = 'checksum-cell ' +
      (this.props.value ? 'style1' : 'style2') + ' ' +
      (this.props.isRow ? 'is-row' : 'is-column') + ' ' +
      (!!this.props.shrunken ? 'shrunken' : '') + ' ' +
      (!!this.props.expanded ? 'expanded' : '')
    return (
      <div className={className}/>
    )
  }
}