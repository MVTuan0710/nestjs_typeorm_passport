import {Body, Controller, Delete, Get, Param, Post, Put, Query, Req, Res, UseGuards} from "@nestjs/common";
import {AccountService} from "./account.service";
import {BodyCreateAccount, BodyUpdateAccount} from "./account.dto";
import {JwtAuthGuard} from "../auth/guard/guard.jwt";
import {ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiTags} from "@nestjs/swagger";
import {AccountEntity} from "./account.entity";

@ApiTags('account')
@Controller('account')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class AccountController{
    constructor(private accountService : AccountService) {}

    // get all account
    // @Roles(EnumRole.ADMIN)
    @Get('/get_all')
    async getAll(@Res() res) : Promise<any>{
        return this.accountService.find().then(result =>{
            res.status(200).json({
                message : 'success',
                result,
            });
        }).catch(err =>{
            res.status(500).json({
                message : 'failed',
                err,
            });
        })
    }

    // get account by Id
    // @Roles(EnumRole.ADMIN,EnumRole.SUPPORT)
    @Get('/id/:account_id')
    async getAccountByID(@Res() res, @Param('account_id') account_id : string) : Promise<any>{
        return this.accountService.getAccountById(account_id).then(result =>{
            res.status(200).json({
                message : 'success',
                result,
            });
        }).catch(err =>{
            res.status(500).json({
                message : 'failed',
                err,
            })
        })
    }

    // find account by Email
    @Get('/email/:email')
    async getAccountByEmail(@Res() res, @Param('email') email : string) : Promise<any>{
        return this.accountService.getAccountByEmail(email).then(result =>{
            res.status(200).json({
                message : 'success',
                result,
            });
        }).catch(err =>{
            res.status(500).json({
                message : 'failed',
                err,
            })
        })
    }

    // update account
    @ApiBody({type : BodyUpdateAccount})
    // // @Roles(EnumRole.ADMIN)
    @Put('/:account_id')
    async putAccount(@Body() body : BodyUpdateAccount, @Res() res, @Param('account_id')
        account_id : string ): Promise<any> {
        return this.accountService.updateAccount(account_id, body).then(result =>{
            res.status(200).json({
                message : 'Account is updated',
                result,
            });
        }).catch(err =>{
            console.log();
            res.status(500).json({
                message : 'update failed',
                err,
            });
        })
    }

    // delete account
    // @Roles(EnumRole.ADMIN)
    @Delete('/:account_id')
    async deleteAccount(@Res() res , @Param('account_id') account_id : string) : Promise<any>{
        return this.accountService.deleteAccount(account_id).then(result =>{
            res.status(200).json({
                message : 'Account is deleted',
                result,
            });
        }).catch(err => {
            res.status(500).json({
                message : 'delete failed',
                err,
            });
        })
    }
}