import { VehicleLocation, vehicleStatus, VehicleType } from '../../enums/vehicle.enum';
import { Direction } from '../../enums/common.enum';

export interface vehicleInput {
	VehicleType: VehicleType;
	VehicleLocation: VehicleLocation;
	vehicleAddress: string;
	vehicleTitle: string;
	vehiclePrice: number;
	vehicleSquare: number;
	vehicleBeds: number;
	vehicleRooms: number;
	vehicleImages: string[];
	vehicleDesc?: string;
	vehicleBarter?: boolean;
	vehicleRent?: boolean;
	memberId?: string;
	constructedAt?: Date;
}

interface PISearch {
	memberId?: string;
	locationList?: VehicleLocation[];
	typeList?: VehicleType[];
	roomsList?: Number[];
	options?: string[];
	bedsList?: Number[];
	pricesRange?: Range;
	periodsRange?: PeriodsRange;
	squaresRange?: Range;
	text?: string;
}

export interface VehiclesInquiry {
	page: number;
	limit: number;
	sort?: string;
	direction?: Direction;
	search: PISearch;
}

interface APISearch {
	vehicleStatus?: vehicleStatus;
}

export interface dealerVehiclesInquiry {
	page: number;
	limit: number;
	sort?: string;
	direction?: Direction;
	search: APISearch;
}

interface ALPISearch {
	vehicleStatus?: vehicleStatus;
	VehicleLocationList?: VehicleLocation[];
}

export interface AllVehiclesInquiry {
	page: number;
	limit: number;
	sort?: string;
	direction?: Direction;
	search: ALPISearch;
}

interface Range {
	start: number;
	end: number;
}

interface PeriodsRange {
	start: Date | number;
	end: Date | number;
}
