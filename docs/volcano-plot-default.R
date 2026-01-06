# ============================================================================
# 默认参数火山图绘制脚本
# Volcano Plot with Default Parameters
# ============================================================================
# 
# 功能：使用默认参数绘制火山图，展示差异表达基因
# 数据源：DE_results.csv
# 
# 作者：BioPlotLab
# 日期：2024
# ============================================================================

# 加载必需的 R 包
suppressPackageStartupMessages({
  library(ggplot2)      # 绘图
  library(dplyr)         # 数据处理
})

# ============================================================================
# 1. 读取差异分析数据
# ============================================================================

# 尝试多个可能的路径
possible_paths <- c(
  "DE_results.csv",                        # 当前工作目录
  file.path("..", "DE_results.csv"),      # 上一级目录
  file.path(getwd(), "DE_results.csv")    # 绝对路径
)

csv_file <- NULL
for (path in possible_paths) {
  if (file.exists(path)) {
    csv_file <- normalizePath(path)
    cat("找到文件:", csv_file, "\n")
    break
  }
}

# 如果所有路径都不存在，报错
if (is.null(csv_file)) {
  cat("错误：找不到文件 DE_results.csv\n")
  cat("当前工作目录:", getwd(), "\n")
  stop("请确保 DE_results.csv 文件存在于当前工作目录或项目根目录。")
}

cat("正在读取差异分析数据...\n")

# 读取 CSV 文件
de_results <- read.csv(
  csv_file,
  stringsAsFactors = FALSE,
  check.names = FALSE
)

cat("成功读取", nrow(de_results), "个基因的数据\n")

# 检查必需的列
required_cols <- c("Gene", "log2FoldChange", "padj")
missing_cols <- setdiff(required_cols, colnames(de_results))
if (length(missing_cols) > 0) {
  stop(paste("错误：CSV 文件缺少必需的列:", paste(missing_cols, collapse = ", ")))
}

# ============================================================================
# 2. 数据预处理
# ============================================================================

# 准备火山图数据
volcano_data <- de_results %>%
  select(
    Symbol = Gene,
    log2FC = log2FoldChange,
    padj = padj
  ) %>%
  # 处理 NA 值：将 padj 为 NA 的基因设为非显著
  mutate(
    padj = ifelse(is.na(padj), 1, padj),
    # 计算 -log10(padj)
    neg_log10_p = ifelse(
      padj == 0,
      -log10(.Machine$double.xmin),
      -log10(padj)
    )
  ) %>%
  # 定义显著性分类（默认阈值：padj < 0.05, |log2FC| > 1）
  mutate(
    Significance = case_when(
      padj < 0.05 & log2FC > 1 ~ "Up",
      padj < 0.05 & log2FC < -1 ~ "Down",
      TRUE ~ "NS"
    )
  )

# 统计信息
cat("\n数据统计:\n")
cat("  总基因数:", nrow(volcano_data), "\n")
cat("  显著上调 (Up):", sum(volcano_data$Significance == "Up"), "\n")
cat("  显著下调 (Down):", sum(volcano_data$Significance == "Down"), "\n")
cat("  非显著 (NS):", sum(volcano_data$Significance == "NS"), "\n")
cat("\n")

# ============================================================================
# 3. 绘制火山图（使用默认参数）
# ============================================================================

cat("正在绘制火山图...\n")

# 使用 ggplot2 默认参数绘制
volcano_plot <- ggplot(volcano_data, aes(x = log2FC, y = neg_log10_p)) +
  
  # 绘制散点图（使用默认颜色和样式）
  geom_point(
    aes(color = Significance),
    size = 1,
    alpha = 0.6
  ) +
  
  # 添加阈值线
  geom_vline(
    xintercept = c(-1, 1),
    linetype = "dashed",
    color = "gray50",
    linewidth = 0.5
  ) +
  geom_hline(
    yintercept = -log10(0.05),
    linetype = "dashed",
    color = "gray50",
    linewidth = 0.5
  ) +
  
  # 坐标轴标签
  labs(
    x = "Log2 Fold Change",
    y = "-log10(Adjusted P-value)",
    color = "Significance"
  ) +
  
  # 使用默认主题
  theme_bw()

# 显示图表
print(volcano_plot)

# ============================================================================
# 4. 保存图表
# ============================================================================

# 保存为 PNG（默认分辨率）
ggsave(
  filename = "volcano_plot_default.png",
  plot = volcano_plot,
  width = 8,
  height = 6,
  units = "in",
  dpi = 300,
  bg = "white"
)

cat("✓ PNG 文件已保存: volcano_plot_default.png\n")

# 保存为 PDF
ggsave(
  filename = "volcano_plot_default.pdf",
  plot = volcano_plot,
  width = 8,
  height = 6,
  units = "in",
  bg = "white"
)

cat("✓ PDF 文件已保存: volcano_plot_default.pdf\n")

cat("\n完成！\n")

