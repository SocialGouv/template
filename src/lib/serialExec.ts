const wait =
  (timeout = 500) =>
  (args: any) =>
    new Promise((resolve) => setTimeout(() => resolve(args), timeout));

export const serialExec = (promises: any[], options = { randomTimeout: 0 }) => {
  const next = (res = null) =>
    options.randomTimeout ? wait(options.randomTimeout) : Promise.resolve(res);
  return promises.reduce(
    (chain, c) =>
      chain.then((res: any) =>
        c()
          .then(next())
          .then((cur: any) => [...res, cur])
      ),
    Promise.resolve([])
  );
};
