import React, { useState } from 'react';
import { Stack, Box } from '@mui/material';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import WestIcon from '@mui/icons-material/West';
import EastIcon from '@mui/icons-material/East';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper';
import { VehiclesInquiry } from '../../types/vehicle/vehicle.input';

import TopVehicleCard from './TopVehicleCard'
import { Vehicle } from '../../types/vehicle/vehicle';


interface TopVehiclesProps {
	initialInput: VehiclesInquiry;
}

const TopVehicles = (props: TopVehiclesProps) => {
	const { initialInput } = props;
	const device = useDeviceDetect();
	const [topVehicles, setTopVehicles] = useState<Vehicle[]>([]);

	/** APOLLO REQUESTS **/
	/** HANDLERS **/

	if (device === 'mobile') {
		return (
			<Stack className={'top-Vehicles'}>
				<Stack className={'container'}>
					<Stack className={'info-box'}>
						<span>Top Vehicles</span>
					</Stack>
					<Stack className={'card-box'}>
						<Swiper
							className={'top-vehicle-swiper'}
							slidesPerView={'auto'}
							centeredSlides={true}
							spaceBetween={15}
							modules={[Autoplay]}
						>
							{topVehicles.map((vehicle: Vehicle) => {
								return (
									<SwiperSlide className={'top-vehicle-slide'} key={vehicle?._id}>
										<TopVehicleCard vehicle={vehicle}  />
									</SwiperSlide>
								);
							})}
						</Swiper>
					</Stack>
				</Stack>
			</Stack>
		);
	} else {
		return (
			<Stack className={'top-Vehicles'}>
				<Stack className={'container'}>
					<Stack className={'info-box'}>
						<Box component={'div'} className={'left'}>
							<span>Top Vehicles</span>
							<p>Check out our Top Vehicles</p>
						</Box>
						<Box component={'div'} className={'right'}>
							<div className={'pagination-box'}>
								<WestIcon className={'swiper-top-prev'} />
								<div className={'swiper-top-pagination'}></div>
								<EastIcon className={'swiper-top-next'} />
							</div>
						</Box>
					</Stack>
					<Stack className={'card-box'}>
						<Swiper
							className={'top-vehicle-swiper'}
							slidesPerView={'auto'}
							spaceBetween={15}
							modules={[Autoplay, Navigation, Pagination]}
							navigation={{
								nextEl: '.swiper-top-next',
								prevEl: '.swiper-top-prev',
							}}
							pagination={{
								el: '.swiper-top-pagination',
							}}
						>
							{topVehicles.map((vehicle: Vehicle) => {
								return (
									<SwiperSlide className={'top-vehicle-slide'} key={vehicle?._id}>
										<TopVehicleCard vehicle={vehicle} />
									</SwiperSlide>
								);
							})}
						</Swiper>
					</Stack>
				</Stack>
			</Stack>
		);
	}
};

TopVehicles.defaultProps = {
	initialInput: {
		page: 1,
		limit: 8,
		sort: 'vehicleRank',
		direction: 'DESC',
		search: {},
	},
};

export default TopVehicles;
