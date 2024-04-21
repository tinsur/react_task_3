import styles from './App.module.css'
import {useState} from "react";


function App() {
    let NUMS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
    let manager = ['+', '-', 'C', '='];

    let [operand1, setOperand1] = useState('');
    let [operand2, setOperand2] = useState('');
    let [operator, setOperator] = useState('');
    let [screen, setScreen] = useState('')
    let [activeBtn, setActiveBtn] = useState('')

    const clickBtnDigit = (event) => {
        let idDigit = event.target.dataset.id;
        if (!operator) {
            if (operand1.length === 0 && idDigit === String(0)) return;
            setOperand1(operand1 + idDigit)
        } else {
            if (operand2.length === 0 && idDigit === String(0)) return;
            setOperand2(operand2 + idDigit)
        }
        setScreen(screen + idDigit)
        setActiveBtn(idDigit)
    }
    const clickBtnOperator = (event) => {
        let idOperator = event.target.dataset.id;

        switch (idOperator) {
            case '=':
                let x = Number(operand1);
                let y = Number(operand2)
                let result = operator === '+' ? x + y : x - y;
                setOperand1(String(result));
                setScreen(result);
                setOperator('');
                setOperand2('');
                setActiveBtn('')
                break;
            case 'C':
                setOperand1('');
                setOperand2("");
                setOperator('')
                setScreen('');
                setActiveBtn('')

                break;
            default:
                if (!operator&&operand1) {
                    setScreen(screen + idOperator)
                    setOperator(idOperator);

                }
                break;
        }
    }


    return (
        <div className="App">
            <div className={styles.wrap}>
                <div className={styles.resultFild}>{screen ? screen : 0}</div>
                <ul className={styles['nums-btn']}>

                    {NUMS.map((item) =>
                        <li className={activeBtn === String(item) ? `${styles.btn} ${styles.activ}` : styles.btn}
                            key={item}
                            data-id={item}
                            onClick={clickBtnDigit}>
                            {item}</li>)
                    }
                </ul>
                <ul className={styles['manager-btn']}>
                    {manager.map((item) =>
                        <li className={`${styles.btn} ${styles.btnM}`}
                            key={item}
                            data-id={item}
                            onClick={clickBtnOperator}>
                            {item}</li>)
                    }

                </ul>
            </div>
        </div>
    );
}

export default App;
