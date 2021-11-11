import React from 'react';
import { Timeline } from 'antd';
import {
  RiseOutlined,
  FallOutlined,
  BoxPlotOutlined,
  StockOutlined,
  DotChartOutlined,
  PieChartOutlined,
  BarChartOutlined,
} from '@ant-design/icons';
import { PlotCard } from '../PlotCard';

type VisualizationSchema = {
  chartType: string;
  chartSchema: any;
  caption: string;
  insightSummary: string[];
};

export interface InsightCardProps {
  insightInfo: {
    data: any;
    visualizationSchemas: VisualizationSchema[];
  };
  width?: number;
  height?: number;
}

const getInsightIcon = (insightText: string) => {
  if (insightText.indexOf('increasing') !== -1)
    return <RiseOutlined style={{ fontSize: 24 }} />;
  if (insightText.indexOf('decreasing') !== -1)
    return <FallOutlined style={{ fontSize: 24 }} />;
  if (insightText.indexOf('outlier') !== -1)
    return <BoxPlotOutlined style={{ fontSize: 24 }} />;
  if (insightText.indexOf('change') !== -1)
    return <StockOutlined style={{ fontSize: 24 }} />;
  if (insightText.indexOf('majority') !== -1)
    return <PieChartOutlined style={{ fontSize: 24 }} />;
  if (insightText.indexOf('variance') !== -1)
    return <BarChartOutlined style={{ fontSize: 24 }} />;
  return <DotChartOutlined style={{ fontSize: 24 }} />;
};

export const InsightCard: React.FC<InsightCardProps> = ({ insightInfo }) => {
  const { data, visualizationSchemas } = insightInfo;

  if (!visualizationSchemas) return null;

  const { chartType, chartSchema, caption, insightSummary } =
    visualizationSchemas[0];

  return (
    <div
      style={{
        padding: 16,
        display: 'flex',
        boxShadow: '0px 1px 2px -1px #d9d9d9',
      }}
    >
      <div style={{ flex: 'none' }}>
        <PlotCard
          chartType={chartType}
          data={data}
          schema={chartSchema}
          caption={caption}
        />
      </div>
      <div style={{ flex: 1, paddingLeft: 20, paddingTop: 40 }}>
        <Timeline>
          {insightSummary?.map((item) => (
            <Timeline.Item dot={getInsightIcon(item)}>{item}</Timeline.Item>
          ))}
        </Timeline>
      </div>
    </div>
  );
};