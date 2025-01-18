import styles from './TodayTaskContainer.module.css';

export default function TodayTaskContainer() {
  const progress = 90;

  return (
    <div className={styles.taskContainer}>
      <div className={styles.header}>
        <span>Task Today</span>
        <img src="/icons/three-dots.png" alt="Menu" />
      </div>

      <img
        src="/images/task-today-image.png"
        alt="Task Today"
        className={styles.taskImage}
      />

      <div>
        <div className={styles.title}>IMPLEMENT Remote Work Policy</div>
        <div className={styles.subtitle}>Workforce Planning Analyst</div>
      </div>

      <div>
        <div className={styles.progressContainer}>
          <span className='fw-bold'>Progress</span>
          <span className='txt-clr'>{progress}%</span>
        </div>
        <div className={styles.progressBar}>
          <div
            className={styles.progressBarFill}
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      <div className={styles.infoContainer}>
        <div className={styles.timeInfo}>
          <img
            src="/icons/time-circle.png"
            alt="Time"
            className={styles.timeIcon}
          />
          <span>1 Hour</span>
        </div>
        <img src='/icons/students.png' />
      </div>

      <div className={styles.divider}></div>

      <div>
        <div className={styles.detailTaskHeader}>
          <span>Detail Task</span>
          <span style={{color:'#54577A', width:'100px'}}> Workplace Planning Analyst</span>
        </div>
        <div className={styles.taskItem}>
          <span style={{borderRadius:'10px', backgroundColor:'#F5F5F7', padding:'5px 10px' }}>1</span>
          <span >Draft Remote Work Policy</span>
        </div>
        <div className={styles.taskItem}>
        <span style={{borderRadius:'10px', backgroundColor:'#F5F5F7', padding:'5px 10px' }}>2</span>
          <span>Review Legal and Compliance Requirements</span>
        </div>
        <div className={styles.taskItem}>
        <span style={{borderRadius:'10px', backgroundColor:'#F5F5F7', padding:'5px 10px' }}>3</span>
          <span> Conduct Employee Training on Remote Work Best Practices</span>
        </div>
      </div>
    </div>
  );
}
