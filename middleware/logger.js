import chalk from 'chalk';

const logger =  (req,res, next) => {
  console.log(chalk.yellow(`${req.method} request to ${req.baseUrl}. Time: [${new Date().toString()}]`));
  next()
}

export default  logger