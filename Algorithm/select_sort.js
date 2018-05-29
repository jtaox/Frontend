function select_sort(arr) {
  // const newArr = []
  for (let i = 0, len = arr.length; i < len; i++) {
    let select = arr[i]
    let selectIndex = i
    for (let j = i + 1; j < len; j++) {
      if (arr[j] < select) {
        let temp = arr[i]
        arr[i] = arr[j]
        arr[j] = temp
      }
    }
    // newArr.push(select)
  }
  return arr
}

console.log(select_sort([39, 23, 1, 100, 893, 1, 222]))