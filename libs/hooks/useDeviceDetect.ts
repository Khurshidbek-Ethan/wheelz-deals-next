import { useEffect, useState } from 'react';

const useDeviceDetect = (): string => {
	const [device, setDevice] = useState('desktop');

	useEffect(() => {
		const userdealer = navigator.userdealer;
		const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userdealer);
		setDevice(isMobile ? 'mobile' : 'desktop');
	}, [device]);

	return device;
};

export default useDeviceDetect;
