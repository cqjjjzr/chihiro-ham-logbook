import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";

@customElement('logbook-view')
export class LogbookView extends LitElement {
  createRenderRoot() {
    return this;
  }
  render() {
    return html`
    <div uk-grid class="uk-child-width-expand@s uk-grid-divider uk-grid-collapse">
      <div>pib</div>
      <div>pib</div>

    </div>
    
    <div class="block border-solid border-stone-400 border-2 rounded w-full my-0 overflow-auto">
      <div class="uk-card uk-card-body uk-card-hover mx-3 mt-3">
        <h3 class="uk-card-title">Test card</h3>
      </div>
    </div>`;
  }
}
