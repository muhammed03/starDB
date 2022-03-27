const compose =
  (...funcs: any[]) =>
  (comp: any) => {
    return funcs.reduceRight((prevResult, f) => f(prevResult), comp);
  };

export default compose;
