let getRandInt = (min, max) => {
  if (min < 0 || max < 0) {
    return NaN
  }
  min > max ? [min,max] = [max, min] : [min,max] = [min,max] ;  //Деструктурирование.. можно ли так или это несовсем корректно?
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
}

let getRandFloat = (min, max, accuracy) => {
  if (min < 0 || max < 0) {
    return NaN
  }
  min > max ? [min,max] = [max, min] : [min,max] = [min,max] ;
  return (Math.random() * (max - min) + min).toFixed(accuracy);
}

console.log('Ранодомное целое число: ' + getRandInt(10,1));
console.log('Ранодомное дробное число: ' + getRandFloat(1.1,1.2,4));
