function SearchContact() {
	return ( 
		<div className="d-flex justify-content-center alighn-items-center p-2 border-bottom">
			<input className="search w-100" type="text" placeholder="Search or start a new chat"/>
			<i class="fas fa-search search-icon"></i>
		</div>
	 );
}

export default SearchContact;