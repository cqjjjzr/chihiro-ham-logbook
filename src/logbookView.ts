import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";

@customElement('logbook-view')
export class LogbookView extends LitElement {
  createRenderRoot() {
    return this;
  }
  render() {
    return html`
      <div class="flex justify-between mt-4 border-solid border-stone-400 border-2 rounded w-full grow overflow-auto">
        
      </div>
    </div>
    `;
  }
}
