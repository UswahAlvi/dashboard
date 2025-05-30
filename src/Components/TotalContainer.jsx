import styles from './TotalContainer.module.css';

export default function TotalContainer({ name, number, progress, color }) {
  return (
    <div className={`${styles.totalContainer} bg-white px-5 py-4`} style={{ width: 'fit-content' }}>
      <div className="d-flex flex-row mb-3">
        <div className={`${styles.iconContainer} p-2 d-flex justify-content-center align-items-center`}>
          <img src="edit.png" style={{ height: '15px', width: '15px' }} />
        </div>
        <span className="ms-4" style={{ color: '#697077' }}>
          {name}
        </span>
      </div>
      <div className="d-flex flex-row justify-content-between">
        <h2>
            {name === 'Total Earnings' ? '$' : ''}
            {number}
        </h2>
        <div
          className="bg-light d-flex justify-content-center align-items-center px-3 mt-2"
          style={{
            fontSize: '10px',
            height: '17px', 
            borderRadius: '12px',
          }}
        >
          <span className="text-center" style={{ color: color }}>
            {name === 'Total Earnings' ? '$' : ''}
            {progress}%
          </span>
        </div>
      </div>
    </div>
  );
}
