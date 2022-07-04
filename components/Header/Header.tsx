import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faBarcode } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import React from 'react';
import classes from './header.module.scss';

export interface HeaderProps { }

export const Header: React.FC<HeaderProps> = () => {

	return (
		<header className={classes.container}>
			<a href="https://github.com/ItayLisaey/barcode-cam" target="_blank" rel="noopener noreferrer"  >
				<FontAwesomeIcon icon={faBarcode as IconProp} />
			</a>
			<Link href="/">
				<FontAwesomeIcon icon={faGithub as IconProp} />
			</Link>
		</header>
	);
};
