import {Entity, PrimaryColumn, Column, BaseEntity, OneToMany} from "typeorm";
import { User } from "./User.entity"

@Entity({
    name: "roles",
  })

export class Role extends BaseEntity{

    @PrimaryColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(type => User, user => user.role)
    users: User[];

    // @ManyToOne(type => User, user => user.medias)
    // user: User

}
