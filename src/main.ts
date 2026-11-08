import { LitElement, PropertyValues, css, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { HomeAssistant } from "custom-card-helpers";
import "./forecastTable.js";

interface CardConfig {
  type: string;
  entity: string;
  name?: string;
  forecast_type?: "hourly" | "daily" | "twice_daily"; // défaut : hourly
}

@customElement("weather-forecast-table")
export class WeatherForecastTable extends LitElement {
  @property({ attribute: false }) hass?: HomeAssistant;
  @state() private _config?: CardConfig;
  @state() private _forecast: any[] = [];
  @state() private _error?: string;

  private _unsub?: Promise<() => void>;

  setConfig(config: CardConfig) {
    if (!config?.entity) {
      throw new Error("Le paramètre 'entity' est obligatoire");
    }
    this._unsubscribe();
    this._config = config;
    this._forecast = [];
    this._error = undefined;
  }

  connectedCallback() {
    super.connectedCallback();
    this.requestUpdate(); // relance l'abonnement si la carte revient dans la page
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._unsubscribe();
  }

  protected willUpdate(_changed: PropertyValues) {
    this._subscribe();
  }

  private _subscribe() {
    if (this._unsub || !this.hass || !this._config) return;

    const { entity, forecast_type = "hourly" } = this._config;
    if (!this.hass.states[entity]) {
      this._error = `Entité introuvable : ${entity}`;
      return;
    }

    this._unsub = this.hass.connection.subscribeMessage<{ forecast: any[] | null }>(
      (event) => {
        this._forecast = event.forecast ?? [];
        this._error = undefined;
      },
      { type: "weather/subscribe_forecast", forecast_type, entity_id: entity }
    );
    // Si l'abonnement échoue (type de prévision non pris en charge, par exemple)
    this._unsub.catch((err: any) => {
      this._unsub = undefined;
      this._error = err?.message ?? "Impossible de récupérer les prévisions";
    });
  }

  private _unsubscribe() {
    this._unsub?.then((unsub) => unsub()).catch(() => {});
    this._unsub = undefined;
  }

  render() {
    if (!this._config || !this.hass) return html`Pas de configuration`;
    if (this._error) {
      return html`<ha-card><div class="card-content">${this._error}</div></ha-card>`;
    }

    return html`<ha-card header="${this._config.name ?? ""}">
      <div class="card-content">
        <forecast-table .forecast="${this._forecast}"></forecast-table>
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
