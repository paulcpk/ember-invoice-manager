import DS from 'ember-data';
import ENV from '../config/environment';
import { LokiJSAdapter } from 'ember-lokijs';

const adapter = ENV.useDb ? 
  LokiJSAdapter.extend({
    lokiOptions: {
      autosave: true
    }
  }) :
  DS.JSONAPIAdapter.extend({
    namespace: 'api'
  });

export default adapter;
