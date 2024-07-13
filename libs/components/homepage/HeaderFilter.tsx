import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Stack, Box, Modal, Divider, Button } from '@mui/material';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CloseIcon from '@mui/icons-material/Close';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { vehicleSquare, vehicleYears } from '../../config';
import { VehicleLocation, VehicleType } from '../../enums/vehicle.enum';
import { VehiclesInquiry } from '../../types/vehicle/vehicle.input';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

const style = {
	position: 'absolute' as 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 'auto',
	bgcolor: 'background.paper',
	borderRadius: '12px',
	outline: 'none',
	boxShadow: 24,
};

const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: '200px',
		},
	},
};

const thisYear = new Date().getFullYear();

interface HeaderFilterProps {
	initialInput: VehiclesInquiry;
}

const HeaderFilter = (props: HeaderFilterProps) => {
	const { initialInput } = props;
	const device = useDeviceDetect();
	const { t, i18n } = useTranslation('common');
	const [searchFilter, setSearchFilter] = useState<VehiclesInquiry>(initialInput);
	const locationRef: any = useRef();
	const typeRef: any = useRef();
	const router = useRouter();
	const [openAdvancedFilter, setOpenAdvancedFilter] = useState(false);
	const [openLocation, setOpenLocation] = useState(false);
	const [openType, setOpenType] = useState(false);

	const [vehicleLocation, setVehicleLocation] = useState<VehicleLocation[]>(Object.values(VehicleLocation));
	const [vehicleType, setVehicleType] = useState<VehicleType[]>(Object.values(VehicleType));

	const [optionCheck, setOptionCheck] = useState('all');

	/** LIFECYCLES **/
	useEffect(() => {
		const clickHandler = (event: MouseEvent) => {
			if (!locationRef?.current?.contains(event.target)) {
				setOpenLocation(false);
			}

			if (!typeRef?.current?.contains(event.target)) {
				setOpenType(false);
			}

			// if (!roomsRef?.current?.contains(event.target)) {
			// 	setOpenRooms(false);
			// }
		};

		document.addEventListener('mousedown', clickHandler);

		return () => {
			document.removeEventListener('mousedown', clickHandler);
		};
	}, []);

	/** HANDLERS **/
	const advancedFilterHandler = (status: boolean) => {
		setOpenLocation(false);
		// setOpenRooms(false);
		setOpenType(false);
		setOpenAdvancedFilter(status);
	};

	const locationStateChangeHandler = () => {
		setOpenLocation((prev) => !prev);
		// setOpenRooms(false);
		setOpenType(false);
	};

	const typeStateChangeHandler = () => {
		setOpenType((prev) => !prev);
		setOpenLocation(false);
		// setOpenRooms(false);
	};

	// const roomStateChangeHandler = () => {
	// 	// setOpenRooms((prev) => !prev);
	// 	setOpenType(false);
	// 	setOpenLocation(false);
	// };

	const disableAllStateHandler = () => {
		// setOpenRooms(false);
		setOpenType(false);
		setOpenLocation(false);
	};

	const VehicleLocationSelectHandler = useCallback(
		async (value: any) => {
			try {
				setSearchFilter({
					...searchFilter,
					search: {
						...searchFilter.search,
						locationList: [value],
					},
				});
				typeStateChangeHandler();
			} catch (err: any) {
				console.log('ERROR, VehicleLocationSelectHandler:', err);
			}
		},
		[searchFilter],
	);

	// const VehicleTypeSelectHandler = useCallback(
	// 	async (value: any) => {
	// 		try {
	// 			setSearchFilter({
	// 				...searchFilter,
	// 				search: {
	// 					...searchFilter.search,
	// 					typeList: [value],
	// 				},
	// 			});
	// 			// roomStateChangeHandler();
	// 		} catch (err: any) {
	// 			console.log('ERROR, VehicleTypeSelectHandler:', err);
	// 		}
	// 	},
	// 	[searchFilter],
	// );

	// const vehicleRoomSelectHandler = useCallback(
	// 	async (value: any) => {
	// 		try {
	// 			setSearchFilter({
	// 				...searchFilter,
	// 				search: {
	// 					...searchFilter.search,
	// 					roomsList: [value],
	// 				},
	// 			});
	// 			disableAllStateHandler();
	// 		} catch (err: any) {
	// 			console.log('ERROR, vehicleRoomSelectHandler:', err);
	// 		}
	// 	},
	// 	[searchFilter],
	// );

	// const vehicleBedSelectHandler = useCallback(
	// 	async (number: Number) => {
	// 		try {
	// 			if (number != 0) {
	// 				if (searchFilter?.search?.bedsList?.includes(number)) {
	// 					setSearchFilter({
	// 						...searchFilter,
	// 						search: {
	// 							...searchFilter.search,
	// 							bedsList: searchFilter?.search?.bedsList?.filter((item: Number) => item !== number),
	// 						},
	// 					});
	// 				} else {
	// 					setSearchFilter({
	// 						...searchFilter,
	// 						search: { ...searchFilter.search, bedsList: [...(searchFilter?.search?.bedsList || []), number] },
	// 					});
	// 				}
	// 			} else {
	// 				delete searchFilter?.search.bedsList;
	// 				setSearchFilter({ ...searchFilter });
	// 			}

	// 			console.log('vehicleBedSelectHandler:', number);
	// 		} catch (err: any) {
	// 			console.log('ERROR, vehicleBedSelectHandler:', err);
	// 		}
	// 	},
	// 	[searchFilter],
	// );

	// const vehicleOptionSelectHandler = useCallback(
	// 	async (e: any) => {
	// 		try {
	// 			const value = e.target.value;
	// 			setOptionCheck(value);

	// 			if (value !== 'all') {
	// 				setSearchFilter({
	// 					...searchFilter,
	// 					search: {
	// 						...searchFilter.search,
	// 						options: [value],
	// 					},
	// 				});
	// 			} else {
	// 				delete searchFilter.search.options;
	// 				setSearchFilter({
	// 					...searchFilter,
	// 					search: {
	// 						...searchFilter.search,
	// 					},
	// 				});
	// 			}
	// 		} catch (err: any) {
	// 			console.log('ERROR, vehicleOptionSelectHandler:', err);
	// 		}
	// 	},
	// 	[searchFilter],
	// );

	// const vehicleSquareHandler = useCallback(
	// 	async (e: any, type: string) => {
	// 		const value = e.target.value;

	// 		if (type == 'start') {
	// 			setSearchFilter({
	// 				...searchFilter,
	// 				search: {
	// 					...searchFilter.search,
	// 					// @ts-ignore
	// 					squaresRange: { ...searchFilter.search.squaresRange, start: parseInt(value) },
	// 				},
	// 			});
	// 		} else {
	// 			setSearchFilter({
	// 				...searchFilter,
	// 				search: {
	// 					...searchFilter.search,
	// 					// @ts-ignore
	// 					squaresRange: { ...searchFilter.search.squaresRange, end: parseInt(value) },
	// 				},
	// 			});
	// 		}
	// 	},
	// 	[searchFilter],
	// );

	// const yearStartChangeHandler = async (event: any) => {
	// 	setYearCheck({ ...yearCheck, start: Number(event.target.value) });

	// 	setSearchFilter({
	// 		...searchFilter,
	// 		search: {
	// 			...searchFilter.search,
	// 			periodsRange: { start: Number(event.target.value), end: yearCheck.end },
	// 		},
	// 	});
	// };

	// const yearEndChangeHandler = async (event: any) => {
	// 	setYearCheck({ ...yearCheck, end: Number(event.target.value) });

	// 	setSearchFilter({
	// 		...searchFilter,
	// 		search: {
	// 			...searchFilter.search,
	// 			periodsRange: { start: yearCheck.start, end: Number(event.target.value) },
	// 		},
	// 	});
	// };

	// const resetFilterHandler = () => {
	// 	setSearchFilter(initialInput);
	// 	setOptionCheck('all');
	// 	setYearCheck({ start: 1970, end: thisYear });
	// };

	const pushSearchHandler = async () => {
		try {
			if (searchFilter?.search?.locationList?.length == 0) {
				delete searchFilter.search.locationList;
			}

			if (searchFilter?.search?.typeList?.length == 0) {
				delete searchFilter.search.typeList;
			}

			// if (searchFilter?.search?.roomsList?.length == 0) {
			// 	delete searchFilter.search.roomsList;
			// }

			// if (searchFilter?.search?.options?.length == 0) {
			// 	delete searchFilter.search.options;
			// }

			// if (searchFilter?.search?.bedsList?.length == 0) {
			// 	delete searchFilter.search.bedsList;
			// }

			await router.push(
				`/vehicle?input=${JSON.stringify(searchFilter)}`,
				`/vehicle?input=${JSON.stringify(searchFilter)}`,
			);
		} catch (err: any) {
			console.log('ERROR, pushSearchHandler:', err);
		}
	};

	if (device === 'mobile') {
		return <div>HEADER FILTER MOBILE</div>;
	} else {
		return (
			<>
				<Stack className={'search-box'}>
					<Stack className={'select-box'}>
						<Box component={'div'} className={`box ${openLocation ? 'on' : ''}`} onClick={locationStateChangeHandler}>
							<span>{searchFilter?.search?.locationList ? searchFilter?.search?.locationList[0] : t('Location')} </span>
							<ExpandMoreIcon />
						</Box>
						<Box className={`box ${openType ? 'on' : ''}`} onClick={typeStateChangeHandler}>
							<span> {searchFilter?.search?.typeList ? searchFilter?.search?.typeList[0] : t('vehicle type')} </span>
							<ExpandMoreIcon />
						</Box>
					</Stack>
					<Stack className={'search-box-other'}>
						<Box className={'advanced-filter'} onClick={() => advancedFilterHandler(true)}>
							<img src="/img/icons/menu-vertical.svg" alt="" />
							<span>{t('Advanced')}</span>
						</Box>
						<Box className={'search-btn'} onClick={pushSearchHandler}>
							<img src="/img/icons/search_white.svg" alt="" />
						</Box>
					</Stack>

					{/*MENU */}
					<div className={`filter-location ${openLocation ? 'on' : ''}`} ref={locationRef}>
						{vehicleLocation.map((location: string) => {
							return (
								<div onClick={() => VehicleLocationSelectHandler(location)} key={location}>
									<img src={`img/banner/cities/${location}.webp`} alt="" />
									<span>{location}</span>
								</div>
							);
						})}
					</div>

					<div className={`filter-type ${openType ? 'on' : ''}`} ref={typeRef}>
						{vehicleType.map((type: string) => {
							function VehicleTypeSelectHandler(type: string): void {
								throw new Error('Function not implemented.');
							}

							return (
								<div
									style={{ backgroundImage: `url(/img/banner/types/${type.toLowerCase()}.webp)` }}
									onClick={() => VehicleTypeSelectHandler(type)}
									key={type}
								>
									<span>{type}</span>
								</div>
							);
						})}
					</div>

					
				</Stack>

				{/* ADVANCED FILTER MODAL */}
				<Modal
					open={openAdvancedFilter}
					onClose={() => advancedFilterHandler(false)}
					aria-labelledby="modal-modal-title"
					aria-describedby="modal-modal-description"
				>
					{/* @ts-ignore */}
					<Box sx={style}>
						<Box className={'advanced-filter-modal'}>
							<div className={'close'} onClick={() => advancedFilterHandler(false)}>
								<CloseIcon />
							</div>
							<div className={'top'}>
								<span>Find your home</span>
								<div className={'search-input-box'}>
									<img src="/img/icons/search.svg" alt="" />
									<input
										value={searchFilter?.search?.text ?? ''}
										type="text"
										placeholder={'What are you looking for?'}
										onChange={(e: any) => {
											setSearchFilter({
												...searchFilter,
												search: { ...searchFilter.search, text: e.target.value },
											});
										}}
									/>
								</div>
							</div>
							<Divider sx={{ mt: '30px', mb: '35px' }} />
							<div className={'middle'}>
								<div className={'row-box'}>
									
									<div className={'box'}>
									</div>
								</div>
								
									
								</div>

							<Divider sx={{ mt: '60px', mb: '18px' }} />
							
						</Box>
					</Box>
				</Modal>
			</>
		);
	}
};

HeaderFilter.defaultProps = {
	initialInput: {
		page: 1,
		limit: 9,
		search: {
			squaresRange: {
				start: 0,
				end: 500,
			},
			pricesRange: {
				start: 0,
				end: 2000000,
			},
		},
	},
};

export default HeaderFilter;
