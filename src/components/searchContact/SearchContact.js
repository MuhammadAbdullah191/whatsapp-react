import React, { useState } from 'react';
import { CrudApi } from '../../apis/shared/crudApi';
import { useDispatch } from 'react-redux';
import { setContacts } from '../../store/slices/data';
import { toast } from 'react-toastify';
import { MyContext } from '../../pages/dashboard/dashboard'

function SearchContact() {
  const dispatch = useDispatch()
  const [searchValue, setSearchValue] = useState('');
  const [disabled, setDisabled] = useState(true);
  const errHandler = React.useContext(MyContext);

  const handleSearch = () => {
    if(!disabled){
      CrudApi.getAll('users', searchValue)
        .then((res) => {
          dispatch(setContacts(res.data.users))
          toast('Search Successful')
        })
        .catch((err) => {
          errHandler(err)
        });
    }
  };

  const handleChange = (event) => {
    const value = event.target.value;
    setSearchValue(value);

    if (value === '') {
      handleSearch();
      setDisabled(true)
    }else{
      setDisabled(false)
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center p-2 border-bottom">
      <input
        className="search bg-light w-100"
        type="text"
        placeholder="Search or start a new chat"
        value={searchValue}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
      />
      <i className="fas fa-search search-icon" onClick={handleSearch}></i>
    </div>
  );
}

export default SearchContact;
