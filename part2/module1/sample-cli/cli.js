#!/usr/bin/env node

//读取用户输入，嵌入模板，写入目录
const inquirer = require('inquirer')
const path = require('path')
const fs = require('fs')
const ejs = require('ejs')

inquirer.prompt([{
    type:'input',
    name:'name',
    message:'Project name?'
}]).then(answers=>{
    const temDir = path.join(__dirname,'templates')
    const destDir = process.cwd()
    fs.readdir(temDir,(err,files)=>{
        files.forEach(file=>{
            ejs.renderFile(path.join(temDir,file),answers,(err,result)=>{
                if(err) throw err
                fs.writeFileSync(path.join(destDir,file),result)
            })
        })
    })
})