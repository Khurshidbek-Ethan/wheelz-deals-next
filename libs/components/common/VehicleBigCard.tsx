import React from 'react';
import { Stack, Box, Divider, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { vehicle } from '../../types/vehicle/vehicle';
import { REACT_APP_API_URL } from '../../config';
import { formatterStr } from '../../utils';
import { useReactiveVar } from '@apollo/client';
import { userVar } from '../../../apollo/store';
import { useRouter } from 'next/router';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

interface vehicleBigCardProps {
	vehicle: vehicle;
}

const vehicleBigCard = (props: vehicleBigCardProps) => {
	const { vehicle } = props;
	const device = useDeviceDetect();
	const user = useReactiveVar(userVar);
	const router = useRouter();

	/** HANDLERS **/
	const govehicleDetatilPage = (vehicleId: string) => {
		router.push(`/vehicle/detail?id=${vehicleId}`);
	};

	if (device === 'mobile') {
		return <div>APARTMEND BIG CARD</div>;
	} else {
		return (
			<Stack className="vehicle-big-card-box" onClick={() => govehicleDetatilPage(vehicle?._id)}>
				<Box
					component={'div'}
					className={'card-img'}
					style={{ backgroundImage: `url(${REACT_APP_API_URL}/${vehicle?.vehicleImages?.[0]})` }}
				>
					{vehicle?.vehicleRank && vehicle?.vehicleRank >= 50 && (
						<div className={'status'}>
							<img src="/img/icons/electricity.svg" alt="" />
							<span>top</span>
						</div>
					)}

					<div className={'price'}>${formatterStr(vehicle?.vehiclePrice)}</div>
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
						<div>
							{vehicle?.vehicleRent ? <p>Rent</p> : <span>Rent</span>}
							{vehicle?.vehicleBarter ? <p>Barter</p> : <span>Barter</span>}
						</div>
						<div className="buttons-box">
							<IconButton color={'default'}>
								<RemoveRedEyeIcon />
							</IconButton>
							<Typography className="view-cnt">{vehicle?.vehicleViews}</Typography>
							<IconButton
								color={'default'}
								onClick={(e) => {
									e.stopPropagation();
								}}
							>
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

export default vehicleBigCard;
