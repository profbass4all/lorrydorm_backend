import messages from '../messages/index.mjs'
import { validateTransaction } from '../validations/index.mjs'
import { sequelize } from '../config/index.mjs'


export async function createTransaction(req, res){
    try {
        const {amount, date, lorry_id} = req.body

        const user = req.user

        const {error} = validateTransaction(req.body)

        if(error) throw new Error(error.details[0].message)

        const transaction = await user.createTransaction(req.body)

        res.status(200).json({
            message: messages.TRANSACTION_CREATED,
            status: true,
            data: transaction
        })

        

    } catch (error) {
        
        res.status(500).json({
            message: error.message,
            status: false,
            data: null
        })
    }
}


export async function getTransactions(req, res){
    try {
        const user = req.user

        if(!user) throw new Error(messages.LOGIN_REQUIRED)

        const transactions = await user.getTransactions()

        if(transactions.length < 1) throw new Error(messages.NO_TRANSACTIONS_FOUND)

        const transact = await sequelize.query(
            `SELECT MONTH(date) AS Month, 
            SUM(amount) AS Amount 
            FROM transactions
            WHERE user_id = :userId
            GROUP BY
            MONTH(date)
            ORDER BY
            MONTH(date)`,
            { 
                type: sequelize.QueryTypes.SELECT, 
                replacements: { userId: user.sn  }}
        )

        res.status(200).json({
            message: messages.ALL_TRANSACTIONS_FOUND,
            status: true,
            data: {
                transactions: transactions,
                monthly_summary: transact,
            },

        })
    } catch (error) {
        res.status(500).json({
            message: error.message,
            status: false,
            data: null,
        });
    }
}