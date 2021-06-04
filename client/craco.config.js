const CracoLessPlugin = require("craco-less");

module.exports = {
	plugins: [
		{
			plugin: CracoLessPlugin,
			options: {
				lessLoaderOptions: {
					lessOptions: {
						modifyVars: {
							"@primary-color": "#3d50d6",
							"@normal-color": "#000",
							"@body-background": "#f6f6f6",
							"@btn-font-weight": "500",
						},
						javascriptEnabled: true,
					},
				},
			},
		},
	],
};
