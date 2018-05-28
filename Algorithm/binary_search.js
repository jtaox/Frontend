function binary_search(arr, item) {
  let low = 0, 
    high = arr.length - 1,
    mid = 0, 
    midItem = null
  let count = 0
  while(low <= high) {
    mid = Math.floor((high + low) / 2)
    midItem = arr[mid]
    console.log(++count, high, low, midItem, item)
    if (item == midItem) return { index: mid }
    else if (item < midItem) high = mid -1
    else low = mid + 1
  }
}

console.log(binary_search([1, 2, 3, 4, 5, 6, 7, 8], 8))