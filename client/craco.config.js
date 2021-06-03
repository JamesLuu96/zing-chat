const CracoLessPlugin = require("craco-less");

module.exports = {
	plugins: [
		{
			plugin: CracoLessPlugin,
			options: {
				lessLoaderOptions: {
					lessOptions: {
						modifyVars: {
							"@primary-color": "#3D50D6",
							"@normal-color": "#000",
							"@body-background": "#f6f6f6",
						},
						javascriptEnabled: true,
					},
				},
			},
		},
	],
};
