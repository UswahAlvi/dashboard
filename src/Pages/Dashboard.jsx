import GreetingsContainer from '../Components/GreetingsContainer'
import TotalContainer from '../Components/TotalContainer'
import ActiveNowContainer from '../Components/ActiveNowContainer'
import CalendarContainer from '../Components/CalendarContainer'
import ChartContainer from '../Components/ChartContainer'
import TodayTaskContainer from '../Components/TodayTaskContainer'
import ProposalsContainer from '../Components/ProposalsContainer'
import SearchInput from '../Components/SearchInput'
import HeaderIconsContainer from '../Components/HeaderIconsContainer'
import styles from './MainPage.module.css'
export default function Dashboard() {
  return (
    <div className={`${styles.mainPageContainer} d-flex flex-column flex-grow-1 bg-light h-100 w-100`} style={{ marginInlineStart: "180px" }}>
        <div className='d-flex h-100 w-100 bg-light p-4 justify-content-between flex-wrap'>
          <div className='d-flex flex-column flex-grow-1 ps-2 pe-4'>
            <h2 className='my-4'>Dashboard</h2>
            <div className='d-flex flex-column' style={{ maxWidth:'650px' }}>
              <GreetingsContainer />
              <div className='d-flex justify-content-between w-100 mb-5 '>
                <TotalContainer name={"Today's Tasks"} number={15} progress={70} color={"#10898F"} />
                <TotalContainer name={"Total Projects"} number={127} progress={80} color={"#C72C88"} />
                <TotalContainer name={"Total Earnings"} number={12000} progress={60} color={"#10898F"} />
              </div>
            </div>

            <div className='d-flex w-100 gap-5 mb-5'>
              <ChartContainer />
              <ActiveNowContainer />
            </div>
            <ProposalsContainer />
          </div>
          <div className='d-flex flex-column gap-3' style={{maxWidth:'340px', minWidth:'330px'}}>
            <div className={`d-flex justify-content-between mt-3 mx-3`}>
              <h2 style={{color:'#F5F5F7'}}>|</h2>
            <div className='d-flex w-100'>
              <SearchInput />
              <HeaderIconsContainer />
            </div>
            </div>
            <CalendarContainer />
            <TodayTaskContainer />
          </div>
          
        </div>
    </div>
  )
}
