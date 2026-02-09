import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
	base: "/LOS/",
	build: {
		target: "es2022",
		rollupOptions: {
			output: {
				manualChunks: {
					["pixijs"]: ["pixi.js"],
				},
			},
		},
	},
	server: {
		port: 8080,
		open: true,
	},
});
