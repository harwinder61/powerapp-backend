import {Entity, PrimaryColumn, Column, BaseEntity, OneToMany, ManyToOne, JoinColumn } from "typeorm";
import {Media} from "./Media.entity";
import {Role} from "./Role.entity";

@Entity({
    name: "users",
  })

export class User extends BaseEntity{

    @PrimaryColumn()
    id: number;

    @Column()
    name: string;

    // @Column()
    // last_name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    role_id: number;

    @Column()
    profile_pic: string;

    @Column()
    bio: string;

    @Column()
    cover_album: string;

    @Column()
    country: string;

    @Column()
    state: string;
    
    @Column()
    city: string;
    
    @Column()
    zip_code: string;

    @Column()
    active: number;


    @Column()
    token: string;

    @Column()
    stripe_id: string;

    @Column()
    username: string;

    @Column()
    album_title: string;

    @Column()
    phone: string;

    @Column()
    sample_url: string;

    @OneToMany(type => Media, media => media.user, {eager: true, nullable: true, onDelete: 'CASCADE'})
    medias: Media[];

    @ManyToOne(type => Role, role => role.users)
    @JoinColumn({name: 'role_id', referencedColumnName: 'id'})
    role: Role;
    

  }
