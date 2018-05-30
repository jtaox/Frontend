// 分而治之
// https://en.wikipedia.org/wiki/Quicksort
function quick_sort(arr) {
  if (arr.length < 2) return arr
  let pivot = arr[0]
  let less = arr.filter(item => item < pivot)
  let greater = arr.filter(item => item > pivot)
  console.log(pivot, less, greater)
  return [...quick_sort(less), pivot, ...quick_sort(greater)]
}

console.log(quick_sort([8, 10, 83, 1, 399, 233, 29, 20, 2018]))
