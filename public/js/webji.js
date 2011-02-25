document.observe('dom:loaded', function() {
	new Ajax.PeriodicalUpdater('x', '/x', { method: 'get', frequency: 0.25 });
	new Ajax.PeriodicalUpdater('y', '/y', { method: 'get', frequency: 0.25 });
	
	Ajax.Responders.register({
		onComplete: function() {
			new Effect.Move('planchette', { x: $('x').textContent, y: $('y').textContent, mode: 'absolute' });
  		}
	});
});
