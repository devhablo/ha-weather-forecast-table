import {LitElement, TemplateResult, css, html, nothing} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import { getConditionIcon, precipitationToColor, setForegroundColor, tempToColor } from './utils';

@customElement('forecast-table')
export class ForecastTable extends LitElement {
  // Define scoped styles right with your component, in plain CSS
  static styles = css`
    .temperature{
      color:#333;
    }

    .condition{
      color: var(--paper-item-icon-color)
    }

    .forecastTable{
      width:100%;
    }
    .forecastTable tr{
      text-align:center;
    }
    .forecastTable tr.odd{
      background-color: var(--table-row-background-color);
      }
      .forecastTable tr.even{
        background-color:var(--table-row-alternative-background-color);
      }
  `;

  // Declare reactive properties
  @property({type: Array}) forecast = [];

   getStyleTemp = (value: number) => {
    const { r, g, b } = tempToColor(value);
    return  `color:${setForegroundColor(r, g, b )};background-color:rgb(${r},${g},${b})`
  };
  getStylePrecipitation = (value: number) => {
    if(!value){
      return;
    }
    const { r, g, b } = precipitationToColor(value);
    return  `color:${setForegroundColor(r, g, b )};background-color:rgb(${r},${g},${b})`
  };
  formatData = (item:any) =>{
    const itemDate = new Date(item.datetime);
    return {
        day: itemDate.toLocaleString("fr-FR", {
          weekday: "short",
          day: "2-digit",
        }),
        time: itemDate.toLocaleString("fr-FR", {
          timeStyle: "short",
        }),
        wind_bearing: item.wind_bearing,
        temperature: Math.round(item.temperature),
        condition: item.condition,
        humidity: item.humidity,
        precipitation: item.precipitation,
        windBearing: item.wind_bearing,
        windSpeed: item.wind_speed
    }
  }


  renderDay = (day:string, cssClass: string,  forecast:any[]) :TemplateResult[] =>{
     return forecast.map((item, index) => this.renderItem(index,day, forecast.length, item, cssClass))
}

  renderItem = (index:number, day:string, nbItems :number, item:any, cssClass: string)  =>{
    return html`<tr class="${cssClass}">
            ${index==0 ? html`<td rowspan="${nbItems}">${day}</td>`: html``}
            <td>${item.time}</td>
            <td class="temperature" style="${this.getStyleTemp(item.temperature)}">${item.temperature}°C</td>
            <td> ${item.windBearing ? html`<div style="transform:rotate(${(item.windBearing || 0) + 180}deg)">
                                            <ha-icon icon="mdi:arrow-up" ></ha-icon>
                                          </div>` : nothing }
        </td>
            <td>${item.windSpeed || "-"}</td>
            <td style="${this.getStylePrecipitation(item.precipitation)}">${item.precipitation || "-"}${item.precipitation ? " mm" : ""}</td>
            <td>${item.humidity} %</td>
            <td class="condition"><ha-icon icon="mdi:${getConditionIcon(item.condition)}"></ha-icon></td>
        </tr>`
    }
  
    groupByDay =( src  : any[]) => {
        return src.reduce((group, item) => {
            const { day } = item;
            group[day] = group[day] ?? [];
            group[day].push(item);
            return group;
          }, {})
    }

  render() {

    const formatedData = this.forecast.map(this.formatData)
    const groupedData = this.groupByDay(formatedData)

    let trs =html``
    let igroup =0
    for (const i in groupedData) {
      igroup++;
        trs = html`${trs}${this.renderDay(i, (igroup%2? 'even':'odd'),groupedData[i])}`
      }

    return html`<table class="forecastTable">
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

    
}


