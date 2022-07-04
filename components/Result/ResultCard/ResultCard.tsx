import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faFont } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import classes from './result-card.module.scss';

export interface ResultCardProps {
	data?: string;
}

export const ResultCard: React.VFC<ResultCardProps> = ({ data }) => {

	return (
		<div className={classes.container}>
			<header>
				<span>Text</span>
				<FontAwesomeIcon icon={faFont as IconProp} />
			</header>
			<main>
				{
					data
				}
			</main>
			<footer>
				<button>
					GO TO
				</button>
			</footer>
		</div>
	);
};
