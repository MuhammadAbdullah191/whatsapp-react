import React, { useState } from 'react';
import { CrudApi } from '../../apis/shared/crudApi';
import { useDispatch } from 'react-redux';
import { setContacts } from '../../store/slices/data';
import { errHandler } from '../../helpers/logouthelper';

function SearchContact() {
	const dispatch = useDispatch()
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = () => {
    CrudApi.getAll('users',searchValue)
      .then((res) => {
				dispatch(setContacts(res.data.users))
      })
      .catch((err) => {
        errHandler(err)
      });
  };

  const handleChange = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <div className="d-flex justify-content-center align-items-center p-2 border-bottom">
      <input
        className="search bg-light w-100"
        type="text"
        placeholder="Search or start a new chat"
        value={searchValue}
        onChange={handleChange}
      />
      <i className="fas fa-search search-icon" onClick={handleSearch}></i>
    </div>
  );
}

export default SearchContact;
