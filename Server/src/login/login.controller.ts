import { Body, Controller, Post, Get, Res, Param, UseGuards, Request, Put } from '@nestjs/common';
import { LoginService } from './login.service';
import { Response } from 'express';
import { UserDTO } from 'src/DTO/user.dto';
import { AutenticationService } from 'src/autentication/autentication.service';

@Controller('login')
export class LoginController {
    constructor(private srv: LoginService) { }
    // @Get()
    // getAll() {
    //     return this.srv.getAll();
    // }

    @Post()
    login_user(@Body() user: UserDTO, @Res() res: Response) {        
        this.srv.login(user)
            .then(result => {
                res.status(result.stat).json(result.desc);
            })

    }

    @UseGuards(AutenticationService)
    @Get()
    async getById( @Request() req, @Res() res:Response) {
        let id = req['user'].id        
        let user =  await this.srv.getUserById(id)
        res.send(user);
    }

    @UseGuards(AutenticationService)
    @Put()
    async updateUser(@Request() req,@Body() user: UserDTO, @Res() res:Response){
        let id = req['user'].id
     
        
        if(id != user.id)
            res.status(401).send()
        
        else{
            let status =await this.srv.updateUser(user);
            res.status(status).send();
        }
    }
}
