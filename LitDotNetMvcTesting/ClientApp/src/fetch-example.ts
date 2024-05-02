import {LitElement, css, html} from 'lit'
import {customElement, property} from 'lit/decorators.js'
import {TestDataModel} from "./models/TestDataModel.ts";

@customElement('fetch-example')
export class FetchExample extends LitElement {

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
                <button @click=${() => this.getData()}>Refresh</button>
                ${this.data.length === 0 ? html`<p>Loading...</p>` : html``}

                <ul>
                    ${this.data.map(item => html`
                        <li>${item.summary} - ${item.temperatureF}F - ${new Date(item.date).toISOString()}</li>`)}
                </ul>
            </div>
        `
    }

    static styles = css`
        button {
            padding: 1rem;
        }
    `;
}

declare global {
    interface HTMLElementTagNameMap {
        'fetch-example': FetchExample
    }
}
