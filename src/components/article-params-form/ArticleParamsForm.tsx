import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { Text } from '../text';

import styles from './ArticleParamsForm.module.scss';
import { SyntheticEvent, useRef, useState } from 'react';
import clsx from 'clsx';
import { RadioGroup } from '../radio-group';
import {
	ArticleStateType,
	OptionType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
import { useOutsideClickClose } from '../select/hooks/useOutsideClickClose';
import { Separator } from '../separator';
import { Select } from '../select';

type ArticleParamsFormProps = {
	setState: React.Dispatch<React.SetStateAction<ArticleStateType>>;
};

export const ArticleParamsForm = ({ setState }: ArticleParamsFormProps) => {
	const [isSidebarOpen, setSidebarOpen] = useState<boolean>(false);

	const [formState, setFormState] =
		useState<ArticleStateType>(defaultArticleState);

	const sidebarRef = useRef<HTMLDivElement | null>(null);

	useOutsideClickClose({
		isOpen: isSidebarOpen,
		rootRef: sidebarRef,
		onChange: setSidebarOpen,
	});

	const toggle = () => {
		setSidebarOpen((isSidebarOpen) => !isSidebarOpen);
	};

	const onValueChange = (value: OptionType, field: keyof ArticleStateType) => {
		setFormState({ ...formState, [field]: value });
	};

	const formSubmit = (e: SyntheticEvent) => {
		e.preventDefault();
		setState(formState);
	};

	const formReset = (e: SyntheticEvent) => {
		e.preventDefault();
		setFormState(defaultArticleState);
		setState(defaultArticleState);
	};

	return (
		<div ref={sidebarRef}>
			<ArrowButton onClick={toggle} isOpen={isSidebarOpen} />
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isSidebarOpen,
				})}>
				<form className={styles.form} onSubmit={formSubmit} onReset={formReset}>
					<Text as={'h2'} weight={800} size={31} uppercase={true}>
						задайте параметры
					</Text>
					<Select
						options={fontFamilyOptions}
						selected={formState.fontFamilyOption}
						onChange={(value) => onValueChange(value, 'fontFamilyOption')}
						title={'шрифт'}
					/>
					<RadioGroup
						name={'fontSize'}
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
						onChange={(value) => onValueChange(value, 'fontSizeOption')}
						title={'размер шрифта'}
					/>
					<Select
						options={fontColors}
						selected={formState.fontColor}
						onChange={(value) => onValueChange(value, 'fontColor')}
						title={'цвет шрифта'}
					/>
					<Separator />
					<Select
						options={backgroundColors}
						selected={formState.backgroundColor}
						onChange={(value) => onValueChange(value, 'backgroundColor')}
						title={'цвет фона'}
					/>
					<Select
						options={contentWidthArr}
						selected={formState.contentWidth}
						onChange={(value) => onValueChange(value, 'contentWidth')}
						title={'ширина контента'}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</div>
	);
};
