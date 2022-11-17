import {IsEmail, IsInt, IsNotEmpty, IsOptional, IsPhoneNumber, Matches, MinLength} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class BodyLogin{
    @ApiProperty({description : 'Your email', type : String})
    @IsNotEmpty()
    @IsEmail()
    email : string;

    @ApiProperty({description : "Your password", type : String})
    @MinLength(6)
    password : string;
}

export class BodyRegister extends BodyLogin{
    @ApiProperty({description : "Your fullname", type : String})
    @IsNotEmpty()
    fullname : string;

    @ApiProperty({description : "Your gender", type : String})
    @IsNotEmpty()
    gender : string;

    @ApiProperty({
        description: 'Has to match a regular expression: /^\\+[1-9]\\d{1,14}$/',
        example: '+123123123123'
    })
    @IsNotEmpty()
    @IsPhoneNumber('VN')
    // @Matches(/^\+[1-9]\d{1,14}$/)
    phone : string;

    // @ApiProperty({description : 'Your role', type : Number})
    // @IsOptional()
    // @IsInt()
    // role : number;

    // @ApiProperty({description : 'Your allow_email', type : Boolean})
    // @IsOptional()
    // allow_email : boolean;


    verify_token : string;
}
export class ValidateResult{
        account_id: string;
        email: string;
        fullname: string;
        gender: string;
        phone: string;
        is_active: boolean;
        verify_token: string;
        created_at: Date;
        updated_at: Date;
        deleted_at: Date;
}