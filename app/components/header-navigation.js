import Ember from 'ember';

function openPrintDialogue() {
  Ember.$('<iframe>', {
    name: 'myiframe',
    class: 'printFrame',
    src: 'http://localhost:4200/invoices/view/2'
  })
  .css('display', 'block')
  .appendTo('body');

  setTimeout(() => {
    window.frames['myiframe'].focus();
    window.frames['myiframe'].print();
  }, 1000);


  // setTimeout(() => { Ember.$(".printFrame").remove(); }, 1000);
}

// const { getOwner } = Ember;

function printPage() {
  // Ember.$('#printFrame')[0].contentWindow.print();
  // const url = 'http://localhost:4200/invoices/view/2';
  // let printView = Ember.$('<iframe id="printFrame" name="printFrame" src='+url+' style="display: block"></iframe>');
  // printView.appendTo('body');

  
  // printView.on('load', function() { 
    // printView[0].contentWindow.focus();
    // printView[0].contentWindow.print();
    // window.frames['printFrame'].focus();
    // window.frames['printFrame'].print();
    // printView.remove();
  // });
  // openPrintDialogue();
}

export default Ember.Component.extend({
  classNames: ['header-navigation'],

  didInsertElement() {
    const url = 'http://localhost:4200/invoices/view/2';
    Ember.$('#printFrame').attr('src', url);
  },
  
  actions: {
    printInvoice() {
      const printFrame = Ember.$('#printFrame');
      printFrame[0].contentWindow.print();
    }
  }
});
