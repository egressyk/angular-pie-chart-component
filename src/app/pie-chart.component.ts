import { Component, Input, OnInit } from '@angular/core';

export interface PieChartData {
  label: string;
  value: number;
  color: string;
}

@Component({
  selector: 'pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: [ './pie-chart.component.css' ]
})
export class PieChartComponent implements OnInit {
  @Input() data: PieChartData[];
  @Input() options: any = {
    isDoughnutChart: true,
    // ArcWidth is only applicable to doughnut chart, shound be between 0 and 2 (exclusive)
    arcWidth: 0.5,
    displayValuesOnChart: true,
    displayTotalOnChart: true,
    valuesFontColor: 'white',
    valuesFontSize: 0.2,
    totalFontColor: 'black',
    totalFontSize: 0.6
  };

  sum: number;
  processedData: any;
  viewBoxAttributes: string;

  ngOnInit() {
    this.viewBoxAttributes = this.getViewBoxAttributes(this.options);
    this.processedData = this.getProcessedData(this.data);
    this.options.totalFontSize = this.calculateFontSize(this.sum);
  }

  private getProcessedData(data: any[]): any[] {
    this.sum = data.reduce((sum, curr) => sum + curr.value, 0);
    const processedData = [];
    let cumulativePercentage = 0;

    data.forEach( dataElement => {
      const percentage = this.getPercent(dataElement.value);
      const largeArcFlag = percentage / 100 > .5 ? 1 : 0;
      const startCoord = this.getArcCoords(cumulativePercentage);
      const textCoord = this.getTextCoords(cumulativePercentage, percentage);
      cumulativePercentage += percentage;
      const endCoord = this.getArcCoords(cumulativePercentage);

      processedData.push({
        label: dataElement.label,
        value: dataElement.value,
        color: dataElement.color,
        percentage: percentage,
        pathData:  this.options.isDoughnutChart ? 
          this.getPathForDoughnut(startCoord, endCoord, largeArcFlag) :
          this.getPathForPie(startCoord, endCoord, largeArcFlag),
        textCoord: textCoord
      });
    });

    return processedData;
  }

  private calculateFontSize(text: any){
    const length = text.toString().length;
    return Math.min(2.6/length, 1);
  }

  private getPercent(value): number {
    return value*100/this.sum;
  }

  private getArcCoords(percent: number): {x: number, y: number} {
    const x = Math.cos(2 * Math.PI * (percent / 100));
    const y = Math.sin(2 * Math.PI * (percent / 100));
    return {x, y};
  }

  private getTextCoords(cumulativePercentage: number, percentage: number): {x: number, y: number} {
    const x = Math.cos(2 * Math.PI * ((cumulativePercentage + (percentage / 2)) / 100)) * 0.5;
    const y = Math.sin(2 * Math.PI * ((cumulativePercentage + (percentage / 2)) / 100)) * 0.5;
    return {x, y};
  }

  private getPathForPie(startCoord, endCoord, largeArcFlag): string {
    return `M ${startCoord.x} ${startCoord.y} A 1 1 0 ${largeArcFlag} 1 ${endCoord.x} ${endCoord.y} L 0 0`
  }

  private getPathForDoughnut(startCoord, endCoord, largeArcFlag): string {
    return `M ${startCoord.x} ${startCoord.y} A 1 1 0 ${largeArcFlag} 1 ${endCoord.x} ${endCoord.y}`
  }

  private getViewBoxAttributes(options): string {
    if (options.isDoughnutChart) {
      return [
        -1 - options.arcWidth / 2, 
        -1 - options.arcWidth / 2, 
        2 + options.arcWidth, 
        2 + options.arcWidth
      ].join(' ')
    };
    return [-1, -1, 2, 2].join(' ');   
  }
}