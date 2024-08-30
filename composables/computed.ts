export const useComputedBoolean = <T>(ref: globalThis.Ref<T | undefined>) => {
  return computed({
    get() {
      return !!ref.value;
    },
    set(value: boolean) {
      if (!value) {
        ref.value = undefined;
      }
    },
  });
};
