<script lang="ts" setup>
  import { toThousands, transformThousandsToNumber } from '@bitunix/shared/utils/maths';
  import { fixInputValue } from './tools';
  interface IProps {
    modelValue?: string | number;
    placeholder?: string;
    defaultValue?: string;
    disabled?: any;
    precision?: number | string;
    class?: string;
    max?: number | string;
    min?: number | string;
  }
  const props = withDefaults(defineProps<IProps>(), {
    precision: 0,
    max: Infinity,
    min: 0,
  });
  const valueRef = ref();
  const emit = defineEmits(['update:modelValue', 'input', 'blur', 'focus']);
  const inputRef = ref<any>();
  const focusRef = ref(false);
  function toString(_val: any) {
    if (typeof _val !== 'string' || typeof _val !== 'number') {
      return '';
    }
    return String(_val);
  }
  watch(
    () => [props],
    () => {
      const isEq = (() => {
        const _modelValue = toString(props.modelValue).trim();
        const localValue = toString(valueRef.value).trim();
        if (_modelValue == localValue && _modelValue === '') {
          return true;
        }
        const afterFormateModelValue = transformThousandsToNumber(_modelValue);
        const afterFormateLocalValue = transformThousandsToNumber(localValue);
        return afterFormateModelValue === afterFormateLocalValue;
      })();
      if (isEq) {
        if (props.modelValue === undefined || props.modelValue === null || props.modelValue === '') {
          valueRef.value = String(props.modelValue);
        } else {
          if (focusRef.value) {
            const val = fixInputValue(props.modelValue, props.precision);
            valueRef.value = String(val);
            emit('update:modelValue', val);
          } else {
            const min = Number(fixInputValue(props.min === undefined ? 0 : Number(props.min), props.precision));
            const max = Number(fixInputValue(props.max === undefined ? Infinity : Number(props.max), props.precision));
            const val = fixInputValue(props.modelValue, props.precision, max, min);
            valueRef.value = String(val);
            emit('update:modelValue', val);
          }
        }
      }
    },
    { immediate: true, deep: true },
  );
  const outputValue = (val: any) => {
    let result = typeof val === 'string' || typeof val === 'number' ? String(val) : '';
    if (result.length > 15) {
      result = result.substring(0, 18);
      if (result[result.length - 1] === '.') {
        result = result.replace('.', '');
      }
    }
    emit('update:modelValue', result);
    emit('input', result);
    return result;
  };
  const onInput = (_val: any, args: any) => {
    const inputVal = args.data;
    const val = typeof _val === 'string' && _val !== '' ? transformThousandsToNumber(_val) : _val;
    const oldValue = valueRef.value === undefined ? '' : valueRef.value;
    const min = Number(fixInputValue(props.min === undefined ? 0 : Number(props.min), props.precision));
    const max = Number(fixInputValue(props.max === undefined ? Infinity : Number(props.max), props.precision));
    const precision = props.precision === undefined ? 0 : Number(props.precision);
    try {
      if (args.inputType === 'insertText') {
        if (inputVal === '-' && val.length === 1) {
          if (min >= 0) {
            throw oldValue;
          } else {
            throw val;
          }
        } else if (inputVal === '.') {
          if (precision === 0) {
            throw oldValue;
          } else {
            if (/^\d+\.$/.test(val)) {
              throw val;
            }
          }
        } else {
          const currentVal = Number(val);
          if (isNaN(currentVal)) {
            throw oldValue;
          }
          if (currentVal > max) {
            throw oldValue;
          }
          // if (currentVal < min) {
          //   throw oldValue;
          // }
          const fixVal = fixInputValue(val, precision);
          throw fixVal;
        }
      }
      if (args.inputType === 'deleteContentBackward') {
        if (val === '') {
          throw '';
        }
        const fixVal = fixInputValue(val, precision);
        throw fixVal;
      }
    } catch (val) {
      valueRef.value = outputValue(val);
    }
  };

  const pasteEventListener = ref((event) => {
    try {
      const text = event.clipboardData.getData('text/plain');
      if (isNaN(Number(text))) {
        outputValue(valueRef.value);
        return;
      }
      const selection = {
        selectionStart: (inputRef.value.inputRef as HTMLInputElement).selectionStart || 0,
        selectionEnd: (inputRef.value.inputRef as HTMLInputElement).selectionEnd || 0,
      };
      const oldVal = typeof valueRef.value === 'string' ? valueRef.value : '';
      const newStr = oldVal.substring(0, selection.selectionStart) + text + oldVal.substring(selection.selectionEnd);
      let newNum = Number(newStr);
      if (isNaN(newNum)) {
        // emit('update:modelValue', valueRef.value);
        valueRef.value = outputValue(valueRef.value);
      }
      const min = props.min === undefined ? 0 : Number(props.min);
      const max = props.max === undefined ? Infinity : Number(props.max);
      const precision = props.precision === undefined ? 0 : Number(props.precision);
      newNum = Number(fixInputValue(String(newNum), precision));
      if (newNum > max || newNum < min) {
        valueRef.value = outputValue(valueRef.value);
        // valueRef.value = String(valueRef.value);
      } else {
        valueRef.value = outputValue(newNum);
        // valueRef.value = String(newNum);
      }
    } catch (error) {}
  });
  watch(
    () => [inputRef],
    () => {
      if (inputRef.value) {
        inputRef.value.inputRef.addEventListener('paste', pasteEventListener.value);
      }
    },
    { immediate: true, deep: true },
  );
  onUnmounted(() => {
    if (inputRef.value) {
      inputRef.value.inputRef.removeEventListener('paste', pasteEventListener.value);
    }
  });
  watch(
    () => [props.min, props.max],
    () => {
      // if (props.placeholder === '盈利额') {
      //   console.error('max ming change', props);
      // }
      if (valueRef.value !== undefined && valueRef.value !== null && valueRef.value !== '') {
        const min = props.min === undefined ? 0 : Number(props.min);
        const max = props.max === undefined ? Infinity : Number(props.max);
        let fixedValue = Number(fixInputValue(valueRef.value, props.precision));
        // if (props.placeholder === '止损触发价') {
        //   console.log(fixedValue, max, min);99999999
        // }
        if (fixedValue < min) {
          valueRef.value = outputValue(min);
          // valueRef.value = String(min);
        }
        if (fixedValue > max) {
          valueRef.value = outputValue(max);
          // valueRef.value = String(max);
        }
      }
    },
    { immediate: true, deep: true },
  );
  const onBlur = () => {
    focusRef.value = false;
    const min = Number(fixInputValue(props.min === undefined ? 0 : Number(props.min), props.precision));
    const max = Number(fixInputValue(props.max === undefined ? Infinity : Number(props.max), props.precision));
    const realValue = Number(fixInputValue(valueRef.value, props.precision));
    if (realValue > max) {
      valueRef.value = outputValue(max);
      // valueRef.value = String(max);
    }
    if (realValue < min) {
      valueRef.value = outputValue(min);
      // valueRef.value = String(min);
    }
    emit('blur');
  };
  const onFocus = () => {
    focusRef.value = true;
    emit('focus');
  };
  const inputValue = computed(() => {
    try {
      if (valueRef.value !== '' && valueRef.value !== undefined && valueRef.value !== null && !isNaN(Number(valueRef.value))) {
        return toThousands(valueRef.value);
      } else {
        return '';
      }
    } catch (_error) {
      return '';
    }
  });
</script>
<template>
  <a-input
    :class="props.class"
    :default-value="props.defaultValue"
    :model-value="inputValue"
    :placeholder="props.placeholder"
    :disabled="props.disabled"
    @focus="onFocus"
    @input="onInput"
    @blur="onBlur"
    ref="inputRef"
  >
    <template #suffix>
      <slot></slot>
    </template>
  </a-input>
</template>
