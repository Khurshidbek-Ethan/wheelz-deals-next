import React, { useState } from 'react';
import { Stack, Box } from '@mui/material';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import WestIcon from '@mui/icons-material/West';
import EastIcon from '@mui/icons-material/East';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper';
import { vehicle } from '../../types/vehicle/vehicle';
import { VehiclesInquiry } from '../../types/vehicle/vehicle.input';
import TrendvehicleCard from './TrendVehicleCard';


interface TrendVehiclesProps {
	initialInput: VehiclesInquiry;
}

const TrendVehicles = (props: TrendVehiclesProps) => {
	const { initialInput } = props;
	const device = useDeviceDetect();
	const [trendVehicles, setTrendVehicles] = useState<vehicle[]>([]);

	/** APOLLO REQUESTS **/
	/** HANDLERS **/

	if (trendVehicles) console.log('trendVehicles:', trendVehicles);
	if (!trendVehicles) return null;

	if (device === 'mobile') {
		return (
			<Stack className={'trend-Vehicles'}>
				<Stack className={'container'}>
					<Stack className={'info-box'}>
						<span>Trend Vehicles</span>
					</Stack>
					<Stack className={'card-box'}>
						{trendVehicles.length === 0 ? (
							<Box component={'div'} className={'empty-list'}>
								Trends Empty
							</Box>
						) : (
							<Swiper
								className={'trend-vehicle-swiper'}
								slidesPerView={'auto'}
								centeredSlides={true}
								spaceBetween={15}
								modules={[Autoplay]}
							>
								{trendVehicles.map((vehicle: vehicle) => {
									return (
										<SwiperSlide key={vehicle._id} className={'trend-vehicle-slide'}>
											<TrendvehicleCard vehicle={vehicle} />
										</SwiperSlide>
									);
								})}
							</Swiper>
						)}
					</Stack>
				</Stack>
			</Stack>
		);
	} else {
		return (
			<Stack className={'trend-Vehicles'}>
				<Stack className={'container'}>
					<Stack className={'info-box'}>
						<Box component={'div'} className={'left'}>
							<span>Trend Vehicles</span>
							<p>Trend is based on likes</p>
						</Box>
						<Box component={'div'} className={'right'}>
							<div className={'pagination-box'}>
								<WestIcon className={'swiper-trend-prev'} />
								<div className={'swiper-trend-pagination'}></div>
								<EastIcon className={'swiper-trend-next'} />
							</div>
						</Box>
					</Stack>
					<Stack className={'card-box'}>
						{trendVehicles.length === 0 ? (
							<Box component={'div'} className={'empty-list'}>
								Trends Empty
							</Box>
						) : (
							<Swiper
								className={'trend-vehicle-swiper'}
								slidesPerView={'auto'}
								spaceBetween={15}
								modules={[Autoplay, Navigation, Pagination]}
								navigation={{
									nextEl: '.swiper-trend-next',
									prevEl: '.swiper-trend-prev',
								}}
								pagination={{
									el: '.swiper-trend-pagination',
								}}
							>
								{trendVehicles.map((vehicle: vehicle) => {
									return (
										<SwiperSlide key={vehicle._id} className={'trend-vehicle-slide'}>
											<TrendvehicleCard vehicle={vehicle} />
										</SwiperSlide>
									);
								})}
							</Swiper>
						)}
					</Stack>
				</Stack>
			</Stack>
		);
	}
};

TrendVehicles.defaultProps = {
	initialInput: {
		page: 1,
		limit: 8,
		sort: 'vehicleLikes',
		direction: 'DESC',
		search: {},
	},
};

export default TrendVehicles;
