const Filter = (props) => {
    return (
        <div>
            Filter list: <input type="search" value={props.filter} onChange={props.filterList} />
        </div>
    )
}

export default Filter