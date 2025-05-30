import styles from './ActiveNowSingle.module.css';

export default function ActiveNowSingle({ image, time, isOnline }) {
  return (
    <div className={styles.container}>
      <div className={styles.profile}>
        <img
          src={`${image}.png`}
          alt="Profile"
          className={styles.profileImage}
        />
        {isOnline && <div className={styles.onlineIndicator}></div>}
      </div>
      <div className={`${styles.content} d-flex flex-column gap-2`}>
        <div className={`${styles.header} d-flex gap-4`}>
          <span className={styles.name}>Ryan Thomspon</span>
          <span className={styles.timeLabel}>Time Spend</span>
        </div>
        <div className={`${styles.details} d-flex gap-4`}>
          <span className={styles.role}>Lead Strategist</span>
          <span className={styles.time}>{time} mins</span>
        </div>
      </div>
    </div>
  );
}
