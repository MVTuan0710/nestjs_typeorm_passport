import {Module} from "@nestjs/common";
import {ConfigModule, ConfigService} from "@nestjs/config";
import configuration from "../../config/configuration";
import {TypeOrmModule} from "@nestjs/typeorm";
import {join} from "path";
import {MailerModule} from "@nestjs-modules/mailer";
import {HandlebarsAdapter} from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";
import {ScheduleModule} from "@nestjs/schedule";
import {AccountEntity} from "../account/account.entity";
import { ToDoEntity } from "../to-do/to-do.entity";
const NODE_ENV = process.env.NODE_ENV;
@Module({
    imports :[
        ScheduleModule.forRoot(),
        ConfigModule.forRoot({
            // envFilePath : `./env/${NODE_ENV ? '.' + NODE_ENV.trim() : ''}.env`,
            envFilePath : `./env/.env`,
            isGlobal : true,
            load : [configuration]
        }),
        TypeOrmModule.forRootAsync({
            imports : [ConfigModule],
            inject : [ConfigService],
            useFactory :async () => ({
                type:'postgres',
                host:'localhost',
                port: 5432,
                username: 'postgres',
                password: '123',
                database: 'test_db_nestjs',
                // autoLoadEntities: true,
                entities: [AccountEntity, ToDoEntity],
                // synchronize : true,
            }),
        }),

        // config gmail
        MailerModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                transport: {
                    service: 'gmail',
                    host: 'smtp.gmail.com',
                    port: 587,
                    secure: false,
                    auth: {
                        user: configService.get<string>('mail.account'),
                        pass: configService.get<string>('mail.password')
                    }
                },
                defaults: {
                    from: configService.get<string>('mail.account')
                },
                template: {
                    dir: join(__dirname, '../../../src/helpers/template/mail'),
                    adapter: new HandlebarsAdapter(), // or new PugAdapter() or new EjsAdapter()
                    options: {
                        strict: true
                    }
                }
            })
        })
    ],
    exports : [ConfigModule,TypeOrmModule,MailerModule]
})
export class CoreModule{}