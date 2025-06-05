import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {Button} from '../../../src/components/atoms/Button';
import globalColors from '../../../src/details/styles/globalColors';

describe('Button', () => {
  it('renders the title correctly', () => {
    const {getByText} = render(<Button title="Click Me" onPress={() => {}} />);
    expect(getByText('Click Me')).toBeTruthy();
  });

  it('calls onPress when tapped', () => {
    const mockPress = jest.fn();
    const {getByText} = render(<Button title="Submit" onPress={mockPress} />);
    fireEvent.press(getByText('Submit'));
    expect(mockPress).toHaveBeenCalled();
  });

  it('applies confirm text color by default', () => {
    const {getByText} = render(<Button title="Confirm" onPress={() => {}} />);
    const text = getByText('Confirm');
    expect(text.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({color: globalColors.buttonTextColor}),
      ]),
    );
  });

  it('applies logout text color (same as confirm)', () => {
    const {getByText} = render(
      <Button title="Logout" onPress={() => {}} variant="logout" />,
    );
    const text = getByText('Logout');
    expect(text.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({color: globalColors.buttonTextColor}),
      ]),
    );
  });
});
