import { useState, useEffect } from 'react';
import ImageGallery from './ImageGallery/ImageGallery';
import Searchbar from './Searchbar/Searchbar';
import Notiflix from 'notiflix';

import { ReturnFetch } from 'api/fetch';

export function App() {
  const [searchValue, setSearchValue] = useState('');
  const [page, setPage] = useState(1);
  const [dataImages, setDataImages] = useState([]);
  const [toggleLoader, setToggleLoader] = useState(false);
  const [loadHits, setLoadHits] = useState(0);

  const submitSearch = ({ searchInput }) => {
    if(searchValue === searchInput){
      return Notiflix.Notify.failure(
        'Please enter a search value different from the previous request'
      );
    }
    setPage(1);
    setDataImages([]);
    setSearchValue(searchInput);
  };

  const onLoadMore = () => {
    setPage(page + 1);
  };




  useEffect(() => {
    if (!searchValue) {
      return;
    }
    const getInfo = () => {
      setToggleLoader(true);
      ReturnFetch(searchValue, page)
        .then(data => {
          if (!data.total) {
            Notiflix.Notify.failure(
              'Sorry, but nothing was found for your search'
            );
          }
            setDataImages(prevImages => {
              return [...prevImages, ...data.hits];
            });
            setLoadHits(data.hits.length);
        })
        .catch(error => console.log(error))
        .finally(() => {
          setToggleLoader(false);
        });
    };
    getInfo({ searchValue, page});
    
  }, [searchValue, page]);


  
  return (
    <>
      <Searchbar onSubmit={submitSearch} />
      <ImageGallery
        dataImages={dataImages}
        toggleLoader={toggleLoader}
        loadHits={loadHits}
        onLoadMore={onLoadMore}
      />
    </>
  );
}
