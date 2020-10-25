import React from 'react';
import ReactDOM from 'react-dom'
import {mount, shallow} from 'enzyme'
import App from './App';

// test('renders learn react link', () => {
//   const { getByText } = render(<App />);
//   const linkElement = getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

it('renders w/o crashing', () => {
  const wrapper = shallow(<App />)
})
