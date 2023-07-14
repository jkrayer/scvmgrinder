export const manifest = {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["CompWith_MORKBORG_horiz.svg","UnifrakturCook-Bold.ttf","esoteric_hermit.png","fanged_deserter.png","favicon.png","global.css","gutterborn_scum.png","heretical_priest.png","occult_herbmaster.png","pip-six.svg","switch_sm.png","wretched_royalty.png"]),
	mimeTypes: {".svg":"image/svg+xml",".ttf":"font/ttf",".png":"image/png",".css":"text/css"},
	_: {
		entry: {"file":"_app/immutable/start-039a7ea0.js","imports":["_app/immutable/start-039a7ea0.js","_app/immutable/chunks/index-3abf14ef.js","_app/immutable/chunks/singletons-e87d2b86.js","_app/immutable/chunks/index-630685f4.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			() => import('./nodes/0.js'),
			() => import('./nodes/1.js'),
			() => import('./nodes/2.js'),
			() => import('./nodes/3.js'),
			() => import('./nodes/4.js')
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 2 },
				endpoint: null
			},
			{
				id: "/create",
				pattern: /^\/create\/?$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 3 },
				endpoint: null
			},
			{
				id: "/play/[id=integer]",
				pattern: /^\/play\/([^/]+?)\/?$/,
				params: [{"name":"id","matcher":"integer","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0], errors: [1], leaf: 4 },
				endpoint: null
			}
		],
		matchers: async () => {
			const { match: integer } = await import ('./entries/matchers/integer.js')
			return { integer };
		}
	}
};
