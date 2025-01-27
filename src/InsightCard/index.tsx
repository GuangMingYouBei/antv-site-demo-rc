import React from 'react';
import { Timeline } from 'antd';
import { Paragraph } from '@antv/narrative-text-vis';
import type { PhraseSpec } from '@antv/narrative-text-vis';
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
  insightSummaries: string[] | PhraseSpec[][];
};

export interface InsightCardProps {
  insightInfo: {
    data: any;
    visualizationSchemas: VisualizationSchema[];
  };
  /** 是否显示 T8 文本 */
  showTextSchema?: boolean;
  width?: number;
  height?: number;
}

const getInsightIcon = (insightSummary: string | PhraseSpec[]) => {
  const insightText = Array.isArray(insightSummary)
    ? insightSummary.map((i) => i.value)
    : insightSummary;
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

export const InsightCard: React.FC<InsightCardProps> = ({
  insightInfo,
  width,
  height,
}) => {
  const { data, visualizationSchemas } = insightInfo;

  if (!visualizationSchemas) return null;

  const { chartType, chartSchema, caption, insightSummaries } =
    visualizationSchemas[0];

  return (
    <div
      style={{
        padding: 16,
        display: 'flex',
        overflowX: 'auto',
        boxShadow: '0px 1px 2px -1px #d9d9d9',
        width: width || '100%',
        height: height || '100%',
      }}
    >
      <div style={{ flex: 2 }}>
        <PlotCard
          chartType={chartType}
          data={data}
          schema={chartSchema}
          caption={caption}
        />
      </div>
      <div style={{ flex: 1, minWidth: 150, paddingLeft: 20, paddingTop: 40 }}>
        <Timeline style={{ width: '100%', height: '100%' }}>
          {insightSummaries?.map((item, index) => (
            <Timeline.Item dot={getInsightIcon(item)} key={index}>
              {Array.isArray(item) ? (
                <Paragraph
                  spec={{
                    type: 'normal',
                    phrases: item,
                  }}
                />
              ) : (
                item
              )}
            </Timeline.Item>
          ))}
        </Timeline>
      </div>
    </div>
  );
};
