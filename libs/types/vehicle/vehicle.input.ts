import { VehicleBrand, VehicleColor, VehicleLocation, VehicleOil, VehicleStatus, VehicleType } from '../../enums/vehicle.enum';
import { Direction } from '../../enums/common.enum';

export interface vehicleInput {
	vehicleType: VehicleType;
	vehicleLocation: VehicleLocation;
	vehicleBrand: VehicleBrand;
	vehicleOil: VehicleOil;
	vehicleColor: VehicleColor;
	vehicleAddress: string;
	vehicleTitle: string;
	vehiclePrice: number;
	vehicleImages: string[];
	vehicleDesc?: string;
	memberId?: string;
	constructedAt?: Date;
}

interface VISearch {
	memberId?: string;
	locationList?: VehicleLocation[];
	typeList?: VehicleType[];
	brandList?: VehicleBrand[];
	oilList?: VehicleOil[];
	colorList?: VehicleColor[];
	pricesRange?: Range;
	text?: string;
}

export interface VehiclesInquiry {
	page: number;
	limit: number;
	sort?: string;
	direction?: Direction;
	search: VISearch;
}

export interface PricesRange {
	vehiclePrice: number;
	start: number;
	end: number;
}

interface Range {
	start: number;
	end: number;
}


interface DVISearch {
	vehicleStatus?: VehicleStatus;
}

export interface DealerVehicleInquiry {
	page: number;
	limit: number;
	sort?: string;
	direction?: Direction;
	search: DVISearch;
}

interface ALVISearch {
	vehicleTypeList?: VehicleType[];
	vehicleStatus?: VehicleStatus;
	VehicleLocationList?: VehicleLocation[];
	vehicleBrandList?: VehicleBrand[];
	vehicleOilList?: VehicleOil[];
	vehicleColorList?: VehicleColor[];
}

export interface AllVehiclesInquiry {
	page: number;
	limit: number;
	sort?: string;
	direction?: Direction;
	search: ALVISearch;
}



