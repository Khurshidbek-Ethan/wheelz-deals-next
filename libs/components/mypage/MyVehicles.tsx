import React, { useState } from 'react';
import { NextPage } from 'next';
import { Pagination, Stack, Typography } from '@mui/material';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { useReactiveVar } from '@apollo/client';
import { vehicle } from '../../types/vehicle/vehicle';
import { dealerVehiclesInquiry } from '../../types/vehicle/vehicle.input';
import { T } from '../../types/common';
import { vehicleStatus } from '../../enums/vehicle.enum';
import { userVar } from '../../../apollo/store';
import { useRouter } from 'next/router';
import { VehicleCard } from './VehicleCard';

const MyVehicles: NextPage = ({ initialInput, ...props }: any) => {
	const device = useDeviceDetect();
	const [searchFilter, setSearchFilter] = useState<dealerVehiclesInquiry>(initialInput);
	const [dealerVehicles, setdealerVehicles] = useState<vehicle[]>([]);
	const [total, setTotal] = useState<number>(0);
	const user = useReactiveVar(userVar);
	const router = useRouter();

	/** APOLLO REQUESTS **/

	/** HANDLERS **/
	const paginationHandler = (e: T, value: number) => {
		setSearchFilter({ ...searchFilter, page: value });
	};

	const changeStatusHandler = (value: vehicleStatus) => {
		setSearchFilter({ ...searchFilter, search: { vehicleStatus: value } });
	};

	const deletevehicleHandler = async (id: string) => {};

	const updatevehicleHandler = async (status: string, id: string) => {};

	if (user?.memberType !== 'dealer') {
		router.back();
	}

	if (device === 'mobile') {
		return <div>wheelz-deals Vehicles MOBILE</div>;
	} else {
		return (
			<div id="my-vehicle-page">
				<Stack className="main-title-box">
					<Stack className="right-box">
						<Typography className="main-title">My Vehicles</Typography>
						<Typography className="sub-title">We are glad to see you again!</Typography>
					</Stack>
				</Stack>
				<Stack className="vehicle-list-box">
					<Stack className="tab-name-box">
						<Typography
							onClick={() => changeStatusHandler(vehicleStatus.ACTIVE)}
							className={searchFilter.search.vehicleStatus === 'ACTIVE' ? 'active-tab-name' : 'tab-name'}
						>
							On Sale
						</Typography>
						<Typography
							onClick={() => changeStatusHandler(vehicleStatus.SOLD)}
							className={searchFilter.search.vehicleStatus === 'SOLD' ? 'active-tab-name' : 'tab-name'}
						>
							On Sold
						</Typography>
					</Stack>
					<Stack className="list-box">
						<Stack className="listing-title-box">
							<Typography className="title-text">Listing title</Typography>
							<Typography className="title-text">Date Published</Typography>
							<Typography className="title-text">Status</Typography>
							<Typography className="title-text">View</Typography>
							<Typography className="title-text">Action</Typography>
						</Stack>

						{dealerVehicles?.length === 0 ? (
							<div className={'no-data'}>
								<img src="/img/icons/icoAlert.svg" alt="" />
								<p>No vehicle found!</p>
							</div>
						) : (
							dealerVehicles.map((vehicle: vehicle) => {
								return (
									<VehicleCard
										vehicle={vehicle}
										deletevehicleHandler={deletevehicleHandler}
										updatevehicleHandler={updatevehicleHandler}
									/>
								);
							})
						)}

						{dealerVehicles.length !== 0 && (
							<Stack className="pagination-config">
								<Stack className="pagination-box">
									<Pagination
										count={Math.ceil(total / searchFilter.limit)}
										page={searchFilter.page}
										shape="circular"
										color="primary"
										onChange={paginationHandler}
									/>
								</Stack>
								<Stack className="total-result">
									<Typography>{total} vehicle available</Typography>
								</Stack>
							</Stack>
						)}
					</Stack>
				</Stack>
			</div>
		);
	}
};

MyVehicles.defaultProps = {
	initialInput: {
		page: 1,
		limit: 5,
		sort: 'createdAt',
		search: {
			vehicleStatus: 'ACTIVE',
		},
	},
};

export default MyVehicles;
