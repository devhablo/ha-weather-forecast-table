import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { EntityConfig, HomeAssistant } from "custom-card-helpers";
import  "./forecastTable.js";

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement("weather-forecast-table")
export class WeatherForecastTable extends LitElement {
  /**
   * Copy for the read the docs hint.
   */
  @property()
  docsHint = "Click on the Vite and Lit logos to learn more";

  @property() private hass?: HomeAssistant;
  @property() private _config?: EntityConfig;

  setConfig(config: EntityConfig) {
    this._config = config;
  }

  render() {
    if (!this._config || !this.hass) {
      return html`no config`;
    }

    const entityId = this._config.entity;
    const state = this.hass.states[entityId];
   // const stateStr = state ? state.state : "unavailable";

    const forecast = state.attributes.forecast;

   
    return html`<ha-card header="${this._config.name}">
                <div class="card-content">
                  <forecast-table id="forecastTable" .forecast="${forecast}"></forecast-table>
                </div>
              </ha-card>`;
  }

  static styles = css``;
}

declare global {
  interface HTMLElementTagNameMap {
    "weather-forecast-table": WeatherForecastTable;
  }
}
