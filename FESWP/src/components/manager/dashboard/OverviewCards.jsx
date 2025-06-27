import React from 'react';
import { Users, UserCheck, TestTube, Calendar } from 'lucide-react';
import './OverviewCards.css';

const cards = [
  {
    title: 'Tổng số người dùng',
    value: '2,847',
    change: '+125 người dùng mới tháng này',
    icon: Users,
    iconColor: 'icon blue',
  },
  {
    title: 'Tư vấn viên hoạt động',
    value: '45',
    change: '42/45 đang online',
    icon: UserCheck,
    iconColor: 'icon green',
  },
  {
    title: 'Dịch vụ xét nghiệm',
    value: '23',
    change: 'Đang cung cấp',
    icon: TestTube,
    iconColor: 'icon purple',
  },
  {
    title: 'Lịch tư vấn hôm nay',
    value: '4',
    change: '1/4 hoàn thành',
    icon: Calendar,
    iconColor: 'icon orange',
  },
];

const OverviewCards = () => {
  return (
    <div className="overview-grid">
      {cards.map((card, index) => (
        <div key={index} className="overview-card">
          <div className="overview-content">
            <div>
              <p className="overview-title">{card.title}</p>
              <h2 className="overview-value">{card.value}</h2>
              <p className="overview-change">{card.change}</p>
            </div>
            <div className="overview-icon-wrapper">
              <card.icon className={card.iconColor} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OverviewCards;
