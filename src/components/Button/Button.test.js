import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Button from './Button.component';

describe('Button', () => {
  it('renderer without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Button>Click to See More</Button>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  test('has a valid snapshot', () => {
    const component = renderer.create(<Button>Click to See More</Button>);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
