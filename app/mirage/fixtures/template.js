const templateMarkup = `
<style>
body {
  font-size: 12px;
  line-height: 18px;
  font-family: 'Open Sans', sans-serif;
}

h1 {
  margin-top: 20px;
  margin-bottom: 20px;
  padding-bottom: 5px;
  font-family: 'Montserrat', sans-serif;
  font-size: 24px;
  line-height: 36px;
  border-bottom: 2px solid $light-gray;
}

hr {
  border-top: 2px solid $light-gray;
}

a {
  color: #333;
  font-weight: bold;
}

h3,
h4 {
  font-weight: bold;
}
</style>
<div class="invoice-view">
<header id="header" class="container">
  <div class="row">
    <div class="col-xs-6">
      {{#if model.logo}}
      <div class="logo">
        <img src={{model.logo}} alt="logo" style="height: 120px; width: auto;">
      </div>
      {{/if}}
      <span class="company-address">
          {{linebreak-renderer model.senderAddress}}
      </span>
    </div>
    <div class="col-xs-6">
    </div>
  </div>
</header>

<main id="main" class="container">
  <div class="row">
    <div class="col-xs-12">
      <h1><span class="invoice-number">{{model.invoiceNumber}}</span></h1>
    </div>
  </div>
  <div class="row">
    <div class="col-xs-7">
      <span class="customer-address">
        {{linebreak-renderer model.recipientAddress}}
      </span>
    </div>
    <div class="col-xs-5">
      <table class="table invoice-data">
        <tbody>
            <tr>
              <td>Erstellt am:</td>
              <td>{{moment-format model.issuedDate 'DD-MM-YYYY'}}</td>
            </tr>
            <tr>
              <td>Leistungszeitraum:</td>
              <td>{{moment-format model.serviceFromDate 'DD-MM-YYYY'}} - {{moment-format model.serviceToDate 'DD-MM-YYYY'}}</td>
            </tr>
            <tr>
              <td>Zahlung fällig bis:</td>
              <td>{{moment-format model.paymentDueDate 'DD-MM-YYYY'}}</td>
            </tr>
          </tbody>
      </table>
    </div>
  </div>
  <div class="row">
    <div class="col-xs-12">
      <table class="table product-table">
          <thead>
            <tr>
              <th>Item</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {{#each model.invoiceItems as |item|}}
            <tr>
              <td>{{item.description}}</td>
              <td>{{item.amount}}&nbsp;{{model.currency}}</td>
            </tr>
            {{/each}}
          </tbody>
          <tfoot>
            {{#if model.isValidTaxRate}}
              <tr>
                <td>Subtotal</td>
                <td>{{model.subTotal}}&nbsp;{{model.currency}}</td>
              </tr>
              <tr>
                <td>Tax ({{model.taxRate}}%)</td>
                <td>{{model.taxAmount}}&nbsp;{{model.currency}}</td>
              </tr>
            {{/if}}
            <tr class="sum-total">
              <td>Total</td>
              <td><b>{{model.total}}&nbsp;{{model.currency}}</b></td>
            </tr>
          </tfoot>
        </table>
    </div>
  </div>
</main>
<footer id="footer" class="container">
  <div class="row">
    <div class="col-xs-5">
      <h4>Terms</h4>
      <span class="data-box">
        {{linebreak-renderer model.invoiceTerms}}
      </span>
    </div>
    <div class="col-xs-6 col-xs-offset-1">
      <h4>Thank you</h4>
      <span class="data-box">
        {{linebreak-renderer model.personalData}}
      </span>
    </div>
  </div>
</footer>
</div>`;

export default [
  {
    id: 1,
    title: 'Default Template',
    markup: templateMarkup
  }
];