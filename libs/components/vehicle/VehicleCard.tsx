import React from 'react';
import { Stack, Typography, Box } from '@mui/material';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { vehicle } from '../../types/vehicle/vehicle';
import Link from 'next/link';
import { formatterStr } from '../../utils';
import { REACT_APP_API_URL } from '../../config';
import { useReactiveVar } from '@apollo/client';
import { userVar } from '../../../apollo/store';
import IconButton from '@mui/material/IconButton';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

interface vehicleCardType {
	vehicle: vehicle;
	likevehicleHandler?: any;
	myFavorites?: boolean;
	recentlyVisited?: boolean;
}

const vehicleCard = (props: vehicleCardType) => {
	const { vehicle, likevehicleHandler, myFavorites, recentlyVisited } = props;
	const device = useDeviceDetect();
	const user = useReactiveVar(userVar);
	const imagePath: string = vehicle?.vehicleImages[0]
		? `${REACT_APP_API_URL}/${vehicle?.vehicleImages[0]}`
		: '/img/banner/header1.svg';

	if (device === 'mobile') {
		return <div>vehicle CARD</div>;
	} else {
		return (
			<Stack className="card-config">
				<Stack className="top">
					<Link
						href={{
							pathname: '/vehicle/detail',
							query: { id: vehicle?._id },
						}}
					>
						<img src={imagePath} alt="" />
					</Link>
					{vehicle && vehicle?.vehicleRank > 0 && (
						<Box component={'div'} className={'top-badge'}>
							<img src="/img/icons/electricity.svg" alt="" />
							<Typography>TOP</Typography>
						</Box>
					)}
					<Box component={'div'} className={'price-box'}>
						<Typography>${formatterStr(vehicle?.vehiclePrice)}</Typography>
					</Box>
				</Stack>
				<Stack className="bottom">
					<Stack className="name-address">
						<Stack className="name">
							<Link
								href={{
									pathname: '/vehicle/detail',
									query: { id: vehicle?._id },
								}}
							>
								<Typography>{vehicle.vehicleTitle}</Typography>
							</Link>
						</Stack>
						<Stack className="address">
							<Typography>
								{vehicle.vehicleAddress}, {vehicle.VehicleLocation}
							</Typography>
						</Stack>
					</Stack>
					<Stack className="options">
						<Stack className="option">
							<img src="/img/icons/bed.svg" alt="" /> <Typography>{vehicle.vehicleBeds} bed</Typography>
						</Stack>
						<Stack className="option">
							<img src="/img/icons/room.svg" alt="" /> <Typography>{vehicle.vehicleRooms} room</Typography>
						</Stack>
						<Stack className="option">
							<img src="/img/icons/expand.svg" alt="" /> <Typography>{vehicle.vehicleSquare} m2</Typography>
						</Stack>
					</Stack>
					<Stack className="divider"></Stack>
					<Stack className="type-buttons">
						<Stack className="type">
							<Typography
								sx={{ fontWeight: 500, fontSize: '13px' }}
								className={vehicle.vehicleRent ? '' : 'disabled-type'}
							>
								Rent
							</Typography>
							<Typography
								sx={{ fontWeight: 500, fontSize: '13px' }}
								className={vehicle.vehicleBarter ? '' : 'disabled-type'}
							>
								Barter
							</Typography>
						</Stack>
						{!recentlyVisited && (
							<Stack className="buttons">
								<IconButton color={'default'}>
									<RemoveRedEyeIcon />
								</IconButton>
								<Typography className="view-cnt">{vehicle?.vehicleViews}</Typography>
								<IconButton color={'default'} onClick={() => likevehicleHandler(user, vehicle?._id)}>
									{myFavorites ? (
										<FavoriteIcon color="primary" />
									) : vehicle?.meLiked && vehicle?.meLiked[0]?.myFavorite ? (
										<FavoriteIcon color="primary" />
									) : (
										<FavoriteBorderIcon />
									)}
								</IconButton>
								<Typography className="view-cnt">{vehicle?.vehicleLikes}</Typography>
							</Stack>
						)}
					</Stack>
				</Stack>
			</Stack>
		);
	}
};

export default vehicleCard;
