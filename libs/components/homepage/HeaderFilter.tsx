import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Stack, Box, Modal, Divider, Button } from '@mui/material';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CloseIcon from '@mui/icons-material/Close';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

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
	const brandsRef: any = useRef();
	const OilRef: any = useRef();
	const ColorRef: any = useRef();
	const router = useRouter();
	const [openAdvancedFilter, setOpenAdvancedFilter] = useState(false);
	const [openLocation, setOpenLocation] = useState(false);
	const [openType, setOpenType] = useState(false);
	const [openBrands, setOpenBrands] = useState(false);
	const [openOil, setOpenOil] = useState(false);
	const [openColor, setOpenColor] = useState(false);
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

			if (!brandsRef?.current?.contains(event.target)) {
				setOpenBrands(false);
			}

			if (!OilRef?.current?.contains(event.target)) {
				setOpenOil(false);
			}

			if (!ColorRef?.current?.contains(event.target)) {
				setOpenColor(false);
			}
		};

		document.addEventListener('mousedown', clickHandler);

		return () => {
			document.removeEventListener('mousedown', clickHandler);
		};
	}, []);

	/** HANDLERS **/
	const advancedFilterHandler = (status: boolean) => {
		setOpenLocation(false);
		setOpenBrands(false);
		setOpenType(false);
		setOpenOil(false);
		setOpenColor(false);
		setOpenAdvancedFilter(status);
	};

	const locationStateChangeHandler = () => {
		setOpenLocation((prev) => !prev);
		setOpenBrands(false);
		setOpenType(false);
	};

	const typeStateChangeHandler = () => {
		setOpenType((prev) => !prev);
		setOpenLocation(false);
		setOpenBrands(false);
	};

	const brandStateChangeHandler = () => {
		setOpenBrands((prev) => !prev);
		setOpenType(false);
		setOpenLocation(false);
	};

	const oilStateChangeHandler = () => {
		setOpenOil((prev) => !prev);
		setOpenType(false);
		setOpenLocation(false);
	};

	const colorStateChangeHandler = () => {
		setOpenColor((prev) => !prev);
		setOpenType(false);
		setOpenLocation(false);
	};

	const disableAllStateHandler = () => {
		setOpenBrands(false);
		setOpenType(false);
		setOpenLocation(false);
		setOpenOil(false);
		setOpenColor(false);
	};

	const vehicleLocationSelectHandler = useCallback(
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
				console.log('ERROR, vehicleLocationSelectHandler:', err);
			}
		},
		[searchFilter],
	);

	const vehicleTypeSelectHandler = useCallback(
		async (value: any) => {
			try {
				setSearchFilter({
					...searchFilter,
					search: {
						...searchFilter.search,
						typeList: [value],
					},
				});
				brandStateChangeHandler();
			} catch (err: any) {
				console.log('ERROR, vehicleTypeSelectHandler:', err);
			}
		},
		[searchFilter],
	);

	const vehicleBrandsSelectHandler = useCallback(
		async (value: any) => {
			try {
				setSearchFilter({
					...searchFilter,
					search: {
						...searchFilter.search,
						brandsList: [value],
					},
				});
				oilStateChangeHandler();
				colorStateChangeHandler();
			} catch (err: any) {
				console.log('ERROR, vehicleBrandsSelectHandler:', err);
			}
		},
		[searchFilter],
	);

	const vehicleOilSelectHandler = useCallback(
		async (value: any) => {
			try {
				setSearchFilter({
					...searchFilter,
					search: {
						...searchFilter.search,
						oilsList: [value],
					},
				});
				disableAllStateHandler();
			} catch (err: any) {
				console.log('ERROR, vehicleOilSelectHandler:', err);
			}
		},
		[searchFilter],
	);

	const vehicleColorSelectHandler = useCallback(
		async (value: any) => {
			try {
				setSearchFilter({
					...searchFilter,
					search: {
						...searchFilter.search,
						colorsList: [value],
					},
				});
				disableAllStateHandler();
			} catch (err: any) {
				console.log('ERROR, vehicleColorSelectHandler:', err);
			}
		},
		[searchFilter],
	);

	const pushSearchHandler = async () => {
		try {
			if (searchFilter?.search?.locationList?.length == 0) {
				delete searchFilter.search.locationList;
			}

			if (searchFilter?.search?.typeList?.length == 0) {
				delete searchFilter.search.typeList;
			}

			if (searchFilter?.search?.brandsList?.length == 0) {
				delete searchFilter.search.brandsList;
			}

			if (searchFilter?.search?.oilsList?.length == 0) {
				delete searchFilter.search.oilsList;
			}

			if (searchFilter?.search?.colorsList?.length == 0) {
				delete searchFilter.search.colorsList;
			}

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
						<Box className={`box ${openBrands ? 'on' : ''}`} onClick={brandStateChangeHandler}>
							<span>
								{searchFilter?.search?.brandsList ? `${searchFilter?.search?.brandsList[0]} brands}` : t('Brands')}
							</span>
							<ExpandMoreIcon />
						</Box>
						<Box className={`box ${openOil ? 'on' : ''}`} onClick={vehicleOilSelectHandler}>
							<span>{searchFilter?.search?.oilsList ? `${searchFilter?.search?.oilsList[0]} oils}` : t('Oils')}</span>
							<ExpandMoreIcon />
						</Box>
						<Box className={`box ${openColor ? 'on' : ''}`} onClick={vehicleColorSelectHandler}>
							<span>
								{searchFilter?.search?.openColor ? `${searchFilter?.search?.openColor[0]} color}` : t('Color')}
							</span>
							<ExpandMoreIcon />
						</Box>
					</Stack>
					<Stack className={'search-box-other'}>
						<Box className={'advanced-filter'} onClick={() => advancedFilterHandler(true)}>
							<img src="/img/icons/tune.svg" alt="" />
							<span>{t('Pioneering')}</span>
						</Box>
						<Box className={'search-btn'} onClick={pushSearchHandler}>
							<img src="/img/icons/search_white.svg" alt="" />
						</Box>
					</Stack>

					{/*MENU */}
					<div className={`filter-location ${openLocation ? 'on' : ''}`} ref={locationRef}>
						{vehicleLocation.map((location: string) => {
							return (
								<div onClick={() => vehicleLocationSelectHandler(location)} key={location}>
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

					<div className={`filter-brand ${openBrands ? 'on' : ''}`} ref={brandsRef}>
						{vehicleType.map((brand: string) => {
							function VehicleTypeSelectHandler(type: string): void {
								throw new Error('Function not implemented.');
							}

							return (
								<div
									style={{ backgroundImage: `url(/img/banner/brand/${brand.toLowerCase()}.webp)` }}
									onClick={() => VehicleTypeSelectHandler(brand)}
									key={brand}
								>
									<span>{brand}</span>
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
									<div className={'box'}></div>
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
			// squaresRange: {
			// 	start: 0,
			// 	end: 500,
			// },
			pricesRange: {
				start: 0,
				end: 2000000,
			},
		},
	},
};

export default HeaderFilter;
