const getOrdinalNumbers = num => {
  const postfix = ['th', 'st', 'nd', 'rd'],
        twoDigits = num % 100,             //for 1, 2, 3
        notIn20 = ( twoDigits - 20 ) % 10, //for 21, 22, 23, 31, 32, 33, etc...
        which = postfix[notIn20] || postfix[twoDigits] || postfix[0];
  return num + which;
};

export const MEMO_TYPE = (() => {
  let type = [];
  for (let i = 1; i <= 7; i++) {
    type.push(getOrdinalNumbers(i));
  }
  return type;
})();

export const MEMO_RATIO = (() => {
  let ratio = [];
  for (let i = 1; i <= 2; i++) {
    for (let j = 1; j <= 2; j++) {
      ratio.push(i + 'x' + j);
    }
  }
  return ratio;
})();
