import messages from '../messages/index.mjs'
import { validateTransaction } from '../validations/index.mjs'
import { sequelize } from '../config/index.mjs'


export async function createTransaction(req, res){
    try {

        const user = req.user

        const {error} = validateTransaction(req.body)

        if(error !== undefined){
            return res.status(400).json({
                message: error.details[0].message,
                status: false,
                data: null,
            })
        }

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

        if(!user){
            return res.status(401).json({
                message: messages.LOGIN_REQUIRED,
                status: false,
                data: null,
            })
        }

        const transactions = await user.getTransactions()

        if(transactions.length < 1){
            return res.status(404).json({
                message: messages.NO_TRANSACTIONS_FOUND,
                status: false,
                data: null,
            })
        }

        const transact = await sequelize.query(
            `SELECT MONTH(date) AS Month, 
            SUM(amount) AS Amount 
            FROM Transactions
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