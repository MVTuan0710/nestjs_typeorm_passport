import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {ToDoEntity} from "./to-do.entity";
import {Repository} from "typeorm";
import {AuthService} from "../auth/auth.service";
import {CreateToDo,CreateAssignToDo} from "./to-do.dto";
import {split} from "split"
// import {RoleService} from "../role/role.service";
// import {v4 as uuidv4} from 'uuid';
// import * as bcrypt from 'bcryptjs'
// import {hashSync} from 'bcryptjs'
// import {MailerService} from "@nestjs-modules/mailer";
// import { AppModule } from "../core/core.module"


@Injectable()
export class ToDoService {
    public toDoEntity = new ToDoEntity();
    constructor(@InjectRepository(ToDoEntity) 
        private readonly toDoRepository: Repository<ToDoEntity>,
        private readonly authService : AuthService
    ) {}

    // Find All
    async find(): Promise<ToDoEntity[]> {
        const data = await this.toDoRepository.find();
        return data;
    }

    // find by id
    async getToDoById(to_do_id : string): Promise<ToDoEntity> {
        const data = await this.toDoRepository.findOne({where : {to_do_id :to_do_id}});
        return data;
    }

    // create account
    async createToDo(data: CreateToDo): Promise<ToDoEntity> {
        try {
            // check email exists
            const _task = await this.toDoRepository.findOne({where : {name_of_the_task :data.name_of_the_task}});
            if (_task){
                throw console.log('This name of task is exist');
            }
            
            //check role valid
            // const role = await this.roleService.findById(data.role);
            // if (!role || role.id === 2) {
            //     throw new HttpException('Role is incorrect', HttpStatus.NOT_FOUND);
            
            // save to do
            const result = await this.toDoRepository.save(data);
            return result;
        }catch(err){
            throw console.log('Can`t create Task');
        }
    }
    

    async updateStatusToDo(to_do_id : string): Promise<any> {
        try {
            // check task exists
            const account = await this.toDoRepository.findOne({where : {to_do_id :to_do_id}});
            if (!account)
            throw console.log(`Task don't exist`);

            // update status of task
            const result =  await this.toDoRepository.update(account.to_do_id,{
                status : "COMPLETE"
            })
            return result;
        }catch (err){
            console.log('error',err);
            throw console.log('Can`t update status Task');
        }
    }
    
    // update Account
    async updateToDo(to_do_id : string, data: CreateToDo): Promise<any> {
       try {
           // check account exists
           const _task = await this.toDoRepository.findOne({where : {to_do_id : to_do_id}});
           if (_task)
               throw console.log('Can`t found Task by to_do_id');

            //  check role valid
            //  const role = await this.roleService.findById(data.role);
            //      if (!role || role.id === 2) {
            //          throw new HttpException('Role is incorrect', HttpStatus.NOT_FOUND);
            //      }

            // update account
           const result = await this.toDoRepository.update(to_do_id, data);
           return result;
       }catch (err){
           console.log('error',err);
           throw console.log('Can`t update Task');
       }
    }

    // delete Acount
    async deleteToDo(to_do_id : string): Promise<any> {
        try {
            // check account exists
            const _task = await this.toDoRepository.findOne({where : {to_do_id : to_do_id}});
            if (!_task)
                throw console.log('Can`t found Task by to_do_id');

            // delete
            const result = await this.toDoRepository.delete(to_do_id);
            return result;
        }catch (err){
            console.log('errors',err);
            throw console.log('Can`t delete Task');
        }
    }

    async assignToDo(_data: CreateAssignToDo, _token: any): Promise<any>{
        try{
            const tmp = _token.authorization;
            const words = tmp.split(' ');
            const data = await this.authService.getPayload(words[1]);
            if(data.id === _data.account_id){
                throw console.log('Can`t assign this Task to account_id');
            }
           const result = await this.toDoRepository.update(_data.to_do_id,{account_id :  _data.account_id})
           console.log(result);
        }catch(err){
            throw console.log('Can`t assign Task');
        }
    }
}