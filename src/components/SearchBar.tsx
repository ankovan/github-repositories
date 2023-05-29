import '../styles/SearchBar.scss';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {setSearchValueRedux} from '../redux/searchSlice'

function SearchBar() {
  const searchStateRedux = useSelector((state:any) => state.search)
  const [searchValue, setSearchValue] = useState('')
  const dispatch = useDispatch();
  useEffect(() => {
    setSearchValue(searchStateRedux.value)
  },[searchStateRedux])
  
  const changeSearchValue = (event:any) => {
    setSearchValue(event.target.value);
    dispatch(setSearchValueRedux(event.target.value));
    localStorage.setItem('searchValueLocal', (event.target.value));
    console.log("local", localStorage)
  };
  console.log(searchValue)
  return (
    <div 
    className="search-bar"
    onChange={changeSearchValue}
    >
      <input className='search-bar-input' placeholder="Search..." value={searchValue}/>
    </div>
  )
}

export default SearchBar