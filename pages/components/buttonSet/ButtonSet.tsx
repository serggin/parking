import styles from './ButtonSet.module.scss';

export interface ButtonOfSet<Type> {
    type: Type;
    title: string;
}

interface IButtonSet<Type> {
    buttons: ButtonOfSet<Type>[];
    nameOfSet: string;
    onClick: (type: Type) => void;
    activeButton: Type;
}

interface IParkingButton {
    title: string;
    isActive: boolean;
    onClick: () => void;
    value?: string;
}

function ParkingButton({ title, isActive, onClick }: IParkingButton) {
    const className = `${styles.parkingButton} ${isActive ? styles.active : ''}`;
    return (
        <span className={className} onClick={onClick}>
            {title}
        </span>
    );
}

const ButtonSet = <Type,>({ buttons, nameOfSet, onClick, activeButton }: IButtonSet<Type>) => {
    if (buttons.length === 0) return null;

    return (
        <div className={styles.buttonSet}>
            <div className={styles.name}>{nameOfSet}</div>
            <div className={styles.buttons}>
                {buttons.map((button) => (
                    <ParkingButton
                        key={button.type as string}
                        title={button.title}
                        isActive={activeButton === button.type}
                        onClick={() => onClick(button.type)}
                    />
                ))}
            </div>
        </div>
    );
};

export default ButtonSet;
