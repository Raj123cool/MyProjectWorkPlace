import React, {useState,useEffect,useContext} from 'react';
import {TextField,Typography,MenuItem,Grid,Select,InputLabel,FormControl,Button} from '@material-ui/core'
import {v4 as uuidV4} from 'uuid'
import {useSpeechContext} from '@speechly/react-client'
import {incomeCategories,expenseCategories} from '../../../constants/category'
import {ExpenseTrackerContext} from '../../../context/context'

import formatDate from '../../../utils/formatDate'
import useStyle from './style'
import CustomizedSnackbar from '../../Snackbar/Snackbar';

const initialState = {
    amount:"",
    category:'',
    type:'Income',
    date:formatDate(new Date())
}

const Form = () => {
    const classes = useStyle()
    const {addTransaction} = useContext(ExpenseTrackerContext)
    const [formData, setFormData] = useState(initialState)
    const [open, setOpen] = useState(false)
    const {segment} = useSpeechContext()

    const createTransaction = () => {
        if(isNaN(Number(formData.amount)) || !formData.date.includes('-')) {
            return;
        }
        const transaction = {...formData, amount:+formData.amount , id : uuidV4()}
        setOpen(true)
        addTransaction(transaction)
        setFormData(initialState)
    }

    useEffect(()=>{
        if(segment){
            // console.log(segment.intent.intent)
            if(segment.intent.intent === 'add_expense'){
                setFormData({...formData,type:"Expense"});
            }else if(segment.intent.intent === 'add_income'){
                setFormData({...formData,type:"Income"});
            }else if(segment.isFinal && segment.intent.intent === 'create_transaction'){
                return createTransaction();
            }else if(segment.isFinal && segment.intent.intent === 'cancel_transaction'){
                return setFormData(initialState)
            }

            segment.entities.forEach(_e => {
                const category = `${_e.value.charAt(0)}${_e.value.slice(1).toLowerCase()}`
                switch (_e.type) {
                    case 'amount':
                        setFormData({...formData,amount:_e.value})
                        break;
                    case 'category':
                        if(incomeCategories.map(_c => _c.type).includes(category)){
                            setFormData({...formData, type:'Income', category})
                        }else if(expenseCategories.map(_c => _c.type).includes(category)){
                            setFormData({...formData, type:'Expense', category})
                        }
                        break;
                    case 'date':
                        setFormData({...formData,date:_e.value})
                        break;
                    default:
                        break;
                }
            })

            if(segment.isFinal && formData.amount && formData.category && formData.date && formData.type){
                createTransaction();
            }

        }
    },[segment])

    const selectedCatg = formData.type === 'Income' ? incomeCategories : expenseCategories

    return (
        <Grid container spacing={2}>
            <CustomizedSnackbar open={open} setOpen={setOpen} />
            <Grid item xs={12}>
                <Typography variant="subtitle2" align="center" gutterBottom >
                    {
                    segment && 
                        <>
                            {
                                segment.words.map((w)=>w.value).join(" ")   
                            }
                        </>
                    }
                </Typography>
            </Grid>
            <Grid item xs={6}>
                <FormControl fullWidth>
                    <InputLabel>Type</InputLabel>
                    <Select value={formData.type} onChange={(e)=>setFormData({...formData,type:e.target.value})} >
                        <MenuItem value="Income" >Income</MenuItem>
                        <MenuItem value="Expense" >Expense</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={6}>
                <FormControl fullWidth>
                    <InputLabel>Category</InputLabel>
                    <Select value={formData.category} onChange={(e)=>setFormData({...formData,category:e.target.value})}>
                        {
                            selectedCatg.map((_cat,i)=>(
                                <MenuItem key={i} value={_cat.type} >{_cat.type}</MenuItem>
                            ))
                        }
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={6}>
                <TextField type="number" fullWidth label="Amount" value={formData.amount} onChange={(e)=>setFormData({...formData,amount:e.target.value})} />
            </Grid>
            <Grid item xs={6}>
                <TextField type="date" fullWidth label="Date" value={formData.date} onChange={(e)=>setFormData({...formData,date:formatDate(e.target.value)})} />
            </Grid>
            <Button fullWidth className={classes.button} color="primary" variant="outlined" onClick={createTransaction} >Create</Button>
        </Grid>
    )
}

export default Form;
