

const ButtonRipple = ( button ) => {
	button.addEventListener( 'click', ( e ) => {
		let x = e.clientX - e.target.offsetLeft;
		let y = e.clientY - e.target.offsetTop;

		let ripples = document.createElement( 'span' );
		ripples.style.left = x + 'px';
		ripples.style.right = y + 'px';
		this.appendChild( ripples );

		setTimeout( ()=> {
			ripples.remove();
		}, 1000 );
	} );
};


export default ButtonRipple;
