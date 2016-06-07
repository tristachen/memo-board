import React, { Component, PropTypes } from 'react';
import * as ui from '../constants/ui';

export default class Memo extends Component {
  constructor(props) {
    super(props);
    this.editMemo = this.editMemo.bind(this);
    this.changeType = this.changeType.bind(this);
    this.changeRatio = this.changeRatio.bind(this);
    this.changeText = this.changeText.bind(this);
  }

  editMemo(data) {
    const id = this.props.id;
    this.props.editMemo(id, data);
  }

  changeType(e) {
    this.editMemo({ type: e.currentTarget.value });
  }

  changeRatio(e) {
    this.editMemo({ ratio: e.currentTarget.value });
  }

  changeText(e) {
    this.editMemo({ text: e.currentTarget.value });
  }

  render() {
    const ratio = 'memo--' + this.props.ratio,
          type  = 'memo--' + this.props.type,
          className = 'memo ' + ratio + ' ' + type;

    return (
      <div className={className}>
        <aside className='memo__toolbar'>
          <select className={'memo__select--type btn bg-color-' + this.props.type}
                  onChange={this.changeType}>
            {ui.MEMO_TYPE.map(item => {
              return (
                <option
                  key={item}
                  className={'memo__select--type__option bg-color-' + item}
                  value={item}
                >{item}</option>
              );
            })}
          </select>
          <select className='memo__select--ratio' onChange={this.changeRatio}>
            {ui.MEMO_RATIO.map(item => {
              return (
                <option
                  key={item}
                  className={'memo__select--ratio__option'}
                  value={item}
                >{item}</option>
              );
            })}
          </select>
          <button className='btn'>
            <span className='fa fa-trash' aria-hidden='true'></span>
          </button>
        </aside>
        <section className='memo__container'>
          <textarea
            className='memo__text'
            value={this.props.text}
            onChange={this.changeText}
          ></textarea>
        </section>
      </div>
    );
  }
}
