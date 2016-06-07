import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ui from '../constants/ui';
import * as actions from '../actions';
import Memo from '../components/memo';
import { Link } from 'react-router';

class App extends Component {
  constructor(props) {
    super(props);
    this.addMemo = this.addMemo.bind(this);
  }

  addMemo() {
    const type = this.props.params.type || ui.MEMO_TYPE[0];
    this.props.actions.addMemo(type);
  }

  render() {
    const typeFilter = this.props.params.type;
    return (
      <div className='memo-board'>
        <div className='memo-board__memos'>
          {this.props.memos.map(memo => {
            const isVisible = typeFilter ? memo.type === typeFilter : true;
            return ( isVisible &&
              <Memo {...memo}
                key={memo.id}
                editMemo={this.props.actions.editMemo}
              ></Memo>
            );
          })}
        </div>
        <aside className='memo-board__toolbar'>
          <button className='btn btn--circle btn-2x' onClick={this.addMemo}>
            <span className='fa fa-plus' aria-hidden='true'></span>
          </button>
          <hr />
          {ui.MEMO_TYPE.map(item => {
            return (
              <Link
                key={item}
                to={'/' + item}
                className={'btn btn--circle btn-2x bg-color-' + item}
              >{item === typeFilter &&
                <span className='fa fa-check' aria-hidden='true'></span>
              }</Link>
            );
          })}
          <hr />
          <Link to='/' className='btn btn--circle btn-2x'>
            <span className='fa fa-eraser' aria-hidden='true'></span>
          </Link>
        </aside>
      </div>
    );
  }
}

let mapStateToProps = (state) => {
  return { ...state };
};

let mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
