import { init } from '../serverless.js';

export const handler = init({
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["CompWith_MORKBORG_horiz.svg","UnifrakturCook-Bold.ttf","esoteric_hermit.png","fanged_deserter.png","favicon.png","global.css","gutterborn_scum.png","heretical_priest.png","occult_herbmaster.png","pip-six.svg","switch_sm.png","wretched_royalty.png"]),
	mimeTypes: {".svg":"image/svg+xml",".ttf":"font/ttf",".png":"image/png",".css":"text/css"},
	_: {
		entry: {"file":"_app/immutable/start-b800a280.js","imports":["_app/immutable/start-b800a280.js","_app/immutable/chunks/index-504c9a09.js","_app/immutable/chunks/singletons-547d7ab6.js","_app/immutable/chunks/index-df5f2cf2.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			() => import('../server/nodes/0.js'),
			() => import('../server/nodes/1.js'),
			() => import('../server/nodes/2.js'),
			() => import('../server/nodes/3.js'),
			() => import('../server/nodes/4.js')
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
			const { match: integer } = await import ('../server/entries/matchers/integer.js')
			return { integer };
		}
	}
});
