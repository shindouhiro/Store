'use client';

import { ProCard, StatisticCard } from '@ant-design/pro-components';
import { Statistic } from 'antd';
import { UserOutlined, ShoppingCartOutlined, FileOutlined, TeamOutlined } from '@ant-design/icons';

const { Divider } = StatisticCard;

export default function DashboardPage() {
  return (
    <div>
      <ProCard
        title="数据概览"
        headerBordered
        bordered
      >
        <StatisticCard.Group direction='row'>
          <StatisticCard
            statistic={{
              title: '用户总数',
              value: 1128,
              icon: <UserOutlined className="text-blue-500" />,
            }}
          />
          <Divider />
          <StatisticCard
            statistic={{
              title: '订单总数',
              value: 893,
              icon: <ShoppingCartOutlined className="text-green-500" />,
            }}
          />
          <Divider />
          <StatisticCard
            statistic={{
              title: '文章数量',
              value: 256,
              icon: <FileOutlined className="text-purple-500" />,
            }}
          />
          <Divider />
          <StatisticCard
            statistic={{
              title: '团队规模',
              value: 56,
              icon: <TeamOutlined className="text-orange-500" />,
            }}
          />
        </StatisticCard.Group>
      </ProCard>

      <div className="mt-8 grid grid-cols-2 gap-8">
        <ProCard
          title="最近7天用户增长"
          headerBordered
          bordered
        >
          <Statistic 
            title="新增用户" 
            value={126} 
            suffix="人"
          />
        </ProCard>

        <ProCard
          title="系统信息"
          headerBordered
          bordered
        >
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-500">系统版本</span>
              <span>v1.0.0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">上次更新</span>
              <span>2024-03-20</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">系统状态</span>
              <span className="text-green-500">运行正常</span>
            </div>
          </div>
        </ProCard>
      </div>
    </div>
  );
} 
