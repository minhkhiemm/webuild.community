import Document from './src/Document'
import { siteRoot } from './src/config'
import webpack from './webpack.config'

export default {
  plugins: ['react-static-plugin-preact'],
  siteRoot: siteRoot,
  bundleAnalyzer: !!process.env.BUNDLE_ANALYZE,
  Document,
  getRoutes: async () => {
    return [
      {
        path: '/',
        component: 'src/pages/home',
      },
      {
        path: '404',
        component: 'src/pages/404',
      },
    ]
  },
  webpack,
}
