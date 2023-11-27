import React, { FC, useState } from "react";
import styles from "./Management.module.scss";
import cn from "classnames";
import HierarchyComponent from "@/components/common/HierarchyComponent/HierarchyComponent";
import PositionsComponent from "@/components/common/PositionsComponent/PositionsComponent";
import EquipmentSetsComponent from "@/components/common/EquipmentSetsComponent/EquipmentSetsComponent";
import StaffListComponent from "@/components/common/StaffListComponent/StaffListComponent";


const Management: FC = ({ }) => {

    const [activeTab, setActiveTab] = useState('positions');

    const renderComponent = () => {
        switch (activeTab) {
            case 'hierarchy':
                return <HierarchyComponent />;
            case 'positions':
                return <PositionsComponent />;
            case 'staffList':
                return <StaffListComponent />;
            case 'equipmentSets':
                return <EquipmentSetsComponent />;
            default:
                return null;
        }
    };

    return (
        <div className={styles.management}>
            <div className={styles.management__inner}>
                <div className={`${styles.management__tabs} ${styles.tabs}`}>
                    <button
                        className={cn(styles.tabs__btn, {
                            [styles.active]: activeTab === 'hierarchy'
                        })}
                        onClick={() => setActiveTab('hierarchy')}
                    >
                        Иерархия
                    </button>
                    <button
                        className={cn(styles.tabs__btn, {
                            [styles.active]: activeTab === 'positions'
                        })}
                        onClick={() => setActiveTab('positions')}
                    >
                        Должности
                    </button>
                    <button
                       className={cn(styles.tabs__btn, {
                        [styles.active]: activeTab === 'staffList'
                    })}
                        onClick={() => setActiveTab('staffList')}
                    >
                        Список персонала
                    </button>
                    <button
                        className={cn(styles.tabs__btn, {
                            [styles.active]: activeTab === 'equipmentSets'
                        })}
                        onClick={() => setActiveTab('equipmentSets')}
                    >
                        Наборы экипировки
                    </button>
                </div>
                <div className={styles.management__content}>
                    {renderComponent()}
                </div>
            </div>
        </div>
    )
}

export default Management;