import { useEffect, useState } from 'react';

const useDeviceDetect = (): string => {
	const [device, setDevice] = useState('desktop');

	useEffect(() => {
		const userDealer = navigator.userAgent;
		const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userDealer);
		setDevice(isMobile ? 'mobile' : 'desktop');
	}, [device]);

	return device;
};

export default useDeviceDetect;
