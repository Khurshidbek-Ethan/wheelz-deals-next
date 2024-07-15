import React from 'react';
import Link from 'next/link';
import {
	TableCell,
	TableHead,
	TableBody,
	TableRow,
	Table,
	TableContainer,
	Button,
	Menu,
	Fade,
	MenuItem,
} from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { Stack } from '@mui/material';

import { REACT_API_URL } from '../../../config';
import DeleteIcon from '@mui/icons-material/Delete';
import Typography from '@mui/material/Typography';
import { vehicle } from '../../../types/vehicle/vehicle';
import { VehicleStatus } from '../../../enums/vehicle.enum';

interface Data {
	id: string;
	title: string;
	price: string;
	dealer: string;
	location: string;
	type: string;
	status: string;
}

type Order = 'asc' | 'desc';

interface HeadCell {
	disablePadding: boolean;
	id: keyof Data;
	label: string;
	numeric: boolean;
}

const headCells: readonly HeadCell[] = [
	{
		id: 'id',
		numeric: true,
		disablePadding: false,
		label: 'MB ID',
	},
	{
		id: 'title',
		numeric: true,
		disablePadding: false,
		label: 'TITLE',
	},
	{
		id: 'price',
		numeric: false,
		disablePadding: false,
		label: 'PRICE',
	},
	{
		id: 'dealer',
		numeric: false,
		disablePadding: false,
		label: 'dealer',
	},
	{
		id: 'location',
		numeric: false,
		disablePadding: false,
		label: 'LOCATION',
	},
	{
		id: 'type',
		numeric: false,
		disablePadding: false,
		label: 'TYPE',
	},
	{
		id: 'status',
		numeric: false,
		disablePadding: false,
		label: 'STATUS',
	},
];

interface EnhancedTableProps {
	numSelected: number;
	onRequestSort: (event: React.MouseEvent<unknown>, vehicle: keyof Data) => void;
	onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
	order: Order;
	orderBy: string;
	rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
	const { onSelectAllClick } = props;

	return (
		<TableHead>
			<TableRow>
				{headCells.map((headCell) => (
					<TableCell
						key={headCell.id}
						align={headCell.numeric ? 'left' : 'center'}
						padding={headCell.disablePadding ? 'none' : 'normal'}
					>
						{headCell.label}
					</TableCell>
				))}
			</TableRow>
		</TableHead>
	);
}

interface vehiclePanelListType {
	Vehicles: vehicle[];
	anchorEl: any;
	menuIconClickHandler: any;
	menuIconCloseHandler: any;
	updatevehicleHandler: any;
	removevehicleHandler: any;
}

export const vehiclePanelList = (props: vehiclePanelListType) => {
	const { Vehicles, anchorEl, menuIconClickHandler, menuIconCloseHandler, updatevehicleHandler, removevehicleHandler } =
		props;

	return (
		<Stack>
			<TableContainer>
				<Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={'medium'}>
					{/*@ts-ignore*/}
					<EnhancedTableHead />
					<TableBody>
						{Vehicles.length === 0 && (
							<TableRow>
								<TableCell align="center" colSpan={8}>
									<span className={'no-data'}>data not found!</span>
								</TableCell>
							</TableRow>
						)}

						{Vehicles.length !== 0 &&
							Vehicles.map((vehicle: vehicle, index: number) => {
								const vehicleImage = `${REACT_API_URL}/${vehicle?.vehicleImages[0]}`;

								return (
									<TableRow hover key={vehicle?._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
										<TableCell align="left">{vehicle._id}</TableCell>
										<TableCell align="left" className={'name'}>
											<Stack direction={'row'}>
												<Link href={`/vehicle/detail?id=${vehicle?._id}`}>
													<div>
														<Avatar alt="Remy Sharp" src={vehicleImage} sx={{ ml: '2px', mr: '10px' }} />
													</div>
												</Link>
												<Link href={`/vehicle/detail?id=${vehicle?._id}`}>
													<div>{vehicle.vehicleTitle}</div>
												</Link>
											</Stack>
										</TableCell>
										<TableCell align="center">{vehicle.vehiclePrice}</TableCell>
										<TableCell align="center">{vehicle.memberData?.memberNick}</TableCell>
										<TableCell align="center">{vehicle.VehicleLocation}</TableCell>
										<TableCell align="center">{vehicle.VehicleType}</TableCell>
										<TableCell align="center">
											{vehicle.vehicleStatus === VehicleStatus.DELETE && (
												<Button
													variant="outlined"
													sx={{ p: '3px', border: 'none', ':hover': { border: '1px solid #000000' } }}
													onClick={() => removevehicleHandler(vehicle._id)}
												>
													<DeleteIcon fontSize="small" />
												</Button>
											)}

											{vehicle.vehicleStatus === VehicleStatus.SOLD && (
												<Button className={'badge warning'}>{vehicle.vehicleStatus}</Button>
											)}

											{vehicle.vehicleStatus === VehicleStatus.ACTIVE && (
												<>
													<Button onClick={(e: any) => menuIconClickHandler(e, index)} className={'badge success'}>
														{vehicle.vehicleStatus}
													</Button>

													<Menu
														className={'menu-modal'}
														MenuListProps={{
															'aria-labelledby': 'fade-button',
														}}
														anchorEl={anchorEl[index]}
														open={Boolean(anchorEl[index])}
														onClose={menuIconCloseHandler}
														TransitionComponent={Fade}
														sx={{ p: 1 }}
													>
														{Object.values(VehicleStatus)
															.filter((ele) => ele !== vehicle.vehicleStatus)
															.map((status: string) => (
																<MenuItem
																	onClick={() => updatevehicleHandler({ _id: vehicle._id, vehicleStatus: status })}
																	key={status}
																>
																	<Typography variant={'subtitle1'} component={'span'}>
																		{status}
																	</Typography>
																</MenuItem>
															))}
													</Menu>
												</>
											)}
										</TableCell>
									</TableRow>
								);
							})}
					</TableBody>
				</Table>
			</TableContainer>
		</Stack>
	);
};
