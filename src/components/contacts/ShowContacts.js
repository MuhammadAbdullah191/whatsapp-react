import { useState, useEffect } from 'react';
import { CrudApi } from '../../apis/shared/crudApi';
import Loader from '../shared/Loader';

function ShowContacts() {
	const [data, setData] = useState(null);

	useEffect(() => {
    CrudApi.getAll('users')
      .then((res) => {
        console.log('data found...')
				setData(res.data.users);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

	const setConvo = (e) => {
		console.log(e)
	}

	if(data){
		return ( 
			<div className="contacts pe-2 h-100 overflow-scroll">
				{data.map((contact, index) => (
					<div className="convo border-bottom p-2 d-flex flex-row" onClick={()=>{setConvo(contact.id)}}>
						<div>
							<img className='convo-img rounded-circle' src={require('../../assets/people1.jpg')} /> 
						</div>
						<div className="w-100 d-flex flex-row justify-content-between">
						<div className="convo-details ms-3 fw-normal d-flex- flex-col">
							<p className='m-0 convo-heading'>
								{contact.phone}
							</p>
							<p className='m-0 fw-light'>
								this is a test message...
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
	else{
		return(
			<Loader/>
		)
	}
}

export default ShowContacts;