import { DataPoint, ChartType } from '../types';

const regions = ['North America', 'Europe', 'Asia Pacific', 'Latin America', 'Middle East'];
const products = ['Product A', 'Product B', 'Product C', 'Product D', 'Product E'];
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const quarters = ['Q1', 'Q2', 'Q3', 'Q4'];

function randomValue(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function generateSampleData(
  chartType: ChartType,
  metrics: string[],
  dimensions: string[]
): DataPoint[] {
  const data: DataPoint[] = [];

  // Determine what kind of data to generate based on dimensions
  const dimension = dimensions[0]?.toLowerCase() || 'category';
  
  if (dimension.includes('region') || dimension.includes('geographic') || dimension.includes('location')) {
    regions.forEach(region => {
      const point: DataPoint = { name: region };
      metrics.forEach(metric => {
        point[metric] = randomValue(50000, 500000);
      });
      data.push(point);
    });
  } else if (dimension.includes('product')) {
    products.forEach(product => {
      const point: DataPoint = { name: product };
      metrics.forEach(metric => {
        point[metric] = randomValue(30000, 300000);
      });
      data.push(point);
    });
  } else if (dimension.includes('time') || dimension.includes('month') || dimension.includes('trend')) {
    months.forEach(month => {
      const point: DataPoint = { name: month };
      metrics.forEach(metric => {
        point[metric] = randomValue(40000, 400000);
      });
      data.push(point);
    });
  } else if (dimension.includes('quarter')) {
    quarters.forEach(quarter => {
      const point: DataPoint = { name: quarter };
      metrics.forEach(metric => {
        point[metric] = randomValue(100000, 1000000);
      });
      data.push(point);
    });
  } else {
    // Default: create generic categorical data
    for (let i = 1; i <= 6; i++) {
      const point: DataPoint = { name: `Category ${i}` };
      metrics.forEach(metric => {
        point[metric] = randomValue(10000, 200000);
      });
      data.push(point);
    }
  }

  return data;
}
