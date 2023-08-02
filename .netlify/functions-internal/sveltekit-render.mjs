import { init } from '../serverless.js';

export const handler = init((() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["CompWith_MORKBORG_horiz.svg","UnifrakturCook-Bold.ttf","esoteric_hermit.png","fanged_deserter.png","favicon.png","global.css","gutterborn_scum.png","heretical_priest.png","occult_herbmaster.png","pip-six.svg","switch_sm.png","wretched_royalty.png"]),
	mimeTypes: {".svg":"image/svg+xml",".ttf":"font/ttf",".png":"image/png",".css":"text/css"},
	_: {
		client: {"start":"_app/immutable/entry/start.a4a92abd.js","app":"_app/immutable/entry/app.afde4a23.js","imports":["_app/immutable/entry/start.a4a92abd.js","_app/immutable/chunks/index.fb947ac8.js","_app/immutable/chunks/singletons.0b2b7eff.js","_app/immutable/chunks/index.b56d6344.js","_app/immutable/entry/app.afde4a23.js","_app/immutable/chunks/index.fb947ac8.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			__memo(() => import('../server/nodes/0.js')),
			__memo(() => import('../server/nodes/1.js')),
			__memo(() => import('../server/nodes/2.js')),
			__memo(() => import('../server/nodes/3.js')),
			__memo(() => import('../server/nodes/4.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/create",
				pattern: /^\/create\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/play/[id=integer]",
				pattern: /^\/play\/([^/]+?)\/?$/,
				params: [{"name":"id","matcher":"integer","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			}
		],
		matchers: async () => {
			const { match: integer } = await import ('../server/entries/matchers/integer.js')
			return { integer };
		}
	}
}
})());
