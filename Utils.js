

const getSet = (getKey, setKey, transform) => (obj) =>
({
  ...obj,
  [setKey]: transform(obj[getKey]),
});

const addReadableDate = getSet(
  'date',
  'readableDate',
  t => new Date(t * 1000).toGMTString()
);
const sanitizeMessage = getSet(
  'message',
  'message',
  msg => msg.replace(/</g, '&lt;')
);

const Task = (run) => {
  map: (f) => Task((resolve, reject) => {
    run(
      (x) => (resolve(f(x))),
      reject
    );
  }),
  peekErr: (f) => Task((resolve, reject) => {
    run(
      resolve,
      (err) => { f(err); reject(err); }
    )
  }),
  run: (onResolve, onReject) => run(
      onResolve,
      onReject
    );
  scan: (f, x0) => Task((resolve, reject) => run(
    x => resolve(f(x0, x)),
    e => resolve(x0),
  )),
}

const scan = (f, x0) => (scannable) =>
  scannable.scan(f, x0);