import {css, html} from 'lit'
import {customElement, property, state} from 'lit/decorators.js'
import {TestDataModel} from "../models/TestDataModel.ts";
import {BaseComponent} from "./base-component.ts";
import { Task } from '@lit/task';

@customElement('fetch-example')
export class FetchExample extends BaseComponent {

    @state()
    private calls = 0;

    constructor() {
        super();

        // Call the API to get the data
        //this.getData();
    }

    // async getData() {
    //     this.data = [];
    //
    //     const response = await fetch('/api/MyApi');
    //     this.data = await response.json();
    // }
    
    private _getDataTask = new Task(this, {
        task: async ([], { signal }) => {
            console.log('Fetching data...');
            this.calls++;
            const response = await fetch('/api/MyApi', { signal });

            if (!response.ok) { throw new Error(response.status.toString()); }

            console.log('Data fetched!');
            return await response.json() as TestDataModel[];
        },
        args: () => []
    })
    
    private _onRefreshClick() {
        this._getDataTask.run();
    }

    render() {
        return html`
            <div>
                <h1>Fetch Example</h1>
                <p>Calls: ${this.calls}</p>
                <button class="p-4 color-" @click=${() => this._onRefreshClick()}>Refresh</button>

                ${this._getDataTask.render({
                    pending: () => html`<p>Loading...</p>`,
                    complete: (data: TestDataModel[]) => html`
                        <ul class="custom-color">
                            ${data.map(item => html`<li>${item.summary} - ${item.temperatureF}F - ${new Date(item.date).toISOString()}</li>`)}
                        </ul>
                    `,
                    error: (e) => html`<p>Error: ${e}</p>`
                })}
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
