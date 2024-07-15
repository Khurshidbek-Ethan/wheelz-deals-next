import { VehicleLocation, VehicleStatus, VehicleType } from '../../enums/vehicle.enum';

export interface vehicleUpdate {
	_id: string;
	VehicleType?: VehicleType;
	vehicleStatus?: VehicleStatus;
	VehicleLocation?: VehicleLocation;
	vehicleAddress?: string;
	vehicleTitle?: string;
	vehiclePrice?: number;
	vehicleSquare?: number;
	vehicleBeds?: number;
	vehicleRooms?: number;
	vehicleImages?: string[];
	vehicleDesc?: string;
	vehicleBarter?: boolean;
	vehicleRent?: boolean;
	soldAt?: Date;
	deletedAt?: Date;
	constructedAt?: Date;
}
