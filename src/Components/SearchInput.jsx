export default function SearchInput() {
    const styles={
        backgroundColor: "#faf1f4", borderRadius: "25px", width: "230px"
    }
    return (
        <div className="d-flex align-items-center px-2" style={styles}>

            <img
                src="search.png"
                alt="Search Icon"
                className="ms-3"
                style={{
                    width: "16px",
                    height: "16px",
                    opacity: "0.6", 
                }}
            />

            <input
                type="text"
                className="border-0 w-100 ps-4 bg-transparent text-muted"
                placeholder="Search"
                style={{
                    outline: "none", 
                }}
            />
        </div>
    );
}