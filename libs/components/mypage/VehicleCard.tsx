import { Menu, MenuItem, Stack, Typography } from '@mui/material';
import React, { useState } from 'react';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import IconButton from '@mui/material/IconButton';
import ModeIcon from '@mui/icons-material/Mode';
import DeleteIcon from '@mui/icons-material/Delete';
import { vehicle } from '../../types/vehicle/vehicle';
import { formatterStr } from '../../utils';
import Moment from 'react-moment';
import { useRouter } from 'next/router';
import { vehicleStatus } from '../../enums/vehicle.enum';

interface vehicleCardProps {
	vehicle: vehicle;
	deletevehicleHandler?: any;
	memberPage?: boolean;
	updatevehicleHandler?: any;
}

export const VehicleCard = (props: vehicleCardProps) => {
	const { vehicle, deletevehicleHandler, memberPage, updatevehicleHandler } = props;
	const device = useDeviceDetect();
	const router = useRouter();
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);

	/** HANDLERS **/
	const pushEditvehicle = async (id: string) => {
		console.log('+pushEditvehicle: ', id);
		await router.push({
			pathname: '/mypage',
			query: { category: 'addvehicle', vehicleId: id },
		});
	};

	const pushvehicleDetail = async (id: string) => {
		if (memberPage)
			await router.push({
				pathname: '/vehicle/detail',
				query: { id: id },
			});
		else return;
	};

	const handleClick = (event: any) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	if (device === 'mobile') {
		return <div>MOBILE vehicle CARD</div>;
	} else
		return (
			<Stack className="vehicle-card-box">
				<Stack className="image-box" onClick={() => pushvehicleDetail(vehicle?._id)}>
					<img src={`${process.env.REACT_APP_API_URL}/${vehicle.vehicleImages[0]}`} alt="" />
				</Stack>
				<Stack className="information-box" onClick={() => pushvehicleDetail(vehicle?._id)}>
					<Typography className="name">{vehicle.vehicleTitle}</Typography>
					<Typography className="address">{vehicle.vehicleAddress}</Typography>
					<Typography className="price">
						<strong>${formatterStr(vehicle?.vehiclePrice)}</strong>/ mo
					</Typography>
				</Stack>
				<Stack className="date-box">
					<Typography className="date">
						<Moment format="DD MMMM, YYYY">{vehicle.createdAt}</Moment>
					</Typography>
				</Stack>
				<Stack className="status-box">
					<Stack className="coloured-box" sx={{ background: '#E5F0FD' }} onClick={handleClick}>
						<Typography className="status" sx={{ color: '#3554d1' }}>
							{vehicle.vehicleStatus}
						</Typography>
					</Stack>
				</Stack>
				{!memberPage && vehicle.vehicleStatus !== 'SOLD' && (
					<Menu
						anchorEl={anchorEl}
						open={open}
						onClose={handleClose}
						PaperProps={{
							elevation: 0,
							sx: {
								width: '70px',
								mt: 1,
								ml: '10px',
								overflow: 'visible',
								filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
							},
							style: {
								padding: 0,
								display: 'flex',
								justifyContent: 'center',
							},
						}}
					>
						{vehicle.vehicleStatus === 'ACTIVE' && (
							<>
								<MenuItem
									disableRipple
									onClick={() => {
										handleClose();
										updatevehicleHandler(vehicleStatus.SOLD, vehicle?._id);
									}}
								>
									Sold
								</MenuItem>
							</>
						)}
					</Menu>
				)}

				<Stack className="views-box">
					<Typography className="views">{vehicle.vehicleViews.toLocaleString()}</Typography>
				</Stack>
				{!memberPage && (
					<Stack className="action-box">
						<IconButton className="icon-button" onClick={() => pushEditvehicle(vehicle._id)}>
							<ModeIcon className="buttons" />
						</IconButton>
						<IconButton className="icon-button" onClick={() => deletevehicleHandler(vehicle._id)}>
							<DeleteIcon className="buttons" />
						</IconButton>
					</Stack>
				)}
			</Stack>
		);
};