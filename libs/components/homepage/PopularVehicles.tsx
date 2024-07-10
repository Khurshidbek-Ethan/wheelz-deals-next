import React, { useState } from 'react';
import { Stack, Box } from '@mui/material';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper';
import WestIcon from '@mui/icons-material/West';
import EastIcon from '@mui/icons-material/East';


import Link from 'next/link';
import { VehiclesInquiry } from '../../types/vehicle/vehicle.input';
import { vehicle } from '../../types/vehicle/vehicle';
import PopularvehicleCard from './PopularVehicleCard';


interface PopularVehiclesProps {
	initialInput: VehiclesInquiry;
}

const PopularVehicles = (props: PopularVehiclesProps) => {
	const { initialInput } = props;
	const device = useDeviceDetect();
	const [popularVehicles, setPopularVehicles] = useState<vehicle[]>([]);

	/** APOLLO REQUESTS **/
	/** HANDLERS **/

	if (!popularVehicles) return null;

	if (device === 'mobile') {
		return (
			<Stack className={'popular-Vehicles'}>
				<Stack className={'container'}>
					<Stack className={'info-box'}>
						<span>Popular Vehicles</span>
					</Stack>
					<Stack className={'card-box'}>
						<Swiper
							className={'popular-vehicle-swiper'}
							slidesPerView={'auto'}
							centeredSlides={true}
							spaceBetween={25}
							modules={[Autoplay]}
						>
							{popularVehicles.map((vehicle: vehicle) => {
								return (
									<SwiperSlide key={vehicle._id} className={'popular-vehicle-slide'}>
										<PopularvehicleCard vehicle={vehicle} />
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
			<Stack className={'popular-Vehicles'}>
				<Stack className={'container'}>
					<Stack className={'info-box'}>
						<Box component={'div'} className={'left'}>
							<span>Popular Vehicles</span>
							<p>Popularity is based on views</p>
						</Box>
						<Box component={'div'} className={'right'}>
							<div className={'more-box'}>
								<Link href={'/vehicle'}>
									<span>See All Categories</span>
								</Link>
								<img src="/img/icons/rightup.svg" alt="" />
							</div>
						</Box>
					</Stack>
					<Stack className={'card-box'}>
						<Swiper
							className={'popular-vehicle-swiper'}
							slidesPerView={'auto'}
							spaceBetween={25}
							modules={[Autoplay, Navigation, Pagination]}
							navigation={{
								nextEl: '.swiper-popular-next',
								prevEl: '.swiper-popular-prev',
							}}
							pagination={{
								el: '.swiper-popular-pagination',
							}}
						>
							{popularVehicles.map((vehicle: vehicle) => {
								return (
									<SwiperSlide key={vehicle._id} className={'popular-vehicle-slide'}>
										<PopularvehicleCard vehicle={vehicle} />
									</SwiperSlide>
								);
							})}
						</Swiper>
					</Stack>
					<Stack className={'pagination-box'}>
						<WestIcon className={'swiper-popular-prev'} />
						<div className={'swiper-popular-pagination'}></div>
						<EastIcon className={'swiper-popular-next'} />
					</Stack>
				</Stack>
			</Stack>
		);
	}
};

PopularVehicles.defaultProps = {
	initialInput: {
		page: 1,
		limit: 7,
		sort: 'vehicleViews',
		direction: 'DESC',
		search: {},
	},
};

export default PopularVehicles;
