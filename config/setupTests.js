/* eslint-disable no-undef */
import 'whatwg-fetch';
import 'babel-polyfill';
import '@testing-library/jest-dom';

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));