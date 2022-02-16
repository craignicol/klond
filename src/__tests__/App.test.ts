import { Shuffle } from '../deck';
import '@testing-library/jest-dom';
import { render } from '@testing-library/svelte';
import App from '../App.svelte';

beforeEach(() => {
  window.HTMLElement.prototype.scrollIntoView = jest.fn();
});

test('Shows heading when rendered', () => {
  const { getByText } = render(App, {deck: Shuffle(0)});
  expect(getByText('Klond tutorial')).toBeInTheDocument();
});

test('Shows cards when rendered', () => {
  const { getAllByText } = render(App, {deck: Shuffle(0)});
  expect(getAllByText((_, element) => element.className.includes("card"))[0]).toBeInTheDocument();
  expect(getAllByText((_, element) => element.className.includes("back"))[0]).toBeInTheDocument();
  expect(getAllByText((_, element) => element.className.includes("front"))[0]).toBeInTheDocument();
});

test('Shows shelf when rendered', () => {
  const { getByText } = render(App, {deck: Shuffle(0)});
  expect(getByText((_, element) => element.id === "shelf" )).toBeInTheDocument();
});