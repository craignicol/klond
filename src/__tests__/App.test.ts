import { Shuffle } from '../deck';
import '@testing-library/jest-dom';
import { render } from '@testing-library/svelte';
import App from '../App.svelte';

test('Shows heading when rendered', () => {
  const { getByText } = render(App, {deck: Shuffle(0)});
  expect(getByText('Klond tutorial')).toBeInTheDocument();
});