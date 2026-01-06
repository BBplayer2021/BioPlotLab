# Nature/Cell 期刊级火山图代码使用指南

## 文件说明

`volcano-plot-nature-style.R` 是一个完整的 R 脚本，用于生成符合 Nature、Cell、Science 等顶级期刊发表标准的火山图。

## 快速开始

### 1. 安装必需的 R 包

```r
install.packages(c("ggplot2", "ggrepel", "dplyr"))
```

### 2. 运行代码

```r
source("docs/volcano-plot-nature-style.R")
```

## 代码特性

### 数据生成
- **5000 个基因**的模拟数据
- **真实分布**：85% 非显著，10% 上调，5% 下调
- 包含 `Symbol`, `log2FC`, `pvalue`, `neg_log10_p` 列

### 配色方案
- **上调基因**：`#E64B35`（深红色）
- **下调基因**：`#3C5488`（深蓝色）
- **非显著**：`#999999`（浅灰色，alpha=0.4）

### 顶刊级细节
- ✅ 纯白背景（`theme_classic()`）
- ✅ 无网格线
- ✅ 细虚线辅助线（log2FC = ±1, p = 0.05）
- ✅ Top 15 基因自动标注（`ggrepel`）
- ✅ 右上角内部图例
- ✅ Arial 无衬线字体
- ✅ 300 DPI 高分辨率输出

## 输出文件

运行代码后会生成：
- `volcano_plot_nature_style.png` - PNG 格式（300 DPI）
- `volcano_plot_nature_style.pdf` - PDF 格式（矢量图）

## 自定义调整

### 修改点的大小和透明度
```r
geom_point(
  size = 1.5,    # 调整点的大小
  alpha = 0.6    # 调整透明度（0-1）
)
```

### 修改标注基因数量
在代码中找到 `head(15)` 并修改数字：
```r
head(15)  # 改为你想要的基因数量
```

### 修改图例位置
```r
theme(
  legend.position = c(0.98, 0.98)  # 修改坐标 (x, y)，范围 0-1
)
```

### 修改坐标轴范围
```r
xlim(-10, 10)  # X 轴范围
ylim(0, 300)   # Y 轴范围
```

## 使用真实数据

如果使用真实数据，只需替换数据生成部分：

```r
# 替换这部分
volcano_data <- data.frame(
  Symbol = your_gene_symbols,
  log2FC = your_log2fc_values,
  pvalue = your_pvalue_values,
  stringsAsFactors = FALSE
)

# 后续代码保持不变
```

## 注意事项

1. **字体**：确保系统已安装 Arial 字体，否则可能回退到默认字体
2. **内存**：5000 个点的图表需要足够的内存
3. **分辨率**：300 DPI 适合期刊发表，文件较大
4. **颜色**：Nature 配色方案已优化，建议不要随意修改

## 技术支持

如有问题，请参考：
- ggplot2 官方文档：https://ggplot2.tidyverse.org/
- ggrepel 文档：https://github.com/slowkow/ggrepel

