import React, { useEffect, useState } from 'react';
import { NextPage } from 'next';
import { Pagination, Stack, Typography } from '@mui/material';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { vehicle } from '../../types/vehicle/vehicle';
import { VehiclesInquiry } from '../../types/vehicle/vehicle.input';
import { T } from '../../types/common';
import { useRouter } from 'next/router';
import { VehicleCard } from '../mypage/VehicleCard';


const MyVehicles: NextPage = ({ initialInput, ...props }: any) => {
	const device = useDeviceDetect();
	const router = useRouter();
	const { memberId } = router.query;
	const [searchFilter, setSearchFilter] = useState<VehiclesInquiry>({ ...initialInput });
	const [dealerVehicles, setdealerVehicles] = useState<vehicle[]>([]);
	const [total, setTotal] = useState<number>(0);

	/** APOLLO REQUESTS **/

	/** LIFECYCLES **/
	useEffect(() => {}, [searchFilter]);

	useEffect(() => {
		if (memberId)
			setSearchFilter({ ...initialInput, search: { ...initialInput.search, memberId: memberId as string } });
	}, [memberId]);

	/** HANDLERS **/
	const paginationHandler = (e: T, value: number) => {
		setSearchFilter({ ...searchFilter, page: value });
	};

	if (device === 'mobile') {
		return <div>wheelz-deals Vehicles MOBILE</div>;
	} else {
		return (
			<div id="member-Vehicles-page">
				<Stack className="main-title-box">
					<Stack className="right-box">
						<Typography className="main-title">Vehicles</Typography>
					</Stack>
				</Stack>
				<Stack className="Vehicles-list-box">
					<Stack className="list-box">
						{dealerVehicles?.length > 0 && (
							<Stack className="listing-title-box">
								<Typography className="title-text">Listing title</Typography>
								<Typography className="title-text">Date Published</Typography>
								<Typography className="title-text">Status</Typography>
								<Typography className="title-text">View</Typography>
							</Stack>
						)}
						{dealerVehicles?.length === 0 && (
							<div className={'no-data'}>
								<img src="/img/icons/icoAlert.svg" alt="" />
								<p>No vehicle found!</p>
							</div>
						)}
						{dealerVehicles?.map((vehicle: vehicle) => {
							return <VehicleCard vehicle={vehicle} key={vehicle?._id} />;
						})}

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
			memberId: '',
		},
	},
};

export default MyVehicles;
