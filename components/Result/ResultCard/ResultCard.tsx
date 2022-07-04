import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import classes from './result-card.module.scss';
import { getResultObject } from './results.parse';

export interface ResultCardProps {
	data?: string;
}

export const ResultCard: React.FC<ResultCardProps> = ({ data }) => {
	const result = getResultObject(data);
	return (
		<div className={classes.container}>
			<header>
				<span>{result?.display.title}</span>
				<FontAwesomeIcon icon={result?.display.icon as IconProp} />
			</header>
			<main>
				{
					result?.display.element(result.value)
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
