import { LINE } from '@src/constants';

const getChapterNumber = () => {
	const url = window.location.pathname;
	const result = url.substr( url.length - 1 );
	return Number( result );
};


export const indicateCurrentPage = ()  => {
	const buttonWrapper = document.querySelector( '.tutorial__sideNav' );
	const buttons = buttonWrapper.querySelectorAll( 'button' );

	buttons.forEach( button => {
		button.removeAttribute( 'style' );
	} );

	const chapterNum = getChapterNumber();
	if ( buttons[ chapterNum ] ) {
		buttons[ chapterNum ].style.backgroundColor = `${LINE}`;
	}
};