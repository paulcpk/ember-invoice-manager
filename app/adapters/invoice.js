import { LokiJSAdapter } from 'ember-lokijs';

export default LokiJSAdapter.extend({
  lokiOptions: {
    // adapter: new LokiIndexedAdapter(),
    autosave: true
  }
});