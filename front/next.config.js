const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true', // true일 때 실행됩니다.
});

module.exports = withBundleAnalyzer({
  images: {
    domains: [''],
  },
  compress: true,
  webpack(config, { webpack }) {
    const prod = process.env.NODE_ENV === 'production';
    return {
      ...config,
      mode: prod ? 'production' : 'development',
      devtool: prod ? 'hidden-source-map' : 'eval',
      plugins: [
        ...config.plugins,
        // new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /^\.\/ko$/), moment 날짜 라이브러리를 사용시 - 구글에 moment locale tree shaking 이런식으로 검색
      ],
    };
  },
});
