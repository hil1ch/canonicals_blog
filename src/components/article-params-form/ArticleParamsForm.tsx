import { useState, useEffect, useRef, FormEvent } from 'react';
import { ArrowButton } from '../arrow-button';
import { Button } from '../button';
import { Text } from '../text';
import { Select } from '../select';
import { Spacing } from '../spacing';
import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';

import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';

import {
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	defaultArticleState,
	ArticleStateType,
	OptionType,
} from 'src/constants/articleProps';

type StyleNames = {
	fontFamilyOption: OptionType;
	fontColor: OptionType;
	backgroundColor: OptionType;
	contentWidth: OptionType;
	fontSizeOption: OptionType;
};

interface IArticleParamsForm {
	setArticleState: (articleState: ArticleStateType) => void;
}

export const ArticleParamsForm = ({ setArticleState }: IArticleParamsForm) => {
	const [isOpen, setIsOpen] = useState(false);
	const [formState, setFormState] = useState(defaultArticleState);
	const asideRef = useRef<HTMLFormElement | null>(null);

	// Открытие\закрытие формы
	const handleClick = () => {
		setIsOpen((isOpen) => !isOpen);
	};

	// Закрытие формы при клике вне
	const handleOutiseClick = (e: MouseEvent) => {
		if (asideRef.current && !asideRef.current.contains(e.target as Node)) {
			setIsOpen(false);
		}
	};

	useEffect(() => {
		if (isOpen) {
			document.addEventListener('mousedown', handleOutiseClick);
		} else {
			document.removeEventListener('mousedown', handleOutiseClick);
		}

		return () => {
			document.removeEventListener('mousedown', handleOutiseClick);
		};
	}, [isOpen]);

	// Изменение полей формы
	const handleChange =
		(styleName: keyof StyleNames) => (option: OptionType) => {
			setFormState((prev) => ({
				...prev,
				[styleName]: option,
			}));
		};

	// Сохранение изменений
	const handleApplyForm = (e: FormEvent) => {
		e.preventDefault();
		setArticleState(formState);
	};

	// Сброс изменений
	const handleResetForm = (e: FormEvent) => {
		e.preventDefault();
		setFormState(defaultArticleState);
		setArticleState(defaultArticleState);
	};

	return (
		<>
			<ArrowButton onClick={handleClick} isOpen={isOpen} />
			<aside
				ref={asideRef}
				className={clsx(styles.container, {
					[styles['container_open']]: isOpen,
				})}>
				<form
					className={styles.form}
					onReset={handleResetForm}
					onSubmit={handleApplyForm}>
					<Text as='h1' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Spacing size={50} />
					<Select
						title='Шрифт'
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={handleChange('fontFamilyOption')}
					/>
					<Spacing size={50} />
					<RadioGroup
						name='Шрифт'
						title='Размер шрифта'
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
						onChange={handleChange('fontSizeOption')}
					/>
					<Spacing size={50} />
					<Select
						title='Цвет шрифта'
						selected={formState.fontColor}
						options={fontColors}
						onChange={handleChange('fontColor')}
					/>
					<Spacing size={50} />
					<Separator />
					<Spacing size={50} />
					<Select
						title='Цвет фона'
						selected={formState.backgroundColor}
						options={backgroundColors}
						onChange={handleChange('backgroundColor')}
					/>
					<Spacing size={50} />
					<Select
						title='Ширина контента'
						selected={formState.contentWidth}
						options={contentWidthArr}
						onChange={handleChange('contentWidth')}
					/>
					<Spacing size={50} />
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
