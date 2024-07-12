import { TAllTypes, ISpecial, IBrackets, IOperate, BASE_OPERATE_PRIORITY } from './types';
import { safeWhile } from './tools';
import { FormulaError } from './FormulaError';
export function rebuildCalculate(calcArr: TAllTypes[]) {
  const result: TAllTypes[] = [];
  const operates: TAllTypes[] = [];
  for (let i = 0; i < calcArr.length; i++) {
    // @ts-ignore
    if (calcArr[i].type === 'value') {
      result.push(calcArr[i]);
      if (operates.length > 0) {
        const preOperate = operates[operates.length - 1];
        if (preOperate.type === 'special') {
          if (preOperate.value === ':') {
            result.push(operates.pop() as TAllTypes);
          }
        }
      }
      continue;
    }

    if (calcArr[i].type === 'special' && (calcArr[i] as ISpecial).value === ',') {
      safeWhile(() => {
        if (operates.length === 0) {
          throw new FormulaError('#REF!', { errorId: '0147f8c9c585' });
        }
        const tempOperate = operates.pop();
        if (tempOperate?.type === 'special' && tempOperate.value === ',') {
          operates.push(calcArr[i], tempOperate);
          return true;
        }
        // const preOperate = operates[operates.length - 1];
        // if(preOperate === undefined) {
        //   p
        // }
        if (tempOperate?.type !== 'brackets' && tempOperate!.value !== 'left') {
          if (tempOperate?.type === 'function') {
            operates.push(tempOperate, calcArr[i]);
            // logLiveValue(operates);
            return true;
          }
          // console.log(tempOperate);
          result.push(tempOperate!);
          return false;
        }
        // result.push(tempOperate);
        return false;
      });

      continue;
    }
    if (calcArr[i].type === 'brackets') {
      const currentOperate = calcArr[i] as IBrackets;
      if (currentOperate.value === 'left') {
        const preOperate = operates[operates.length - 1];
        if (preOperate && preOperate.type !== 'function') {
          operates.push(currentOperate);
        }
        continue;
      }
      safeWhile(() => {
        if (operates.length === 0) {
          return true;
        }
        const tempOperate = operates.pop() as IBrackets;
        // @ts-ignore
        if (tempOperate.type === 'function') {
          result.push(tempOperate);
          return true;
        }
        if (tempOperate.type === 'brackets' && tempOperate.value === 'left') {
          if (operates.length > 0 && operates[operates.length - 1].type === 'function') {
            result.push(operates.pop() as TAllTypes);
            if (operates.length > 0 && operates[operates.length - 1].type === 'plusMinus') {
              result.push(operates.pop() as TAllTypes);
            }
          }
          return true;
        } else {
          result.push(tempOperate);
        }
        return false;
      });
      if (operates.length > 0 && operates[operates.length - 1].type === 'plusMinus') {
        result.push(operates.pop() as TAllTypes);
      }
      continue;
    }
    if (calcArr[i].type === 'plusMinus') {
      if (operates.length === 0) {
        operates.push(calcArr[i]);
        continue;
      }
      const preOperate = operates[operates.length - 1];
      if (
        preOperate.type === 'function' ||
        preOperate.type === 'operate' ||
        preOperate.type === 'brackets' ||
        preOperate.type === 'special'
      ) {
        operates.push(calcArr[i]);
        continue;
      }
    }
    if (calcArr[i].type === 'operate') {
      const currentOperate = calcArr[i] as IOperate;
      if (operates.length === 0) {
        operates.push(currentOperate);
        continue;
      }
      const preOperate = operates[operates.length - 1];
      if (preOperate.type === 'plusMinus') {
        result.push(operates.pop() as TAllTypes);
        operates.push(currentOperate as TAllTypes);
        continue;
      }
      if (preOperate.type !== 'operate') {
        operates.push(currentOperate);
        continue;
      }

      const currentPriority = BASE_OPERATE_PRIORITY[currentOperate.value];
      safeWhile(() => {
        if (operates.length === 0 || operates[operates.length - 1].type !== 'operate') {
          operates.push(currentOperate);
          return true;
        }
        const prepPriority = BASE_OPERATE_PRIORITY[preOperate.value];
        if (currentPriority === 90) {
          if (currentPriority > prepPriority) {
            result.push(operates.pop() as TAllTypes);
            return false;
          } else {
            operates.push(currentOperate);
            return true;
          }
        } else {
          if (currentPriority > prepPriority) {
            operates.push(currentOperate);
            return true;
          } else {
            result.push(operates.pop() as TAllTypes);
          }
        }

        // return false;
      });
    }
    if (calcArr[i].type === 'function') {
      operates.push(calcArr[i]);
    }
    if (calcArr[i].type === 'special') {
      if ((calcArr[i] as ISpecial).value === ':') {
        safeWhile(() => {
          if (operates.length === 0) {
            return true;
          }
          const preOperate = operates[operates.length - 1];
          if (preOperate.type === 'brackets' || preOperate.type === 'operate') {
            return true;
          }
          result.push(operates.pop() as TAllTypes);
        });
        operates.push(calcArr[i]);
      }
      if ((calcArr[i] as ISpecial).value === ',') {
        safeWhile(() => {
          if (operates.length === 0) {
            return true;
          }
          const preOperate = operates[operates.length - 1];
          if (preOperate.type === 'function' || (preOperate.type === 'special' && preOperate.value === ',')) {
            operates.push(calcArr[i]);
            return true;
          }
          result.push(operates.pop() as TAllTypes);
          return false;
        });
      }
    }
  }
  return result.concat(operates.reverse());
}
