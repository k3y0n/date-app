import express from 'express'
import chalk from "chalk"
import config from 'config'

const app = express()
const PORT = config.get('PORT') ?? 808;

app.listen(PORT,()=>{
    console.log(chalk.green(`Server started on  port:${PORT}`))
})