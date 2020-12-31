import {useContext} from 'react';

import {ExpenseTrackerContext} from './context/context'
import {incomeCategories,expenseCategories,resetCategories} from './constants/category'


const useTransaction = (title) => {
    resetCategories();
    const {transactions} = useContext(ExpenseTrackerContext)
    const transactionPerType = transactions.filter(_t => _t.type === title);
    const total = transactionPerType.reduce((acc,curVal) => acc+=curVal.amount,0);

    const categories = title === 'Income' ? incomeCategories : expenseCategories;

    transactionPerType.forEach((tran) => {
        const category = categories.find(_c => _c.type === tran.category)
        console.log({category});
        if(category) category.amount += tran.amount;
    })

    const filteredCatg = categories.filter(_t => _t.amount > 0)

    const chartData = {
        datasets : [{
            data : filteredCatg.map(_c => _c.amount),
            backgroundColor: filteredCatg.map(_c => _c.color)
        }],
        labels : filteredCatg.map(_c => _c.type)
    }

    return {filteredCatg,total,chartData}
}

export default useTransaction;
