import { fillNumber } from './tools';
import { fixD } from '@bitunix/shared/utils/maths';
describe('precision', () => {
  it('test', () => {
    console.log(fixD('4.997', 2));
    console.log(fillNumber(4.997, 2));
  });
});
