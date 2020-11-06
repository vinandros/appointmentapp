// console.log(
//   diagonalDifference([
//     [11, 2, 4],
//     [4, 5, 6],
//     [10, 8, -12],
//   ])
// );

// function diagonalDifference(arr) {
//   // Write your code here

//   let pDiagonal = 0;
//   let sDiagonal = 0;
//   arr.forEach((arrTemp, pIndex) => {
//     arrTemp.forEach((num, sIndex) => {
//       if (pIndex === sIndex) {
//         pDiagonal += Number(num);
//       }
//     });
//     arrTemp.reverse().forEach((num, sIndex) => {
//       if (pIndex === sIndex) {
//         sDiagonal += Number(num);
//       }
//     });
//   });

//   return Math.abs(pDiagonal - sDiagonal);
// }
// plusMinus([-4, 3, -9, 0, 4, 1]);

// function plusMinus(arr) {
//   let positive = 0;
//   let negative = 0;
//   let zero = 0;

//   arr.forEach((num) => (num > 0 ? positive++ : num < 0 ? negative++ : zero++));

//   new Array(positive, negative, zero).forEach((num) => {
//     console.log((num / arr.length).toFixed(6));
//   });
// }
// staircase(4);
// function staircase(n) {
//   let tem = n;
//   for (let i = 1; i <= n; i++) {
//     tem--;
//     let str = "";
//     for (let j = 1; j <= tem; j++) {
//       str += " ";
//     }
//     for (let j = 1; j <= i; j++) {
//       str += "#";
//     }
//     console.log(str);
//   }
// }
