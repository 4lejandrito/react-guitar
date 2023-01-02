const findDuplicates = (arr: number[]) => {
  let sorted_arr = arr.slice().sort()

  let results = []
  for (let i = 0; i < sorted_arr.length - 1; i++) {
    if (sorted_arr[i + 1] == sorted_arr[i]) {
      results.push(sorted_arr[i])
    }
  }
  return results
}

export default findDuplicates
