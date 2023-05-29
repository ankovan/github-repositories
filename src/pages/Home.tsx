import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";
import RepositoriesList from "../components/RepositoriesList";
import { gql, useQuery } from '@apollo/client';
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
  const [shouldRefetch, setShouldRefetch] = useState(false);
  const dispatch = useDispatch();

  const perPage = 10; // number of repositories to show per page

  const { loading: currentUserLoading, error: currentUserError, data: currentUserData } = useQuery(
    getCurrentUserRepositoriesPageGql(perPage, cursor)
  );

  const { loading: searchLoading, error: searchError, data: searchData } = useQuery(
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
      // console.log("jsonparseNUMBER", parsedPageNumberLocal)
      setPage(parsedPageNumberLocal)      
      setShouldRefetch(true)
    }
    const pageCursorLocal = localStorage.getItem('pageCursorLocal')
    if (pageCursorLocal) {
      const parsedPageCursorLocal = JSON.parse(pageCursorLocal);
      setCursor(parsedPageCursorLocal)
      // const parsedPageCursorLocal = JSON.parse(pageCursorLocal)
      // dispatch(setPageNumberRedux(parsedPageCursorLocal))
      // // console.log("jsonparseNUMBER", parsedPageNumberLocal)
      // setPage(parsedPageCursorLocal)      
      // setShouldRefetch(true)
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

      // if (shouldRefetch && repositories.length > 0 && page !== 0 && searchState) {
      //   console.log("shouldRefetch:", page)
      //   if (!searchState.value && currentUserData) {
      //     handlePageClick(page, currentUserData.viewer.repositories);
      //     setShouldRefetch(false);
      //     console.log("AAAAAAAAAAAAAAAA", page)
      //   } else if (searchData) {
      //     handlePageClick(page, searchData.search);
      //     setShouldRefetch(false);
      //     console.log("BBBBBBBBBB", page, searchData.search)
      //   }
      // }
    }
  }, [currentUserData, searchData, searchState, shouldRefetch, page, currentUserLoading, searchLoading]);

  function handlePageClick(pageNumber: number, data: any) {
    const previousEndCursor = data.edges.slice(-1)[0]?.cursor;
    const newCursor = pageNumber === 0 ? null : previousEndCursor || null;
    setCursor(newCursor);
    setPage(pageNumber);
    dispatch(setPageNumberRedux(pageNumber))
    localStorage.setItem('pageNumberLocal', JSON.stringify(pageNumber))
    localStorage.setItem('pageCursorLocal', JSON.stringify(newCursor))
    console.log("pageNumberLocal", localStorage)
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
