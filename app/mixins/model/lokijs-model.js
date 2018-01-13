import { LokiJSModelMixin } from 'ember-lokijs';
import ENV from '../../config/environment';

const ModelMixin = ENV.useDb ? LokiJSModelMixin : {};

export default ModelMixin;
