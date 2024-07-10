import React, { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import withAdminLayout from '../../../libs/components/layout/LayoutAdmin';
import { Box, List, ListItem, Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { TabContext } from '@mui/lab';
import TablePagination from '@mui/material/TablePagination';
import { vehiclePanelList } from '../../../libs/components/admin/Vehicles/vehicleList';
import { AllVehiclesInquiry } from '../../../libs/types/vehicle/vehicle.input';
import { vehicle } from '../../../libs/types/vehicle/vehicle';
import { VehicleLocation, vehicleStatus } from '../../../libs/enums/vehicle.enum';
import { sweetConfirmAlert, sweetErrorHandling } from '../../../libs/sweetAlert';
import { vehicleUpdate } from '../../../libs/types/vehicle/vehicle.update';

const AdminVehicles: NextPage = ({ initialInquiry, ...props }: any) => {
	const [anchorEl, setAnchorEl] = useState<[] | HTMLElement[]>([]);
	const [VehiclesInquiry, setVehiclesInquiry] = useState<AllVehiclesInquiry>(initialInquiry);
	const [Vehicles, setVehicles] = useState<vehicle[]>([]);
	const [VehiclesTotal, setVehiclesTotal] = useState<number>(0);
	const [value, setValue] = useState(
		VehiclesInquiry?.search?.vehicleStatus ? VehiclesInquiry?.search?.vehicleStatus : 'ALL',
	);
	const [searchType, setSearchType] = useState('ALL');

	/** APOLLO REQUESTS **/

	/** LIFECYCLES **/
	useEffect(() => {}, [VehiclesInquiry]);

	/** HANDLERS **/
	const changePageHandler = async (event: unknown, newPage: number) => {
		VehiclesInquiry.page = newPage + 1;
		setVehiclesInquiry({ ...VehiclesInquiry });
	};

	const changeRowsPerPageHandler = async (event: React.ChangeEvent<HTMLInputElement>) => {
		VehiclesInquiry.limit = parseInt(event.target.value, 10);
		VehiclesInquiry.page = 1;
		setVehiclesInquiry({ ...VehiclesInquiry });
	};

	const menuIconClickHandler = (e: any, index: number) => {
		const tempAnchor = anchorEl.slice();
		tempAnchor[index] = e.currentTarget;
		setAnchorEl(tempAnchor);
	};

	const menuIconCloseHandler = () => {
		setAnchorEl([]);
	};

	const tabChangeHandler = async (event: any, newValue: string) => {
		setValue(newValue);

		setVehiclesInquiry({ ...VehiclesInquiry, page: 1, sort: 'createdAt' });

		switch (newValue) {
			case 'ACTIVE':
				setVehiclesInquiry({ ...VehiclesInquiry, search: { vehicleStatus: vehicleStatus.ACTIVE } });
				break;
			case 'SOLD':
				setVehiclesInquiry({ ...VehiclesInquiry, search: { vehicleStatus: vehicleStatus.SOLD } });
				break;
			case 'DELETE':
				setVehiclesInquiry({ ...VehiclesInquiry, search: { vehicleStatus: vehicleStatus.DELETE } });
				break;
			default:
				delete VehiclesInquiry?.search?.vehicleStatus;
				setVehiclesInquiry({ ...VehiclesInquiry });
				break;
		}
	};

	const removevehicleHandler = async (id: string) => {
		try {
			if (await sweetConfirmAlert('Are you sure to remove?')) {
			}
			menuIconCloseHandler();
		} catch (err: any) {
			sweetErrorHandling(err).then();
		}
	};

	const searchTypeHandler = async (newValue: string) => {
		try {
			setSearchType(newValue);

			if (newValue !== 'ALL') {
				setVehiclesInquiry({
					...VehiclesInquiry,
					page: 1,
					sort: 'createdAt',
					search: {
						...VehiclesInquiry.search,
						VehicleLocationList: [newValue as VehicleLocation],
					},
				});
			} else {
				delete VehiclesInquiry?.search?.VehicleLocationList;
				setVehiclesInquiry({ ...VehiclesInquiry });
			}
		} catch (err: any) {
			console.log('searchTypeHandler: ', err.message);
		}
	};

	const updatevehicleHandler = async (updateData: vehicleUpdate) => {
		try {
			console.log('+updateData: ', updateData);
			menuIconCloseHandler();
		} catch (err: any) {
			menuIconCloseHandler();
			sweetErrorHandling(err).then();
		}
	};

	return (
		<Box component={'div'} className={'content'}>
			<Typography variant={'h2'} className={'tit'} sx={{ mb: '24px' }}>
				vehicle List
			</Typography>
			<Box component={'div'} className={'table-wrap'}>
				<Box component={'div'} sx={{ width: '100%', typography: 'body1' }}>
					<TabContext value={value}>
						<Box component={'div'}>
							<List className={'tab-menu'}>
								<ListItem
									onClick={(e) => tabChangeHandler(e, 'ALL')}
									value="ALL"
									className={value === 'ALL' ? 'li on' : 'li'}
								>
									All
								</ListItem>
								<ListItem
									onClick={(e) => tabChangeHandler(e, 'ACTIVE')}
									value="ACTIVE"
									className={value === 'ACTIVE' ? 'li on' : 'li'}
								>
									Active
								</ListItem>
								<ListItem
									onClick={(e) => tabChangeHandler(e, 'SOLD')}
									value="SOLD"
									className={value === 'SOLD' ? 'li on' : 'li'}
								>
									Sold
								</ListItem>
								<ListItem
									onClick={(e) => tabChangeHandler(e, 'DELETE')}
									value="DELETE"
									className={value === 'DELETE' ? 'li on' : 'li'}
								>
									Delete
								</ListItem>
							</List>
							<Divider />
							<Stack className={'search-area'} sx={{ m: '24px' }}>
								<Select sx={{ width: '160px', mr: '20px' }} value={searchType}>
									<MenuItem value={'ALL'} onClick={() => searchTypeHandler('ALL')}>
										ALL
									</MenuItem>
									{Object.values(VehicleLocation).map((location: string) => (
										<MenuItem value={location} onClick={() => searchTypeHandler(location)} key={location}>
											{location}
										</MenuItem>
									))}
								</Select>
							</Stack>
							<Divider />
						</Box>
						<vehiclePanelList
							Vehicles={Vehicles}
							anchorEl={anchorEl}
							menuIconClickHandler={menuIconClickHandler}
							menuIconCloseHandler={menuIconCloseHandler}
							updatevehicleHandler={updatevehicleHandler}
							removevehicleHandler={removevehicleHandler}
						/>

						<TablePagination
							rowsPerPageOptions={[10, 20, 40, 60]}
							component="div"
							count={VehiclesTotal}
							rowsPerPage={VehiclesInquiry?.limit}
							page={VehiclesInquiry?.page - 1}
							onPageChange={changePageHandler}
							onRowsPerPageChange={changeRowsPerPageHandler}
						/>
					</TabContext>
				</Box>
			</Box>
		</Box>
	);
};

AdminVehicles.defaultProps = {
	initialInquiry: {
		page: 1,
		limit: 10,
		sort: 'createdAt',
		direction: 'DESC',
		search: {},
	},
};

export default withAdminLayout(AdminVehicles);
