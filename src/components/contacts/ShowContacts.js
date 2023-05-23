function ShowContacts() {
	const contacts = [
    { name: 'John', message: 'Hello!' },
    { name: 'Jane', message: 'How are you?' },
    { name: 'Bob', message: 'Nice to meet you' },
		{ name: 'John', message: 'Hello!' },
    { name: 'Jane', message: 'How are you?' },
    { name: 'Bob', message: 'Nice to meet you' },
		{ name: 'John', message: 'Hello!' },
    { name: 'Jane', message: 'How are you?' },
    { name: 'Bob', message: 'Nice to meet you' },
		{ name: 'John', message: 'Hello!' },
    { name: 'Jane', message: 'How are you?' },
    { name: 'Bob', message: 'Nice to meet you' },
		{ name: 'John', message: 'Hello!' },
    { name: 'Jane', message: 'How are you?' },
    { name: 'Bob', message: 'Nice to meet you' },
		{ name: 'John', message: 'Hello!' },
    { name: 'Jane', message: 'How are you?' },
    { name: 'Bob', message: 'Nice to meet you' },
		{ name: 'John', message: 'Hello!' },
    { name: 'Jane', message: 'How are you?' },
    { name: 'Bob', message: 'Nice to meet you' },
		{ name: 'John', message: 'Hello!' },
    { name: 'Jane', message: 'How are you?' },
    { name: 'Bob', message: 'Nice to meet you' },
  ];
	return ( 
		<div className="contacts pe-2 h-100 overflow-scroll">
			{contacts.map((contact, index) => (
				<div className="convo border-bottom p-2 d-flex flex-row">
					<div>
						<img className='convo-img rounded-circle' src={require('../../assets/people1.jpg')} /> 
					</div>
					<div className="w-100 d-flex flex-row justify-content-between">
					<div className="convo-details ms-3 fw-normal d-flex- flex-col">
						<p className='m-0 convo-heading'>
							Hostel Mates
						</p>
						<p className='m-0 fw-light'>
							this is a test message....
						</p>
					</div>
					<div className="convo-time">
						<p className="m-0">
							4:53 pm
						</p>
					</div>
					</div>
				</div>	
			))}
		</div>
	 );
}

export default ShowContacts;