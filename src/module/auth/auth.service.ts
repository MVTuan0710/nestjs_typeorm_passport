import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {AccountService} from "../account/account.service";
import {BodyLogin, ValidateResult} from "./auth.dto";
import {AccountEntity} from "../account/account.entity";
import {JwtService} from "@nestjs/jwt";
import {BodyCreateAccount} from "../account/account.dto"

@Injectable()
export class AuthService{
    constructor(
        private readonly accountService : AccountService,
        private readonly jwtService : JwtService,
    ) {}

    // create register
    async register(data : BodyCreateAccount) : Promise<any>{
        try {
            const result =  await this.accountService.createAccount(data);
            return result;
        }catch (err){
            console.log('errors',err);
            throw new HttpException('Register Failed',HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    


    // verify email
    async verifyAccount(token : string) : Promise<any>{
        try {
            const account = await this.accountService.getByVerifyToken(token);
            if(!account){
                throw new HttpException('The account is not exists',HttpStatus.NOT_FOUND);
            }
 
            const result =  await this.accountService.updateActiveAccount(account.account_id,{
                is_active : true
            })
            return result;
        }catch (err){
            console.log('errors',err);
            throw new HttpException('Verify email failed',HttpStatus.INTERNAL_SERVER_ERROR);
        }
     }

    // validate Account
    async validateAccount(username : string, password : string) : Promise<ValidateResult>{
       try {
           const account = await this.accountService.getAccountByEmail(username);
           if(account && account.isPasswordValid(password)){
               const { password, ...result} = account
               return result
           }
           return null
       }catch (err){
           console.log('errors',err);
           throw new HttpException('Invalid account or password',HttpStatus.INTERNAL_SERVER_ERROR);
       }
    }

    // login
    async LoginAccount(_data : BodyLogin) : Promise<any>{
        try {
        const accounts : AccountEntity = await this.accountService.getAccountByEmail(_data.email);
        console.log (accounts)
        const payload ={
            email : accounts.email,
            id : accounts.account_id,
            // role : accounts.role,
        }
        const jwtToken = this.jwtService.sign(payload)

        return{
            access_token : jwtToken,
        }

        }catch (err) {
            console.log('errors',err);
        }
    }
    async getPayload(token:string):Promise<any>{
        let result = this.jwtService.verify(token);
        return result;
    }
}