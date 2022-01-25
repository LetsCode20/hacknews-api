import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Search from './Search.component';

describe('Search', () => {
  it('renderer without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Search>Search</Search>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  test('has a valid snapshot', () => {
    const component = renderer.create(<Search>Search</Search>);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
