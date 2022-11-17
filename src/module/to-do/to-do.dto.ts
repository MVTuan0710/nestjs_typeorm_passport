import {IsEmail, IsInt,Contains, IsNotEmpty,IsUUID, IsOptional, IsPhoneNumber, matches, Matches, Min, MinLength} from "class-validator";


export class CreateToDo{
    @IsNotEmpty()
    name_of_the_task : string;

    @MinLength(6)
    description_of_the_task : string;
}


export class CreateAssignToDo{

    @IsUUID()
    to_do_id : string;

    @IsUUID()
    account_id : string;
}
