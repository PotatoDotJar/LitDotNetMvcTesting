import {LitElement, CSSResultGroup, unsafeCSS} from 'lit'

export class BaseComponent extends LitElement {
    
    // Hacky way to get global styles from outside of the shadow DOM
    static get globalStyles(): CSSResultGroup {
        const { cssRules } = document.styleSheets[0];
        const globalStyle = unsafeCSS([Object.values(cssRules).map(rule =>
            rule.cssText).join('\n')]);

        return [
            globalStyle
        ]
    }
}
