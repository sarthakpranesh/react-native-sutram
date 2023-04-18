export default (n) => {
  var a = 1,
    b = 0,
    temp;
  let tmp = 100000; // 1 crore
  while (tmp >= 0) {
    let num = n;
    a = 1;
    b = 0;
    while (num >= 0) {
      temp = a;
      a = a + b;
      b = temp;
      num--;
    }
    tmp--;
  }

  return b;
};
