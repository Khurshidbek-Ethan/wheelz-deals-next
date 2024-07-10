import React from 'react';
import { Stack, Box, Divider, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { vehicle as Vehicle } from '../../types/vehicle/vehicle';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { REACT_APP_API_URL } from '../../config';
import { useRouter } from 'next/router';
import { useReactiveVar } from '@apollo/client';
import { userVar } from '../../../apollo/store';

interface TopVehicleCardProps {
	vehicle: Vehicle;
}

const TopVehicleCard = (props: TopVehicleCardProps) => {
	const { vehicle } = props;
	const device = useDeviceDetect();
	const router = useRouter();
	const user = useReactiveVar(userVar);

	/** HANDLERS **/

	if (device === 'mobile') {
		return (
			<Stack className="top-card-box">
				<Box
					component={'div'}
					className={'card-img'}
					style={{ backgroundImage: `url(${REACT_APP_API_URL}/${vehicle?.vehicleImages[0]})` }}
				>
					<div>${vehicle?.vehiclePrice}</div>
				</Box>
				<Box component={'div'} className={'info'}>
					<strong className={'title'}>{vehicle?.vehicleTitle}</strong>
					<p className={'desc'}>{vehicle?.vehicleAddress}</p>
					<div className={'options'}>
						<div>
							<img src="/img/icons/bed.svg" alt="" />
							<span>{vehicle?.vehicleBeds} bed</span>
						</div>
						<div>
							<img src="/img/icons/room.svg" alt="" />
							<span>{vehicle?.vehicleRooms} rooms</span>
						</div>
						<div>
							<img src="/img/icons/expand.svg" alt="" />
							<span>{vehicle?.vehicleSquare} m2</span>
						</div>
					</div>
					<Divider sx={{ mt: '15px', mb: '17px' }} />
					<div className={'bott'}>
						<p>
							{' '}
							{vehicle.vehicleRent ? 'Rent' : ''} {vehicle.vehicleRent && vehicle.vehicleBarter && '/'}{' '}
							{vehicle.vehicleBarter ? 'Barter' : ''}
						</p>
						<div className="view-like-box">
							<IconButton color={'default'}>
								<RemoveRedEyeIcon />
							</IconButton>
							<Typography className="view-cnt">{vehicle?.vehicleViews}</Typography>
							<IconButton color={'default'}>
								{vehicle?.meLiked && vehicle?.meLiked[0]?.myFavorite ? (
									<FavoriteIcon style={{ color: 'red' }} />
								) : (
									<FavoriteIcon />
								)}
							</IconButton>
							<Typography className="view-cnt">{vehicle?.vehicleLikes}</Typography>
						</div>
					</div>
				</Box>
			</Stack>
		);
	} else {
		return (
			<Stack className="top-card-box">
				<Box
					component={'div'}
					className={'card-img'}
					style={{ backgroundImage: `url(${REACT_APP_API_URL}/${vehicle?.vehicleImages[0]})` }}
				>
					<div>${vehicle?.vehiclePrice}</div>
				</Box>
				<Box component={'div'} className={'info'}>
					<strong className={'title'}>{vehicle?.vehicleTitle}</strong>
					<p className={'desc'}>{vehicle?.vehicleAddress}</p>
					<div className={'options'}>
						<div>
							<img src="/img/icons/bed.svg" alt="" />
							<span>{vehicle?.vehicleBeds} bed</span>
						</div>
						<div>
							<img src="/img/icons/room.svg" alt="" />
							<span>{vehicle?.vehicleRooms} rooms</span>
						</div>
						<div>
							<img src="/img/icons/expand.svg" alt="" />
							<span>{vehicle?.vehicleSquare} m2</span>
						</div>
					</div>
					<Divider sx={{ mt: '15px', mb: '17px' }} />
					<div className={'bott'}>
						<p>
							{' '}
							{vehicle.vehicleRent ? 'Rent' : ''} {vehicle.vehicleRent && vehicle.vehicleBarter && '/'}{' '}
							{vehicle.vehicleBarter ? 'Barter' : ''}
						</p>
						<div className="view-like-box">
							<IconButton color={'default'}>
								<RemoveRedEyeIcon />
							</IconButton>
							<Typography className="view-cnt">{vehicle?.vehicleViews}</Typography>
							<IconButton color={'default'}>
								{vehicle?.meLiked && vehicle?.meLiked[0]?.myFavorite ? (
									<FavoriteIcon style={{ color: 'red' }} />
								) : (
									<FavoriteIcon />
								)}
							</IconButton>
							<Typography className="view-cnt">{vehicle?.vehicleLikes}</Typography>
						</div>
					</div>
				</Box>
			</Stack>
		);
	}
};

export default TopVehicleCard;
