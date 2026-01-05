/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // 启用静态导出以支持 GitHub Pages
  output: 'export',
  // 禁用图片优化（静态导出不支持）
  images: {
    unoptimized: true,
  },
  // 如果使用自定义域名，不需要 basePath
  // 如果使用 GitHub Pages 默认路径（如 username.github.io/repo），需要设置 basePath: '/repo'
  // basePath: '',
  // assetPrefix: '',
}

module.exports = nextConfig

