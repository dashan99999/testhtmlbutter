import { fixNum } from './index';
describe('test number component', () => {
  it('fixNumber null', () => {
    expect(fixNum('')).toEqual('');
  });
});
