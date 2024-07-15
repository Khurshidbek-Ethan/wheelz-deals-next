import { VehicleLocation, VehicleStatus, VehicleType } from '../../enums/vehicle.enum';
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
	openColor: any;
	colorsList: any;
	oilsList: any;
	brandsList: any;
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
	vehicleStatus?: VehicleStatus;
}

export interface dealerVehiclesInquiry {
	page: number;
	limit: number;
	sort?: string;
	direction?: Direction;
	search: APISearch;
}

interface ALPISearch {
	vehicleStatus?: VehicleStatus;
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
