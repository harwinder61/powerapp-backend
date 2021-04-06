import {Entity, PrimaryColumn, Column, BaseEntity} from "typeorm";

@Entity({
    name: "category",
  })

export class Category extends BaseEntity{

    @PrimaryColumn()
    id: number;

    @PrimaryColumn()
    name: string;

}
