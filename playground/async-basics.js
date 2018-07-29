console.log('Starting app');

setTimeout(() => {
  console.log('Timeout');
},2000);

setTimeout(() => {
  console.log('2nd Timeout');
},0);

console.log('Finishing up');
