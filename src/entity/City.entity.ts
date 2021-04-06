import {Entity, PrimaryColumn, Column, BaseEntity} from "typeorm";

@Entity({
    name: "us_cities",
  })

export class City extends BaseEntity{

    @PrimaryColumn()
    id: number;

    @PrimaryColumn()
    ID_STATE: number;

    @Column()
    CITY : string;

    @Column()
    COUNTY : string;

}
