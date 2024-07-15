import { VehicleLocation, VehicleStatus, VehicleType } from '../../enums/vehicle.enum';
import { Member } from '../member/member';

export interface MeLiked {
	memberId: string;
	likeRefId: string;
	myFavorite: boolean;
}

export interface TotalCounter {
	total: number;
}

export interface vehicle {
	_id: string;
	VehicleType: VehicleType;
	vehicleStatus: VehicleStatus;
	VehicleLocation: VehicleLocation;
	vehicleAddress: string;
	vehicleTitle: string;
	vehiclePrice: number;
	vehicleSquare: number;
	vehicleBeds: number;
	vehicleRooms: number;
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
	list: vehicle[];
	metaCounter: TotalCounter[];
}
