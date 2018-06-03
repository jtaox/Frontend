// 模拟图
const graph = {
  start: {
    a: {
      weight: 6,
      fin: {
        weight: 1
      }
    },
    b: {
      weight: 2,
      fin: {
        weight: 5,
      },
      a: {
        weight: 3,
        fin: 1
      }
    },
    fin: {}
  }
}

// 路线开销
const costs = {
  a: 6,
  b: 2,
  fin: Number.MAX_SAFE_INTEGER
}

// 父节点
const parents = {
  a: 'start',
  b: 'start',
  fin: null
}

// 已处理过的节点
const processed = []

function execute() {
  debugger
  let { key: k } = findLowestNode(costs)
  while (k) {
    // 获取开销
    let cost = costs[k]
    // 获取邻居节点
    let heighbors = graph.start[k]
    Object.keys(heighbors).forEach(key => {
      if (key != 'weight') {
        let newCost = heighbors[key].weight + cost
        // 新旧开销对比
        if (newCost < costs[key]) {
          costs[key] = newCost
          parents[key] = k
        }
      }
    })
    processed.push(k)
    k = findLowestNode(costs).key
  }  

  console.log(parents, costs)
}

execute()
// 寻找开销最低节点
function findLowestNode(costs) {
  const lowest = {
    weight: Number.MAX_SAFE_INTEGER,
    key: ''
  }

  Object.keys(costs).forEach(key => {
    if (costs[key] < lowest.weight && !processed.includes(key)) {
      lowest.weight = costs[key]
      lowest.key = key
    }
  })
  return lowest
}