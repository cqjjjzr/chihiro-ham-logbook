import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";

@customElement('logbook-view')
export class LogbookView extends LitElement {
  createRenderRoot() {
    return this;
  }
  render() {
    return html`
    <div class="w-full h-full flex flex-col">
      <div class="grid grid-cols-2 sm:grid-cols-3">
        <div>pib</div>
        <div>pib</div>
        <div>pib</div>
        <div>pib</div>
        <div>pib</div>
        <div>pib</div>
        <div>pib</div>

      </div>

      <div class="block mt-4 border-solid border-stone-400 border-2 rounded w-full grow overflow-auto">
        test card
      </div>
    </div>
    `;
  }
}
