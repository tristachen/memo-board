import { expect } from 'chai';
import sinon from 'sinon';
import reducer from '../../../app/scripts/reducers/memos';
import * as types from '../../../app/scripts/constants/action-type';

let state;
let test = (expected, actionType, payload) => {
  let action = {
    type: types[actionType],
    payload: payload
  };
  expect(reducer(state, action)).to.deep.equal(expected);
  state = expected;
};


describe('memos reducer', () => {
  let clock = '';

  before(() => {
    clock = sinon.useFakeTimers(36);
  });

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).to.eql([]);
  });

  it('should handle ADD_MEMO', () => {
    let expectedState, payload;
    payload = {};
    expectedState = [{
      id    : '10',
      text  : '',
      type  : '1st',
      ratio : '1x1'
    }];
    test(expectedState, types.ADD_MEMO, payload);

    clock.tick(36);

    payload = {
      type: '2nd'
    }
    expectedState = [
      ...expectedState, {
      id    : '20',
      text  : '',
      type  : '2nd',
      ratio : '1x1'
    }];
    test(expectedState, types.ADD_MEMO, payload);
  });



  it('should handle EDIT_MEMO', () => {
    let expectedState, payload;
    expectedState = [{
      id    : '10',
      text  : 'hello',
      type  : '1st',
      ratio : '1x1'
    }, {
      id    : '20',
      text  : '',
      type  : '2nd',
      ratio : '1x1'
    }];
    payload = {
      id   : '10',
      text : 'hello'
    };
    test(expectedState, types.EDIT_MEMO, payload);


    expectedState = [{
      id    : '10',
      text  : 'hello',
      type  : '1st',
      ratio : '1x1'
    }, {
      id    : '20',
      text  : '',
      type  : '2nd',
      ratio : '1x1'
    }];
    payload = {
      id  : '20',
      abc : 'nothing'
    };
    test(expectedState, types.EDIT_MEMO, payload);
  });





  it('should handle DELETE_MEMO', () => {
    let expectedState, payload;
    expectedState = [{
      id    : '20',
      text  : '',
      type  : '2nd',
      ratio : '1x1'
    }];
    payload = {
      id: '10'
    };
    test(expectedState, types.DELETE_MEMO, payload);
  });

  it('should handle RECEIVE_MEMOS', () => {
    let expectedState, payload;
    expectedState = [{
      id    : '21',
      text  : 'test1',
      type  : '1st',
      ratio : '1x1'
    }, {
      id    : '30',
      text  : 'test2',
      type  : '1st',
      ratio : '1x1'
    }];
    payload = { memos: expectedState };
    test(expectedState, types.RECEIVE_MEMOS, payload);
  });

  it('should handle CLEAR_MEMOS', () => {
    test([], types.CLEAR_MEMOS, {});
  });

  after(()=> {
    clock.restore()
  })
});
