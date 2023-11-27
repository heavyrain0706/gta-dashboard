import { FC, useEffect, useState } from 'react';
import styles from "./PositionsComponent.module.scss";
import cn from "classnames";
import PositionCard from '@/components/ui/positionCard/PositionCard';
import { useSelector, useDispatch } from 'react-redux';
import {
    setTrade,
    setSkirmish,
    setManufacturing,
    setManagement,
    ManagementState,
    TradeOptions,
    SkirmishOptions,
    ManufacturingOptions,
    ManagementOptions,
    setPosition,
} from '@/store/management/managementSlice';
import { RootState } from '@/store/store';
import Loader from '@/components/ui/loader/Loader';

interface CardData {
    title: string;
    description: string;
    price: string;
}

const PositionsComponent: FC = ({ }) => {

    const cardsData: CardData[] = [
        {
            title: 'Новобранец',
            description: 'от 10 lvl',
            price: '50'
        },
        {
            title: 'Рядовой',
            description: '5 заданий',
            price: '80'
        },
        {
            title: 'Сержант',
            description: '10 заданий',
            price: '100'
        },
        {
            title: 'Новобранец',
            description: '10 заданий',
            price: '50'
        },
        {
            title: 'Рядовой',
            description: '15 заданий',
            price: '80'
        },
        {
            title: 'Сержант',
            description: '20 заданий',
            price: '100'
        },
        {
            title: 'Новобранец',
            description: '25 заданий',
            price: '50'
        },
    ]
    const [selectedCardId, setSelectedCardId] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const managementState = useSelector((state: RootState) => state.management);

    const dispatch = useDispatch();

    const [isEmptyPosition, setIsEmptyPosition] = useState<any>(null);
    const [nameInputValue, setNameInputValue] = useState<string>("");
    const [localTrade, setLocalTrade] = useState<TradeOptions>({
        sellProduct: false,
        setPrices: false,
        viewAnalytics: false
    });
    const [localSkirmish, setLocalSkirmish] = useState<SkirmishOptions>({
        duel: false,
        makeClaims: false
    });
    const [localManufacturing, setLocalManufacturing] = useState<ManufacturingOptions>({
        purchaseMaterials: false,
        assignWorkers: false
    });
    const [localManagement, setLocalManagement] = useState<ManagementOptions>({
        assignPositions: false,
        expelFromGang: false,
    });

    const checkboxLabels: { [key: string]: string } = {
        sellProduct: 'Продавать продукт',
        setPrices: 'Выставлять цены',
        viewAnalytics: 'Смотреть аналитику',
        duel: 'Дуель',
        makeClaims: 'Выставлять претензии',
        purchaseMaterials: 'Закупать сырье',
        assignWorkers: 'Назначать рабочих',
        assignPositions: 'Назначать должности',
        expelFromGang: 'Выгонять из банды',
    };

    const handleDragStart = (e: React.DragEvent<HTMLDivElement>, title: string, id: number) => {
        const dataToSet = JSON.stringify({ title: title, id: id.toString() });
        e.dataTransfer.setData("text/plain", dataToSet);
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const data = e.dataTransfer.getData("text/plain");
        const { title, id } = JSON.parse(data);
        setNameInputValue(title);
        setSelectedCardId(+id)
    };

    const handleCardSelect = (cardId: number) => {
        setSelectedCardId(cardId);
    };

    const handleCheckboxChange = (
        optionType: 'trade' | 'skirmish' | 'manufacturing' | 'management',
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { name, checked } = event.target;
        switch (optionType) {
            case 'trade':
                setLocalTrade((prev) => ({ ...prev, [name]: checked }));
                break;
            case 'skirmish':
                setLocalSkirmish((prev) => ({ ...prev, [name]: checked }));
                break;
            case 'manufacturing':
                setLocalManufacturing((prev) => ({ ...prev, [name]: checked }));
                break;
            case 'management':
                setLocalManagement((prev) => ({ ...prev, [name]: checked }));
                break;
        }
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (nameInputValue.length === 0) {
            setIsEmptyPosition(true);
        } else {
            setIsLoading(true);
            setIsEmptyPosition(false);
            dispatch(setPosition(nameInputValue));
            dispatch(setTrade(localTrade));
            dispatch(setSkirmish(localSkirmish));
            dispatch(setManufacturing(localManufacturing));
            dispatch(setManagement(localManagement));
            localStorage.setItem('position', JSON.stringify(nameInputValue));
            if (selectedCardId !== null) {
                localStorage.setItem('selectedCardId', selectedCardId.toString());
            }
            localStorage.setItem('tradeObject', JSON.stringify(localTrade));
            localStorage.setItem('skirmishObject', JSON.stringify(localSkirmish));
            localStorage.setItem('manufacturingObject', JSON.stringify(localManufacturing));
            localStorage.setItem('managementObject', JSON.stringify(localManagement));
            setTimeout(() => {
                setIsLoading(false);
            }, 400);
        }
    };

    const renderCheckbox = (
        optionType: 'trade' | 'skirmish' | 'manufacturing' | 'management',
        key: string,
    ) => {
        let isChecked;
        switch (optionType) {
            case 'trade':
                isChecked = localTrade[key as keyof TradeOptions];
                break;
            case 'skirmish':
                isChecked = localSkirmish[key as keyof SkirmishOptions];
                break;
            case 'manufacturing':
                isChecked = localManufacturing[key as keyof ManufacturingOptions];
                break;
            case 'management':
                isChecked = localManagement[key as keyof ManagementOptions];
                break;
        }

        const label = checkboxLabels[key];

        return (
            <label key={key} className={styles.form__label}>
                <input
                    type="checkbox"
                    name={key}
                    checked={isChecked}
                    onChange={(e) => handleCheckboxChange(optionType, e)}
                    className={styles.checkbox}
                />
                <span className={styles.checkstyle}></span>
                {label}
            </label>
        );
    };

    const renderCheckboxes = (optionType: 'trade' | 'skirmish' | 'manufacturing' | 'management') => {
        const options = managementState[optionType];
        return Object.keys(options).map(key =>
            renderCheckbox(optionType, key)
        );
    };

    useEffect(() => {
        let storedPositionJSON = localStorage.getItem('position');
        if (storedPositionJSON) {
            const storedPosition = JSON.parse(storedPositionJSON);
            dispatch(setPosition(storedPosition));
        };
        let storedTradeObjectJSON = localStorage.getItem('tradeObject');
        if(storedTradeObjectJSON) {
            const storedTradeObject = JSON.parse(storedTradeObjectJSON);
            dispatch(setTrade(storedTradeObject));
        };
        let storedManufacturingObjectJSON = localStorage.getItem('manufacturingObject');
        if(storedManufacturingObjectJSON) {
            const storedManufacturingObject = JSON.parse(storedManufacturingObjectJSON);
            dispatch(setManufacturing(storedManufacturingObject));
        };
        let storedSkirmishObjectJSON = localStorage.getItem('skirmishObject');
        if(storedSkirmishObjectJSON) {
            const storedSkirmishObject = JSON.parse(storedSkirmishObjectJSON);
            dispatch(setSkirmish(storedSkirmishObject));
        };
        let storedManagementObjectJSON = localStorage.getItem('managementObject');
        if(storedManagementObjectJSON) {
            const storedManagementObject = JSON.parse(storedManagementObjectJSON);
            dispatch(setManagement(storedManagementObject));
        };
    }, [dispatch]);

    useEffect(() => {
        setIsLoading(true)
        if (managementState.position !== '') {
            setNameInputValue(managementState.position)
        }
        setLocalTrade(managementState.trade);
        setLocalManufacturing(managementState.manufacturing);
        setLocalSkirmish(managementState.skirmish);
        setLocalManagement(managementState.management);
        setTimeout(() => {
            setIsLoading(false);
        }, 200);
    }, [dispatch, managementState]);


    useEffect(() => {
        let savedCardId = localStorage.getItem('selectedCardId');
        if (savedCardId !== null) {
            let initialCardId = Number(savedCardId);
            setSelectedCardId(initialCardId);
        }
    }, []);

    useEffect(() => {
        if(nameInputValue.length > 0) {
            setIsEmptyPosition(false);
        }
    }, [nameInputValue])

    return (
        <div className={styles.positions}>
            {isLoading && <Loader />}
            <div className={styles.positions__inner}>
                <div className={styles.positions__cards}>
                    {cardsData.map((card, index) => (
                        <PositionCard
                            key={index}
                            id={index}
                            title={card.title}
                            description={card.description}
                            price={card.price}
                            isSelected={selectedCardId === index}
                            handleCardSelect={handleCardSelect}
                            onDragStart={(e) => handleDragStart(e, card.title, index)}
                        />
                    ))}
                    <button
                        className={styles.positions__create}
                        onClick={() => {
                            if (selectedCardId !== null) {
                                const selectedCard = cardsData[selectedCardId];
                                if (selectedCard) {
                                    setNameInputValue(selectedCard.title);
                                }
                            }
                        }}
                        disabled={selectedCardId === null}
                    >
                        Создать новую должность
                    </button>
                </div>
                <div className={styles.positions__content} onDragOver={handleDragOver} onDrop={handleDrop}>
                    <form onSubmit={handleSubmit} className={`${styles.positions__form} ${styles.form}`}>
                        <div className={styles.form__name}>
                            <span className={styles.form__title}>Название</span>
                            <input 
                                className={cn(styles.form__input, {
                                    [styles.empty]: isEmptyPosition === true
                                })}
                                type="text"
                                value={nameInputValue} 
                                readOnly 
                            />
                            <span className={cn(styles.form__error, {
                                    [styles.visible]: isEmptyPosition === true
                                })}>
                                Выберите карточку
                            </span>
                        </div>
                        <div className={`${styles.form__responsibilities} ${styles.responsibilities}`}>
                            <div className={styles.responsibilities__top}>
                                Обязаности
                            </div>
                            <div className={styles.responsibilities__content}>
                                <div className={styles.responsibilities__checkboxes}>
                                    <span className={styles.form__title}>Торговля</span>
                                    {renderCheckboxes('trade')}
                                </div>
                                <div className={styles.responsibilities__checkboxes}>
                                    <span className={styles.form__title}>Производство</span>
                                    {renderCheckboxes('manufacturing')}
                                </div>
                                <div className={styles.responsibilities__checkboxes}>
                                    <span className={styles.form__title}>Разборки</span>
                                    {renderCheckboxes('skirmish')}
                                </div>
                                <div className={styles.responsibilities__checkboxes}>
                                    <span className={styles.form__title}>Управление</span>
                                    {renderCheckboxes('management')}
                                </div>
                            </div>
                        </div>
                        <button className={styles.form__save}>
                            Сохранить
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default PositionsComponent;