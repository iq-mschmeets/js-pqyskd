

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
