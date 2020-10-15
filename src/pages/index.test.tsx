import Home from './';
import React from 'react';
import renderer from 'react-test-renderer';

test('renders correctly', () => {
  const tree = renderer.create(<Home />).toJSON();

  expect(tree).toMatchSnapshot();
});
