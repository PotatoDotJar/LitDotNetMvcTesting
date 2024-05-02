import {css, html} from 'lit'
import {customElement, property} from 'lit/decorators.js'
import {TestDataModel} from "../models/TestDataModel.ts";
import {BaseComponent} from "./base-component.ts";

@customElement('fetch-example')
export class FetchExample extends BaseComponent {

    @property()
    data: Array<TestDataModel> = [];

    constructor() {
        super();

        // Call the API to get the data
        this.getData();
    }

    async getData() {
        this.data = [];

        const response = await fetch('/api/MyApi');
        this.data = await response.json();
    }

    render() {
        return html`
            <div>
                <h1>Fetch Example</h1>
                <button class="p-4 color-" @click=${() => this.getData()}>Refresh</button>
                ${this.data.length === 0 ? html`<p>Loading...</p>` : html``}

                <ul class="custom-color">
                    ${this.data.map(item => html`
                        <li>${item.summary} - ${item.temperatureF}F - ${new Date(item.date).toISOString()}</li>`)}
                </ul>
            </div>
        `
    }

    static styles = [
        BaseComponent.globalStyles,
        css`
            .custom-color {
                color: #0b5ed7;
            }
        `
    ]
}

declare global {
    interface HTMLElementTagNameMap {
        'fetch-example': FetchExample
    }
}
