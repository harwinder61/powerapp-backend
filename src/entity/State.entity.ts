import {Entity, PrimaryColumn, Column, BaseEntity} from "typeorm";

@Entity({
    name: "us_states",
  })

export class State extends BaseEntity{

    @PrimaryColumn()
    id: number;

    @Column()
    STATE_CODE : string;

    @Column()
    STATE_NAME : string;
}
