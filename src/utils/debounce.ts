const debounce = <T extends (...args: any[]) => any>(func: T, delay: number) => {
    let timer: ReturnType<typeof setTimeout>;
    return (...args: Parameters<T>) => {
      clearTimeout(timer);
      // If delay is 0 or input value is empty, execute the function immediately
      if (delay === 0 || args[0] === '') {
        func(...args);
      } else {
        timer = setTimeout(() => func(...args), delay);
      }
    };
};
  
export default debounce;