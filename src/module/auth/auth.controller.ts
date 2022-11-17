import {Body, Controller, Get, Param, Post, Req, Res, UseGuards} from "@nestjs/common";
import {BodyLogin} from "./auth.dto";
import {AuthService} from "./auth.service";
// import {GuardsLocal} from "./guard/guard.local";
import {ApiBody, ApiCreatedResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse} from "@nestjs/swagger";
// import {ProductsService} from "../products/products.service";
import {BodyCreateAccount} from "../account/account.dto"
@ApiTags('auth')
@Controller('auth')
export class AuthController{
    constructor(
        private authService : AuthService,
        // private productService : ProductsService,
    ) {}


    @ApiOkResponse({ description: 'Login is successful!' })
    @ApiUnauthorizedResponse({ description: 'Incorrect email or password!' })
    @Post('login')
    // @UseGuards(GuardsLocal)
    async logIn(@Body() _data : BodyLogin, @Res() res) : Promise<any>{
        return this.authService.LoginAccount(_data).then(result =>{
            res.status(200).json({
                message : 'Login successful',
                result,
            });
        }).catch(err =>{
            res.status(500).json({
                message : 'Login failed',
                err,
            });
        })
    }


    @ApiCreatedResponse({description : 'The record has been successfully created'})
    @ApiBody({type : BodyCreateAccount})
    @Post('register')
    async register(@Body() body : BodyCreateAccount, @Res() res, @Req() req) :  Promise<any>{
        return this.authService.register(body).then(result =>{
            res.status(200).json({
                result,
                message : 'Sign up successfully, please check your mail to active this account',
            });
        }).catch(err =>{
            res.status(500).json({
                message : 'Sign up failed',
                err,
            });
        })
    }


    @Get('verify/:token')
    async verify(@Res() res, @Param('token') verify_token : string) : Promise<any>{
        return this.authService.verifyAccount(verify_token).then(result =>{
            res.status(200).json({
                message : 'The account is activated',
                result
            });
        }).catch(err =>{
            res.status(500).json({
                message : 'verify token failed',
                err,
            });
        })
    }

    // confirm active product
    // @Get('confirm/:encode')
    // async verifyActive(@Res() res, @Param('encode') encode : string) : Promise<any>{
    //     return this.productService.confirmProduct(encode).then(result =>{
    //         res.status(200).json({
    //             message : 'The product is activated',
    //             result,
    //         });
    //     }).catch(err =>{
    //         res.status(500).json({
    //             message : 'confirm active product failed',
    //             err,
    //         });
    //     })
    // }

}
