import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

const testTemplate = {
  title: 'Test Template',
  markup: '<markup>'
}

moduleForComponent('template-tab', 'Integration | Component | template tab', {
  integration: true
});

test('it renders title and markup properly', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.set('template', testTemplate);
  this.set('saveTemplate', () => { /* do nothing */});
  this.set('rollbackTemplate', () => { /* do nothing */});
  this.set('deleteTemplate', () => { /* do nothing */});

  
  this.render(hbs`{{template-tab
    isOpen=true
    template=template
    saveTemplate=(action saveTemplate) 
    rollbackTemplate=(action rollbackTemplate) 
    deleteTemplate=(action deleteTemplate)}}`);
  
  // rendered title matches expected title
  assert.equal(this.$().find('.panel-title').text().trim(), testTemplate.title);
  // rendered code matches expected code
  assert.equal(this.$().find('.CodeMirror-code pre').text(), testTemplate.markup);
});
