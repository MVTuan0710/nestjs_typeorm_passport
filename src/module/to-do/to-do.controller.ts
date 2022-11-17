import {Body, Controller, Headers, Delete, Get, Param, Post, Put, Query, Req, Res, UseGuards} from "@nestjs/common";
import {ToDoService} from "./to-do.service";
import {CreateToDo, CreateAssignToDo} from "./to-do.dto";
import {JwtAuthGuard} from "../auth/guard/guard.jwt";
// import {Roles} from "../../decorator/role/role.decorator";
// import {EnumRole} from "../../constant/role/role.constant";
// import {RoleGuards} from "../role/guards/role.guards";
import {ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiTags} from "@nestjs/swagger";
// import {AccountEntity} from "./account.entity";

@ApiTags('to_do')
@Controller('to_do')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class ToDoController{
    constructor(private toDoService : ToDoService) {}

    // get all account
    // @Roles(EnumRole.ADMIN)
    @Get('/get_all')
    async getAll(@Res() res) : Promise<any>{
        return this.toDoService.find().then(result =>{
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

    // get to do by id
    // @Roles(EnumRole.ADMIN,EnumRole.SUPPORT)
    @Get('/id/:to_do_id')
    async getToDoByID(@Res() res, @Param('to_do_id') to_do_id : string) : Promise<any>{
        return this.toDoService.getToDoById(to_do_id).then(result =>{
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

    @ApiBody({type : CreateAssignToDo})
    @Put('/assign')
    async assignToDo(@Body() data : CreateAssignToDo, @Headers() token: string, @Res() res): Promise<any> {
        return this.toDoService.assignToDo(data,token).then(result =>{
            res.status(200).json({
                message : 'Assign success',
                result,
            });
        }).catch(err =>{
            console.log();
            res.status(500).json({
                message : 'Assign failed',
                err,
            });
        })
    }
    
    // update status
    @Put('/update_status/:to_do_id')
    async updateStatusToDo(@Res() res,@Param('to_do_id') to_do_id : string ): Promise<any> {
        return this.toDoService.updateStatusToDo(to_do_id).then(result =>{
            res.status(200).json({
                message : 'Update success ',
                result,
            });
        }).catch(err =>{
            console.log();
            res.status(500).json({
                message : 'Update failed',
                err,
            });
        })
    }

    // create to do
    @ApiBody({type : CreateToDo})
    @Post('/create')
    async createToDo(@Body() data : CreateToDo, @Res() res): Promise<any> {
        return this.toDoService.createToDo(data).then(result =>{
            res.status(200).json({
                message : 'Task is created',
                result,
            });
        }).catch(err =>{
            console.log();
            res.status(500).json({
                message : 'Create failed',
                err,
            });
        })
    }

    // update to do
    @ApiBody({type : CreateToDo})
    // // @Roles(EnumRole.ADMIN)
    @Put('/:to_do_id')
    async updateToDo(@Body() data : CreateToDo, @Res() res, @Param('to_do_id')to_do_id : string ): Promise<any> {
        return this.toDoService.updateToDo(to_do_id, data).then(result =>{
            res.status(200).json({
                message : 'Task is updated',
                result,
            });
        }).catch(err =>{
            console.log();
            res.status(500).json({
                message : 'Update failed',
                err,
            });
        })
    }

    // delete to do
    // @Roles(EnumRole.ADMIN)
    @Delete('/delete/:to_do_id')
    async deleteToDo(@Res() res , @Param('to_do_id') to_do_id : string) : Promise<any>{
        return this.toDoService.deleteToDo(to_do_id).then(result =>{
            res.status(200).json({
                message : 'Task is deleted',
                result,
            });
        }).catch(err => {
            res.status(500).json({
                message : 'Delete failed',
                err,
            });
        })
    }


}