import { Injectable } from '@nestjs/common';
import { log } from 'console';
import { UserDTO } from 'src/DTO/user.dto';
import { DataBaseConnectionService } from 'src/data-base-connection/data-base-connection.service';
// import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { EmailService } from 'src/email/email.service';


@Injectable()
export class LoginService {
    private codes = {}
    users: UserDTO[] = [];
    salt = '$2b$10$bakP3knpCwhf6vQoCZsh4.'
    constructor(private ser: DataBaseConnectionService, private email: EmailService, private jwtService: JwtService) { }

    getAll() {
        return this.users;
    }

    async getUserById(id: Number) {
        let user = await this.ser.getUser(id);
        return user;
    }

    async updateUser(user: UserDTO) {
        return await this.ser.updateUser(user)

    }

    async login(user: UserDTO) {
        this.users = await this.ser.getUsers();
        // user.password = await this.hashPassword(user.password);

        if (user.name == undefined) {
            //login
            let user_login = this.users.find(u => u.email == user.email && u.password == user.password);
            if (!user_login)
                return { stat: 400, desc: "email or password incorrect" };

            else {
                const payload = { username: user_login.name, id: user_login.id };


                return {
                    stat: 200,
                    desc: this.createToken(payload)
                }

            }
        }
        else {
            //sign up
            let user_email = this.users.find(u => u.email == user.email);
            if (user_email)
                return { stat: 400, desc: 'this email already exists' };
            else
                if (user.name && user.password && user.email) {
                    let newId = await this.ser.insertUser(user);

                    const payload = { username: user.name, id: newId };
                    ///send
                    this.email.sendEmail(user.email,'הצטרפות לאפליקציה shop4you', 'היי' + user.name+","+'\nברוכה הבאה לאפלקציה Shop4you ' +'\n תודה שבחרת להשתמש באפלקציה שלנו')

                    return { stat: 201, desc: this.createToken(payload) };
                } else
                    return { stat: 400, desc: 'missing some information' };
        }

    }

    async forgotPassword(email) {
        let user = await this.ser.getUserByEmail(email)
        console.log(user);
        
        if(!user)
            return 401

        let pass = ''
        for (let i = 0; i <2; i++) { //TODO change loop to 6 iterations
            pass += Math.round(Math.random() * 9)
        }
        console.log(pass, 'code');
        this.codes[email] = pass
        
        this.email.sendEmail(email, 'קוד אימות ', " קוד האימות הוא:" + pass)
        return 200
    }

    ifCodeTrue(email, code) {
        console.log(this.codes,"codes");
        console.log(this.codes[email] == code);
        
        
        if (this.codes[email] == code){
           return true
        }
        return false
    }

    async newPassword(email, newPassword){
        
        let payload = await this.ser.changePassword(email,newPassword)
        
        let token = this.createToken(payload)
        
        return token
    }

    private createToken(payload) {
        const expireIn = 5 * 60 * 60 * 1000 + " ";

        return {
            access_token: this.jwtService.sign(payload, {
                expiresIn: expireIn,
                secret: jwtConstants.secret,
            })

        }
    }

    // async hashPassword(password: string): Promise<string> {
    //     const hash = await bcrypt.hash(password, this.salt);
    //     return hash;
    // }
}
