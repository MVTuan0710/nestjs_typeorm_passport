import {forwardRef, Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {ToDoEntity} from "./to-do.entity";
import {ToDoController} from "./to-do.controller";
import {ToDoService} from "./to-do.service";
import {AuthModule} from "../auth/auth.module"
// import {RoleService} from "../role/role.service";
// import {RoleModule} from "../role/role.module";

@Module({
    imports :[TypeOrmModule.forFeature([ToDoEntity]),
    forwardRef(()=>AuthModule)
    ],
    controllers : [ToDoController],
    providers : [ToDoService],
    exports : [ToDoService,TypeOrmModule],
})
export class ToDoModule{}