import {
  Model,
  Column,
  Table,
  AllowNull,
  PrimaryKey,
} from "sequelize-typescript";

@Table({
  tableName: "customers",
  timestamps: false,
})
export class CustomerModel extends Model {
  @PrimaryKey
  @Column
  declare id: string;

  @AllowNull(false)
  @Column
  declare name: string;

  @AllowNull(true)
  @Column
  declare street: string;

  @AllowNull(true)
  @Column
  declare city: string;

  @AllowNull(true)
  @Column
  declare state: string;

  @AllowNull(true)
  @Column
  declare zipCode: string;

  @AllowNull(false)
  @Column
  declare active: boolean;

  @AllowNull(false)
  @Column
  declare rewardPoints: number;
}
