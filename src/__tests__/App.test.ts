import '@testing-library/jest-dom';
import { render } from '@testing-library/svelte';
import App from '../App.svelte';

test('Shows heading when rendered', () => {
  const { getByText } = render(App, {name: 'world'});
  expect(getByText('Svelte tutorial')).toBeInTheDocument();
});