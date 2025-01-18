

export default function ProposalsContainer() {
  return (
    <div className="d-flex flex-column">
        <div className="d-flex justify-content-between w-100 my-3">
            <span style={{fontWeight:'600',fontSize:'1.3rem' }} >Your Proposals</span>
            <div className="d-flex flex-row align-items-center gap-2">
            <span className="text-decoration-underline">View All</span>
            <img src='/icons/view-all-arrow.png' height={'12px'} width={'14px'}/>
        </div>
        </div>
        <div className="d-flex justify-content-between">
            <img src='/images/ss1.png' />
            <img src='/images/ss2.png' />
            <img src='/images/ss3.png' />
        </div>
    </div>
  )
}
