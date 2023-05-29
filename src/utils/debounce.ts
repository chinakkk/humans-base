export function debounce(func: Function, ms: number) {
  let timeoutId: NodeJS.Timeout;

  return function (this: any, ...args: any[]) {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, ms);
  };
}