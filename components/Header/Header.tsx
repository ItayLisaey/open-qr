import React from 'react';
import classes from './header.module.scss';

export interface HeaderProps { }

export const Header: React.FC<HeaderProps> = () => {

	return (
		<header className={classes.container}>
			{/* <a href="https://github.com/ItayLisaey/barcode-cam" target="_blank" rel="noopener noreferrer"  >
				<FontAwesomeIcon icon={faBarcode as IconProp} />
			</a>
			<a href="/">
				<FontAwesomeIcon icon={faGithub as IconProp} />
			</a> */}
		</header>
	);
};
