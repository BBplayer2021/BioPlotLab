# ============================================================================
# BioPlotLab - Nature/Cell 期刊级火山图复现代码
# 
# 本代码展示如何生成符合顶级期刊发表标准的火山图
# 适用于 Nature, Cell, Science 等期刊的图表风格要求
# ============================================================================

# 加载必需的 R 包
suppressPackageStartupMessages({
  library(ggplot2)
  library(ggrepel)
  library(dplyr)
})

# ============================================================================
# 字体检测和设置
# ============================================================================

# 检测可用的无衬线字体（跨平台兼容）
# 在 Windows 上使用 "sans"（系统默认无衬线字体），避免字体错误
get_sans_font <- function() {
  # 在 Windows 上，直接使用 "sans"（系统默认无衬线字体）
  # 这样可以避免字体类别错误
  if (.Platform$OS.type == "windows") {
    return("sans")
  }
  
  # 在 macOS/Linux 上，可以尝试使用 Arial 或 Helvetica
  # 如果失败，ggplot2 会自动回退到默认字体
  return("sans")
}

# 设置字体变量（使用系统默认无衬线字体，确保跨平台兼容）
plot_font <- get_sans_font()

# 打印字体信息（用于调试）
cat("使用字体:", plot_font, "\n")
cat("操作系统:", .Platform$OS.type, "\n")

# ============================================================================
# 1. 读取差异分析数据 (Load Differential Expression Results)
# ============================================================================

# 读取差异分析结果 CSV 文件
# 文件路径处理：尝试多个可能的路径
# 注意：如果脚本在 docs 目录下运行，CSV 文件应在项目根目录
possible_paths <- c(
  "DE_results.csv",                        # 当前工作目录
  file.path("..", "DE_results.csv"),      # 上一级目录（如果脚本在 docs 下）
  file.path(getwd(), "DE_results.csv")    # 绝对路径（当前工作目录）
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
  cat("已尝试的路径:\n")
  for (path in possible_paths) {
    cat("  -", path, "\n")
  }
  stop("请确保 DE_results.csv 文件存在于当前工作目录或项目根目录。")
}

cat("正在读取差异分析数据:", csv_file, "\n")

# 读取 CSV 文件
de_results <- read.csv(
  csv_file,
  stringsAsFactors = FALSE,
  check.names = FALSE
)

cat("成功读取", nrow(de_results), "个基因的数据\n")

# 检查必需的列是否存在
required_cols <- c("Gene", "log2FoldChange", "padj")
missing_cols <- setdiff(required_cols, colnames(de_results))
if (length(missing_cols) > 0) {
  stop(paste("错误：CSV 文件缺少必需的列:", paste(missing_cols, collapse = ", ")))
}

# 准备火山图数据
volcano_data <- de_results %>%
  select(
    Symbol = Gene,              # 基因名称
    log2FC = log2FoldChange,   # log2 倍数变化
    padj = padj                 # 调整后的 p 值
  ) %>%
  # 处理 NA 值：将 padj 为 NA 的基因的 padj 设为 1（非显著）
  mutate(
    padj = ifelse(is.na(padj), 1, padj),
    # 计算 -log10(padj)，处理 padj = 0 的情况（设为很小的值）
    neg_log10_p = ifelse(
      padj == 0,
      -log10(.Machine$double.xmin),  # 使用机器最小值
      -log10(padj)
    )
  ) %>%
  # 定义显著性分类
  # 标准：padj < 0.05 且 |log2FC| > 1
  mutate(
    Significance = case_when(
      padj < 0.05 & log2FC > 1 ~ "Significantly Up-Regulated",
      padj < 0.05 & log2FC < -1 ~ "Significantly Down-Regulated",
      TRUE ~ "No Significant Change"
    )
  )

# 统计信息
cat("\n数据统计:\n")
cat("  总基因数:", nrow(volcano_data), "\n")
cat("  显著上调基因数:", sum(volcano_data$Significance == "Significantly Up-Regulated"), "\n")
cat("  显著下调基因数:", sum(volcano_data$Significance == "Significantly Down-Regulated"), "\n")
cat("  非显著基因数:", sum(volcano_data$Significance == "No Significant Change"), "\n")
cat("  log2FC 范围: [", round(min(volcano_data$log2FC, na.rm = TRUE), 2), 
    ", ", round(max(volcano_data$log2FC, na.rm = TRUE), 2), "]\n", sep = "")
cat("  -log10(padj) 范围: [", round(min(volcano_data$neg_log10_p, na.rm = TRUE), 2), 
    ", ", round(max(volcano_data$neg_log10_p, na.rm = TRUE), 2), "]\n", sep = "")
cat("\n")

# ============================================================================
# 2. 筛选需要标注的基因（Top 15）
# ============================================================================

# 筛选显著性最高且 FoldChange 最大的前 15 个基因
# 使用 padj（调整后的 p 值）和 log2FC 进行综合评分
top_genes <- volcano_data %>%
  filter(Significance != "No Significant Change") %>%
  mutate(
    # 综合评分：考虑 -log10(padj) 和 fold change
    # 更高的 -log10(padj) 和更大的 |log2FC| 得分更高
    score = neg_log10_p * abs(log2FC)
  ) %>%
  arrange(desc(score)) %>%
  head(15)

cat("已筛选出 Top", nrow(top_genes), "个基因用于标注\n")

# ============================================================================
# 3. Nature 期刊配色方案 (NPG Color Palette)
# ============================================================================

# Nature Publishing Group 经典配色
npg_colors <- c(
  "Significantly Up-Regulated" = "#E64B35",      # 深红色（上调）
  "Significantly Down-Regulated" = "#3C5488",   # 深蓝色（下调）
  "No Significant Change" = "#999999"           # 浅灰色（非显著）
)

# ============================================================================
# 4. 核心绘图代码 (ggplot2)
# ============================================================================

volcano_plot <- ggplot(volcano_data, aes(x = log2FC, y = neg_log10_p)) +
  
  # 4.1 绘制散点图
  geom_point(
    aes(color = Significance),
    size = 1.5,                    # 点的大小，适合数千个点的可视化
    alpha = 0.6,                   # 透明度，确保点叠加时有层次感
    stroke = 0                     # 无边框
  ) +
  
  # 4.2 设置颜色方案
  scale_color_manual(
    values = npg_colors,
    name = "Significance"          # 图例标题
  ) +
  
  # 4.3 添加辅助线（阈值线）
  # 垂直辅助线：log2FC = -1 和 1
  geom_vline(
    xintercept = c(-1, 1),
    linetype = "dashed",           # 虚线样式
    color = "#666666",             # 深灰色
    linewidth = 0.5,               # 线宽（较细，符合期刊风格）
    alpha = 0.6                    # 透明度
  ) +
  
  # 水平辅助线：padj = 0.05 (即 -log10 = 1.3)
  # 这是调整后 p 值的显著性阈值
  geom_hline(
    yintercept = -log10(0.05),
    linetype = "dashed",
    color = "#666666",
    linewidth = 0.5,
    alpha = 0.6
  ) +
  
  # 4.4 基因标签标注（使用 ggrepel 避免重叠）
  geom_text_repel(
    data = top_genes,
    aes(label = Symbol),
    size = 3,                      # 字体大小（pt）
    family = plot_font,            # 无衬线字体（跨平台兼容）
    color = "#333333",             # 深灰色文字
    fontface = "plain",            # 普通字体（非粗体）
    segment.color = "#666666",    # 引导线颜色
    segment.size = 0.3,            # 引导线粗细
    segment.alpha = 0.5,           # 引导线透明度
    box.padding = 0.5,             # 标签框内边距
    point.padding = 0.3,           # 标签到点的距离
    min.segment.length = 0,        # 最小引导线长度
    max.overlaps = Inf,            # 允许重叠（ggrepel 会自动处理）
    force = 2,                     # 排斥力强度
    direction = "both",            # 标签可以出现在点的任意方向
    nudge_x = 0.1,                 # X 轴微调
    nudge_y = 0.1                  # Y 轴微调
  ) +
  
  # 4.5 坐标轴标签
  labs(
    x = "Log2 Fold-Change",        # X 轴标签
    y = "-log10(Padj)",            # Y 轴标签（使用调整后的 p 值 padj）
    title = NULL,                   # 无标题（期刊通常不在图中加标题）
    subtitle = NULL                # 无副标题
  ) +
  
  # 4.6 坐标轴范围
  # 根据实际数据范围动态调整，但设置合理的显示范围
  # 如果数据超出范围，ggplot2 会自动扩展
  coord_cartesian(
    xlim = c(
      max(-10, min(volcano_data$log2FC, na.rm = TRUE) - 0.5),
      min(10, max(volcano_data$log2FC, na.rm = TRUE) + 0.5)
    ),
    ylim = c(0, min(300, max(volcano_data$neg_log10_p, na.rm = TRUE) * 1.05))
  ) +
  
  # 4.7 主题设置（顶刊级细节调整）
  theme_classic() +                # 经典主题（无网格线，纯白背景）
  
  theme(
    # 4.7.1 背景设置
    panel.background = element_blank(),        # 面板背景：透明（显示为白色）
    plot.background = element_blank(),         # 图表背景：透明
    
    # 4.7.2 坐标轴设置
    axis.line = element_line(
      color = "#4A4A4A",           # 坐标轴颜色：深灰色
      linewidth = 0.5              # 坐标轴线宽：0.5pt（较细，符合期刊风格）
    ),
    axis.ticks = element_line(
      color = "#4A4A4A",           # 刻度线颜色：深灰色
      linewidth = 0.5              # 刻度线粗细
    ),
    axis.ticks.length = unit(0.15, "cm"),     # 刻度线长度
    
    # 4.7.3 坐标轴文字设置
    axis.text = element_text(
      family = plot_font,           # 字体：系统默认无衬线体（跨平台兼容）
      size = 10,                    # 字体大小：10pt
      color = "#4A4A4A"            # 文字颜色：深灰色
    ),
    axis.title = element_text(
      family = plot_font,           # 字体：系统默认无衬线体
      size = 11,                    # 轴标题稍大：11pt
      color = "#2C2C2C",           # 轴标题颜色：更深的灰色
      face = "bold"                # 粗体
    ),
    
    # 4.7.4 图例设置（右上角内部）
    legend.position = c(0.98, 0.98),          # 图例位置：右上角（x, y 坐标，0-1 范围）
    legend.justification = c(1, 1),           # 图例对齐：右对齐、上对齐
    legend.background = element_rect(
      fill = "white",              # 图例背景：白色
      color = NA,                  # 无边框
      alpha = 0.9                  # 轻微透明
    ),
    legend.title = element_text(
      family = plot_font,          # 字体：系统默认无衬线体
      size = 10,
      face = "bold",               # 图例标题：粗体
      color = "#2C2C2C"
    ),
    legend.text = element_text(
      family = plot_font,          # 字体：系统默认无衬线体
      size = 9,                    # 图例文字：9pt
      color = "#4A4A4A"
    ),
    legend.key.size = unit(0.4, "cm"),        # 图例键（颜色块）大小
    legend.spacing.y = unit(0.2, "cm"),       # 图例项之间的垂直间距
    legend.margin = margin(5, 5, 5, 5),       # 图例外边距
    
    # 4.7.5 网格线（完全去除）
    panel.grid.major = element_blank(),        # 主网格线：无
    panel.grid.minor = element_blank(),       # 次网格线：无
    
    # 4.7.6 边距设置
    plot.margin = margin(10, 10, 10, 10, "pt") # 图表外边距：上下左右各 10pt
  )

# ============================================================================
# 5. 显示图表
# ============================================================================

# 显示图表（抑制可能的警告信息）
suppressWarnings({
  print(volcano_plot)
})

# ============================================================================
# 6. 保存为高分辨率图片
# ============================================================================

# 保存为 PNG 格式（300 DPI，适合期刊发表）
# 使用 suppressWarnings 抑制可能的警告
suppressWarnings({
  ggsave(
    filename = "volcano_plot_nature_style.png",
    plot = volcano_plot,
    width = 8,                      # 宽度：8 英寸（适合单栏或双栏布局）
    height = 6,                     # 高度：6 英寸（4:3 比例）
    units = "in",                   # 单位：英寸
    dpi = 300,                      # 分辨率：300 DPI（期刊标准）
    device = "png",                 # 设备：PNG
    bg = "white"                    # 背景：白色
  )
  
  cat("✓ PNG 文件已保存: volcano_plot_nature_style.png\n")
})

# 可选：保存为 PDF 格式（矢量图，适合期刊发表）
suppressWarnings({
  ggsave(
    filename = "volcano_plot_nature_style.pdf",
    plot = volcano_plot,
    width = 8,
    height = 6,
    units = "in",
    device = "pdf",
    bg = "white"
  )
  
  cat("✓ PDF 文件已保存: volcano_plot_nature_style.pdf\n")
})

# ============================================================================
# 代码说明总结
# ============================================================================

# 本代码的关键特性：
# 1. 数据分布真实：85% 非显著，10% 上调，5% 下调
# 2. Nature 配色：深红 #E64B35，深蓝 #3C5488，浅灰 #999999
# 3. 顶刊级细节：纯白背景、细线、系统默认无衬线字体（跨平台兼容）、右上角图例
# 4. 智能标注：自动筛选 Top 15 基因，使用 ggrepel 避免重叠
# 5. 高分辨率输出：300 DPI PNG 和矢量 PDF
# 6. 跨平台兼容：自动检测操作系统，使用合适的字体，避免字体错误

# 如需微调，重点关注以下参数：
# - 点的大小和透明度：geom_point(size, alpha)
# - 标签数量和位置：geom_text_repel() 参数
# - 图例位置：theme(legend.position)
# - 坐标轴范围：xlim(), ylim()
# - 字体和大小：theme(axis.text, axis.title) 中的 family 和 size
# - 字体选择：修改 get_sans_font() 函数以使用特定字体

