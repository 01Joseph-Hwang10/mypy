import { SCREEN_LARGE, SCREEN_MEDIUM, SCREEN_SMALL, SCREEN_XLARGE, SCREEN_XXLARGE } from "@src/constants";

export let translateDistance = 20 * 2;

if ( typeof window === 'object' ) {
	if ( window.matchMedia( `(min-width: ${SCREEN_SMALL}px)` ).matches ) {
		translateDistance = 20 * 1;
	}
	if ( window.matchMedia( `(min-width: ${SCREEN_MEDIUM}px)` ).matches ) {
		translateDistance = 20 * 2;
	}
	if ( window.matchMedia( `(min-width: ${SCREEN_LARGE}px)` ).matches ) {
		translateDistance = 20 * 3;
	}
	if ( window.matchMedia( `(min-width: ${SCREEN_XLARGE}px)` ).matches ) {
		translateDistance = 20 * 4;
	}
	if ( window.matchMedia( `(min-width: ${SCREEN_XXLARGE}px)` ).matches ) {
		translateDistance = 20 * 5;
	}
}

export const returnLoginElements = () => {
	if ( typeof document === 'object' ) {
		const nav = document.querySelector( '#navigation' );
		const signInButton = nav.querySelector( '.signInButton' );
		const loginFormWrapper = document.querySelector( '#loginFormWrapper' );
	
		return {
			nav,
			signInButton,
			loginFormWrapper,
		};
	}
};

export const maintainWhenFocusWithin = ( e ) => {

	const {
		signInButton,
		loginFormWrapper,
	} = returnLoginElements();

	if ( !loginFormWrapper.contains( e.target ) && !signInButton.contains( e.target ) ) {
		signInButton.removeAttribute( 'style' );
		loginFormWrapper.style.transform = `translateX(${translateDistance}rem)`;
		document.removeEventListener( 'click', maintainWhenFocusWithin );
	}
};

export const signInToggle = () => {

	const {
		signInButton,
		loginFormWrapper,
	} = returnLoginElements();

	if ( signInButton.style.backgroundColor ) {
		signInButton.removeAttribute( 'style' );
		loginFormWrapper.style.transform = `translateX(${translateDistance}rem)`;
		document.removeEventListener( 'click', maintainWhenFocusWithin );
	} else {
		signInButton.style.backgroundColor = '#d6e0f0';
		loginFormWrapper.style.transform = 'translateX(0)';
		document.addEventListener( 'click', maintainWhenFocusWithin );
	}
};

export const cleanUp = () => {

	const {
		loginFormWrapper,
	} = returnLoginElements();

	loginFormWrapper.style.transform = `translateX(${translateDistance}rem)`;
	document.removeEventListener( 'click', maintainWhenFocusWithin );
};
