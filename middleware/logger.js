import chalk from 'chalk';

const logger = (req,res,next) => {

  res.on('finish', () => {
    //get status
    const status = res.statusCode
    
    //get chalk color based on status
    let color;
    if(status < 300) color = chalk.green                            //✅ Success
    else if (status >= 300 && status <400) color = chalk.cyan;      //🔁 Redirect
    else if (status>=400 && status<500) color = chalk.yellowBright  //🟥 Bad Request
    else if (status >= 500) color = chalk.redBright                 //💀 Server Error
    else color = chalk.white

    //divide log for more comprehensible log
    const time = `Time: [${chalk.yellow(new Date().toString())}]`
    const reqMethod = `Request to ${chalk.blueBright.underline(req.baseUrl)} | Method: ${chalk.blueBright(req.method)}`
    const statusStr = `${color(`Status: ${status}`)}`

    //log 
    console.log(`👉 ${reqMethod} | ${time} | ${statusStr} `);
    
    // console.log(`👉 ${chalk.blueBright( `${req.method}` )} request to ${chalk.blueBright.underline(req.baseUrl)} | Time: [${new Date().toString()}] | ${color(`Status: ${status}`)}\n` )
  })
  next()
}

export default logger