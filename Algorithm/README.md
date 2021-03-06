# Frontend

最近在看《算法图解》(推荐一下)，因为前几天的一些事，菜鸟写个算法都瑟瑟发抖。

这个文件夹里的代码是根据书中的算法思路以及python代码写的。

主要学习算法思路，等菜鸟升级了在考虑其他😁。

### 散列表

- 模拟映射关系

- 防止重复

- 缓存数据

散列表避免冲突：

- 较低的填装因子

> 填装因子 = 散列表包含的元素数 / 位置总数

一旦填装因子大于0.7，需要调整散列列表的长度。

- 良好的散列函数

### 广度优先搜索

可以找出两样东西之间的最短距离。

面临类似于寻找最短路径的问题时，可以尝试使用图来简历模型，在使用广度优先搜索来解决问题。

关系是单向的图称为有向图，即有指向它们的箭头，但没有从它们出发指向其他人的箭头。无向图没有箭头，指向相连的节点互为邻居。

无向图意味着两个节点彼此执行对方，其实就是环。

### 狄克斯特拉算法

找出最快路径

关键理念：找出图中最便宜的节点，并确保没有到该节点的更便宜的路径。

狄克斯特拉算法包含4个步骤：

1. 找出可在最短时间内到达的节点

2. 更新该节点的邻居的开销。

3. 重复这个过程，直到对图中的每个节点都这样做了。

4. 计算最终路径。

狄克斯特拉算法用于每条边都有关联数字的图，这些数字称为权重。带权重的图称为加权图，不带权重的图称为非加权图。

要计算非加权图中的最短路径，可使用广度优先算法。要计算加权图中的最短路径，可使用狄克斯特拉算法。

狄克斯特拉算法只适用于有向无环图。

### 动态规划

动态规划可以在给定约束条件下找到最优解。

在问题可分解为彼此独立且离散的子问题时，就可以使用动态规划来解决。

tips

- 每种动态规划解决方案都设计网格
- 单元格中的值通常就是你要优化的值
- 每个单元格都是一个子问题。

#### 最长公共子串

#### 最长公共子序列

- 通过动态规划可以确定相似性
- 对比文件差异，比如`git diff`命令
- 两个字符串的相似程度，可以判断是否为盗版
- Word中断字功能

### K最近邻算法(KNN)

- 用于分类和回归，考虑最近的邻居
- 分类就是编组
- 回归就是预测结果
- 特征抽取意味着将物品转换为一系列可比较的数字



