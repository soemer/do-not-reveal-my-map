const MODULE_NAME = 'DoNotRevealMyMap';
const MODULE_ID = 'do-not-reveal-my-map';
const PROPERTY_MODULE_ENABLED = 'doNotRevealMyMap';

Hooks.once('setup', ()=>{
	console.info(MODULE_NAME + ' | Initializing module');
	registerSettings();
	registerAnimationCancelCheck();
});

function registerSettings() {
    game.settings.register(MODULE_ID, PROPERTY_MODULE_ENABLED, {
		name: game.i18n.localize(MODULE_ID + '.Settings.DoNotRevealMyMap.Name'),
		hint: game.i18n.localize(MODULE_ID + '.Settings.DoNotRevealMyMap.Hint'),
		scope: 'world',
		config: true,
		type: Boolean,
		default: true
    });
}

function registerAnimationCancelCheck() {
	Hooks.on('preUpdateToken', (token, changes, data) => {
		if ((changes?.x === token?.x && changes?.y === token?.y) ||
			data.animate === false)
			return;

		const target = token._object.getCenterPoint({x: changes?.x ?? token.x, y: changes?.y ?? token.y});
		if (game.settings.get(MODULE_ID, PROPERTY_MODULE_ENABLED) && token._object.checkCollision(target))
			data.animate = false;
	});
}
