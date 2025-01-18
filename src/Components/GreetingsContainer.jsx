
import styles from './GreetingsContainer.module.css'
export default function GreetingsContainer() {
    const name="Jack"
    const num=7
    const max=127
    const value=120
  return (
    <div className={`d-flex flex-column mb-5 ${styles.greetingsContainer}`} >
      
      <h4 className={styles.hello} >Hello, {name} </h4>
      <div  className="d-flex justify-content-between">
        <span className={`${styles.waiting} mb-2`}>{num} new projects are waiting for you </span>
        <span className={styles.status}>Status</span>
      </div>
      <div className="d-flex justify-content-between align-items-center">
        <progress style={{appearance:'none', borderRadius:'10px', width:'85%'}} max={max} value={value}></progress>            
        <span>{value}/{max}</span>
      </div>
      
    </div>
  )
}
