import ActiveNowSingle from "./ActiveNowSingle";

export default function ActiveNowContainer() {
  return (<div className="d-flex flex-column gap-3">
    <div className="d-flex justify-content-between w-100 mb-3">
        <span style={{fontWeight:'600',fontSize:'1.3rem' }}>Active Now</span>
        <div className="d-flex flex-row align-items-center gap-2">
            <span className="text-decoration-underline">View All</span>
            <img src='/icons/view-all-arrow.png' height={'9px'} width={'12px'}/>
        </div>
    </div>
    <div className="d-flex flex-column gap-3 position-relative">
    <ActiveNowSingle image={'Photo1'} time={58} isOnline={true}/>
    <ActiveNowSingle image={'Photo2'} time={30} isOnline={false}/>
    </div>
    </div>
  )
}
