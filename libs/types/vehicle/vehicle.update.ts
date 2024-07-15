import { VehicleBrand, VehicleColor, VehicleLocation, VehicleOil, VehicleStatus, VehicleType } from '../../enums/vehicle.enum';

export interface VehicleUpdate {
	_id: string;
	vehicleType?: VehicleType;
	vehicleStatus?: VehicleStatus;
	vehicleLocation?: VehicleLocation;
	vehicleBrand?: VehicleBrand;
	vehicleOil?: VehicleOil;
	vehicleColor?: VehicleColor;
	vehicleAddress?: string;
	vehicleTitle?: string;
	vehiclePrice?: number;
	vehicleImages?: string[];
	vehicleDesc?: string;
	soldAt?: Date;
	deletedAt?: Date;
	constructedAt?: Date;
}
