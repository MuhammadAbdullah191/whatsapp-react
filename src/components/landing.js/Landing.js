import SvgIcon from "../shared/svgIcon";

function Landing() {
	return(
		<div className="vh-100 chat-width d-flex flex-column justify-content-center align-items-center">
			<SvgIcon/>

			<h2 className="text-secondary p-3">Whatsapp Web</h2>
			<p className="text-secondary p-0 m-0">Send and receive messages without keeping your phone online.</p>
			<p className="text-secondary p-0 m-0">Use WhatsApp on up to 4 linked devices and 1 phone at the same time.</p>
		</div>
	)
}

export default Landing;