import { VehicleBrand, VehicleColor, VehicleLocation, VehicleOil, VehicleStatus, VehicleType } from '../../enums/vehicle.enum';
import { MeLiked } from '../like/like';
import { Member } from '../member/member';

export interface TotalCounter {
	total: number;
}

export interface Vehicle {
	_id: string;
	VehicleType: VehicleType;
	vehicleStatus: VehicleStatus;
	VehicleLocation: VehicleLocation;
	vehicleBrand: VehicleBrand;
	vehicleOil: VehicleOil;
	vehicleColor: VehicleColor;
	vehicleAddress: string;
	vehicleTitle: string;
	vehiclePrice: number;
	vehicleViews: number;
	vehicleLikes: number;
	vehicleComments: number;
	vehicleRank: number;
	vehicleImages: string[];
	vehicleDesc?: string;
	vehicleBarter: boolean;
	vehicleRent: boolean;
	memberId: string;
	soldAt?: Date;
	deletedAt?: Date;
	constructedAt?: Date;
	createdAt: Date;
	updatedAt: Date;
	/** from aggregation **/
	meLiked?: MeLiked[];
	memberData?: Member;
}

export interface Vehicles {
	list: Vehicle[];
	metaCounter: TotalCounter[];
}
