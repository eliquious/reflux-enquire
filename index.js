var Reflux = require('reflux'),
	enquire = require('enquire.js');

// Create actions
var RefluxEnquireActions = Reflux.createActions([
	'match',
	'unmatch'
]);

/**
 * Reflux Store for triggering media query change events
 */
var RefluxEnquireStore = Reflux.createStore({

	// Listen to actions
	listenables: RefluxEnquireActions,


	/**
	 * init - initializes store
	 *
	 * @return {none}
	 */
	init: function() {
		this.queries = {};
	},

	/**
	 * register - function used to register media queries
	 *
	 * @param  {string} name of media query
	 * @param  {string} query to be executed
	 * @return {none}       none
	 */
	register: function(name, query) {
		// initially every query is false
		this.queries[name] = false;

		/**
		 * Register media queries with Enquire.js
		 */
		enquire.register(query, {

			// Match function is called when the query is true
			match: function() {

				// dispatch match event
				RefluxEnquireActions.match(name);
			},

			// Unmatch function is called when media query is false
			unmatch: function() {

				// dispatch unmatch events
				RefluxEnquireActions.unmatch(name);
			}
		});
	},

	/**
	 * onMatch - called on match events
	 *
	 * @param  {string} name of media query
	 * @return {none}      none
	 */
	onMatch: function(name) {
		// save state
		this.queries[name] = true;

		// publishes event to subscribers
		this.trigger('match', name);
	},

	/**
	 * onUnmatch - called on unmatch events
	 *
	 * @param  {string} name of media query
	 * @return {none}      none
	 */
	onUnmatch: function(name) {
		// save state
		this.queries[name] = false;

		// publishes event to subscribers
		this.trigger('unmatch', name);
	},

	/**
	 * isActive - get specific state of media query
	 *
	 * @param  {string} name of media query
	 * @return {boolean}      active state
	 */
	isActive: function(name) {
		return this.queries[name];
	},

	/**
	 * getState - get state of all registered media queries
	 *
	 * @return {object}  object of all registered media queries
	 *                   key: name of query, value: boolean for active
	 */
	getState: function() {
		return this.queries;
	}
});

// Export store
module.exports = RefluxEnquireStore;
