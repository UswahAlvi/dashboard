import HeaderIconsContainer from "./HeaderIconsContainer";
import SearchInput from "./SearchInput";
import styles from './Header.module.css'
export default function Header({ title }) {

  return (
    <div className={`d-flex justify-content-between mt-5 ms-4 me-3`} >
      <span className={styles.title}>{title}</span>
      <div className="d-flex">
        <SearchInput />
        <HeaderIconsContainer />
      </div>
    </div>
  );
}
