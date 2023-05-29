import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";
import RepositoriesList from "../components/RepositoriesList";
import { useQuery } from '@apollo/client';
import { getCurrentUserRepositoriesPageGql } from "../API/getCurrentUserRepositories";
import { searchRepositoriesGql } from "../API/searchRepositories";
import { useEffect, useState } from "react";
import '../styles/Home.scss';
import { useSelector, useDispatch } from "react-redux";
import { setPageNumberRedux } from "../redux/pageSlice";
import { setSearchValueRedux } from "../redux/searchSlice";

function Home() {
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [cursor, setCursor] = useState(null);
  const [repositories, setRepositories] = useState([]);
  const searchState = useSelector((state:any) => state.search);
  const dispatch = useDispatch();

  const perPage = 10; // number of repositories to show per page

  const { loading: currentUserLoading, error: currentUserError, data: currentUserData } = useQuery(
    getCurrentUserRepositoriesPageGql(perPage, cursor)
  );

  const { loading: searchLoading, data: searchData } = useQuery(
    searchRepositoriesGql(searchState.value, perPage, cursor),
    { skip: !searchState.value }
  );

  useEffect(() => {
    const searchValueLocal = localStorage.getItem('searchValueLocal')
    console.log("get the local", searchValueLocal )
    if (searchValueLocal) {
      dispatch(setSearchValueRedux(searchValueLocal))
    }
    const pageNumberLocal = localStorage.getItem('pageNumberLocal')
    if (pageNumberLocal) {
      const parsedPageNumberLocal = JSON.parse(pageNumberLocal)
      dispatch(setPageNumberRedux(parsedPageNumberLocal))
      setPage(parsedPageNumberLocal)
    }
    const pageCursorLocal = localStorage.getItem('pageCursorLocal')
    if (pageCursorLocal) {
      const parsedPageCursorLocal = JSON.parse(pageCursorLocal);
      setCursor(parsedPageCursorLocal)
    }
  }, [])

  useEffect(() => {
    if (!currentUserLoading && !searchLoading) {
      if (!searchState.value) {
        setRepositories(currentUserData.viewer.repositories.nodes);
        setTotalPages(Math.ceil(currentUserData.viewer.repositories.totalCount / perPage));
      } else {
        console.log("searchData:", searchData)
        setRepositories(searchData?.search.nodes || []);
        setTotalPages(Math.ceil(searchData?.search.repositoryCount / perPage) || 0);
      }
    }
  }, [currentUserData, searchData, searchState, page, currentUserLoading, searchLoading]);

  function handlePageClick(pageNumber: number, data: any) {
    const previousEndCursor = data.edges.slice(-1)[0]?.cursor;
    const newCursor = pageNumber === 0 ? null : previousEndCursor || null;
    setCursor(newCursor);
    setPage(pageNumber);
    dispatch(setPageNumberRedux(pageNumber))
    localStorage.setItem('pageNumberLocal', JSON.stringify(pageNumber))
    localStorage.setItem('pageCursorLocal', JSON.stringify(newCursor))
  }

  return (
    <div>
      <SearchBar />
      {currentUserError && <p>Error :</p>}
      {currentUserLoading ? <p className="loading">Loading...</p> :
        (!searchLoading && repositories?.length > 0 &&
          <RepositoriesList repositories={repositories} />)
      }
      {totalPages ? (
        <Pagination
          pageCount={totalPages}
          currentPage={page}
          onPageChange={(pageNumber: number) => {
            if (!searchState.value) {
              handlePageClick(pageNumber, currentUserData.viewer.repositories);
            } else {
              handlePageClick(pageNumber, searchData.search);
            }
          }}
        />
      ) : <></>}
    </div>
  );
}


export default Home
