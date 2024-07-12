export function useControlableValue<T = any>(
  props: any,
  emits: any,
  opts?: { valueKey?: string; default?: T; trigger?: string; extractVoidValue?: boolean; immediate?: boolean },
) {
  const options = Object.assign({ valueKey: 'value', default: null, extractVoidValue: false }, opts);
  const controlledValue = ref<T>(
    options.extractVoidValue
      ? props[options.valueKey] || options.default
      : props[options.valueKey] !== undefined
      ? props[options.valueKey]
      : options.default,
  );
  watch(
    () => props[options.valueKey],
    (newValue) => {
      controlledValue.value = newValue !== undefined ? newValue : options.default;
    },
  );

  watch(
    controlledValue,
    (newValue) => {
      emits(`update:${options.valueKey}`, newValue);
    },
    { immediate: options.immediate },
  );

  return controlledValue;
}
