import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database.config';

interface IFSCAttributes {
  id: number;
  ifsc: string;
  bank: string;
  branch: string;
  address?: string | null;
  city?: string | null;
  district?: string | null;
  state?: string | null;
  bankCode?: string | null;
  center?: string | null;
  contact?: string | null;
  micr?: string | null;
  upi?: boolean | null;
  rtgs?: boolean | null;
  neft?: boolean | null;
  imps?: boolean | null;
  swift?: string | null;
  iso3166?: string | null;
  updatedAt: Date;
}

interface IFSCCreationAttributes extends Optional<IFSCAttributes, 'id' | 'updatedAt' | 
  'address' | 'city' | 'district' | 'state' | 'bankCode' | 'center' | 'contact' | 
  'micr' | 'upi' | 'rtgs' | 'neft' | 'imps' | 'swift' | 'iso3166'> {}

class IFSC extends Model<IFSCAttributes, IFSCCreationAttributes> implements IFSCAttributes {
  public id!: number;
  public ifsc!: string;
  public bank!: string;
  public branch!: string;
  public address?: string | null;
  public city?: string | null;
  public district?: string | null;
  public state?: string | null;
  public bankCode?: string | null;
  public center?: string | null;
  public contact?: string | null;
  public micr?: string | null;
  public upi?: boolean | null;
  public rtgs?: boolean | null;
  public neft?: boolean | null;
  public imps?: boolean | null;
  public swift?: string | null;
  public iso3166?: string | null;
  public updatedAt!: Date;
}

IFSC.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  ifsc: {
    type: DataTypes.STRING(11),
    allowNull: false,
    unique: true
  },
  bank: {
    type: DataTypes.STRING,
    allowNull: false
  },
  branch: {
    type: DataTypes.STRING,
    allowNull: false
  },
  address: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  city: {
    type: DataTypes.STRING,
    allowNull: true
  },
  district: {
    type: DataTypes.STRING,
    allowNull: true
  },
  state: {
    type: DataTypes.STRING,
    allowNull: true
  },
  bankCode: {
    type: DataTypes.STRING(10),
    allowNull: true,
    field: 'bank_code'
  },
  center: {
    type: DataTypes.STRING,
    allowNull: true
  },
  contact: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  micr: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  upi: {
    type: DataTypes.BOOLEAN,
    allowNull: true
  },
  rtgs: {
    type: DataTypes.BOOLEAN,
    allowNull: true
  },
  neft: {
    type: DataTypes.BOOLEAN,
    allowNull: true
  },
  imps: {
    type: DataTypes.BOOLEAN,
    allowNull: true
  },
  swift: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  iso3166: {
    type: DataTypes.STRING(10),
    allowNull: true
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
}, {
  sequelize,
  tableName: 'ifsc_codes',
  timestamps: true,
  updatedAt: 'updatedAt',
  createdAt: false
});

export default IFSC;