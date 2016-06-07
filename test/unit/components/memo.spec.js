import chai, { expect } from 'chai';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import Memo from '../../../app/scripts/components/memo';

const setup = () => {
  let props = {
  };

  let renderer = TestUtils.createRenderer();
  renderer.render(<Memo {...props} />);
  let output = renderer.getRenderOutput();
  return { props, output };
}

describe.skip('Memo components', () => {
  it('should render correctly', () => {
    const { output } = setup();

    expect(output.type).to.be.equal('div');
  });
});
