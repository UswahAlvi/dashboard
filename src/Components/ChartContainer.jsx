import { useState } from 'react';
import styles from './ChartContainer.module.css';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const originalData = [
  { day: 'S', tasks: 1, projects: 1 },
  { day: 'M', tasks: 15, projects: 17 },
  { day: 'T', tasks: 3, projects: 4 },
  { day: 'W', tasks: 8, projects: 11 },
  { day: 'T', tasks: 1, projects: 2 },
  { day: 'F', tasks: 10, projects: 11 },
  { day: 'S', tasks: 2, projects: 4 },
];

// Normalization function
const normalize = (value, min, max) => ((value - min) / (max - min)) * 2 + 1;
const minValue = Math.min(...originalData.flatMap((d) => [d.tasks, d.projects]));
const maxValue = Math.max(...originalData.flatMap((d) => [d.tasks, d.projects]));

const normalizedData = originalData.map((d) => ({
  day: d.day,
  tasks: normalize(d.tasks, minValue, maxValue),
  projects: normalize(d.projects, minValue, maxValue),
  originalTasks: d.tasks,
  originalProjects: d.projects,
}));

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const pointData = payload[0]?.payload;
    return (
      <div
        style={{
          backgroundColor: '#10898F',
          color: 'white',
          padding: '8px 12px',
          borderRadius: '8px',
          textAlign: 'center',
        }}
      >
        <p style={{ margin: 0 }}>{`Tasks: ${pointData.originalTasks}`}</p>
        <p style={{ margin: 0 }}>{`Projects: ${pointData.originalProjects}`}</p>
      </div>
    );
  }
  return null;
};

const ChartContainer = () => {
  const [activeDotIndex, setActiveDotIndex] = useState(null);

  const handleMouseEnter = (index) => {
    setActiveDotIndex(index);
  };

  const handleMouseLeave = () => {
    setActiveDotIndex(null);
  };

  return (
    <div className={`bg-white ${styles.chartContainer}`}>
      <div className={styles.header}>
        <h3 className={styles.title}>Activity</h3>
        <span className={styles.dropdown}>
          This Week
          <img
            className="mx-2"
            src="arrow-down.png"
            height={'13px'}
            width={'13px'}
          />
        </span>
      </div>
      <ResponsiveContainer width="100%" height={130}>
        <LineChart
          data={normalizedData}
          margin={{ top: 20, right: 30, left: 0, bottom: 10 }}
        >
          <CartesianGrid stroke="#F5F5F7" />
          <XAxis
            dataKey="day"
            tick={{ fontSize: '1rem' , fill: 'black', fontWeight: '500' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            domain={[1, 3]}
            ticks={[1, 2, 3]}
            tick={{ fontSize: '1rem', fill: 'black', fontWeight: '500' }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="linear"
            dataKey="tasks"
            stroke="#C72C88"
            strokeWidth={3}
            dot={({ cx, cy, index }) => {
              const isActiveDot = activeDotIndex === index;
              return isActiveDot ? (
                <circle
                  cx={cx}
                  cy={cy}
                  r={10}
                  strokeWidth={3}
                  fill="#FFF"
                  stroke="#FF4081"
                />
              ) : null;
            }}
            onMouseEnter={(_, index) => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
            isAnimationActive={false}
          />
          <Line
            type="linear"
            dataKey="projects"
            stroke="#10898F"
            strokeWidth={3}
            dot={(props) => {
              const { cx, cy, index } = props;
              const isActiveDot = activeDotIndex === index;
              return isActiveDot ? (
                <circle
                  cx={cx}
                  cy={cy}
                  r={10}
                  strokeWidth={3}
                  fill="#FFF"
                  stroke="#00BCD4"
                />
              ) : null;
            }}
            onMouseEnter={(_, index) => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartContainer;
