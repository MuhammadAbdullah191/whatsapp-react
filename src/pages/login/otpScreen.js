import { useState } from "react";
import { UserApi } from "../../apis/user/user";
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import SvgIcon from "../../components/shared/svgIcon";


function OtpScreen() {
	const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const phone = queryParams.get('phone');
	const navigate = useNavigate();
	const [inputValue, setInputValue] = useState('');
	const [isValid, setIsValid] = useState(true);
	const [errMessage, setErrMessage] = useState(null);

	function handleChange(event) {
    const value = event.target.value;
    setInputValue(value);
  }

	const verifyOtp = () => {
		const regex = /^\d{6}$/;

    if (regex.test(inputValue)) {
      console.log('verifying otp')
			setIsValid(true);

			UserApi.verifyOtp(phone, inputValue)
				.then((res)=>{
					if(res.status == 200){
						localStorage.setItem('user', JSON.stringify(res.data.user));
						localStorage.setItem('token', res.data.token);
						navigate(`/`);
					}
				}).catch((err)=>{
					setErrMessage(true)
				})

    } else {
			setErrMessage(null)
      setIsValid(false);
    }
	}

	return ( 
		<div className="vh-100 vw-100">
			<div className="vw-100 green-bg"></div>
			<div className="grey-bg"></div>
			<div className="login-form d-flex justify-content-center align-items-start">
				<div className="login-card p-5 bg-white shadow">
					<div className="d-flex flex-row justify-content-center align-items-center">
						<i className="fa-brands fa-whatsapp fs-1"></i>
						<p className="p-0 m-0 ms-3 fs-5 fw-bold">GOAT Whatsapp</p>
					</div>
					<div className="p-2 text-muted d-flex flex-column justify-content-center align-items-center">
						<p className="m-0 p-1">Use Whatsapp on Your Computer</p>
						<p className="m-0 p-1">Enter your Otp to start using whatsapp</p>
						<SvgIcon/>

						<div class="mt-2 text-center">
							<input type="text" class="form-control bottom-border-input" id="exampleInput" placeholder="Enter OTP" value={inputValue}
							onChange={handleChange}/>
							{ !isValid && <div className="text-danger"> Please enter a valid OTP.</div> }
							{ errMessage && <div className="text-danger"> You have entred the wrong OTP, please try again</div> }
							<button type="button" class="btn btn-outline-success mt-2 px-5" onClick={verifyOtp}>Verify</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	 );
}

export default OtpScreen;