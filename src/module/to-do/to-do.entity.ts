import {
    BaseEntity,
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
// import {RoleEntity} from "../role/role.entity";
// import {CategoriesEntity} from "../categories/categories.entity";
// import {ProductsEntity} from "../products/products.entity";
// import {PantryEntity} from "../pantry_management/pantry.entity";

@Entity({name: 'to_do'})
export class ToDoEntity extends BaseEntity{
    @PrimaryGeneratedColumn('uuid')
    to_do_id : string;

    @Column({name : 'name_of_the_task', type : 'varchar', nullable : true})
    name_of_the_task : string;

    @Column({name : 'description_of_the_task', type : 'varchar', nullable : true})
    description_of_the_task : string;

    @Column({name : 'account_id', type : 'uuid', nullable : true})
    account_id : string;

    @UpdateDateColumn({name : 'date_of_completion', type : 'timestamp with time zone', nullable : true})
    date_of_completion : string;

    @Column({default : 'New', name : 'status', nullable : true})
    status : string;

    @CreateDateColumn({name : 'created_at', type : 'timestamp with time zone', nullable : true})
    created_at: Date;

    @UpdateDateColumn({name : 'updated_at', type : 'timestamp with time zone', nullable : true})
    updated_at : Date;

    @DeleteDateColumn({name : 'deleted_at', type : 'timestamp with time zone', nullable : true})
    deleted_at : Date;
}