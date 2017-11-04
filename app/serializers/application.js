import DS from 'ember-data';
import ENV from '../config/environment';
import { LokiJSSerializer } from 'ember-lokijs';


const serializer = ENV.useDb ? 
  LokiJSSerializer :
  DS.JSONAPISerializer;

export default serializer;