import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import { VitePWA } from "vite-plugin-pwa"
import path from "path"
// https://vitejs.dev/config/
export default defineConfig({
  build: {
    minify: false,
  },
  plugins: [
    reactRefresh(),
    VitePWA({
      manifest: {
        name: "Seymour Zhang's Computer Science Playground",
        short_name: "SZCS",
        description: "Just 4 fun!",
        background_color: "#ffffff",
        start_url: "/",
        icons: [
          {
            src: path.resolve(__dirname, "/icons/icon.png"),
            destination: "icons/uni",
            sizes: [96, 128, 192, 256, 384, 512],
          },
          {
            src: path.resolve(__dirname, "/icons/apple-icon.png"),
            destination: "icons/apple",
            size: 152,
            ios: true
          }
        ]
      }
    })
  ]
})
	// //@ts-ignore
		// new WebpackPwaManifest({
		// 	name: "Seymour Zhang's Computer Science Playground",
		// 	short_name: "SZCS",
		// 	description: "Just 4 fun!",
		// 	background_color: "#ffffff",
		// 	start_url: "/",
		// 	icons: [
		// 		{
		// 			src: path.resolve(__dirname, "assets/icons/icon.png"),
		// 			destination: "icons/uni",
		// 			sizes: [96, 128, 192, 256, 384, 512],
		// 		},
		// 		{
		// 			src: path.resolve(__dirname, "assets/icons/apple-icon.png"),
		// 			destination: "icons/apple",
		// 			size: 152,
		// 			ios: true
		// 		},

		// 	],
		// }),