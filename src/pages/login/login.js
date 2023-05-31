import { useState } from "react";
import { UserApi } from "../../apis/user/user";
import { useNavigate } from "react-router-dom";
import SvgIcon from "../../components/shared/svgIcon";

function Login() {
	const navigate = useNavigate();
	const [inputValue, setInputValue] = useState('');
	const [isValid, setIsValid] = useState(true);

	function handleChange(event) {
    const value = event.target.value;
    setInputValue(value);
  }

	const getOtp = () => {
		const phoneRegex = /^(\+92|0)?3[0-9]{9}$/;

    if (phoneRegex.test(inputValue)) {
      console.log('getting otp')
			setIsValid(true);
			UserApi.sendOtp(inputValue).then((res)=>{
				navigate(`/verifyOtp?phone=${inputValue}`);
			}).catch((err)=>{
				console.log(err)
			})

    } else {
      console.log('Invalid phone number:', inputValue);
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
						<p className="m-0 p-1">Enter your Phone Number to start using whatsapp web</p>
						<SvgIcon/>
						<div class="mt-2 text-center">
							<input type="text" class="form-control bottom-border-input" id="exampleInput" placeholder="Enter your Number" value={inputValue}
							onChange={handleChange}/>
							{ !isValid && <div className="text-danger"> Please enter a valid phone number.</div> }
							<button type="button" class="btn btn-outline-success mt-2 px-5" onClick={getOtp}>Next</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	 );
}

export default Login;