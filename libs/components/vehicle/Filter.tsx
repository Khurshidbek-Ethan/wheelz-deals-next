// import React, { useCallback, useEffect, useState } from 'react';
// import {
// 	Stack,
// 	Typography,
// 	Checkbox,
// 	Button,
// 	OutlinedInput,
// 	FormControl,
// 	InputLabel,
// 	Select,
// 	MenuItem,
// 	Tooltip,
// 	IconButton,
// } from '@mui/material';
// import useDeviceDetect from '../../hooks/useDeviceDetect';
// import { VehicleLocation, VehicleType } from '../../enums/vehicle.enum';
// import { VehiclesInquiry } from '../../types/vehicle/vehicle.input';
// import { useRouter } from 'next/router';
// import CancelRoundedIcon from '@mui/icons-material/CancelRounded';

// import RefreshIcon from '@mui/icons-material/Refresh';

// const MenuProps = {
// 	PaperProps: {
// 		style: {
// 			maxHeight: '200px',
// 		},
// 	},
// };

// interface FilterType {
// 	searchFilter: VehiclesInquiry;
// 	setSearchFilter: any;
// 	initialInput: VehiclesInquiry;
// }

// const Filter = (props: FilterType) => {
// 	const { searchFilter, setSearchFilter, initialInput } = props;
// 	const device = useDeviceDetect();
// 	const router = useRouter();
// 	const [vehicleLocation, setVehicleLocation] = useState<VehicleLocation[]>(Object.values(VehicleLocation));
// 	const [vehicleType, setVehicleType] = useState<VehicleType[]>(Object.values(VehicleType));
// 	const [searchText, setSearchText] = useState<string>('');
// 	const [showMore, setShowMore] = useState<boolean>(false);

// 	/** LIFECYCLES **/
// 	useEffect(() => {
// 		const queryParams = JSON.stringify({
// 			...searchFilter,
// 			search: {
// 				...searchFilter.search,
// 			},
// 		});

// 		if (searchFilter?.search?.locationList?.length == 0) {
// 			delete searchFilter.search.locationList;
// 			setShowMore(false);
// 			router.push(`/vehicle?input=${queryParams}`, `/vehicle?input=${queryParams}`, { scroll: false }).then();
// 		}

// 		if (searchFilter?.search?.typeList?.length == 0) {
// 			delete searchFilter.search.typeList;
// 			router.push(`/vehicle?input=${queryParams}`, `/vehicle?input=${queryParams}`, { scroll: false }).then();
// 		}

// 		// if (searchFilter?.search?.roomsList?.length == 0) {
// 		// 	delete searchFilter.search.roomsList;
// 		// 	router.push(`/vehicle?input=${queryParams}`, `/vehicle?input=${queryParams}`, { scroll: false }).then();
// 		// }

// 		// if (searchFilter?.search?.options?.length == 0) {
// 		// 	delete searchFilter.search.options;
// 		// 	router.push(`/vehicle?input=${queryParams}`, `/vehicle?input=${queryParams}`, { scroll: false }).then();
// 		// }

// 		// if (searchFilter?.search?.bedsList?.length == 0) {
// 		// 	delete searchFilter.search.bedsList;
// 		// 	router.push(`/vehicle?input=${queryParams}`, `/vehicle?input=${queryParams}`, { scroll: false }).then();
// 		// }

// 		if (searchFilter?.search?.locationList) setShowMore(true);
// 	}, [searchFilter]);

// 	/** HANDLERS **/
// 	const VehicleLocationSelectHandler = useCallback(
// 		async (e: any) => {
// 			try {
// 				const isChecked = e.target.checked;
// 				const value = e.target.value;
// 				if (isChecked) {
// 					await router.push(
// 						`/vehicle?input=${JSON.stringify({
// 							...searchFilter,
// 							search: { ...searchFilter.search, locationList: [...(searchFilter?.search?.locationList || []), value] },
// 						})}`,
// 						`/vehicle?input=${JSON.stringify({
// 							...searchFilter,
// 							search: { ...searchFilter.search, locationList: [...(searchFilter?.search?.locationList || []), value] },
// 						})}`,
// 						{ scroll: false },
// 					);
// 				} else if (searchFilter?.search?.locationList?.includes(value)) {
// 					await router.push(
// 						`/vehicle?input=${JSON.stringify({
// 							...searchFilter,
// 							search: {
// 								...searchFilter.search,
// 								locationList: searchFilter?.search?.locationList?.filter((item: string) => item !== value),
// 							},
// 						})}`,
// 						`/vehicle?input=${JSON.stringify({
// 							...searchFilter,
// 							search: {
// 								...searchFilter.search,
// 								locationList: searchFilter?.search?.locationList?.filter((item: string) => item !== value),
// 							},
// 						})}`,
// 						{ scroll: false },
// 					);
// 				}

// 				if (searchFilter?.search?.typeList?.length == 0) {
// 					alert('error');
// 				}

// 				console.log('VehicleLocationSelectHandler:', e.target.value);
// 			} catch (err: any) {
// 				console.log('ERROR, VehicleLocationSelectHandler:', err);
// 			}
// 		},
// 		[searchFilter],
// 	);

// 	const VehicleTypeSelectHandler = useCallback(
// 		async (e: any) => {
// 			try {
// 				const isChecked = e.target.checked;
// 				const value = e.target.value;
// 				if (isChecked) {
// 					await router.push(
// 						`/vehicle?input=${JSON.stringify({
// 							...searchFilter,
// 							search: { ...searchFilter.search, typeList: [...(searchFilter?.search?.typeList || []), value] },
// 						})}`,
// 						`/vehicle?input=${JSON.stringify({
// 							...searchFilter,
// 							search: { ...searchFilter.search, typeList: [...(searchFilter?.search?.typeList || []), value] },
// 						})}`,
// 						{ scroll: false },
// 					);
// 				} else if (searchFilter?.search?.typeList?.includes(value)) {
// 					await router.push(
// 						`/vehicle?input=${JSON.stringify({
// 							...searchFilter,
// 							search: {
// 								...searchFilter.search,
// 								typeList: searchFilter?.search?.typeList?.filter((item: string) => item !== value),
// 							},
// 						})}`,
// 						`/vehicle?input=${JSON.stringify({
// 							...searchFilter,
// 							search: {
// 								...searchFilter.search,
// 								typeList: searchFilter?.search?.typeList?.filter((item: string) => item !== value),
// 							},
// 						})}`,
// 						{ scroll: false },
// 					);
// 				}

// 				if (searchFilter?.search?.typeList?.length == 0) {
// 					alert('error');
// 				}

// 				console.log('VehicleTypeSelectHandler:', e.target.value);
// 			} catch (err: any) {
// 				console.log('ERROR, VehicleTypeSelectHandler:', err);
// 			}
// 		},
// 		[searchFilter],
// 	);

// 	const vehicleRoomSelectHandler = useCallback(
// 		async (number: Number) => {
// 			try {
// 				if (number != 0) {
// 					// if (searchFilter?.search?.roomsList?.includes(number)) {
// 						await router.push(
// 							`/vehicle?input=${JSON.stringify({
// 								...searchFilter,
// 								search: {
// 									...searchFilter.search,
// 									// roomsList: searchFilter?.search?.roomsList?.filter((item: Number) => item !== number),
// 								},
// 							})}`,
// 							`/vehicle?input=${JSON.stringify({
// 								...searchFilter,
// 								search: {
// 									...searchFilter.search,
// 									// roomsList: searchFilter?.search?.roomsList?.filter((item: Number) => item !== number),
// 								},
// 							})}`,
// 							{ scroll: false },
// 						);
// 					} else {
// 						await router.push(
// 							`/vehicle?input=${JSON.stringify({
// 								...searchFilter,
// 								// search: { ...searchFilter.search, roomsList: [...(searchFilter?.search?.roomsList || []), number] },
// 							})}`,
// 							`/vehicle?input=${JSON.stringify({
// 								...searchFilter,
// 								// search: { ...searchFilter.search, roomsList: [...(searchFilter?.search?.roomsList || []), number] },
// 							})}`,
// 							{ scroll: false },
// 						);
// 					}
// 				} else {
// 					// delete searchFilter?.search.roomsList;
// 					setSearchFilter({ ...searchFilter });
// 					await router.push(
// 						`/vehicle?input=${JSON.stringify({
// 							...searchFilter,
// 							search: {
// 								...searchFilter.search,
// 							},
// 						})}`,
// 						`/vehicle?input=${JSON.stringify({
// 							...searchFilter,
// 							search: {
// 								...searchFilter.search,
// 							},
// 						})}`,
// 						{ scroll: false },
// 					);
// 				}

// 				console.log('vehicleRoomSelectHandler:', number);
// 			} catch (err: any) {
// 				console.log('ERROR, vehicleRoomSelectHandler:', err);
// 			}
// 		},
// 		// [searchFilter],
// 	);

// 	const vehicleOptionSelectHandler = useCallback(
// 		async (e: any) => {
// 			try {
// 				const isChecked = e.target.checked;
// 				const value = e.target.value;
// 				if (isChecked) {
// 					await router.push(
// 						`/vehicle?input=${JSON.stringify({
// 							...searchFilter,
// 							// search: { ...searchFilter.search, options: [...(searchFilter?.search?.options || []), value] },
// 						})}`,
// 						`/vehicle?input=${JSON.stringify({
// 							...searchFilter,
// 							// search: { ...searchFilter.search, options: [...(searchFilter?.search?.options || []), value] },
// 						})}`,
// 						{ scroll: false },
// 					);
// 				// } else if (searchFilter?.search?.options?.includes(value)) {
// 					await router.push(
// 						`/vehicle?input=${JSON.stringify({
// 							...searchFilter,
// 							search: {
// 								...searchFilter.search,
// 								// options: searchFilter?.search?.options?.filter((item: string) => item !== value),
// 							},
// 						})}`,
// 						`/vehicle?input=${JSON.stringify({
// 							...searchFilter,
// 							search: {
// 								...searchFilter.search,
// 								// options: searchFilter?.search?.options?.filter((item: string) => item !== value),
// 							},
// 						})}`,
// 						{ scroll: false },
// 					);
// 				}

// 				console.log('vehicleOptionSelectHandler:', e.target.value);
// 			} catch (err: any) {
// 				console.log('ERROR, vehicleOptionSelectHandler:', err);
// 			}
// 		},
// 		[searchFilter],
// 	);

// 	const vehicleBedSelectHandler = useCallback(
// 		async (number: Number) => {
// 			try {
// 				if (number != 0) {
// 					// if (searchFilter?.search?.bedsList?.includes(number)) {
// 						await router.push(
// 							`/vehicle?input=${JSON.stringify({
// 								...searchFilter,
// 								search: {
// 									...searchFilter.search,
// 									// bedsList: searchFilter?.search?.bedsList?.filter((item: Number) => item !== number),
// 								},
// 							})}`,
// 							`/vehicle?input=${JSON.stringify({
// 								...searchFilter,
// 								search: {
// 									...searchFilter.search,
// 									// bedsList: searchFilter?.search?.bedsList?.filter((item: Number) => item !== number),
// 								},
// 							})}`,
// 							{ scroll: false },
// 						);
// 					} else {
// 						await router.push(
// 							`/vehicle?input=${JSON.stringify({
// 								...searchFilter,
// 								// search: { ...searchFilter.search, bedsList: [...(searchFilter?.search?.bedsList || []), number] },
// 							})}`,
// 							`/vehicle?input=${JSON.stringify({
// 								...searchFilter,
// 								// search: { ...searchFilter.search, bedsList: [...(searchFilter?.search?.bedsList || []), number] },
// 							})}`,
// 							{ scroll: false },
// 						);
// 					}
// 				} else {
// 					delete searchFilter?.search.bedsList;
// 					setSearchFilter({ ...searchFilter });
// 					await router.push(
// 						`/vehicle?input=${JSON.stringify({
// 							...searchFilter,
// 							search: {
// 								...searchFilter.search,
// 							},
// 						})}`,
// 						`/vehicle?input=${JSON.stringify({
// 							...searchFilter,
// 							search: {
// 								...searchFilter.search,
// 							},
// 						})}`,
// 						{ scroll: false },
// 					);
// 				}

// 				console.log('vehicleBedSelectHandler:', number);
// 			} catch (err: any) {
// 				console.log('ERROR, vehicleBedSelectHandler:', err);
// 			}
// 		},
// 		[searchFilter],
// 	);

// 	const vehicleSquareHandler = useCallback(
// 		async (e: any, type: string) => {
// 			const value = e.target.value;

// 			if (type == 'start') {
// 				await router.push(
// 					`/vehicle?input=${JSON.stringify({
// 						...searchFilter,
// 						search: {
// 							...searchFilter.search,
// 							// squaresRange: { ...searchFilter.search.squaresRange, start: value },
// 						},
// 					})}`,
// 					`/vehicle?input=${JSON.stringify({
// 						...searchFilter,
// 						search: {
// 							...searchFilter.search,
// 							// squaresRange: { ...searchFilter.search.squaresRange, start: value },
// 						},
// 					})}`,
// 					{ scroll: false },
// 				);
// 			} else {
// 				await router.push(
// 					`/vehicle?input=${JSON.stringify({
// 						...searchFilter,
// 						search: {
// 							...searchFilter.search,
// 							// squaresRange: { ...searchFilter.search.squaresRange, end: value },
// 						},
// 					})}`,
// 					`/vehicle?input=${JSON.stringify({
// 						...searchFilter,
// 						search: {
// 							...searchFilter.search,
// 							// squaresRange: { ...searchFilter.search.squaresRange, end: value },
// 						},
// 					})}`,
// 					{ scroll: false },
// 				);
// 			}
// 		},
// 		[searchFilter],
// 	);

// 	const vehiclePriceHandler = useCallback(
// 		async (value: number, type: string) => {
// 			if (type == 'start') {
// 				await router.push(
// 					`/vehicle?input=${JSON.stringify({
// 						...searchFilter,
// 						search: {
// 							...searchFilter.search,
// 							pricesRange: { ...searchFilter.search.pricesRange, start: value * 1 },
// 						},
// 					})}`,
// 					`/vehicle?input=${JSON.stringify({
// 						...searchFilter,
// 						search: {
// 							...searchFilter.search,
// 							pricesRange: { ...searchFilter.search.pricesRange, start: value * 1 },
// 						},
// 					})}`,
// 					{ scroll: false },
// 				);
// 			} else {
// 				await router.push(
// 					`/vehicle?input=${JSON.stringify({
// 						...searchFilter,
// 						search: {
// 							...searchFilter.search,
// 							pricesRange: { ...searchFilter.search.pricesRange, end: value * 1 },
// 						},
// 					})}`,
// 					`/vehicle?input=${JSON.stringify({
// 						...searchFilter,
// 						search: {
// 							...searchFilter.search,
// 							pricesRange: { ...searchFilter.search.pricesRange, end: value * 1 },
// 						},
// 					})}`,
// 					{ scroll: false },
// 				);
// 			}
// 		},
// 		[searchFilter],
// 	);

// 	const refreshHandler = async () => {
// 		try {
// 			setSearchText('');
// 			await router.push(
// 				`/vehicle?input=${JSON.stringify(initialInput)}`,
// 				`/vehicle?input=${JSON.stringify(initialInput)}`,
// 				{ scroll: false },
// 			);
// 		} catch (err: any) {
// 			console.log('ERROR, refreshHandler:', err);
// 		}
// 	};

// 	if (device === 'mobile') {
// 		return <div>Vehicles FILTER</div>;
// 	} else {
// 		return (
// 			<Stack className={'filter-main'}>
// 				<Stack className={'find-your-home'} mb={'40px'}>
// 					<Typography className={'title-main'}>Find Your Home</Typography>
// 					<Stack className={'input-box'}>
// 						<OutlinedInput
// 							value={searchText}
// 							type={'text'}
// 							className={'search-input'}
// 							placeholder={'What are you looking for?'}
// 							onChange={(e: any) => setSearchText(e.target.value)}
// 							onKeyDown={(event: any) => {
// 								if (event.key == 'Enter') {
// 									setSearchFilter({
// 										...searchFilter,
// 										search: { ...searchFilter.search, text: searchText },
// 									});
// 								}
// 							}}
// 							endAdornment={
// 								<>
// 									<CancelRoundedIcon
// 										onClick={() => {
// 											setSearchText('');
// 											setSearchFilter({
// 												...searchFilter,
// 												search: { ...searchFilter.search, text: '' },
// 											});
// 										}}
// 									/>
// 								</>
// 							}
// 						/>
// 						<img src={'/img/icons/search_icon.png'} alt={''} />
// 						<Tooltip title="Reset">
// 							<IconButton onClick={refreshHandler}>
// 								<RefreshIcon />
// 							</IconButton>
// 						</Tooltip>
// 					</Stack>
// 				</Stack>
// 				<Stack className={'find-your-home'} mb={'30px'}>
// 					<p className={'title'} style={{ textShadow: '0px 3px 4px #b9b9b9' }}>
// 						Location
// 					</p>
// 					<Stack
// 						className={`vehicle-location`}
// 						style={{ height: showMore ? '253px' : '115px' }}
// 						onMouseEnter={() => setShowMore(true)}
// 						onMouseLeave={() => {
// 							if (!searchFilter?.search?.locationList) {
// 								setShowMore(false);
// 							}
// 						}}
// 					>
// 						{vehicleLocation.map((location: string) => {
// 							return (
// 								<Stack className={'input-box'} key={location}>
// 									<Checkbox
// 										id={location}
// 										className="vehicle-checkbox"
// 										color="default"
// 										size="small"
// 										value={location}
// 										checked={(searchFilter?.search?.locationList || []).includes(location as VehicleLocation)}
// 										onChange={VehicleLocationSelectHandler}
// 									/>
// 									<label htmlFor={location} style={{ cursor: 'pointer' }}>
// 										<Typography className="vehicle-type">{location}</Typography>
// 									</label>
// 								</Stack>
// 							);
// 						})}
// 					</Stack>
// 				</Stack>
// 				<Stack className={'find-your-home'} mb={'30px'}>
// 					<Typography className={'title'}>vehicle Type</Typography>
// 					{vehicleType.map((type: string) => (
// 						<Stack className={'input-box'} key={type}>
// 							<Checkbox
// 								id={type}
// 								className="vehicle-checkbox"
// 								color="default"
// 								size="small"
// 								value={type}
// 								onChange={VehicleTypeSelectHandler}
// 								checked={(searchFilter?.search?.typeList || []).includes(type as VehicleType)}
// 							/>
// 							<label style={{ cursor: 'pointer' }}>
// 								<Typography className="vehicle_type">{type}</Typography>
// 							</label>
// 						</Stack>
// 					))}
// 				</Stack>
// 				<Stack className={'find-your-home'} mb={'30px'}>
// 					<Typography className={'title'}>Rooms</Typography>
// 					<Stack className="button-group">
// 						<Button
// 							sx={{
// 								borderRadius: '12px 0 0 12px',
// 								// border: !searchFilter?.search?.roomsList ? '2px solid #181A20' : '1px solid #b9b9b9',
// 							}}
// 							onClick={() => vehicleRoomSelectHandler(0)}
// 						>
// 							Any
// 						</Button>
// 						<Button
// 							sx={{
// 								borderRadius: 0,
// 								// border: searchFilter?.search?.roomsList?.includes(1) ? '2px solid #181A20' : '1px solid #b9b9b9',
// 								// borderLeft: searchFilter?.search?.roomsList?.includes(1) ? undefined : 'none',
// 							}}
// 							onClick={() => vehicleRoomSelectHandler(1)}
// 						>
// 							1
// 						</Button>
// 						<Button
// 							sx={{
// 								borderRadius: 0,
// 								// border: searchFilter?.search?.roomsList?.includes(2) ? '2px solid #181A20' : '1px solid #b9b9b9',
// 								// borderLeft: searchFilter?.search?.roomsList?.includes(2) ? undefined : 'none',
// 							}}
// 							onClick={() => vehicleRoomSelectHandler(2)}
// 						>
// 							2
// 						</Button>
// 						<Button
// 							sx={{
// 								borderRadius: 0,
// 								// border: searchFilter?.search?.roomsList?.includes(3) ? '2px solid #181A20' : '1px solid #b9b9b9',
// 								// borderLeft: searchFilter?.search?.roomsList?.includes(3) ? undefined : 'none',
// 							}}
// 							onClick={() => vehicleRoomSelectHandler(3)}
// 						>
// 							3
// 						</Button>
// 						<Button
// 							sx={{
// 								borderRadius: 0,
// 								// border: searchFilter?.search?.roomsList?.includes(4) ? '2px solid #181A20' : '1px solid #b9b9b9',
// 								// borderLeft: searchFilter?.search?.roomsList?.includes(4) ? undefined : 'none',
// 								// borderRight: searchFilter?.search?.roomsList?.includes(4) ? undefined : 'none',
// 							}}
// 							onClick={() => vehicleRoomSelectHandler(4)}
// 						>
// 							4
// 						</Button>
// 						<Button
// 							sx={{
// 								borderRadius: '0 12px 12px 0',
// 								// border: searchFilter?.search?.roomsList?.includes(5) ? '2px solid #181A20' : '1px solid #b9b9b9',
// 							}}
// 							onClick={() => vehicleRoomSelectHandler(5)}
// 						>
// 							5+
// 						</Button>
// 					</Stack>
// 				</Stack>
// 				<Stack className={'find-your-home'} mb={'30px'}>
// 					<Typography className={'title'}>Bedrooms</Typography>
// 					<Stack className="button-group">
// 						<Button
// 							sx={{
// 								borderRadius: '12px 0 0 12px',
// 								// border: !searchFilter?.search?.bedsList ? '2px solid #181A20' : '1px solid #b9b9b9',
// 							}}
// 							onClick={() => vehicleBedSelectHandler(0)}
// 						>
// 							Any
// 						</Button>
// 						<Button
// 							sx={{
// 								borderRadius: 0,
// 								// border: searchFilter?.search?.bedsList?.includes(1) ? '2px solid #181A20' : '1px solid #b9b9b9',
// 								// borderLeft: searchFilter?.search?.bedsList?.includes(1) ? undefined : 'none',
// 							}}
// 							onClick={() => vehicleBedSelectHandler(1)}
// 						>
// 							1
// 						</Button>
// 						<Button
// 							sx={{
// 								borderRadius: 0,
// 								// border: searchFilter?.search?.bedsList?.includes(2) ? '2px solid #181A20' : '1px solid #b9b9b9',
// 								// borderLeft: searchFilter?.search?.bedsList?.includes(2) ? undefined : 'none',
// 							}}
// 							onClick={() => vehicleBedSelectHandler(2)}
// 						>
// 							2
// 						</Button>
// 						<Button
// 							sx={{
// 								borderRadius: 0,
// 								// border: searchFilter?.search?.bedsList?.includes(3) ? '2px solid #181A20' : '1px solid #b9b9b9',
// 								// borderLeft: searchFilter?.search?.bedsList?.includes(3) ? undefined : 'none',
// 							}}
// 							onClick={() => vehicleBedSelectHandler(3)}
// 						>
// 							3
// 						</Button>
// 						<Button
// 							sx={{
// 								borderRadius: 0,
// 								// border: searchFilter?.search?.bedsList?.includes(4) ? '2px solid #181A20' : '1px solid #b9b9b9',
// 								// borderLeft: searchFilter?.search?.bedsList?.includes(4) ? undefined : 'none',
// 								// borderRight: false ? undefined : 'none',
// 							}}
// 							onClick={() => vehicleBedSelectHandler(4)}
// 						>
// 							4
// 						</Button>
// 						<Button
// 							sx={{
// 								borderRadius: '0 12px 12px 0',
// 								// border: searchFilter?.search?.bedsList?.includes(5) ? '2px solid #181A20' : '1px solid #b9b9b9',
// 								// borderLeft: searchFilter?.search?.bedsList?.includes(5) ? undefined : 'none',
// 							}}
// 							onClick={() => vehicleBedSelectHandler(5)}
// 						>
// 							5+
// 						</Button>
// 					</Stack>
// 				</Stack>
// 				<Stack className={'find-your-home'} mb={'30px'}>
// 					<Typography className={'title'}>Options</Typography>
// 					<Stack className={'input-box'}>
// 						<Checkbox
// 							id={'Barter'}
// 							className="vehicle-checkbox"
// 							color="default"
// 							size="small"
// 							value={'vehicleBarter'}
// 							// checked={(searchFilter?.search?.options || []).includes('vehicleBarter')}
// 							onChange={vehicleOptionSelectHandler}
// 						/>
// 						<label htmlFor={'Barter'} style={{ cursor: 'pointer' }}>
// 							<Typography className="propert-type">Barter</Typography>
// 						</label>
// 					</Stack>
// 					<Stack className={'input-box'}>
// 						<Checkbox
// 							id={'Rent'}
// 							className="vehicle-checkbox"
// 							color="default"
// 							size="small"
// 							value={'vehicleRent'}
// 							// checked={(searchFilter?.search?.options || []).includes('vehicleRent')}
// 							onChange={vehicleOptionSelectHandler}
// 						/>
// 						<label htmlFor={'Rent'} style={{ cursor: 'pointer' }}>
// 							<Typography className="propert-type">Rent</Typography>
// 						</label>
// 					</Stack>
// 				</Stack>
// 				<Stack className={'find-your-home'} mb={'30px'}>
// 					<Typography className={'title'}>Square meter</Typography>
// 					<Stack className="square-year-input">
// 						<FormControl>
// 							<InputLabel id="demo-simple-select-label">Min</InputLabel>
// 						</FormControl>
// 						<div className="central-divider"></div>
// 						<FormControl>
// 							<InputLabel id="demo-simple-select-label">Max</InputLabel>
// 						</FormControl>
// 					</Stack>
// 				</Stack>
// 				<Stack className={'find-your-home'}>
// 					<Typography className={'title'}>Price Range</Typography>
// 					<Stack className="square-year-input">
// 						<input
// 							type="number"
// 							placeholder="$ min"
// 							min={0}
// 							value={searchFilter?.search?.pricesRange?.start ?? 0}
// 							onChange={(e: any) => {
// 								if (e.target.value >= 0) {
// 									vehiclePriceHandler(e.target.value, 'start');
// 								}
// 							}}
// 						/>
// 						<div className="central-divider"></div>
// 						<input
// 							type="number"
// 							placeholder="$ max"
// 							value={searchFilter?.search?.pricesRange?.end ?? 0}
// 							onChange={(e: any) => {
// 								if (e.target.value >= 0) {
// 									vehiclePriceHandler(e.target.value, 'end');
// 								}
// 							}}
// 						/>
// 					</Stack>
// 				</Stack>
// 			</Stack>
// 		);
// 	}
// };

// export default Filter;
