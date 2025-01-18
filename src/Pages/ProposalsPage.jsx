import styles from './MainPage.module.css'
export default function ProposalsPage() {
  return (
    <div className={`${styles.mainPageContainer} bg-light vh-100 w-100`} style={{ marginInlineStart: "180px" }}>
        <div className='p-3' style={{fontSize: '2rem', fontWeight: '700',}}>
          Proposals
        </div>
    </div>
  )
}
