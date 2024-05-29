function checkRange(e) {
  return e <= 0 ? 0 : e > 255 ? 255 : e;
}
function tempToColor(e, t = -15, f = 45) {
  if (t > f) throw new Error("minimum cannot be greater than maximum");
  e < t ? (e = t) : e > f && (e = f);
  const r = (e - t) / (f - t);
  let n = 255,
    u = 255,
    o = 255;
  const c = [1 / 4, (1 / 4) * 2, (1 / 4) * 3];
  return (
    r <= c[0]
      ? ((n = 0), (u = 4 * r * 255.999), (o = 255))
      : r > c[0] && r <= c[1]
      ? ((n = 0), (u = 255), (o = 512 - 4 * r * 255.999))
      : r > c[1] && r <= c[2]
      ? ((n = 512 - 4 * (1 - r) * 255.999), (u = 255), (o = 0))
      : ((n = 255), (u = 4 * (1 - r) * 255.999), (o = 0)),
    {
      r: checkRange(Math.trunc(n)),
      g: checkRange(Math.trunc(u)),
      b: checkRange(Math.trunc(o)),
    }
  );
}

function getColor(value) {
  const { r, g, b } = tempToColor(value);
  return `rgb(${r},${g},${b})`;
}

const conditionIcon = {
  clear: "weather-sunny",
  "clear-night": "weather-night",
  cloudy: "weather-cloudy",
  fog: "weather-fog",
  hail: "weather-hail",
  lightning: "weather-lightning",
  "lightning-rainy": "weather-lightning-rainy",
  partlycloudy: "weather-partly-cloudy",
  pouring: "weather-pouring",
  rainy: "weather-rainy",
  snowy: "weather-snowy",
  "snowy-rainy": "weather-snowy-rainy",
  sunny: "weather-sunny",
  windy: "weather-windy",
  "windy-variant": "weather-windy",
};

class ContentCardExample extends HTMLElement {
  // Whenever the state changes, a new `hass` object is set. Use this to
  // update your content.
  set hass(hass) {
    // Initialize the content if it's not there yet.
    if (!this.content) {
      this.innerHTML = `
        <ha-card header="Example-card">
          <div class="card-content"></div>
        </ha-card>`;
      this.content = this.querySelector("div");
    }

    const entityId = this.config.entity;
    const state = hass.states[entityId];
    const stateStr = state ? state.state : "unavailable";

    const forecast = state.attributes.forecast;

    var trs = forecast
      .map((item) => {
        const itemDate = new Date(item.datetime);
        return {
          day: itemDate.toLocaleString("fr-FR", {
            weekday: "long",
            day: "numeric",
          }),
          time: itemDate.toLocaleString("fr-FR", {
            timeStyle: "short",
          }),
          wind_bearing: item.wind_bearing,
          temperature: item.temperature,
          condition: item.condition,
          humidity: item.humidity,
          precipitation: item.precipitation,
          wind_bearing: item.wind_bearing,
          wind_speed: item.wind_speed,
        };
      })
      .map((item) => {
        return `<tr>
					<td>${item.day}</td>
					<td>${item.time}</td>
					<td style="color:#aeaeae;background-color:${getColor(item.temperature)}">${
          item.temperature
        }</td>
					<td>  
            <div style="display:${
              item.wind_bearing ? "inline-block" : "hide"
            }; transform:rotate(${(item.wind_bearing || 0) + 180}deg)">
              <ha-icon icon="mdi:arrow-up" ></ha-icon>
            </div>
          </td>
					<td>${item.wind_speed || "-"}</td>
					<td>${item.precipitation || "-"}${item.precipitation ? "mm" : ""}</td>
					<td>${item.humidity}%</td>
					<td><ha-icon icon="mdi:${conditionIcon[item.condition]}"></ha-icon></td>
				</tr>`;
      });

    this.content.innerHTML = `<table>
								<thead>
									<tr>
										<th rowspan="2">Jour</th>
										<th rowspan="2">Heure</th>
										<th rowspan="2">Temp.</th>
										<th colspan="2">Vent km/h</th>
										<th rowspan="2">Pluie</th>
										<th rowspan="2">Humidité</th>
										<th rowspan="2">Temps</th>
									</tr>
									<tr>
                    <th>Dir.</th>
                    <th>Vit.</th>
									</tr>
								</thead>
								<tbody>
									${trs}
								</tbody>
								</table>`;
  }

  // The user supplied configuration. Throw an exception and Home Assistant
  // will render an error card.
  setConfig(config) {
    if (!config.entity) {
      throw new Error("You need to define an entity");
    }
    this.config = config;
  }

  // The height of your card. Home Assistant uses this to automatically
  // distribute all cards over the available columns.
  getCardSize() {
    return 3;
  }
}

customElements.define("content-card-example", ContentCardExample);
