import {Entity, PrimaryColumn, Column, BaseEntity, ManyToOne} from "typeorm";

import {User} from "./User.entity";

@Entity({
    name: "media",
  })

export class Media extends BaseEntity{

    @PrimaryColumn()
    id: number;

    @Column()
    title : string;

    @Column()
    name : string;

    @Column()
    type : string;

    @Column()
    category : number;

    @Column()
    file_url : string;

    @Column()
    active : number;

    @Column()
    userId : number;

    @Column()
    create_at : Date;
    
    @Column()
    update_at : Date;

    @Column()
    delete_at : Date;

    @ManyToOne(type => User, user => user.medias)
    user: User;
}
