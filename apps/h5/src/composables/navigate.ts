type PickType<T> = T extends (...args: infer K) => void ? K : never;
export async function navigateToLocale(...args: PickType<typeof navigateTo>) {
  // eslint-disable-next-line prefer-const
  let [to, options] = args;
  const localePath = useLocalePath();
  navigateTo(localePath(to as any), options);
}
